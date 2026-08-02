import React, { useState } from 'react';
import { Mail, Edit3, Check, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Page6Props {
  letterText: string;
  isLocked?: boolean;
  onUpdateLetterText: (text: string) => void;
  onNext: () => void;
}

export const Page6_EnvelopeLetter: React.FC<Page6Props> = ({
  letterText,
  isLocked = false,
  onUpdateLetterText,
  onNext,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(letterText);

  const handleToggleEnvelope = () => {
    if (!isOpen) {
      soundFx.playEnvelopeOpenSound();
      setIsOpen(true);
    } else {
      soundFx.playPopSound();
      setIsOpen(false);
    }
  };

  const saveLetter = () => {
    onUpdateLetterText(editedText);
    setIsEditing(false);
    soundFx.playPopSound();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 min-h-[85vh] flex flex-col justify-center items-center">
      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-600 font-baloo tracking-tight mb-6 text-center">
        A Special Letter For You 💌
      </h1>

      <p className="text-xs sm:text-sm font-semibold text-pink-700 font-fredoka mb-8 text-center">
        {isOpen ? 'Tap letter to edit or close envelope' : 'Tap the envelope to unfold the secret letter ✨'}
      </p>

      {/* Envelope Container */}
      <div className="relative w-full max-w-md perspective-1000">
        
        {/* Closed / Interactive Envelope State */}
        {!isOpen && (
          <div
            onClick={handleToggleEnvelope}
            className="w-full h-64 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400 rounded-3xl paper-shadow border-4 border-white cursor-pointer relative overflow-hidden group hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center"
          >
            {/* Envelope V Flap */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-pink-200/90 clip-path-polygon border-b-2 border-white/80 shadow-md"></div>

            {/* Wax Seal Ribbon Badge */}
            <div className="z-10 w-20 h-20 rounded-full bg-rose-500 shadow-xl border-4 border-pink-100 flex items-center justify-center animate-bounce-soft group-hover:scale-110 transition-transform">
              <span className="text-3xl">🌸</span>
            </div>

            <p className="z-10 mt-4 text-xs font-extrabold text-white font-fredoka uppercase tracking-widest drop-shadow">
              Tap to Open Letter
            </p>

            {/* Corner Flower Decorations */}
            <div className="absolute bottom-2 left-3 text-2xl">🌷</div>
            <div className="absolute bottom-2 right-3 text-2xl">🎀</div>
          </div>
        )}

        {/* Opened & Unfolded Paper Letter State */}
        {isOpen && (
          <div className="w-full bg-amber-50/90 rounded-[2.5rem] p-6 sm:p-10 paper-shadow border-4 border-pink-200 relative animate-in slide-in-from-bottom-8 duration-700 bg-diary-lines">
            {/* Top Flowers & Ribbon Decoration Header */}
            <div className="flex items-center justify-between border-b-2 border-pink-200/80 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🌷</span>
                <span className="text-3xl">🎀</span>
              </div>

              <div className="flex items-center gap-2">
                {!isLocked && (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                    title="Edit letter text"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleToggleEnvelope}
                  className="px-3 py-1 bg-pink-200 text-pink-700 text-xs font-bold rounded-full font-fredoka"
                >
                  Fold Envelope
                </button>
              </div>
            </div>

            {/* Editable Letter Body */}
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-pink-300 font-handwriting text-2xl text-slate-800 focus:outline-none bg-white leading-relaxed"
                  rows={8}
                />
                <button
                  onClick={saveLetter}
                  className="px-5 py-2 bg-pink-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-1 shadow-md hover:bg-pink-600 font-fredoka"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Letter</span>
                </button>
              </div>
            ) : (
              <div className="whitespace-pre-line font-handwriting text-2xl sm:text-3xl text-slate-800 leading-relaxed font-bold tracking-wide">
                {letterText}
              </div>
            )}

            {/* Letter Footer Stamp & Sign */}
            <div className="mt-8 flex items-center justify-between pt-4 border-t-2 border-pink-200/80">
              <span className="text-3xl">🌺</span>
              <span className="font-handwriting text-2xl font-extrabold text-pink-600 flex items-center gap-1">
                <span>With Endless Love</span>
                <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      <div className="mt-10 flex justify-end w-full max-w-md">
        <button
          onClick={() => {
            soundFx.playPopSound();
            onNext();
          }}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold rounded-full shadow-lg hover:shadow-pink-300/50 hover:scale-105 active:scale-95 transition-all font-fredoka text-base flex items-center gap-2"
        >
          <span>Next</span>
          <span>➜</span>
        </button>
      </div>
    </div>
  );
};
