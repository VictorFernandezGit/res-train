"use client";
import { motion } from "framer-motion";
import { Wine, GraduationCap, Users, BarChart3, BookOpen, Shield } from "lucide-react";

const features = [
  {
    icon: Wine,
    color: "bg-purple-100 text-purple-600",
    title: "Cocktail & Wine Mastery",
    description: "Comprehensive training modules covering cocktail recipes, wine knowledge, and food pairing techniques with interactive assessments.",
  },
  {
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-600",
    title: "Progressive Learning Paths",
    description: "Structured training modules from beginner to advanced levels with prerequisites and skill-based progression tracking.",
  },
  {
    icon: Users,
    color: "bg-green-100 text-green-600",
    title: "Multi-Location Management",
    description: "Manage training across multiple restaurant locations with role-based access for admins, managers, and staff.",
  },
  {
    icon: BarChart3,
    color: "bg-orange-100 text-orange-600",
    title: "Real-Time Analytics",
    description: "Track employee progress, completion rates, and performance metrics with detailed reporting and insights.",
  },
  {
    icon: BookOpen,
    color: "bg-indigo-100 text-indigo-600",
    title: "Rich Content Library",
    description: "Access video tutorials, interactive quizzes, documents, and presentations tailored for hospitality training.",
  },
  {
    icon: Shield,
    color: "bg-red-100 text-red-600",
    title: "Compliance & Certification",
    description: "Ensure regulatory compliance with alcohol service laws and generate certificates for completed training modules.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Ultra-modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent"></div>
      </div>

      {/* Animated mesh pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="mesh" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="url(#meshGradient)" opacity="0.8"/>
            </pattern>
            <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
              Complete Restaurant
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Training Solution
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything your restaurant needs to train staff on cocktails, wine, compliance, and hospitality excellence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                
                {/* Main card with glassmorphism */}
                <div className="relative backdrop-blur-xl bg-white/70 border border-white/30 rounded-2xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Floating icon with modern styling */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg mb-6 ${feature.color} group-hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>

                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 