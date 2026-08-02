import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw, Smile, Frown } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Page8Props {
  onNext: () => void;
}

export const Page8_QuestionPage: React.FC<Page8Props> = ({ onNext }) => {
  const [answerState, setAnswerState] = useState<'question' | 'yes' | 'no'>('question');
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [runCount, setRunCount] = useState(0);

  const handleYes = () => {
    soundFx.playWinFanfare();
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fbbf24', '#38bdf8', '#a78bfa', '#ec4899', '#f43f5e'],
    });
    setAnswerState('yes');
  };

  const handleHoverNo = () => {
    soundFx.playPopSound();
    // Run away randomly!
    const randomX = (Math.random() - 0.5) * 220; // -110px to +110px
    const randomY = (Math.random() - 0.5) * 160; // -80px to +80px
    setNoPos({ x: randomX, y: randomY });
    setRunCount((c) => c + 1);
  };

  const handleClickNo = () => {
    if (runCount < 3) {
      handleHoverNo();
    } else {
      soundFx.playPopSound();
      setAnswerState('no');
    }
  };

  const handleResetAnswer = () => {
    soundFx.playPopSound();
    setAnswerState('question');
    setNoPos({ x: 0, y: 0 });
    setRunCount(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 min-h-[85vh] flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* Question State */}
      {answerState === 'question' && (
        <div className="w-full glass-card rounded-[2.5rem] p-8 sm:p-12 paper-shadow border-4 border-pink-300 text-center relative animate-in zoom-in-95">
          <div className="text-6xl mb-4 animate-bounce">🥺👉👈</div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-pink-600 font-baloo tracking-tight mb-8 leading-snug">
            Will you stay with me forever as my best friend? ❤️
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[100px] relative">
            {/* YES Button */}
            <button
              onClick={handleYes}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-extrabold rounded-full text-lg shadow-xl hover:shadow-pink-300/60 hover:scale-110 active:scale-95 transition-all font-fredoka flex items-center gap-2 animate-glow z-20"
            >
              <Heart className="w-6 h-6 fill-white text-white" />
              <span>YES ❤️</span>
            </button>

            {/* Playful Running Away NO Button */}
            <div
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                transition: 'transform 0.2s ease-out',
              }}
              onMouseEnter={handleHoverNo}
              onTouchStart={handleHoverNo}
              onClick={handleClickNo}
              className="inline-block"
            >
              <button className="px-8 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-full text-base shadow-md font-fredoka flex items-center gap-2">
                <span>NO 💔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YES Celebration State */}
      {answerState === 'yes' && (
        <div className="w-full bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100 rounded-[2.5rem] p-8 sm:p-12 paper-shadow border-4 border-pink-300 text-center animate-in zoom-in-95">
          {/* Happy Anime Celebration Sticker */}
          <div className="text-7xl mb-4 animate-bounce">🎉😻🎉</div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-600 font-baloo tracking-tight mb-4">
            I knew you would say YES ❤️
          </h1>

          <p className="text-base sm:text-lg font-bold text-slate-700 font-poppins mb-8 leading-relaxed">
            Forever and always! Our friendship bond is locked forever! 🔒✨
          </p>

          <button
            onClick={() => {
              soundFx.playPopSound();
              onNext();
            }}
            className="px-8 py-3.5 bg-pink-500 text-white font-extrabold rounded-full text-base shadow-lg hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all font-fredoka inline-flex items-center gap-2"
          >
            <span>Proceed to Final Diary Page</span>
            <span>➜</span>
          </button>
        </div>
      )}

      {/* NO Sad State */}
      {answerState === 'no' && (
        <div className="w-full bg-slate-50 rounded-[2.5rem] p-8 sm:p-12 paper-shadow border-4 border-slate-300 text-center animate-in fade-in">
          <div className="text-7xl mb-4 animate-pulse">😿💔</div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-baloo mb-4">
            Please don't leave... 🥺
          </h2>

          <p className="text-sm sm:text-base font-semibold text-slate-600 font-poppins mb-6 leading-relaxed">
            Our friendship means everything to me. Please think once more! ❤️
          </p>

          <button
            onClick={handleResetAnswer}
            className="px-8 py-3.5 bg-pink-500 text-white font-extrabold rounded-full text-base shadow-lg hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all font-fredoka inline-flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>I'll Answer Again ❤️</span>
          </button>
        </div>
      )}
    </div>
  );
};
