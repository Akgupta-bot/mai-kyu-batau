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
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -200, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                                className="absolute left-14 top-1/2 -translate-y-1/2
                                            w-72 bg-white/60 border border-gray-200/50 
                                            rounded-2xl shadow-xl p-5 backdrop-blur-lg"
                            >
                                {/* Header with close button */}
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-gray-900 text-lg">
                                        {scenario.title || "Scenario"}
                                    </h3>
                                    <button
                                        onClick={() => setIsInfoOpen(false)}
                                        className="text-gray-500 hover:text-gray-800 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gray-200/60 mb-3" />

                                {/* Content */}
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    {scenario.setup ||
                                        "This is some background info about the current scenario. You can put a few sentences here to give context."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    )

}