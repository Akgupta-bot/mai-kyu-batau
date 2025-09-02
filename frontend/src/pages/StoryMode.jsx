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
        </div>
    )
}
