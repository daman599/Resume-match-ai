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

interface Jobtype {
    "_id": string,
    "jobId": string,
    "title": string,
    "location": string,
    "company": string,
    "jobCategory": string,
    "redirect_url": string,
    "description": string,
    "createdAt": string,
    "__v": number,
}

export default function Jobs() {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const parsedText = useStore((state) => (state.parsedText));
    const [jobs, setJobs] = useState<Jobtype[]>([]);
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
            {jobs && jobs.length === 0 && <p className="text-white">No jobs found matching your profile.</p>}
            <div className=" px-4 py-20">
                <BlurText
                    text="Here are the latest jobs matching to your profile..."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-4xl mb-4 mt-2 ml-28 ${plusJakarta.variable} font-semibold text-blue-600"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job.jobId} className="border-2 border-amber-950 bg-gray-300 p-4 rounded-md shadow-md text-black">
                            <p className="font-bold text-lg">{job.title}</p>
                            <div className="flex gap-2">
                                <Building2 />
                                <p className="text-xl font-semibold">{job.company}</p>
                            </div>
                            <div className="flex gap-2">
                                <MapPin />
                                <p className="text-sm">{job.location}</p>
                            </div>
                            <div className="flex gap-2">
                                <Dot />
                                <p className="text-sm italic">{job.jobCategory}</p>
                            </div>
                            <a href={job.redirect_url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                                View Job
                            </a>
                            <p className="line-clamp-3 text-sm text-gray-800 mt-2">{job.description}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 text-center text-gray-300 text-xl">
                    <button onClick={() => {
                        router.push("/resume-optimize");
                    }}
                        className={` bg-black w-[300px] h-[50px] p-2 cursor-pointer border-black rounded-2xl ${inter.variable}`}>Get tips to optimize resume.</button>
                </div>
            </div>
        </>
    );
}
