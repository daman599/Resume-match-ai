'use client';

import axios from "axios";
import { UploadCloud } from 'lucide-react';
import { useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import Loader from "@/components/helperComponents/Loader";
import useStore from "@/lib/state-store";
import ErrorComponent from "@/components/helperComponents/Error";

export default function ResumeUpload() {

  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const updateParsedText = useStore((state) => state.updateParsedText);

  async function APICall(file: File) {

    const formData = new FormData();
    formData.append("resume", file);

  try{
    const response = await axios.post("/api/parse-resume", formData);

    if (response.data) {
      updateParsedText(response.data.parsedText);
      router.push("/jobs");
    }
  }catch(err){
     console.log("ERROR",err);
     setError(true);
  }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setLoading(true);
      APICall(file);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setLoading(true);
      const file = acceptedFiles[0];
      APICall(file);
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
    {error && <ErrorComponent/> }
     <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div {...getRootProps()}
        className="w-full max-w-md sm:max-w-xl p-4 sm:p-6 md:p-8
             rounded-3xl border border-white/20 border-dashed 
             bg-white/5 backdrop-blur-xl shadow-2xl 
             flex flex-col items-center justify-center 
             space-y-4 text-center
             hover:border-blue-400 transition-all duration-300">

        <input {...getInputProps()} />

        <UploadCloud
          className="text-blue-400 animate-pulse"
          size={40}
        />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Drag and drop your resume here
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-sm">
          Or
        </p>

        <button
          onClick={() => {
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
    </>
  );
}
