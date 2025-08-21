
import React, { useState } from 'react';
import { FiArrowRight, FiCheckCircle, FiShield, FiZap } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from './components/Popup-landing'

function App() {

  return (
    <div className="text-gray-200 font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}



const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">DopeNope</h1>
        <nav className="hidden md:flex items-center gap-6 text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </nav>
        <a
          href="#"
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors"
        >
          Get Started
        </a>
      </div>
    </header>
  );
};



const HeroSection = () => {

  const [popupType, setPopupType] = useState(null);

  const successInfo = {
    title: "Correct Choice!",
    message: "You've upheld the spirit of fair play. This decision builds a strong, respectable career."
  };

  const failureInfo = {
    title: "Risky Decision!",
    message: "This choice could lead to health risks, sanctions, and damage to your reputation. In the game, you'll learn why."
  };

  return (
    <>
      <section className="pt-40 pb-20 text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
              The Choice is Yours
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
              Navigate your athletic career with integrity. The fastest path from potential to peak performance.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 max-w-4xl mx-auto rounded-2xl border border-gray-800 bg-gray-900/50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-4 border-b border-gray-800 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-8 text-left">
              <p className="font-mono text-gray-400">// Scenario: Pre-Competition Check-in</p>
              <p className="mt-4 font-mono text-white">
                <span className="text-cyan-400">Teammate:</span> "Hey, feeling nervous? I've got something that'll boost your energy. No one will know."
              </p>
              <div className="mt-6 flex flex-col md:flex-row gap-4">
               
                <button 
                  onClick={() => setPopupType('success')}
                  className="flex-1 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-500/20 transition-colors"
                >
                  Politely Refuse & Report
                </button>
                <button 
                  onClick={() => setPopupType('failure')}
                  className="flex-1 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/20 transition-colors"
                >
                  Accept the Substance
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      
      <AnimatePresence>
        {popupType === 'success' && (
          <Popup
            type="success"
            title={successInfo.title}
            message={successInfo.message}
            onClose={() => setPopupType(null)}
          />
        )}
        {popupType === 'failure' && (
          <Popup
            type="failure"
            title={failureInfo.title}
            message={failureInfo.message}
            onClose={() => setPopupType(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};


const features = [
  {
    icon: <FiCheckCircle className="w-8 h-8 text-blue-400" />,
    title: 'Interactive Scenarios',
    description: 'Face realistic dilemmas and see the immediate consequences of your choices in a safe, virtual environment.',
  },
  {
    icon: <FiShield className="w-8 h-8 text-blue-400" />,
    title: 'WADA Code Compliant',
    description: 'All educational content is based on the latest World Anti-Doping Agency (WADA) guidelines and prohibited lists.',
  },
  {
    icon: <FiZap className="w-8 h-8 text-blue-400" />,
    title: 'Instant AI Guidance',
    description: 'Ask our AI coach anything about substances, rules, or ethical conduct and get immediate, accurate answers.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gray-900 border border-gray-800 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const CTASection = () => {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white tracking-tighter">Start Your Journey Today</h2>
        <p className="mt-4 max-w-xl mx-auto text-gray-400">
          Equip yourself with the knowledge to compete clean and build a career you can be proud of.
        </p>
        <button className="mt-8 px-8 py-3 font-semibold text-black bg-white rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto">
          Sign Up for Free <FiArrowRight />
        </button>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="border-t border-gray-800">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} DopeNope. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default App;