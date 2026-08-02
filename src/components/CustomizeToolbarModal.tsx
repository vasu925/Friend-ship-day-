import React, { useState } from 'react';
import { Settings, RefreshCw, Sparkles, Heart, Check, X, Lock, Unlock, ShieldCheck, Share2, Copy } from 'lucide-react';
import { ScrapbookData } from '../types';
import { soundFx } from '../utils/audio';
import { encodeScrapbookData } from '../utils/storage';

interface CustomizeToolbarProps {
  data: ScrapbookData;
  onSaveData: (data: ScrapbookData) => void;
  onResetData: () => void;
}

export const CustomizeToolbarModal: React.FC<CustomizeToolbarProps> = ({
  data,
  onSaveData,
  onResetData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bestieName, setBestieName] = useState(data.bestieName);
  const [senderName, setSenderName] = useState(data.senderName);
  const [envelopeLetterText, setEnvelopeLetterText] = useState(data.envelopeLetterText);
  const [finalDiaryText, setFinalDiaryText] = useState(data.finalDiaryText);
  const [isLocked, setIsLocked] = useState(data.isLocked ?? false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const handleCopyShareLink = () => {
    const updatedData: ScrapbookData = {
      ...data,
      bestieName,
      senderName,
      envelopeLetterText,
      finalDiaryText,
      isLocked: true, // Auto-lock share link so recipient views safely
    };
    const encoded = encodeScrapbookData(updatedData);
    const shareUrl = `${window.location.origin}${window.location.pathname}#data=${encoded}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      soundFx.playPopSound();
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 3000);
    }).catch(() => {
      prompt('Copy your custom share link below:', shareUrl);
    });
  };

  const handleSave = () => {
    onSaveData({
      ...data,
      bestieName,
      senderName,
      envelopeLetterText,
      finalDiaryText,
      isLocked,
    });
    setIsOpen(false);
    soundFx.playPopSound();
  };

  const handleReset = () => {
    if (window.confirm('Reset all customized text and photos back to default?')) {
      onResetData();
      setIsOpen(false);
      soundFx.playPopSound();
    }
  };

  const handleToggleLock = () => {
    const nextLocked = !isLocked;
    setIsLocked(nextLocked);
    onSaveData({
      ...data,
      isLocked: nextLocked,
    });
    soundFx.playPopSound();
  };

  return (
    <>
      {/* Floating Customize / Settings Trigger Button */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            soundFx.playPopSound();
            setIsOpen(true);
          }}
          className="p-3 rounded-full glass-card text-pink-600 shadow-xl border-2 border-pink-200 hover:scale-110 active:scale-95 transition-transform flex items-center gap-2 font-fredoka text-xs font-bold bg-white/90"
          title="Customize Scrapbook"
        >
          <Settings className="w-5 h-5 text-pink-500" />
          <span className="hidden sm:inline">Settings</span>
        </button>

        <button
          onClick={handleToggleLock}
          className={`px-3 py-2 rounded-full shadow-lg border-2 font-fredoka text-xs font-extrabold flex items-center gap-1.5 transition-all ${
            isLocked
              ? 'bg-emerald-500 text-white border-emerald-300'
              : 'bg-amber-100 text-amber-800 border-amber-300'
          }`}
          title={isLocked ? "Website is Locked (Read-Only Mode)" : "Website is Unlocked (Editing Allowed)"}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              <span>Secured 🔒</span>
            </>
          ) : (
            <>
              <Unlock className="w-4 h-4" />
              <span>Editing 🔓</span>
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-pink-200 shadow-2xl relative animate-in zoom-in-95 font-fredoka">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-extrabold text-pink-600 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Scrapbook Security & Settings</span>
            </h3>

            <div className="bg-pink-50 p-3 rounded-2xl border border-pink-200 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-5 h-5 ${isLocked ? 'text-emerald-600' : 'text-amber-500'}`} />
                <div>
                  <p className="text-xs font-extrabold text-slate-800">
                    {isLocked ? 'Website Lock Active 🔒' : 'Editing Unlocked 🔓'}
                  </p>
                  <p className="text-[11px] text-slate-600 font-poppins">
                    {isLocked ? 'Letters & uploaded photos are protected from changes.' : 'Editing text & photos is allowed.'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleToggleLock}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shadow transition-transform ${
                  isLocked ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                }`}
              >
                {isLocked ? 'Unlock' : 'Lock Now'}
              </button>
            </div>

            <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bestie's Name
                </label>
                <input
                  type="text"
                  value={bestieName}
                  onChange={(e) => setBestieName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border-2 border-pink-200 text-sm font-poppins focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name (Sender)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border-2 border-pink-200 text-sm font-poppins focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Envelope Letter Text 💌
                </label>
                <textarea
                  value={envelopeLetterText}
                  onChange={(e) => setEnvelopeLetterText(e.target.value)}
                  rows={4}
                  className="w-full p-2.5 rounded-xl border-2 border-pink-200 text-xs font-poppins focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Final Diary Letter Text 📖
                </label>
                <textarea
                  value={finalDiaryText}
                  onChange={(e) => setFinalDiaryText(e.target.value)}
                  rows={4}
                  className="w-full p-2.5 rounded-xl border-2 border-pink-200 text-xs font-poppins focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleCopyShareLink}
                className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold rounded-xl text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedNotice ? 'Link Copied to Clipboard! 📋✨' : 'Copy Custom Share Link 🔗'}</span>
              </button>

              <button
                onClick={handleSave}
                className="w-full py-2 bg-pink-100 text-pink-700 font-bold rounded-xl text-xs hover:bg-pink-200 flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Local Settings</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full py-1.5 text-slate-400 hover:text-rose-500 font-bold rounded-xl text-[11px] transition-colors flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset All to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
