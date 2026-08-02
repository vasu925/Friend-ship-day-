import React, { useState, useEffect } from 'react';
import { Award, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Page2Props {
  onReveal: () => void;
}

export const Page2_BestieAwardLoading: React.FC<Page2Props> = ({ onReveal }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setProgress(0);
    setIsFinished(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFinished(true);
          soundFx.playWinFanfare();
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        soundFx.playHeartCatchSound();
        return next > 100 ? 100 : next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-12 min-h-[75vh] flex flex-col items-center justify-center text-center">
      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-600 font-baloo tracking-tight mb-8 flex items-center justify-center gap-3">
        <span>Lifetime Bestie Award</span>
        <span className="text-4xl animate-bounce">🏆</span>
      </h1>

      {/* Cute Kitten Avatar with Speech Bubble */}
      <div className="relative mb-8">
        {/* Speech Bubble */}
        <div className="relative bg-white border-2 border-pink-300 rounded-2xl px-5 py-3 shadow-md mb-4 inline-block animate-bounce-soft">
          <p className="text-sm font-extrabold text-pink-600 font-fredoka flex items-center gap-1.5">
            <span>Yes! You deserve this ❤️</span>
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-300" />
          </p>
          {/* Speech tail */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-pink-300"></div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-white"></div>
        </div>

        {/* Cute Kitten graphic */}
        <div className="text-6xl drop-shadow-md">🐱</div>
      </div>

      {/* Pixel / Cute Pastel Loading Bar Container */}
      <div className="w-full bg-white rounded-3xl p-6 paper-shadow border-4 border-pink-200/90 relative overflow-hidden mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-pink-600 mb-3 font-fredoka">
          <span>Calculating Bestie Score...</span>
          <span>{progress}%</span>
        </div>

        {/* Outer Bar */}
        <div className="w-full h-8 bg-pink-100 rounded-2xl p-1 border-2 border-pink-300/80 shadow-inner relative overflow-hidden">
          {/* Animated Fill Bar */}
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 rounded-xl transition-all duration-300 relative shadow-sm"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-xl"></div>
          </div>
        </div>

        <p className="text-xs font-medium text-slate-500 font-poppins mt-3">
          {progress < 40 && 'Analyzing endless memories & laughter... 💖'}
          {progress >= 40 && progress < 80 && 'Measuring 100% loyalty & secret-keeping... ✨'}
          {progress >= 80 && progress < 100 && 'Finalizing gold tier certificate... 🏅'}
          {progress === 100 && 'Award verified! You are officially the best! 🎉'}
        </p>
      </div>

      {/* Reveal Award Glowing Button */}
      {isFinished && (
        <button
          onClick={() => {
            soundFx.playPopSound();
            onReveal();
          }}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-extrabold rounded-full text-lg shadow-xl hover:shadow-pink-400/60 hover:scale-108 active:scale-95 transition-all font-fredoka flex items-center gap-2.5 animate-glow animate-bounce-soft"
        >
          <Award className="w-6 h-6 text-amber-200" />
          <span>Reveal Award</span>
          <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
        </button>
      )}
    </div>
  );
};
