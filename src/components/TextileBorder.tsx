import React from 'react';

interface TextileBorderProps {
  position?: 'top' | 'bottom';
  className?: string;
}

export const TextileBorder: React.FC<TextileBorderProps> = ({ position = 'top', className = '' }) => {
  const isTop = position === 'top';

  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none relative z-30 ${className}`}
      aria-hidden="true"
    >
      {/* Rajasthani Bandhani & Block Print Pattern Ribbon */}
      <div className="h-3 w-full bg-gradient-to-r from-red-600 via-amber-500 to-rose-600 flex items-center justify-around border-y border-amber-300/40">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-amber-100 shadow-[0_0_2px_rgba(255,255,255,0.8)] opacity-90"
          />
        ))}
      </div>

      {/* Ornate Scallop Jharokha Arch SVG repeating pattern */}
      <div
        className={`w-full h-6 bg-[#7c2d12] flex items-center overflow-hidden border-b-2 border-amber-400 ${
          isTop ? '' : 'rotate-180 border-t-2 border-b-0'
        }`}
      >
        <svg
          className="w-full h-full text-amber-400"
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="jharokhaPattern" width="60" height="24" patternUnits="userSpaceOnUse">
              {/* Arch */}
              <path
                d="M 0 0 C 15 0, 15 16, 30 16 C 45 16, 45 0, 60 0 Z"
                fill="#991b1b"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
              {/* Marigold center bead */}
              <circle cx="30" cy="18" r="3.5" fill="#facc15" stroke="#78350f" strokeWidth="1" />
              {/* Paisley diamond */}
              <polygon points="30,4 34,9 30,13 26,9" fill="#fbbf24" />
            </pattern>
          </defs>
          <rect width="1200" height="24" fill="url(#jharokhaPattern)" />
        </svg>
      </div>

      {/* Hanging marigolds garland on top border */}
      {isTop && (
        <div className="flex justify-between px-2 -mt-1 opacity-90">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-garland-sway" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
              <div className="w-0.5 h-2 bg-amber-700/60" />
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 shadow-sm flex items-center justify-center text-[6px]">
                🏵️
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
