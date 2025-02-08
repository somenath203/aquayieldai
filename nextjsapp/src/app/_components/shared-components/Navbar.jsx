'use client';

import Image from 'next/image';
import { useRef } from 'react';

import AboutTheProjectModal from './AboutTheProjectModal';


const Navbar = () => {


  const modalRef = useRef();


  return (
    <>
      <header className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">

        <div className="container mx-auto px-6 py-4">
          
          <div className="flex items-center justify-between">
            
            <div className="flex items-center space-x-2">
              
              <div className="relative w-8 h-8">
                
                <Image
                  src="/irrigation-image.png"
                  alt="Logo"
                  width={32}
                  height={32}
                />

              </div>

              <span className="text-xl font-semibold text-blue-600">
                AquaYield AI
              </span>

            </div>

            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              onClick={() => modalRef?.current?.showModal()}
            >
              About
            </button>

          </div>

        </div>

      </header>

      <AboutTheProjectModal modalRef={modalRef} />
    
    </>

  );

};


export default Navbar;
