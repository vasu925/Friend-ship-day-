import React, { useState, useRef } from 'react';
import { PhotoItem } from '../types';
import { Search, ZoomIn, ChevronLeft, ChevronRight, X, Heart, Sparkles, Upload } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Page5Props {
  photos: PhotoItem[];
  isLocked?: boolean;
  onUpdatePhotos?: (photos: PhotoItem[]) => void;
  onNext: () => void;
}

export const Page5_MomentsOfUs: React.FC<Page5Props> = ({
  photos,
  isLocked = false,
  onUpdatePhotos,
  onNext,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Moments of us ❤️');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);

  const tabs = ['All', 'Images', 'Memories', 'Videos', 'News', 'Maps'];

  const filteredPhotos = photos.filter((p) => {
    if (selectedTab === 'All') return true;
    return p.tag === selectedTab || p.tag === 'All' || !p.tag;
  });

  const compressImageFile = (file: File, maxWidth = 1000, quality = 0.82): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          } else {
            resolve((e.target?.result as string) || '');
          }
        };
        img.onerror = () => resolve((e.target?.result as string) || '');
        img.src = (e.target?.result as string) || '';
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const handleUploadNewPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onUpdatePhotos) {
      const files: File[] = Array.from(e.target.files);
      const newItems: PhotoItem[] = [];

      for (const file of files) {
        const compressedUrl = await compressImageFile(file);
        if (compressedUrl) {
          newItems.push({
            id: Date.now().toString() + Math.random().toString().slice(2, 6),
            url: compressedUrl,
            caption: 'Special Memory ✨',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            tag: 'Memories',
          });
        }
      }

      if (newItems.length > 0) {
        onUpdatePhotos([...photos, ...newItems]);
        soundFx.playPopSound();
      }
    }
  };

  const handleReplacePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (replaceTargetId && e.target.files && e.target.files[0] && onUpdatePhotos) {
      const file: File = e.target.files[0];
      const compressedUrl = await compressImageFile(file);
      if (compressedUrl) {
        const updated = photos.map((p) =>
          p.id === replaceTargetId ? { ...p, url: compressedUrl } : p
        );
        onUpdatePhotos(updated);
        soundFx.playPopSound();
        setReplaceTargetId(null);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 min-h-[85vh] flex flex-col justify-center">
      {/* Heading */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-600 font-baloo tracking-tight mb-6 text-center">
        Moments Of Us ❤️
      </h1>

      {/* Google Search Style Header Bar */}
      <div className="glass-card rounded-3xl p-4 sm:p-6 paper-shadow border-2 border-pink-200 mb-8 bg-white/90">
        <div className="flex items-center gap-3 bg-pink-50/80 rounded-full px-5 py-3 border-2 border-pink-200 shadow-inner max-w-2xl mx-auto mb-4">
          <Search className="w-5 h-5 text-pink-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent font-poppins font-semibold text-slate-700 text-sm sm:text-base focus:outline-none"
          />
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
        </div>

        {/* Search Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                soundFx.playPopSound();
                setSelectedTab(tab);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-fredoka transition-all ${
                selectedTab === tab
                  ? 'bg-pink-500 text-white shadow-md scale-105'
                  : 'bg-pink-100/60 text-pink-700 hover:bg-pink-200/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Stats Bar & Upload Button */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6 px-2">
        <p className="text-xs sm:text-sm font-bold text-pink-700 font-fredoka flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-300" />
          <span>Showing {filteredPhotos.length} Precious Moments</span>
        </p>

        {!isLocked && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-md transition-all font-fredoka flex items-center gap-1.5 active:scale-95"
            title="Upload new photos to memories"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photos 📸</span>
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUploadNewPhotos}
          accept="image/*"
          multiple
          className="hidden"
        />

        <input
          type="file"
          ref={replaceInputRef}
          onChange={handleReplacePhoto}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Masonry / Polaroid Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="break-inside-avoid group bg-white p-3 sm:p-4 rounded-2xl polaroid-shadow border border-pink-100 relative transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl"
          >
            {/* Washi Tape Sticker on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/80 rounded-sm rotate-2 border border-pink-300/60 z-10 shadow-sm pointer-events-none"></div>

            {/* Photo Container */}
            <div
              onClick={() => {
                soundFx.playPopSound();
                if (!isLocked) {
                  setReplaceTargetId(photo.id);
                  if (replaceInputRef.current) {
                    replaceInputRef.current.value = '';
                    replaceInputRef.current.click();
                  }
                } else {
                  setActiveLightboxIndex(index);
                }
              }}
              className="w-full h-52 sm:h-60 rounded-xl overflow-hidden bg-pink-50 relative cursor-pointer group/photo shadow-inner"
              title={!isLocked ? "Tap image to change photo" : "Tap image to view fullscreen"}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105 select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-pink-950/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white p-2 text-center backdrop-blur-[1px]">
                {!isLocked ? (
                  <>
                    <Upload className="w-8 h-8 text-white drop-shadow-md animate-bounce" />
                    <span className="font-fredoka font-extrabold text-xs bg-pink-600 px-3 py-1.5 rounded-full border border-pink-300 shadow-lg">
                      Tap to Change Photo 📸
                    </span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-8 h-8 text-white drop-shadow-md animate-bounce" />
                    <span className="font-fredoka font-extrabold text-xs bg-pink-600/90 px-3 py-1.5 rounded-full border border-pink-300 shadow-lg">
                      View Fullscreen 🔍
                    </span>
                  </>
                )}
              </div>

              {/* Lightbox Zoom Icon (Top Right) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFx.playPopSound();
                  setActiveLightboxIndex(index);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/90 text-pink-600 hover:bg-pink-500 hover:text-white transition-colors shadow-md text-xs font-bold z-20"
                title="View Fullscreen"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Explicit Change Photo Pill (Bottom Right when unlocked) */}
              {!isLocked && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playPopSound();
                    setReplaceTargetId(photo.id);
                    if (replaceInputRef.current) {
                      replaceInputRef.current.value = '';
                      replaceInputRef.current.click();
                    }
                  }}
                  className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors shadow-md text-[11px] font-bold font-fredoka flex items-center gap-1 z-20"
                  title="Change Photo"
                >
                  <Upload className="w-3 h-3" />
                  <span>Change</span>
                </button>
              )}
            </div>

            {/* Polaroid Caption */}
            <div className="mt-3 text-center">
              <p className="font-handwriting text-lg sm:text-xl text-slate-800 font-bold tracking-wide">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL WITH ZOOM & SLIDESHOW */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl p-4 sm:p-6 polaroid-shadow border-4 border-pink-200 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slideshow Image */}
            <div
              className={`relative overflow-hidden rounded-2xl max-h-[70vh] cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={filteredPhotos[activeLightboxIndex].url}
                alt="Lightbox view"
                className="w-full h-full object-contain rounded-2xl select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Caption & Date */}
            <div className="mt-4 text-center">
              <p className="font-handwriting text-2xl font-bold text-slate-800">
                {filteredPhotos[activeLightboxIndex].caption}
              </p>
              <p className="text-xs font-semibold text-pink-500 font-fredoka mt-1">
                {filteredPhotos[activeLightboxIndex].date || 'Best Moments'}
              </p>
            </div>

            {/* Lightbox Controls */}
            <div className="mt-4 flex items-center justify-between w-full px-4">
              <button
                onClick={() => {
                  soundFx.playPopSound();
                  setActiveLightboxIndex(
                    (activeLightboxIndex - 1 + filteredPhotos.length) %
                      filteredPhotos.length
                  );
                }}
                className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <span className="text-xs font-bold text-pink-600 font-fredoka">
                {activeLightboxIndex + 1} of {filteredPhotos.length}
              </span>

              <button
                onClick={() => {
                  soundFx.playPopSound();
                  setActiveLightboxIndex(
                    (activeLightboxIndex + 1) % filteredPhotos.length
                  );
                }}
                className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="mt-10 flex justify-end">
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
