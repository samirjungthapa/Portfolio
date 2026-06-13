import { useEffect, useState, useRef } from 'react';

const About = () => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animateValue = (target, setter, duration) => {
      let start = 0;
      const increment = target / (duration / 16);
      const step = () => {
        start += increment;
        if (start >= target) {
          setter(target);
        } else {
          setter(Math.floor(start));
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    const animateCounters = () => {
      animateValue(5, setProjectsCount, 1200);
      animateValue(100, setSatisfactionCount, 1500);
      animateValue(2, setExperienceCount, 1000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = counterRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [hasAnimated]);

  return (
    <section id="about" className="about-section scroll-reveal" style={{ overflow: 'hidden', position: 'relative' }}>
      <div className="ambient-bg-orb orb-left" style={{ top: '10%' }}></div>
      <div className="ambient-bg-orb orb-right" style={{ bottom: '10%' }}></div>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <div className="section-subtitle">Get to know me, my education, and interests</div>
        </div>

        <div className="about-grid">
          {/* Left Side: About Image card and badges */}
          <div className="about-image-column reveal-left reveal-delay-2">
            {/* Quick Profile Facts */}
            <div className="quick-facts-card">
              <h4 className="quick-facts-title">Quick Profile</h4>
              <div className="fact-item">
                <div className="fact-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="fact-details">
                  <span className="fact-label">Location</span>
                  <span className="fact-value">Morang, Nepal</span>
                </div>
              </div>
              <div className="fact-item">
                <div className="fact-icon"><i className="fa-solid fa-graduation-cap"></i></div>
                <div className="fact-details">
                  <span className="fact-label">Education</span>
                  <span className="fact-value">B.Sc. (Hons) Computing</span>
                </div>
              </div>
              <div className="fact-item">
                <div className="fact-icon"><i className="fa-solid fa-code"></i></div>
                <div className="fact-details">
                  <span className="fact-label">Specialization</span>
                  <span className="fact-value">Frontend Development</span>
                </div>
              </div>
              <div className="fact-item">
                <div className="fact-icon"><i className="fa-solid fa-envelope"></i></div>
                <div className="fact-details">
                  <span className="fact-label">Email</span>
                  <span className="fact-value">Samirjungthapa7@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="interests-container">
              <h4 className="interests-title">My Interests</h4>
              <div className="interests-grid-modern">
                <div className="interest-card-item">
                  <div className="interest-card-icon"><i className="fa-solid fa-tree"></i></div>
                  <span className="interest-card-name">Nature</span>
                </div>
                <div className="interest-card-item">
                  <div className="interest-card-icon"><i className="fa-solid fa-terminal"></i></div>
                  <span className="interest-card-name">Coding</span>
                </div>
                <div className="interest-card-item">
                  <div className="interest-card-icon"><i className="fa-solid fa-graduation-cap"></i></div>
                  <span className="interest-card-name">Learning</span>
                </div>
                <div className="interest-card-item">
                  <div className="interest-card-icon"><i className="fa-solid fa-mountain"></i></div>
                  <span className="interest-card-name">Hiking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Copy texts, highlights, and stat values */}
          <div className="about-details-column reveal-right reveal-delay-3">
            <h3 className="about-heading">Passionate Web Developer</h3>
            <p className="about-text">
              Hello! I'm Samir Jung Thapa, currently pursuing a B.Sc. (Hons) Computing degree at Itahari International College. I have a strong passion for technology, web development, and continuous learning.
            </p>
            <p className="about-text">
              I enjoy spending time in nature and exploring new technologies. My primary focus is frontend development, where I create engaging and responsive websites that provide excellent user experiences.
            </p>
            <p className="about-text">
              As a freelance developer, I am constantly improving my skills and working on projects that help me grow both personally and professionally.
            </p>

            {/* Highlights info block */}
            <div className="highlights-grid">
              <div className="highlight-card">
                <div className="highlight-icon"><i className="fa-solid fa-graduation-cap"></i></div>
                <div className="highlight-info">
                  <h4>Education</h4>
                  <p>B.Sc. Computing (2026)</p>
                </div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon"><i className="fa-solid fa-briefcase"></i></div>
                <div className="highlight-info">
                  <h4>Freelancing</h4>
                  <p>2024 – Present</p>
                </div>
              </div>
            </div>

            {/* Counters Area */}
            <div className="counters-grid" ref={counterRef}>
              <div className="counter-card">
                <div className="counter-number">{projectsCount}+</div>
                <div className="counter-label">Projects Completed</div>
              </div>
              <div className="counter-card">
                <div className="counter-number">{satisfactionCount}%</div>
                <div className="counter-label">Client Satisfaction</div>
              </div>
              <div className="counter-card">
                <div className="counter-number">{experienceCount}+</div>
                <div className="counter-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
