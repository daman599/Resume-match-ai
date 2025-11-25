"use client"

import CTAButton from "./CTA-Button";
import { inter } from "@/lib/fonts";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-64px)] px-4 sm:px-6 md:px-12 py-16 sm:py-20 
                 bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 z-0" />

      <motion.div
        initial={{ opacity: 0, filter: "blur(3px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}

        className="relative z-10 flex flex-col md:flex-row items-center justify-between 
                      w-full max-w-7xl mx-auto gap-10 sm:gap-12">

        <div className="max-w-xl text-center md:text-left space-y-6">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            Your Resume,<br />Perfect Jobs.<br />Powered by AI.
          </h1>

          <p className={`text-base sm:text-lg text-gray-300 font-sans ${inter.variable}`}>
            Revolutionizing your job search. Our intelligent AI matches your resume with the ideal
            opportunities, saving you time and boosting your career.
          </p>

          <CTAButton />
        </div>
      </motion.div>
    </section>
  );
}

