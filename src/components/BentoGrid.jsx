import { motion } from 'framer-motion';

const focusTechs = [
  { name: 'Next.js', level: 'Routing & SSR' },
  { name: 'TypeScript', level: 'Type Systems' },
  { name: 'Three.js', level: '3D WebGL Mesh' },
  { name: 'System Design', level: 'Architecture' },
  { name: 'Modern UI', level: 'Engineering' }
];

const coreTechs = [
  { name: 'React', icon: 'fa-brands fa-react', color: '#61DAFB' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: 'fa-brands fa-css3-alt', color: '#38BDF8' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#339933' },
  { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#F05032' },
  { name: 'Python', icon: 'fa-brands fa-python', color: '#3776AB' }
];

const BentoGrid = () => {
  return (
    <section id="dashboard" className="bento-section scroll-reveal" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="telemetry-label">SYSTEM_INDEX v4.2</span>
          <h2 className="section-title">Developer Dashboard</h2>
          <div className="section-subtitle">
            An editorial dashboard of competencies, active focus, and stats
          </div>
        </div>

        {/* Bento Grid layout */}
        <div 
          className="bento-layout-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: '40px'
          }}
        >
          {/* Item 1: Current Focus (Large Card) */}
          <motion.div 
            whileHover={{ y: -4, borderColor: 'var(--accent-cyan)' }}
            className="glass-card bento-card"
            style={{
              gridColumn: 'span 2',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '260px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>[Active learning cycle]</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '8px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Current Focus</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.6' }}>
                Engineering immersive web experiences and modular systems. Currently studying advanced rendering patterns, type validation, and high-performance WebGL mechanics.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
              {focusTechs.map((t) => (
                <span 
                  key={t.name}
                  style={{
                    background: 'rgba(201, 162, 39, 0.05)',
                    border: '1px solid rgba(201, 162, 39, 0.15)',
                    color: 'var(--accent-blue)',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}
                >
                  {t.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Item 2: Core Stack Widget (Vertical Card) */}
          <motion.div 
            whileHover={{ y: -4, borderColor: 'var(--accent-cyan)' }}
            className="glass-card bento-card"
            style={{
              gridRow: 'span 2',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>[Core tech stack]</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '8px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Core Stack</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', margin: '24px 0' }}>
              {coreTechs.map((c) => (
                <div 
                  key={c.name} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)', 
                    padding: '12px 14px', 
                    borderRadius: 'var(--radius-sm)' 
                  }}
                >
                  <i className={c.icon} style={{ color: c.color, fontSize: '1.25rem' }}></i>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{c.name}</span>
                </div>
              ))}
            </div>

            <a href="#skills" style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Explore Capabilities <i className="fa-solid fa-arrow-right"></i>
            </a>
          </motion.div>

          {/* Item 3: Github Stats Widget (Horizontal Card) */}
          <motion.div 
            whileHover={{ y: -4, borderColor: 'var(--accent-cyan)' }}
            className="glass-card bento-card"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              minHeight: '220px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>[Live stats]</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '8px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Commit Activity</h3>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>1,842+</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Yearly commits</div>
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-blue)' }}>24 Days</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active streak</div>
              </div>
            </div>
          </motion.div>

          {/* Item 4: Experience Highlight Card */}
          <motion.div 
            whileHover={{ y: -4, borderColor: 'var(--accent-cyan)' }}
            className="glass-card bento-card"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              minHeight: '220px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>[Log metrics]</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '8px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Experience</h3>
            </div>

            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Freelance Developer</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '2px' }}>2024 – Present (2+ Years)</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bento Responsive overrides inside index.css */}
    </section>
  );
};

export default BentoGrid;
