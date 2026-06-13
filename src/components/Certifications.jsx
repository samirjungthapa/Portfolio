
const certificationsData = [
  {
    id: 1,
    title: "Java Object-Oriented Programming",
    issuer: "LinkedIn Learning",
    issuerIcon: "fa-brands fa-linkedin",
    issuerColor: "#0A66C2",
    date: "Apr 27, 2025",
    duration: "2 hours 2 minutes",
    skills: ["Java", "Object-Oriented Programming (OOP)"],
    credentialId: "dbde4c66db45b374c7334dc15db69bd0606b1399c90d89b5f5a0b33c46950a8",
    verifyUrl:
      "https://www.linkedin.com/learning/certificates/dbde4c66db45b374c7334dc15db69bd0606b1399c90d89b5f5a0b33c46950a8",
    accentColor: "#0A66C2",
    category: "Programming",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="certifications-section scroll-reveal">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Certifications</h2>
          <div className="section-subtitle">
            Verified credentials and professional development achievements
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="cert-grid">
          {certificationsData.map((cert, idx) => (
            <article
              key={cert.id}
              className={`cert-card glass-card reveal-item reveal-delay-${idx + 1}`}
            >
              {/* Issuer Badge */}
              <div className="cert-card-top">
                <div
                  className="cert-issuer-badge"
                  style={{ "--cert-accent": cert.accentColor }}
                >
                  <i className={cert.issuerIcon}></i>
                </div>
                <div className="cert-meta">
                  <span className="cert-issuer-name">{cert.issuer}</span>
                  <span className="cert-category-tag">{cert.category}</span>
                </div>
              </div>

              {/* Certificate Title */}
              <h3 className="cert-title">{cert.title}</h3>

              {/* Date & Duration */}
              <div className="cert-info-row">
                <span className="cert-info-item">
                  <i className="fa-regular fa-calendar-check"></i>
                  {cert.date}
                </span>
                <span className="cert-info-item">
                  <i className="fa-regular fa-clock"></i>
                  {cert.duration}
                </span>
              </div>

              {/* Skills Covered */}
              <div className="cert-skills">
                <span className="cert-skills-label">Skills covered</span>
                <div className="cert-skill-tags">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="cert-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credential ID */}
              <div className="cert-credential-id">
                <i className="fa-solid fa-fingerprint"></i>
                <span title={cert.credentialId}>
                  ID: {cert.credentialId.slice(0, 16)}…
                </span>
              </div>

              {/* Verify Button */}
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm cert-verify-btn"
                aria-label={`Verify ${cert.title} certificate`}
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                Verify Certificate
              </a>

              {/* Decorative glow */}
              <div
                className="cert-card-glow"
                style={{ "--cert-accent": cert.accentColor }}
              ></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
