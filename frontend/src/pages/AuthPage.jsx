import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimatedBackground from '../components/AnimatedBackground';

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
                // A non-alert way to show message could be a state variable that renders an error message in the UI
                console.error('Please fill all required fields');
                return;
            }

            const response = await axios.post(backendUrl, payload, { withCredentials: true });
            console.log('Success:', response.data);
            
            localStorage.setItem('token', response.data.token);

            if (isLoginView) {
                navigate('/path'); // redirect after login
            } else {
                navigate('/onboarding'); // redirect to onboarding page
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            console.error('Error:', errorMessage);
            // Again, consider a UI element for this instead of an alert
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 },
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-slate-300">
            <AnimatedBackground />
            <div className="relative z-10 w-full max-w-md mx-auto text-center">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link to="/" className="font-bold text-3xl text-white tracking-tighter">PlayTrue</Link>
                    <p className="text-slate-400 mt-2">
                        {isLoginView ? 'Welcome back, champion.' : 'Join the league of integrity.'}
                    </p>
                </motion.div>

                <div className="relative w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-8 overflow-hidden backdrop-blur-sm">
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
                            noValidate
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 text-left">
                                {isLoginView ? 'Log In' : 'Sign Up'}
                            </h2>

                            {isLoginView ? (
                                <div className="relative">
                                    <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        name="identifier"
                                        placeholder="Username or Email"
                                        value={formData.identifier}
                                        onChange={handleChange}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="relative">
                                        <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        />
                                    </div>
                                    <div className="relative">
                                        <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="relative">
                                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full py-3 font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-200 transition-colors"
                                whileTap={{ scale: 0.98 }}
                            >
                                {isLoginView ? 'Continue' : 'Create Account'}
                            </motion.button>
                        </motion.form>
                    </AnimatePresence>
                </div>

                <p className="text-slate-400 mt-6">
                    {isLoginView ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={() => {
                            setIsLoginView(!isLoginView);
                            setFormData({ identifier: '', email: '', username: '', password: '' });
                        }}
                        className="font-semibold text-blue-400 hover:text-blue-300 ml-2 focus:outline-none"
                    >
                        {isLoginView ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
