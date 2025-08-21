import React from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiAward, FiCpu } from 'react-icons/fi';

const Features = () => {
  const featureList = [
    { icon: <FiMessageSquare size={30} />, title: "Interactive Storytelling", description: "Engage in branching narratives where your choices have real consequences on your virtual career." },
    { icon: <FiAward size={30} />, title: "Gamified Lessons", description: "Progress through levels, earn badges, and stay motivated as you learn about anti-doping rules and ethics." },
    { icon: <FiCpu size={30} />, title: "AI-Powered Assistant", description: "Have questions? Our AI coach is available 24/7 to provide instant, accurate, and supportive answers." },
  ];

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-white">Everything You Need to Succeed</h2>
          <p className="text-slate-400 mt-2">Our platform is packed with powerful, engaging features.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((feature) => (
              <motion.div
                  key={feature.title}
                  className="bg-slate-800 p-6 rounded-lg"
                  whileHover={{ y: -5, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
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