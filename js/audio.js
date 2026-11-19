// Audio Engine using Web Audio API and Web Speech API
// Designed specifically for young children: soft, joyful, zero-latency, works offline!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.soundEnabled = true;
    this.voiceEnabled = true;
    this.musicEnabled = true;
    this.speechSynth = window.speechSynthesis || null;
    this.indonesianVoice = null;

    this.initVoices();
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initVoices() {
    if (!this.speechSynth) return;
    const loadVoices = () => {
      const voices = this.speechSynth.getVoices();
      // Look for Indonesian voice, fallback to any available
      this.indonesianVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID')) ||
                             voices.find(v => v.lang.startsWith('en')) || null;
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  speak(text, priority = false) {
    if (!this.voiceEnabled || !this.speechSynth) return;
    if (priority) {
      this.speechSynth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.indonesianVoice) {
      utterance.voice = this.indonesianVoice;
    }
    utterance.lang = 'id-ID';
    utterance.pitch = 1.15; // Friendly, slightly higher kid-friendly tone
    utterance.rate = 0.95;  // Slightly slower for young learners
    this.speechSynth.speak(utterance);
  }

  playPop(freq = 420) {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, now + 0.1);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playMunch() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Two rapid crunchy bites
    [0, 0.12].forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now + offset);
      osc.frequency.exponentialRampToValueAtTime(140, now + offset + 0.08);

      gain.gain.setValueAtTime(0.35, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.1);
    });
  }

  playSuccess() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Cheerful arpeggio C5 -> E5 -> G5 -> C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.38);
    });
  }

  playCheer() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Fanfare chords
    const chord1 = [523.25, 659.25, 783.99]; // C major
    const chord2 = [587.33, 739.99, 880.00]; // D major
    const chord3 = [659.25, 830.61, 987.77]; // E major
    const chordFinal = [1046.50, 1318.51, 1567.98]; // High C major

    const playChord = (chord, time, duration, vol = 0.2) => {
      chord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(vol / chord.length, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + duration);
      });
    };

    playChord(chord1, now, 0.2);
    playChord(chord2, now + 0.2, 0.2);
    playChord(chord3, now + 0.4, 0.25);
    playChord(chordFinal, now + 0.65, 0.8, 0.35);
  }

  playBoing() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(450, now + 0.15);
    osc.frequency.linearRampToValueAtTime(260, now + 0.3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.32);
  }

  playSnap() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  playGentleTryAgain() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Gentle soft downward two notes: not harsh buzz, friendly "uh-oh!"
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(400, now);
    osc1.frequency.exponentialRampToValueAtTime(320, now + 0.15);
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.16);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(320, now + 0.18);
    osc2.frequency.exponentialRampToValueAtTime(260, now + 0.35);
    gain2.gain.setValueAtTime(0.18, now + 0.18);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.18);
    osc2.stop(now + 0.36);
  }

  // Soft marimba-like background music loop
  startBGM() {
    if (this.bgmPlaying || !this.musicEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;
    this.bgmPlaying = true;

    // Cheerful pentatonic melody for young children
    const melody = [
      { note: 523.25, dur: 0.3 }, // C5
      { note: 659.25, dur: 0.3 }, // E5
      { note: 783.99, dur: 0.3 }, // G5
      { note: 880.00, dur: 0.4 }, // A5
      { note: 783.99, dur: 0.3 }, // G5
      { note: 659.25, dur: 0.3 }, // E5
      { note: 523.25, dur: 0.6 }, // C5
      { note: 587.33, dur: 0.3 }, // D5
      { note: 659.25, dur: 0.3 }, // E5
      { note: 783.99, dur: 0.4 }, // G5
      { note: 659.25, dur: 0.3 }, // E5
      { note: 587.33, dur: 0.6 }  // D5
    ];

    let currentStep = 0;

    const playNextNote = () => {
      if (!this.bgmPlaying || !this.musicEnabled) return;
      const item = melody[currentStep];

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, now);

      // Very soft, non-intrusive marimba bell envelope
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.dur * 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + item.dur);

      currentStep = (currentStep + 1) % melody.length;
      this.bgmTimer = setTimeout(playNextNote, item.dur * 1000);
    };

    playNextNote();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (!this.musicEnabled) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.musicEnabled;
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    return this.voiceEnabled;
  }
}

window.soundEngine = new SoundEngine();
