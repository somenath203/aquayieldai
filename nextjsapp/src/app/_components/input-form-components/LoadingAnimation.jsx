import React from 'react';
import { TbFidgetSpinner } from "react-icons/tb";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-blue-50 bg-opacity-90 backdrop-blur-sm flex flex-col justify-center items-center gap-6 z-20">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6">
        
        <TbFidgetSpinner className="text-8xl text-blue-600 animate-spin" />
        
        <div className="flex flex-col items-center gap-2">
          
          <p className="text-2xl font-semibold text-blue-800">
            Generating Report
          </p>
          
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
          </div>
        
        </div>
      
      </div>
    
    </div>
  );
};


export default LoadingAnimation;