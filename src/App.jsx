import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PageTransition from './components/PageTransition';

import About from './components/About';
import BentoGrid from './components/BentoGrid';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Services from './components/Services';
import Projects from './components/Projects';
import GithubStats from './components/GithubStats';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import SmoothScroll from './components/SmoothScroll';
import TerminalConsole from './components/TerminalConsole';
import GlobalCanvas from './components/GlobalCanvas';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CommandPalette from './components/CommandPalette';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const cursorRef = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      }
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    
    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, input, textarea, .proj-filter-btn, .social-link, .interest-card-item, .skill-modern-badge, .btn, .tag, .galaxy-planet-node, .console-tab-btn, .service-card, .floating-terminal-trigger');
      if (cursorRef.current) {
        if (isInteractive) {
          cursorRef.current.classList.add('hovered');
        } else {
          cursorRef.current.classList.remove('hovered');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    // 1. Intersection Observer for Scroll Reveal animations
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

    // 2. Scroll event listener for Back to Top button + progress bar
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollPercent(percent);

      if (scrollTop > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    // 3. Click event listener for hash links to trigger premium page transition
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a');
      const href = link?.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.substring(1);
        const targetEl = document.getElementById(id);
        if (targetEl) {
          e.preventDefault();
          
          // Dispatch page transition event to show overlay
          window.dispatchEvent(new CustomEvent('page-transition-trigger'));
          
          // Wait for overlay to cover screen, then jump scroll instantly
          setTimeout(() => {
            if (targetEl.classList.contains('scroll-reveal')) {
              targetEl.classList.add('active');
            }
            
            // Instantly reveal all child animation elements
            const innerElements = targetEl.querySelectorAll('.reveal-item, .reveal-left, .reveal-right');
            innerElements.forEach((el) => {
              el.style.opacity = '1';
              el.style.transform = 'translate(0) rotate(0) scale(1)';
            });

            const offset = 80; // Sticky header offset
            if (window.lenis) {
              window.lenis.scrollTo(targetEl, { offset: -offset, immediate: true });
            } else {
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = targetEl.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'auto'
              });
            }
          }, 350);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleAnchorClick);

    // Cleanups
    return () => {
      revealElements.forEach((el) => {
        revealObserver.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('page-transition-trigger'));
    setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      }
    }, 350);
  };

  return (
    <>
      {/* Raycast/Linear inspired Command Palette */}
      <CommandPalette />

      {/* Letter-by-letter blur reveal load sequence */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <SmoothScroll>
          {/* Scroll-driven unified 3D starfield backdrop */}
          <GlobalCanvas />

          {/* Global Mouse Follow Spotlight */}
          <div className="spotlight-glow" aria-hidden="true"></div>

          {/* Premium Screen Wipe Page Transition */}
          <PageTransition />

          {/* Premium Custom Cursor Follower */}
          {!isMobile && (
            <div 
              ref={cursorRef}
              className="custom-cursor-follower"
              style={{ 
                transform: 'translate3d(-100px, -100px, 0)'
              }}
              aria-hidden="true"
            ></div>
          )}

          {/* Global Scroll Progress Bar */}
          <div className="scroll-progress-bar" style={{ width: `${scrollPercent}%` }} aria-hidden="true"></div>

          {/* Back to Top Icon Trigger */}
          <a 
            href="#home" 
            className={`back-to-top ${showScrollTop ? 'show' : ''}`} 
            onClick={scrollToTop}
            aria-label="Back to Top"
          >
            <i className="fa-solid fa-arrow-up"></i>
          </a>

          {/* Navigation Header */}
          <Header />

          <main>
            {/* Hero Banner Section */}
            <Hero />

            {/* Biographical Details Section */}
            <About />

            {/* Premium Bento Grid Dashboard */}
            <BentoGrid />

            {/* Educational Qualification Timeline Section */}
            <Education />

            {/* Work Achievements Timeline Section */}
            <Experience />

            {/* Technical Competencies Progress Bars Section */}
            <Skills />

            {/* Verified Credentials Section */}
            <Certifications />

            {/* Freelancing Services Section */}
            <Services />

            {/* Filterable Projects Section */}
            <Projects />

            {/* GitHub Statistics Section */}
            <GithubStats />

            {/* Testimonials Section */}
            <Testimonials />

            {/* Location cards and Contact Form Validation Section */}
            <Contact />
          </main>

          {/* Copyright Footer */}
          <Footer />

          {/* Interactive Diagnostics Terminal Overlay */}
          <TerminalConsole />
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
