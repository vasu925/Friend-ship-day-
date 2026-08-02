import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Edit3, Check, Sparkles, Flower, Music } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Page9Props {
  finalDiaryText: string;
  isLocked?: boolean;
  onUpdateFinalDiaryText: (text: string) => void;
  onRestart: () => void;
}

export const Page9_FinalDiaryLetter: React.FC<Page9Props> = ({
  finalDiaryText,
  isLocked = false,
  onUpdateFinalDiaryText,
  onRestart,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(finalDiaryText);

  useEffect(() => {
    // Grand finale confetti & sound
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fbbf24', '#38bdf8', '#a78bfa', '#ec4899', '#f43f5e'],
    });
    soundFx.playWinFanfare();
  }, []);

  const saveText = () => {
    onUpdateFinalDiaryText(editedText);
    setIsEditing(false);
    soundFx.playPopSound();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 min-h-[85vh] flex flex-col justify-center items-center relative">
      
      {/* Floating Flower Petals / Heart Rain Animation Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float opacity-80"
            style={{
              left: `${(i * 7) % 95}%`,
              top: `${(i * 11) % 90}%`,
              animationDuration: `${4 + (i % 5)}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {i % 2 === 0 ? '🌸' : '💖'}
          </div>
        ))}
      </div>

      {/* Diary Notebook Frame Container */}
      <div className="w-full bg-[#fdfbf7] rounded-[2.5rem] p-6 sm:p-12 paper-shadow border-8 border-pink-200 relative z-10 bg-diary-lines overflow-hidden">
        
        {/* Left Spiral Notebook Ring Bindings */}
        <div className="absolute top-0 bottom-0 left-2 w-6 flex flex-col justify-around py-6 pointer-events-none z-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-3 bg-slate-300 rounded-full shadow-inner border border-slate-400 -ml-1"
            ></div>
          ))}
        </div>

        <div className="pl-6 sm:pl-8">
          {/* Header Decorations */}
          <div className="flex items-center justify-between border-b-2 border-pink-200 pb-4 mb-6">
            <div className="flex items-center gap-2 text-3xl">
              <span>🌷</span>
              <span>🦋</span>
              <span>🎀</span>
              <span>🌸</span>
            </div>

            {!isLocked && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                title="Edit diary entry"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Diary Entry Content */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-pink-300 font-handwriting text-2xl text-slate-800 focus:outline-none bg-white leading-relaxed"
                rows={8}
              />
              <button
                onClick={saveText}
                className="px-5 py-2 bg-pink-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-1 shadow-md hover:bg-pink-600 font-fredoka"
              >
                <Check className="w-4 h-4" />
                <span>Save Diary Paragraph</span>
              </button>
            </div>
          ) : (
            <p className="font-handwriting text-2xl sm:text-3xl text-slate-800 leading-relaxed font-bold tracking-wide mb-8">
              "{finalDiaryText}"
            </p>
          )}

          {/* Bottom Banner */}
          <div className="mt-8 pt-6 border-t-2 border-pink-200/80 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-600 font-pacifico tracking-wide mb-2 flex items-center justify-center gap-2">
              <span>Happy Friendship Day</span>
              <Heart className="w-7 h-7 fill-pink-500 text-pink-500 animate-pulse" />
            </h2>
            <p className="text-xs font-semibold text-pink-400 font-fredoka">
              Forever & Always • Best Friends For Life ✨
            </p>
          </div>
        </div>
      </div>

      {/* Restart / Return to Beginning Button */}
      <div className="mt-8 flex justify-center z-20">
        <button
          onClick={() => {
            soundFx.playPopSound();
            onRestart();
          }}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold rounded-full shadow-lg hover:shadow-pink-300/50 hover:scale-105 active:scale-95 transition-all font-fredoka text-base flex items-center gap-2"
        >
          <span>Read Story Again 📖</span>
        </button>
      </div>
    </div>
  );
};
