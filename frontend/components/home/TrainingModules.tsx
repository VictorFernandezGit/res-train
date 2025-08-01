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
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Comprehensive Training Modules
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive modules designed specifically for restaurant staff, from basic service to advanced sommelier skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, i) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: "easeOut" }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${module.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">{module.difficulty}</span>
                  <span>{module.lessons} lessons</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
          >
            <a
              href="/admin/signup"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Training Today
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}