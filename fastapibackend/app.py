from fastapi import FastAPI, HTTPException 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from phi.agent import Agent
from phi.model.google import Gemini
from phi.model.openai import OpenAIChat
import os
import json

from getweather import get_weather

app = FastAPI(title="AquaYield AI FastAPI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FarmInput(BaseModel):
    gemini_api_key: str
    openai_api_key: str
    openweather_api_key: str
    location: str
    crop_type: str
    soil_type: str
    farm_size: float
    water_source: str
    soil_moisture: float
    irrigation_method: str


@app.post("/generate_report")
async def generate_report(farm_input: FarmInput):
    try:
        os.environ["OPENAI_API_KEY"] = farm_input.openai_api_key
        os.environ["GOOGLE_API_KEY"] = farm_input.gemini_api_key

        openai_agent = Agent(
            name="Farming Analysis Expert",
            role="Analyze farming conditions",
            model=OpenAIChat(id="gpt-4o-mini"),
            instructions=[
                "Analyze the farm data and give detailed insights.",
                "Focus on weather, soil, irrigation, and crops.",
            ],
        )

        gemini_agent = Agent(
            name="Structured JSON Generator",
            role="Generate structured farming report in JSON",
            model=Gemini(id="gemini-3.1-flash-lite"),
            instructions=[
                "Return ONLY valid JSON.",
                "Do NOT add markdown or ```.",
                "Do NOT explain anything.",
                "Strictly follow this format:",
                """
                {
                  "locationInsights": "string",
                  "cropRecommendations": "string",
                  "irrigationSchedule": "string",
                  "waterSourceOptimization": "string",
                  "soilMoistureRecommendations": "string",
                  "futureTrends": [
                        {
                            "timeframe": "string",
                            "soilMoisture": number,
                            "waterUsage": number,
                            "cropYield": number
                        }
                    ],
                  "summary": "string"
                }
                """,
                "futureTrends must be an array of objects. Do NOT return string.",
            ],
        )

        weather_data = get_weather(farm_input.location, farm_input.openweather_api_key)

        analysis_input = f"""
            Location: {farm_input.location}
            Temperature: {weather_data.get('temperature', 'N/A')}°C
            Humidity: {weather_data.get('humidity', 'N/A')}%
            Crop: {farm_input.crop_type}
            Soil: {farm_input.soil_type}
            Farm Size: {farm_input.farm_size} acres
            Water Source: {farm_input.water_source}
            Soil Moisture: {farm_input.soil_moisture}%
            Irrigation: {farm_input.irrigation_method}
        """

        analysis_response = openai_agent.run(analysis_input)

        analysis_result = (
            analysis_response.content if analysis_response else "No analysis available."
        )

        final_prompt = f"""
            Based on this analysis, generate structured output:

            {analysis_result}
        """

        final_response = gemini_agent.run(final_prompt)

        raw_output = final_response.content.strip()

        try:
            parsed_json = json.loads(raw_output)
        except:
            raise Exception(f"Invalid JSON from model: {raw_output}")

        return {
            "data": {
                "weather_details": {
                    "temperature": weather_data.get("temperature"),
                    "humidity": weather_data.get("humidity"),
                },
                "generated_report": parsed_json,
            }
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating report: {str(e)}"
        )
