import { UploadCloud, Brain, BarChart3, Briefcase } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="w-full px-4 md:px-6 py-16 flex justify-center">
      <div className="w-full max-w-4xl bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 px-4 sm:px-6 md:px-10 py-10 space-y-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-white">
          How ResumeMatch AI Works
        </h2>

        {[
          {
            icon: <UploadCloud className="text-blue-400 w-6 h-6 shrink-0" />,
            title: "Upload Your Resume",
            desc: "Securely upload your CV/resume in PDF format. Our system extracts key skills and experience with precision."
          },
          {
            icon: <Brain className="text-blue-400 w-6 h-6 shrink-0" />,
            title: "AI-Powered Matching",
            desc: "Our advanced AI analyzes your profile against latest job postings to find the perfect, most relevant fit."
          },
          {
            icon: <BarChart3 className="text-blue-400 w-6 h-6 shrink-0" />,
            title: "Get Tailored Recommendations",
            desc: "Receive personalized job recommendations, directly relevant to your career goals and skills."
          },
          {
            icon: <Briefcase className="text-blue-400 w-6 h-6 shrink-0" />,
            title: "Connect & Apply",
            desc: "Easily connect with employers and apply for jobs directly through our intuitive platform."
          }
        ].map(({ icon, title, desc }, i) => (
          <div
            key={i}
          >

            <div className="space-y-2 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                {icon}
                <h3 className="text-white font-semibold text-base md:text-lg">
                  {title}
                </h3>
              </div>

              <p className="text-gray-300 text-sm md:text-base pl-9">
                {desc}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

