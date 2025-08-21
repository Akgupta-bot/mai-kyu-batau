import React from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-slate-900">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight text-white">
            Your Career. <span className="text-blue-400">Your Choice.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-400">
            An interactive game that teaches you to win without compromise. Make the right decisions to build a legacy you can be proud of.
          </p>
          <div className="mt-10 flex justify-center lg:justify-start">
            <motion.button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-shadow duration-300 hover:shadow-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
            className="mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
        >
            <DotLottieReact
              src="https://lottie.host/71bb5edd-9d19-4d63-9b3b-693c9e80f332/mjEkBzRYeK.lottie"
              loop
              autoplay
              className="w-full h-auto scale-150"
            />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;