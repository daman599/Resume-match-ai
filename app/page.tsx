import { Hero } from "@/components/landing-page/Hero"
import { HowItWorks } from "@/components/landing-page/HowItWorks"
import { Features } from "@/components/landing-page/Features"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="relative w-full pt-24">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/bg-network.png')" }}
        >
        </div>
        <div className="relative z-10">
          <Hero />
        </div>
      </div>

      <HowItWorks />
      <Features />
    </main>
  );
}
