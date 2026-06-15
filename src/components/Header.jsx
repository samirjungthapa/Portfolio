import { useState, useEffect } from 'react';
import { setMuteState, playSpatialClick, playSpatialHover, playClick, playHover } from '../utils/audioManager';
import Magnetic from './Magnetic';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);

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
                style={{ display: 'inline-block' }}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
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
