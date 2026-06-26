import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playHover, playSuccess } from '../utils/audioManager';

const notes = [
  { note: 'C5', freq: 523.25 },
  { note: 'B4', freq: 493.88 },
  { note: 'A4', freq: 440.00 },
  { note: 'G4', freq: 392.00 },
  { note: 'F4', freq: 349.23 },
  { note: 'E4', freq: 329.63 },
  { note: 'D4', freq: 293.66 },
  { note: 'C4', freq: 261.63 }
];

const SynthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [oscType, setOscType] = useState('sine');
  const [audioCtx, setAudioCtx] = useState(null);
  const [mode, setMode] = useState('keyboard'); // keyboard or sequencer
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(130);
  
  // Sequencer Grid State: Mapping note names to 8-step boolean arrays
  const [grid, setGrid] = useState(() => {
    const g = {};
    notes.forEach((n) => {
      // Initialize with a simple pre-set rhythm (like a C major arpeggio or beat)
      g[n.note] = Array(8).fill(false);
    });
    // Add default sequence
    g['C4'][0] = true;
    g['E4'][2] = true;
    g['G4'][4] = true;
    g['C5'][6] = true;
    return g;
  });

  useEffect(() => {
    const handleToggle = (e) => {
      setIsOpen(e.detail.active);
    };
    window.addEventListener('synth-toggle', handleToggle);
    return () => window.removeEventListener('synth-toggle', handleToggle);
  }, []);

  const playTone = (freq) => {
    try {
      let ctx = audioCtx;
      if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioCtx(ctx);
      }
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = oscType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Volume envelope to prevent popping
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (err) {
      console.warn("AudioContext failed to initialize:", err);
    }
  };

  // Sequencer Playback Tick Loop
  useEffect(() => {
    let timer = null;
    if (isPlaying && isOpen) {
      const stepDurationMs = (60 / bpm) * 1000 / 2; // 8th notes
      timer = setInterval(() => {
        setCurrentStep((prevStep) => {
          const nextStep = (prevStep + 1) % 8;
          // Play notes triggered on the next step
          notes.forEach((n) => {
            if (grid[n.note][nextStep]) {
              playTone(n.freq);
            }
          });
          return nextStep;
        });
      }, stepDurationMs);
    } else {
      setCurrentStep(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, bpm, grid, isOpen, oscType, audioCtx]);

  const toggleGridCell = (note, stepIndex) => {
    playClick();
    setGrid((prev) => {
      const nextGrid = { ...prev };
      nextGrid[note] = [...nextGrid[note]];
      nextGrid[note][stepIndex] = !nextGrid[note][stepIndex];
      return nextGrid;
    });
  };

  const handleClearGrid = () => {
    playClick();
    setGrid(() => {
      const g = {};
      notes.forEach((n) => {
        g[n.note] = Array(8).fill(false);
      });
      return g;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="proj-modal-overlay active" 
          onClick={() => { playClick(); setIsPlaying(false); setIsOpen(false); }}
          style={{ zIndex: 100060 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="proj-modal-card" 
            style={{ maxWidth: '620px', width: '95%', padding: '24px', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="telemetry-label">[AUDIO_TELEMETRY_SYNTH]</span>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '4px', color: 'var(--text-primary)' }}>Playable Retro Synthesizer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '18px' }}>
              Web Audio API Oscillator synthesizer. Play live notes or program patterns.
            </p>

            {/* Mode and Wave Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Mode Switcher */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', padding: '3px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => { playClick(); setMode('keyboard'); setIsPlaying(false); }}
                  style={{ padding: '6px 14px', fontSize: '0.72rem', borderRadius: '15px', cursor: 'pointer', background: mode === 'keyboard' ? 'var(--accent-gradient)' : 'transparent', color: mode === 'keyboard' ? '#000' : 'var(--text-secondary)', fontWeight: mode === 'keyboard' ? 'bold' : 'normal' }}
                >
                  Live Keys
                </button>
                <button
                  onClick={() => { playClick(); setMode('sequencer'); }}
                  style={{ padding: '6px 14px', fontSize: '0.72rem', borderRadius: '15px', cursor: 'pointer', background: mode === 'sequencer' ? 'var(--accent-gradient)' : 'transparent', color: mode === 'sequencer' ? '#000' : 'var(--text-secondary)', fontWeight: mode === 'sequencer' ? 'bold' : 'normal' }}
                >
                  Sequencer
                </button>
              </div>

              {/* Wave Type selector */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['sine', 'square', 'sawtooth', 'triangle'].map((type) => (
                  <button
                    key={type}
                    onClick={() => { playClick(); setOscType(type); }}
                    style={{
                      textTransform: 'capitalize',
                      padding: '5px 10px',
                      fontSize: '0.68rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: oscType === type ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255,255,255,0.01)',
                      color: oscType === type ? 'var(--accent-cyan)' : 'var(--text-muted)'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyboard Mode Interface */}
            {mode === 'keyboard' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {notes.map((n) => (
                  <button
                    key={n.note}
                    onClick={() => playTone(n.freq)}
                    className="glass-card"
                    style={{
                      padding: '16px 0',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(255,255,255,0.01)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={playHover}
                  >
                    {n.note}
                  </button>
                ))}
              </div>
            )}

            {/* Sequencer Mode Interface */}
            {mode === 'sequencer' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {/* Sequencer Playback Toolbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.01)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => { playClick(); setIsPlaying(!isPlaying); }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        background: isPlaying ? '#ff4a4a' : 'var(--accent-gradient)',
                        color: '#000'
                      }}
                    >
                      {isPlaying ? 'STOP' : 'START'}
                    </button>
                    <button
                      onClick={handleClearGrid}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>TEMPO: {bpm} BPM</span>
                    <input
                      type="range"
                      min="60"
                      max="220"
                      value={bpm}
                      onChange={(e) => setBpm(parseInt(e.target.value))}
                      style={{ width: '100px', accentColor: 'var(--accent-cyan)' }}
                    />
                  </div>
                </div>

                {/* 8-Step Timeline Indicator */}
                <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(8, 1fr)', gap: '6px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'transparent', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>Sync</div>
                  {Array(8).fill(null).map((_, stepIdx) => (
                    <div
                      key={stepIdx}
                      style={{
                        height: '4px',
                        borderRadius: '2px',
                        background: isPlaying && currentStep === stepIdx ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.06)',
                        boxShadow: isPlaying && currentStep === stepIdx ? '0 0 6px var(--accent-cyan)' : 'none'
                      }}
                    />
                  ))}
                </div>

                {/* Sequencer Grid rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {notes.map((n) => (
                    <div key={n.note} style={{ display: 'grid', gridTemplateColumns: '80px repeat(8, 1fr)', gap: '6px', alignItems: 'center' }}>
                      <div
                        onClick={() => playTone(n.freq)}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                          textAlign: 'right',
                          paddingRight: '10px',
                          cursor: 'pointer',
                          userSelect: 'none'
                        }}
                      >
                        {n.note}
                      </div>
                      {grid[n.note].map((val, stepIdx) => (
                        <button
                          key={stepIdx}
                          onClick={() => toggleGridCell(n.note, stepIdx)}
                          style={{
                            height: '28px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.05)',
                            background: val 
                              ? 'var(--accent-gradient)' 
                              : (isPlaying && currentStep === stepIdx ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)'),
                            boxShadow: val ? '0 0 8px rgba(201, 162, 39, 0.3)' : 'none',
                            transition: 'all 0.1s ease'
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={() => { playSuccess(); setIsPlaying(false); setIsOpen(false); }}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '10px 0', fontSize: '0.85rem' }}
            >
              Close Synthesizer
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SynthModal;
