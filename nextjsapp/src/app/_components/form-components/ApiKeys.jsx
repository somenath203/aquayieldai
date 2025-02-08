import PasswordInput from '../input-form-components/PasswordInput';


const CreateAlertMessage = ({ message, link }) => {
  return (
    <div role="alert" className="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info h-6 w-6 shrink-0">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span className='text-sm lg:text-base'>
        Click{" "}
        <a href={link} target="_blank" className="text-blue-600 underline">
          HERE
        </a>{" "}
        to {message}
      </span>
    </div>
  );
};


const IrrigationPlanner = ({ allFormData, setAllFormData }) => {
  return (
    <>

      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-4">
        🔑 API Keys Setup
      </h2>

      <p className="text-sm lg:text-base text-gray-600 text-center mb-6">
        🚀 Enter your API keys to enable AI-powered irrigation planning.
      </p>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6">

        <div className='flex flex-col gap-2'>

          <PasswordInput 
            label="🤖 Google Gemini API Key" 
            placeholder="Enter your Google Gemini API key"
            value={allFormData.geminiApiKey}
            onChange={(e) => setAllFormData({...allFormData, geminiApiKey: e.target.value })}
          />

          <CreateAlertMessage 
            message="know how to get your Google Gemini API Key."
            link="https://www.youtube.com/watch?v=o8iyrtQyrZM" 
          />

        </div>

        <div className='flex flex-col gap-2'>

          <PasswordInput 
            label="🧠 OpenAI API Key" 
            placeholder="Enter your OpenAI API Key"
            value={allFormData.openAiAPiKey}
            onChange={(e) => setAllFormData({...allFormData, openAiAPiKey: e.target.value })}
          />

          <CreateAlertMessage 
            message="learn how to get your OpenAI API key. Make sure to purchase credits in your account to use the API."
            link="https://www.youtube.com/watch?v=OB99E7Y1cMA" 
          />


        </div>

        <div className='flex flex-col gap-2'>

          <PasswordInput 
            label="☁️ OpenWeather API Key" 
            placeholder="Enter your openweather api key."
            value={allFormData.openWeatherApiKey}
            onChange={(e) => setAllFormData({...allFormData, openWeatherApiKey: e.target.value })}
          />

          <CreateAlertMessage 
            message="know how to get your OpenWeather API Key."
            link="https://www.youtube.com/watch?v=MdIfZJ08g2I" 
          />

        </div>
        
      </div>

    </>
  );
};

export default IrrigationPlanner;
