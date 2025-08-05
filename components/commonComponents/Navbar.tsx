'use client'
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [char, setChar] = useState<string | null>(null);
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      setChar(session.data?.user?.name!.charAt(0)!);
    }
  }, [session])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 
                    bg-black/40 backdrop-blur-md border-b border-white/10 
                    px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-sm sm:text-base lg:text-lg font-semibold 
                       flex items-center gap-2 text-white">
          <img
            src="/icon.svg"
            alt="Logo"
            className="w-6 h-6 sm:w-6 sm:h-6 bg-white p-[3px] rounded-xl"
          />
          ResumeMatch AI
        </h1>
        {char ? (
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 
               bg-white text-black 
               text-base sm:text-lg md:text-xl 
               font-bold rounded-full 
               flex items-center justify-center"
          >
            {char}
          </div>
        )

          :
          (<button
            onClick={async () => {
              await signIn();
            }}
            className="bg-white/10 border border-white/20 
                     px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-white 
                     flex items-center gap-1 sm:gap-2 text-xs sm:text-sm 
                     hover:bg-white/20 hover:shadow-md cursor-pointer 
                     transition-all duration-200"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M15.5475 8.30327C14.6407 7.49361 13.4329 7 12.1089 7C9.28696 7 7 
                9.23899 7 12C7 14.761 9.28696 17 12.1089 17C15.5781 17 16.86 14.4296 
                17 12.4167H12.841"
                stroke="currentColor"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 
                12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 
                6.47715 22 12 22Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              />
            </svg>
            <span className="mt-0.5 sm:mt-0">Sign In</span>
          </button>)
        }
      </div>
    </nav>
  );
}