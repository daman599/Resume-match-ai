'use client'

import axios from "axios";
import Link from "next/link";
import { useStore } from "@/lib/state-store";
import { useState, useEffect } from "react";
import { Building2, MapPin, MoveUpRight, Dot } from "lucide-react";
import { inter, plusJakarta } from "@/lib/fonts";
import Loader from "@/components/helperComponents/Loader";
import ErrorComponent from "@/components/helperComponents/Error";
import NoResumeMessage from "@/components/helperComponents/NoResumeMessage";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { motion, useAnimate, stagger } from "motion/react";
import LoadingSkeleton from "@/components/helperComponents/LoadingSkeleton";

export default function Jobs() {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasResume, setHasResume] = useState<boolean>(true);

  const parsedText = useStore((state) => (state.parsedText));
  const setJobs = useStore((state) => (state.updateJobs));
  const jobs = useStore((state) => (state.jobs));

  const text = "Here are the latest jobs matching to your profile:";
  const [scope, animate] = useAnimate();
  const [jobsLoading, setJobsLoading] = useState<boolean>(true);

  async function APIcall() {
    try {
      const response = await axios.post("/api/ai-processing",
        { resumeText: parsedText }
      )
      if (response.data) {
        setJobs(response.data.suitableJobs);
      }

    } catch (err: unknown) {
      console.log("Jobs fetching failed", err);
      setError(true);
    } finally {
      setLoading(false);

    }
  }

  function tempLoading() {
    setTimeout(() => {
      setJobsLoading(false);
    }, 5000);
  }

  useEffect(() => {
    if (jobs.length > 0) {
      tempLoading();
      animate(
        "span",
        { opacity: 1, y: 0, filter: "blur(0px)" },
        { duration: 0.8, ease: "easeIn", delay: stagger(0.3) }
      );
    }
  }, [jobs])

  useEffect(() => {
    if (parsedText === "") {
      setHasResume(false);
      return;
    }

    if (jobs.length === 0) {
      setLoading(true);
      APIcall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return <ErrorComponent />
  }

  if (!hasResume) {
    return <NoResumeMessage>
      <p className="text-xl text-gray-400">Please provide

        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/resume-upload`}
          className="text-[#0096FF] ml-1.5 cursor-pointer">resume</Link> to get job recommendations.</p>

    </NoResumeMessage>
  }

  if (loading) {
    return <Loader>
      <p className="text-xl text-gray-400">Analyzing your resume. Please wait....</p>
    </Loader>
  }

  return (
    <>
      {jobs.length > 0 && (
        <div className="px-4 py-10 sm:px-6 sm:py-12 md:px-10 xl:px-20 md:py-16 lg:py-20">

          <div ref={scope} className="w-full max-w-6xl text-center mt-6 mb-10 mx-auto">
            {text.split(" ").map((word, i) => (
              <motion.span initial={{ opacity: 0, y: 10, filter: "blur(7px)" }}
                key={i} className={`inline-block text-xl md:text-2xl text-[#0096FF] ${plusJakarta.variable} font-medium`}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </div>

          {jobsLoading ? <LoadingSkeleton /> : (
            <>
              <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <SpotlightCard
                      key={job._id}
                      className="p-3 border-1 overflow border-gray-800 bg-black rounded-2xl shadow-md text-gray-300 w-full"
                    >
                      <span className={`text-lg sm:text-xl mb-1 font-semibold ${inter.variable}`}>
                        {job.title}
                      </span>

                      <div className="flex flex-col items-start justify-center my-4 space-y-2.5 ">
                        <div className={`flex items-center gap-2.5 ${inter.variable} text-gray-600 text-xs md:text-sm`}>
                          <Building2 />
                          <span >{job.company}</span>
                        </div>
                        <div className={`flex items-center gap-2.5 ${inter.variable} text-gray-600 text-xs md:text-sm`}>
                          <MapPin />
                          <span >{job.location}</span>
                        </div>
                        <div className={`flex items-center justify-center gap-2.5 ${inter.variable} text-gray-600 text-xs md:text-sm`}>
                          <Dot size={25} />
                          <span >{job.jobCategory}</span>
                        </div>

                        <a
                          href={job.redirect_url}
                          className={`flex items-center gap-1 text-[#0096FF] mt-3 mb-2 underline ${inter.variable}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Job
                          <MoveUpRight size={12} />
                        </a>

                        <p className={`${plusJakarta.variable} text-sm md:text-base text-gray-600 flex-grow`}>
                          {job.description}
                        </p>

                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>

              <div className="w-full flex justify-center px-4 sm:px-6 mt-12 sm:mt-16">
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/resume-optimize`}
                  className="flex flex-col items-center justify-center space-y-4 text-center text-xl cursor-pointer"
                >
                  <div className="flex items-center gap-3 border-2 border-gray-600 rounded-full px-6 py-2 hover:border-[#0096FF] transition-colors">
                    <div className="size-1.5 md:size-2 rounded-full animate-pulse shrink-0 bg-[#0096FF]"></div>
                    <span className={`text-xs sm:text-lg font-semibold text-gray-300 ${plusJakarta.variable}`}>
                      Get tips to optimize resume.
                    </span>
                  </div>
                </Link>
              </div>
            </>
          )}

        </div >
      )
      }
    </>
  );
}
