import Link from 'next/link';
import { UploadCloud } from 'lucide-react';

export default function CTAButton() {
  return (
    <div className="mt-8">
      <Link
        href="/resume-upload"
        className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-200 text-sm sm:text-base"
      >
        <UploadCloud className="w-5 h-5" />
        Upload Your Resume
      </Link>
    </div>
  );
}
