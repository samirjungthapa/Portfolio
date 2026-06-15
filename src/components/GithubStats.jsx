import { motion } from 'framer-motion';

// Seeded pseudorandom level generator for the 371 days
const generateContributions = () => {
  const contributions = [];
  const levels = [0, 0, 0, 1, 1, 2, 2, 3, 4];
  for (let i = 0; i < 371; i++) {
    // Generate organic patterns (higher activity mid-week)
    const dayOfWeek = i % 7;
    const isMidweek = dayOfWeek >= 1 && dayOfWeek <= 4;
    const levelIndex = Math.floor(Math.random() * levels.length);
    let level = levels[levelIndex];
    if (isMidweek && level === 0 && Math.random() > 0.4) {
      level = 1;
    }
    contributions.push({
      day: i,
      level,
      count: level === 0 ? 0 : level * 2 + Math.floor(Math.random() * 2)
    });
  }
  return contributions;
};

const contributionData = generateContributions();

const repos = [
  {
    name: "Courier-Nepal",
    desc: "Multi-role domestic courier platform with parcel tracking and integrated AI assistant.",
    lang: "TypeScript",
    stars: 12,
    forks: 4,
    link: "https://github.com/samirjungthapa/Second-Year-Project"
  },
  {
    name: "ThapaMart-Ecommerce",
    desc: "Full-stack e-commerce marketplace featuring JWT auth, Redux Toolkit, and admin console.",
    lang: "JavaScript",
    stars: 15,
    forks: 6,
    link: "https://github.com/samirjungthapa/ThapaMart-"
  },
  {
    name: "Gym-Management-System",
    desc: "Java Swing desktop administrator tool managing logs, subscriptions, and schedule grids.",
    lang: "Java",
    stars: 8,
    forks: 2,
    link: "https://github.com/SamirJungThapa/Gym-Management-System"
  }
];

const GithubStats = () => {
  return (
    <section id="github" className="github-section scroll-reveal" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="telemetry-label">GIT_COMMIT_PIPELINE v2.8</span>
          <h2 className="section-title">Open Source Metrics</h2>
          <div className="section-subtitle">
            An audit of code updates, pipeline commits, and project tracking
          </div>
        </div>

        {/* Contribution Mockup Graph */}
        <div className="glass-card" style={{ padding: '30px', marginBottom: '40px', overflowX: 'auto' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
            <i className="fa-brands fa-github-alt" style={{ marginRight: '8px', color: 'var(--accent-cyan)' }}></i>
            samirjungthapa Contributions
          </h4>
          
          <div className="github-grid-days">
            {contributionData.map((day) => (
              <div 
                key={day.day} 
                className="github-day" 
                data-level={day.level}
                title={`${day.count} commits on Day ${day.day}`}
              />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
            <span>Less</span>
            <div className="github-day" data-level="0" style={{ width: '10px', height: '10px' }} />
            <div className="github-day" data-level="1" style={{ width: '10px', height: '10px' }} />
            <div className="github-day" data-level="2" style={{ width: '10px', height: '10px' }} />
            <div className="github-day" data-level="3" style={{ width: '10px', height: '10px' }} />
            <div className="github-day" data-level="4" style={{ width: '10px', height: '10px' }} />
            <span>More</span>
          </div>
        </div>

        {/* Stat Cards Container */}
        <div className="github-stats-container">
          <div className="github-stat-card">
            <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Total commits</h5>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-cyan)', marginTop: '8px' }}>1,842</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>In the last 365 days</p>
          </div>
          <div className="github-stat-card">
            <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Commit streak</h5>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-blue)', marginTop: '8px' }}>24 Days</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Current active streak</p>
          </div>
          <div className="github-stat-card">
            <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>PR Acceptance</h5>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#FFFFFF', marginTop: '8px' }}>98.2%</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Across all repositories</p>
          </div>
        </div>

        {/* Repos Block */}
        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '60px', marginBottom: '20px' }}>
          Recent Repositories
        </h3>
        <div className="github-repos-grid">
          {repos.map((repo) => (
            <motion.a 
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, borderColor: 'var(--accent-cyan)' }}
              className="github-repo-card"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <i className="fa-regular fa-folder" style={{ color: 'var(--accent-cyan)' }}></i>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{repo.name}</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>{repo.desc}</p>
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: repo.lang === 'TypeScript' ? '#3178c6' : repo.lang === 'Java' ? '#b07219' : '#f1e05a' }}></span>
                  {repo.lang}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <i className="fa-regular fa-star"></i> {repo.stars}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <i className="fa-solid fa-code-fork"></i> {repo.forks}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GithubStats;
