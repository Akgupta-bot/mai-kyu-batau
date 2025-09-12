import { AnimatePresence, motion } from 'framer-motion';

import AnimatedCharacter from '/animated-character-unscreen.gif';
import AnimatedCharacterFixed from '/animated-character-unscreen-fixed.png';

export default function StoryCharacter({ characterSide, isActive, phase }) {
    return (
        <div
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6 ${characterSide === "left" ? "left-10" : "right-10"
                }`}
        >
            <motion.img
                src={isActive && phase === "dialogue" ? AnimatedCharacter : AnimatedCharacterFixed}
                alt={characterSide}
                animate={{ scale: isActive ? phase === "quiz" ? 1 : 3 : 0.85, opacity: isActive ? phase === "quiz" ? 0.7 : 1 : 0.7 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className={`w-[180px] md:w-[230px] ${characterSide === "left" ? "ml-4" : "mr-4"}`}
            />
        </div>
    );
}