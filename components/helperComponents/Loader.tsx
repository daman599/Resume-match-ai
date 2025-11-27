import React from "react";

interface PropType {
  children: React.ReactNode;
}

export default function Loader({ children }: PropType) {
  return (
    <div
      className="flex flex-col items-center justify-center 
                 h-screen space-y-4 text-white px-4"
    >
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 
                   border-4 border-gray-300 border-t-blue-500 
                   rounded-full animate-spin"
      ></div>

      <div className="text-sm sm:text-base md:text-lg text-center">
        {children}
      </div>
    </div>
  );
}
