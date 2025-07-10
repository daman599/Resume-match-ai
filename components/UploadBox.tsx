'use client';

import { UploadCloud } from 'lucide-react';
import { useRef, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

export default function UploadBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading ,setLoading] = useState<Boolean>(false);
   
  async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0];

    if(file){
      setLoading(true);
       axios.post("http://localhost:3000/api/resume/analyse",{
        "resume":file
      });
    }
  }

  if (loading) {
   return (
      <Loader />
    );
}

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-md sm:max-w-xl p-4 sm:p-6 md:p-8
             rounded-3xl border border-white/20 border-dashed 
             bg-white/5 backdrop-blur-xl shadow-2xl 
             flex flex-col items-center justify-center 
             space-y-4 text-center
             hover:border-blue-400 transition-all duration-300">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Upload Your Resume
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-sm">
          Let our AI match your resume with the perfect job opportunities.
        </p>

        <UploadCloud
          className="text-blue-400 animate-pulse"
          size={40}
        />

        <button
          onClick={()=>{
             inputRef.current?.click();
          }}
          className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base
               bg-white/10 border border-white/20 text-white font-medium
               hover:bg-white/20 hover:shadow-md focus:outline-none
               focus:ring-2 focus:ring-white/30 transition duration-200 cursor-pointer"
        >
          Select File
        </button>

        <input
          type="file"
          ref={inputRef}
          accept=".pdf"
          onChange={handleOnChange}
          className="hidden"
        />
      </div>
    </div>
  );
}



