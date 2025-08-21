import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';


const Popup = ({ type, title, message, onClose }) => {
  const isSuccess = type === 'success';

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-50%", x: "-50%", opacity: 0, scale: 0.9 },
    visible: { y: "-50%", x: "-50%", opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose} 
      >
        <motion.div
          className={`relative w-full max-w-md p-8 bg-gray-900 border ${isSuccess ? 'border-green-500/50' : 'border-red-500/50'} rounded-2xl shadow-lg`}
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()} 
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
            <FiX size={24} />
          </button>
          
          <div className="flex flex-col items-center text-center">
            {isSuccess ? (
              <FiCheckCircle className="w-16 h-16 text-green-500 mb-4" />
            ) : (
              <FiXCircle className="w-16 h-16 text-red-500 mb-4" />
            )}
            <h2 className={`text-2xl font-bold text-white mb-2 ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
              {title}
            </h2>
            <p className="text-gray-400">{message}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Popup;