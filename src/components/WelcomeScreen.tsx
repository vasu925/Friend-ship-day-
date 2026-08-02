import React, { useState } from 'react';
import { Sparkles, Mail, Heart, Bell } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleTapEnvelope = () => {
    soundFx.playEnvelopeOpenSound();
    soundFx.startBackgroundMusic();
    setIsOpening(true);

    setTimeout(() => {
      onStart();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-pink-100/90 via-pink-200/95 to-rose-100/90 backdrop-blur-md">
      <div
        className={`w-full max-w-sm glass-card rounded-[2.5rem] p-6 text-center paper-shadow border-4 border-pink-200/80 relative overflow-hidden transition-all duration-700 ${
          isOpening ? 'scale-110 opacity-0' : 'animate-bounce-soft'
        }`}
      >
        {/* Top Phone Speaker / Notch line */}
        <div className="w-20 h-1.5 bg-pink-200 rounded-full mx-auto mb-5"></div>

        {/* Notification Bell Badge */}
        <div className="inline-flex items-center gap-1.5 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm mb-4 animate-pulse font-fredoka">
          <Bell className="w-3.5 h-3.5" />
          <span>New Surprise Message!</span>
        </div>

        {/* Notification Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-600 mb-6 font-fredoka tracking-tight drop-shadow-sm">
          You have a notification! 💌
        </h1>

        {/* Cute Phone Illustration with Floating Envelope */}
        <div
          onClick={handleTapEnvelope}
          className="relative mx-auto w-48 h-56 bg-gradient-to-b from-pink-300 to-rose-300 rounded-[2rem] p-3 shadow-inner border-4 border-white cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center"
        >
          {/* Phone Screen background */}
          <div className="w-full h-full bg-pink-50 rounded-[1.5rem] p-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Sparkle background dots */}
            <div className="absolute top-2 left-3 text-pink-300 text-xs">✨</div>
            <div className="absolute top-4 right-3 text-pink-400 text-xs">🌸</div>
            <div className="absolute bottom-3 left-4 text-pink-300 text-xs">💖</div>

            {/* Bouncing Envelope */}
            <div className="relative group-hover:animate-bounce transition-transform">
              <div className="w-20 h-16 bg-pink-400 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white relative overflow-hidden">
                <div className="absolute inset-0 bg-pink-300/40 clip-path-polygon"></div>
                <Mail className="w-9 h-9 text-white animate-pulse" />
                <div className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-1 shadow-sm">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 text-xl animate-spin">
                ✨
              </div>
            </div>

            {/* Cute Kitten Sticker in Phone */}
            <div className="absolute bottom-1 right-2 text-2xl">🐱</div>
          </div>
        </div>

        {/* Prompt Text */}
        <button
          onClick={handleTapEnvelope}
          className="mt-6 w-full py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold rounded-2xl shadow-md hover:shadow-pink-300/50 hover:scale-[1.02] active:scale-95 transition-all font-fredoka text-base flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Open Scrapbook 💖</span>
          <Sparkles className="w-4 h-4 text-white" />
        </button>

        {/* Bottom Home Indicator Line */}
        <div className="w-28 h-1 bg-pink-300 rounded-full mx-auto mt-6"></div>
      </div>
    </div>
  );
};
