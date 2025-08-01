"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "General Manager",
    restaurant: "The Metropolitan Bistro",
    content: "This platform transformed our staff training. Our bartenders are now confident with wine pairings and our service quality has improved dramatically.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Marco Rodriguez",
    role: "Training Director", 
    restaurant: "Coastal Restaurant Group",
    content: "Managing training across 8 locations was a nightmare before. Now we have consistent standards and can track progress in real-time.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emily Thompson",
    role: "Head Sommelier",
    restaurant: "Garden Terrace",
    content: "The wine training modules are incredibly thorough. My team passed their sommelier certifications with flying colors.",
    rating: 5,
    avatar: "ET"
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent"></div>
      </div>

      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="testimonialPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,0 20,10 10,20 0,10" fill="url(#testimonialGradient)" opacity="0.1"/>
            </pattern>
            <linearGradient id="testimonialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonialPattern)" />
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
              Trusted by Leading
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Restaurants
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how restaurants are transforming their training programs and improving service quality.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              
              {/* Glassmorphism testimonial card */}
              <div className="relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full">
                {/* Stars with enhanced styling */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.1 * i, type: "spring", stiffness: 300 }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-current mr-1" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-8 text-lg italic leading-relaxed font-medium group-hover:text-gray-800 transition-colors">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg"
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 group-hover:text-gray-700 transition-colors">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">
                      {testimonial.restaurant}
                    </div>
                  </div>
                </div>

                {/* Quote decoration */}
                <div className="absolute top-6 right-6 text-6xl text-purple-200 opacity-50 group-hover:opacity-70 transition-opacity">
                  "
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glassmorphism CTA card */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-purple-600/90 border border-white/30 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-4">
                Ready to transform your training?
              </h3>
              <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
                Join hundreds of restaurants already using our platform to create exceptional training experiences.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/admin/signup"
                  className="group inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-purple-700 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  <span className="relative flex items-center gap-3">
                    Start Your Free Trial
                    <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}