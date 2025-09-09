import { motion } from 'framer-motion';

export default function DialogueCard({ isGameStart, phase, isNarrator, currentLine }) {
    return (
        <>
            {isGameStart && phase === "dialogue" && !isNarrator && currentLine && (
                <motion.p
                    key={`dialogue-${currentLine}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute top-0 min-w-full text-lg md:text-xl text-white bg-black/50 px-6 py-3 rounded-xl shadow`}
                >
                    {currentLine.text}
                </motion.p>
            )}
        </>
    )
}
