import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onTitleClick: () => void;
  unlockedMaxPage: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onTitleClick,
  unlockedMaxPage,
}) => {
  const [showJumpMenu, setShowJumpMenu] = useState(false);

  const handlePrev = () => {
    if (currentPage > 1) {
      soundFx.playPopSound();
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && currentPage <= unlockedMaxPage) {
      soundFx.playPopSound();
      onPageChange(currentPage + 1);
    }
  };

  const pageNames = [
    '1. Friendship Defined',
    '2. Bestie Award Meter',
    '3. Lifetime Certificate',
    '4. You Are My...',
    '5. Moments Gallery',
    '6. Secret Letter',
    '7. Catch Hearts Game',
    '8. Forever Question',
    '9. Final Diary Entry',
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-3 py-2 flex items-center justify-between pointer-events-none">
      {/* Title & Page Jump Tracker */}
      <div className="pointer-events-auto flex items-center gap-2 glass-card rounded-full px-3.5 py-1.5 shadow-md">
        <button
          onClick={() => {
            soundFx.playPopSound();
            onTitleClick();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-pink-600 hover:text-pink-700 transition-colors font-fredoka group"
          title="Tap 5 times for a secret surprise! 💌"
        >
          <Heart className="w-4 h-4 text-pink-500 fill-pink-400 animate-pulse group-hover:scale-110 transition-transform" />
          <span>Happy Friendship Day ❤️</span>
        </button>

        <span className="text-pink-300">|</span>

        <button
          onClick={() => {
            soundFx.playPopSound();
            setShowJumpMenu(!showJumpMenu);
          }}
          className="text-xs font-semibold text-slate-600 hover:text-pink-600 flex items-center gap-1 font-fredoka bg-pink-100/60 px-2 py-0.5 rounded-full"
        >
          <BookOpen className="w-3.5 h-3.5 text-pink-500" />
          <span>Page {currentPage}/{totalPages}</span>
        </button>
      </div>

      {/* Jump Menu Dropdown */}
      {showJumpMenu && (
        <div className="pointer-events-auto absolute top-12 left-4 z-50 glass-card rounded-2xl p-3 shadow-xl border border-pink-200 w-64 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between text-xs font-bold text-pink-600 mb-2 px-1 font-fredoka border-b border-pink-100 pb-1.5">
            <span>Jump to Story Chapter 📖</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {pageNames.map((name, idx) => {
              const pageNum = idx + 1;
              const isUnlocked = pageNum <= unlockedMaxPage;
              return (
                <button
                  key={pageNum}
                  disabled={!isUnlocked}
                  onClick={() => {
                    soundFx.playPopSound();
                    onPageChange(pageNum);
                    setShowJumpMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between font-poppins ${
                    pageNum === currentPage
                      ? 'bg-pink-500 text-white shadow-sm'
                      : isUnlocked
                      ? 'hover:bg-pink-100 text-slate-700'
                      : 'text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <span>{name}</span>
                  {!isUnlocked && <span className="text-[10px]">🔒</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Prev / Next controls */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage <= 1}
          className={`p-2 rounded-full glass-card text-pink-600 shadow-md transition-all ${
            currentPage <= 1
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-pink-100 active:scale-90 hover:scale-105'
          }`}
          title="Previous Page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages || currentPage > unlockedMaxPage}
          className={`px-3 py-1.5 rounded-full glass-card text-pink-600 font-extrabold shadow-md flex items-center gap-1 transition-all text-xs sm:text-sm font-fredoka ${
            currentPage >= totalPages || currentPage > unlockedMaxPage
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-pink-500 hover:text-white active:scale-95 animate-pulse'
          }`}
          title="Next Page"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
