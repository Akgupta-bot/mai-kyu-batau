import React from 'react';
import { motion } from 'framer-motion';


const FiAward = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"></polyline></svg>
);
const FiClock = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const FiMapPin = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const EventCard = ({ event }) => {
    const { title, organizer, prize, date, location } = event;

    return (
        <motion.div
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col"
            whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.5)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex-grow">
                <div className="flex items-center gap-3 mb-4">
                    <img src="https://placehold.co/40x40/1e293b/ffffff?text=KI" alt="Organizer Logo" className="w-10 h-10 rounded-full border-2 border-slate-700" />
                    <span className="font-semibold text-slate-400">{organizer}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

                <div className="space-y-3 text-slate-300">
                    <div className="flex items-center gap-3">
                        <FiAward className="w-5 h-5 text-yellow-400" />
                        <div>
                            <span className="text-sm text-slate-400">Prize Pool</span>
                            <p className="font-semibold">{prize}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FiClock className="w-5 h-5 text-cyan-400" />
                        <div>
                            <span className="text-sm text-slate-400">Date & Time</span>
                            <p className="font-semibold">{date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FiMapPin className="w-5 h-5 text-green-400" />
                        <div>
                            <span className="text-sm text-slate-400">Location</span>
                            <p className="font-semibold">{location}</p>
                        </div>
                    </div>
                </div>
            </div>

            <motion.button
                className="w-full mt-6 bg-white text-slate-900 font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-slate-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Register Now
            </motion.button>
        </motion.div>
    );
};

const EventsPage = () => {
    const events = [
        {
            title: 'Khelo India Football Tournament',
            organizer: 'Khelo India',
            prize: '₹5,00,000',
            date: 'October 15, 2025 @ 9:00 AM',
            location: 'Maharana Pratap Sports College, Dehradun'
        },
        {
            title: 'National Athletics Championship',
            organizer: 'Athletics Federation of India',
            prize: '₹10,00,000',
            date: 'November 5, 2025 @ 8:00 AM',
            location: 'Jawaharlal Nehru Stadium, New Delhi'
        },
        {
            title: 'Pro Kabaddi League Tryouts',
            organizer: 'Mashal Sports',
            prize: 'Entry to Player Auction',
            date: 'September 28, 2025 @ 10:00 AM',
            location: 'Kanteerava Indoor Stadium, Bengaluru'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-slate-300 p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-slate-200 to-slate-400">
                        Upcoming Events
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                        Compete, showcase your talent, and play with integrity in nationally recognized tournaments.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
