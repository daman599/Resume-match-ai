import { inter, plusJakarta } from "@/lib/fonts";

export const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full space-y-1">
      <p className={`${inter.variable} font-semibold text-xl md:text-2xl text-[#0096FF]`}>
        Something went wrong.
      </p>

      <p className={`${plusJakarta.variable} text-lg md:text-xl text-gray-300`}>
        Try again later.
      </p>
    </div>
  );
};
