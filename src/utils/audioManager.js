let isMuted = true;

let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch((e) => console.warn("Failed to resume AudioContext:", e));
  }
  return audioCtx;
};

export const setMuteState = (state) => {
  isMuted = state;
  if (isMuted) {
    stopAmbientSoundtrack();
  } else {
    startAmbientSoundtrack();
  }
};

// Spatialized Click with Panning (x: -1 to 1) and Pitch Modulation (y: -1 to 1)
export const playSpatialClick = (x = 0, pitchFactor = 1) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

  osc.type = 'sine';
  // Base frequency modulated by pitch factor
  const baseFreq = 400 + (pitchFactor * 400); 
  osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

  if (panner) {
    panner.pan.setValueAtTime(Math.min(Math.max(x, -1), 1), ctx.currentTime);
    osc.connect(panner);
    panner.connect(gain);
  } else {
    osc.connect(gain);
  }
  
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.12);
};

// Spatialized Hover
export const playSpatialHover = (x = 0, pitchFactor = 1) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

  osc.type = 'sine';
  const baseFreq = 800 + (pitchFactor * 200);
  osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.018, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  if (panner) {
    panner.pan.setValueAtTime(Math.min(Math.max(x, -1), 1), ctx.currentTime);
    osc.connect(panner);
    panner.connect(gain);
  } else {
    osc.connect(gain);
  }

  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.04);
};

export const playClick = () => playSpatialClick(0, 1);
export const playHover = () => playSpatialHover(0, 1);

export const playSuccess = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
  osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5

  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start();
  osc2.start();
  osc1.stop(ctx.currentTime + 0.4);
  osc2.stop(ctx.currentTime + 0.4);
};

let ambientInterval = null;
let ambientNodes = [];

export const startAmbientSoundtrack = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopAmbientSoundtrack();

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, ctx.currentTime);
  filter.connect(ctx.destination);

  const chords = [
    [130.81, 164.81, 196.00, 246.94], // C3 Major 7th (C, E, G, B)
    [146.83, 174.61, 220.00, 261.63], // D3 Minor 7th (D, F, A, C)
    [174.61, 220.00, 261.63, 329.63]  // F3 Major 7th (F, A, C, E)
  ];
  let chordIndex = 0;

  const playChord = () => {
    if (isMuted) return;
    const activeChord = chords[chordIndex];
    chordIndex = (chordIndex + 1) % chords.length;

    activeChord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const now = ctx.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.015, now + 4);
      gainNode.gain.setValueAtTime(0.015, now + 12);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 16);

      osc.connect(gainNode);
      gainNode.connect(filter);

      osc.start(now);
      osc.stop(now + 16.1);

      ambientNodes.push({ osc, gainNode });
    });

    setTimeout(() => {
      ambientNodes = ambientNodes.filter(n => n.osc.context.currentTime < n.osc.context.currentTime + 17);
    }, 18000);
  };

  playChord();
  ambientInterval = setInterval(playChord, 14000);
};

export const stopAmbientSoundtrack = () => {
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
  ambientNodes.forEach(({ osc, gainNode }) => {
    try {
      const ctx = getAudioContext();
      if (ctx) {
        gainNode.gain.cancelScheduledValues(ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        osc.stop(ctx.currentTime + 1.3);
      } else {
        osc.stop();
      }
    } catch {
      // Ignore errors
    }
  });
  ambientNodes = [];
};

export const playThemeSound = (themeId) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  gain.connect(ctx.destination);

  if (themeId === 'brutalist') {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc2.type = 'square';
    osc1.frequency.setValueAtTime(150, now);
    osc2.frequency.setValueAtTime(225, now);
    osc1.connect(gain);
    osc2.connect(gain);
    osc1.start();
    osc2.start();
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  } else if (themeId === 'neon') {
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.3);
    osc.connect(gain);
    osc.start();
    osc.stop(now + 0.3);
  } else if (themeId === 'emerald') {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.setValueAtTime(1600, now + 0.1);
    osc.frequency.setValueAtTime(2000, now + 0.2);
    osc.connect(gain);
    osc.start();
    osc.stop(now + 0.3);
  } else {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.4);
    osc.connect(gain);
    osc.start();
    osc.stop(now + 0.4);
  }
};

