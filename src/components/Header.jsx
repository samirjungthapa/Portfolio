import { useState, useEffect } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Add background shadow on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current visible section for navbar highlighting
      const sections = ['home', 'about', 'education', 'experience', 'skills', 'certifications', 'services', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for triggers

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
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (sectionId) => {
    setIsOpen(false);
    setActiveSection(sectionId);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="logo" onClick={() => handleLinkClick('home')}>
          <span>Samir</span>.dev
        </a>
        
        {/* Navigation Menu Links */}
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
          {['home', 'about', 'education', 'experience', 'skills', 'certifications', 'services', 'projects', 'contact'].map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className={`nav-link ${activeSection === sec ? 'active' : ''}`}
              onClick={() => handleLinkClick(sec)}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </a>
          ))}
        </nav>

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
