'use client'

import useStore from "@/lib/state-store";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorComponent from "@/components/helperComponents/Error";
import Loader from "@/components/helperComponents/Loader";
import { CheckCheck } from "lucide-react";
import { inter, plusJakarta } from "@/lib/fonts";
import NoResumeMessage from "@/components/helperComponents/NoResumeMessage";

export default function ResumeOptimize() {
    const parsedText = useStore((state) => (state.parsedText));
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const tips = useStore((state) => (state.tips));
    const setTips = useStore((state) => (state.updateTips));
    const [hasResume, setHasResume] = useState<boolean>(true);

    async function call() {
        try {
            const response = await axios.post("/api/resume/optimize", { resumeText: parsedText });
            setTips(response.data.tips);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (tips.length > 0) {
            return;
        }
        if (parsedText === "") {
            setHasResume(false);
            return;
        }
        setLoading(true);
        call();
    }, [])

    if (error) {
        return <ErrorComponent />
    }

    if (!hasResume) {
        return <NoResumeMessage>
            <p className="text-xl text-gray-400">Please provide
                <span className="text-[#0096FF] ml-1.5">resume</span> to get tips to optimize it.</p>
        </NoResumeMessage>
    }

    if (loading) {
        return <Loader>
            <p className="text-xl text-gray-400">AI is analysing your resume....</p>
        </Loader>
    }

    return (
        <>
            {tips && tips.length > 0 && (
                <div className="mt-20 px-4 sm:px-8 md:px-16 lg:px-24 mb-20 w-full max-w-5xl mx-auto">
                    <div className="mt-10 mb-10">
                        <p className={`text-lg sm:text-xl ${plusJakarta.variable} font-medium text-white/40 mb-4 text-center sm:text-left`}>
                            Here are some tips to optimize your resume:
                        </p>
                    </div>

                    <div className="space-y-4">
                        {tips.map((tip, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 text-sm hover:bg-white/20 hover:text-black text-gray-400 bg-white/5 p-4 rounded-xl shadow-sm transition-colors"
                            >
                                <CheckCheck className="text-blue-600 mt-1 text-xl shrink-0" />
                                <p className={`${inter.variable} text-base sm:text-lg font-semibold leading-snug`}>
                                    {tip}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}