export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-sm">
      <h1 className="text-lg font-semibold flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
        ResumeMatch AI
      </h1>
      <button className="bg-white/10 border border-white/20 px-4 py-1 rounded text-sm hover:bg-white/20 transition">
        Sign In
      </button>
    </nav>
  );
}