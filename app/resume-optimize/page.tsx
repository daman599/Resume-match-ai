'use client'

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useStore } from "@/lib/state-store";
import { plusJakarta } from "@/lib/fonts";
import ErrorComponent from "@/components/helperComponents/Error";
import Loader from "@/components/helperComponents/Loader";
import NoResumeMessage from "@/components/helperComponents/NoResumeMessage";
import AnimatedList from "@/components/ui/AnimatedList";
import axios from "axios";
import Link from "next/link";

export default function ResumeOptimize() {

    const session = useSession();
    const parsedText = useStore((state) => (state.parsedText));
    const tips = useStore((state) => (state.tips));
    const setTips = useStore((state) => (state.updateTips));

    const [hasResume, setHasResume] = useState<boolean>(true);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function ApiCall(){
        try {
            const response = await axios.post("/api/resume/optimize", { resumeText: parsedText });
            setTips(response.data.tips);
        } catch (err:unknown) {
            console.log("Something went wrong" ,err)
            setError(true);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        async function checkAuth() {
            if (session.status === "authenticated") {

                if (parsedText === "") {
                    setHasResume(false);
                    return;
                }
                else if (tips.length === 0) {
                  setLoading(true);
                  ApiCall();
                }
            }
            else if (session.status === "unauthenticated") {
                await signIn("google");
            }
        }
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session ])

    if (error) {
        return <ErrorComponent />
    }

    if (!hasResume) {
        return <NoResumeMessage>
            <p className="text-xl text-gray-400">Please provide
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/resume-upload`}
                    className="text-[#0096FF] ml-1.5 cursor-pointer">resume</Link> to get tips to optimize it.</p>
        </NoResumeMessage>
    }

    if (loading) {
        return <Loader>
            <p className="text-xl text-gray-400">AI is analysing your resume....</p>
        </Loader>
    }

    return (
        <>
            {tips.length > 0 && (
                <div className="mt-20 px-4 sm:px-8 md:px-16 lg:px-24 mb-20 w-full max-w-5xl mx-auto">
                    <div className="py-8 ml-5 mr-5">
                        <p className={`text-2xl sm:text-2xl ${plusJakarta.variable} font-medium text-[#0096FF] mb-4 text-center sm:text-left`}>
                            Here are some tips to optimize your resume:
                        </p>
                    </div>

                    <AnimatedList
                        items={tips}
                        showGradients={false}
                        enableArrowNavigation={true}
                        displayScrollbar={false}
                    />

                </div>
            )}
        </>
    );
}