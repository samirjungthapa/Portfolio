import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playHover, playSuccess } from '../utils/audioManager';

const notes = [
  { note: 'C4', freq: 261.63 },
  { note: 'D4', freq: 293.66 },
  { note: 'E4', freq: 329.63 },
  { note: 'F4', freq: 349.23 },
  { note: 'G4', freq: 392.00 },
  { note: 'A4', freq: 440.00 },
  { note: 'B4', freq: 493.88 },
  { note: 'C5', freq: 523.25 }
];

const SynthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [oscType, setOscType] = useState('sine');
  const [audioCtx, setAudioCtx] = useState(null);

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
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (err) {
      console.warn("AudioContext failed to initialize:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="proj-modal-overlay active" 
          onClick={() => { playClick(); setIsOpen(false); }}
          style={{ zIndex: 100060 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="proj-modal-card" 
            style={{ maxWidth: '500px', width: '90%', padding: '32px', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="telemetry-label">[AUDIO_TELEMETRY_SYNTH]</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Playable Synth Sequencer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
              Web Audio API Oscillator synthesizer. Select wave dynamics and play notes:
            </p>

            {/* Wave Type selectors */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
              {['sine', 'square', 'sawtooth', 'triangle'].map((type) => (
                <button
                  key={type}
                  onClick={() => { playClick(); setOscType(type); }}
                  className={`btn btn-sm ${oscType === type ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ textTransform: 'capitalize', padding: '6px 12px', fontSize: '0.75rem', borderRadius: '15px' }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Keys Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '30px' }}>
              {notes.map((n) => (
                <button
                  key={n.note}
                  onClick={() => playTone(n.freq)}
                  className="glass-card"
                  style={{
                    padding: '20px 0',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.01)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={playHover}
                >
                  {n.note}
                </button>
              ))}
            </div>

            <button 
              onClick={() => { playSuccess(); setIsOpen(false); }}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Disconnect Audio Node
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SynthModal;
