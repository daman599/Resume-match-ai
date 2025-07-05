'use client';

import { UploadCloud, Brain, BarChart3, Briefcase } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="w-full px-4 md:px-6 py-16 flex justify-center">
      <div className="w-full max-w-4xl bg-black/30 backdrop-blur-md rounded-xl border border-white/20 px-6 md:px-10 py-10 space-y-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white">
          How ResumeMatch AI Works
        </h2>

        {/* STEP 1 */}
        <div className="flex flex-col sm:flex-row items-start gap-4 border-b border-white/10 pb-6">
          <UploadCloud className="text-blue-400 w-6 h-6 shrink-0" />
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg">
              Upload Your Resume
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              Securely upload your CV/resume in any common format. Our system extracts key
              skills and experience with precision.
            </p>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="flex flex-col sm:flex-row items-start gap-4 border-b border-white/10 pb-6">
          <Brain className="text-blue-400 w-6 h-6 shrink-0" />
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg">
              AI-Powered Matching
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              Our advanced AI analyzes your profile against thousands of job postings to
              find the perfect, most relevant fit.
            </p>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="flex flex-col sm:flex-row items-start gap-4 border-b border-white/10 pb-6">
          <BarChart3 className="text-blue-400 w-6 h-6 shrink-0" />
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg">
              Get Tailored Recommendations
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              Receive personalized job recommendations, directly relevant to your career goals
              and skills.
            </p>
          </div>
        </div>

        {/* STEP 4 */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Briefcase className="text-blue-400 w-6 h-6 shrink-0" />
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg">
              Connect & Apply
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              Easily connect with employers and apply for jobs directly through our intuitive
              platform, streamlining your process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

