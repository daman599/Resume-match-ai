import { inter, plusJakarta } from "@/lib/fonts";

const ErrorComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen px-5 md:px-4">
      <div className="flex flex-col items-center justify-center space-y-1 text-center text-white">
        <p
          className={`${inter.variable} font-semibold text-base md:text-2xl text-[#0096FF]`}
        >
          Something went wrong.
        </p>
        <p
          className={`${plusJakarta.variable} text-base md:text-xl text-gray-300`}
        >
          Try again later.
        </p>
      </div>
    </div>
  );
};

export default ErrorComponent;
