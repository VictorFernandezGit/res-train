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
    <section id="pricing" className="relative py-20 bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden">
      {/* Subtle SVG pattern background */}
      <svg className="absolute left-0 top-0 w-full h-full opacity-10 pointer-events-none" width="100%" height="100%" fill="none" viewBox="0 0 800 400">
        <defs>
          <pattern id="pricing-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#a5b4fc" />
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#pricing-dots)" />
      </svg>
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">Simple, Restaurant-Focused Pricing</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Start training your staff today with our flexible plans designed for restaurants of any size.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col items-center rounded-2xl border shadow-xl p-8 bg-white/70 backdrop-blur-md relative transition-transform hover:-translate-y-1 hover:shadow-2xl ${
                plan.highlight ? "border-blue-600 ring-2 ring-blue-200 z-10 scale-105" : "border-gray-200"
              }`}
              style={plan.highlight ? { boxShadow: "0 8px 32px 0 rgba(99, 102, 241, 0.15)" } : {}}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">Most Popular</span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-3xl font-extrabold text-blue-700 mb-2">{plan.price}</div>
              <p className="text-gray-600 mb-4 text-center">{plan.description}</p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.name === "Enterprise" ? "mailto:sales@yourcompany.com" : "/admin/signup"}
                className={`w-full py-3 rounded-lg font-semibold text-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 block ${
                  plan.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow"
                    : "bg-white text-blue-700 border border-blue-600 hover:bg-blue-50"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 