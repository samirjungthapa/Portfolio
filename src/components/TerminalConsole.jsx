import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playHover } from '../utils/audioManager';

const TerminalConsole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { text: 'SYSTEM ONLINE. Type "help" to list available telemetry directives.', type: 'system' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll to terminal bottom on history updates
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
    // Listen for tilde key shortcut to open console
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen((prev) => {
          const newState = !prev;
          playClick();
          return newState;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playClick();
    const newHistory = [...history, { text: `$ ${inputVal}`, type: 'input' }];
    setInputVal('');

    let output = '';
    switch (cmd) {
      case 'help':
        output = 'DIRECTIVES:\n  help      - Print active command directory\n  about     - Output operator biographical logs\n  skills    - Print key competencies profile\n  contact   - Print locations and communications sockets\n  clear     - Wipe buffer history';
        break;
      case 'about':
        output = 'OPERATOR LOG: Samir Jung Thapa\nSECTOR: Morang, Nepal\nSTATUS: Pursuing B.Sc. (Hons) Computing at Itahari International College. Specializing in high-performance frontend interfaces.';
        break;
      case 'skills':
        output = 'KEY CAPABILITIES:\n- Frontend: React.js, JavaScript (ES6+), HTML5, CSS3\n- Databases: Node.js, MySQL, MongoDB\n- Logics: Python, Java, Git & GitHub';
        break;
      case 'contact':
        output = 'CHANNELS CONFIGURATION:\n- Email: Samirjungthapa7@gmail.com\n- Voice: 9822434711\n- Loc: Morang, Nepal';
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        output = `Command not recognized: "${cmd}". Type "help" for a directory of operations.`;
    }

    setHistory([...newHistory, { text: output, type: 'output' }]);
  };

  return (
    <>
      {/* Floating terminal trigger pill */}
      <motion.button
        onClick={() => { playClick(); setIsOpen(true); }}
        onMouseEnter={playHover}
        className="floating-terminal-trigger glass-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '30px',
          padding: '12px 20px',
          borderRadius: '50px',
          border: '1px solid rgba(226, 201, 153, 0.25)',
          background: 'rgba(15,13,12,0.85)',
          color: 'var(--accent-cyan)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '1px',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}
      >
        <i className="fa-solid fa-terminal"></i>
        <span>DIAGNOSTICS (~)</span>
      </motion.button>

      {/* Terminal popup overlay panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="terminal-overlay"
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(6,5,4,0.85)',
              backdropFilter: 'blur(16px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="terminal-console-window glass-card"
              onClick={(e) => { e.stopPropagation(); if (inputRef.current) inputRef.current.focus(); }}
              style={{
                width: '100%',
                maxWidth: '680px',
                height: '400px',
                background: 'rgba(3,3,3,0.95)',
                border: '1px solid rgba(226, 201, 153, 0.2)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0,0,0,0.8)'
              }}
            >
              {/* Terminal header */}
              <div 
                style={{ 
                  padding: '12px 20px', 
                  borderBottom: '1px solid rgba(255,255,255,0.06)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  background: 'rgba(255,255,255,0.02)' 
                }}
              >
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer' }} onClick={() => setIsOpen(false)}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span>
                </div>
                <span style={{ margin: '0 auto', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>HOST_SHELL - samir@jungthapa.dev</span>
              </div>

              {/* Console output buffer */}
              <div 
                style={{ 
                  flexGrow: 1, 
                  padding: '20px', 
                  overflowY: 'auto', 
                  fontFamily: 'Courier New, monospace', 
                  fontSize: '0.88rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '10px' 
                }}
              >
                {history.map((line, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      whiteSpace: 'pre-wrap',
                      color: line.type === 'input' ? 'var(--text-primary)' : line.type === 'system' ? 'var(--accent-cyan)' : '#4af626'
                    }}
                  >
                    {line.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Terminal input prompt */}
              <div 
                style={{ 
                  padding: '16px 20px', 
                  borderTop: '1px solid rgba(255,255,255,0.06)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  background: 'rgba(255,255,255,0.01)'
                }}
              >
                <span style={{ fontFamily: 'Courier New, monospace', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleCommand}
                  style={{
                    flexGrow: 1,
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  placeholder="Enter directive..."
                  autoFocus
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalConsole;
