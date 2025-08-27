import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// --- Helper component for displaying stars ---
const StarRating = ({ count }) => (
  <motion.div variants={itemVariants} className="flex justify-center gap-1 mb-4">
    {[...Array(3)].map((_, i) => (
      <FiStar key={i} className={`w-5 h-5 ${i < count ? 'text-yellow-400' : 'text-slate-600'}`} fill={i < count ? 'currentColor' : 'none'} />
    ))}
  </motion.div>
);

// --- Animation Variants for Cleaner Code ---
const modalContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};


const LevelModal = ({ level, onClose }) => {
  if (!level) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-lg bg-slate-900/50 border border-cyan-400/50 rounded-2xl shadow-lg text-center overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Apply the container variant here */}
          <motion.div 
            className="p-8"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="w-24 h-24 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center border-2 border-cyan-400 shadow-lg shadow-cyan-500/20"
            >
              {level.icon}
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl font-heading font-bold text-white mb-2">{level.title}</motion.h2>
            
            {/* Display stars for completed levels */}
            {level.status === 'completed' && <StarRating count={level.stars} />}
            
            <motion.p variants={itemVariants} className="text-slate-400 mb-6">{level.story}</motion.p>

            <motion.div variants={itemVariants}>
              <Link to={`/story/${level.id}`}>
                <motion.button
                  className="w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={level.status === 'locked'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {level.status === 'locked' ? 'Locked' : 'Start Level'}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
            <FiX size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LevelModal;