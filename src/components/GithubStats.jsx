import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Seeded pseudorandom level generator for the 371 days contribution grid mockup
const isNameCell = (r, c) => {
  const col = c - 12;
  if (col < 0 || col >= 29) return false;
  
  if (col >= 0 && col < 5) {
    const cc = col;
    if (r === 0 || r === 3 || r === 6) return cc > 0 && cc < 4;
    if (r === 1 || r === 5) return cc === 0 || cc === 4;
    if (r === 2) return cc === 0;
    if (r === 4) return cc === 4;
  }
  if (col >= 6 && col < 11) {
    const cc = col - 6;
    if (r === 0) return cc === 2;
    if (r === 1) return cc === 1 || cc === 3;
    if (r === 3) return true;
    return cc === 0 || cc === 4;
  }
  if (col >= 12 && col < 17) {
    const cc = col - 12;
    if (r === 0) return cc === 0 || cc === 4;
    if (r === 1) return cc === 0 || cc === 1 || cc === 3 || cc === 4;
    if (r === 2) return cc === 0 || cc === 2 || cc === 4;
    return cc === 0 || cc === 4;
  }
  if (col >= 18 && col < 23) {
    const cc = col - 18;
    if (r === 0 || r === 6) return true;
    return cc === 2;
  }
  if (col >= 24 && col < 29) {
    const cc = col - 24;
    if (r === 0 || r === 3) return cc < 4;
    if (r === 1 || r === 2) return cc === 0 || cc === 4;
    if (r === 4) return cc === 0 || cc === 2;
    if (r === 5) return cc === 0 || cc === 3;
    if (r === 6) return cc === 0 || cc === 4;
  }
  return false;
};

