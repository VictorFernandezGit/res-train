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
    <section id="features" className="relative py-20 bg-white overflow-hidden">
      {/* Subtle SVG background pattern */}
      <svg className="absolute left-0 top-0 w-full h-full opacity-10 pointer-events-none" width="100%" height="100%" fill="none" viewBox="0 0 800 400">
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#a5b4fc" />
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#dots)" />
      </svg>
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">Complete Restaurant Training Solution</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Everything your restaurant needs to train staff on cocktails, wine, compliance, and hospitality excellence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
                className="flex items-start gap-5 bg-white/80 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow group backdrop-blur"
              >
                <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full shadow ${feature.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-base">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 