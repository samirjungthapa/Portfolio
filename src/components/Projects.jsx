
import { useState } from 'react';

const projectsData = [
  {
    id: 1,
    title: "Gym Management System",
    category: "Desktop App",
    description:
      "A full-featured Java Swing desktop application for managing gym operations. Handles member registration, fee tracking, subscription management, and workout scheduling through an intuitive GUI built entirely with Java.",
    techStack: ["Java", "Java Swing", "OOP", "File I/O", "GUI Design"],
    githubUrl: "https://github.com/SamirJungThapa/Gym-Management-System",
    liveUrl: null,
    icon: "fa-solid fa-dumbbell",
    accentColor: "#e2c999",
    features: [
      "Member registration & profile management",
      "Fee & subscription tracking",
      "Workout schedule management",
      "Interactive Java Swing GUI",
    ],
    status: "Completed",
  },
  {
    id: 2,
    title: "WeCare Skin Care System",
    category: "CLI App",
    description:
      "A Python-based inventory management system for a skin care business. Allows staff to manage product stock, process customer sales with a buy 3 get 1 free promotion, and handle supplier restocking — all through a clean console interface with auto-generated invoices.",
    techStack: ["Python", "File I/O", "OOP", "CLI", "Invoice Generation"],
    githubUrl: "https://github.com/SamirJungThapa/WeCare-Skin-Care-System",
    liveUrl: null,
    icon: "fa-solid fa-bottle-droplet",
    accentColor: "#a8d8b9",
    features: [
      "View inventory with full product details",
      "Process sales with buy 3 get 1 free promo",
      "Supplier restock with price updates",
      "Auto-generated timestamped invoices",
    ],
    status: "Completed",
  },
  {
    id: 3,
    title: "Developer Portfolio",
    category: "Web App",
    description:
      "My personal developer portfolio website. Built using React, JavaScript, Vite, HTML, and custom CSS. Featuring a responsive glassmorphism aesthetic, interactive projects filter, certifications display, and optimized metadata for SEO.",
    techStack: ["React", "JavaScript", "Vite", "HTML5", "CSS3", "Git"],
    githubUrl: "https://github.com/samirjungthapa/Portfolio",
    liveUrl: "https://samirjungthapa.dev",
    icon: "fa-solid fa-laptop-code",
    accentColor: "#5eead4",
    features: [
      "Fully responsive glassmorphism design",
      "Dynamic filtering for projects and skills",
      "Optimized SEO metadata and Open Graph tags",
      "Structured contact form and custom layout elements",
    ],
    status: "Completed",
    mockupTitle: "samirjungthapa.dev",
    mockupType: "web",
  },
  {
    id: 4,
    title: "ThapaMart E-Commerce",
    category: "Web App",
    description:
      "A full-stack e-commerce web application with a React/Redux frontend styled with Tailwind CSS, and a Node.js/Express backend. Features secure JWT authentication, dynamic product filtering, cart, wishlist, checkout flow, and a dedicated admin dashboard.",
    techStack: ["React", "Redux Toolkit", "Node.js", "Express", "Tailwind CSS", "JWT"],
    githubUrl: "https://github.com/samirjungthapa/ThapaMart-",
    liveUrl: null,
    icon: "fa-solid fa-store",
    accentColor: "#f43f5e",
    features: [
      "Secure JWT user authentication & authorization",
      "Dynamic product catalog and category filters",
      "Interactive cart, wishlist, and comparison features",
      "Comprehensive admin dashboard for product management",
    ],
    status: "Completed",
    mockupTitle: "thapamart.local",
    mockupType: "store",
  },
  {
    id: 5,
    title: "Courier Nepal",
    category: "Web App",
    description:
      "A multi-role web application for domestic courier service operations. Built with a React, TypeScript, Redux Toolkit, and Tailwind CSS frontend, and a Node.js/Express backend. Integrates multi-role dashboards (User, Delivery Staff, Admin, Super Admin), real-time parcel tracking, and a smart AI assistant.",
    techStack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express", "Sequelize", "SQLite"],
    githubUrl: "https://github.com/samirjungthapa/Second-Year-Project",
    liveUrl: null,
    icon: "fa-solid fa-truck-fast",
    accentColor: "#3b82f6",
    features: [
      "Multi-role user portals (User, Delivery, Admin, Super Admin)",
      "Real-time parcel tracking and status updates",
      "Smart integrated AI assistant for parcel queries",
      "Secure user authentication and automated system alerts",
    ],
    status: "Completed",
    mockupTitle: "couriernepal.local",
    mockupType: "courier",
  },
];

