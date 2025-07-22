import { ReactNode } from "react";

interface PropType{
  children : ReactNode
}
export default function Loader({children}:PropType) {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4  text-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      {children}
    </div>
  );
}
