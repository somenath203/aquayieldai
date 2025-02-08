'use client';

import { TbClipboardX } from "react-icons/tb"; 
import { HiArrowRight } from "react-icons/hi2";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import { HiDocumentDownload } from "react-icons/hi";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

import { modelResponseState, userInputState } from "@/zustand-store/store";
import NotAvailable from "@/app/_components/shared-components/NotAvailable";


const Page = () => {

  
  const [ loading, setLoading ] = useState(false);

  const router = useRouter();


  const { userInputs } = userInputState((state) => state);
  
  const { responseFromBackendFastAPI } = modelResponseState((state) => state);


  if (!userInputs || !responseFromBackendFastAPI) {
    return (
      <NotAvailable 
        heading='No Data Available for PDF Download' 
        description='Please generate a report first in order to download its data as PDF.'
      />
    );
  }

  
  const location = userInputs?.location;

  const temperature = userInputs?.weather_details?.temperature;

  const humidity = userInputs?.weather_details?.humidity;

  const cropType = userInputs?.crop_type;

  const soilType = userInputs?.soil_type;

  const farmSize = userInputs?.farm_size;

  const waterSource = userInputs?.water_source;

  const soilMoisture = userInputs?.soil_moisture;

  const irrigationMethod = userInputs?.irrigation_method;


  const parsedResponse = responseFromBackendFastAPI ? JSON.parse(responseFromBackendFastAPI.replace(/```json|```/g, '').trim()) : null;

  const locationInsights = parsedResponse?.locationInsights;

  const cropRecommendations = parsedResponse?.cropRecommendations;

  const irrigationSchedule = parsedResponse?.irrigationSchedule;

  const waterSourceOptimizations = parsedResponse?.waterSourceOptimization;

  const soilMoistureRecommendations = parsedResponse?.soilMoistureRecommendations;

  const futureTrends = parsedResponse?.futureTrends;

  const summary = parsedResponse?.summary;


  const downloadAnalysisPDF = async () => {

    try {

      setLoading(true);

      const reportHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              
              :root {
                --primary-blue: #1a73e8;
                --primary-dark: #1557b0;
                --light-blue: #f3f6fc;
                --border-blue: #cee0fd;
                --text-primary: #1f2937;
              }

              body {
                font-family: 'Inter', sans-serif;
                line-height: 1.6;
                color: var(--text-primary);
                max-width: 900px;
                margin: 0 auto;
                padding: 40px;
                background-color: #fafbff;
              }

              .report-header {
                text-align: center;
                margin-bottom: 40px;
                padding: 24px;
                border-radius: 8px;
                background: var(--primary-blue);
                color: white;
              }

              .report-title {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
              }

              .report-date {
                color: rgba(255, 255, 255, 0.9);
                font-size: 14px;
              }

              .section {
                margin-bottom: 30px;
                background: #ffffff;
                padding: 24px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(26, 115, 232, 0.1);
                border: 1px solid var(--border-blue);
              }

              .input-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                margin-bottom: 24px;
              }

              .input-item {
                display: flex;
                flex-direction: column;
                padding: 12px;
                background: var(--light-blue);
                border-radius: 6px;
              }

              .input-label {
                font-weight: 500;
                color: var(--primary-blue);
                margin-bottom: 4px;
                font-size: 0.9rem;
              }

              .input-value {
                color: var(--text-primary);
                font-weight: 500;
              }

              .analysis-content h1,
              .analysis-content h2,
              .analysis-content h3 {
                margin-top: 20px;
                margin-bottom: 12px;
              }

              .analysis-content h1 {
                font-size: 1.7rem; 
                font-weight: bold;
              }

              .analysis-content h2 {
                font-size: 1.2rem; 
                font-weight: bold;
              }

              .analysis-content h3 {
                font-size: 1.125rem;
                font-weight: normal;
              }

              .analysis-content ul,
              .analysis-content ol {
                padding-left: 20px;
                margin-bottom: 16px;
                font-weight: normal;
              }

              .analysis-content p {
                margin-bottom: 12px;
                font-weight: normal;
              }

              .analysis-content li {
                margin-bottom: 8px;
                font-weight: normal;
              }
            </style>
          </head>
          <body>
            <div class="report-header">
              <div class="report-title">Agricultural Analysis Report</div>
              <div class="report-date">${new Date().toLocaleDateString()}</div>
            </div>

            <div class="section">
              <h3 class="section-title">Farm Information</h3>
              <div class="input-grid">
                <div class="input-item">
                  <span class="input-label">Location</span>
                  <span class="input-value">${location}</span>
                </div>
                <div class="input-item">
                  <span class="input-label">Temperature</span>
                  <span class="input-value">${temperature}</span>
                </div>
                <div class="input-item">
                  <span class="input-label">Humidity</span>
                  <span class="input-value">${humidity}</span>
                </div>
                <div class="input-item">
                  <span class="input-label">Crop Type</span>
                  <span class="input-value">${cropType}</span>
                </div>
                <div class="input-item">
                  <span class="input-label">Soil Type</span>
                  <span class="input-value">${soilType}</span>
                </div>
                <div class="input-item">
                  <span class="input-label">Farm Size</span>
                  <span class="input-value">${farmSize}</span>
                </div>
                <div class="input-item">
                  <span class="input-label">Water Source</span>
                  <span class="input-value">${waterSource}</span>
                </div>
                <div class="input-item">
                  <span class="input-label">Soil Moisture</span>
                  <span class="input-value">${soilMoisture}</span>
                </div>
                <div class="input-item">
                  <span class="input-label">Irrigation Method</span>
                  <span class="input-value">${irrigationMethod}</span>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="analysis-content">
                ${marked(locationInsights)}
              </div>
            </div>

            <div class="section">
              <div class="analysis-content">
                ${marked(cropRecommendations)}
              </div>
            </div>

            <div class="section">
              <div class="analysis-content">
                ${marked(irrigationSchedule)}
              </div>
            </div>

            <div class="section">
              <div class="analysis-content">
                ${marked(waterSourceOptimizations)}
              </div>
            </div>

            <div class="section">
              <div class="analysis-content">
                ${marked(soilMoistureRecommendations)}
              </div>
            </div>

            <div class="section">
              <h3 class="section-title">Future Trends Analysis</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
                <thead>
                  <tr style="background-color: var(--primary-blue); color: white;">
                    <th style="padding: 12px; text-align: left; border: 1px solid var(--border-blue);">Time Frame</th>
                    <th style="padding: 12px; text-align: center; border: 1px solid var(--border-blue);">Soil Moisture (%)</th>
                    <th style="padding: 12px; text-align: center; border: 1px solid var(--border-blue);">Water Usage (L)</th>
                    <th style="padding: 12px; text-align: center; border: 1px solid var(--border-blue);">Crop Yield</th>
                  </tr>
                </thead>
                <tbody>
                  ${futureTrends?.map((trend) => `
                    <tr style="border: 1px solid var(--border-blue);">
                      <td style="padding: 12px; text-align: left; border: 1px solid var(--border-blue); font-weight: 500;">${trend.timeframe}</td>
                      <td style="padding: 12px; text-align: center; border: 1px solid var(--border-blue);">${trend.soilMoisture}</td>
                      <td style="padding: 12px; text-align: center; border: 1px solid var(--border-blue);">${trend.waterUsage}</td>
                      <td style="padding: 12px; text-align: center; border: 1px solid var(--border-blue);">${trend.cropYield}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="section">
              <div class="analysis-content">
                ${marked(summary)}
              </div>
            </div>

          </body>
        </html>
      `;

      const { data } = await axios.post('/api/generate-analysis-pdf-report', {

        htmlContent: reportHtml

      }, { responseType: 'blob' });


      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(data);

      const a = document.createElement("a");

      a.href = url;

      a.download = `analysis-report-${uuidv4()}.pdf`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      toast.success('PDF downloaded successfully', {
        duration: 3000
      });

      
    } catch (error) {

      console.log(error);

      toast.error('Something went wrong while generating PDF. Please try again after sometime.', {
        duration: 5000
      });
      
      
    } finally {

      setLoading(false);

    }

  }


  const onRedirectToHomePage = () => {
    
    userInputState.setState({
     userInputs: null 
    });

    modelResponseState.setState({
      responseFromBackendFastAPI: null
    });

    router.push('/');

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600/90 to-blue-800/90 px-6">
      
      <div className="card w-full max-w-6xl bg-white shadow-xl p-10 rounded-2xl mt-24 mb-10">

      <div className="text-center space-y-6">

        <div className="space-y-2">

          <h2 className="text-xl lg:text-3xl font-bold text-gray-800">Download Full Analysis Report</h2>
          
          <p className="text-gray-600">Get your complete analysis in PDF format</p>
        
        </div>
        
        <div className="w-full lg:w-7/12 m-auto flex flex-col gap-5 items-center justify-center">

          {loading ? 
            <button className="btn btn-primary btn-lg gap-2" disabled>
              <AiOutlineLoading3Quarters className="text-lg lg:text-2xl animate-spin" />
              Generating Analysis PDF...
            </button> 
            : 
            <button 
              onClick={downloadAnalysisPDF}
              className="w-full btn btn-error btn-lg gap-2 hover:scale-105 transition-transform duration-300"
            >
              <HiDocumentDownload className="hidden lg:block text-3xl lg:text-4xl text-white" />
              <span className="text-white">Download PDF Report</span>
            </button>
          }

          <button 
            className="w-full btn btn-outline btn-lg gap-2 hover:scale-105 transition-transform duration-300"
            onClick={onRedirectToHomePage}
            disabled={loading}
          >
            <HiArrowRight className="text-2xl" />
            Go to Home
          </button>

        </div>
        
      </div>

      </div>

    </div>
  );
};


export default Page;