const generateContributions = () => {
  const contributions = [];
  for (let i = 0; i < 371; i++) {
    const r = Math.floor(i / 53);
    const c = i % 53;
    
    let level = 0;
    if (isNameCell(r, c)) {
      level = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
    } else {
      level = 0;
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

// Fallback static repository data
const fallbackRepos = [
  {
    name: "Courier-Nepal",
    description: "Multi-role domestic courier platform with parcel tracking and integrated AI assistant.",
    language: "TypeScript",
    stargazers_count: 12,
    forks_count: 4,
    html_url: "https://github.com/samirjungthapa/Second-Year-Project"
  },
  {
    name: "ThapaMart-Ecommerce",
    description: "Full-stack e-commerce marketplace featuring JWT auth, Redux Toolkit, and admin console.",
    language: "JavaScript",
    stargazers_count: 15,
    forks_count: 6,
    html_url: "https://github.com/samirjungthapa/ThapaMart-"
  },
  {
    name: "Gym-Management-System",
    description: "Java Swing desktop administrator tool managing logs, subscriptions, and schedule grids.",
    language: "Java",
    stargazers_count: 8,
    forks_count: 2,
    html_url: "https://github.com/SamirJungThapa/Gym-Management-System"
  }
];

const initialCommits = [
  { id: 'c1', sha: 'b52a10', label: 'Initial repository init', date: '2026-06-01', x: 50, y: 30, branch: 'main', parents: [] },
  { id: 'c2', sha: '7f9c8d', label: 'feat: structure bento grid layout', date: '2026-06-05', x: 130, y: 30, branch: 'main', parents: ['c1'] },
  { id: 'c3', sha: '1a8d4e', label: 'branch out: active-dev-loop', date: '2026-06-10', x: 210, y: 70, branch: 'dev', parents: ['c2'] },
  { id: 'c4', sha: '9c5f2b', label: 'feat: add terminal console simulation', date: '2026-06-12', x: 290, y: 70, branch: 'dev', parents: ['c3'] },
  { id: 'c5', sha: 'e4d8c3', label: 'docs: update repository manifests', date: '2026-06-14', x: 370, y: 30, branch: 'main', parents: ['c2'] },
  { id: 'c6', sha: 'a3d6f1', label: 'merge: integrate dev branch loops', date: '2026-06-18', x: 450, y: 30, branch: 'main', parents: ['c5', 'c4'] },
  { id: 'c7', sha: 'f67c45', label: 'release: production package v3.5', date: '2026-06-21', x: 530, y: 30, branch: 'main', parents: ['c6'] }
];

const GithubStats = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState(fallbackRepos);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCommit, setActiveCommit] = useState(null);
  const [commits, setCommits] = useState(initialCommits);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [headCommitId, setHeadCommitId] = useState('c7');

  useEffect(() => {
    const handleGitEvent = (e) => {
      const { type, branchName, message, sha } = e.detail;
      const today = new Date().toISOString().split('T')[0];

      if (type === 'checkout') {
        setCurrentBranch(branchName);
        setCommits((prevCommits) => {
          const lastCommitOnBranch = [...prevCommits].reverse().find(c => c.branch === branchName);
          if (lastCommitOnBranch) {
            setHeadCommitId(lastCommitOnBranch.id);
          }
          return prevCommits;
        });
      } else if (type === 'commit') {
        setCommits((prevCommits) => {
          const newCommitId = 'c' + (prevCommits.length + 1);
          const newX = Math.max(...prevCommits.map(c => c.x)) + 80;
          
          const getBranchY = (bName, list) => {
            if (bName === 'main') return 30;
            if (bName === 'dev') return 70;
            const otherBranches = [...new Set(list.map(c => c.branch))].filter(b => b !== 'main' && b !== 'dev');
            let idx = otherBranches.indexOf(bName);
            if (idx === -1) idx = otherBranches.length;
            return 90 + idx * 20;
          };

          const newY = getBranchY(currentBranch, prevCommits);
          const newCommit = {
            id: newCommitId,
            sha,
            label: message,
            date: today,
            branch: currentBranch,
            x: newX,
            y: newY,
            parents: [headCommitId]
          };

          setHeadCommitId(newCommitId);
          return [...prevCommits, newCommit];
        });
      } else if (type === 'merge') {
        setCommits((prevCommits) => {
          const lastCommitOnMergedBranch = [...prevCommits].reverse().find(c => c.branch === branchName);
          if (!lastCommitOnMergedBranch) return prevCommits;

          const newCommitId = 'c' + (prevCommits.length + 1);
          const newX = Math.max(...prevCommits.map(c => c.x)) + 80;
          
          const getBranchY = (bName, list) => {
            if (bName === 'main') return 30;
            if (bName === 'dev') return 70;
            const otherBranches = [...new Set(list.map(c => c.branch))].filter(b => b !== 'main' && b !== 'dev');
            let idx = otherBranches.indexOf(bName);
            if (idx === -1) idx = otherBranches.length;
            return 90 + idx * 20;
          };

          const newY = getBranchY(currentBranch, prevCommits);
          const newCommit = {
            id: newCommitId,
            sha,
            label: `merge: integrate ${branchName} branch loops`,
            date: today,
            branch: currentBranch,
            x: newX,
            y: newY,
            parents: [headCommitId, lastCommitOnMergedBranch.id]
          };

          setHeadCommitId(newCommitId);
          return [...prevCommits, newCommit];
        });
      }
    };

    window.addEventListener('git-command-executed', handleGitEvent);
    return () => window.removeEventListener('git-command-executed', handleGitEvent);
  }, [currentBranch, headCommitId]);


  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const cachedProfile = sessionStorage.getItem('github-profile');
        const cachedRepos = sessionStorage.getItem('github-repos');

        if (cachedProfile && cachedRepos) {
          setProfile(JSON.parse(cachedProfile));
          setRepos(JSON.parse(cachedRepos));
          setIsLoading(false);
          return;
        }

        const profileRes = await fetch('https://api.github.com/users/samirjungthapa');
        const reposRes = await fetch('https://api.github.com/users/samirjungthapa/repos?sort=updated&per_page=10');

        if (profileRes.ok && reposRes.ok) {
          const profileData = await profileRes.json();
          const reposData = await reposRes.json();

          // Only keep repos that aren't forks or that are featured
          const cleanRepos = reposData
            .filter(r => !r.fork || r.stargazers_count > 0)
            .slice(0, 3);

          const finalRepos = cleanRepos.length > 0 ? cleanRepos : reposData.slice(0, 3);

          setProfile(profileData);
          setRepos(finalRepos);

          sessionStorage.setItem('github-profile', JSON.stringify(profileData));
          sessionStorage.setItem('github-repos', JSON.stringify(finalRepos));
        }
      } catch (err) {
        console.warn("Failed to fetch live GitHub metrics, utilizing fallback system telemetry logs.", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  // Compute aggregated stats
  const totalStars = repos.reduce((acc, curr) => acc + (curr.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, curr) => acc + (curr.forks_count || 0), 0);
  const publicReposCount = profile ? profile.public_repos : 18;
  const followersCount = profile ? profile.followers : 25;

  return (
    <section id="github" className="github-section scroll-reveal" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="telemetry-label">GIT_COMMIT_PIPELINE v3.5</span>
          <h2 className="section-title">Open Source Metrics</h2>
          <div className="section-subtitle">
            An audit of live code updates, pipeline commits, and active project tracking
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

        {/* Interactive Git Commit Tree Graph */}
        <div className="glass-card" style={{ padding: '30px', marginBottom: '40px', overflowX: 'auto' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
            <i className="fa-solid fa-code-branch" style={{ marginRight: '8px', color: 'var(--accent-cyan)' }}></i>
            Interactive Repository Commit Graph
          </h4>
          
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '580px', height: '110px', position: 'relative', width: '100%' }}>
              {(() => {
                const maxCommitX = Math.max(...commits.map(c => c.x));
                const maxCommitY = Math.max(...commits.map(c => c.y));
                const svgWidth = Math.max(580, maxCommitX + 80);
                const svgHeight = Math.max(110, maxCommitY + 40);
                return (
                  <svg width={svgWidth} height={svgHeight} style={{ overflow: 'visible' }}>
                    {/* Connection lines drawn dynamically from parent relations */}
                    {commits.flatMap((c) =>
                      c.parents.map((pId) => {
                        const parent = commits.find((p) => p.id === pId);
                        if (!parent) return null;
                        const strokeColor = c.branch === 'main' ? 'rgba(255,255,255,0.25)' : 'var(--accent-blue)';
                        if (parent.y === c.y) {
                          return (
                            <line
                              key={`${parent.id}-${c.id}`}
                              x1={parent.x}
                              y1={parent.y}
                              x2={c.x}
                              y2={c.y}
                              stroke={strokeColor}
                              strokeWidth="3"
                            />
                          );
                        } else {
                          const d = `M ${parent.x} ${parent.y} Q ${(parent.x + c.x) / 2} ${parent.y} ${c.x} ${c.y}`;
                          return (
                            <path
                              key={`${parent.id}-${c.id}`}
                              d={d}
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth="3"
                            />
                          );
                        }
                      })
                    )}

                    {/* Commit Node circles */}
                    {commits.map((c) => {
                      const isHovered = activeCommit?.id === c.id;
                      const nodeColor = c.branch === 'main' ? 'var(--accent-cyan)' : 'var(--accent-blue)';
                      return (
                        <g
                          key={c.id}
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setActiveCommit(c)}
                          onMouseLeave={() => setActiveCommit(null)}
                        >
                          <circle
                            cx={c.x}
                            cy={c.y}
                            r={isHovered ? "8" : "6"}
                            fill={nodeColor}
                            stroke="#050505"
                            strokeWidth="2"
                            style={{ transition: 'all 0.2s ease' }}
                          />
                          <circle
                            cx={c.x}
                            cy={c.y}
                            r={isHovered ? "14" : "0"}
                            fill="transparent"
                            stroke={nodeColor}
                            strokeWidth="1.5"
                            opacity={isHovered ? "0.4" : "0"}
                            style={{ transition: 'all 0.2s ease' }}
                          />
                        </g>
                      );
                    })}
                  </svg>
                );
              })()}
            </div>

            {/* Commit Detail telemetry card */}
            <div style={{ flex: 1, minWidth: '220px', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-sm)', minHeight: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {activeCommit ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>SHA: {activeCommit.sha}</span>
                    <span>{activeCommit.date}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '6px' }}>
                    {activeCommit.label}
                  </div>
                  <span style={{ fontSize: '0.65rem', background: activeCommit.branch === 'main' ? 'rgba(201, 162, 39, 0.15)' : 'rgba(79, 172, 254, 0.15)', color: activeCommit.branch === 'main' ? 'var(--accent-cyan)' : 'var(--accent-blue)', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '8px' }}>
                    branch: {activeCommit.branch}
                  </span>
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                  Hover over commit nodes in the pipeline to audit log details.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stat Cards Container */}
        <div className="github-stats-container">
          <div className="github-stat-card">
            <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Public Repositories</h5>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-cyan)', marginTop: '8px' }}>
              {isLoading ? <span className="skeleton-text-pulse">...</span> : publicReposCount}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Published on host profile</p>
          </div>
          <div className="github-stat-card">
            <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Followers</h5>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-blue)', marginTop: '8px' }}>
              {isLoading ? <span className="skeleton-text-pulse">...</span> : followersCount}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Network connections</p>
          </div>
          <div className="github-stat-card">
            <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Stars / Forks</h5>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#FFFFFF', marginTop: '8px' }}>
              {isLoading ? <span className="skeleton-text-pulse">...</span> : `${totalStars} / ${totalForks}`}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Community appreciation</p>
          </div>
        </div>

        {/* Repos Block */}
        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '60px', marginBottom: '20px' }}>
          Recent Repositories
        </h3>
        <div className="github-repos-grid">
          {isLoading ? (
            // Skeletons
            [1, 2, 3].map((n) => (
              <div key={n} className="github-repo-card skeleton-repo-card" style={{ height: '150px', background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.05)' }}>
                <div style={{ width: '40%', height: '16px', background: 'rgba(255,255,255,0.04)', marginBottom: '12px' }} />
                <div style={{ width: '85%', height: '12px', background: 'rgba(255,255,255,0.02)', marginBottom: '8px' }} />
                <div style={{ width: '60%', height: '12px', background: 'rgba(255,255,255,0.02)' }} />
              </div>
            ))
          ) : (
            repos.map((repo) => (
              <motion.a 
                key={repo.name}
                href={repo.html_url || repo.link}
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
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                    {repo.description || repo.desc || "No description provided."}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: (repo.language || repo.lang) === 'TypeScript' ? '#3178c6' : (repo.language || repo.lang) === 'Java' ? '#b07219' : (repo.language || repo.lang) === 'Python' ? '#3572A5' : '#f1e05a' 
                    }}></span>
                    {repo.language || repo.lang || 'Code'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="fa-regular fa-star"></i> {repo.stargazers_count !== undefined ? repo.stargazers_count : repo.stars}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="fa-solid fa-code-fork"></i> {repo.forks_count !== undefined ? repo.forks_count : repo.forks}
                  </span>
                </div>
              </motion.a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GithubStats;
