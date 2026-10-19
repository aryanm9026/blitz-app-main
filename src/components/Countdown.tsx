import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface CountdownProps {
  targetDate: string;
  onTargetDateChange?: (newDate: string) => void;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
  totalMilliseconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  onTargetDateChange,
  className = '',
}) => {
  const [time, setTime] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
    totalMilliseconds: 0,
  });

  const [showConfig, setShowConfig] = useState(false);
  const [customDateInput, setCustomDateInput] = useState(targetDate);

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true,
          totalMilliseconds: 0,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTime({
        days,
        hours,
        minutes,
        seconds,
        isComplete: false,
        totalMilliseconds: difference,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const triggerCelebration = () => {
    sound.playCelebrationFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ec4899', '#f97316', '#e11d48', '#fbbf24', '#3b82f6'],
    });
  };

  const handleUpdateDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (onTargetDateChange) {
      onTargetDateChange(customDateInput);
      setShowConfig(false);
    }
  };

  const setTestCountdown = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    d.setHours(18, 0, 0, 0);
    const iso = d.toISOString();
    setCustomDateInput(iso);
    if (onTargetDateChange) {
      onTargetDateChange(iso);
    }
    setShowConfig(false);
  };

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const units = [
    { label: 'DAYS', value: formatNumber(time.days), sub: 'Dino Mein' },
    { label: 'HRS', value: formatNumber(time.hours), sub: 'Ghante' },
    { label: 'MIN', value: formatNumber(time.minutes), sub: 'Minute' },
    { label: 'SEC', value: formatNumber(time.seconds), sub: 'Second' },
  ];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Billboard Frame */}
      <div className="relative p-3 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-slate-950/85 backdrop-blur-md border-2 sm:border-3 border-amber-400 shadow-[0_12px_40px_rgba(0,0,0,0.85)] max-w-xl w-full mx-auto">
        {/* Ornate Rajasthani corner rivets */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm" />

        {/* 4-Part Countdown Counter Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {units.map((unit, idx) => (
            <div key={unit.label} className="flex flex-col items-center relative">
              {/* Digit Box */}
              <motion.div
                key={unit.value}
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full aspect-square sm:aspect-[4/3] rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#1b1938] via-[#100e26] to-[#080714] border-2 border-amber-500/70 flex flex-col items-center justify-center shadow-inner relative overflow-hidden group"
              >
                {/* Horizontal split-flap line */}
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-slate-950/90 shadow-sm" />

                {/* Ambient glow behind number */}
                <div className="absolute inset-0 bg-radial from-amber-500/10 to-transparent pointer-events-none" />

                {/* Big Bold Monospace Tabular Number */}
                <span className="font-modern font-black tabular-nums tracking-tight text-3xl sm:text-4xl md:text-5xl text-amber-100 group-hover:text-amber-300 transition-colors drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]">
                  {unit.value}
                </span>

                {/* Subtle Hindi sub-label */}
                <span className="text-[9px] sm:text-[10px] text-amber-400/80 font-desi -mt-1 hidden sm:block">
                  {unit.sub}
                </span>
              </motion.div>

              {/* Unit Tag: DAYS | HRS | MIN | SEC */}
              <span className="mt-2 text-[10px] sm:text-xs md:text-sm font-extrabold tracking-widest text-amber-300 font-modern uppercase">
                {unit.label}
              </span>

              {/* Colon Separator for middle columns */}
              {idx < 3 && (
                <div className="hidden sm:block absolute -right-2 md:-right-2.5 top-1/3 -translate-y-1/2 text-amber-400 font-bold text-xl pointer-events-none opacity-60">
                  :
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Date summary badge & Config trigger */}
        <div className="mt-4 pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">
              Target:{' '}
              {new Date(targetDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={triggerCelebration}
              className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center space-x-1 transition-colors"
              title="Test celebration confetti and fanfare!"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Celebrate</span>
            </button>

            <button
              onClick={() => setShowConfig(!showConfig)}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center space-x-1 transition-colors"
              title="Edit Countdown Target Date"
            >
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Edit Date</span>
            </button>
          </div>
        </div>

        {/* Inline Date Config Panel */}
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-3 rounded-xl bg-slate-900 border border-amber-500/40 text-xs"
          >
            <form onSubmit={handleUpdateDate} className="space-y-2">
              <label className="block text-amber-200 font-medium">
                Set Event Countdown Target Date (ISO format or local):
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customDateInput}
                  onChange={(e) => setCustomDateInput(e.target.value)}
                  placeholder="2027-02-19T18:00:00+05:30"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-amber-100 font-mono text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                >
                  Save
                </button>
              </div>

              {/* Quick preset buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 py-0.5">Quick presets:</span>
                <button
                  type="button"
                  onClick={() => setTestCountdown(1)}
                  className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 hover:bg-slate-700 text-[10px]"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => setTestCountdown(30)}
                  className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 hover:bg-slate-700 text-[10px]"
                >
                  +30 Days
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCustomDateInput('2027-02-19T18:00:00+05:30');
                    if (onTargetDateChange) onTargetDateChange('2027-02-19T18:00:00+05:30');
                    setShowConfig(false);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 hover:bg-slate-700 text-[10px] flex items-center space-x-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Reset Blitzschlag 2027</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};
