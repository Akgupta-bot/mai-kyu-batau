import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InfoBox({ scenario }) {
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    return (
        <>
            {/* INFO BUTTON + PANEL */}
            <div className="absolute left-6 top-40 z-50">
                <div className='relative'>
                    <motion.div
                        onClick={() => setIsInfoOpen(!isInfoOpen)}
                        className="w-12 h-12 rounded-full bg-white/80 border border-gray-300 cursor-pointer flex items-center justify-center shadow-sm backdrop-blur-sm"
                    >
                        <motion.span
                            className="text-gray-700 text-base font-medium"
                        >
                            {isInfoOpen ? "✕" : "i"}
                        </motion.span>
                    </motion.div>

                    {/* Slide-in Info Panel */}
                    <AnimatePresence>
                        {isInfoOpen && (
                            <motion.div
                                key="info-panel"
                                initial={{ x: -150, opacity: 0 }}
                                animate={{ x: 10, opacity: 1 }}
                                exit={{ x: -150, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                                className="absolute left-14 top-1/2 -translate-y-1/2 w-56 bg-white/90 rounded-lg shadow p-3 text-sm text-gray-700 backdrop-blur"
                            >
                                <h3 className="font-semibold text-gray-900 mb-1">{scenario.title}</h3>
                                <p className="text-gray-600 leading-snug">
                                    {scenario.setup || "This is some background info about the current scenario."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    )

}