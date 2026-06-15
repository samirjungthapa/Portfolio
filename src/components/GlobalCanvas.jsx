import { useEffect, useState } from 'react';

const GlobalCanvas = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 45; // Subtle parallax coordinates
      const y = (clientY / window.innerHeight - 0.5) * 45;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="aurora-bg" aria-hidden="true">
      {/* Blob 1 Wrapper */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.1, 0.8, 0.3, 1)'
        }}
      >
        <div className="aurora-blob aurora-blob-1" />
      </div>

      {/* Blob 2 Wrapper */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.1, 0.8, 0.3, 1)'
        }}
      >
        <div className="aurora-blob aurora-blob-2" />
      </div>

      {/* Blob 3 Wrapper */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * -0.4}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.1, 0.8, 0.3, 1)'
        }}
      >
        <div className="aurora-blob aurora-blob-3" />
      </div>
    </div>
  );
};

export default GlobalCanvas;
