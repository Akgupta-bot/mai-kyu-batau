import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <motion.main 
        className="flex-1 overflow-y-auto"
        animate={{ marginLeft: isSidebarOpen ? '0rem' : '0rem' }} 
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default DashboardLayout;