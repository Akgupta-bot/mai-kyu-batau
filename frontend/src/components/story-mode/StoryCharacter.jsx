import { AnimatePresence, motion } from 'framer-motion';

import AnimatedCharacter from '/animated-character-unscreen.gif';
import AnimatedCharacterFixed from '/animated-character-unscreen-fixed.png';

export default function StoryCharacter({ characterSide, isActive }) {
    return (
        <div
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6 ${characterSide === "left" ? "left-10" : "right-10"
                }`}
        >
            <motion.img
                src={isActive ? AnimatedCharacter : AnimatedCharacterFixed}
                alt={characterSide}
                animate={{ scale: isActive ? 3 : 0.85, opacity: isActive ? 1 : 0.7 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className={`w-[180px] md:w-[230px] ${characterSide === "left" ? "ml-4" : "mr-4"}`}
            />
        </div>
    );
}