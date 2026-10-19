import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Countdown } from './Countdown';
import { Bell, Share2, Check, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

interface FinalPosterRevealProps {
  targetDate: string;
  onTargetDateChange: (date: string) => void;
  className?: string;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const FinalPosterReveal: React.FC<FinalPosterRevealProps> = ({
  targetDate,
  onTargetDateChange,
  className = '',
  isAudioMuted,
  onToggleAudio,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    sound.playCelebrationFanfare();
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className={`relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto ${className}`}>
      {/* 1. Animated: "THE COUNTDOWN" */}
      <motion.div
        initial={{ opacity: 0, y: -20, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex items-center space-x-3 mb-1"
      >
        <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-400" />
        <h2 className="text-sm sm:text-base md:text-xl font-extrabold uppercase font-poster text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          THE COUNTDOWN
        </h2>
        <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-400" />
      </motion.div>

      {/* 2. Bold White Brush Lettering: "BEGINS!" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ duration: 0.6, delay: 0.25, type: 'spring', damping: 12 }}
        className="mb-4 sm:mb-6"
      >
        <h1
          className="font-brush text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider filter drop-shadow-[0_6px_0px_#b91c1c] drop-shadow-[0_12px_18px_rgba(0,0,0,0.9)]"
          style={{ textShadow: '4px 4px 0px #b91c1c, 8px 8px 0px #450a0a' }}
        >
          BEGINS!
        </h1>
      </motion.div>

      {/* 3. Four-Part Countdown Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="w-full mb-6 sm:mb-8"
      >
        <Countdown
          targetDate={targetDate}
          onTargetDateChange={onTargetDateChange}
        />
      </motion.div>

      {/* 4. Oversized Italic Purple: "BLITZSCHLAG 2027" with Bright Outline & Deep Shadow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, type: 'spring', damping: 15 }}
        className="relative my-2 sm:my-4 group"
      >
        {/* Ambient neon backdrop glow */}
        <div className="absolute inset-0 bg-purple-600/30 blur-2xl rounded-full scale-110 pointer-events-none" />

        <h1
          className="font-poster italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-fuchsia-400 font-black tracking-tight select-none transform transition-transform group-hover:scale-[1.02] duration-300"
          style={{
            WebkitTextStroke: '2px #ffffff',
            textShadow: `
              0 0 15px rgba(236, 72, 153, 0.9),
              4px 4px 0px #701a75,
              8px 8px 0px #4a044e,
              12px 12px 0px #2e1065,
              16px 16px 25px rgba(0, 0, 0, 0.95)
            `,
          }}
        >
          BLITZSCHLAG 2027
        </h1>

        {/* Traditional Hindi Script Subtitle Tag */}
        <div className="flex items-center justify-center space-x-2 mt-1">
          <span className="text-amber-400 text-xs">✦</span>
          <span className="font-desi text-amber-300 text-sm sm:text-base font-bold tracking-wider">
            ब्लिट्ज़श्लाग २०२७ — संस्कृति का महाकुंभ
          </span>
          <span className="text-amber-400 text-xs">✦</span>
        </div>
      </motion.div>

      {/* 5. Dramatic "COMING SOON" Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="mt-3 sm:mt-5"
      >
        <div className="inline-flex items-center space-x-3 px-6 sm:px-10 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-rose-600 border-2 border-amber-300 text-slate-950 shadow-[0_6px_25px_rgba(245,158,11,0.6)]">
          <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-slate-950 animate-spin-slow" />
          <span className="font-brush text-lg sm:text-2xl md:text-3xl text-slate-950 tracking-widest uppercase">
            COMING SOON
          </span>
          <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-slate-950 animate-spin-slow" />
        </div>
      </motion.div>

      {/* 6. Festival Details & Heritage Context */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-5 sm:mt-6 text-amber-100/90 max-w-xl text-xs sm:text-sm font-sans leading-relaxed"
      >
        <p className="font-semibold text-amber-200">
          The Annual Cultural Festival of Malaviya National Institute of Technology (MNIT), Jaipur
        </p>
        <p className="text-amber-200/70 text-xs mt-1">
          3 Days of Electrifying Music, Rajasthani Folk Spectacles, High-Voltage Dance & Cinema Extravaganza
        </p>
      </motion.div>

      {/* 7. Action Strip: RSVP Notification Form & Social Share */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.15 }}
        className="mt-6 sm:mt-8 w-full max-w-md flex flex-col items-center space-y-3"
      >
        {!isSubscribed ? (
          <form
            onSubmit={handleSubscribe}
            className="w-full flex items-center bg-slate-900/90 border-2 border-amber-500/60 rounded-full p-1 shadow-lg"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter email for fest pass drops..."
              className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-amber-100 placeholder:text-amber-200/40 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center space-x-1.5 transition-colors whitespace-nowrap"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Notify Me</span>
            </button>
          </form>
        ) : (
          <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Aapka naam darj ho gaya! We will notify you when passes launch! 🎟️</span>
          </div>
        )}

        <div className="flex items-center space-x-3 text-xs text-amber-200">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 hover:bg-slate-800 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedLink ? 'Poster Link Copied!' : 'Share Poster'}</span>
          </button>

          <button
            onClick={onToggleAudio}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 hover:bg-slate-800 transition-colors"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>Audio: Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Audio: Live 🔊</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
