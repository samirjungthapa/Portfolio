import { useState, useEffect, useRef } from 'react';

const titles = ["Frontend Developer", "Computing Student", "Freelance Developer"];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  // Trigger load entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Cursor spotlight effect
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      section.style.setProperty('--cursor-x', `${x}px`);
      section.style.setProperty('--cursor-y', `${y}px`);
    };
    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing effect logic
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypingText(currentTitle.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypingText(currentTitle.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 100);
    }
    if (!isDeleting && charIndex === currentTitle.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <section id="home" ref={sectionRef} className={`hero-section hero-spotlight ${isLoaded ? 'animate-on-load' : ''}`}>
      <div className="hero-background">
        <div className="grid-overlay"></div>
        <div className="blur-glow glow-1"></div>
        <div className="blur-glow glow-2"></div>
        <div className="blur-glow glow-3"></div>
      </div>

      <div className="container hero-container">
        {/* Left Side: Copywriting intro and CTAs */}
        <div className="hero-content">

          {/* Availability Badge */}
          <div className="availability-badge reveal-item reveal-delay-1">
            <span className="avail-dot"></span>
            Available for Freelance Work
          </div>

          <h1 className="hero-name reveal-item reveal-delay-2">I'm <span className="gradient-text">Samir Jung Thapa</span></h1>
          <h2 className="hero-title reveal-item reveal-delay-3">
            <span className="dynamic-txt-wrapper">
              <span className="dynamic-txt">{typingText}</span>
            </span>
          </h2>
          <p className="hero-intro reveal-item reveal-delay-4">
            A passionate Frontend Developer and B.Sc. (Hons) Computing student from Nepal. I craft modern, responsive, and user-friendly web experiences using React, JavaScript, and cutting-edge CSS.
          </p>
          <div className="hero-actions reveal-item reveal-delay-5">
            <a href="#projects" className="btn btn-primary">
              View Projects <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
            <a href="assets/resume.html" className="btn btn-tertiary" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-download"></i> Download CV
            </a>
          </div>

        </div>

        {/* Right Side: Professional Avatar with glowing ring and floating badges */}
        <div className="hero-avatar-area reveal-right reveal-delay-3">
          <div className="floating-badge badge-1 badge-float-anim-1">
            <i className="fa-solid fa-code"></i>
            <span>Frontend Dev</span>
          </div>
          <div className="floating-badge badge-2 badge-float-anim-2">
            <i className="fa-solid fa-graduation-cap"></i>
            <span>Computing Student</span>
          </div>

          <div className="avatar-frame-wrapper avatar-float-anim">
            <div className="avatar-circle-outer">
              <div className="avatar-circle-inner">
                <img src="assets/avatar_edited.jpg" alt="Samir Jung Thapa" className="profile-img" />
              </div>
            </div>
          </div>
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
