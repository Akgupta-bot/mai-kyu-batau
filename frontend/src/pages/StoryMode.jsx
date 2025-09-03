import BasketBallImg from '/basketball-court.jpg'
import AnimatedCharacter from '/animated-character-unscreen.gif'
import AnimatedCharacterFixed from '/animated-character-unscreen-fixed.png'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function StoryMode() {
    const [characterPlay, setCharacterPlay] = useState(false);

    function handlePlay() {
        console.log(characterPlay)
        setCharacterPlay((play) => !play)
    }

    function handleStop() { }
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

                {/* Left Character */}
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6">
                    {!characterPlay && (
                        <>
                            <p className="text-2xl text-black bg-white/60 px-3 py-1 rounded-lg">
                                Hey there
                            </p>
                            <img
                                src={AnimatedCharacter}
                                className="w-28 cursor-pointer"
                                onClick={handlePlay}
                            />
                        </>
                    )}

                    {characterPlay && (
                        <>
                            <img
                                src={AnimatedCharacterFixed}
                                className="w-28 cursor-pointer"
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
                                src={AnimatedCharacterFixed}
                                className="w-28 cursor-pointer"
                                onClick={handlePlay}
                            />
                        </>
                    )}

                    {!characterPlay && (
                        <>
                            <img
                                src={AnimatedCharacter}
                                className="w-28 cursor-pointer"
                                onClick={handlePlay}
                            />
                        </>
                    )}
                </div>
            </div>

            <Card className="w-[60%] h-[30%] shadow-2xl rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-200">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800 text-center">
                        What’s your favorite sport?
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl transition-all hover:scale-105 hover:border-blue-500 hover:text-blue-600"
                    >
                        Basketball
                    </Button>
                    <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl transition-all hover:scale-105 hover:border-green-500 hover:text-green-600"
                    >
                        Football
                    </Button>
                    <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl transition-all hover:scale-105 hover:border-red-500 hover:text-red-600"
                    >
                        Cricket
                    </Button>
                    <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl transition-all hover:scale-105 hover:border-purple-500 hover:text-purple-600"
                    >
                        Tennis
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
