"use client";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$99/mo",
    description: "Perfect for small restaurants. Up to 15 staff members with basic cocktail and wine training modules.",
    features: ["Cocktail & Wine Training", "Progress Tracking", "Basic Analytics", "Email Support"],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$249/mo",
    description: "For growing restaurant groups. Advanced features, compliance training, and multi-location support.",
    features: ["Everything in Starter", "Compliance Modules", "Multi-Location", "Advanced Analytics", "Priority Support", "Custom Branding"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    description: "Custom solutions for large restaurant chains with dedicated support and integrations.",
    features: ["Everything in Professional", "Custom Modules", "API Access", "SSO Integration", "Dedicated Support", "Custom Training"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Ultra-modern dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="pricingGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="url(#pricingGradient)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="pricingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#pricingGrid)" />
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
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Simple, Restaurant-Focused
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Start training your staff today with our flexible plans designed for restaurants of any size.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: plan.highlight ? 1.02 : 1.05 }}
              className={`group relative ${plan.highlight ? "z-20" : "z-10"}`}
            >
              {/* Enhanced glow effect for highlighted plan */}
              <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur ${
                plan.highlight 
                  ? "bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600" 
                  : "bg-gradient-to-r from-purple-600 to-blue-600"
              }`}></div>
              
              {/* Ultra-modern glassmorphism pricing card */}
              <div className={`relative backdrop-blur-xl border rounded-3xl p-8 shadow-2xl transition-all duration-300 h-full flex flex-col ${
                plan.highlight 
                  ? "bg-white/20 border-white/40 shadow-purple-500/20" 
                  : "bg-white/10 border-white/20"
              }`}>
                
                {/* Popular badge with enhanced styling */}
                {plan.highlight && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                  >
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-xl border border-white/30">
                      Most Popular
                    </span>
                  </motion.div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-purple-200 transition-colors">
                    {plan.name}
                  </h3>
                  <div className={`text-4xl font-black mb-4 ${
                    plan.highlight 
                      ? "bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent"
                      : "text-purple-300"
                  }`}>
                    {plan.price}
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {plan.description}
                  </p>
                </div>
                
                {/* Enhanced feature list */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="flex items-center text-gray-300 group-hover:text-white transition-colors"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Ultra-modern CTA button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={plan.name === "Enterprise" ? "mailto:sales@yourcompany.com" : "/admin/signup"}
                    className={`group relative w-full py-4 rounded-2xl font-bold text-lg text-center transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 border border-white/30"
                        : "backdrop-blur-sm bg-white/20 text-white border border-white/30 hover:bg-white/30"
                    }`}
                  >
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="relative">{plan.cta}</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 