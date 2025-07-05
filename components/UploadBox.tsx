import { UploadCloud } from 'lucide-react';

export default function UploadBox() {
  return (
    <div className="border border-white/30 border-dashed p-10 rounded-md text-center w-80 mt-8 md:mt-0 md:-ml-10 px-8">
      <UploadCloud className="mx-auto text-white mb-4" size={36} />
      <p className="mb-2 text-base text-white">Drag and drop your resume here</p>
      <p className="text-sm text-gray-400 mb-4">or</p>
      <button className="bg-white/10 border border-white/20 px-5 py-2.5 rounded text-sm hover:bg-white/20 transition">
        Select File
      </button>
    </div>
  );
}

