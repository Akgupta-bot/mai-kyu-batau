import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiCompass,
  FiCpu,
  FiUser,
  FiLogOut,
  FiChevronsLeft,
  FiMenu,
} from "react-icons/fi";
import pandaAvatar from "../assets/Panda.mp4";

const sidebarVariants = {
  open: {
    width: "16rem",
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
  closed: {
    width: "5rem",
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

const itemVariants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
  closed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navLinks = [
    { icon: <FiGrid size={24} />, name: "Dashboard", path: "/dashboard" },
    { icon: <FiCompass size={24} />, name: "Learning Path", path: "/path" },
    { icon: <FiCpu size={24} />, name: "AI Coach", path: "/coach" },
    { icon: <FiUser size={24} />, name: "Profile", path: "/profile" },
  ];

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="bg-slate-900/80 backdrop-blur-sm border-r border-slate-700 p-4 flex flex-col relative"
    >
      {/* --- Toggle Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-10 bg-slate-800 hover:bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center border border-slate-700 transition-colors"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "open" : "closed"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <FiChevronsLeft /> : <FiMenu />}
          </motion.div>
        </AnimatePresence>
      </button>

      <motion.div
        className={`flex items-center ${isOpen ? "gap-4" : "justify-center"
          } mb-10`}
      >
        <FiGrid size={32} className="text-blue-400 flex-shrink-0" />
        <AnimatePresence>
          {isOpen && (
            <motion.h1
              variants={itemVariants}
              className="font-heading text-3xl font-bold text-white whitespace-nowrap"
            >
              DopeNope
            </motion.h1>
          )}
        </AnimatePresence>
      </motion.div>

      <nav className="flex-grow">
        <ul>
          {navLinks.map((link) => (
            <li key={link.name} className="mb-2">
              <Link
                to={link.path}
                className={`flex items-center py-3 px-4 rounded-lg text-slate-300 transition-colors ${isOpen ? "gap-4" : "justify-center"
                  } ${location.pathname === link.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <div className="flex-shrink-0">{link.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      variants={itemVariants}
                      className="font-semibold whitespace-nowrap"
                    >
                      {link.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`border-t border-slate-700 pt-4`}>
        <Link
          to="/profile"
          className={`flex items-center group ${isOpen ? "gap-3" : "justify-center"
            }`}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-700 group-hover:border-blue-500 transition-colors">
            <video
              src={pandaAvatar}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div variants={itemVariants} className="whitespace-nowrap">
                <p className="font-bold text-white">Harshit Sinha</p>
                <p className="text-sm text-slate-400">View Profile</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <button
          className={`w-full flex items-center mt-4 py-3 px-4 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors ${isOpen ? "gap-4" : "justify-center"
            }`}
        >
          <FiLogOut size={24} className="flex-shrink-0" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                variants={itemVariants}
                className="font-semibold whitespace-nowrap"
              >
                Log Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
