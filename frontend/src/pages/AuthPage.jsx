import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    identifier: '',
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLoginView ? '/api/login' : '/api/signup';
    const backendUrl = `http://localhost:5000${endpoint}`;

    try {
      const payload = isLoginView
        ? { emailOrUsername: formData.identifier, password: formData.password }
        : { email: formData.email, username: formData.username, password: formData.password };

      if (!payload.password || (isLoginView && !payload.emailOrUsername) || (!isLoginView && (!payload.email || !payload.username))) {
        return alert('Please fill all required fields');
      }

      const response = await axios.post(backendUrl, payload, { withCredentials: true });
      console.log('Success:', response.data);

      if (isLoginView) {
        // Login flow
        alert('Login successful!');
        localStorage.setItem('token', response.data.token);
        navigate('/path'); // redirect after login
      } else {
        // Signup flow → redirect to onboarding
        alert('Sign up successful! Redirecting to onboarding...');
        localStorage.setItem('token', response.data.token);
        navigate('/onboarding'); // redirect to onboarding page

        // Reset form
        setIsLoginView(true);
        setFormData({ identifier: '', email: '', username: '', password: '' });
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
      alert(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
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

        <div className="relative w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-8 overflow-hidden">
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

              {isLoginView ? (
                <div className="relative">
                  <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="identifier"
                    placeholder="Username or Email"
                    value={formData.identifier}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <>
                  <div className="relative">
                    <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <p className="text-gray-400 mt-6">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLoginView(!isLoginView);
              setFormData({ identifier: '', email: '', username: '', password: '' });
            }}
            className="font-semibold text-blue-400 hover:text-blue-300 ml-2"
          >
            {isLoginView ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
