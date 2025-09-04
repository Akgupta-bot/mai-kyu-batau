<<<<<<< HEAD
import { useEffect, useState } from 'react'

import client from '../../services/elevenLabs'

import BasketBallImg from '/basketball-court.jpg'
import QuestionCard from '../components/story-mode/QuestionCard'
import LyffyAudio from '/ko.mp3'
import StoryCharacter from '../components/story-mode/StoryCharacter'

// LLM Output Structure
const LLM_OUTPUT = [
    { speaker: "narrator", text: "Let us start the scenario" },
    { speaker: "player1", text: "Hey! how are you?" },
    { speaker: "player2", text: "I am fine, what about you?" }
]

// Sound Output Structure
const SOUND_OUTPUT = [
    { speaker: "narrator", audio: LyffyAudio },
    { speaker: "player1", audio: LyffyAudio },
    { speaker: "player2", audio: LyffyAudio }
]

// Function to map speaker and sound
function mapTextToSound(script, sounds) {
    return script.map((line, index) => ({
        ...line,
        audio: sounds[index]?.audio || null,
        side: line.speaker === "player1" ? "left" : line.speaker === "player2" ? "right" : "center"
    }))
};

const DIALOGUE = mapTextToSound(LLM_OUTPUT, SOUND_OUTPUT);


export default function StoryMode() {
    const [characterPlay, setCharacterPlay] = useState(false);
    const [isGameStart, setIsGameStart] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);

    // Function to Start the Module
    function handlePlay() {
        setIsGameStart(true)

        // 1) Use the cached audio to generate sound using React Query

        /**
         *   - Cache Audio Files ? 
         *   - Will have to keep track of current audio being played, text
         *     being displayed and character in action. 
         */

        setCurrentLine(0)
    }

    // Function to start Character Movement & Audio
    function handleCharacterPlay() {
        setCharacterPlay((play) => !play)
    }

    useEffect(() => {
        if (!isGameStart || !DIALOGUE[currentLine]) return
        const audio = new Audio(DIALOGUE[currentLine].audio)
        audio.play()

        audio.onended = () => {
            setCurrentLine((prev) => (prev + 1 < DIALOGUE.length ? prev + 1 : prev))
        }

        return () => {
            audio.pause()
            audio.currentTime = 0
        }

        // 1) Fetch Storyline
        // 2) Generate audio based on Storyline
        // 3) Save it in state and use it ( React Query )

        // setCharacterPlay((play) => !play)
    }, [currentLine, isGameStart])

    const isNarrator = DIALOGUE[currentLine]?.side === "center";

    return (
        <div className="h-screen w-full overflow-hidden flex flex-col items-center justify-center space-y-6 p-4">
            {/* BASKETBALL SCENE */}
            <div className="w-[60%] h-[50%] mt-15 relative rounded-2xl overflow-hidden">
                <img
                    src={BasketBallImg}
                    alt="Basketball Court"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>
                {!isGameStart && <div className="absolute inset-0 bg-black/40">
                    <h1>Please Press Start...</h1>
                </div>}

                {isGameStart && (
                    <>
                        {/* Narrator */}
                        {isNarrator && (
                            <div className="absolute top-10 w-full flex justify-center">
                                <p className="text-2xl text-white bg-black/60 px-4 py-2 rounded-lg">
                                    {DIALOGUE[currentLine].text}
                                </p>
                            </div>
                        )}

                        <StoryCharacter
                            isNarrator={isNarrator}
                            characterSide="left"
                            isActive={DIALOGUE[currentLine]?.side === "left"}
                            dialogue={DIALOGUE[currentLine]?.side === "left" ? DIALOGUE[currentLine].text : ""}
                        />

                        <StoryCharacter
                            isNarrator={isNarrator}
                            characterSide="right"
                            isActive={DIALOGUE[currentLine]?.side === "right"}
                            dialogue={DIALOGUE[currentLine]?.side === "right" ? DIALOGUE[currentLine].text : ""}
                        />
                    </>
                )}
            </div>
            <QuestionCard isGameStart={isGameStart} onHandlePlay={handlePlay} />
=======
import BasketBallImg from '/basketball-court.jpg'
import AnimatedCharacter from '/animated-character-unscreen.gif'
import AnimatedCharacterFixed from '/animated-character-unscreen-fixed.png'
import { useState } from 'react'

export default function StoryMode() {
    const [characterPlay, setCharacterPlay] = useState(false);

    function handlePlay() {
        console.log(characterPlay)
        setCharacterPlay((play) => !play)
    }

    function handleStop() { }
    return (
        <div className='h-screen w-full overflow-hidden relative'>
            <img src={BasketBallImg} alt="" />
            {!characterPlay && <p className='absolute top-40 left-50 text-3xl text-black'> Hey there </p>}
            {characterPlay && <img src={AnimatedCharacter} className='absolute top-50 right-10' onClick={handlePlay} style={{ "pointer-events": "all" }} />}
            {!characterPlay && <img src={AnimatedCharacterFixed} className='absolute top-54 right-43' onClick={handlePlay} />}
            {characterPlay && <p className='absolute top-40 right-50 text-3xl text-black'> Hey, how have you been? </p>}
            {characterPlay && <img src={AnimatedCharacterFixed} className='absolute top-54 left-45' onClick={handlePlay} style={{ "pointer-events": "all" }} />}
            {!characterPlay && <img src={AnimatedCharacter} className='absolute top-50 left-10' onClick={handlePlay} />}
>>>>>>> 6954c5f (Added story mode)
        </div>
    )
}
