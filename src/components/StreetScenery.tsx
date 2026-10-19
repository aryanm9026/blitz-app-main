import React from 'react';

interface StreetSceneryProps {
  parallaxOffset?: number;
  className?: string;
}

export const StreetScenery: React.FC<StreetSceneryProps> = ({
  parallaxOffset = 0,
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* --- LAYER 1: Deep Royal Blue Twilight Sky & Stars --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060b1c] via-[#0f1738] to-[#1e1b4b]">
        {/* Distant stars / sparkle dust */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-100"
            style={{
              top: `${(i * 17) % 65}%`,
              left: `${(i * 31) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              opacity: 0.3 + (i % 5) * 0.15,
              animation: `pulse ${(i % 3) + 2}s infinite ease-in-out`,
            }}
          />
        ))}

        {/* Crescent Moon over Jaipur */}
        <div className="absolute top-12 right-16 sm:right-32 w-14 h-14 rounded-full shadow-[inset_6px_4px_0_0_#fef08a] opacity-80" />
      </div>

      {/* --- LAYER 2: Distant City & Jaipur Heritage Skyline Silhouette --- */}
      <div
        className="absolute bottom-32 sm:bottom-40 left-0 right-0 h-48 opacity-45 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${-parallaxOffset * 0.15}px)` }}
      >
        <svg
          viewBox="0 0 1440 220"
          className="w-[200%] sm:w-[150%] md:w-full h-full object-bottom"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Heritage palace domes, jharokhas, and Jaipur Hawa-Mahal style arches */}
          <path
            d="M 0 220 L 0 160 Q 20 160 30 140 Q 40 160 60 160 L 90 160 L 90 120 Q 110 90 130 120 L 130 160 L 180 160 L 180 145 C 200 135 220 135 240 145 L 240 160 L 300 160 L 320 100 Q 340 70 360 100 L 380 160 L 450 160 L 460 130 Q 480 110 500 130 L 510 160 L 590 160 L 610 90 C 630 60 670 60 690 90 L 710 160 L 780 160 L 800 135 Q 820 115 840 135 L 860 160 L 930 160 L 950 110 Q 970 85 990 110 L 1010 160 L 1090 160 L 1110 130 Q 1130 100 1150 130 L 1170 160 L 1260 160 L 1280 80 Q 1310 50 1340 80 L 1360 160 L 1440 160 L 1440 220 Z"
            fill="#1e1b4b"
          />
          {/* Jharokha window cutouts */}
          <circle cx="340" cy="115" r="4" fill="#fbbf24" opacity="0.6" />
          <circle cx="650" cy="95" r="5" fill="#fbbf24" opacity="0.7" />
          <circle cx="970" cy="118" r="4" fill="#fbbf24" opacity="0.6" />
          <circle cx="1310" cy="90" r="5" fill="#fbbf24" opacity="0.7" />
        </svg>
      </div>

      {/* --- LAYER 3: Palm Trees, Overhead Festive Bulbs & Street Elements --- */}
      {/* Overhead Fairy Lights / Festoon Bulbs */}
      <div className="absolute top-8 sm:top-12 left-0 right-0 flex justify-around px-4 pointer-events-none z-10">
        <svg className="w-full h-14 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1200 40">
          {/* Sagging wires */}
          <path d="M 0 5 Q 300 35 600 10 Q 900 35 1200 5" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.6" />
          {/* Colorful glowing festival bulbs */}
          {[60, 160, 260, 360, 460, 560, 660, 760, 860, 960, 1060, 1160].map((cx, idx) => {
            const colors = ['#f59e0b', '#ec4899', '#10b981', '#3b82f6', '#f43f5e'];
            const color = colors[idx % colors.length];
            const cy = 10 + Math.sin((cx / 1200) * Math.PI) * 16;
            return (
              <g key={idx}>
                <line x1={cx} y1={cy - 5} x2={cx} y2={cy} stroke="#334155" strokeWidth="2" />
                <circle cx={cx} cy={cy + 4} r="5" fill={color} filter="drop-shadow(0 0 6px rgba(253,224,71,0.8))" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Midground Scenery (Chai Stall, Samosa & Gol Gappe Stall, Film Projector, Palm Tree) */}
      <div
        className="absolute bottom-20 sm:bottom-24 left-0 right-0 flex items-end justify-between px-4 sm:px-12 md:px-24 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${-parallaxOffset * 0.4}px)` }}
      >
        {/* Left: Chai Stall ("Garam Masala Chai & Bun Maska") */}
        <div className="relative flex flex-col items-center">
          {/* Chai Cup & Steaming Kettle Art */}
          <div className="relative mb-2">
            {/* Animated Steam Plumes */}
            <div className="absolute -top-7 left-3 w-2 h-7 bg-amber-100/40 rounded-full blur-[1px] animate-steam-1" />
            <div className="absolute -top-6 left-7 w-2 h-6 bg-amber-100/35 rounded-full blur-[1px] animate-steam-2" />

            {/* Brass Chai Kettle & Kullhad */}
            <svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Brass Kettle */}
              <ellipse cx="25" cy="42" rx="18" ry="12" fill="#d97706" stroke="#b45309" strokeWidth="2" />
              <rect x="18" y="22" width="14" height="10" rx="2" fill="#b45309" />
              {/* Kettle Spout */}
              <path d="M 12 36 Q 4 30 6 22" stroke="#d97706" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Kettle Handle */}
              <path d="M 16 24 C 16 10 34 10 34 24" stroke="#78350f" strokeWidth="3" fill="none" />
              {/* Kullhads (Earthen Clay Chai Cups) */}
              <path d="M 45 35 L 58 35 L 55 52 L 48 52 Z" fill="#9a3412" stroke="#7c2d12" strokeWidth="1.5" />
              <ellipse cx="51.5" cy="35" rx="6.5" ry="2" fill="#ea580c" />
              <path d="M 58 39 L 68 39 L 66 52 L 60 52 Z" fill="#9a3412" stroke="#7c2d12" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Wooden Bench / Chai Stall Cart */}
          <div className="w-28 sm:w-36 h-20 bg-[#451a03] border-2 border-amber-600 rounded-t-lg flex flex-col items-center justify-between p-1.5 shadow-xl">
            {/* Awning stripes */}
            <div className="w-full h-4 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 rounded-sm" />
            <div className="bg-amber-950 px-2 py-0.5 rounded border border-amber-500/50 text-center">
              <span className="font-desi text-[11px] text-amber-300 font-bold block leading-none">
                कटिंग चाय
              </span>
              <span className="text-[9px] text-amber-100 font-medium">Kullhad Chai</span>
            </div>
            {/* Wheel spoke of cart */}
            <div className="w-8 h-8 rounded-full border-2 border-amber-500/80 -mb-4 bg-amber-950/80 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
          </div>
        </div>

        {/* Vintage Film Projector on Wooden Tripod (Iconic Indian Cinema Symbol) */}
        <div className="hidden sm:flex flex-col items-center relative -bottom-2 mx-4">
          {/* Animated Projector Light Cone beaming into distance */}
          <div
            className="absolute -top-12 -left-36 w-44 h-24 pointer-events-none opacity-40 animate-beam-pulse z-0"
            style={{
              background: 'radial-gradient(ellipse at right center, rgba(253, 224, 71, 0.45), transparent 70%)',
              clipPath: 'polygon(100% 50%, 0% 0%, 0% 100%)',
            }}
          />

          <svg width="80" height="110" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top Film Spool Reel */}
            <circle cx="28" cy="18" r="14" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="28" cy="18" r="5" fill="#cbd5e1" />
            {/* Bottom Film Spool Reel */}
            <circle cx="54" cy="22" r="14" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="54" cy="22" r="5" fill="#cbd5e1" />
            {/* Projector Body */}
            <rect x="20" y="32" width="42" height="28" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            {/* Lens barrel pointing left */}
            <path d="M 20 40 L 6 36 L 6 52 L 20 48 Z" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
            <circle cx="6" cy="44" r="5" fill="#fef08a" opacity="0.9" />
            {/* Wooden Tripod Legs */}
            <line x1="32" y1="60" x2="10" y2="108" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <line x1="41" y1="60" x2="41" y2="108" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="60" x2="72" y2="108" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] font-desi text-amber-300 font-bold -mt-2">सिनेमा प्रोजेक्टर</span>
        </div>

        {/* Right: Samosa & Gol Gappe Stall */}
        <div className="relative flex flex-col items-center">
          {/* Earthen Pots & Samosa platter */}
          <div className="flex items-center space-x-1.5 mb-1.5">
            {/* Gol gappe matka (clay pot with spicy mint water) */}
            <div className="w-7 h-7 rounded-full bg-[#7c2d12] border-2 border-amber-600 flex items-center justify-center shadow-md">
              <div className="w-4 h-1 bg-emerald-600 rounded-full" />
            </div>
            {/* Samosa pyramid */}
            <div className="flex items-center space-x-0.5">
              <span className="text-sm">🥟</span>
              <span className="text-xs">🥟</span>
            </div>
          </div>

          {/* Stall Counter */}
          <div className="w-32 sm:w-44 h-22 bg-[#831843] border-2 border-rose-500 rounded-t-lg flex flex-col items-center justify-between p-1.5 shadow-xl">
            {/* Striped Rajasthani Awning */}
            <div className="w-full h-4 bg-gradient-to-r from-amber-400 via-rose-600 to-amber-400 rounded-sm" />
            <div className="bg-slate-950/80 px-2.5 py-0.5 rounded border border-rose-400/50 text-center">
              <span className="font-desi text-[11px] text-amber-300 font-bold block leading-none">
                गोल गप्पे व समोसे
              </span>
              <span className="text-[9px] text-rose-200 font-medium">Chatpata Street Eats</span>
            </div>
            <div className="w-full flex justify-between px-3 text-[9px] text-amber-200">
              <span>तिखा 🌶️</span>
              <span>मीठा 🍯</span>
            </div>
          </div>
        </div>

        {/* Traditional Palm Tree Silhouette */}
        <div className="hidden md:block w-24 h-48 -mb-4">
          <svg viewBox="0 0 100 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk */}
            <path d="M 50 200 Q 42 120 48 40" stroke="#451a03" strokeWidth="8" strokeLinecap="round" />
            {/* Fronds */}
            <path d="M 48 40 Q 20 30 5 45 Q 25 50 48 40" fill="#064e3b" />
            <path d="M 48 40 Q 15 15 10 0 Q 30 15 48 40" fill="#064e3b" />
            <path d="M 48 40 Q 55 10 70 5 Q 60 25 48 40" fill="#047857" />
            <path d="M 48 40 Q 80 25 95 38 Q 75 48 48 40" fill="#064e3b" />
            <path d="M 48 40 Q 75 60 90 75 Q 65 65 48 40" fill="#047857" />
          </svg>
        </div>
      </div>

      {/* --- LAYER 4: Foreground Indian Street Road --- */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-[#0c0a09] via-[#1c1917] to-[#292524] border-t-4 border-amber-600/80 shadow-[0_-10px_20px_rgba(0,0,0,0.8)]">
        {/* Road lane markings (Dashed yellow retro painted stripe) */}
        <div className="w-full h-2.5 mt-5 sm:mt-6 flex justify-around opacity-75">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-12 sm:w-16 h-1.5 bg-amber-400 rounded-sm" />
          ))}
        </div>

        {/* Scattered Marigold Petals on the street */}
        <div className="absolute top-1 left-0 right-0 flex justify-around px-8 opacity-65">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm"
              style={{ transform: `translateY(${(i % 4) * 3}px)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
