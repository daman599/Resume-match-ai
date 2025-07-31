export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-white">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-6 h-6 bg-white  p-[2px]"
          />
          ResumeMatch <span className="sm:inline">AI</span>
        </h1>

        <button
          className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-md text-white text-sm 
                     hover:bg-white/20 hover:shadow-md transition-all duration-200"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}