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

export default function Jobs() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const parsedText = useStore((state) => (state.parsedText));
    const setJobs = useStore((state) => (state.updateJobs));
    const jobs = useStore((state) => (state.jobs));
    const router = useRouter();

    async function APIcall() {
        try {
            const response = await axios.post("/api/ai-processing",
                { resumeText: parsedText }
            )
            console.log(response.data)
            setJobs(response.data.suitableJobs);

        } catch (err) {
            console.log("error", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (jobs.length > 0) {
            return;
        }

        if (parsedText) {
            setLoading(true);
            APIcall();
        }
    }, [])

    if (loading) {
        return <Loader>
            <p className="text-xl text-gray-400">Analyzing your resume. Please wait....</p>
        </Loader>
    }

    return (
        <>
            {error && <ErrorComponent />}
            {jobs && jobs.length > 0 && (
                <div className="px-4 py-20">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 max-w-7xl mx-auto">

                        <div className="w-full flex justify-center items-start mb-10">
                            <BlurText
                                text="Here are the latest jobs matching to your profile..."
                                delay={150}
                                animateBy="words"
                                direction="top"
                                className={`text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0096FF] ${inter.variable}`}
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {jobs.map((job) => (
                                    <div
                                        key={job.jobId}
                                        className="border-2 border-gray-600 bg-black p-4 rounded-3xl shadow-md text-gray-300 w-full"
                                    >
                                        <p className={`text-lg sm:text-xl mb-1 font-semibold ${inter.variable}`}>
                                            {job.title}
                                        </p>

                                        <div className="mt-3 mb-3 space-y-1">
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
                                        </div>

                                        <a
                                            href={job.redirect_url}
                                            className={`text-blue-400 mt-2 mb-2 underline ${inter.variable}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Job
                                        </a>

                                        <p className={`line-clamp-5 ${plusJakarta.variable} text-base text-gray-600 mt-2`}>
                                            {job.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                    </div>

                    <div className="mt-10 flex flex-col items-center justify-center space-y-4 text-center text-gray-600 text-xl">
                        <button
                            onClick={() => router.prefetch("/resume-optimize")}
                            className={`bg-black w-full max-w-xs sm:max-w-md md:max-w-lg h-[50px] text-lg sm:text-xl font-semibold p-2 cursor-pointer border-black hover:underline rounded-2xl ${inter.variable}`}
                        >
                            Get tips to optimize resume.
                        </button>
                    </div>   
                </div>
            )}
        </>
    );
}
