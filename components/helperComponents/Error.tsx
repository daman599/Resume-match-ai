import { Inter , Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const ErrorComponent = () =>{
  return (
  <div className="flex items-center justify-center h-screen w-screen">
    <div className="flex flex-col items-center justify-center space-y-2 text-center text-white">
      <p className={`${inter.variable} font-semibold text-3xl text-[#0096FF]`}>Something went wrong.</p>
      <p className={`${plusJakarta.variable} text-xl text-gray-300`}>Try again later.</p>
    </div>
  </div>
  );
}

export default ErrorComponent;