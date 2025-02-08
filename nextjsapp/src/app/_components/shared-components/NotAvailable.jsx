'use client';

import { TbClipboardX } from "react-icons/tb"; 
import { HiArrowRight } from "react-icons/hi2";
import Link from "next/link";


const NotAvailable = ({ heading, description }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600/90 to-blue-800/90 px-6">
        
        <div className="mt-16 bg-white/10 rounded-2xl p-12 text-center flex flex-col items-center gap-6 shadow-2xl">
          
          <div className="bg-white/10 p-6 rounded-full">
            <TbClipboardX className="text-7xl lg:text-8xl text-white animate-pulse" />
          </div>

          <div className="space-y-3">
            
            <h2 className="text-2xl lg:text-3xl font-bold text-white">{heading}</h2>
            
            <p className="text-blue-100 text-lg">{description}</p>
          
          </div>

          <Link 
            href='/input-form' 
            className="mt-4 group flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
          
            <span>Create Analysis</span>

            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />

          </Link>

        </div>

    </div>
  )
}


export default NotAvailable;