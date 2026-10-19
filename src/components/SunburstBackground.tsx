import React from 'react';
import { motion } from 'motion/react';

interface SunburstBackgroundProps {
  progress?: number; // 0 to 1
  isActive?: boolean;
}

export const SunburstBackground: React.FC<SunburstBackgroundProps> = ({
  progress = 1,
  isActive = true,
}) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: progress, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Deep Royal Blue to Warm Magenta-Navy Radial Ambient Base */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1e1b4b] via-[#090d23] to-[#040610]" />

      {/* Rotating Golden-Yellow Sunburst Rays */}
      <div className="absolute inset-[-50%] flex items-center justify-center animate-spin-slow origin-center opacity-45">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full text-amber-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#ea580c" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#431407" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 24 Radiant Sunburst Triangular Rays */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <path
                key={i}
                d="M 500 500 L 450 0 L 550 0 Z"
                fill="url(#sunburstGrad)"
                transform={`rotate(${angle} 500 500)`}
              />
            );
          })}
        </svg>
      </div>

      {/* Central Golden Radiance Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none blur-3xl opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.5) 0%, rgba(249,115,22,0.3) 45%, transparent 75%)',
        }}
      />

      {/* Halftone Dot Stippling Texture Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#fde047 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
    </motion.div>
  );
};
