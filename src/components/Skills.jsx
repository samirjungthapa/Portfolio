import { motion } from 'framer-motion';

const skillsData = [
  { name: 'React.js', icon: 'fa-brands fa-react', desc: 'Component Architecture, Hooks, Context API' },
  { name: 'Next.js', icon: 'fa-solid fa-cube', desc: 'Server Side Rendering, Route Handlers' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', desc: 'ES6+, Asynchronous Events, Logic Flows' },
  { name: 'TypeScript', icon: 'fa-solid fa-shield-halved', desc: 'Static Typing, Interfaces, Generic Declarations' },
  { name: 'Tailwind CSS', icon: 'fa-brands fa-css3-alt', desc: 'Utility Classes, Layout Grids, Fluid Scales' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', desc: 'Runtime Logic, API Routing, Server Architectures' },
  { name: 'Git & Github', icon: 'fa-brands fa-git-alt', desc: 'Version Tree Control, Branch Deployments' },
  { name: 'Java', icon: 'fa-brands fa-java', desc: 'Object-Oriented Structures, Data Collections' },
  { name: 'Python', icon: 'fa-brands fa-python', desc: 'Automation Scripts, Data Parsers, CLI Tools' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="telemetry-label">SYSTEM_CAPABILITIES v4.0</span>
          <h2 className="section-title">Technical Expertise</h2>
          <div className="section-subtitle">
            Modern toolsets and frameworks leveraged to engineer clean product interfaces
          </div>
        </div>

        {/* Tech Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="tech-grid"
        >
          {skillsData.map((skill) => (
            <motion.div
              key={skill.name}
              variants={cardVariants}
              whileHover={{ 
                y: -6,
                borderColor: "rgba(201, 162, 39, 0.45)",
                boxShadow: "0 12px 30px rgba(201, 162, 39, 0.08)"
              }}
              className="tech-card"
            >
              <div className="tech-icon">
                <i className={skill.icon}></i>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {skill.name}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', marginTop: '4px' }}>
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
