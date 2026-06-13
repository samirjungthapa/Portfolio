
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Left Side: Brand Logo and Copyright */}
        <div className="footer-left">
          <a href="#home" className="logo"><span>Samir</span>.dev</a>
          <p className="footer-copy">© {currentYear} Samir Jung Thapa. All Rights Reserved.</p>
        </div>

        {/* Center Side: Quick navigation links */}
        <div className="footer-center">
          <h4 className="footer-title">Quick Links</h4>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        {/* Right Side: Follow socials */}
        <div className="footer-right">
          <h4 className="footer-title">Follow Me</h4>
          <div className="footer-socials">
            <a href="https://github.com/samirjungthapa" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
            <a href="https://www.linkedin.com/in/samir-jung-thapa-21aaa83b6" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/shameerthapa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
