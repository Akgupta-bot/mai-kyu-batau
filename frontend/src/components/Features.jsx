import React from 'react';
import { motion } from 'framer-motion';

// SVG Icon Components defined locally to avoid import issues.
const FiMessageSquare = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const FiAward = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
);

const FiCpu = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
);


const Features = () => {
  const featureList = [
    { icon: <FiMessageSquare size={30} />, title: "Interactive Storytelling", description: "Engage in branching narratives where your choices have real consequences on your virtual career." },
    { icon: <FiAward size={30} />, title: "Gamified Lessons", description: "Progress through levels, earn badges, and stay motivated as you learn about anti-doping rules and ethics." },
    { icon: <FiCpu size={30} />, title: "AI-Powered Assistant", description: "Have questions? Our AI coach is available 24/7 to provide instant, accurate, and supportive answers." },
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-white">Everything You Need to Succeed</h2>
          <p className="text-slate-400 mt-2">Our platform is packed with powerful, engaging features.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((feature) => (
              <motion.div
                  key={feature.title}
                  className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm"
                  whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                  <div className="flex items-center gap-4 mb-4">
                      <div className="text-blue-400">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

