/**
 * Web Audio API synthesizer for retro Indian auto-rickshaw sounds and festival fanfare.
 * 100% self-contained without external audio assets.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  public isMuted: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopEngine();
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.isMuted) {
      this.stopEngine();
    }
  }

  /**
   * Cheerful Indian Auto-Rickshaw Bulb Horn: "Pom-Pom!"
   */
  public playHorn() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const playPip = (delay: number, freq: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.9, ctx.currentTime + delay + 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.15);
    };

    playPip(0, 360);
    playPip(0.12, 380);
  }

  /**
   * Auto-rickshaw 2-stroke engine putt-putt sputter
   */
  public startEngine(speed: 'idle' | 'driving' = 'idle') {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    if (this.engineOsc) {
      // adjust rate
      const freq = speed === 'driving' ? 65 : 45;
      this.engineOsc.frequency.setTargetAtTime(freq, ctx.currentTime, 0.1);
      return;
    }

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(speed === 'driving' ? 65 : 45, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      this.engineOsc = osc;
      this.engineGain = gain;
    } catch {
      // ignore
    }
  }

  public stopEngine() {
    if (this.engineOsc) {
      try {
        this.engineOsc.stop();
        this.engineOsc.disconnect();
      } catch {
        // ignore
      }
      this.engineOsc = null;
      this.engineGain = null;
    }
  }

  /**
   * Celebratory Dhol & Chime fanfare when poster reveals!
   */
  public playCelebrationFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Dhol bass beats
    const playBassBeat = (time: number, freq: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + time + 0.25);

      gain.gain.setValueAtTime(0.4, ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + 0.26);
    };

    // Chime chords
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 1.3);
    });

    playBassBeat(0.0, 110);
    playBassBeat(0.2, 90);
    playBassBeat(0.35, 120);
    playBassBeat(0.55, 90);
  }

  /**
   * Typewriter tick for dialogue
   */
  public playTypewriterTick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  }
}

export const sound = new SoundController();
