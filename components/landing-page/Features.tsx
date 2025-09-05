import { Sparkles, ClipboardList } from 'lucide-react'
import Image from 'next/image';
import Reveal from '../ui/Reveal';

const features = [
  {
    title: "Personalized Recommendations",
    description: "Leverage advanced AI to deliver highly tailored job suggestions based on your skills, experience, and career goals. Discover opportunities you might otherwise miss.",
  },
  {
    title: "Resume Optimization Tips",
    description: "Receive AI-driven insights and actionable advice to refine your resume and cover letter, significantly boosting your chances of securing interviews.",
  }
]

export default function Features() {
  return (
    <section className="bg-black text-white px-4 sm:px-6 md:px-10 py-16 sm:py-20">
      <Reveal>
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#0096FF] mb-10 sm:mb-12">
        Features
      </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Reveal key={index}>
          <div className = "relative bg-black/40 border border-white/10 rounded-xl p-5 sm:p-6 md:p-8 backdrop-blur-md overflow-hidden">

            <div className="absolute inset-0 -z-10">
              <Image
                src="/bg-network.jpg"
                alt="Network"
                fill
                className="object-cover opacity-30 rounded-xl"
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                {index === 0 ? (
                  <Sparkles size={26} className="text-blue-400" />
                ) : (
                  <ClipboardList size={26} className="text-blue-400" />
                )}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
