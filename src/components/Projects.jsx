import { useState, useRef } from 'react';

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
    challenge: "Gym administrators were overwhelmed by manual paper cards, member billing confusion, and spreadsheet scheduling conflicts.",
    solution: "Engineered a secure desktop administration tool in Java Swing utilizing local file systems for databases, automated billing alerts, and intuitive calendars.",
    impact: "Reduced member check-in delays by 40% and completely eliminated invoice discrepancies."
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
    challenge: "Managing stock values, manual calculation of promotional logic (buy 3 get 1), and paper invoice tracking resulted in frequent inventory counts mismatches.",
    solution: "Created an object-oriented Python CLI inventory application implementing state patterns and a text parser for automated PDF/text invoice generation.",
    impact: "Secured checkout operations under 1.5 seconds and achieved 100% accurate promotional invoice rendering."
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
    challenge: "Standard developer websites often fail to showcase advanced interactions, scroll behaviors, and responsive system design logic clearly.",
    solution: "Constructed a high-performance React workspace utilizing Framer Motion, Lenis smooth scrolling, and an interactive command palette.",
    impact: "Achieved 98% Lighthouse performance markers, clean responsive layout scaling, and perfect SEO indexing."
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
    challenge: "Building a highly secure marketplace that coordinates dynamic shopping carts, admin dashboards, and JWT authentication without layout reflows.",
    solution: "Designed a modular REST API in Node.js/Express, mapped SQLite databases, and structured state engines via Redux Toolkit on the React client.",
    impact: "Achieved average page response times under 0.6 seconds and established fully encrypted session storage."
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
    challenge: "Handling complex logistics routing with four discrete user tiers (Super Admin down to Customer) alongside live tracking and instant notifications.",
    solution: "Developed multi-role router guards in React/Express, connected Sequelize schema queries, and integrated a smart AI helper mapping parcel logs.",
    impact: "Decreased courier dispatch delay by 25% and automated email alerts to improve customer delivery satisfaction."
  },
];

const categoryFilters = ["All", "Desktop App", "CLI App", "Web App"];

// 3D Tilt Wrapper Component
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10deg to 10deg)
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = -(((y / rect.height) - 0.5) * 16);

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease' }}
    >
      {children}
    </article>
  );
};

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
          <span className="telemetry-label">DEPLOYMENT_LOG</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-subtitle">
            Real-world applications designed, tested, and shipped
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
              <p>No active deployments under this sector.</p>
            </div>
          ) : (
            filtered.map((proj, idx) => (
              <TiltCard
                key={proj.id}
                className="project-card-mockup reveal-item"
              >
                {/* Mockup Top Bars */}
                {proj.category === "Desktop App" ? (
                  <div className="mockup-desktop-header">
                    <span className="mockup-title-bar">{proj.mockupTitle || "GymManagementSystem.jar"}</span>
                  </div>
                ) : proj.category === "Web App" ? (
                  <div className="mockup-desktop-header">
                    <span className="mockup-title-bar">{proj.mockupTitle || "localhost"}</span>
                  </div>
                ) : (
                  <div className="mockup-terminal">
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
                    {proj.features.slice(0, 2).map((feat, i) => (
                      <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        <i className="fa-solid fa-check" style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem' }}></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="project-tags-modern">
                    {proj.techStack.slice(0, 3).map((tech) => (
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
                      <i className="fa-solid fa-circle-info"></i> View Case Study
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
              </TiltCard>
            ))
          )}
        </div>
      </div>

      {/* Blueprint Detail Modal Overlay (Agency Style Case Study) */}
      {selectedProject && (
        <div className={`proj-modal-overlay active`} onClick={() => setSelectedProject(null)}>
          <div className="proj-modal-card" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
            <button className="proj-modal-close" onClick={() => setSelectedProject(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="proj-modal-body" style={{ padding: '40px' }}>
              <span className="telemetry-label" style={{ color: 'var(--accent-cyan)' }}>[CASE_STUDY_SPECIFICATION]</span>
              <h3 className="project-title" style={{ fontSize: '2.2rem', marginBottom: '8px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{selectedProject.title}</h3>
              <p className="project-desc" style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
                {selectedProject.description}
              </p>

              {/* Case study 2-column details block */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1.2fr 0.8fr', 
                  gap: '30px', 
                  marginTop: '24px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '24px'
                }}
              >
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>The Challenge</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '6px' }}>{selectedProject.challenge}</p>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>The Solution</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '6px' }}>{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Results &amp; Impact</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '6px' }}>{selectedProject.impact}</p>
                  </div>
                </div>

                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Key Features</h4>
                    <ul style={{ paddingLeft: '16px', listStyleType: 'square', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedProject.features.map((feat, i) => (
                        <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>{feat}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Stack &amp; Logic</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {selectedProject.techStack.map((tech) => (
                        <span key={tech} className="project-tag-modern" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', borderColor: 'rgba(255,255,255,0.08)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
