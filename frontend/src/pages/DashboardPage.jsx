import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
import PathUI from './PathUI';
import { FiPlayCircle, FiZap, FiCheckCircle, FiClock, FiSearch, FiGrid, FiCompass, FiCpu } from 'react-icons/fi';
import pandaAvatar from '../assets/Panda.mp4';

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
    <div className={`text-3xl mb-3 ${color}`}>{icon}</div>
    <p className="text-slate-400 text-sm">{title}</p>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const QuickActionCard = ({ icon, title, description, to }) => (
  <Link to={to}>
    <motion.div
      className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 h-full hover:border-blue-500 transition-colors"
      whileHover={{ y: -5 }}
    >
      <div className="text-2xl text-blue-400 mb-3">{icon}</div>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </motion.div>
  </Link>
);

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen flex bg-black">
      {/* <Sidebar /> */}
      <main className="flex-1 p-8 overflow-y-auto">

        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">

            <motion.div
              className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-lg shadow-blue-500/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <video
                src={pandaAvatar}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-white">Welcome back, Harshit!</h2>
              <p className="text-slate-400">Ready to continue your journey to greatness?</p>
            </div>
          </div>
          <div className="relative">
            <FiSearch className="absolute top-1/2 left-4 -translate-y-1-2 text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </header>

        <div className="flex border-b border-slate-700 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 py-3 px-4 font-semibold transition-colors ${activeTab === 'overview' ? 'text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-white'}`}
          >
            <FiGrid /> Overview
          </button>
          <button
            onClick={() => setActiveTab('path')}
            className={`flex items-center gap-2 py-3 px-4 font-semibold transition-colors ${activeTab === 'path' ? 'text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-white'}`}
          >
            <FiCompass /> Learning Path
          </button>
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <StatCard icon={<FiCheckCircle />} title="Levels Completed" value="2 / 5" color="text-green-400" />
              <StatCard icon={<FiZap />} title="Integrity Score" value="95%" color="text-yellow-400" />
              <StatCard icon={<FiClock />} title="Total Play Time" value="3h 45m" color="text-cyan-400" />
              <StatCard icon={<FiPlayCircle />} title="Clean Tests" value="12" color="text-purple-400" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-600/50 to-slate-800/50 p-8 rounded-xl border border-blue-500/50 flex flex-col justify-between">

              </div>
              <div className="grid grid-cols-1 gap-6">
                <QuickActionCard icon={<FiCpu />} title="Talk to AI Coach" description="Ask questions about rules or substances." to="/coach" />
                <QuickActionCard icon={<FiZap />} title="Check a Substance" description="Look up items in the WADA database." to="/substances" />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'path' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PathUI />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
