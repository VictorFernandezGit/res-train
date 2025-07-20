import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-white border-t mt-16 border-t-0" style={{ boxShadow: "0 -1px 0 0 #e0e7ef" }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
        <div className="font-bold text-gray-900">ResIQ</div>
        <div className="flex gap-6 items-center">
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          <span className="hidden md:inline-block h-5 w-px bg-gray-200 mx-2" />
          <a href="https://github.com/" target="_blank" rel="noopener" className="hover:text-gray-900 transition-colors"><Github className="w-5 h-5" /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener" className="hover:text-blue-700 transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
        <div className="text-gray-400">&copy; {new Date().getFullYear()} ResIQ. All rights reserved.</div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 mt-6 rounded-full" />
    </footer>
  );
} 