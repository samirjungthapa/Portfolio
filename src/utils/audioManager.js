let isMuted = true;

const getAudioContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return AudioContext ? new AudioContext() : null;
};

export const setMuteState = (state) => {
  isMuted = state;
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
