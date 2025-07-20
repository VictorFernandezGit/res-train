"use client";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: "$297/mo",
    description: "For small teams getting started. Basic admin tools and up to 3 team members.",
    cta: "Get Basic",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$497/mo",
    description: "For growing teams that need advanced features, analytics, and priority support.",
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    description: "Custom solutions, SSO, dedicated support, and advanced integrations.",
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">Pricing</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Simple, transparent pricing for teams of any size. No hidden fees.
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
              <p className="text-gray-600 mb-6 text-center">{plan.description}</p>
              <a
                href={plan.name === "Enterprise" ? "mailto:sales@yourcompany.com" : "/admin/signup"}
                className={`w-full py-3 rounded-lg font-semibold text-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
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