'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const session = useSession();
  const [char, setChar] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      const name = session.data?.user?.name;
      if (name) {
        setChar(name.charAt(0).toUpperCase());
      }
    }
  }, [session]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href={process.env.NEXT_PUBLIC_BASE_URL!}>
          <h1 className="text-sm sm:text-base lg:text-lg font-semibold flex items-center gap-2 text-white">
            <Image
              src="/icon.svg"
              alt="Logo"
              width={24}
              height={24}
              className="bg-white p-[3px] rounded-xl w-6 h-6 sm:w-6 sm:h-6"
            />
            ResumeMatch AI
          </h1>
        </Link>

        <div className="relative">
          {char ? (
            <>
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white text-black text-base sm:text-lg md:text-xl font-bold rounded-full flex items-center justify-center cursor-pointer border-2"
              >
                {char}
              </button>

              {showProfile && (
                <div className="absolute right-2 top-full mt-2 min-w-[12rem] max-w-[90vw] bg-white/90 text-black rounded-lg shadow-lg py-2 z-10">
                  <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-gray-500">
                    <p className="text-sm font-medium truncate max-w-[70%]">{session.data?.user?.name}</p>
                    <Image
                      src={session.data?.user?.image!}
                      alt="User"
                      width={28}
                      height={28}
                      className="rounded-full border border-gray-300"
                    />
                  </div>

                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-white/10 border border-white/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:bg-white/20 hover:shadow-md cursor-pointer transition-all duration-200"
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
                  d="M15.5475 8.30327C14.6407 7.49361 13.4329 7 12.1089 7C9.28696 7 7 9.23899 7 12C7 14.761 9.28696 17 12.1089 17C15.5781 17 16.86 14.4296 17 12.4167H12.841"
                  stroke="currentColor"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="currentColor"
                />
              </svg>
              <span className="mt-0.5 sm:mt-0">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
