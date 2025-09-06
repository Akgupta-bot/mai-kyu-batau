import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// SVG Icon Component defined locally to avoid import issues.
const FiGithub = (props) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" {...props}>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
);


const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center py-20 px-4 relative">
       <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-full">
            Backed by Storytelling & Choice
          </div>
         <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-slate-200 to-slate-400">
  Play. Learn. Stay Clean.
  <span className="block">Defeat Doping, Level Up Fairly</span>
</h1>
<p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
  A gamified journey that shows the true power of fair play. Make choices, face challenges, and rise as a champion who wins with integrity.
</p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/login">
              <motion.button
                className="bg-white text-slate-900 font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-slate-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
            </Link>
            <motion.button
              className="bg-transparent text-slate-300 font-medium py-3 px-8 rounded-full border border-slate-700 flex items-center gap-2 transition-all duration-300 hover:border-slate-500 hover:text-white"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
              <FiGithub className="w-5 h-5" /> Star on GitHub
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

