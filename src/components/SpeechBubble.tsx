import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';

interface SpeechBubbleProps {
  speaker: 'woman' | 'driver';
  speakerName: string;
  text: string;
  delay?: number;
  direction?: 'left' | 'right';
  className?: string;
  isVisible?: boolean;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  speaker,
  speakerName,
  text,
  delay = 0,
  direction = 'left',
  className = '',
  isVisible = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      setIsDone(false);
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');
    setIsDone(false);

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayedText(text.slice(0, currentIndex));
          // typewriter audio tick every 3 chars
          if (currentIndex % 3 === 0) {
            sound.playTypewriterTick();
          }
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, 35);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [text, delay, isVisible]);

  if (!isVisible) return null;

  const isDriver = speaker === 'driver';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 10 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className={`relative max-w-xs md:max-w-md filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] ${className}`}
      >
        {/* Comic Speech Bubble Container */}
        <div
          className={`relative p-4 md:p-5 rounded-2xl md:rounded-3xl border-3 md:border-4 font-desi tracking-wide ${
            isDriver
              ? 'bg-amber-100 border-amber-600 text-slate-900'
              : 'bg-rose-50 border-rose-500 text-slate-950'
          }`}
        >
          {/* Speaker Identification Tag */}
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-md ${
                isDriver
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-rose-500 text-white shadow-sm'
              }`}
            >
              {isDriver ? '🛺 ' : '💃 '} {speakerName}
            </span>
            <span className="text-[10px] text-slate-700 font-sans tracking-tight opacity-75">
              Hinglish Dialogue
            </span>
          </div>

          {/* Dialogue Text with Typewriter Effect */}
          <p className="text-base md:text-xl font-bold leading-snug">
            {displayedText}
            {!isDone && (
              <span className="inline-block w-2 h-4 ml-1 bg-amber-600 animate-pulse align-middle" />
            )}
          </p>

          {/* Comic Pointer Tail */}
          <div
            className={`absolute -bottom-3.5 w-0 h-0 border-solid ${
              direction === 'left'
                ? 'left-8 border-t-[14px] border-r-[14px] border-b-0 border-l-0 ' +
                  (isDriver ? 'border-t-amber-600' : 'border-t-rose-500')
                : 'right-8 border-t-[14px] border-l-[14px] border-b-0 border-r-0 ' +
                  (isDriver ? 'border-t-amber-600' : 'border-t-rose-500')
            }`}
          />
          {/* Inner tail filler */}
          <div
            className={`absolute -bottom-2 w-0 h-0 border-solid ${
              direction === 'left'
                ? 'left-[34px] border-t-[10px] border-r-[10px] border-b-0 border-l-0 ' +
                  (isDriver ? 'border-t-amber-100' : 'border-t-rose-50')
                : 'right-[34px] border-t-[10px] border-l-[10px] border-b-0 border-r-0 ' +
                  (isDriver ? 'border-t-amber-100' : 'border-t-rose-50')
            }`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
