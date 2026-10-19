import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface SceneControllerProps {
  currentScene: number;
  totalScenes: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectScene: (scene: number) => void;
  onNextScene: () => void;
  onPrevScene: () => void;
  onReplay: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onHonk: () => void;
  className?: string;
}

const SCENE_NAMES = [
  '01 · Auto Enters',
  '02 · "Chaloge?"',
  '03 · Boarding',
  '04 · "Bas Pahunchne Wale"',
  '05 · Poster Reveal',
];

export const SceneController: React.FC<SceneControllerProps> = ({
  currentScene,
  totalScenes,
  isPlaying,
  onTogglePlay,
  onSelectScene,
  onNextScene,
  onPrevScene,
  onReplay,
  isAudioMuted,
  onToggleAudio,
  onHonk,
  className = '',
}) => {
  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl px-3 py-2.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-amber-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-100 ${className}`}
    >
      {/* Left: Playback Controls */}
      <div className="flex items-center space-x-1.5 w-full sm:w-auto justify-between sm:justify-start">
        {/* Play / Pause story movie */}
        <button
          onClick={onTogglePlay}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-md active:scale-95"
          title={isPlaying ? 'Pause Story Movie' : 'Play Cinematic Auto-Play'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span className="font-modern">{isPlaying ? 'Pause' : 'Auto Play'}</span>
        </button>

        {/* Prev scene */}
        <button
          onClick={onPrevScene}
          disabled={currentScene <= 1}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-amber-300"
          title="Previous Scene"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Next scene */}
        <button
          onClick={onNextScene}
          disabled={currentScene >= totalScenes}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-amber-300"
          title="Next Scene"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Replay */}
        <button
          onClick={onReplay}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-amber-300"
          title="Replay Story from Beginning"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Rickshaw Horn Button (Always fun!) */}
        <button
          onClick={() => {
            sound.playHorn();
            onHonk();
          }}
          className="px-2.5 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-bold flex items-center space-x-1 active:scale-95 transition-transform"
          title="Honk the Auto-Rickshaw Horn!"
        >
          <span>📯</span>
          <span className="hidden xs:inline">Honk!</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleAudio}
          className={`p-1.5 rounded-lg border transition-colors ${
            isAudioMuted
              ? 'bg-slate-900 border-slate-700 text-slate-400'
              : 'bg-amber-500/20 border-amber-500/60 text-amber-300'
          }`}
          title={isAudioMuted ? 'Turn on Sound Effects' : 'Mute Sound'}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>
      </div>

      {/* Right: Scene Stepper Indicators */}
      <div className="flex items-center space-x-1 overflow-x-auto max-w-full py-0.5">
        {Array.from({ length: totalScenes }).map((_, idx) => {
          const sceneNum = idx + 1;
          const isActive = currentScene === sceneNum;
          return (
            <button
              key={sceneNum}
              onClick={() => onSelectScene(sceneNum)}
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold shadow-md scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {sceneNum === 5 ? (
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Reveal</span>
                </span>
              ) : (
                <span>{SCENE_NAMES[idx].split(' · ')[1] || `Scene ${sceneNum}`}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
