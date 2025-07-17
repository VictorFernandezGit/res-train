"use client"
import Link from 'next/link';
import { useEffect, useRef } from 'react';

function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        node.classList.add('opacity-100', 'translate-y-0');
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
}

export default function Home() {
  const heroRef = useFadeInOnScroll();
  const featuresRef = useFadeInOnScroll();
  const useCasesRef = useFadeInOnScroll();
  const pricingRef = useFadeInOnScroll();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur border-b border-gray-100 sticky top-0 z-10">
        <div className="text-2xl font-extrabold tracking-tight text-indigo-700">ResTrain</div>
        <nav className="space-x-8 text-base font-medium">
          <a href="#features" className="text-gray-700 hover:text-indigo-700 transition">Features</a>
          <a href="#usecases" className="text-gray-700 hover:text-indigo-700 transition">Use Cases</a>
          <a href="#pricing" className="text-gray-700 hover:text-indigo-700 transition">Pricing</a>
          <a href="/start" className="text-gray-700 hover:text-indigo-700 transition">Classic Home</a>
          <a href="#contact" className="text-gray-700 hover:text-indigo-700 transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="flex flex-col items-center text-center mt-24 mb-32 px-4 opacity-0 translate-y-8 transition-all duration-1000">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight max-w-4xl text-gray-900 drop-shadow-sm">
          Restaurant Training, Reinvented.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl">
          Empower your staff with interactive quizzes, real-time feedback, and a modern learning portal for cocktails, wine, and service excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="/login" className="px-8 py-3 bg-indigo-700 text-white rounded-lg font-semibold text-lg shadow hover:bg-indigo-800 transition">Get Started</Link>
          <a href="#features" className="px-8 py-3 border border-indigo-700 text-indigo-700 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition">Learn More</a>
        </div>
        <div className="w-full max-w-2xl h-72 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-inner border border-indigo-200 animate-pulse-slow">
          {/* Placeholder for hero visual/illustration */}
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="180" height="180" rx="36" fill="#EEF2FF"/>
            <path d="M40 120c0-22 18-40 40-40s40 18 40 40" stroke="#6366F1" strokeWidth="6" strokeLinecap="round"/>
            <circle cx="90" cy="80" r="24" fill="#A5B4FC"/>
            <rect x="70" y="130" width="40" height="10" rx="5" fill="#6366F1"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-32 px-4 opacity-0 translate-y-8 transition-all duration-1000">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition">
          <div className="w-16 h-16 mb-4 flex items-center justify-center bg-indigo-50 rounded-full animate-fade-in">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Dynamic Quizzes</h3>
          <p className="text-gray-600 text-center">Auto-generate quizzes for every wine, cocktail, or menu item—tailored to your training content.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition">
          <div className="w-16 h-16 mb-4 flex items-center justify-center bg-indigo-50 rounded-full animate-fade-in delay-100">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#6366F1" strokeWidth="2.5"/><path d="M8 12l2 2 4-4" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Instant Feedback</h3>
          <p className="text-gray-600 text-center">Staff get immediate results and explanations, reinforcing learning and retention.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition">
          <div className="w-16 h-16 mb-4 flex items-center justify-center bg-indigo-50 rounded-full animate-fade-in delay-200">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#6366F1" strokeWidth="2.5"/><path d="M8 8h8v8H8z" fill="#6366F1"/></svg>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Progress Tracking</h3>
          <p className="text-gray-600 text-center">Managers can monitor staff progress, quiz scores, and identify knowledge gaps in real time.</p>
        </div>
      </section>

      {/* Use Cases Section */}
      <section ref={useCasesRef} id="usecases" className="w-full max-w-5xl mx-auto mb-32 px-4 opacity-0 translate-y-8 transition-all duration-1000">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">How ResTrain Helps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow p-8 border border-gray-100 flex flex-col gap-3 animate-fade-in">
            <h4 className="font-bold text-lg text-indigo-700 mb-1">Onboarding New Staff</h4>
            <p className="text-gray-600">Accelerate onboarding with interactive quizzes and instant feedback on wine, cocktails, and service standards.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-8 border border-gray-100 flex flex-col gap-3 animate-fade-in delay-100">
            <h4 className="font-bold text-lg text-indigo-700 mb-1">Menu Knowledge</h4>
            <p className="text-gray-600">Ensure your team knows every detail about your menu, from tasting notes to food pairings, with auto-generated quizzes.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-8 border border-gray-100 flex flex-col gap-3 animate-fade-in delay-200">
            <h4 className="font-bold text-lg text-indigo-700 mb-1">Ongoing Training</h4>
            <p className="text-gray-600">Keep staff sharp with regular knowledge checks and new content as your menu evolves.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-8 border border-gray-100 flex flex-col gap-3 animate-fade-in delay-300">
            <h4 className="font-bold text-lg text-indigo-700 mb-1">Manager Insights</h4>
            <p className="text-gray-600">Track team progress, identify strengths and weaknesses, and celebrate top performers.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} id="pricing" className="w-full max-w-5xl mx-auto mb-32 px-4 opacity-0 translate-y-8 transition-all duration-1000">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Individual Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-indigo-700">Individual</h3>
            <div className="text-4xl font-extrabold mb-2">$299</div>
            <div className="text-gray-500 mb-6">per month</div>
            <ul className="text-gray-700 mb-8 space-y-2 text-center">
              <li>Up to 10 staff accounts</li>
              <li>Unlimited quizzes</li>
              <li>Basic analytics</li>
              <li>Email support</li>
            </ul>
            <Link href="/login" className="w-full py-3 bg-indigo-700 text-white rounded-lg font-semibold text-lg text-center shadow hover:bg-indigo-800 transition">Start Individual</Link>
          </div>
          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-500 rounded-2xl shadow-xl border-2 border-indigo-700 p-8 flex flex-col items-center text-white scale-105 z-10 hover:scale-110 transition-transform">
            <h3 className="text-xl font-bold mb-2">Premium</h3>
            <div className="text-4xl font-extrabold mb-2">$495</div>
            <div className="text-indigo-100 mb-6">per month</div>
            <ul className="mb-8 space-y-2 text-center">
              <li>Up to 50 staff accounts</li>
              <li>Unlimited quizzes</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
            </ul>
            <Link href="/login" className="w-full py-3 bg-white text-indigo-700 rounded-lg font-semibold text-lg text-center shadow hover:bg-indigo-50 transition">Start Premium</Link>
          </div>
          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-indigo-700">Enterprise</h3>
            <div className="text-3xl font-extrabold mb-2">Contact Us</div>
            <div className="text-gray-500 mb-6">Custom pricing</div>
            <ul className="text-gray-700 mb-8 space-y-2 text-center">
              <li>Unlimited staff accounts</li>
              <li>Custom integrations</li>
              <li>Dedicated account manager</li>
              <li>24/7 support</li>
            </ul>
            <a href="mailto:sales@restrain.com" className="w-full py-3 bg-indigo-700 text-white rounded-lg font-semibold text-lg text-center shadow hover:bg-indigo-800 transition">Contact Sales</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 py-8 border-t bg-white mt-auto">
        <div className="mb-2 font-semibold text-indigo-700">ResTrain</div>
        <div className="mb-2">&copy; {new Date().getFullYear()} ResTrain. All rights reserved.</div>
        <div className="text-sm">Made for modern restaurants & hospitality teams.</div>
      </footer>
      <style jsx global>{`
        .animate-fade-in {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeInUp 1s forwards;
        }
        .animate-fade-in.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }
        .animate-fade-in.delay-300 { animation-delay: 0.3s; }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>
    </main>
  );
} 