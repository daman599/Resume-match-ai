'use client'

import useStore from "@/lib/state-store/store";
import axios from "axios";
import Loader from "@/components/helperComponents/Loader";
import { useState, useEffect } from "react";
import ErrorComponent from "@/components/helperComponents/Error";

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
    const [jobs, setJobs] = useState<Jobtype[] | null>(null);

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
            {jobs && jobs.map((job) => (
                <div key={job.jobId} className="flex items-center justify-start h-screen w-screen">
                    <div className="w-[300px] h-[300px] border-2 border-b-amber-950 bg-amber-50 p-4">
                        <p className="font-bold">{job.title}</p>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <p>{job.jobCategory}</p>
                        <a href={job.redirect_url} className="text-blue-600 underline" target="_blank">
                            View Job
                        </a>
                        <p className="line-clamp-4 text-sm text-gray-800">{job.description}</p>
                    </div>
                </div>
            ))
            }
        </>
    );
} 
           