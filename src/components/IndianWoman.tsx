import React from 'react';
import { motion } from 'motion/react';

interface IndianWomanProps {
  isWalking?: boolean;
  isWaving?: boolean;
  className?: string;
}

export const IndianWoman: React.FC<IndianWomanProps> = ({
  isWalking = false,
  isWaving = true,
  className = '',
}) => {
  return (
    <motion.div
      className={`relative select-none ${className}`}
      style={{ filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.55))' }}
      animate={
        isWalking
          ? {
              x: [0, 10, 0],
              y: [0, -4, 0],
            }
          : {
              y: [0, -2, 0],
            }
      }
      transition={{
        repeat: Infinity,
        duration: isWalking ? 0.6 : 2.5,
        ease: 'easeInOut',
      }}
    >
      <svg
        viewBox="0 0 160 280"
        className="w-36 sm:w-44 md:w-52 h-auto overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Magenta & Orange Rajasthani gradient */}
          <linearGradient id="lehengaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#db2777" />
            <stop offset="60%" stopColor="#be185d" />
            <stop offset="100%" stopColor="#9d174d" />
          </linearGradient>

          <linearGradient id="dupattaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          <linearGradient id="kurtiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* --- LEHENGA / SKIRT --- */}
        <g id="skirt">
          {/* Flared Lehenga */}
          <path
            d="M 58 135 L 102 135 L 128 238 L 32 238 Z"
            fill="url(#lehengaGrad)"
            stroke="#831843"
            strokeWidth="2.5"
          />
          {/* Lehenga Pleat lines */}
          <line x1="68" y1="135" x2="52" y2="238" stroke="#be185d" strokeWidth="1.5" />
          <line x1="80" y1="135" x2="80" y2="238" stroke="#be185d" strokeWidth="1.5" />
          <line x1="92" y1="135" x2="108" y2="238" stroke="#be185d" strokeWidth="1.5" />

          {/* Golden Gota Patti Border at bottom of Lehenga */}
          <rect x="32" y="226" width="96" height="12" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          {/* Mirror work / block print pattern dots */}
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={i}
              cx={40 + i * 10}
              cy="232"
              r="2"
              fill="#ffffff"
              stroke="#b45309"
              strokeWidth="0.8"
            />
          ))}

          {/* Traditional motif dots on skirt */}
          <circle cx="55" cy="170" r="3" fill="#fde047" opacity="0.9" />
          <circle cx="75" cy="185" r="3" fill="#fde047" opacity="0.9" />
          <circle cx="95" cy="165" r="3" fill="#fde047" opacity="0.9" />
          <circle cx="65" cy="205" r="3" fill="#fde047" opacity="0.9" />
          <circle cx="85" cy="210" r="3" fill="#fde047" opacity="0.9" />
          <circle cx="105" cy="195" r="3" fill="#fde047" opacity="0.9" />
        </g>

        {/* --- FEET / JUTTIS (Mojari) --- */}
        <g id="feet">
          <ellipse cx="62" cy="242" rx="12" ry="4" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
          <ellipse cx="98" cy="242" rx="12" ry="4" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
          {/* Pointed upturned toe of Rajasthani jutti */}
          <path d="M 50 242 Q 46 240 48 238" stroke="#78350f" strokeWidth="1.5" fill="none" />
          <path d="M 86 242 Q 82 240 84 238" stroke="#78350f" strokeWidth="1.5" fill="none" />
        </g>

        {/* --- KURTI / BLOUSE (CHOLI) --- */}
        <g id="choli">
          <path
            d="M 54 85 L 106 85 L 102 135 L 58 135 Z"
            fill="url(#kurtiGrad)"
            stroke="#b45309"
            strokeWidth="2"
          />
          {/* Golden embroidered neckline */}
          <path
            d="M 68 85 Q 80 102 92 85"
            stroke="#fde047"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="80" cy="108" r="3.5" fill="#ec4899" stroke="#be185d" strokeWidth="1" />
          <circle cx="80" cy="120" r="3.5" fill="#ec4899" stroke="#be185d" strokeWidth="1" />
        </g>

        {/* --- DUPATTA (FLUTTERING SCARF) --- */}
        <g id="dupatta">
          {/* Draped across chest & flowing behind */}
          <path
            d="M 54 90 Q 75 125 105 140 L 115 220 Q 95 210 85 160 Q 65 140 50 100 Z"
            fill="url(#dupattaGrad)"
            opacity="0.92"
            stroke="#c2410c"
            strokeWidth="1.5"
          />
          {/* Golden zari fringe on dupatta border */}
          <path
            d="M 105 140 L 115 220"
            stroke="#fbbf24"
            strokeWidth="3.5"
            strokeDasharray="4 2"
          />
          {/* Dupatta tail flowing in the wind */}
          <path
            d="M 50 95 Q 25 105 18 135 Q 28 145 42 125 Z"
            fill="url(#dupattaGrad)"
            opacity="0.85"
          />
        </g>

        {/* --- HEAD, FACE & JEWELLERY --- */}
        <g id="head">
          {/* Neck */}
          <rect x="74" y="68" width="12" height="18" fill="#d97706" />
          {/* Gold necklace */}
          <path d="M 72 82 Q 80 88 88 82" stroke="#fbbf24" strokeWidth="2.5" fill="none" />

          {/* Head base */}
          <circle cx="80" cy="56" r="19" fill="#f59e0b" />

          {/* Black lustrous Indian hair with side parting */}
          <path
            d="M 61 54 C 61 36 99 36 99 54 C 99 64 94 72 80 72 C 66 72 61 64 61 54 Z"
            fill="#18181b"
          />
          {/* Hair Bun at back */}
          <circle cx="62" cy="46" r="10" fill="#18181b" />
          {/* White Jasmine Flowers (Gajra) wrapped around bun */}
          <path
            d="M 56 42 Q 62 36 68 44 Q 68 54 58 52"
            stroke="#fef08a"
            strokeWidth="4"
            strokeDasharray="3 2"
            fill="none"
          />

          {/* Forehead Maang Tikka */}
          <line x1="80" y1="38" x2="80" y2="46" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx="80" cy="47" r="2.5" fill="#f59e0b" stroke="#dc2626" strokeWidth="1" />

          {/* Bindi (Crimson red) */}
          <circle cx="84" cy="52" r="2" fill="#dc2626" />

          {/* Smiling features */}
          {/* Almond eye with kohl */}
          <ellipse cx="86" cy="55" rx="3.5" ry="2" fill="#ffffff" />
          <circle cx="87" cy="55" r="1.5" fill="#09090b" />
          <path d="M 83 52 Q 87 50 91 52" stroke="#18181b" strokeWidth="1.2" fill="none" />
          {/* Nose pin */}
          <circle cx="91" cy="59" r="0.8" fill="#fbbf24" />
          {/* Cheerful red lips */}
          <path d="M 84 64 Q 88 67 92 64" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Golden Jhumka earring */}
          <g transform="translate(68, 62)">
            <circle cx="0" cy="0" r="1.5" fill="#fbbf24" />
            <path d="M -4 4 L 4 4 L 2 9 L -2 9 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" />
            <circle cx="-2" cy="11" r="1" fill="#f59e0b" />
            <circle cx="2" cy="11" r="1" fill="#f59e0b" />
          </g>
        </g>

        {/* --- ARMS & BANGLES --- */}
        <g id="arms">
          {/* Left Arm: resting gracefully or walking */}
          <path
            d="M 54 88 Q 45 110 52 135"
            stroke="#f59e0b"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Bangles on left arm */}
          <circle cx="51" cy="125" r="3.5" stroke="#ec4899" strokeWidth="2" fill="none" />
          <circle cx="51" cy="129" r="3.5" stroke="#fbbf24" strokeWidth="2" fill="none" />

          {/* Right Arm: Waving to hail auto-rickshaw! */}
          {isWaving ? (
            <motion.g
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              style={{ transformOrigin: '104px 90px' }}
            >
              <path
                d="M 104 90 Q 128 75 142 55"
                stroke="#f59e0b"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Hand waving */}
              <circle cx="145" cy="52" r="5" fill="#f59e0b" />
              {/* Red & Gold Bangles on right wrist */}
              <circle cx="138" cy="62" r="3.5" stroke="#dc2626" strokeWidth="2" fill="none" />
              <circle cx="136" cy="66" r="3.5" stroke="#fbbf24" strokeWidth="2" fill="none" />
            </motion.g>
          ) : (
            <path
              d="M 104 90 Q 118 115 110 135"
              stroke="#f59e0b"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </g>
      </svg>
    </motion.div>
  );
};
