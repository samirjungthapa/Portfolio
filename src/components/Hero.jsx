import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Magnetic from './Magnetic';
import videoBg from '../video';

const subtitles = [
  "Frontend Developer",
  "Computing Student",
  "Freelancer",
  "React Developer",
  "UI/UX Enthusiast"
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  // Motion values for 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  const rx = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const ry = useSpring(rotateY, { stiffness: 180, damping: 20 });

  const rectRef = useRef(null);

  // Rotate roles every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    setIsLoaded(true);
    return () => clearInterval(timer);
  }, []);

  const handleMouseEnter3D = (e) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove3D = (e) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const width = rect.width;
    const height = rect.height;
    // Mouse coords centered around the element mid-point
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave3D = () => {
    rectRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Headline split characters
  const headlineWords = "Samir Jung Thapa".split(" ");

  return (
    <section id="home" ref={sectionRef} className="hero-section hero-spotlight">
      {/* Video Background Layer */}
      <div className="video-background-container">
        <video 
          className="video-foreground" 
          src={videoBg} 
          autoPlay 
          loop 
          muted 
          playsInline
        />
        <video 
          className="video-ambient-blur" 
          src={videoBg} 
          autoPlay 
          loop 
          muted 
          playsInline
          aria-hidden="true"
        />
        <div className="cinematic-overlay-gradient"></div>
      </div>

      <div className="hero-background">
        <div className="grid-overlay"></div>
      </div>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Left Side: Editorial copywriting & CTAs */}
        <div className="hero-content">
          {/* Availability Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="availability-badge"
          >
            <span className="avail-dot"></span>
            Open to Freelance Work
          </motion.div>

          {/* Main Headline (Split-Word Reveal with Blur) */}
          <h1 className="hero-name" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {headlineWords.map((word, wordIdx) => (
              <span key={wordIdx} style={{ display: 'inline-block', overflow: 'hidden' }}>
                <motion.span
                  initial={{ y: "100%", filter: "blur(6px)", opacity: 0 }}
                  animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + wordIdx * 0.15,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Rolodex Text Wheel Subtitle */}
          <h2 className="hero-title" style={{ marginTop: '10px', minHeight: '1.4em', display: 'flex', alignItems: 'center' }}>
            <span className="rolodex-container">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 30, filter: "blur(4px)", opacity: 0 }}
                  animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
                  exit={{ y: -30, filter: "blur(4px)", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="gradient-text"
                  style={{ display: 'inline-block' }}
                >
                  {subtitles[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="hero-intro"
          >
            A passionate Frontend Developer and B.Sc. (Hons) Computing student from Nepal. I craft modern, responsive, and user-friendly web experiences using React, JavaScript, and cutting-edge CSS.
          </motion.p>

          {/* Staggered CTAs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="hero-actions"
          >
            <Magnetic>
              <a href="#projects" className="btn btn-primary">
                View Projects <i className="fa-solid fa-arrow-right"></i>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
            </Magnetic>
            <Magnetic>
              <a href="assets/resume.html" className="btn btn-tertiary" target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-download"></i> Download CV
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Side: Portrait Area with 3D Tilt Frame and Drifting Physics Badges */}
        <div className="hero-avatar-area" style={{ perspective: 1200 }}>
          {/* Floating badge 1 */}
          <motion.div 
            animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="floating-badge badge-1"
          >
            <i className="fa-solid fa-code" style={{ color: 'var(--accent-cyan)' }}></i>
            <span>Frontend Dev</span>
          </motion.div>

          {/* Floating badge 2 */}
          <motion.div 
            animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="floating-badge badge-2"
          >
            <i className="fa-solid fa-graduation-cap" style={{ color: 'var(--accent-blue)' }}></i>
            <span>Computing Student</span>
          </motion.div>

          {/* 3D Tilting Frame Wrapper */}
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
            onMouseEnter={handleMouseEnter3D}
            onMouseMove={handleMouseMove3D}
            onMouseLeave={handleMouseLeave3D}
            className="avatar-frame-wrapper"
          >
            <div className="avatar-circle-outer">
              <div className="avatar-circle-inner" style={{ transform: 'translateZ(30px)' }}>
                <img src="assets/avatar_edited.jpg" alt="Samir Jung Thapa" className="profile-img" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bouncing Scroll Down Prompt */}
      <a href="#about" className="scroll-down-prompt" aria-label="Scroll to About">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <div className="scroll-chevrons">
          <i className="fa-solid fa-chevron-down"></i>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </a>
    </section>
  );
};

export default Hero;
