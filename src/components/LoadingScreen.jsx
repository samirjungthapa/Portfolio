import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('samir_visited');
    if (!hasVisited) {
      setShouldRender(true);
    } else {
      onComplete();
    }
  }, [onComplete]);

  if (!shouldRender) return null;

  const word = "SAMIR";

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
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            {word.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.8 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '4.5rem',
                  fontWeight: '800',
                  letterSpacing: '2px',
                  color: '#FFFFFF'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, #C9A227, #E5C76B)',
              marginTop: '20px'
            }}
            onAnimationComplete={() => {
              setTimeout(() => {
                sessionStorage.setItem('samir_visited', 'true');
                setAnimationDone(true);
              }, 400);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
