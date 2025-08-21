import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 py-4 px-8 flex justify-between items-center bg-slate-900/80 backdrop-blur-sm border-b border-slate-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-heading text-2xl text-white">DopeNope</div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#howitworks" className="hover:text-blue-400 transition-colors">How It Works</a>
        <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
        <a href="#ai" className="hover:text-blue-400 transition-colors">AI Coach</a>
      </div>
      <motion.button 
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-shadow duration-300 hover:shadow-glow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;