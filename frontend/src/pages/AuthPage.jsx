import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiAward } from 'react-icons/fi';

// We can import the Navbar to make this feel like a complete page
import Navbar from '../components/Navbar'; 

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    // Main container is now a single column flexbox to center everything
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Navbar /> {/* Added navbar for a complete look */}

      <div className="w-full max-w-2xl mx-auto text-center">
          {/* Centered headline and sub-headline, moved from the side */}
          <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
          >
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">
                  PLAY<span className="text-blue-400">TRUE</span>
              </h1>
              <p className="text-slate-400 mt-4 text-lg">
                  The fastest path from practice to podium.
              </p>
          </motion.div>

          {/* The main 'app window' form container */}
          <motion.div
              className="w-full bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 rounded-2xl border border-slate-700 text-left"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
          >
              <motion.div
                  key={isLoginView ? 'login' : 'signup'}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
              >
                  <h2 className="font-heading text-4xl font-bold text-white mb-2">
                      {isLoginView ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-slate-400 mb-8">
                      {isLoginView ? 'Log in to continue your journey.' : 'Start your journey to greatness.'}
                  </p>

                  <form className="space-y-6">
                      {!isLoginView && (
                          <>
                              <div className="relative">
                                  <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                                  <input type="text" placeholder="Your Name" className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                               <div className="relative">
                                  <FiAward className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                                  <input type="text" placeholder="Your Sport (e.g., Athletics)" className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                          </>
                      )}

                      <div className="relative">
                          <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                          <input type="email" placeholder="Email Address" className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>

                      <div className="relative">
                          <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                          <input type="password" placeholder="Password" className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>

                      <motion.button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg transition-shadow duration-300 hover:shadow-glow"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                      >
                          {isLoginView ? 'Log In' : 'Sign Up'}
                      </motion.button>
                  </form>

                  <p className="text-center text-slate-400 mt-8">
                      {isLoginView ? "Don't have an account?" : "Already have an account?"}
                      <button onClick={() => setIsLoginView(!isLoginView)} className="font-bold text-blue-400 hover:underline ml-2">
                          {isLoginView ? 'Sign Up' : 'Log In'}
                      </button>
                  </p>
              </motion.div>
          </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;