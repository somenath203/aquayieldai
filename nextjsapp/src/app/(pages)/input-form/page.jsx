'use client';

import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ApiKeys from "../../_components/form-components/ApiKeys";
import IrrigationPlanner from "../../_components/form-components/IrrigationPlanner";
import DisplayResponse from "../../_components/form-components/DisplayResponse";
import LoadingAnimation from "../../_components/input-form-components/LoadingAnimation";
import { userInputState, modelResponseState } from "@/zustand-store/store";
import ErrorModal from "@/app/_components/input-form-components/ErrorModal";


const Page = () => {

  
  const router = useRouter();

  const errorModalRef = useRef();


  const [ step, setStep ] = useState(1);

  const [ loading, setLoading ] = useState(false);

  const [ allFormData, setAllFormData ] = useState({
    geminiApiKey: '',
    openAiAPiKey: '',
    openWeatherApiKey: '',
    location: '',
    cropType: '',
    soilType: '',
    farmSize: '',
    waterSourceType: '',
    soilMoisture: '',
    irrigationMethod: ''
  });


  const onSubmitForm = async () => {

    try {

      setLoading(true);

      const { data } = await axios.post('/api/generate-ai-report', {
        gemini_api_key: allFormData?.geminiApiKey,
        openai_api_key: allFormData?.openAiAPiKey,
        openweather_api_key: allFormData?.openWeatherApiKey,
        location: allFormData?.location,
        crop_type: allFormData?.cropType,
        soil_type: allFormData?.soilType,
        farm_size: Number(allFormData?.farmSize),
        water_source: allFormData?.waterSourceType,
        soil_moisture: Number(allFormData?.soilMoisture),
        irrigation_method: allFormData?.irrigationMethod
      });

      if (data?.success) {

        userInputState.setState({
          userInputs: {
            location: allFormData?.location,
            weather_details: data?.data?.data?.weather_details,
            crop_type: allFormData?.cropType,
            soil_type: allFormData?.soilType,
            farm_size: Number(allFormData?.farmSize),
            water_source: allFormData?.waterSourceType,
            soil_moisture: Number(allFormData?.soilMoisture),
            irrigation_method: allFormData?.irrigationMethod
          }
        });

        modelResponseState.setState({
          responseFromBackendFastAPI: data?.data?.data?.generated_report
        });

        toast.success('Full analysis generated successfully', {
          duration: 3500
        });

        router.push('/result');
        
      }

      
    } catch (error) {
      
      console.log(error);

      toast.error('Something went wrong. Please try again after sometime.', {
        duration: 5000
      });

      errorModalRef?.current?.showModal()
      
    } finally {

      setLoading(false);

    }

  }


  return (
    <>

      { loading && <LoadingAnimation /> }
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600/90 to-blue-800/90 px-2 lg:px-6">
        
        <div className="card w-full max-w-6xl bg-white shadow-xl p-10 rounded-2xl mt-24 mb-10">
            
          { step === 1 ? (
  
            <ApiKeys allFormData={allFormData} setAllFormData={setAllFormData} />
  
          ) : step === 2 ? (
  
            <IrrigationPlanner allFormData={allFormData} setAllFormData={setAllFormData} />
  
          ) : step === 3 ? (
  
            <DisplayResponse allFormData={allFormData} />
  
          ) : null}
  
  
          <div className="mt-8 flex items-center justify-center lg:justify-end gap-3">
  
            {step !== 1 && (
  
              <button 
                className="btn btn-primary text-lg shadow-md hover:shadow-lg transition-all w-36 lg:w-52"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
  
            )}
  
            {step === 3 ? (
  
              <button 
                className="btn btn-primary text-lg shadow-md hover:shadow-lg transition-all w-36 lg:w-52"
                disabled={
                  !allFormData?.geminiApiKey || 
                  !allFormData?.openAiAPiKey || 
                  !allFormData?.openWeatherApiKey || 
                  !allFormData?.location || 
                  !allFormData?.cropType || 
                  !allFormData?.soilType || 
                  !allFormData?.waterSourceType || 
                  !allFormData?.irrigationMethod || 
                  Number(allFormData?.farmSize ?? 1) < 1 || 
                  Number(allFormData?.farmSize ?? 1) > 1000 || 
                  Number(allFormData?.soilMoisture ?? 0) < 0 || 
                  Number(allFormData?.soilMoisture ?? 0) > 100
                }
                onClick={onSubmitForm}
              >
                Submit
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

      <ErrorModal modalRef={errorModalRef} />

    </>
  );
};


export default Page;
