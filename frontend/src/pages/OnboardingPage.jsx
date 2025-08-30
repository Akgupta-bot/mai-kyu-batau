import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 


const sports = [
  { name: 'Athletics', emoji: '🏃' },
  { name: 'Basketball', emoji: '🏀' },
  { name: 'Swimming', emoji: '🏊' },
  { name: 'Cycling', emoji: '🚴' },
  { name: 'Football', emoji: '⚽' },
  { name: 'Weightlifting', emoji: '🏋️' },
];

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [selectedSports, setSelectedSports] = useState([]);
  const navigate = useNavigate();

  const handleSelectSport = (sportName) => {
    setSelectedSports(prev => 
      prev.includes(sportName) 
        ? prev.filter(s => s !== sportName) 
        : [...prev, sportName]
    );
  };

  const handleNext = () => {
    if (step === 1 && age.trim() !== '' && parseInt(age) > 0) {
      setStep(2);
    }
  };


  const handleFinish = async () => {
    if (selectedSports.length === 0) return;

    try {
     
      const token = localStorage.getItem('token');
      console.log("Token:", token); // <-- check if it's null or correct JWT
      if (!token) {
        alert('You are not logged in!');
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/onboarding', 
        {
          age: parseInt(age),
          sports: selectedSports,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }
      );

      console.log('Onboarding complete:', response.data);
      alert('Your profile is set up!');
      
      
      navigate('/path');

    } catch (error) {
      console.error('Onboarding failed:', error);
      alert('Failed to save your information. Please try again.');
    }
  };

  const slideTransition = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { type: 'tween', ease: 'easeInOut', duration: 0.5 }
  };

  return (
    
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12 relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" {...slideTransition}>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">What's your age?</h2>
                <p className="text-slate-400 mb-8">This helps us personalize your learning journey.</p>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-4 px-4 text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  onClick={handleNext}
                  disabled={!age || parseInt(age) <= 0}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                >
                  Next <FiArrowRight />
                </motion.button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" {...slideTransition}>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">What's your sport?</h2>
                <p className="text-slate-400 mb-8">Select one or more sports you're interested in.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sports.map(sport => {
                    const isSelected = selectedSports.includes(sport.name);
                    return (
                      <motion.div
                        key={sport.name}
                        onClick={() => handleSelectSport(sport.name)}
                        className={`relative p-4 bg-slate-900 border rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? 'border-cyan-400 ring-2 ring-cyan-400' : 'border-slate-700'}`}
                        whileHover={{ y: -5, scale: 1.05 }}
                      >
                        <div className="text-4xl mb-2">{sport.emoji}</div>
                        <h3 className="font-semibold text-white">{sport.name}</h3>
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-cyan-400 text-slate-900 rounded-full p-1">
                            <FiCheck />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
                <motion.button
                  onClick={handleFinish}
                  disabled={selectedSports.length === 0}
                  className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-green-500 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                >
                  Finish Setup
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;