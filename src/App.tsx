/**
 * BLITZSCHLAG 2027 — The Animated Coming Soon Experience
 * An animated Indian short film & retro cinema poster reveal.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoRickshaw } from './components/AutoRickshaw';
import { IndianWoman } from './components/IndianWoman';
import { SpeechBubble } from './components/SpeechBubble';
import { StreetScenery } from './components/StreetScenery';
import { SunburstBackground } from './components/SunburstBackground';
import { FinalPosterReveal } from './components/FinalPosterReveal';
import { TextileBorder } from './components/TextileBorder';
import { SceneController } from './components/SceneController';
import { COUNTDOWN_TARGET_DATE, STORY_SCRIPT, FESTIVAL_INFO } from './config';
import { sound } from './utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Compass, Film, Music, Info, X } from 'lucide-react';

export default function App() {
  // Current active scene (1 to 5)
  const [currentScene, setCurrentScene] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [targetDate, setTargetDate] = useState<string>(COUNTDOWN_TARGET_DATE);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [showFestInfoModal, setShowFestInfoModal] = useState<boolean>(false);
  const [honkAlert, setHonkAlert] = useState<string | null>(null);

  // Scroll tracking container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-play interval timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentScene((prev) => {
          if (prev < 5) {
            return (prev + 1) as 1 | 2 | 3 | 4 | 5;
          } else {
            setIsPlaying(false);
            return 5;
          }
        });
      }, 4200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Audio & scene sound coordination
  useEffect(() => {
    if (currentScene === 1) {
      sound.startEngine('driving');
      const stopT = setTimeout(() => {
        sound.startEngine('idle');
      }, 1600);
      return () => clearTimeout(stopT);
    } else if (currentScene === 3) {
      sound.startEngine('driving');
    } else if (currentScene === 4) {
      sound.startEngine('driving');
    } else if (currentScene === 5) {
      sound.stopEngine();
      sound.playCelebrationFanfare();
      // Grand Reveal Confetti Burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#ec4899', '#ef4444', '#fbbf24', '#8b5cf6'],
      });
    } else {
      sound.startEngine('idle');
    }
  }, [currentScene]);

  // Handle Scroll to scrub between scenes
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;

    const scrollFraction = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

    // Map 0 -> 1 scrollFraction to scenes 1 -> 5
    let target: 1 | 2 | 3 | 4 | 5 = 1;
    if (scrollFraction < 0.2) target = 1;
    else if (scrollFraction < 0.42) target = 2;
    else if (scrollFraction < 0.65) target = 3;
    else if (scrollFraction < 0.88) target = 4;
    else target = 5;

    if (target !== currentScene) {
      setCurrentScene(target);
    }
  };

  const jumpToScene = (sceneNum: number) => {
    const s = Math.min(Math.max(sceneNum, 1), 5) as 1 | 2 | 3 | 4 | 5;
    setCurrentScene(s);

    // Sync scroll container
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const fraction = (s - 1) / 4;
      scrollContainerRef.current.scrollTo({
        top: maxScroll * fraction,
        behavior: 'smooth',
      });
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleAudio = () => {
    const newMuted = sound.toggleMute();
    setIsAudioMuted(newMuted);
  };

  const handleHonk = () => {
    setHonkAlert('POM-POM! 📯 Rasta do, Blitzschlag jana hai!');
    setTimeout(() => setHonkAlert(null), 2500);
  };

  const handleReplay = () => {
    jumpToScene(1);
    setIsPlaying(true);
  };

  // Positions and animation parameters based on scene
  // Scene 1: Auto enters from -200px to ~15% screen width; woman is at ~65%
  // Scene 2: Auto stopped beside woman (~35%), first dialogue
  // Scene 3: Woman walks towards auto and steps inside (woman boards); auto begins forward motion
  // Scene 4: Auto driving across street (~45% - 60%), second dialogue
  // Scene 5: Auto halts center stage in foreground; grand poster composition reveals!

  const isAutoMoving = currentScene === 1 || currentScene === 3 || currentScene === 4;
  const isWomanBoarded = currentScene >= 3;
  const isPosterRevealed = currentScene === 5;

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-[#070b19] font-sans text-amber-50 selection:bg-amber-400 selection:text-slate-950"
    >
      {/* =========================================================================
          TOP NAVIGATION BAR (Strict 3-zone contract)
          [Brand title] — [4 nav links] — [1 primary action]
      ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-8 px-4 sm:px-8 py-3 bg-slate-950/85 backdrop-blur-md border-b border-amber-500/30">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => jumpToScene(1)}
          className="text-base sm:text-lg font-poster font-bold tracking-wider text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center space-x-2"
        >
          <span>BLITZSCHLAG 2027</span>
          <span className="hidden md:inline text-xs font-desi text-rose-400 font-normal">
            · जयपुर का रंगमंच
          </span>
        </button>

        {/* Zone 2: 4 single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-amber-100/80">
          <button
            onClick={() => jumpToScene(1)}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
              currentScene === 1 ? 'text-amber-400 font-bold border-b border-amber-400' : ''
            }`}
          >
            Street Arrival
          </button>
          <button
            onClick={() => jumpToScene(2)}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
              currentScene === 2 ? 'text-amber-400 font-bold border-b border-amber-400' : ''
            }`}
          >
            The Dialogue
          </button>
          <button
            onClick={() => jumpToScene(3)}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
              currentScene === 3 || currentScene === 4 ? 'text-amber-400 font-bold border-b border-amber-400' : ''
            }`}
          >
            Auto Journey
          </button>
          <button
            onClick={() => jumpToScene(5)}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
              currentScene === 5 ? 'text-amber-400 font-bold border-b border-amber-400' : ''
            }`}
          >
            Countdown Poster
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowFestInfoModal(true)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-[0_2px_12px_rgba(245,158,11,0.4)] whitespace-nowrap shrink-0 active:scale-95"
          >
            Festival Intel
          </button>
        </div>
      </header>

      {/* Rajasthani Folk-Art Textile Top Border */}
      <div className="fixed top-12 left-0 right-0 z-40">
        <TextileBorder position="top" />
      </div>

      {/* =========================================================================
          PINNED CINEMATIC STAGE (Fixed Viewport Canvas)
          All animations, characters, auto-rickshaw, dialogue, and poster reveal
      ========================================================================= */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-16 pb-20">
        {/* Scenery Layer: Deep Street Sky, Distant Skyline, Tea Stall & Projector */}
        <StreetScenery
          parallaxOffset={currentScene * 80}
          className={`transition-opacity duration-700 ${isPosterRevealed ? 'opacity-30' : 'opacity-100'}`}
        />

        {/* Dramatic Golden Sunburst (Revealed in Scene 5) */}
        <SunburstBackground
          isActive={isPosterRevealed}
          progress={isPosterRevealed ? 1 : 0}
        />

        {/* Vintage Film Projector Spotlight Cone across screen in Scene 5 */}
        {isPosterRevealed && (
          <div
            className="absolute top-0 right-10 w-[600px] h-full pointer-events-none opacity-25 animate-beam-pulse z-10"
            style={{
              background: 'radial-gradient(ellipse at top right, rgba(254,240,138,0.5), transparent 75%)',
              clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)',
            }}
          />
        )}

        {/* Film grain texture */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40 z-20" />

        {/* Active Scene Indicator Badge in Viewport (Top Right) */}
        <div className="absolute top-24 right-4 sm:right-8 z-30 pointer-events-none flex flex-col items-end">
          <div className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-[11px] font-desi text-amber-300 shadow-md">
            {currentScene === 1 && '🎬 दृश्य ०१ : ऑटो का आगमन'}
            {currentScene === 2 && '🎬 दृश्य ०२ : "ब्लिट्ज़श्लाग चलोगे?"'}
            {currentScene === 3 && '🎬 दृश्य ०३ : सफर की शुरुआत'}
            {currentScene === 4 && '🎬 दृश्य ०४ : "पहुंचने ही वाले हैं"'}
            {currentScene === 5 && '🌟 दृश्य ०५ : भव्य पोस्टर अनावरण'}
          </div>
          <span className="text-[10px] text-amber-200/60 mt-0.5 font-sans">
            Scroll down or use auto play
          </span>
        </div>

        {/* Honk banner alert feedback */}
        <AnimatePresence>
          {honkAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              className="absolute top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-amber-400 text-slate-950 font-desi font-bold text-sm shadow-2xl border-2 border-amber-600 pointer-events-none"
            >
              {honkAlert}
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            STAGE CONTENT AREA: SPEECH BUBBLES & POSTER REVEAL
        ========================================================================= */}
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center px-4">
          {/* SCENE 2: FIRST DIALOGUE SPEECH BUBBLES */}
          {currentScene === 2 && (
            <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
              {/* Woman's Dialogue */}
              <SpeechBubble
                speaker="woman"
                speakerName="Madam"
                text={STORY_SCRIPT.scene2.womanText}
                delay={0.2}
                direction="right"
                className="self-center md:self-start md:ml-12"
              />

              {/* Driver's Reply */}
              <SpeechBubble
                speaker="driver"
                speakerName="Auto Bhaiya"
                text={STORY_SCRIPT.scene2.driverText}
                delay={1.3}
                direction="left"
                className="self-center md:self-end md:mr-12"
              />
            </div>
          )}

          {/* SCENE 4: DESTINATION EN-ROUTE SPEECH BUBBLES */}
          {currentScene === 4 && (
            <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 my-auto">
              {/* Woman questioning ETA */}
              <SpeechBubble
                speaker="woman"
                speakerName="Madam"
                text={STORY_SCRIPT.scene4.womanText}
                delay={0.2}
                direction="right"
                className="self-center md:self-start md:ml-12"
              />

              {/* Driver reassuring */}
              <SpeechBubble
                speaker="driver"
                speakerName="Auto Bhaiya"
                text={STORY_SCRIPT.scene4.driverText}
                delay={1.3}
                direction="left"
                className="self-center md:self-end md:mr-12"
              />
            </div>
          )}

          {/* SCENE 5: THE GRAND POSTER REVEAL */}
          {isPosterRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full my-auto py-2"
            >
              <FinalPosterReveal
                targetDate={targetDate}
                onTargetDateChange={(newDate) => setTargetDate(newDate)}
                isAudioMuted={isAudioMuted}
                onToggleAudio={handleToggleAudio}
              />
            </motion.div>
          )}
        </div>

        {/* =========================================================================
            CHARACTERS & VEHICLE ANIMATION LAYER (Auto + Woman)
        ========================================================================= */}
        <div className="relative z-30 w-full h-44 sm:h-56 md:h-64 pointer-events-none mb-4">
          {/* AUTO-RICKSHAW */}
          <motion.div
            className="absolute bottom-4 pointer-events-auto"
            initial={false}
            animate={
              currentScene === 1
                ? {
                    // Enters from left and halts beside woman
                    x: ['-25vw', '18vw'],
                  }
                : currentScene === 2
                ? {
                    // Parked beside woman
                    x: '24vw',
                  }
                : currentScene === 3
                ? {
                    // Woman boarding, starts gentle forward roll
                    x: '28vw',
                  }
                : currentScene === 4
                ? {
                    // Driving across street
                    x: ['28vw', '52vw'],
                  }
                : {
                    // Final Poster Reveal: Center stage in foreground!
                    x: 'calc(50vw - 180px)',
                    scale: 0.95,
                  }
            }
            transition={{
              type: 'spring',
              damping: 22,
              stiffness: 120,
              duration: currentScene === 1 || currentScene === 4 ? 2.2 : 0.8,
            }}
          >
            <AutoRickshaw
              isMoving={isAutoMoving}
              womanBoarded={isWomanBoarded}
              onHonk={handleHonk}
              showLightBeam={!isPosterRevealed}
            />
          </motion.div>

          {/* INDIAN WOMAN (Waiting on street in Scene 1 & 2, Walking to board in Scene 3) */}
          {!isWomanBoarded && (
            <motion.div
              className="absolute bottom-4 pointer-events-auto"
              initial={false}
              animate={
                currentScene === 1
                  ? {
                      x: '64vw',
                      opacity: 1,
                    }
                  : currentScene === 2
                  ? {
                      x: '62vw',
                      opacity: 1,
                    }
                  : {
                      // Scene 3: Walking to auto door and fading into the cabin
                      x: '38vw',
                      opacity: [1, 0.4, 0],
                    }
              }
              transition={{
                duration: currentScene === 3 ? 1.4 : 0.6,
                ease: 'easeInOut',
              }}
            >
              <IndianWoman
                isWalking={currentScene === 3}
                isWaving={currentScene === 1 || currentScene === 2}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Rajasthani Folk-Art Textile Bottom Border */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <TextileBorder position="bottom" />
      </div>

      {/* Transport Bar & Scene Controls (Auto-Play, Stepper, Horn, Audio Toggle) */}
      <SceneController
        currentScene={currentScene}
        totalScenes={5}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onSelectScene={jumpToScene}
        onNextScene={() => jumpToScene(currentScene + 1)}
        onPrevScene={() => jumpToScene(currentScene - 1)}
        onReplay={handleReplay}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onHonk={handleHonk}
      />

      {/* =========================================================================
          SCROLL SPACER TRACK
          Enables natural vertical scrolling to progress through 5 scenes
      ========================================================================= */}
      <div className="h-[480vh] w-full pointer-events-none" aria-hidden="true" />

      {/* =========================================================================
          FESTIVAL INTEL & DETAILS MODAL
      ========================================================================= */}
      <AnimatePresence>
        {showFestInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-lg w-full bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 text-amber-50 shadow-2xl overflow-hidden"
            >
              {/* Modal Scallop Decor */}
              <div className="h-2 w-full bg-gradient-to-r from-red-600 via-amber-400 to-rose-600 -mx-6 -mt-6 mb-5" />

              <button
                onClick={() => setShowFestInfoModal(false)}
                className="absolute top-5 right-5 p-1 rounded-full bg-slate-800 text-amber-300 hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-amber-400 text-xs uppercase tracking-widest font-bold mb-1">
                <Compass className="w-4 h-4" />
                <span>Malaviya National Institute of Technology Jaipur</span>
              </div>

              <h3 className="text-3xl font-poster font-bold text-amber-300 mb-2">
                BLITZSCHLAG 2027
              </h3>

              <p className="text-xs text-amber-200/80 leading-relaxed mb-4">
                {FESTIVAL_INFO.themeDescription}
              </p>

              <div className="space-y-3 border-y border-amber-500/20 py-4 my-4 text-xs">
                <div className="flex items-start space-x-2">
                  <Film className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-200">Cinematic Legacy: </span>
                    <span className="text-amber-100/70">
                      Celebrating retro Indian cinema artistry, Rajasthani hand-painted billboards, and timeless Bollywood folk aesthetics.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Music className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-200">Star Pro-Nites: </span>
                    <span className="text-amber-100/70">
                      Bollywood headliners, EDM fusion, Sufi trance, classical jugalbandi, and street theatre championships.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-200">Official Dates: </span>
                    <span className="text-amber-100/70 font-mono">
                      February 19–21, 2027 · MNIT Campus, JLN Marg, Jaipur, Rajasthan
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[11px] text-amber-300/60 font-desi">
                  पधारो म्हारे देस 🏵️
                </span>
                <button
                  onClick={() => setShowFestInfoModal(false)}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Close & Explore
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
