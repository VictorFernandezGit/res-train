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
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Trusted by Leading Restaurants
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how restaurants are transforming their training programs and improving service quality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.2, duration: 0.7, ease: "easeOut" }}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.restaurant}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
            className="bg-blue-50 rounded-lg p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to transform your training?</h3>
            <p className="text-gray-600 mb-4">Join hundreds of restaurants already using our platform.</p>
            <a
              href="/admin/signup"
              className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Your Free Trial
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}