const categoryFilters = ["All", "Desktop App", "CLI App", "Web App"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="projects-section scroll-reveal">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-subtitle">
            Real-world applications I've designed, built, and shipped
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="proj-filter-bar reveal-item">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              className={`proj-filter-btn${activeFilter === cat ? " active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="proj-grid">
          {filtered.length === 0 ? (
            <div className="proj-empty reveal-item">
              <i className="fa-solid fa-folder-open"></i>
              <p>No projects in this category yet. Check back soon!</p>
            </div>
          ) : (
            filtered.map((proj, idx) => (
              <article
                key={proj.id}
                className={`project-card-mockup reveal-item reveal-delay-${idx + 1}`}
              >
                {/* Mockup Top Bars */}
                {proj.category === "Desktop App" ? (
                  <div className="mockup-desktop-header">
                    <span className="mockup-dot red"></span>
                    <span className="mockup-dot yellow"></span>
                    <span className="mockup-dot green"></span>
                    <span className="mockup-title-bar">{proj.mockupTitle || "GymManagementSystem.jar"}</span>
                  </div>
                ) : proj.category === "Web App" ? (
                  <div className="mockup-desktop-header">
                    <span className="mockup-dot red"></span>
                    <span className="mockup-dot yellow"></span>
                    <span className="mockup-dot green"></span>
                    <span className="mockup-title-bar">{proj.mockupTitle || "localhost"}</span>
                  </div>
                ) : (
                  <div className="mockup-terminal">
                    <span className="mockup-dot red"></span>
                    <span className="mockup-dot yellow"></span>
                    <span className="mockup-dot green"></span>
                    <span className="mockup-title-bar">terminal - bash</span>
                  </div>
                )}

                {/* Card Visual Body */}
                {proj.category === "CLI App" ? (
                  <div className="terminal-window">
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span>python wecare.py</span>
                    </div>
                    <div className="terminal-output" style={{ color: '#888' }}>
                      [INFO] Loading WeCare Database...
                    </div>
                    <div className="terminal-output" style={{ color: '#4af626' }}>
                      [SUCCESS] Buy 3 Get 1 Free Promo is ACTIVE!
                    </div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span>inventory --check</span>
                    </div>
                    <div className="terminal-output" style={{ color: '#e2c999' }}>
                      Stock Alert: 2 products restocking needed.
                    </div>
                  </div>
                ) : proj.mockupType === "store" ? (
                  <div className="terminal-window" style={{ background: '#0a0508', borderBottom: '1px solid rgba(255,255,255,0.03)', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fa-solid fa-store" style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#f43f5e', filter: 'drop-shadow(0 0 10px rgba(244, 63, 94, 0.4))' }}></i>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'Courier New', color: '#64748b' }}>localhost:5173 - active</div>
                    </div>
                  </div>
                ) : proj.mockupType === "courier" ? (
                  <div className="terminal-window" style={{ background: '#050a15', borderBottom: '1px solid rgba(255,255,255,0.03)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fa-solid fa-truck-fast" style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#3b82f6', filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))' }}></i>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'Courier New', color: '#64748b' }}>localhost:5173 - active</div>
                    </div>
                  </div>
                ) : proj.category === "Web App" ? (
                  <div className="terminal-window" style={{ background: '#070a13', borderBottom: '1px solid rgba(255,255,255,0.03)', color: '#5eead4', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fa-solid fa-globe" style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#5eead4', filter: 'drop-shadow(0 0 10px rgba(94, 234, 212, 0.4))' }}></i>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'Courier New', color: '#64748b' }}>localhost:5173 - active</div>
                    </div>
                  </div>
                ) : (
                  <div className="terminal-window" style={{ background: '#090807', borderBottom: '1px solid rgba(255,255,255,0.03)', color: '#e2c999', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fa-solid fa-dumbbell" style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#e2c999', filter: 'drop-shadow(0 0 10px rgba(226, 201, 153, 0.4))' }}></i>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'Courier New', color: '#8b8072' }}>BUILD SUCCESS (total time: 2 seconds)</div>
                    </div>
                  </div>
                )}

                {/* Project Info Block */}
                <div className="project-info-modern">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="project-title-modern">{proj.title}</h3>
                    <span className="project-tag-modern">{proj.category}</span>
                  </div>
                  
                  <p className="project-desc-modern">{proj.description}</p>
                  
                  {/* Features */}
                  <ul className="proj-features" style={{ margin: '8px 0', padding: 0 }}>
                    {proj.features.map((feat, i) => (
                      <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        <i className="fa-solid fa-check" style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem' }}></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="project-tags-modern">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="project-tag-modern" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', borderColor: 'rgba(255,255,255,0.05)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Row */}
                  <div style={{ display: 'flex', gap: '16px', marginTop: 'auto', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="project-link-modern"
                      style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                    >
                      <i className="fa-solid fa-circle-info"></i> Details
                    </button>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-modern"
                      style={{ marginLeft: 'auto' }}
                    >
                      <i className="fa-brands fa-github"></i> Github <i className="fa-solid fa-arrow-right-long"></i>
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* GitHub CTA Banner */}
        <div className="proj-github-cta glass-card reveal-item">
          <div className="proj-github-cta-content">
            <i className="fa-brands fa-github proj-github-icon"></i>
            <div>
              <h4>More projects on the way</h4>
              <p>
                Follow my GitHub to stay updated on new repositories and
                open-source contributions.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/SamirJungThapa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <i className="fa-brands fa-github"></i>
            GitHub Profile
          </a>
        </div>
      </div>

      {/* Premium Glassmorphic Project Details Modal */}
      {selectedProject && (
        <div className={`proj-modal-overlay active`} onClick={() => setSelectedProject(null)}>
          <div className="proj-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="proj-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="proj-modal-visual" style={{ 
              borderColor: selectedProject.accentColor
            }}>
              {/* Visual header matching card's type */}
              {selectedProject.category === "Desktop App" ? (
                <div className="mockup-desktop-header">
                  <span className="mockup-dot red"></span>
                  <span className="mockup-dot yellow"></span>
                  <span className="mockup-dot green"></span>
                  <span className="mockup-title-bar">{selectedProject.mockupTitle || "GymManagementSystem.jar"}</span>
                </div>
              ) : selectedProject.category === "Web App" ? (
                <div className="mockup-desktop-header">
                  <span className="mockup-dot red"></span>
                  <span className="mockup-dot yellow"></span>
                  <span className="mockup-dot green"></span>
                  <span className="mockup-title-bar">{selectedProject.mockupTitle || "localhost"}</span>
                </div>
              ) : (
                <div className="mockup-terminal">
                  <span className="mockup-dot red"></span>
                  <span className="mockup-dot yellow"></span>
                  <span className="mockup-dot green"></span>
                  <span className="mockup-title-bar">terminal - bash</span>
                </div>
              )}

              {/* Rendering preview screen in modal */}
              {selectedProject.category === "CLI App" ? (
                <div className="terminal-window" style={{ minHeight: '160px', borderBottom: 'none' }}>
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span>python wecare.py</span>
                  </div>
                  <div className="terminal-output" style={{ color: '#888' }}>
                    [INFO] Loading WeCare Database...
                  </div>
                  <div className="terminal-output" style={{ color: '#4af626' }}>
                    [SUCCESS] Buy 3 Get 1 Free Promo is ACTIVE!
                  </div>
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span>inventory --check</span>
                  </div>
                  <div className="terminal-output" style={{ color: '#e2c999' }}>
                    Stock Alert: 2 products restocking needed.
                  </div>
                </div>
              ) : selectedProject.mockupType === "store" ? (
                <div className="terminal-window" style={{ background: '#0a0508', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px', borderBottom: 'none' }}>
                  <div style={{ textAlign: 'center' }}>
                    <i className="fa-solid fa-store" style={{ fontSize: '3.2rem', marginBottom: '10px', color: '#f43f5e', filter: 'drop-shadow(0 0 15px rgba(244, 63, 94, 0.4))' }}></i>
                    <div style={{ fontSize: '0.8rem', fontFamily: 'Courier New', color: '#64748b' }}>localhost:5173 - active</div>
                  </div>
                </div>
              ) : selectedProject.mockupType === "courier" ? (
                <div className="terminal-window" style={{ background: '#050a15', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px', borderBottom: 'none' }}>
                  <div style={{ textAlign: 'center' }}>
                    <i className="fa-solid fa-truck-fast" style={{ fontSize: '3.2rem', marginBottom: '10px', color: '#3b82f6', filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))' }}></i>
                    <div style={{ fontSize: '0.8rem', fontFamily: 'Courier New', color: '#64748b' }}>localhost:5173 - active</div>
                  </div>
                </div>
              ) : selectedProject.category === "Web App" ? (
                <div className="terminal-window" style={{ background: '#070a13', color: '#5eead4', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px', borderBottom: 'none' }}>
                  <div style={{ textAlign: 'center' }}>
                    <i className="fa-solid fa-globe" style={{ fontSize: '3.2rem', marginBottom: '10px', color: '#5eead4', filter: 'drop-shadow(0 0 15px rgba(94, 234, 212, 0.4))' }}></i>
                    <div style={{ fontSize: '0.8rem', fontFamily: 'Courier New', color: '#64748b' }}>localhost:5173 - active</div>
                  </div>
                </div>
              ) : (
                <div className="terminal-window" style={{ background: '#090807', color: '#e2c999', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px', borderBottom: 'none' }}>
                  <div style={{ textAlign: 'center' }}>
                    <i className="fa-solid fa-dumbbell" style={{ fontSize: '3.2rem', marginBottom: '10px', color: '#e2c999', filter: 'drop-shadow(0 0 15px rgba(226, 201, 153, 0.4))' }}></i>
                    <div style={{ fontSize: '0.8rem', fontFamily: 'Courier New', color: '#8b8072' }}>BUILD SUCCESS (total time: 2 seconds)</div>
                  </div>
                </div>
              )}
            </div>

            <div className="proj-modal-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 className="project-title-modern" style={{ fontSize: '1.75rem', margin: 0 }}>{selectedProject.title}</h3>
                  <span className="project-tag-modern" style={{ display: 'inline-block', marginTop: '10px' }}>{selectedProject.category}</span>
                </div>
                <div className="proj-status-badge completed" style={{ height: 'fit-content', padding: '6px 14px' }}>
                  <span className="status-dot"></span>
                  {selectedProject.status}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px' }}>
                <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1rem', marginBottom: '10px', fontWeight: '700' }}>Project Overview</h4>
                <p className="project-desc-modern" style={{ fontSize: '0.92rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{selectedProject.description}</p>
              </div>

              <div>
                <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1rem', marginBottom: '12px', fontWeight: '700' }}>Key Features</h4>
                <ul className="proj-features" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {selectedProject.features.map((feat, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', marginTop: '2px' }}></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1rem', marginBottom: '12px', fontWeight: '700' }}>Technology Stack</h4>
                <div className="project-tags-modern">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="project-tag-modern" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', borderColor: 'rgba(255,255,255,0.1)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '24px' }}>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <i className="fa-brands fa-github"></i> Repository
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
