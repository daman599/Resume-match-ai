'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

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
    <motion.nav
      initial={{ opacity: 0, filter: "blur(3px)", y: -5 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 py-2.5">

      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link href={process.env.NEXT_PUBLIC_BASE_URL!}>
          <div className="flex items-center justify-center gap-2 text-white">
            <Image
              src="/icon.svg"
              alt="Logo"
              width={24}
              height={24}
              className="bg-white p-[2px] md:p-[3px] rounded-xl size-5 sm:size-6"
            />
            <span className="text-sm sm:text-base lg:text-lg font-semibold">ResumeMatch AI</span>
          </div>
        </Link>

        <div className="relative">
          {char ? (
            <>
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className="size-6 sm:size-7 md:size-8 bg-white text-black text-base sm:text-lg md:text-xl font-bold rounded-full flex items-center justify-center cursor-pointer"
              >
                {char}
              </button>

              {showProfile && (
                <div className="absolute right-2 top-3 min-w-[12rem] max-w-[90vw] bg-white/90 text-black rounded-lg shadow-lg py-2 z-10">

                  <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-gray-500">
                    <span className="text-sm font-medium truncate max-w-[70%]">{session.data?.user?.name}</span>
                    <Image
                      src={session.data?.user?.image || "/user.png"}
                      alt="User"
                      width={28}
                      height={28}
                      className="rounded-full border border-gray-300"
                    />
                  </div>

                  <button onClick={() => signOut()}
                    className="w-full h-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <button onClick={() => signIn("google")}
              className="bg-white/10 border border-white/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-white 
                flex items-center justify-center gap-1 sm:gap-2 hover:bg-white/20 cursor-pointer transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-5 sm:h-5"
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
              <span className="text-xs sm:text-sm">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
