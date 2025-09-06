import React from 'react';
import { motion } from 'framer-motion';

// SVG Icon Components defined locally to avoid import issues.
const FiUserCheck = (props) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <polyline points="17 11 19 13 23 9"></polyline>
  </svg>
);

const FiBookOpen = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);

const FiTarget = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
    </svg>
);

const HowItWorks = () => {
  const steps = [
    { icon: <FiUserCheck className="w-8 h-8" />, title: "Create Your Profile", description: "Personalize your journey with your name, age, and sport." },
    { icon: <FiBookOpen className="w-8 h-8" />, title: "Live the Story", description: "Navigate real-life scenarios and interact with characters." },
    { icon: <FiTarget className="w-8 h-8" />, title: "Make Your Choice", description: "Your decisions shape the story and determine your career path." },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 }}};
  const cardVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 }};

  return (
    <section id="howitworks" className="py-20">
       <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest">How it Works</p>
            <h2 className="text-4xl font-bold mt-2 text-slate-100">A Journey in Three Steps</h2>
        </div>
      <div className="container mx-auto px-6 text-center">
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {steps.map((step) => (
            <motion.div 
              key={step.title} 
              className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 backdrop-blur-sm" 
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5, borderColor: 'rgba(59, 130, 246, 0.5)' }}
            >
              <div className="bg-slate-800 text-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

