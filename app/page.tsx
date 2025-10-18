import  Hero from "@/components/landing-page/Hero"
import  HowItWorks from "@/components/landing-page/HowItWorks"
import  Features from "@/components/landing-page/Features"

export default function Home() {
  return (
   <main className="bg-black text-white min-h-screen relative pt-20">
    <div
      className="w-full bg-cover bg-center pt-24 bg-no-repeat"
      style={{ backgroundImage: "url('/bg-network.jpg')" }}
    >
      <Hero/>
    </div>
    <HowItWorks/>
    <Features/>
    </main>
  );
}
