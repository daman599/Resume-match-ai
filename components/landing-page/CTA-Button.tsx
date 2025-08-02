'use client'

import { UploadCloud } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function CTAButton() {
  const router = useRouter();

  return (
    <div className="mt-6 sm:mt-8">
      <button
        onClick={() => router.push("/resume-upload")}
        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 
                   border border-white text-white font-semibold rounded-md 
                   hover:bg-white hover:text-black transition-all duration-200 
                   text-sm sm:text-base cursor-pointer"
      >
        <UploadCloud className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Upload Your Resume</span>
      </button>
    </div>
  );
}

