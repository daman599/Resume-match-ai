import { UploadCloud } from 'lucide-react';

export default function UploadBox() {
  return (
    <div
      className="border border-white/30 border-dashed rounded-2xl text-center
                 bg-black/30 backdrop-blur-md shadow-xl
                 w-full max-w-xl h-80 sm:h-96 p-6 sm:p-10 md:p-12 
                 mt-10 md:mt-0 md:ml-[-3rem] lg:ml-[-5rem] xl:ml-[-6rem]
                 flex flex-col items-center justify-center space-y-4"
    >
      <UploadCloud className="text-white mb-2 sm:mb-4" size={48} />
      
      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
        Drag and drop your resume here
      </p>
      
      <p className="text-sm sm:text-base text-gray-400 -mt-2 sm:-mt-1">or</p>
      
      <button
        className="bg-white/10 border border-white/20 px-6 py-3 rounded-md text-base sm:text-lg text-white 
                   hover:bg-white/20 transition duration-200 ease-in-out focus:outline-none focus:ring-2 
                   focus:ring-white/30"
      >
        Select File
      </button>
    </div>
  );
}



