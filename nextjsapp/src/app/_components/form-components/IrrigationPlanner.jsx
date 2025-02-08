import NormalInput from '../input-form-components/NormalInput';
import SelectInput from '../input-form-components/SelectInput';

const IrrigationPlanner = ({ allFormData, setAllFormData }) => {
  return (
    <>

      <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
        🚜 Precision Irrigation Planner 💧
      </h2>

      <p className="text-gray-600 text-center mb-6">
        Optimize your farm's water usage with AI-powered precision irrigation.
        🌱🚀
      </p>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

        <div className='flex flex-col gap-2'>

          <NormalInput 
            label="📍 Location Name" 
            type='text'
            placeholder="Enter your location"
            value={allFormData?.location}
            onChange={(e) => setAllFormData({...allFormData, location: e.target.value })}
          />

          <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
            Make sure to enter the correct location to ensure everything works properly.
          </p>

        </div>

        <SelectInput
          label="🌾 Crop Type"
          disabledSelectedOption="Select Your Crop Type"
          selectOptionsArr={[
            '🌾 Cereal Grains (Wheat, Rice, Corn)',
            '🥕 Vegetables (Carrots, Potatoes, Tomatoes)',
            '🍎 Fruits (Apples, Bananas, Mangoes)',
            '🌱 Legumes & Pulses (Lentils, Peas, Beans)',
            '🌿 Other Crops',
          ]}
          value={allFormData?.cropType}
          onChange={(e) => setAllFormData({...allFormData, cropType: e.target.value })}
        />

        <SelectInput
          label="🪨 Soil Type"
          disabledSelectedOption="Select Your Soil Type"
          selectOptionsArr={[
            '🏜️ Sandy Soil',
            '🧱 Clay Soil',
            '🌱 Loamy Soil',
            '💧 Silty Soil',
            '🌿 Peaty Soil',
            '🧂 Saline Soil',
          ]}
          value={allFormData?.soilType}
          onChange={(e) => setAllFormData({...allFormData, soilType: e.target.value })}
        />

        <NormalInput
          label="🌱 Farm Size (1-1000 acres)"
          type='number'
          placeholder="Enter your farm size"
          value={allFormData?.farmSize}
          onChange={(e) => setAllFormData({...allFormData, farmSize: e.target.value })}
        />

        <SelectInput
          label="💦 Water Source Type"
          disabledSelectedOption="Select Your Water Source Type"
          selectOptionsArr={[
            '⛏️ Well Water',
            '🚰 Municipal Supply',
            '🏞️ River/Lake Water',
            '🌧️ Rainwater Harvesting',
            '🚜 Irrigation Canal',
            '🛢️ Stored Water (Tank/Pond)',
            '💦 Drip Irrigation System',
            '🌊 Desalinated Water',
          ]}
          value={allFormData?.waterSourceType}
          onChange={(e) => setAllFormData({...allFormData, waterSourceType: e.target.value })}
        />

        <NormalInput
          label="🌡️ Current Soil Moisture (%) (Range: 0-100)"
          type='number'
          placeholder="Enter soil moisture percentage"
          value={allFormData?.soilMoisture}
          onChange={(e) => setAllFormData({...allFormData, soilMoisture: e.target.value })}
        />

        <div className="md:col-span-2">
          <SelectInput
            label="🚿 Preferred Irrigation Method"
            disabledSelectedOption="Select Your Preferred Irrigation Method"
            selectOptionsArr={[
              '💧 Drip Irrigation (Water-efficient)',
              '🚜 Sprinkler Irrigation (Large fields)',
              '🌊 Surface Irrigation (Flood & Furrow)',
              '🔽 Subsurface Irrigation (Underground pipes)',
              '🌿 Manual Watering (Small farms)',
              '🔄 Center Pivot (Automated system)',
            ]}
            value={allFormData?.irrigationMethod}
            onChange={(e) => setAllFormData({...allFormData, irrigationMethod: e.target.value })}
          />
        </div>

      </div>
      
    </>
  );
};


export default IrrigationPlanner;
