import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const linesData = [
  { text: "$ npm run dev", delay: 100, type: 'input' },
  { text: "> portfolio@0.0.0 dev", delay: 300, type: 'system' },
  { text: "> vite --host", delay: 550, type: 'system' },
  { text: "  VITE v8.0.16  ready in 248 ms", delay: 800, type: 'ready' },
  { text: "  ➜  Local:   http://localhost:5173/", delay: 1050, type: 'info' },
  { text: "  ➜  Network: use --host to expose", delay: 1150, type: 'muted' },
  { text: "  ➜  press h + enter to show help", delay: 1250, type: 'muted' },
  { text: "[info] loading dependency graph...", delay: 1500, type: 'info' },
  { text: "[success] HMR sockets resolved. Booting Samir.dev UI...", delay: 1850, type: 'success' }
];

const LoadingScreen = ({ onComplete }) => {
  const [shouldRender] = useState(() => {
    const hasVisited = typeof window !== 'undefined' ? sessionStorage.getItem('samir_visited') : null;
    return !hasVisited;
  });
  const [visibleLines, setVisibleLines] = useState([]);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (!shouldRender) {
      onComplete();
      return;
    }

    // Schedule each line to print
    const timers = linesData.map((line) => {
      return setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay);
    });

    // Schedule completion
    const completeTimer = setTimeout(() => {
      sessionStorage.setItem('samir_visited', 'true');
      setAnimationDone(true);
    }, 2500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [shouldRender, onComplete]);

  if (!shouldRender) return null;

  const getColor = (type) => {
    switch (type) {
      case 'input': return 'var(--text-primary)';
      case 'ready': return 'var(--accent-cyan)';
      case 'info': return 'var(--accent-blue)';
      case 'success': return '#4af626';
      case 'muted': return 'var(--text-muted)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!animationDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div 
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '600px',
              padding: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              background: 'rgba(8, 8, 8, 0.95)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.8)'
            }}
          >
            {/* Mock terminal top bar */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span>
              <span style={{ marginLeft: '12px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>bash - dev_server_start.sh</span>
            </div>

            {/* Terminal Lines output */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {visibleLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    color: getColor(line.type),
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
