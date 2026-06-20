import { useEffect, useRef } from 'react';

const GlobalCanvas = () => {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 45; // Subtle parallax coordinates
      const y = (clientY / window.innerHeight - 0.5) * 45;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${x * 0.8}px, ${y * 0.8}px, 0)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${x * -0.6}px, ${y * -0.6}px, 0)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${x * 0.4}px, ${y * -0.4}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="aurora-bg" aria-hidden="true">
      {/* Blob 1 Wrapper */}
      <div 
        ref={blob1Ref}
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate3d(0px, 0px, 0)',
          transition: 'transform 0.5s cubic-bezier(0.1, 0.8, 0.3, 1)'
        }}
      >
        <div className="aurora-blob aurora-blob-1" />
      </div>

      {/* Blob 2 Wrapper */}
      <div 
        ref={blob2Ref}
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate3d(0px, 0px, 0)',
          transition: 'transform 0.5s cubic-bezier(0.1, 0.8, 0.3, 1)'
        }}
      >
        <div className="aurora-blob aurora-blob-2" />
      </div>

      {/* Blob 3 Wrapper */}
      <div 
        ref={blob3Ref}
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate3d(0px, 0px, 0)',
          transition: 'transform 0.5s cubic-bezier(0.1, 0.8, 0.3, 1)'
        }}
      >
        <div className="aurora-blob aurora-blob-3" />
      </div>
    </div>
  );
};

export default GlobalCanvas;
