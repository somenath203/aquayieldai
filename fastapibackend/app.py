from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from phi.agent import Agent
from phi.model.google import Gemini
from phi.model.openai import OpenAIChat
from phi.tools.duckduckgo import DuckDuckGo
import os

from getweather import get_weather


app = FastAPI(title="AquaYield AI FastAPI Backend")


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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


        weather_analysis_agent = Agent(
            name='Weather Analysis Expert',
            role='Analyze weather data and give farming recommendations',
            model=Gemini(id="gemini-1.5-flash"),
            instructions=[
                'Analyze temperature, humidity, and recent weather patterns.',
                'Give insights on how weather affects crops and soil moisture.',
                'Suggest necessary adjustments like irrigation, fertilizer use, or crop protection strategies.'
            ],
        )


        location_agent = Agent(
            name='Location Data Fetcher',
            role='Fetch general details about the given location',
            tools=[DuckDuckGo()],  
            model=OpenAIChat(id="gpt-3.5-turbo"),
            instructions=[
                'Provide relevant details about the location, such as geographical features, soil type, common crops grown, and climate conditions.',
                'Ensure data is relevant to the user’s farm location.',
                'Focus on aspects that affect farming, such as average rainfall, altitude, and temperature trends.'
            ],
        )


        crop_recommendation_agent = Agent(
            name='Crop Recommendation Agent',
            role='Suggest the best crops based on soil type, weather, and available water sources',
            tools=[],  
            model=Gemini(id="gemini-1.5-flash"),
            instructions=[
                'Analyze soil type, weather conditions, and water sources to recommend suitable crops.',
                'Consider factors like rainfall, soil texture, and moisture retention.'
            ],
        )


        irrigation_planner_agent = Agent(
            name='Irrigation Planner',
            role='Calculate optimal water requirements based on farm size, soil moisture, and crop type',
            tools=[],  
            model=OpenAIChat(id="gpt-3.5-turbo"),
            instructions=[
                'Use farm size, current soil moisture, and crop type to determine daily and weekly water needs.',
                'Suggest an irrigation schedule that prevents overwatering or underwatering.',
                'Adjust recommendations based on weather forecasts.'
            ],
        )


        water_source_agent = Agent(
            name='Water Source Optimizer',
            role='Optimize water usage based on available sources and irrigation method',
            tools=[],  
            model=Gemini(id="gemini-1.5-flash"),
            instructions=[
                'Evaluate the efficiency of different water sources like well, river, rainwater, and irrigation systems.',
                'Provide strategies to minimize water wastage and maximize crop yield.',
                'Recommend the most efficient irrigation method (Drip, Sprinkler, or Manual) based on farm conditions.'
            ],
        )


        soil_moisture_agent = Agent(
            name='Soil Moisture Predictor',
            role='Predict soil moisture levels based on weather, soil type, and irrigation history',
            tools=[],  
            model=OpenAIChat(id="gpt-3.5-turbo"),
            instructions=[
                'Estimate soil moisture based on weather conditions, soil type, and recent rainfall data.',
                'Provide insights on whether additional irrigation is necessary.'
            ],
        )


        final_report_agent = Agent(
            team=[
                location_agent,
                crop_recommendation_agent,
                irrigation_planner_agent,
                water_source_agent,
                soil_moisture_agent,
                weather_analysis_agent  
            ],
            name='Final Report Generator',
            role='Generate a structured farming report with all necessary recommendations',
            model=Gemini(id="gemini-1.5-flash"),
            instructions=[
                'Summarize location details, weather data, crop recommendations, irrigation schedule, and water optimization in a clear format.',
                'Ensure the report is actionable and easy to understand for farmers.',
                'Use bullet points, tables, and structured formatting for clarity.',
                'Include weather analysis and recommendations on irrigation and crop protection.'
            ],
        )


        weather_data = get_weather(farm_input.location, farm_input.openweather_api_key)


        location_response = location_agent.run(f"Provide agricultural details about {farm_input.location}")
        
        location_info = location_response.content if location_response else "No additional location info available."


        weather_analysis_input = (
            f"Analyze the following weather data for farming recommendations:\n"
            f"- Location: {farm_input.location}\n"
            f"- Temperature: {weather_data.get('temperature', 'N/A')}°C\n"
            f"- Humidity: {weather_data.get('humidity', 'N/A')}%\n"
            f"- Crop Type: {farm_input.crop_type}\n"
            f"- Soil Type: {farm_input.soil_type}\n"
            f"- Soil Moisture: {farm_input.soil_moisture}%\n"
            f"- Irrigation Method: {farm_input.irrigation_method}"
        )


        weather_analysis_response = weather_analysis_agent.run(weather_analysis_input)
        
        weather_analysis_result = weather_analysis_response.content if weather_analysis_response else "No weather analysis available."


        input_prompt = (
            f"Generate a farming guide based on the following inputs:\n"
            f"- Location: {farm_input.location}\n"
            f"- General Location Info: {location_info}\n"
            f"- Temperature: {weather_data.get('temperature', 'N/A')}°C\n"
            f"- Humidity: {weather_data.get('humidity', 'N/A')}%\n"
            f"- Crop Type: {farm_input.crop_type}\n"
            f"- Soil Type: {farm_input.soil_type}\n"
            f"- Farm Size: {farm_input.farm_size} acres\n"
            f"- Water Source: {farm_input.water_source}\n"
            f"- Current Soil Moisture: {farm_input.soil_moisture}%\n"
            f"- Preferred Irrigation Method: {farm_input.irrigation_method}\n"
            f"- Weather Analysis Insights: {weather_analysis_result}\n"
            f"Based on the above information, perform the following tasks:\n"
            f"1) Provide detailed insights into the location's farming suitability.\n"
            f"2) Recommend the best crops for the given soil type, climate, and water resources.\n"
            f"3) Generate an irrigation schedule based on farm size, moisture levels, and crop requirements.\n"
            f"4) Analyze the water source efficiency and suggest improvements for water usage.\n"
            f"5) Provide recommendations on how to optimize soil moisture and prevent overwatering.\n"
            f"6) Predict future farming trends, including estimated crop yield, water usage, and soil moisture levels for the next six months.\n"
            f"7) Summarize the farming guide with actionable steps for improving farm productivity.\n"
            f"Return the result as a valid JSON object with Markdown syntax. The structure should be:\n"
            f"{{\n"
            f"  'locationInsights': '## Location Insights\\n\\n### Bullet point describing farming suitability\\n',\n"
            f"  'cropRecommendations': '## Crop Recommendations\\n\\n### Bullet point recommending the best crops\\n',\n"
            f"  'irrigationSchedule': '## Irrigation Schedule\\n\\n### Bullet point with irrigation recommendations\\n',\n"
            f"  'waterSourceOptimization': '## Water Source Optimization\\n\\n### Bullet point with water usage strategies\\n',\n"
            f"  'soilMoistureRecommendations': '## Soil Moisture Recommendations\\n\\n### Bullet point with irrigation suggestions\\n',\n"
            f"  'futureTrends': [\n"
            f"    {{'timeframe': 'Next Month', 'soilMoisture': 'Predicted single numeric value (no symbols or units)', 'waterUsage': 'Predicted single numeric value (no symbols or units)', 'cropYield': 'Predicted single numeric value (no symbols or units)'}},\n"
            f"    {{'timeframe': 'Next 2 Months', 'soilMoisture': 'Predicted single numeric value (no symbols or units)', 'waterUsage': 'Predicted single numeric value (no symbols or units)', 'cropYield': 'Predicted single numeric value (no symbols or units)'}},\n"
            f"    {{'timeframe': 'Next 3 Months', 'soilMoisture': 'Predicted single numeric value (no symbols or units)', 'waterUsage': 'Predicted single numeric value (no symbols or units)', 'cropYield': 'Predicted single numeric value (no symbols or units)'}},\n"
            f"    {{'timeframe': 'Next 4 Months', 'soilMoisture': 'Predicted single numeric value (no symbols or units)', 'waterUsage': 'Predicted single numeric value (no symbols or units)', 'cropYield': 'Predicted single numeric value (no symbols or units)'}},\n"
            f"    {{'timeframe': 'Next 5 Months', 'soilMoisture': 'Predicted single numeric value (no symbols or units)', 'waterUsage': 'Predicted single numeric value (no symbols or units)', 'cropYield': 'Predicted single numeric value (no symbols or units)'}},\n"
            f"    {{'timeframe': 'Next 6 Months', 'soilMoisture': 'Predicted single numeric value (no symbols or units)', 'waterUsage': 'Predicted single numeric value (no symbols or units)', 'cropYield': 'Predicted single numeric value (no symbols or units)'}}\n"
            f"  ],\n"
            f"  'summary': '## Summary\\n\\n### Summary of all key recommendations\\n'\n"
            f"}}"
        )


        response = final_report_agent.run(input_prompt)

        return {
            'data': {
                'weather_details': {
                    'temperature': weather_data.get('temperature'),
                    'humidity': weather_data.get('humidity')
                },
                'generated_report': response.content
            },
        }
    
    except Exception as e:

        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")
