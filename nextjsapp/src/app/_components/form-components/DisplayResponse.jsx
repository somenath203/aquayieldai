import React from 'react';

const InfoRow = ({ label, value }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">

      <div className="flex flex-col space-y-1">

        <span className="text-sm text-gray-500">{label}</span>

        <span className="font-medium text-gray-900">
          {value || 'Not available'}
        </span>

      </div>

    </div>
  );
};


const DisplayResponse = ({ allFormData }) => {
  
  return (
    <div className="w-full">

      <div className="flex flex-col items-center mb-8">

        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Review Your Details
        </h2>

        <p className="text-gray-500 mt-2 text-center">
          Please verify all information before proceeding
        </p>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="space-y-4">

          <div className="bg-blue-50 rounded-lg p-4">

            <h3 className="text-sm font-medium text-blue-900 mb-4">
              API Configuration
            </h3>

            <div className="space-y-3">

              <InfoRow
                label="Google Gemini API Key"
                value={allFormData.geminiApiKey ? allFormData.geminiApiKey?.slice(0, 4) + '•'.repeat(20) : ''}
              />

              <InfoRow
                label="OpenAI API Key"
                value={allFormData.openAiAPiKey ? allFormData.openAiAPiKey?.slice(0, 4) + '•'.repeat(20) : ''}
              />

              <InfoRow
                label="OpenWeather API Key"
                value={allFormData.openWeatherApiKey ? allFormData.openWeatherApiKey?.slice(0, 4) + '•'.repeat(20) : ''}
              />

            </div>

          </div>


          <div className="bg-green-50 rounded-lg p-4">

            <h3 className="text-sm font-medium text-green-900 mb-4">
              Location Details
            </h3>

            <div className="space-y-3">

              <InfoRow label="Location" value={allFormData.location} />

              <InfoRow label="Farm Size" value={allFormData.farmSize ? `${allFormData.farmSize} Acres` : ''} />

            </div>

          </div>

        </div>


        <div className="space-y-4">

          <div className="bg-purple-50 rounded-lg p-4">

            <h3 className="text-sm font-medium text-purple-900 mb-4">
              Crop Information
            </h3>

            <div className="space-y-3">

              <InfoRow label="Crop Type" value={allFormData.cropType} />

              <InfoRow label="Soil Type" value={allFormData.soilType} />

              <InfoRow label="Soil Moisture" value={allFormData.soilMoisture ? `${allFormData.soilMoisture}%` : ''} />

            </div>

          </div>


          <div className="bg-orange-50 rounded-lg p-4">

            <h3 className="text-sm font-medium text-orange-900 mb-4">
              Irrigation Setup
            </h3>

            <div className="space-y-3">

              <InfoRow
                label="Water Source"
                value={allFormData.waterSourceType}
              />

              <InfoRow
                label="Irrigation Method"
                value={allFormData.irrigationMethod}
              />

            </div>

          </div>

        </div>

      </div>


      {!allFormData?.geminiApiKey ||
      !allFormData?.openAiAPiKey ||
      !allFormData?.openWeatherApiKey ||
      !allFormData?.location ||
      !allFormData?.cropType ||
      !allFormData?.soilType ||
      !allFormData?.farmSize ||
      !allFormData?.waterSourceType ||
      !allFormData?.soilMoisture ||
      !allFormData?.irrigationMethod ? (
        <div className="mt-8">

          <div className="flex items-center">

            <div role="alert" className="alert alert-error">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="text-white">
                One or more details are missing. Please go back and fill all the
                details carefully.
              </span>

            </div>

          </div>

        </div>

      ) : Number(allFormData?.farmSize ?? 1) < 1 || Number(allFormData?.farmSize ?? 1) > 1000 || Number(allFormData?.soilMoisture ?? 0) < 0 || Number(allFormData?.soilMoisture ?? 0) > 100 ? (
        <div className="mt-8">

          <div className="flex items-center">

            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="text-white">
                Farm size must be between 1 and 1000 acres, and soil moisture must be between 0 and 100.
              </span>

            </div>

          </div>

        </div>

      ) : (
        <div className="mt-8">

          <div className="flex items-center">

            <div role="alert" className="alert alert-success">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="text-white">
                All your details are complete. You're all set to proceed!
              </span>

            </div>

          </div>

        </div>
      )}

      <div className="mt-5">

        <div className="flex items-center">

          <div role="alert" className="alert alert-warning">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>

            <span>
              Please verify all information carefully. You won't be able to
              modify these details after proceeding.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};


export default DisplayResponse;
