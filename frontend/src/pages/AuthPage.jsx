import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(false);
  
 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const endpoint = isLoginView ? '/api/login' : '/api/signup';
    const backendUrl = `http://localhost:4000${endpoint}`;

    try {
      
      const response = await axios.post(backendUrl, formData);
      console.log('Success:', response.data);
      
     
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
       
      } else {
        alert('Sign up successful! Please log in.');
        setIsLoginView(true); 
      }

    } catch (error) {
      console.error('Error:', error.response.data.message);
      alert(`Error: ${error.response.data.message}`);
    }
  };


  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/" className="font-bold text-3xl text-white tracking-tighter">PlayTrue</Link>
          <p className="text-gray-400 mt-2">
            {isLoginView ? 'Welcome back, champion.' : 'Join the league of integrity.'}
          </p>
        </motion.div>

        <div className="relative w-full bg-gray-900/50 border border-gray-800 rounded-2xl p-8 overflow-hidden">
          <AnimatePresence mode="wait">
           
            <motion.form
              key={isLoginView ? 'login' : 'signup'}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-left">
                {isLoginView ? 'Log In' : 'Sign Up'}
              </h2>

              
              {isLoginView && (
                <div className="relative">
                  <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text" name="username" placeholder="Username"
                    value={formData.username} onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="email" name="email" placeholder="Email Address"
                  value={formData.email} onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="password" name="password" placeholder="Password"
                  value={formData.password} onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 font-semibold text-black bg-white rounded-md hover:bg-gray-200 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                {isLoginView ? 'Continue' : 'Create Account'}
              </motion.button>
            </motion.form>
          </AnimatePresence>
        </div>

        <p className="text-gray-500 mt-6">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-blue-400 hover:text-blue-300 ml-2">
            {isLoginView ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;