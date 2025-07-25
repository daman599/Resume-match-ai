'use client'

import { UploadCloud } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function CTAButton() {
  const router = useRouter();

  return (
    <div className="mt-8">
      <button onClick={()=>{
        router.push("/resume-upload");
      }}
        className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-200 text-sm sm:text-base cursor-pointer">
        <UploadCloud className="w-5 h-5" />
        Upload Your Resume
      </button>
    </div>
  );
}
