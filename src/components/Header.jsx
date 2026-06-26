import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { setMuteState, playSpatialClick, playSpatialHover, playClick, playHover } from '../utils/audioManager';
import Magnetic from './Magnetic';

const themes = [
  { id: 'gold', name: 'Gold Horizon', icon: 'fa-sun' },
  { id: 'neon', name: 'Cyberpunk', icon: 'fa-bolt' },
  { id: 'emerald', name: 'Matrix', icon: 'fa-terminal' },
  { id: 'electric', name: 'Electric Void', icon: 'fa-droplet' },
  { id: 'dracula', name: 'Dracula', icon: 'fa-ghost' },
  { id: 'monokai', name: 'Monokai', icon: 'fa-cubes' },
  { id: 'light', name: 'Minimal Light', icon: 'fa-circle-half-stroke' }
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'gold';
  });
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('portfolio-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    // Initial sound setup
    setMuteState(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'education', 'experience', 'skills', 'certifications', 'services', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (sectionId, e) => {
    const panX = e ? (e.clientX / window.innerWidth) * 2 - 1 : 0;
    playSpatialClick(panX, 1.2);
    setIsOpen(false);
    setActiveSection(sectionId);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    setMuteState(!newState);
    if (newState) {
      setTimeout(() => playSpatialClick(0, 1.1), 50);
    }
  };

  const handleLinkHover = (e) => {
    const panX = (e.clientX / window.innerWidth) * 2 - 1;
    // Modulate pitch based on scroll height
    const scrollYFactor = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    playSpatialHover(panX, 0.8 + scrollYFactor * 0.6);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Magnetic>
          <a 
            href="#home" 
            className="logo" 
            onClick={(e) => handleLinkClick('home', e)}
            onMouseEnter={handleLinkHover}
            style={{ display: 'inline-flex' }}
          >
            <span>Samir</span>.dev
          </a>
        </Magnetic>
        
        {/* Navigation Menu Links */}
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
          {['home', 'about', 'education', 'experience', 'skills', 'certifications', 'services', 'projects', 'contact'].map((sec) => (
            <Magnetic key={sec}>
              <a
                href={`#${sec}`}
                className={`nav-link ${activeSection === sec ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(sec, e)}
                onMouseEnter={handleLinkHover}
                style={{ display: 'inline-block', position: 'relative' }}
              >
                {activeSection === sec && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="nav-active-bg"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '99px',
                      zIndex: -1
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 2 }}>
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </span>
              </a>
            </Magnetic>
          ))}
        </nav>

        {/* Floating Sound Toggle */}
        <Magnetic>
          <button 
            onClick={toggleSound}
            onMouseEnter={playHover}
            className="btn-cinematic-control sound-toggle-btn"
            aria-label={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
            style={{ 
              width: '38px', 
              height: '38px', 
              marginLeft: '16px', 
              fontSize: '0.9rem',
              border: '1px solid rgba(255,255,255,0.08)',
              background: soundEnabled ? 'rgba(201, 162, 39, 0.15)' : 'transparent',
              color: soundEnabled ? 'var(--accent-cyan)' : 'var(--text-muted)'
            }}
          >
            <i className={`fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
          </button>
        </Magnetic>

        {/* Theme Selector Toggle */}
        <div style={{ position: 'relative' }}>
          <Magnetic>
            <button 
              onClick={() => { playClick(); setShowThemeDropdown(!showThemeDropdown); }}
              onMouseEnter={playHover}
              className="btn-cinematic-control theme-toggle-btn"
              aria-label="Switch Theme Accent"
              style={{ 
                width: '38px', 
                height: '38px', 
                marginLeft: '16px', 
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'transparent',
                color: 'var(--accent-cyan)'
              }}
            >
              <i className="fa-solid fa-palette"></i>
            </button>
          </Magnetic>
          {showThemeDropdown && (
            <div 
              className="glass-card" 
              style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                width: '180px',
                padding: '8px',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                background: 'rgba(8, 8, 8, 0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
              }}
            >
              <span className="telemetry-label" style={{ fontSize: '0.65rem', margin: '4px 8px', color: 'var(--text-muted)' }}>[THEME_SELECT]</span>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    playClick();
                    setCurrentTheme(t.id);
                    setShowThemeDropdown(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    textAlign: 'left',
                    width: '100%',
                    background: currentTheme === t.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                    color: currentTheme === t.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  <i className={`fa-solid ${t.icon}`} style={{ width: '14px' }}></i>
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          className={`nav-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
