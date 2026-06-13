

const Services = () => {
  return (
    <section id="services" className="services-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Services</h2>
          <div className="section-subtitle">What I offer to help bring your ideas to life</div>
        </div>

        <div className="services-grid">
          {/* Service 1: Frontend Web Dev */}
          <div className="service-card glass-card reveal-item reveal-delay-1">
            <div className="service-icon">
              <i className="fa-solid fa-code"></i>
            </div>
            <h3 className="service-title">Frontend Web Development</h3>
            <p className="service-description">
              Creating responsive, modern, and visually appealing web applications using modular architecture. Focusing on speed, standards, and fluid interactions.
            </p>
            <div className="service-features">
              <span><i className="fa-solid fa-circle-check"></i> React Applications</span>
              <span><i className="fa-solid fa-circle-check"></i> HTML5/CSS3/ES6+ Solutions</span>
              <span><i className="fa-solid fa-circle-check"></i> Mobile-Responsive Layouts</span>
              <span><i className="fa-solid fa-circle-check"></i> Modular Coding Standards</span>
            </div>
          </div>

          {/* Service 2: Interactive UI/UX */}
          <div className="service-card glass-card reveal-item reveal-delay-2">
            <div className="service-icon">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <h3 className="service-title">Interactive UI/UX Design</h3>
            <p className="service-description">
              Designing intuitive layouts with high-fidelity structures, clean typography, smooth transitions, and tactile hover effects.
            </p>
            <div className="service-features">
              <span><i className="fa-solid fa-circle-check"></i> Apple-level Minimalism</span>
              <span><i className="fa-solid fa-circle-check"></i> Glassmorphism Interfaces</span>
              <span><i className="fa-solid fa-circle-check"></i> Custom Keyframe Animations</span>
              <span><i className="fa-solid fa-circle-check"></i> Premium Visual Hierarchy</span>
            </div>
          </div>

          {/* Service 3: Performance & SEO */}
          <div className="service-card glass-card reveal-item reveal-delay-3">
            <div className="service-icon">
              <i className="fa-solid fa-gauge-high"></i>
            </div>
            <h3 className="service-title">Performance & SEO Audit</h3>
            <p className="service-description">
              Optimizing bundles for maximum load speeds, search engine discoverability, clean accessibility, and semantic accuracy.
            </p>
            <div className="service-features">
              <span><i className="fa-solid fa-circle-check"></i> Vite Bundler Optimization</span>
              <span><i className="fa-solid fa-circle-check"></i> Speed Benchmark Audits</span>
              <span><i className="fa-solid fa-circle-check"></i> Semantic HTML Structures</span>
              <span><i className="fa-solid fa-circle-check"></i> Core Web Vitals Auditing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
