import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import AISection from '../components/AISection';
import FinalCTA from '../components/FinalCTA';
import AnimatedBackground from '../components/AnimatedBackground';

const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen text-slate-300">
      <AnimatedBackground />
      <main className="relative z-10">
        <Hero />
        <HowItWorks />
        <Features />
        <AISection />
        <FinalCTA />
      </main>
    </div>
  );
};

export default LandingPage;

