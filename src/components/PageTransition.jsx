import { useState, useEffect } from 'react';

const PageTransition = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleTransitionStart = () => {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 900); // Total duration of animation cycle
    };

    window.addEventListener('page-transition-trigger', handleTransitionStart);
    return () => {
      window.removeEventListener('page-transition-trigger', handleTransitionStart);
    };
  }, []);

  return (
    <div className={`page-transition-overlay ${isActive ? 'active' : ''}`} aria-hidden="true">
      <div className="wipe-bar wipe-bar-1"></div>
      <div className="wipe-bar wipe-bar-2"></div>
      <div className="wipe-bar wipe-bar-3"></div>
      <div className="wipe-logo">
        <span>Samir</span>.dev
      </div>
    </div>
  );
};

export default PageTransition;
