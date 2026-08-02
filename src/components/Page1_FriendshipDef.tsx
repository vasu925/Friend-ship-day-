import React, { useRef, useState } from 'react';
import { Camera, Edit3, Check, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Page1Props {
  photoUrl: string;
  definition: string;
  isLocked?: boolean;
  onUpdatePhoto: (url: string) => void;
  onUpdateDefinition: (def: string) => void;
  onNext: () => void;
}

export const Page1_FriendshipDef: React.FC<Page1Props> = ({
  photoUrl,
  definition,
  isLocked = false,
  onUpdatePhoto,
  onUpdateDefinition,
  onNext,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDef, setEditedDef] = useState(definition);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdatePhoto(event.target.result as string);
          soundFx.playPopSound();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDefinition = () => {
    onUpdateDefinition(editedDef);
    setIsEditing(false);
    soundFx.playPopSound();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col justify-center">
      {/* Heading */}
      <div className="text-center mb-8 relative">
        <div className="inline-block relative">
          <span className="absolute -top-6 -left-8 text-3xl animate-bounce">🎀</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-600 font-baloo tracking-tight drop-shadow-sm">
            Happy Friendship Day ❤️
          </h1>
          <span className="absolute -bottom-4 -right-8 text-3xl animate-spin">✨</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
        {/* Corner Kitten Stickers */}
        <div className="absolute -top-4 -left-4 text-3xl pointer-events-none z-10 animate-pulse">🐱</div>
        <div className="absolute -top-4 -right-4 text-3xl pointer-events-none z-10 animate-bounce">🐾</div>

        {/* Left Side: Vintage Oval Photo Frame */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative group">
            {/* Vintage Ribbon bow */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 text-4xl drop-shadow-md">
              🎀
            </div>

            {/* Vintage Oval Frame border */}
            <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-[50%] p-4 bg-gradient-to-tr from-amber-200 via-pink-200 to-amber-100 shadow-2xl border-8 border-pink-300/80 flex items-center justify-center relative overflow-hidden group-hover:scale-102 transition-transform duration-300">
              {/* Inner Oval Ring */}
              <div className="w-full h-full rounded-[50%] overflow-hidden border-4 border-amber-300/90 relative shadow-inner bg-pink-100 flex items-center justify-center">
                <img
                  src={photoUrl}
                  alt="Friend Bestie"
                  className="w-full h-full object-cover rounded-[50%] select-none pointer-events-auto"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay to upload */}
                {!isLocked && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-pink-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white font-fredoka font-bold text-sm gap-1"
                  >
                    <Camera className="w-8 h-8 text-white animate-bounce" />
                    <span>Upload Bestie's Photo</span>
                  </button>
                )}
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {!isLocked && (
            <p className="mt-3 text-xs font-semibold text-pink-500 font-fredoka flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" />
              <span>Tap photo to change image</span>
            </p>
          )}
        </div>

        {/* Right Side: Dictionary Definition Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 paper-shadow border-2 border-pink-200 relative bg-amber-50/70">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-extrabold text-slate-800 font-poppins lowercase tracking-wide">
              friends
            </h2>
            {!isLocked && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-1.5 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                title="Edit definition"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="text-sm font-semibold text-pink-600 font-poppins italic mb-4">
            [friend] • noun
          </p>

          <hr className="border-pink-200/80 mb-4" />

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editedDef}
                onChange={(e) => setEditedDef(e.target.value)}
                className="w-full p-3 rounded-2xl border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-poppins text-sm text-slate-700 bg-white"
                rows={5}
              />
              <button
                onClick={saveDefinition}
                className="px-4 py-2 bg-pink-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 hover:bg-pink-600 transition-colors shadow-sm font-fredoka"
              >
                <Check className="w-4 h-4" />
                <span>Save Definition</span>
              </button>
            </div>
          ) : (
            <p className="text-slate-700 leading-relaxed font-poppins text-sm sm:text-base">
              {definition}
            </p>
          )}

          {/* Kitten sticker corner */}
          <div className="mt-6 flex items-center justify-between pt-2 border-t border-pink-100">
            <span className="text-xs font-bold text-pink-400 font-fredoka flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-400" />
              <span>Official Dictionary Entry</span>
            </span>
            <span className="text-2xl">🐱</span>
          </div>
        </div>
      </div>

      {/* Animated Arrow on the right saying: Next ➜ */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={() => {
            soundFx.playPopSound();
            onNext();
          }}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold rounded-full shadow-lg hover:shadow-pink-300/50 hover:scale-105 active:scale-95 transition-all font-fredoka text-base flex items-center gap-2 animate-bounce-soft"
        >
          <span>Next</span>
          <span className="text-xl">➜</span>
        </button>
      </div>
    </div>
  );
};
