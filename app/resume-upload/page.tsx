'use client';

import axios from "axios";
import { UploadCloud } from 'lucide-react';
import { useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import Loader from "@/components/helperComponents/Loader";
import useStore from "@/lib/state-store";
import ErrorComponent from "@/components/helperComponents/Error";
import LightRays from "@/components/ui/LightRays";

export default function ResumeUpload() {

  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const updateParsedText = useStore((state) => state.updateParsedText);
  const updateJobs = useStore((state) => state.updateJobs);
  const updateTips = useStore((state) => state.updateTips);

  async function APICall(file: File) {

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("/api/resume/parse", formData);

      if (response.data) {
        updateParsedText(response.data.parsedText);
        router.push("/jobs");
      }
    } catch (err) {
      console.log("ERROR", err);
      setError(true);
    }
  }

  function helper(file: File) {
    updateJobs([]);
    updateTips([]);
    setLoading(true);
    APICall(file);
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      helper(file);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      helper(file);
    },
    noClick: true,
  });

  if (loading) {
    return (
      <Loader>
        <p className="text-xl text-gray-400">Uploading your resume...</p>
      </Loader>
    );
  }

  return (
    <>
      {error && <ErrorComponent />}
      <div className="relative min-h-screen bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#0096FF"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="w-full h-full"
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 md:px-8">
          <div
            {...getRootProps()}
            className="w-full 
        max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 
        p-4 sm:p-6 md:p-8                    
        rounded-3xl border border-white/20 border-dashed 
        bg-white/5 backdrop-blur-xl shadow-2xl 
        flex flex-col items-center justify-center 
        space-y-4 text-center
        hover:border-blue-400 transition-all duration-300"
          >
            <input {...getInputProps()} />

            <UploadCloud className="text-[#0096FF] animate-pulse" size={40} />

            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
              Drag and drop your resume here
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-sm">
              Or
            </p>

            <button
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 sm:px-6 sm:py-3  
          text-xs sm:text-sm md:text-base    
          rounded-md 
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
      </div>

    </>
  );
}
