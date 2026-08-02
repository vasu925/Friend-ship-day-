import React, { useState } from 'react';
import { Edit3, Check, Plus, Trash2, Heart, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Page4Props {
  labels: string[];
  isLocked?: boolean;
  onUpdateLabels: (labels: string[]) => void;
  onNext: () => void;
}

export const Page4_YouAreMy: React.FC<Page4Props> = ({
  labels,
  isLocked = false,
  onUpdateLabels,
  onNext,
}) => {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleStartEdit = (idx: number) => {
    setEditingIdx(idx);
    setEditValue(labels[idx]);
    soundFx.playPopSound();
  };

  const handleSaveEdit = (idx: number) => {
    if (editValue.trim()) {
      const updated = [...labels];
      updated[idx] = editValue.trim();
      onUpdateLabels(updated);
    }
    setEditingIdx(null);
    soundFx.playPopSound();
  };

  const handleRemoveTag = (idx: number) => {
    if (labels.length <= 1) return;
    const updated = labels.filter((_, i) => i !== idx);
    onUpdateLabels(updated);
    soundFx.playPopSound();
  };

  const handleAddTag = () => {
    if (newTagInput.trim()) {
      onUpdateLabels([...labels, newTagInput.trim()]);
      setNewTagInput('');
      setShowAddModal(false);
      soundFx.playPopSound();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 min-h-[85vh] flex flex-col justify-center items-center relative">
      {/* Corner Kitten Stickers */}
      <div className="absolute top-2 left-2 text-3xl sm:text-4xl animate-bounce">🐱</div>
      <div className="absolute top-2 right-2 text-3xl sm:text-4xl animate-pulse">😻</div>
      <div className="absolute bottom-2 left-2 text-3xl sm:text-4xl animate-float">😸</div>
      <div className="absolute bottom-2 right-2 text-3xl sm:text-4xl animate-bounce">😽</div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-600 font-baloo tracking-tight mb-6 text-center flex items-center justify-center gap-2">
        <span>YOU ARE MY</span>
        <span className="text-4xl text-rose-500 animate-pulse">❤️</span>
      </h1>

      <p className="text-xs sm:text-sm font-semibold text-pink-700 font-fredoka mb-6 text-center">
        {!isLocked ? 'Tap any label to edit or customize your bestie roles! ✨' : 'My Special Bestie Roles & Moments! ✨'}
      </p>

      {/* Mindmap / Connected Sticker Cloud Container */}
      <div className="w-full glass-card rounded-[2.5rem] p-6 sm:p-10 paper-shadow border-4 border-pink-200 relative min-h-[460px] flex items-center justify-center overflow-hidden">
        
        {/* Center Kitten Avatar */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-pink-300 via-rose-200 to-amber-200 p-2 shadow-2xl border-4 border-white flex items-center justify-center animate-float">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-5xl sm:text-6xl shadow-inner">
              🐱
            </div>
          </div>
          <span className="mt-2 bg-pink-500 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md font-fredoka flex items-center gap-1">
            <Heart className="w-3 h-3 fill-white" />
            <span>My Forever Bestie</span>
          </span>
        </div>

        {/* Floating Sticker Grid surrounding center kitten */}
        <div className="absolute inset-0 p-4 sm:p-8 flex flex-wrap items-center justify-between pointer-events-none">
          {/* Background Dotted Lines Effect */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            {labels.map((_, i) => {
              const angle = (i / labels.length) * 2 * Math.PI;
              const x2 = 50 + 38 * Math.cos(angle);
              const y2 = 50 + 38 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="#f472b6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            })}
          </svg>
        </div>

        {/* Interactive Sticker Tags Container */}
        <div className="w-full h-full relative z-30 flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-3xl">
          {labels.map((label, idx) => {
            const isEditingThis = !isLocked && editingIdx === idx;

            return (
              <div
                key={idx}
                className="group relative transition-all duration-300 hover:scale-108"
              >
                {isEditingThis ? (
                  <div className="flex items-center gap-1 bg-white p-1.5 rounded-full shadow-lg border-2 border-pink-400">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="px-2 py-0.5 text-xs sm:text-sm font-bold text-pink-700 font-fredoka focus:outline-none w-32"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEdit(idx)}
                      className="p-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => !isLocked && handleStartEdit(idx)}
                    className={`${
                      !isLocked ? 'cursor-pointer hover:bg-pink-50 hover:shadow-pink-200 hover:-translate-y-0.5' : 'cursor-default'
                    } px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 text-pink-700 font-extrabold text-xs sm:text-sm shadow-md border-2 border-pink-200/90 font-fredoka flex items-center gap-1.5 transition-all`}
                  >
                    <span className="text-pink-400">✨</span>
                    <span>{label}</span>
                    {!isLocked && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTag(idx);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity ml-1 p-0.5"
                        title="Remove label"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Add New Tag Button */}
          {!isLocked && (
            <button
              onClick={() => {
                soundFx.playPopSound();
                setShowAddModal(true);
              }}
              className="px-4 py-2 rounded-full bg-pink-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:bg-pink-600 active:scale-95 transition-all font-fredoka flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Label</span>
            </button>
          )}
        </div>
      </div>

      {/* Add New Tag Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-pink-200 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-extrabold text-pink-600 font-fredoka mb-3 flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Add Custom Role Label</span>
            </h3>
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              placeholder="e.g. Partner in Crime, Shopping Buddy..."
              className="w-full p-3 rounded-2xl border-2 border-pink-200 font-fredoka text-sm text-slate-700 focus:outline-none focus:border-pink-400 mb-4 bg-pink-50/50"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-slate-500 text-xs font-bold font-fredoka hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTag}
                className="px-5 py-2 rounded-xl bg-pink-500 text-white text-xs font-extrabold font-fredoka hover:bg-pink-600 shadow-md"
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="mt-8 flex justify-end w-full">
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
