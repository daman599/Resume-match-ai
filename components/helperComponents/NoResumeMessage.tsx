import { ReactNode } from "react";

export default function NoResumeMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen px-4"> 
      <div className="flex flex-col items-center justify-center 
                      space-y-2 text-center text-white 
                      text-sm sm:text-base md:text-lg"> 
        {children}
      </div>
    </div>
  );
}
