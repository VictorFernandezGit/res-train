"use client";
import { motion } from "framer-motion";
import { Wine, Coffee, Users2, Shield, BookOpen, Utensils } from "lucide-react";

const modules = [
  {
    icon: Wine,
    title: "Wine Knowledge",
    description: "Learn grape varieties, regions, and pairing techniques",
    color: "bg-purple-100 text-purple-600",
    difficulty: "Beginner to Advanced",
    lessons: 12
  },
  {
    icon: Coffee,
    title: "Cocktail Mastery",
    description: "Master classic cocktails and mixology techniques",
    color: "bg-blue-100 text-blue-600",
    difficulty: "Intermediate",
    lessons: 18
  },
  {
    icon: Users2,
    title: "Customer Service",
    description: "Excellence in hospitality and guest relations",
    color: "bg-green-100 text-green-600",
    difficulty: "Beginner",
    lessons: 8
  },
  {
    icon: Shield,
    title: "Compliance Training",
    description: "Alcohol service laws and responsible serving",
    color: "bg-red-100 text-red-600",
    difficulty: "Required",
    lessons: 6
  },
  {
    icon: Utensils,
    title: "Food Pairing",
    description: "Perfect wine and cocktail pairings with menu items",
    color: "bg-orange-100 text-orange-600",
    difficulty: "Advanced",
    lessons: 10
  },
  {
    icon: BookOpen,
    title: "Service Standards",
    description: "Professional service techniques and standards",
    color: "bg-indigo-100 text-indigo-600",
    difficulty: "Beginner",
    lessons: 15
  }
];

export default function TrainingModules() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Ultra-modern dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-transparent"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index instead of Math.random()
          const leftPosition = (i * 17 + 13) % 100;
          const topPosition = (i * 23 + 7) % 100;
          const duration = 2 + (i % 3);
          const delay = (i * 0.3) % 5;
          
          return (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${leftPosition}%`,
                top: `${topPosition}%`,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Comprehensive Training
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Modules
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Interactive modules designed specifically for restaurant staff, from basic service to advanced sommelier skills.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, i) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative cursor-pointer"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                
                {/* Glassmorphism card */}
                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-300 h-full">
                  {/* Icon with enhanced styling */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${module.color} shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {module.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="backdrop-blur-sm bg-white/20 border border-white/30 px-3 py-1 rounded-lg text-white text-sm font-medium">
                      {module.difficulty}
                    </span>
                    <span className="text-purple-300 font-semibold">
                      {module.lessons} lessons
                    </span>
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/admin/signup"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 rounded-2xl hover:from-purple-500 hover:via-purple-600 hover:to-blue-500 shadow-2xl hover:shadow-purple-500/25 border border-white/20"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-3">
                Start Training Today
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}