'use client'

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useStore } from "@/lib/state-store";
import { plusJakarta } from "@/lib/fonts";
import { ErrorComponent } from "@/components/helperComponents/Error";
import { Loader } from "@/components/helperComponents/Loader";
import { NoResumeMessage } from "@/components/helperComponents/NoResumeMessage";
import AnimatedList from "@/components/ui/AnimatedList";
import axios from "axios";
import { motion } from "motion/react";

export default function ResumeOptimize() {

    const session = useSession();
    const parsedText = useStore((state) => (state.parsedText));
    const tips = useStore((state) => (state.tips));
    const setTips = useStore((state) => (state.updateTips));

    const [hasResume, setHasResume] = useState<boolean>(true);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function ApiCall() {
        try {
            const response = await axios.post("/api/resume/optimize", { resumeText: parsedText });
            if (response.data) {
                setTips(response.data.tips);
            }
        } catch (err: unknown) {
            console.log("Something went wrong", err)
            setError(true);
        } finally {
            setLoading(false);
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
    }, [session])

    if (error) {
        return <ErrorComponent />
    }

    if (!hasResume) {
        return <NoResumeMessage message={"to get tips to optimize it."} />
    }

    if (loading) {
        return <Loader text={"AI is analysing your resume...."} />
    }

    return (
        <>
            {tips.length > 0 && (
                <motion.div initial={{ opacity: 0, filter: "blur(3px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 mb-20 w-full max-w-5xl mx-auto"
                >
                    <span className={`my-4 text-2xl sm:text-2xl ${plusJakarta.variable} font-medium text-[#0096FF] text-center sm:text-left`}>
                        Here are some tips to optimize your resume:
                    </span>

                    <AnimatedList
                        items={tips}
                        showGradients={false}
                        enableArrowNavigation={true}
                        displayScrollbar={false}
                    />
                </motion.div >
            )
            }
        </>
    );
}