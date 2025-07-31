import { ReactNode } from "react";

export default function NoResumeMessage({children}:{children:ReactNode}){
  return (
    <>
    <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex flex-col items-center justify-center space-y-2 text-center text-white">
         {children}
        </div>
      </div>
    </>
  );
}