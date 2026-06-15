import { useState } from 'react';

const servicesData = [
  {
    id: 1,
    title: "Frontend Web Development",
    icon: "fa-solid fa-code",
    desc: "Creating responsive, modern, and visually appealing web applications using modular architecture. Focusing on speed, standards, and fluid interactions.",
    features: ["React Applications", "HTML5/CSS3/ES6+ Solutions", "Mobile-Responsive Layouts", "Modular Coding Standards"],
    telemetry: { speed: "98/100", coverage: "100%", buildTime: "0.4s" }
  },
  {
    id: 2,
    title: "Interactive UI/UX Design",
    icon: "fa-solid fa-wand-magic-sparkles",
    desc: "Designing intuitive layouts with high-fidelity structures, clean typography, smooth transitions, and tactile hover effects.",
    features: ["Apple-level Minimalism", "Glassmorphism Interfaces", "Custom Keyframe Animations", "Premium Visual Hierarchy"],
    telemetry: { speed: "60fps", coverage: "Fluid", buildTime: "Instant" }
  },
  {
    id: 3,
    title: "Performance & SEO Audit",
    icon: "fa-solid fa-gauge-high",
    desc: "Optimizing bundles for maximum load speeds, search engine discoverability, clean accessibility, and semantic accuracy.",
    features: ["Vite Bundler Optimization", "Speed Benchmark Audits", "Semantic HTML Structures", "Core Web Vitals Auditing"],
    telemetry: { speed: "100/100", coverage: "SEO A+", buildTime: "N/A" }
  }
];

const Services = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="services" className="services-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <span className="telemetry-label">CAPABILITIES_CATALOG v1.2</span>
          <h2 className="section-title">My Services</h2>
          <div className="section-subtitle">Tactile service nodes. Click any node to expand diagnostics specs.</div>
        </div>

        <div className="services-grid">
          {servicesData.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <div 
                key={service.id}
                onClick={() => setExpandedId(isExpanded ? null : service.id)}
                className={`service-card glass-card ${isExpanded ? 'expanded' : ''}`}
                style={{ 
                  cursor: 'pointer', 
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  height: 'fit-content'
                }}
              >
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">
                  {service.desc}
                </p>

                {/* Staggered lists */}
                <div className="service-features" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {service.features.map((feat) => (
                    <span key={feat}>
                      <i className="fa-solid fa-circle-check"></i> {feat}
                    </span>
                  ))}
                </div>

                {/* Expanded Telemetry specs table */}
                {isExpanded && (
                  <div className="service-expanded-telemetry anim-fade-in" style={{ marginTop: '24px', width: '100%', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>DIAGNOSTICS SPEC:</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Velocity:</span> 
                        <span style={{ marginLeft: '6px', color: 'var(--accent-cyan)' }}>{service.telemetry.speed}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Target:</span> 
                        <span style={{ marginLeft: '6px', color: 'var(--accent-cyan)' }}>{service.telemetry.coverage}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Hot Reload:</span> 
                        <span style={{ marginLeft: '6px', color: 'var(--accent-cyan)' }}>{service.telemetry.buildTime}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
