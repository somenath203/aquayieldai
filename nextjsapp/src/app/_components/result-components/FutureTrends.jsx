'use client';

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';


const OurOwnToolTip = ({ active, payload, label }) => {


  if (active && payload && label) {
    return (
      <div className="p-2 sm:p-4 flex flex-col gap-2 sm:gap-3 rounded-lg bg-white shadow-lg border border-gray-100 max-w-[200px] sm:max-w-none">
        
        <div className="font-semibold text-gray-800 text-sm sm:text-base">{label}</div>
        
        <p className="text-xs sm:text-sm text-emerald-600 flex justify-between items-center">
          Soil Moisture
          <span className="font-medium ml-2">{payload[0].value} %</span>
        </p>

        <p className="text-xs sm:text-sm text-blue-600 flex justify-between items-center">
          Water Usage
          <span className="font-medium ml-2">{payload[1].value} L</span>
        </p>

        <p className="text-xs sm:text-sm text-indigo-600 flex justify-between items-center">
          Crop Yield
          <span className="font-medium ml-2">{payload[2].value}</span>
        </p>

      </div>
    );
  }
};

const FutureTrends = ({ data, description }) => {


  const refinedData = data?.map((d) => {
    return {
      timeframe: d?.timeframe,
      soilMoisture: Number(d?.soilMoisture),
      waterUsage: Number(d?.waterUsage),
      cropYield: Number(d?.cropYield)
    }
  });


  return (
    <div className="space-y-4 sm:space-y-6">
      
      <div className="border-b border-gray-200 pb-3 sm:pb-4">
        
        <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-indigo-900">Future Trends Analysis</h2>
        
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">{description}</p>
      </div>

      <div className="bg-white p-2 sm:p-6 rounded-xl shadow-md border border-gray-200">
        
        <div className="overflow-x-auto">
          
          <div className="w-full min-w-[500px] sm:min-w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            
            <ResponsiveContainer width="100%" height="100%">
              
              <LineChart 
                data={refinedData} 
                margin={{ 
                  right: 20, 
                  left: 0,
                  top: 10,
                  bottom: 5 
                }}
              >

                <XAxis 
                  dataKey="timeframe"
                  tick={{ fill: '#4B5563', fontSize: '12px' }}
                  stroke="#E5E7EB"
                  interval="preserveStartEnd"
                  textAnchor="middle"
                  height={50}
                />

                <YAxis 
                  tick={{ fill: '#4B5563', fontSize: '12px' }}
                  stroke="#E5E7EB"
                  width={40}
                />

                <CartesianGrid 
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />

                <Tooltip content={<OurOwnToolTip />} />

                <Legend 
                  wrapperStyle={{
                    paddingTop: '10px',
                    fontSize: '12px'
                  }}
                  iconSize={8}
                  iconType="circle"
                />

                <Line
                  type="monotone"
                  dataKey="soilMoisture"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', stroke: '#10B981', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5 }}
                />

                <Line
                  type="monotone"
                  dataKey="waterUsage"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', stroke: '#3B82F6', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5 }}
                />

                <Line
                  type="monotone"
                  dataKey="cropYield"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={{ fill: '#6366F1', stroke: '#6366F1', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[
          { name: 'Soil Moisture', color: 'emerald' },
          { name: 'Water Usage', color: 'blue' },
          { name: 'Crop Yield', color: 'indigo' }
        ].map((metric) => (
          <div 
            key={metric.name} 
            className={`bg-${metric.color}-50 p-3 sm:p-4 rounded-xl border border-${metric.color}-100`}
          >
            
            <h3 className={`text-base sm:text-lg font-semibold text-${metric.color}-700 mb-1 sm:mb-2`}>
              {metric.name}
            </h3>

            <p className={`text-xs sm:text-sm text-${metric.color}-600`}>
              Trend analysis and predictions for {metric.name.toLowerCase()} over the next 6 months.
            </p>

          </div>
        
        ))}

      </div>
      
    </div>
  );
};


export default FutureTrends;