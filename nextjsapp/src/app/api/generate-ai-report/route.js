import axios from 'axios';
import { NextResponse } from 'next/server';


export const maxDuration = 59;


export async function POST(req) {

  try {

    const {
      gemini_api_key,
      openai_api_key,
      openweather_api_key,
      location,
      crop_type,
      soil_type,
      farm_size,
      water_source,
      soil_moisture,
      irrigation_method,
    } = await req.json();

    
    const { data } = await axios.post(process.env.FASTAPI_BACKEND_API, {
        gemini_api_key: gemini_api_key,
        openai_api_key: openai_api_key,
        openweather_api_key: openweather_api_key,
        location: location,
        crop_type: crop_type,
        soil_type: soil_type,
        farm_size: farm_size,
        water_source: water_source,
        soil_moisture: soil_moisture,
        irrigation_method: irrigation_method,
    });
    
    
    return NextResponse.json({
        success: true,
        data: data
    });

  } catch (error) {

    console.error('Error processing request:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing the request.',
      },
      { status: 500 }
    );

  }

}
