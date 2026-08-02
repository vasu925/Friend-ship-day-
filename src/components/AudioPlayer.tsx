import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState('');
  const [usingCustomAudio, setUsingCustomAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (usingCustomAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    if (isPlaying) {
      soundFx.stopBackgroundMusic();
      setIsPlaying(false);
    } else {
      soundFx.startBackgroundMusic();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const handleCustomAudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAudioUrl) {
      soundFx.stopBackgroundMusic();
      setUsingCustomAudio(true);
      if (audioRef.current) {
        audioRef.current.src = customAudioUrl;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      soundFx.stopBackgroundMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      <audio ref={audioRef} loop />
      
      {/* Floating music status pill */}
      <div className="glass-card rounded-full px-3 py-1.5 shadow-md flex items-center gap-2 border border-pink-200">
        <button
          onClick={() => {
            soundFx.playPopSound();
            togglePlay();
          }}
          className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-transform active:scale-95 flex items-center justify-center"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          onClick={() => {
            soundFx.playPopSound();
            toggleMute();
          }}
          className="p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-500 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <span className="text-xs font-semibold text-pink-700 hidden sm:inline flex items-center gap-1 font-fredoka">
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-pink-500' : 'text-slate-400'}`} />
          {isPlaying ? 'Soft Lofi Melody ✨' : 'Background Music'}
        </span>
      </div>
    </div>
  );
};
