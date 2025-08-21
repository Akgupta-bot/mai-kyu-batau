import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-heading font-bold mb-4 text-white">Ready to Be a True Champion?</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-8">
          Join a community of athletes committed to playing fair and winning clean.
        </p>
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-shadow duration-300 hover:shadow-glow"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Start Learning for Free
        </motion.button>
      </div>
    </section>
  )
};

export default FinalCTA;
