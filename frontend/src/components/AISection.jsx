import React from 'react';
import { motion } from 'framer-motion';

const AISection = () => {
  return (
      <section id="ai" className="py-20 bg-slate-950">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                  className="lg:w-1/2"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
              >
                  <h2 className="text-4xl font-heading font-bold text-white mb-4">Meet Your AI Coach</h2>
                  <p className="text-slate-400 mb-6">
                      Got a question about a banned substance? Curious about the side effects? Just ask. Our AI assistant provides reliable, easy-to-understand information whenever you need it.
                  </p>
                  <motion.button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-shadow duration-300 hover:shadow-glow"
                      whileHover={{ scale: 1.05 }}
                  >
                      Ask a Question
                  </motion.button>
              </motion.div>
              <motion.div 
                  className="lg:w-1/2 w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
              >
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                      <div className="flex flex-col space-y-4">
                          <div className="self-end bg-blue-500 text-white p-3 rounded-l-lg rounded-br-lg max-w-xs shadow-md">
                              What are the side effects of steroids?
                          </div>
                          <div className="self-start bg-slate-700 text-slate-200 p-3 rounded-r-lg rounded-bl-lg max-w-xs shadow-md">
                              <p className="font-semibold mb-2 text-blue-400">AI Coach says:</p>
                              Steroids can cause serious health issues, including heart problems, liver damage, mood swings, and can lead to disqualification from sports. It's crucial to compete clean for your health and career.
                          </div>
                      </div>
                  </div>
              </motion.div>
          </div>
      </section>
  );
};

export default AISection;