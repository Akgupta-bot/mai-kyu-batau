import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-heading font-bold mb-4 text-white">Ready to Be a True Champion?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Join a community of athletes committed to playing fair and winning clean.
          </p>
          <motion.button
            className="bg-white text-slate-900 font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:bg-slate-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Learning for Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
};

export default FinalCTA;

