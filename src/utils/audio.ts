/**
 * Cute synthesized sound effects using Web Audio API
 * Zero external audio file latency or loading failures.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private isMelodyPlaying: boolean = false;
  private melodyTimeouts: number[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trung_birthday_muted');
      if (saved === 'true') {
        this.isMuted = true;
      }
    }
  }

  private initCtx() {
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('trung_birthday_muted', this.isMuted ? 'true' : 'false');
    }
    if (this.isMuted) {
      this.stopBirthdayMelody();
    } else {
      this.playPop();
    }
    return this.isMuted;
  }

  /** Cute bubbly button click pop */
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // AudioContext not allowed yet
    }
  }

  /** Adorable cat meow sound */
  public playMeow() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch contour of a sweet meow: starts high, dips, then softly glides
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.linearRampToValueAtTime(780, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.38);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // ignore
    }
  }

  /** Success fanfare chime */
  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);

        gain.gain.setValueAtTime(0.001, now + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.25, now + i * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.36);
      });
    } catch {
      // ignore
    }
  }

  /** Shimmering sparkles */
  public playSparkle() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [880, 1174.66, 1396.91, 1760, 2093];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.12, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.23);
      });
    } catch {
      // ignore
    }
  }

  /** Soft error boing */
  public playError() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // ignore
    }
  }

  /** Cute music-box Happy Birthday melody */
  public playBirthdayMelody() {
    if (this.isMuted) return;
    if (this.isMelodyPlaying) {
      this.stopBirthdayMelody();
      return;
    }
    const ctx = this.initCtx();
    if (!ctx) return;

    this.isMelodyPlaying = true;

    // Happy Birthday notes (frequency in Hz, duration in beats)
    // Key of C: C4, C4, D4, C4, F4, E4
    const melody: [number, number][] = [
      [261.63, 0.75], // C4
      [261.63, 0.25], // C4
      [293.66, 1],    // D4
      [261.63, 1],    // C4
      [349.23, 1],    // F4
      [329.63, 2],    // E4

      [261.63, 0.75], // C4
      [261.63, 0.25], // C4
      [293.66, 1],    // D4
      [261.63, 1],    // C4
      [392.00, 1],    // G4
      [349.23, 2],    // F4

      [261.63, 0.75], // C4
      [261.63, 0.25], // C4
      [523.25, 1],    // C5
      [440.00, 1],    // A4
      [349.23, 1],    // F4
      [329.63, 1],    // E4
      [293.66, 1.5],  // D4

      [466.16, 0.75], // Bb4
      [466.16, 0.25], // Bb4
      [440.00, 1],    // A4
      [349.23, 1],    // F4
      [392.00, 1],    // G4
      [349.23, 2.5]   // F4
    ];

    const beatDuration = 0.38; // seconds per beat
    let timeOffset = 0;

    melody.forEach(([freq, duration]) => {
      const playTime = timeOffset;
      const timeoutId = window.setTimeout(() => {
        if (!this.isMelodyPlaying || this.isMuted) return;
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Glockenspiel / music box envelope
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration * beatDuration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + duration * beatDuration + 0.05);
        } catch {
          // ignore
        }
      }, playTime * 1000);

      this.melodyTimeouts.push(timeoutId);
      timeOffset += duration * beatDuration;
    });

    // Reset when melody finishes
    const endTimeout = window.setTimeout(() => {
      this.isMelodyPlaying = false;
      this.melodyTimeouts = [];
    }, timeOffset * 1000);
    this.melodyTimeouts.push(endTimeout);
  }

  public stopBirthdayMelody() {
    this.isMelodyPlaying = false;
    this.melodyTimeouts.forEach(id => clearTimeout(id));
    this.melodyTimeouts = [];
  }

  public getMelodyState(): boolean {
    return this.isMelodyPlaying;
  }
}

export const soundManager = new SoundManager();
