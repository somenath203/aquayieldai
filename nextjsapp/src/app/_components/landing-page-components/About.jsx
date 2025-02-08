'use client';

import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const About = () => {


  const router = useRouter();


  return (
    <section className="py-24 px-6 bg-blue-50">

      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="order-2 lg:order-1">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left">
              About AquaYield AI
            </h2>

            <p className="text-lg text-center lg:text-left text-gray-600 mb-8">
              AquaYield AI is an advanced precision irrigation platform that empowers farmers to optimize water usage, maximize crop yields, and adopt sustainable farming practices using AI-driven insights and real-time data.
            </p>

            <div className="flex justify-center lg:justify-start">
              <button 
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                onClick={() => router.push('/input-form')}
              >
                <span>Get Started</span>
                <FaArrowRight className="text-sm" />
              </button>
            </div>

          </div>

          <div className="order-1 lg:order-2">
            
            <div className="rounded-2xl overflow-hidden shadow-lg">
              
              <Image
                src="/aboutusirrigationimage.png" 
                alt="Irrigation system"
                width={800}
                height={450}
                className="object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};


export default About;
