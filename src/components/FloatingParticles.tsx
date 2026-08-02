import React, { useMemo } from 'react';

const EMOJIS = ['🌸', '✨', '💖', '🎀', '💌', '🐰', '🐱', '⭐', '🌷', '📜', '☁️', '🎀'];

interface Particle {
  id: number;
  emoji: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingParticles: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: Math.random() * 95,
      top: Math.random() * 95,
      size: Math.floor(Math.random() * 10) + 16, // 16px to 26px
      duration: Math.random() * 6 + 7, // 7s to 13s
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float opacity-60 transition-opacity transform-gpu"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform',
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};
