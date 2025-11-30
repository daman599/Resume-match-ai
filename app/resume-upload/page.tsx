'use client';

import axios from "axios";
import { UploadCloud } from 'lucide-react';
import { useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { useStore } from "@/lib/state-store";
import { Loader } from "@/components/helperComponents/Loader";
import { ErrorComponent } from "@/components/helperComponents/Error";
import { motion } from "motion/react";

export default function ResumeUpload() {

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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
    } catch (err: unknown) {
      console.log("Error while uploading resume", err);
      setError(true);
    }
  }

  function helper(file: File) {
    updateJobs([]);
    updateTips([]);
    setLoading(true);
    APICall(file);
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

  if (error) return <ErrorComponent />

  if (loading) return <Loader text={"Uploading your resume..."} />

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen relative z-10 flex items-center justify-center px-4 sm:px-6 md:px-8" >

      <div {...getRootProps()}
        className="w-full 
        max-w-sm sm:max-w-md md:max-w-lg 
        p-4 sm:p-6 md:p-8 rounded-3xl border border-white/20 border-dashed 
        bg-white/5 backdrop-blur-xl shadow-2xl 
        flex flex-col items-center justify-center space-y-4 
        hover:border-blue-400 transition-all duration-300"
      >
        <input {...getInputProps()} />

        <UploadCloud className="text-[#0096FF] animate-pulse" size={40} />

        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center">
          Drag and drop your resume here.
        </h1>

        <span className="text-xs sm:text-sm md:text-base text-gray-300">Or</span>

        <button onClick={() => inputRef.current?.click()}
          className="px-4 py-2 sm:px-6 sm:py-3  
          text-xs sm:text-sm md:text-base rounded-md 
          bg-white/10 border border-white/20 text-white font-medium
          hover:bg-white/20 hover:shadow-md focus:outline-none
          focus:ring-2 focus:ring-white/30 transition duration-300 cursor-pointer"
        >
          Select File
        </button>

        <input
          type="file"
          ref={inputRef}
          accept=".pdf"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              helper(file);
            }
          }}
          className="hidden"
        />
      </div>
    </motion.div >
  );
}
