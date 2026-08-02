import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, X, Gift, Star, Rose } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface SecretModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretEasterEggModal: React.FC<SecretModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundFx.playWinFanfare();
      confetti({
        particleCount: 200,
        spread: 110,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#fbbf24', '#e11d48', '#38bdf8', '#c084fc'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative max-w-lg w-full bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100 rounded-[2.5rem] p-8 text-center paper-shadow border-4 border-pink-300 overflow-hidden animate-in zoom-in-95">
        
        {/* Floating Sparkles & Roses background */}
        <div className="absolute top-4 left-4 text-3xl animate-bounce">🌹</div>
        <div className="absolute top-4 right-4 text-3xl animate-pulse">✨</div>
        <div className="absolute bottom-4 left-4 text-3xl animate-spin">🌟</div>
        <div className="absolute bottom-4 right-4 text-3xl animate-bounce">💖</div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playPopSound();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-pink-200/80 text-pink-700 hover:bg-pink-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 bg-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white animate-bounce-soft">
          <Gift className="w-10 h-10" />
        </div>

        <h2 className="text-3xl font-extrabold text-pink-600 font-baloo tracking-tight mb-3 flex items-center justify-center gap-2">
          <span>You found my secret</span>
          <span className="text-rose-500 animate-pulse">❤️</span>
        </h2>

        <p className="font-handwriting text-2xl font-bold text-slate-800 leading-relaxed mb-6">
          "Thank you for being one of the most precious people in my life. This little website was made just for you."
        </p>

        <div className="flex justify-center items-center gap-3 text-2xl mb-6">
          <span>🌹</span>
          <span>✨</span>
          <span>🌟</span>
          <span>💖</span>
          <span>🌸</span>
        </div>

        <button
          onClick={() => {
            soundFx.playPopSound();
            onClose();
          }}
          className="px-8 py-3 bg-pink-500 text-white font-extrabold rounded-full shadow-lg hover:bg-pink-600 hover:scale-105 transition-all font-fredoka"
        >
          Close Secret Surprise ✨
        </button>
      </div>
    </div>
  );
};
