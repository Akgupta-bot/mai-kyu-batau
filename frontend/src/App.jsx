import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import AISection from './components/AISection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-900 text-slate-200 font-body">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <AISection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;