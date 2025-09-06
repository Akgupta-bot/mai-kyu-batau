import React from 'react';
import { motion } from 'framer-motion';
import pandaAvatar from '../assets/Panda.mp4'; 
import { FiUser, FiEdit2, FiShield, FiBell, FiLock } from 'react-icons/fi';

const ProfileCard = ({ children, className }) => (
  <div className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700 ${className}`}>
    {children}
  </div>
);

const SettingsItem = ({ icon, title, description, buttonText }) => (
  <div className="flex items-center justify-between p-4 border-b border-slate-700 last:border-b-0">
    <div className="flex items-center gap-4">
      <div className="text-blue-400">{icon}</div>
      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
    <button className="text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md transition-colors">
      {buttonText}
    </button>
  </div>
);

const ProfilePage = () => {
  const mockUserData = {
    name: 'Harshit Sinha',
    email: 'harshit.sinha@example.com',
    joinDate: 'August 2025',
    age: 21,
    sports: ['football'],
    integrityScore: 95,
  };

  return (
    <motion.div 
      className="p-8 text-white bg-black min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-white mb-8">My Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <ProfileCard className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg shadow-blue-500/30 mb-4">
              <video
                src={pandaAvatar}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold font-heading">{mockUserData.name}</h3>
            <p className="text-slate-400">{mockUserData.email}</p>
            <p className="text-sm text-slate-500 mt-2">Joined {mockUserData.joinDate}</p>
            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-shadow duration-300 hover:shadow-glow">
              <FiEdit2 size={14} /> Edit Profile
            </button>
          </ProfileCard>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <ProfileCard>
            <h3 className="text-xl font-bold mb-4">Player Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-400">Age</p>
                <p className="text-2xl font-bold">{mockUserData.age}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-400">Integrity Score</p>
                <p className="text-2xl font-bold text-green-400">{mockUserData.integrityScore}%</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg text-center col-span-2 md:col-span-1">
                <p className="text-sm text-slate-400">Sports</p>
                <p className="text-lg font-bold truncate">{mockUserData.sports.join(', ')}</p>
              </div>
            </div>
          </ProfileCard>
          
          <ProfileCard>
            <h3 className="text-xl font-bold mb-2">Account Settings</h3>
            <div>
              <SettingsItem icon={<FiUser size={20}/>} title="Personal Information" description="Update your name and contact details." buttonText="Update" />
              <SettingsItem icon={<FiLock size={20}/>} title="Password" description="Change your account password." buttonText="Change" />
              <SettingsItem icon={<FiBell size={20}/>} title="Notifications" description="Manage your notification preferences." buttonText="Manage" />
            </div>
          </ProfileCard>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
