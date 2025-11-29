import Link from "next/link";

export default function NoResumeMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen text-center text-sm sm:text-base md:text-lg">
      <p className="text-gray-400">Please provide&nbsp;
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/resume-upload`}
          className="text-[#0096FF] cursor-pointer">
          <span>resume&nbsp;</span>
        </Link>
        {message}
      </p>
    </div >
  );
}
