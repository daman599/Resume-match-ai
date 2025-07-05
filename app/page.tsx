import  Navbar from "../components/Navbar"
import  Hero from "../components/Hero"
import  HowItWorks from "../components/HowItWorks"
import  Features from "../components/Features"

export default function Home() {
  return (
   <main className="bg-black text-white min-h-screen relative">
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg-network.jpg')" }}
    >
    <Navbar/>
    <Hero/>
    </div>
    <HowItWorks/>
    <Features/>
    </main>
  );
}
