'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import CropRecommendations from "@/app/_components/result-components/CropRecommendations";
import IrrigationSchedule from "@/app/_components/result-components/IrrigationSchedule";
import LocationInsights from "@/app/_components/result-components/LocationInsights";
import SoilMoistureRecommendations from "@/app/_components/result-components/SoilMoistureRecommendations";
import WaterSourceOptimization from "@/app/_components/result-components/WaterSourceOptimization";
import { modelResponseState, userInputState } from "@/zustand-store/store";
import Summary from "@/app/_components/result-components/Summary";
import FutureTrends from "@/app/_components/result-components/FutureTrends";
import NotAvailable from "@/app/_components/shared-components/NotAvailable";


const Page = () => {


  const [step, setStep] = useState(1);

  const router = useRouter();


  const { userInputs } = userInputState((state) => state);

  const { responseFromBackendFastAPI } = modelResponseState((state) => state);


  if (!userInputs || !responseFromBackendFastAPI) {
    return (
      <NotAvailable 
        heading='No Results Available' 
        description='Please generate a report first to view the analysis.'
      />
    );
  }

  
  const parsedResponse = responseFromBackendFastAPI ? JSON.parse(responseFromBackendFastAPI.replace(/```json|```/g, '').trim()) : null;

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600/90 to-blue-800/90 px-2 lg:px-6">
      
      <div className="card w-full max-w-6xl bg-white shadow-xl p-6 lg:p-10 rounded-2xl mt-24 mb-10">
        
        <div className="border-b pb-6">
          
          <h1 className="text-xl lg:text-2xl text-center lg:text-left font-bold text-blue-800 mb-6">Farm Analysis Report</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-blue-50 p-6 rounded-xl">
              
              <h2 className="text-lg font-semibold text-blue-700 mb-3">Location Details</h2>
              
              <p className="text-gray-700">{userInputs?.location}</p>
            
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              
              <h2 className="text-lg font-semibold text-blue-700 mb-3">Weather Details</h2>
              
              <div className="space-y-2">
                
                <p className="text-gray-700">Temperature: 
                  <span className="font-medium ml-2">{userInputs?.weather_details?.temperature}°C</span>
                </p>
                
                <p className="text-gray-700">Humidity: 
                  <span className="font-medium ml-2">{userInputs?.weather_details?.humidity}%</span>
                </p>
              
              </div>
            
            </div>
          
          </div>
        
        </div>


        <div className="mt-6">
          
          {step === 1 ? (

            <LocationInsights data={parsedResponse?.locationInsights} />

          ) : step === 2 ? (

            <CropRecommendations data={parsedResponse?.cropRecommendations} />

          ) : step === 3 ? (

            <IrrigationSchedule data={parsedResponse?.irrigationSchedule} />

          ) : step === 4 ? (

            <WaterSourceOptimization data={parsedResponse?.waterSourceOptimization} />

          ) : step === 5 ? (

            <SoilMoistureRecommendations data={parsedResponse?.soilMoistureRecommendations} />

          ) : step === 6 ? (

            <FutureTrends data={parsedResponse?.futureTrends} description='This graph illustrates the predicted trends in soil moisture, water usage, and crop yield for the next six months, providing insights for better farm planning.' />

          ) : step === 7 ? (

            <Summary data={parsedResponse?.summary} />

          ) : null}
        
        </div>

        <div className="mt-8 flex items-center justify-center lg:justify-end gap-3">
          {step !== 1 && (
            <button 
                className="btn btn-primary text-lg shadow-md hover:shadow-lg transition-all w-36 lg:w-52"
                onClick={() => setStep(step - 1)}
              >
                Previous
            </button>
          )}

          {step === 7 ? (
            <button 
                className="btn btn-primary text-lg shadow-md hover:shadow-lg transition-all w-44 lg:w-52"
                onClick={() => router.push('/download-report-pdf')}
              >
                Download PDF
            </button>
          ) : (
            <button 
                className="btn btn-primary text-lg shadow-md hover:shadow-lg transition-all w-36 lg:w-52"
                onClick={() => setStep(step + 1)}
              >
                Next
            </button>
          )}

        </div>

      </div>

    </div>
  );
};


export default Page;