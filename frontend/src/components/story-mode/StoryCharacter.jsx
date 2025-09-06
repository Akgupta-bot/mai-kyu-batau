import { AnimatePresence, motion } from 'framer-motion';

import AnimatedCharacter from '/animated-character-unscreen.gif';
import AnimatedCharacterFixed from '/animated-character-unscreen-fixed.png';

export default function StoryCharacter({ characterSide, isActive, dialogue }) {
    return (
        <div className={`relative flex flex-col items-center ${characterSide === "left" ? "self-end" : "self-end"}`}>
            <AnimatePresence>
                {isActive && (
                    <motion.p
                        key={`speech-${characterSide}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mb-4 text-lg md:text-xl text-black bg-white/80 px-4 py-2 rounded-xl shadow"
                    >
                        {dialogue}
                    </motion.p>
                )}
            </AnimatePresence>

            <motion.img
                src={isActive ? AnimatedCharacter : AnimatedCharacterFixed}
                alt={characterSide}
                animate={{ scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.7 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className={`w-[180px] md:w-[230px] ${characterSide === "left" ? "ml-4" : "mr-4"}`}
            />
        </div>
    );
}