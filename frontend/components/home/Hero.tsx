"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen py-20 overflow-hidden">
      {/* Ultra-modern gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent"></div>
      </div>

      {/* Animated floating orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
      ></motion.div>
      
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl"
      ></motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"
      ></motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
            <pattern id="heroGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="0.5" fill="#9C92AC" opacity="0.5"/>
            </pattern>
        </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
      </svg>
      </div>
      {/* Glassmorphism container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          {/* Modern glassmorphism badge */}
        <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-xl text-white font-semibold text-sm tracking-wide"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            🍸 Restaurant Training Platform
        </motion.div>

          {/* Ultra-modern headline with gradient text */}
        <motion.h1
            initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-none"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Transform Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Restaurant Training
            </span>
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-gray-300 mb-12 font-light leading-relaxed max-w-3xl mx-auto"
        >
            Comprehensive training platform for <span className="text-purple-300 font-medium">cocktails</span>, 
            <span className="text-pink-300 font-medium"> wine</span>, and 
            <span className="text-cyan-300 font-medium"> hospitality excellence</span>. 
            Get your staff certified faster with interactive modules and progress tracking.
        </motion.p>
          {/* Ultra-modern 3D floating dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 w-full flex justify-center perspective-1000"
          >
            <div className="relative">
              {/* Glassmorphism dashboard */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transform-gpu">
                <div className="w-96 h-64 relative">
                  {/* Header with glassmorphism */}
                  <div className="backdrop-blur-sm bg-white/20 rounded-xl p-4 mb-4 border border-white/30">
                    <div className="h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-2/3 animate-pulse"></div>
                  </div>
                  
                  {/* Training modules cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      className="backdrop-blur-sm bg-purple-500/20 rounded-xl p-4 border border-purple-300/30 shadow-lg"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg mb-2 flex items-center justify-center">
                        🍷
                      </div>
                      <div className="h-2 bg-white/40 rounded mb-1"></div>
                      <div className="h-1 bg-white/20 rounded w-3/4"></div>
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="backdrop-blur-sm bg-blue-500/20 rounded-xl p-4 border border-blue-300/30 shadow-lg"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg mb-2 flex items-center justify-center">
                        🍸
                      </div>
                      <div className="h-2 bg-white/40 rounded mb-1"></div>
                      <div className="h-1 bg-white/20 rounded w-2/3"></div>
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      className="backdrop-blur-sm bg-pink-500/20 rounded-xl p-4 border border-pink-300/30 shadow-lg"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg mb-2 flex items-center justify-center">
                        🎓
                      </div>
                      <div className="h-2 bg-white/40 rounded mb-1"></div>
                      <div className="h-1 bg-white/20 rounded w-5/6"></div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around dashboard */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg"
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg"
              ></motion.div>
            </div>
          </motion.div>

          {/* Ultra-modern CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/admin/signup"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 rounded-2xl hover:from-purple-500 hover:via-purple-600 hover:to-blue-500 shadow-2xl hover:shadow-purple-500/25 border border-white/20"
              >
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center gap-2">
                  Get Started Free
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
            </Link>
          </motion.div>
            
          <motion.div
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#features"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 backdrop-blur-md bg-white/10 rounded-2xl hover:bg-white/20 shadow-2xl border border-white/30 hover:border-white/50"
              >
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center gap-2">
                  Watch Demo
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </span>
            </Link>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 