"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full py-28 md:py-40 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated SVG background */}
      <svg className="absolute left-1/2 top-0 -translate-x-1/2 opacity-40 blur-2xl z-0" width="1200" height="600" fill="none" viewBox="0 0 1200 600">
        <defs>
          <linearGradient id="bg-gradient" x1="0" y1="0" x2="1200" y2="600" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <ellipse cx="600" cy="300" rx="500" ry="200" fill="url(#bg-gradient)" />
      </svg>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Badge/tagline */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs tracking-widest uppercase shadow-sm"
        >
          🚀 Next-Gen SaaS Platform
        </motion.div>
        {/* Animated headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 drop-shadow-lg"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Smarter Admin Tools for Fast-Moving Teams
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-600 mb-10 font-medium"
        >
          The modern platform for scaling operations, empowering admins, and moving your business forward—faster.
        </motion.p>
        {/* Techy SVG illustration (undraw.co, open source) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="mb-10 w-full flex justify-center"
        >
          <svg width="340" height="180" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
            <rect x="20" y="40" width="300" height="100" rx="18" fill="#fff" stroke="#a5b4fc" strokeWidth="2" />
            <rect x="40" y="60" width="80" height="60" rx="8" fill="#dbeafe" />
            <rect x="140" y="60" width="160" height="20" rx="6" fill="#f1f5f9" />
            <rect x="140" y="90" width="100" height="12" rx="4" fill="#f1f5f9" />
            <rect x="140" y="110" width="60" height="12" rx="4" fill="#f1f5f9" />
            <circle cx="60" cy="90" r="10" fill="#60a5fa" />
            <circle cx="80" cy="90" r="10" fill="#a78bfa" />
            <circle cx="100" cy="90" r="10" fill="#f472b6" />
          </svg>
        </motion.div>
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href="/admin/signup"
              className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Get Started
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href="#features"
              className="inline-block px-8 py-3 rounded-lg border border-blue-600 text-blue-700 font-semibold text-lg bg-white hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 