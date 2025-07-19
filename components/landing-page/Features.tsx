import { Sparkles, ClipboardList } from 'lucide-react'

export default function Features() {
  return (
    <section className="bg-black text-white px-4 sm:px-6 md:px-10 py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#0096FF] mb-12">
        Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="relative bg-black/40 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-md overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/bg-network.jpg"
              alt="Network"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={28} className="text-blue-400" />
              <h3 className="text-lg sm:text-xl font-semibold">
                Personalized Recommendations
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-300">
              Leverage advanced AI to deliver highly tailored job suggestions based on your skills,
              experience, and career goals. Discover opportunities you might otherwise miss.
            </p>
          </div>
        </div>

        <div className="relative bg-black/40 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-md overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/bg-network.jpg"
              alt="Network"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <ClipboardList size={28} className="text-blue-400" />
              <h3 className="text-lg sm:text-xl font-semibold">
                Resume Optimization Tips
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-300">
              Receive AI-driven insights and actionable advice to refine your resume and cover letter,
              significantly boosting your chances of securing interviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
