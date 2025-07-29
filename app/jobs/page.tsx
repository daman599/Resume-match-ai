'use client'

import useStore from "@/lib/state-store";
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
    const [jobs, setJobs] = useState<Jobtype[]>([]);

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
            {jobs && (
                <div className="text-white px-4">
                    <p className="text-lg mb-4">Here are the latest jobs that match your profile...</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div key={job.jobId} className="border-2 border-amber-950 bg-gray-300 p-4 rounded-md shadow-md text-black">
                                <p className="font-bold text-lg">{job.title}</p>
                                <p className="text-sm">{job.company}</p>
                                <p className="text-sm">{job.location}</p>
                                <p className="text-sm italic">{job.jobCategory}</p>
                                <a href={job.redirect_url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                                    View Job
                                </a>
                                <p className="line-clamp-4 text-sm text-gray-800 mt-2">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </>
    );
}
