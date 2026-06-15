import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillsData = [
  { name: 'React.js', icon: 'fa-brands fa-react', desc: 'Component Architecture, Hooks, Context API', category: 'Frontend' },
  { name: 'Next.js', icon: 'fa-solid fa-cube', desc: 'Server Side Rendering, Route Handlers', category: 'Frontend' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', desc: 'ES6+, Asynchronous Events, Logic Flows', category: 'Frontend' },
  { name: 'TypeScript', icon: 'fa-solid fa-shield-halved', desc: 'Static Typing, Interfaces, Generic Declarations', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: 'fa-brands fa-css3-alt', desc: 'Utility Classes, Layout Grids, Fluid Scales', category: 'Frontend' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', desc: 'Runtime Logic, API Routing, Server Architectures', category: 'Backend' },
  { name: 'Git & Github', icon: 'fa-brands fa-git-alt', desc: 'Version Tree Control, Branch Deployments', category: 'Tools' },
  { name: 'Java', icon: 'fa-brands fa-java', desc: 'Object-Oriented Structures, Data Collections', category: 'Backend' },
  { name: 'Python', icon: 'fa-brands fa-python', desc: 'Automation Scripts, Data Parsers, CLI Tools', category: 'Tools' }
];

const categories = ["All", "Frontend", "Backend", "Tools"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="telemetry-label">SYSTEM_CAPABILITIES v4.1</span>
          <h2 className="section-title">Technical Expertise</h2>
          <div className="section-subtitle">
            Modern toolsets and frameworks leveraged to engineer clean product interfaces
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  padding: '10px 24px',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: isActive ? '#030308' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'transparent',
                  transition: 'color 0.3s ease',
                  outline: 'none'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="active-tab-indicator"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'var(--accent-cyan)',
                      borderRadius: '50px',
                      zIndex: -1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Tech Grid with Layout Transitions */}
        <motion.div 
          layout
          className="tech-grid"
          style={{ overflow: 'hidden' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
