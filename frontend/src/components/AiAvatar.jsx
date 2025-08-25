import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import avatarGif from '../assets/talking green man.gif';

const AiAvatar = () => {
  const [isSpeaking, setIsSpeaking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
  
    <div className="w-44 h-24 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
      {isSpeaking ? (
        <DotLottieReact
          src="https://lottie.host/898a8761-b423-4876-95f2-a2791626e271/7f2u233s6n.json"
          loop
          autoplay
        />
      ) : (
        <img 
          src={avatarGif} 
          alt="AI Coach Avatar" 
          className="w-full h-full object-cover" 
        />
      )}
    </div>
  );
};

export default AiAvatar;