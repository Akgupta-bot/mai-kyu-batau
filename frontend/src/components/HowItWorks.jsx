import React from 'react';
import { motion } from 'framer-motion';
import { FiUserCheck, FiBookOpen, FiTarget } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    { icon: <FiUserCheck className="w-8 h-8" />, title: "Create Your Profile", description: "Personalize your journey with your name, age, and sport." },
    { icon: <FiBookOpen className="w-8 h-8" />, title: "Live the Story", description: "Navigate real-life scenarios and interact with characters." },
    { icon: <FiTarget className="w-8 h-8" />, title: "Make Your Choice", description: "Your decisions shape the story and determine your career path." },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 }}};
  const cardVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 }};

  return (
    <section id="howitworks" className="py-20 bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-heading font-bold mb-4 text-white">A Journey in Three Steps</h2>
        <p className="text-slate-400 mb-12">It's easy to start your path to becoming a true champion.</p>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {steps.map((step) => (
            <motion.div 
              key={step.title} 
              className="bg-slate-800 p-8 rounded-xl border-t-2 border-blue-500" 
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            >
              <div className="bg-slate-700 text-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
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