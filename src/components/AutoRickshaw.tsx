import React from 'react';
import { sound } from '../utils/audio';

interface AutoRickshawProps {
  isMoving?: boolean;
  womanBoarded?: boolean;
  onHonk?: () => void;
  className?: string;
  showLightBeam?: boolean;
}

export const AutoRickshaw: React.FC<AutoRickshawProps> = ({
  isMoving = false,
  womanBoarded = false,
  onHonk,
  className = '',
  showLightBeam = true,
}) => {
  const handleHornClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playHorn();
    if (onHonk) onHonk();
  };

  return (
    <div
      className={`relative select-none ${className} ${
        isMoving ? 'animate-rickshaw-bounce' : ''
      }`}
      style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }}
    >
      {/* Headlight beam projection */}
      {showLightBeam && (
        <div
          className="absolute -right-48 md:-right-72 top-28 md:top-36 w-60 md:w-96 h-32 md:h-44 pointer-events-none opacity-50 animate-beam-pulse z-0"
          style={{
            background:
              'radial-gradient(ellipse at left top, rgba(254, 240, 138, 0.45) 0%, rgba(253, 224, 71, 0.2) 40%, transparent 75%)',
            clipPath: 'polygon(0% 25%, 100% 0%, 100% 100%, 0% 75%)',
          }}
        />
      )}

      {/* Exhaust smoke puff while moving */}
      {isMoving && (
        <div className="absolute -left-6 bottom-4 flex items-center space-x-1 pointer-events-none">
          <div className="w-4 h-4 rounded-full bg-slate-300/40 animate-ping" />
          <div className="w-3 h-3 rounded-full bg-slate-400/30 animate-pulse" />
        </div>
      )}

      {/* SVG Auto-Rickshaw Vector Artwork */}
      <svg
        viewBox="0 0 460 300"
        className="w-72 sm:w-96 md:w-[460px] h-auto overflow-visible relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="yellowRoofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          <linearGradient id="greenBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#166534" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>

          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#bae6fd" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.65" />
          </linearGradient>

          <radialGradient id="headlightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>

          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        {/* --- REAR CABIN & SEATS --- */}
        {/* Back wall / canvas backdrop */}
        <path
          d="M 60 70 L 220 70 L 220 190 L 60 190 Z"
          fill="#1c1917"
          stroke="#0c0a09"
          strokeWidth="3"
        />

        {/* Seat cushion (rexine maroon) */}
        <rect x="75" y="145" width="125" height="42" rx="6" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
        <rect x="75" y="110" width="22" height="45" rx="4" fill="#991b1b" stroke="#450a0a" strokeWidth="2" />

        {/* --- PASSENGER: WOMAN (Rendered if womanBoarded is true) --- */}
        {womanBoarded && (
          <g id="passengerWoman">
            {/* Woman sitting in rickshaw */}
            {/* Dupatta drape back */}
            <path d="M 100 110 Q 80 140 90 170 Q 120 180 140 160 Z" fill="#ec4899" opacity="0.9" />
            {/* Torso / Kurti */}
            <path d="M 110 115 Q 125 105 140 115 L 145 155 L 105 155 Z" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
            {/* Printed traditional motifs on dress */}
            <circle cx="120" cy="130" r="2" fill="#fde047" />
            <circle cx="132" cy="138" r="2" fill="#fde047" />
            <circle cx="118" cy="146" r="2" fill="#fde047" />
            {/* Neck & Face */}
            <rect x="121" y="98" width="8" height="12" fill="#d97706" />
            <circle cx="125" cy="90" r="14" fill="#f59e0b" />
            {/* Traditional Black hair bun & bindi */}
            <path d="M 112 85 C 112 73 138 73 138 85 C 138 88 135 95 125 95 C 115 95 112 88 112 85 Z" fill="#18181b" />
            <circle cx="114" cy="78" r="6" fill="#18181b" />
            {/* Bindi */}
            <circle cx="130" cy="87" r="1.5" fill="#dc2626" />
            {/* Gold Jhumka Earring */}
            <polygon points="115,92 118,97 112,97" fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" />
            {/* Happy smiling eye & mouth */}
            <path d="M 126 89 Q 130 91 133 89" stroke="#18181b" strokeWidth="1.5" fill="none" />
            <path d="M 127 94 Q 131 97 134 94" stroke="#b91c1c" strokeWidth="1.5" fill="none" />
            {/* Hand resting playfully on auto frame */}
            <path d="M 140 130 Q 155 140 160 148" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Golden bangles */}
            <circle cx="157" cy="144" r="2.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          </g>
        )}

        {/* --- DRIVER IN FRONT SEAT --- */}
        <g id="driverGroup">
          {/* Driver khaki back & shoulder */}
          <path
            d="M 235 125 C 245 110 275 110 285 125 L 290 170 L 230 170 Z"
            fill="#a16207"
            stroke="#713f12"
            strokeWidth="2"
          />
          {/* Driver Neck & Head */}
          <rect x="254" y="98" width="10" height="12" fill="#d97706" />
          <circle cx="259" cy="88" r="14" fill="#f59e0b" />
          {/* Khaki / Nehru style driver cap */}
          <path
            d="M 245 82 C 245 70 273 70 273 82 L 278 86 L 243 86 Z"
            fill="#854d0e"
            stroke="#451a03"
            strokeWidth="1.5"
          />
          {/* Hair & Royal Indian Moustache */}
          <circle cx="249" cy="86" r="3" fill="#1c1917" />
          {/* Handlebar Moustache */}
          <path
            d="M 255 93 Q 262 96 269 92 Q 275 88 274 94 Q 266 99 255 96 Z"
            fill="#18181b"
          />
          {/* Driver's hands on auto handlebar */}
          <path
            d="M 275 130 Q 305 138 320 148"
            stroke="#a16207"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* --- MAIN AUTO BODY (YELLOW ROOF & GREEN CABIN) --- */}
        {/* Yellow Roof Shell */}
        <path
          d="M 50 85 C 50 45 100 25 210 25 C 320 25 365 50 375 85 L 360 95 C 340 75 290 55 210 55 C 120 55 70 70 58 95 Z"
          fill="url(#yellowRoofGrad)"
          stroke="#ca8a04"
          strokeWidth="3"
        />

        {/* Roof Pillars & Supports */}
        <line x1="60" y1="90" x2="60" y2="185" stroke="#0f172a" strokeWidth="6" />
        <line x1="215" y1="60" x2="215" y2="185" stroke="#0f172a" strokeWidth="6" />
        <line x1="330" y1="80" x2="350" y2="185" stroke="#0f172a" strokeWidth="5" />

        {/* Windshield Glass & Frame */}
        <polygon
          points="295,75 355,80 345,150 288,145"
          fill="url(#glassGrad)"
          stroke="#334155"
          strokeWidth="3"
        />
        {/* Windshield Reflection Line */}
        <line x1="310" y1="85" x2="330" y2="140" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        {/* Windshield Wiper */}
        <line x1="318" y1="145" x2="335" y2="105" stroke="#020617" strokeWidth="2.5" />

        {/* Green Lower Body & Chassis */}
        <path
          d="M 50 170 L 225 170 L 320 175 L 370 190 L 390 220 L 375 235 L 45 235 L 40 195 Z"
          fill="url(#greenBodyGrad)"
          stroke="#052e16"
          strokeWidth="3.5"
        />

        {/* Yellow racing stripes on green body */}
        <path d="M 45 198 L 380 200 L 380 208 L 45 206 Z" fill="#facc15" />
        <path d="M 45 212 L 375 214 L 375 217 L 45 215 Z" fill="#facc15" />

        {/* Classic Bumper Slogan: "BURII NAZAR WAALE TERA MUH KAALA" */}
        <rect x="55" y="218" width="160" height="13" rx="2" fill="#0f172a" stroke="#ca8a04" strokeWidth="1" />
        <text
          x="135"
          y="227"
          fill="#fef08a"
          fontSize="7.5"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          बूरी नज़र वाले तेरा मुँह काला
        </text>

        {/* Number Plate: RJ 14 BLITZ 27 */}
        <rect x="305" y="215" width="62" height="15" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
        <text
          x="336"
          y="226"
          fill="#0f172a"
          fontSize="8"
          fontWeight="900"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          RJ 14 BLITZ 27
        </text>

        {/* Auto Rickshaw Fare Meter Box */}
        <rect x="282" y="150" width="22" height="20" rx="3" fill="#0f172a" stroke="#dc2626" strokeWidth="1.5" />
        <rect x="286" y="154" width="14" height="7" fill="#ef4444" />
        <text x="293" y="160" fill="#fef08a" fontSize="5" fontWeight="bold" textAnchor="middle">HIRE</text>

        {/* Handlebars & Grips */}
        <line x1="305" y1="155" x2="335" y2="155" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />

        {/* Squeeze Bulb Horn (Interactive!) */}
        <g
          className="cursor-pointer group"
          onClick={handleHornClick}
          transform="translate(325, 140)"
        >
          <title>Click to Honk the Horn! 📯</title>
          {/* Bulb rubber */}
          <circle cx="0" cy="0" r="8" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" className="group-hover:scale-110 transition-transform origin-center" />
          {/* Brass trumpet horn nozzle */}
          <path d="M 6 -2 L 18 -6 L 18 6 L 6 2 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="18" cy="0" rx="2" ry="6" fill="#f59e0b" />
        </g>

        {/* Chrome Headlight */}
        <g transform="translate(385, 205)">
          <path d="M -5 -16 C 5 -16 12 -8 12 0 C 12 8 5 16 -5 16 Z" fill="url(#chromeGrad)" stroke="#475569" strokeWidth="2" />
          <circle cx="2" cy="0" r="13" fill="url(#headlightGlow)" stroke="#fef08a" strokeWidth="2" />
          <circle cx="2" cy="0" r="7" fill="#ffffff" />
          {/* Headlight chrome visor eyebrow */}
          <path d="M -6 -16 C 4 -22 14 -10 14 -3" stroke="#f1f5f9" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Marigold Flower Garland dangling from mirror */}
        <g transform="translate(295, 110)">
          <line x1="0" y1="0" x2="-8" y2="28" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="-2" cy="7" r="3" fill="#f97316" />
          <circle cx="-5" cy="15" r="3" fill="#eab308" />
          <circle cx="-8" cy="23" r="3.5" fill="#f97316" />
          {/* Evil eye black thread hanging */}
          <line x1="-8" y1="23" x2="-10" y2="34" stroke="#0f172a" strokeWidth="1" />
          <circle cx="-10" cy="34" r="2" fill="#1e293b" />
        </g>

        {/* --- WHEELS (Front & Rear with spinning spokes) --- */}
        {/* Front Wheel */}
        <g transform="translate(355, 240)">
          {/* Wheel Mudguard */}
          <path d="M -28 -5 C -25 -28 25 -28 32 -5" fill="#047857" stroke="#064e3b" strokeWidth="3" />
          {/* Tire */}
          <circle cx="0" cy="0" r="24" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
          <circle cx="0" cy="0" r="16" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
          {/* Rotating Spokes */}
          <g className={isMoving ? 'animate-wheel-spin origin-center' : ''}>
            <circle cx="0" cy="0" r="6" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
            <line x1="0" y1="-16" x2="0" y2="16" stroke="#f8fafc" strokeWidth="2" />
            <line x1="-16" y1="0" x2="16" y2="0" stroke="#f8fafc" strokeWidth="2" />
            <line x1="-11" y1="-11" x2="11" y2="11" stroke="#f8fafc" strokeWidth="2" />
            <line x1="-11" y1="11" x2="11" y2="-11" stroke="#f8fafc" strokeWidth="2" />
          </g>
        </g>

        {/* Rear Wheel */}
        <g transform="translate(105, 240)">
          {/* Wheel Arch Cutout in Body */}
          <circle cx="0" cy="0" r="26" fill="#090d16" />
          {/* Tire */}
          <circle cx="0" cy="0" r="24" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
          <circle cx="0" cy="0" r="16" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
          {/* Rotating Spokes */}
          <g className={isMoving ? 'animate-wheel-spin origin-center' : ''}>
            <circle cx="0" cy="0" r="6" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
            <line x1="0" y1="-16" x2="0" y2="16" stroke="#f8fafc" strokeWidth="2" />
            <line x1="-16" y1="0" x2="16" y2="0" stroke="#f8fafc" strokeWidth="2" />
            <line x1="-11" y1="-11" x2="11" y2="11" stroke="#f8fafc" strokeWidth="2" />
            <line x1="-11" y1="11" x2="11" y2="-11" stroke="#f8fafc" strokeWidth="2" />
          </g>
        </g>

        {/* Footstep step board */}
        <rect x="155" y="235" width="105" height="7" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="1" />
      </svg>
    </div>
  );
};
