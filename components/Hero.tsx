import UploadBox from './UploadBox';

export default function Hero() {
  return (
    <section
      className="flex flex-col md:flex-row items-center justify-between px-10 py-16 min-h-[calc(100vh-64px)] bg-cover bg-center relative"
    >
      <div className="absolute inset-0  z-0" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-10 md:gap-16 px-4">
        <div className="max-w-xl text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Resume,<br />Perfect Jobs.<br />Powered by AI.
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            Revolutionizing your job search. Our intelligent AI matches your resume with the ideal
            opportunities, saving you time and boosting your career.
          </p>
        </div>

        <div className="mt-8 md:mt-0">
          <UploadBox />
        </div>
      </div>
    </section>
  );
}

