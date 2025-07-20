"use client";
import { motion } from "framer-motion";
import { Rocket, Users, ShieldCheck, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Rocket,
    color: "bg-blue-100 text-blue-600",
    title: "Lightning-Fast Setup",
    description: "Get your team onboarded in minutes, not days. No code, no hassle—just instant productivity.",
  },
  {
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    title: "Team Management",
    description: "Effortlessly add, manage, and empower your staff with intuitive admin controls and real-time insights.",
  },
  {
    icon: ShieldCheck,
    color: "bg-green-100 text-green-600",
    title: "Enterprise-Grade Security",
    description: "Your data is protected with best-in-class security, SSO, and granular access controls.",
  },
  {
    icon: BarChart3,
    color: "bg-pink-100 text-pink-600",
    title: "Actionable Analytics",
    description: "Track progress, spot trends, and make smarter decisions with beautiful, real-time dashboards.",
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">What You Get</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to run a modern, high-performing team—without the bloat.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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