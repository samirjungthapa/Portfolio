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

  // Magnetic hover effect
  const handleMouseMove = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    target.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
  };

  const handleMouseLeave = (target) => {
    target.style.transform = `translate3d(0, 0, 0)`;
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a 
          href="#home" 
          className="logo" 
          onClick={() => handleLinkClick('home')}
          onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          style={{ display: 'inline-flex', transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)' }}
        >
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
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              style={{ display: 'inline-block', transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)' }}
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
