'use client'

import useStore from "@/lib/state-store";
import axios from "axios";
import Loader from "@/components/helperComponents/Loader";
import { useState, useEffect } from "react";
import ErrorComponent from "@/components/helperComponents/Error";
import { Building2, MapPin, Dot } from "lucide-react";
import { inter , plusJakarta } from "@/lib/fonts";
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
             <div className=" px-4 py-20">
                <BlurText
                    text="Here are the latest jobs matching to your profile..."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className={` mb-4 mt-2 ml-28 ${inter.variable} font-semibold text-3xl text-[#0096FF]`}
                />

                <div className="ml-28 mt-9 mb-10 mr-26">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {jobs.map((job) => (
                            <div
                                key={job.jobId}
                                className="border-2 w-[400px] h-[380px] border-gray-600 bg-black p-4 rounded-3xl shadow-md text-gray-300"
                            >
                                <p className={`text-xl mb-1 text-gray-600 font-semibold ${inter.variable}`}>{job.title}</p>

                                <div className="mt-1 mb-1"> 
                                    <div className={`flex gap-2 ${inter.variable} text-sm text-gray-300`}>
                                        <Building2 />
                                        <p>{job.company}</p>
                                    </div>
                                    <div className={`flex gap-2 ${inter.variable} text-sm text-gray-300`}>
                                        <MapPin />
                                        <p>{job.location}</p>
                                    </div>
                                    <div className={`flex gap-2 ${inter.variable} text-sm text-gray-300`}>
                                        <Dot />
                                        <p>{job.jobCategory}</p>
                                    </div>
                                </div>

                                <a
                                    href={job.redirect_url}
                                    className={`text-blue-400 underline ${inter.variable}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Job
                                </a>

                                <p className={`line-clamp-4 ${plusJakarta.variable} text-xl text-gray-300 mt-2`}>{job.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 text-center text-gray-600 text-xl">
                    <button onClick={() => {
                        router.prefetch("/resume-optimize");
                    }}
                    className={` bg-black w-[400px] h-[50px] text-2xl font-semibold p-2 cursor-pointer border-black hover:underline  rounded-2xl ${inter.variable}`}>
                        Get tips to optimize resume.
                    </button>
                </div>
            </div>
            
        </>
    );
}
