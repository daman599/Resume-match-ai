import CTAButton from "./CTA-Button";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-64px)] px-6 md:px-12 py-20  bg-cover bg-center flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12">
        
        <div className="max-w-xl text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            Your Resume,<br />Perfect Jobs.<br />Powered by AI.
          </h1>
          <p className={`text-gray-300 font-sans ${inter.variable} text-xl md:text-lg`}>
            Revolutionizing your job search. Our intelligent AI matches your resume with the ideal
            opportunities, saving you time and boosting your career.
          </p>
           <CTAButton />
        </div>    
      </div>
    </section>
  );
}


