import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Edit3, Check, Sparkles, Ribbon, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Page3Props {
  bestieName: string;
  awardMessage: string;
  isLocked?: boolean;
  onUpdateName: (name: string) => void;
  onUpdateMessage: (msg: string) => void;
  onNext: () => void;
}

export const Page3_CertificateAward: React.FC<Page3Props> = ({
  bestieName,
  awardMessage,
  isLocked = false,
  onUpdateName,
  onUpdateMessage,
  onNext,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingMsg, setIsEditingMsg] = useState(false);
  const [name, setName] = useState(bestieName);
  const [message, setMessage] = useState(awardMessage);

  useEffect(() => {
    // Trigger confetti explosion on view
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#38bdf8', '#a78bfa', '#ec4899'],
    });
  }, []);

  const saveName = () => {
    onUpdateName(name);
    setIsEditingName(false);
    soundFx.playPopSound();
  };

  const saveMessage = () => {
    onUpdateMessage(message);
    setIsEditingMsg(false);
    soundFx.playPopSound();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col justify-center items-center">
      {/* Sparkles background effect */}
      <div className="absolute top-10 left-10 text-2xl animate-spin text-amber-400">✨</div>
      <div className="absolute top-12 right-12 text-2xl animate-pulse text-amber-400">🌟</div>

      {/* Certificate Frame Container */}
      <div className="w-full bg-gradient-to-br from-amber-50 via-white to-pink-50 rounded-[2.5rem] p-6 sm:p-10 paper-shadow border-8 border-amber-300/80 relative text-center overflow-hidden">
        {/* Double Inner Ornamental Border */}
        <div className="border-4 border-double border-pink-300/80 rounded-[2rem] p-6 sm:p-8 relative">
          
          {/* Certificate Corner Ribbons */}
          <div className="absolute -top-3 -left-3 text-3xl">🎀</div>
          <div className="absolute -top-3 -right-3 text-3xl">🎀</div>
          <div className="absolute -bottom-3 -left-3 text-3xl">🎀</div>
          <div className="absolute -bottom-3 -right-3 text-3xl">🎀</div>

          {/* Certificate Top Header */}
          <div className="flex justify-center items-center gap-2 mb-2 text-amber-600 font-fredoka text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>Official Friendship Honor</span>
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-700 font-pacifico mb-3 tracking-wide drop-shadow-sm">
            Lifetime Bestie Award
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-slate-600 font-poppins tracking-wider uppercase mb-6">
            This award is proudly presented to
          </p>

          {/* Recipient Name Field */}
          <div className="my-4 relative inline-block max-w-full">
            {!isLocked && isEditingName ? (
              <div className="flex items-center gap-2 justify-center">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-2xl sm:text-4xl font-extrabold text-pink-600 font-baloo border-b-2 border-pink-400 focus:outline-none text-center bg-transparent px-2"
                />
                <button
                  onClick={saveName}
                  className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow-md"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => !isLocked && setIsEditingName(true)}
                className={`inline-flex items-center gap-2 px-6 py-2 rounded-2xl border-b-4 border-pink-300 ${
                  !isLocked ? 'group cursor-pointer hover:bg-pink-100/50 transition-colors' : ''
                }`}
                title={!isLocked ? "Click to edit name" : undefined}
              >
                <span className="text-2xl sm:text-4xl font-extrabold text-pink-600 font-baloo tracking-tight">
                  {bestieName}
                </span>
                {!isLocked && (
                  <Edit3 className="w-5 h-5 text-pink-400 group-hover:text-pink-600 transition-colors" />
                )}
              </div>
            )}
          </div>

          {/* Appreciation Message */}
          <div className="mt-6 max-w-lg mx-auto relative">
            {!isLocked && isEditingMsg ? (
              <div className="space-y-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-pink-300 font-poppins text-xs sm:text-sm text-slate-700 focus:outline-none bg-white"
                  rows={3}
                />
                <button
                  onClick={saveMessage}
                  className="px-4 py-1.5 bg-pink-500 text-white font-bold rounded-lg text-xs flex items-center gap-1 mx-auto"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Message</span>
                </button>
              </div>
            ) : (
              <div
                onClick={() => !isLocked && setIsEditingMsg(true)}
                className={`p-3 rounded-xl ${
                  !isLocked ? 'group cursor-pointer hover:bg-amber-100/40 transition-colors' : ''
                }`}
                title={!isLocked ? "Click to edit appreciation message" : undefined}
              >
                <p className="text-slate-700 font-poppins text-xs sm:text-base leading-relaxed italic">
                  "{awardMessage}"
                </p>
                {!isLocked && (
                  <span className="text-[10px] text-pink-400 font-bold font-fredoka opacity-0 group-hover:opacity-100 transition-opacity">
                    ✏️ Edit message
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Golden Ribbon Badge */}
          <div className="mt-8 flex justify-center items-center">
            <div className="relative group hover:scale-110 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <Award className="w-10 h-10 text-amber-800" />
              </div>
              {/* Ribbon tails */}
              <div className="absolute -bottom-4 left-3 w-4 h-8 bg-amber-500 -rotate-12 rounded-b-md shadow-md"></div>
              <div className="absolute -bottom-4 right-3 w-4 h-8 bg-amber-500 rotate-12 rounded-b-md shadow-md"></div>
            </div>
          </div>

          <p className="mt-6 text-[11px] font-extrabold text-amber-800/80 font-fredoka uppercase tracking-widest">
            Verified Lifetime Seal Of Friendship • 100% Authentic ❤️
          </p>
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-8">
        <button
          onClick={() => {
            soundFx.playPopSound();
            onNext();
          }}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold rounded-full shadow-lg hover:shadow-pink-300/50 hover:scale-105 active:scale-95 transition-all font-fredoka text-base flex items-center gap-2"
        >
          <span>Next Page</span>
          <span>➜</span>
        </button>
      </div>
    </div>
  );
};
