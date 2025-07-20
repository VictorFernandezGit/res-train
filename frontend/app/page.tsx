import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Pricing from "@/components/home/Pricing";
import Footer from "@/components/home/Footer";


export default function HomePage() {
  return (
    <div className="font-sans bg-white min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>

      <Hero/>
      <Features />
      <Pricing />
      <Footer />
      
    </div>
  );
} 