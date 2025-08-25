import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 py-4 px-8 flex justify-between items-center bg-slate-900/80 backdrop-blur-sm border-b border-slate-700"
      // ... animation props
    >
      <Link to="/" className="font-heading text-2xl text-white">DopeNope</Link>
      <div className="hidden md:flex items-center space-x-8">
        <a href="/#howitworks" className="hover:text-blue-400 transition-colors">How It Works</a>
        <a href="/#features" className="hover:text-blue-400 transition-colors">Features</a>
        {/* Add the new link to the AI Coach page */}
        <Link to="/coach" className="hover:text-blue-400 transition-colors">AI Coach</Link>
      </div>
      <Link to="/login">
        <motion.button 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-shadow duration-300 hover:shadow-glow"
          // ... animation props
        >
          Get Started
        </motion.button>
      </Link>
    </motion.nav>
  );
};

export default Navbar;