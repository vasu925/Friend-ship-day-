import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Trophy, Sparkles, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Page7Props {
  onUnlockNextPage: () => void;
  onNext: () => void;
}

interface FallingHeart {
  id: number;
  x: number; // percentage 10 to 90
  y: number; // pixels
  speed: number;
  size: number;
  emoji: string;
}

export const Page7_CatchHeartsGame: React.FC<Page7Props> = ({
  onUnlockNextPage,
  onNext,
}) => {
  const [score, setScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [basketX, setBasketX] = useState(50); // percentage 0 to 100
  const basketXRef = useRef(50);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const TARGET_SCORE = 10;
  const heartsRef = useRef<FallingHeart[]>([]);
  const [renderHearts, setRenderHearts] = useState<FallingHeart[]>([]);

  // Update basket position helper
  const setPositionFromX = (clientX: number) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(10, Math.min(90, (x / rect.width) * 100));
    basketXRef.current = pct;
    setBasketX(pct);
  };

  const moveBasketBy = (deltaPct: number) => {
    const nextPct = Math.max(10, Math.min(90, basketXRef.current + deltaPct));
    basketXRef.current = nextPct;
    setBasketX(nextPct);
    soundFx.playPopSound();
  };

  // Mouse / Pointer listener for moving basket
  const handlePointerDown = (e: React.PointerEvent) => {
    setPositionFromX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    setPositionFromX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setPositionFromX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setPositionFromX(e.touches[0].clientX);
    }
  };

  const triggerWin = () => {
    setHasWon(true);
    soundFx.playWinFanfare();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
    onUnlockNextPage();
  };

  const handleCatchHeartDirectly = (heartId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasWon) return;
    soundFx.playHeartCatchSound();
    heartsRef.current = heartsRef.current.filter((h) => h.id !== heartId);
    setRenderHearts([...heartsRef.current]);

    setScore((s) => {
      const newScore = s + 1;
      if (newScore >= TARGET_SCORE && !hasWon) {
        triggerWin();
      }
      return newScore;
    });
  };

  const handleSkipGame = () => {
    soundFx.playWinFanfare();
    setScore(TARGET_SCORE);
    triggerWin();
  };

  useEffect(() => {
    if (hasWon) return;

    let nextHeartId = 1;
    const emojis = ['💖', '❤️', '💗', '💓', '🌸', '✨'];

    // Heart Spawner Interval
    const spawnInterval = setInterval(() => {
      if (heartsRef.current.length < 8) {
        heartsRef.current.push({
          id: nextHeartId++,
          x: Math.random() * 76 + 12,
          y: -20,
          speed: Math.random() * 1.8 + 2,
          size: Math.floor(Math.random() * 12) + 28,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        });
      }
    }, 450);

    // Animation Game Loop with frame rate throttling (~30 FPS state sync)
    let animId: number;
    let lastRenderTime = 0;

    const gameLoop = (timestamp: number) => {
      const currentBasketX = basketXRef.current;
      heartsRef.current = heartsRef.current
        .map((h) => ({ ...h, y: h.y + h.speed }))
        .filter((h) => {
          // Check collision with basket (bottom range ~ 200px - 310px)
          if (h.y >= 200 && h.y <= 310) {
            if (Math.abs(h.x - currentBasketX) < 22) {
              // Caught heart!
              soundFx.playHeartCatchSound();
              setScore((s) => {
                const newScore = s + 1;
                if (newScore >= TARGET_SCORE && !hasWon) {
                  triggerWin();
                }
                return newScore;
              });
              return false; // remove caught heart
            }
          }
          return h.y < 340; // remove out of bounds
        });

      if (timestamp - lastRenderTime > 28) {
        lastRenderTime = timestamp;
        setRenderHearts([...heartsRef.current]);
      }
      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    return () => {
      clearInterval(spawnInterval);
      cancelAnimationFrame(animId);
    };
  }, [hasWon, onUnlockNextPage]);

  const restartGame = () => {
    setScore(0);
    setHasWon(false);
    heartsRef.current = [];
    soundFx.playPopSound();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 min-h-[85vh] flex flex-col justify-center items-center">
      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-600 font-baloo tracking-tight mb-2 text-center flex items-center justify-center gap-2">
        <span>Catch Falling Hearts</span>
        <span className="text-rose-500 animate-bounce">❤️</span>
      </h1>

      <p className="text-xs sm:text-sm font-semibold text-pink-700 font-fredoka mb-4 text-center">
        Move basket with finger/mouse, tap falling hearts, or use buttons below to catch 10 hearts!
      </p>

      {/* Score Tracker & Fast Skip */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        <div className="glass-card rounded-full px-6 py-2 border-2 border-pink-300 shadow-md flex items-center gap-3">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="text-base font-extrabold text-slate-800 font-fredoka">
            Hearts Caught: <span className="text-pink-600 text-xl">{score}</span> / {TARGET_SCORE}
          </span>
        </div>

        {!hasWon && (
          <button
            onClick={handleSkipGame}
            className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-extrabold rounded-full border border-pink-300 text-xs shadow-sm transition-all font-fredoka flex items-center gap-1 active:scale-95"
            title="Skip game and unlock next page"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Skip Game & Unlock 🔓</span>
          </button>
        )}
      </div>

      {/* Game Stage Area */}
      <div
        ref={gameAreaRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="w-full h-80 bg-gradient-to-b from-pink-100 via-pink-50 to-rose-100 rounded-[2.5rem] paper-shadow border-4 border-pink-300 relative overflow-hidden select-none cursor-crosshair touch-none"
      >
        {/* Background Clouds */}
        <div className="absolute top-4 left-6 text-2xl opacity-60">☁️</div>
        <div className="absolute top-8 right-12 text-3xl opacity-60">☁️</div>

        {/* Falling Hearts */}
        {renderHearts.map((h) => (
          <div
            key={h.id}
            onClick={(e) => handleCatchHeartDirectly(h.id, e)}
            className="absolute cursor-pointer hover:scale-125 transition-transform active:scale-95 pointer-events-auto transform-gpu"
            style={{
              left: `${h.x}%`,
              top: `${h.y}px`,
              fontSize: `${h.size}px`,
              willChange: 'top, left',
            }}
            title="Tap to catch!"
          >
            {h.emoji}
          </div>
        ))}

        {/* Basket / Paw at Bottom */}
        <div
          className="absolute bottom-2 -translate-x-1/2 pointer-events-none transition-all duration-75 flex flex-col items-center"
          style={{ left: `${basketX}%` }}
        >
          <div className="text-4xl sm:text-5xl drop-shadow-md">🧺</div>
          <div className="w-16 h-2 bg-pink-300/60 rounded-full blur-xs"></div>
        </div>

        {/* Win Overlay banner */}
        {hasWon && (
          <div className="absolute inset-0 bg-pink-900/40 backdrop-blur-xs flex flex-col items-center justify-center p-4 animate-in zoom-in-95">
            <div className="bg-white rounded-3xl p-6 text-center border-4 border-pink-300 shadow-2xl">
              <div className="text-5xl mb-2 animate-bounce">🏆</div>
              <h3 className="text-2xl font-extrabold text-pink-600 font-fredoka">
                You Won! 10 Hearts Caught! 🎉
              </h3>
              <p className="text-xs font-semibold text-slate-600 font-poppins mt-2">
                Your bestie score is officially maxed out! Next level unlocked.
              </p>
              <button
                onClick={restartGame}
                className="mt-4 px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold font-fredoka hover:bg-pink-200 inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Basket Arrow Controls */}
      <div className="flex items-center justify-between w-full mt-4 px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => moveBasketBy(-12)}
            className="px-5 py-2 bg-white hover:bg-pink-100 text-pink-600 font-extrabold rounded-full border-2 border-pink-300 shadow active:scale-95 text-sm font-fredoka flex items-center gap-1"
            title="Move basket left"
          >
            <span>⬅️ Left</span>
          </button>
          <button
            onClick={() => moveBasketBy(12)}
            className="px-5 py-2 bg-white hover:bg-pink-100 text-pink-600 font-extrabold rounded-full border-2 border-pink-300 shadow active:scale-95 text-sm font-fredoka flex items-center gap-1"
            title="Move basket right"
          >
            <span>Right ➡️</span>
          </button>
        </div>

        <button
          onClick={() => {
            soundFx.playPopSound();
            onNext();
          }}
          disabled={!hasWon}
          className={`px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold rounded-full shadow-lg transition-all font-fredoka text-sm flex items-center gap-2 ${
            hasWon
              ? 'hover:shadow-pink-300/50 hover:scale-105 active:scale-95 animate-bounce-soft'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <span>{hasWon ? 'Next Page' : 'Catch Hearts to Unlock 🔒'}</span>
          <span>➜</span>
        </button>
      </div>
    </div>
  );
};
