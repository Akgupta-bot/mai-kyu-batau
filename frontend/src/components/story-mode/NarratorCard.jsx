import { motion } from 'framer-motion'

export default function NarratorCard({ isGameStart, phase, isNarrator, currentLine }) {
    return (
        <>
            {isGameStart && (phase === "titleSetup" || (phase === "dialogue" && isNarrator)) && (
                <div className="absolute inset-0 grid place-items-center px-6">
                    <motion.p
                        key={`narrator-${currentLine}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-3xl text-white text-xl md:text-2xl text-center bg-black/50 px-5 py-4 rounded-2xl"
                    >
                        {currentLine?.text}
                    </motion.p>
                </div>
            )}
        </>
    )
}
