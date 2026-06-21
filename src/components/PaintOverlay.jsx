import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playSuccess } from '../utils/audioManager';

const PaintOverlay = () => {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState('#C9A227'); // Default theme accent
  const [isDrawing, setIsDrawing] = useState(false);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 4;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const handleToggle = (e) => {
      setIsActive(e.detail.active);
      if (e.detail.active) {
        setTimeout(resizeCanvas, 100);
      }
    };

    const handleClear = () => {
      clearCanvas();
    };

    window.addEventListener('paint-toggle', handleToggle);
    window.addEventListener('paint-clear', handleClear);

    return () => {
      window.removeEventListener('paint-toggle', handleToggle);
      window.removeEventListener('paint-clear', handleClear);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;

    ctx.lineTo(clientX, clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clientX, clientY);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100050,
            pointerEvents: 'none'
          }}
        >
          {/* Controls Header HUD */}
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="glass-card"
            style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px 20px',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(8, 8, 8, 0.95)',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              pointerEvents: 'auto',
              zIndex: 10,
              boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
            }}
          >
            <span className="telemetry-label" style={{ fontSize: '0.65rem' }}>[PAINT_MODE]</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['#C9A227', '#ff007f', '#10b981', '#00f2fe'].map((c) => (
                <button
                  key={c}
                  onClick={() => { playClick(); setColor(c); }}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: c,
                    border: color === c ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transform: color === c ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.2s ease'
                  }}
                  title={`Color: ${c}`}
                />
              ))}
            </div>
            <button 
              onClick={() => { playClick(); clearCanvas(); }}
              className="btn btn-secondary btn-sm"
              style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '20px' }}
            >
              Clear Canvas
            </button>
            <button 
              onClick={() => { playSuccess(); setIsActive(false); }}
              className="btn btn-primary btn-sm"
              style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '20px' }}
            >
              Exit Paint
            </button>
          </motion.div>

          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            style={{
              position: 'absolute',
              inset: 0,
              cursor: 'crosshair',
              pointerEvents: 'auto'
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaintOverlay;
