import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import { FiLock } from "react-icons/fi";
import LevelModal from "../components/LevelModal";
import spaceBackground from "../assets/5539119.jpg";
import pandaAvatar from "../assets/Panda.mp4"; 

const RocketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.5 13.5L2 12l1.5-3.5L5.5 10l2-1.5L6 5l3.5-1.5L11 5.5 12.5 4 14 5.5l2-1.5L14.5 5l-1.5 3.5 2 1.5-2 1.5 1.5 3.5-3.5-1.5-1.5 2zM22 2l-3 3"></path>
  </svg>
);
const PlanetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
  </svg>
);
const SatelliteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12l5-5"></path>
    <path d="M12 5l-5 5"></path>
    <path d="M19 12l-5 5"></path>
    <path d="M12 19l5-5"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const GalaxyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 6a6 6 0 1 0 6 6"></path>
    <path d="M12 18a6 6 0 1 0-6-6"></path>
    <path d="M12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
  </svg>
);
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  </svg>
);

// --- Levels ---
const levels = [
  {
    id: 1,
    title: "Launchpad: The Basics",
    story: "Your journey begins. Learn the core principles of fair play.",
    status: "completed",
    stars: 3,
    x: "50%",
    y: "85%",
    icon: <RocketIcon />,
  },
  {
    id: 2,
    title: "Asteroid Field: Supplements",
    story: "Navigate the tricky world of supplements and hidden substances.",
    status: "unlocked",
    stars: 0,
    x: "25%",
    y: "65%",
    icon: <PlanetIcon />,
  },
  {
    id: 3,
    title: "Comms Relay: Coach Talk",
    story: "Decode advice from coaches and teammates.",
    status: "locked",
    stars: 0,
    x: "75%",
    y: "45%",
    icon: <SatelliteIcon />,
  },
  {
    id: 4,
    title: "Deep Space Scan: Doping Control",
    story: "Understand the doping control process from start to finish.",
    status: "locked",
    stars: 0,
    x: "35%",
    y: "25%",
    icon: <GalaxyIcon />,
  },
  {
    id: 5,
    title: "Supernova: The Consequences",
    story: "Witness the explosive impact of your final choices.",
    status: "locked",
    stars: 0,
    x: "65%",
    y: "5%",
    icon: <StarIcon />,
  },
];

const PathUI = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <>
      <LevelModal
        level={selectedLevel}
        onClose={() => setSelectedLevel(null)}
      />

      <div className="absolute top-6 left-6 z-50">
        <Link
          to="/event"
          className="px-4 py-2 bg-slate-900/70 border border-slate-700 text-white rounded-full hover:bg-purple-600 transition-all"
        >
          Events
        </Link>
      </div>

      <div className="absolute top-6 right-6 z-50">
        <Link to="/dashboard">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-700 hover:border-blue-500 transition-colors">
            <video
              src={pandaAvatar}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>

      
      <div
        className="h-screen w-screen bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${spaceBackground})` }}
      >
        <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
          <svg className="absolute w-full h-full z-0" viewBox="0 0 400 600">
            <defs>
              <linearGradient
                id="pathGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#22d3ee", stopOpacity: 0 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#22d3ee", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M 200 510 C 100 450, 100 390, 100 390 S 100 330, 300 270 C 500 210, 500 150, 200 90 S -100 30, 260 30"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="4"
              strokeDasharray="10 10"
              strokeLinecap="round"
            />
          </svg>

          {/* Levels container takes full height */}
          <div className="relative z-10 w-full h-full">
            {levels.map((level) => (
              <motion.div
                key={level.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: level.x, top: level.y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: level.id * 0.2,
                  type: "spring",
                }}
                onClick={() => setSelectedLevel(level)}
              >
                <motion.div
                  className={`w-24 h-24 rounded-full flex items-center justify-center p-2 transition-all duration-300 bg-slate-900/50 backdrop-blur-sm border-2 ${
                    level.status === "locked"
                      ? "border-slate-600"
                      : level.status === "completed"
                      ? "border-green-400 shadow-lg shadow-green-400/30"
                      : "border-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse"
                  }`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {level.status === "locked" ? (
                    <FiLock className="text-slate-500" size={36} />
                  ) : (
                    level.icon
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PathUI;
