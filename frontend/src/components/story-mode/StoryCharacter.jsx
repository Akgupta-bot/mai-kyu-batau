import AnimatedCharacter from '/animated-character-unscreen.gif'
import AnimatedCharacterFixed from '/animated-character-unscreen-fixed.png'

export default function StoryCharacter({ isNarrator, characterSide, isActive, dialogue }) {
    if (isNarrator) return null

    return (
        <div className={`absolute ${characterSide}-5 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6`}>
            {isActive && (
                <p className="text-2xl text-black bg-white/60 px-3 py-1 rounded-lg">
                    {dialogue}
                </p>
            )}
            <img
                src={isActive ? AnimatedCharacter : AnimatedCharacterFixed}
                className={isActive ? "w-125 cursor-pointer" : "w-50 opacity-70"}
            />
        </div>
    )
}