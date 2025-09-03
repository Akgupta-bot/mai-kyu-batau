import BasketBallImg from '/basketball-court.jpg'
import AnimatedCharacter from '/animated-character-unscreen.gif'
import AnimatedCharacterFixed from '/animated-character-unscreen-fixed.png'
import { useEffect, useState } from 'react'
import QuestionCard from '../components/story-mode/QuestionCard'
import client from '../../services/elevenLabs'
import LyffyAudio from '/luffy.mp3'

const SCRIPT = {
    'displayText': 'Let us start the scenario',
    'player1': 'Hey! how are you?',
    'player2': 'I am fine, what about you?'
}

export default function StoryMode() {
    const [characterPlay, setCharacterPlay] = useState(false);
    const [isGameStart, setIsGameStart] = useState(false);

    // Function to Start the Module
    function handlePlay() {
        setIsGameStart(true)

        // 1) Use the cached audio to generate sound using React Query
    }

    // Function to start Character Movement & Audio
    function handleCharacterPlay() {
        setCharacterPlay((play) => !play)
    }

    useEffect(() => {
        async function handleStop() {
            await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
                outputFormat: "mp3_44100_128",
                text: "The first move is what sets everything in motion.",
                modelId: "eleven_multilingual_v2"
            });
        }

        // 1) Fetch Storyline
        // 2) Generate audio based on Storyline
        // 3) Save it in state and use it ( React Query )

        setCharacterPlay((play) => !play)
    }, [])

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

                {isGameStart && <>{/* Left Character */}
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6">
                        {!characterPlay && (
                            <>
                                <p className="text-2xl text-black bg-white/60 px-3 py-1 rounded-lg">
                                    Hey there
                                </p>
                                <img
                                    src={AnimatedCharacter}
                                    className="w-125 cursor-pointer"
                                    onClick={handlePlay}
                                />
                            </>
                        )}

                        {characterPlay && (
                            <>
                                <img
                                    src={AnimatedCharacterFixed}
                                    className="w-50 cursor-pointer"
                                    onClick={handlePlay}
                                />
                            </>
                        )}
                    </div>

                    {/* Right Character */}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6">
                        {characterPlay && (
                            <>
                                <p className="text-2xl text-black bg-white/60 px-3 py-1 rounded-lg">
                                    Hey, how have you been?
                                </p>
                                <img
                                    src={AnimatedCharacter}
                                    className="w-125 cursor-pointer"
                                    onClick={handlePlay}
                                />
                            </>
                        )}

                        {!characterPlay && (
                            <>
                                <img
                                    src={AnimatedCharacterFixed}
                                    className="w-50 cursor-pointer"
                                    onClick={handlePlay}
                                />
                            </>
                        )}
                    </div></>}
            </div>
            <QuestionCard isGameStart={isGameStart} onHandlePlay={handlePlay} />
        </div>
    )
}
