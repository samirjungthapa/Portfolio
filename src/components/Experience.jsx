import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="experience" className="experience-section scroll-reveal">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="section-title">Work Experience</h2>
          <div className="section-subtitle">My professional timeline and roles</div>
        </motion.div>

        <div className="timeline-container">
          <motion.div 
            className="timeline-item experience-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="timeline-icon">
              <i className="fa-solid fa-briefcase"></i>
            </div>
            <div className="timeline-date">2024 - Present</div>
            <motion.div 
              className="timeline-content glass-card"
              whileHover={{ scale: 1.02, translateY: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="role-title">Freelance Frontend Developer</h3>
              <h4 className="company-name">Self-Employed</h4>
              <p className="experience-description">
                Operating as an independent freelance developer, delivering custom modern web interfaces and functional user-friendly projects.
              </p>
              <ul className="experience-list">
                {[
                  "Developing responsive frontend websites for businesses and individuals",
                  "Building modern user interfaces with smooth interactive details",
                  "Creating interactive web experiences, optimizing code for speed and SEO",
                  "Implementing fully responsive layout grids for desktop, tablet, and mobile devices",
                  "Working with modern frontend technologies including HTML, CSS, JavaScript, and React"
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                  >
                    <i className="fa-solid fa-check text-accent"></i> 
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
