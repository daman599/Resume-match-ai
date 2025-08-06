'use client'

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useStore } from "@/lib/state-store";
import { useRouter } from "next/navigation";
import { plusJakarta } from "@/lib/fonts";
import ErrorComponent from "@/components/helperComponents/Error";
import Loader from "@/components/helperComponents/Loader";
import NoResumeMessage from "@/components/helperComponents/NoResumeMessage";
import AnimatedList from "@/components/ui/AnimatedList";
import axios from "axios";

export default function ResumeOptimize() {

    const session = useSession();
    const router = useRouter();
    const parsedText = useStore((state) => (state.parsedText));
    const tips = useStore((state) => (state.tips));
    const setTips = useStore((state) => (state.updateTips));

    const [hasResume, setHasResume] = useState<boolean>(true);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function ApiCall() {
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

        async function checkAuth() {
            if (session.status === "authenticated") {
            
                if (parsedText === "") {
                    setHasResume(false);
                    return;
                }
                else{
                    setLoading(true);
                    ApiCall();
                }
            }
            else if (session.status === "unauthenticated") {
                await signIn("google");
                return;
            }else{
               return;
            }
        }
        checkAuth();
    }, [session])

    if (error) {
        return <ErrorComponent />
    }

    if (!hasResume) {
        return <NoResumeMessage>
            <p className="text-xl text-gray-400">Please provide
                <button onClick={()=>{
          router.push("/resume-upload");
        }}
         className="text-[#0096FF] ml-1.5 cursor-pointer">resume</button> to get tips to optimize it.</p>
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