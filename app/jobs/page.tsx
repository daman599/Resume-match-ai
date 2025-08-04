'use client'

import useStore from "@/lib/state-store";
import axios from "axios";
import Loader from "@/components/helperComponents/Loader";
import { useState, useEffect } from "react";
import ErrorComponent from "@/components/helperComponents/Error";
import { Building2, MapPin, Dot } from "lucide-react";
import { inter, plusJakarta } from "@/lib/fonts";
import { useRouter } from "next/navigation";
import BlurText from "@/components/ui/BlurText";
import NoResumeMessage from "@/components/helperComponents/NoResumeMessage";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { MoveUpRight } from "lucide-react";

export default function Jobs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const parsedText = useStore((state) => (state.parsedText));
  const setJobs = useStore((state) => (state.updateJobs));
  const jobs = useStore((state) => (state.jobs));
  const router = useRouter();
  const [hasResume, setHasResume] = useState<boolean>(true);

  async function APIcall() {
    try {
      const response = await axios.post("/api/ai-processing",
        { resumeText: parsedText }
      )
      setJobs(response.data.suitableJobs);

    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (jobs.length > 0) {
      return;
    }

    if (parsedText === "") {
      setHasResume(false);
      return;
    }

    setLoading(true);
    APIcall();
  }, [])

  if (error) {
    return <ErrorComponent />
  }

  if (!hasResume) {
    return <NoResumeMessage>
      <p className="text-xl text-gray-400">Please provide
        <span className="text-[#0096FF] ml-1.5">resume</span> to get job recommendations.</p>
    </NoResumeMessage>
  }

  if (loading) {
    return <Loader>
      <p className="text-xl text-gray-400">Analyzing your resume. Please wait....</p>
    </Loader>
  }

  return (
    <>
      {jobs && jobs.length > 0 && (
        <div className="px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:py-20">

          <div className="w-full max-w-7xl mx-auto text-center mb-8 sm:mb-10 mt-8 sm:mt-10">
            <BlurText
              text="Here are the latest jobs matching to your profile:"
              delay={150}
              animateBy="words"
              direction="top"

              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#0096FF] ${plusJakarta.variable} font-medium`}
            />
          </div>

          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <SpotlightCard
                  key={job._id}
                  className="border-2 overflow border-gray-600 bg-black p-4 rounded-3xl shadow-md text-gray-300 w-full"
                >
                  <p className={`text-lg sm:text-xl mb-1 font-semibold ${inter.variable}`}>
                    {job.title}
                  </p>

                  <div className="my-4 space-y-2">
                    <div className={`flex gap-2 ${inter.variable} text-gray-600 text-sm`}>
                      <Building2 />
                      <p className="mt-1">{job.company}</p>
                    </div>
                    <div className={`flex gap-2 ${inter.variable} text-gray-600 text-sm`}>
                      <MapPin />
                      <p className="mt-1">{job.location}</p>
                    </div>
                    <div className={`flex gap-2 ${inter.variable} text-gray-600 text-sm`}>
                      <Dot />
                      <p className="mt-1">{job.jobCategory}</p>
                    </div>

                    <a
                      href={job.redirect_url}
                      className={`flex items-center gap-1 text-[#0096FF] my-4 underline ${inter.variable}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Job
                      <MoveUpRight size={16} />
                    </a>

                    <p className={`${plusJakarta.variable} text-base text-gray-600 mt-2 line-clamp-3 sm:line-clamp-4 md:line-clamp-5`}>
                      {job.description}
                    </p>

                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center px-4 sm:px-6 mt-12 sm:mt-16">
            <button
              onClick={() => router.push("/resume-optimize")}
              className="flex flex-col items-center justify-center space-y-4 text-center text-xl"
            >
              <div className="flex items-center gap-2 border-2 border-gray-600 rounded-full px-4 py-2 hover:border-[#0096FF] transition-colors">
                <Dot
                  size={40}
                  color="#0096FF"
                  className="animate-pulse shrink-0"
                />

                <p className={`text-sm sm:text-lg md:text-xl font-semibold text-gray-300 ${plusJakarta.variable}`}>
                  Get tips to optimize resume.
                </p>
              </div>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
