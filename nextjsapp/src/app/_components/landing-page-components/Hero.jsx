'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import AboutTheProjectModal from '../shared-components/AboutTheProjectModal';


const Hero = () => {


  const modalRef = useRef();

  const router = useRouter();


  return (
    <>
      <section className="relative h-[110vh] lg:h-screen flex justify-center px-6 overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto text-center text-white mt-48 lg:mt-64">
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Precision Irrigation at Your Fingertips
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Utilize AI-powered insights to optimize water usage, track environmental conditions, and implement intelligent irrigation scheduling for sustainable agriculture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <button 
              className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              onClick={() => router.push('/input-form')}
            >
              Get Started
            </button>

            <button
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              onClick={() => modalRef?.current?.showModal()}
            >
              Learn More
            </button>

          </div>

        </div>

      </section>

      <AboutTheProjectModal modalRef={modalRef} />
      
    </>
  );
};

export default Hero;
