

const Experience = () => {
  return (
    <section id="experience" className="experience-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <div className="section-subtitle">My professional timeline and roles</div>
        </div>

        <div className="timeline-container">
          <div className="timeline-item experience-item reveal-item reveal-delay-2">
            <div className="timeline-icon">
              <i className="fa-solid fa-briefcase"></i>
            </div>
            <div className="timeline-date">2024 - Present</div>
            <div className="timeline-content glass-card">
              <h3 className="role-title">Freelance Frontend Developer</h3>
              <h4 className="company-name">Self-Employed</h4>
              <p className="experience-description">
                Operating as an independent freelance developer, delivering custom modern web interfaces and functional user-friendly projects.
              </p>
              <ul className="experience-list">
                <li>
                  <i className="fa-solid fa-check text-accent"></i> 
                  <span>Developing responsive frontend websites for businesses and individuals</span>
                </li>
                <li>
                  <i className="fa-solid fa-check text-accent"></i> 
                  <span>Building modern user interfaces with smooth interactive details</span>
                </li>
                <li>
                  <i className="fa-solid fa-check text-accent"></i> 
                  <span>Creating interactive web experiences, optimizing code for speed and SEO</span>
                </li>
                <li>
                  <i className="fa-solid fa-check text-accent"></i> 
                  <span>Implementing fully responsive layout grids for desktop, tablet, and mobile devices</span>
                </li>
                <li>
                  <i className="fa-solid fa-check text-accent"></i> 
                  <span>Working with modern frontend technologies including HTML, CSS, JavaScript, and React</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
