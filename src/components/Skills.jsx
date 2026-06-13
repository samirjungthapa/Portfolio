

const Skills = () => {
  return (
    <section id="skills" className="skills-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Expertise</h2>
          <div className="section-subtitle">A comprehensive overview of my technical stack, frameworks, and core competencies</div>
        </div>

        <div className="skills-bento-grid">
          {/* Card 1: Frontend Powerhouse (span-2) */}
          <div className="bento-card span-2 glass-card reveal-item reveal-delay-1">
            <div className="bento-card-header">
              <i className="fa-solid fa-layer-group"></i>
              <h3>Frontend Architecture</h3>
            </div>
            <div className="bento-skills-list-3col">
              <div className="skill-card-item react-skill">
                <div className="skill-card-icon"><i className="fa-brands fa-react react-color"></i></div>
                <div className="skill-card-name">React.js</div>
                <div className="skill-card-desc">Hooks, Context API, Components</div>
              </div>
              <div className="skill-card-item js-skill">
                <div className="skill-card-icon"><i className="fa-brands fa-js js-color"></i></div>
                <div className="skill-card-name">JavaScript</div>
                <div className="skill-card-desc">ES6+, Async, DOM Manipulation</div>
              </div>
              <div className="skill-card-item html-skill">
                <div className="skill-card-icon"><i className="fa-brands fa-html5 html-color"></i></div>
                <div className="skill-card-name">HTML5 / CSS3</div>
                <div className="skill-card-desc">Semantic UI, Flexbox, Animations</div>
              </div>
            </div>
          </div>

          {/* Card 2: Backend & Data (span-1) */}
          <div className="bento-card span-1 glass-card reveal-item reveal-delay-2">
            <div className="bento-card-header">
              <i className="fa-solid fa-server"></i>
              <h3>Backend & Data</h3>
            </div>
            <div className="bento-skills-list-1col">
              <div className="skill-card-item node-skill skill-card-item-horizontal">
                <div className="skill-card-icon skill-icon-horizontal"><i className="fa-brands fa-node-js node-color"></i></div>
                <div>
                  <div className="skill-card-name skill-name-horizontal">Node.js</div>
                  <div className="skill-card-desc">Server runtime</div>
                </div>
              </div>
              <div className="skill-card-item mongodb-skill skill-card-item-horizontal">
                <div className="skill-card-icon skill-icon-horizontal-svg"><span className="tech-svg-icon svg-mongodb"></span></div>
                <div>
                  <div className="skill-card-name skill-name-horizontal">MongoDB</div>
                  <div className="skill-card-desc">NoSQL Database</div>
                </div>
              </div>
              <div className="skill-card-item mysql-skill skill-card-item-horizontal">
                <div className="skill-card-icon skill-icon-horizontal-svg"><span className="tech-svg-icon svg-mysql"></span></div>
                <div>
                  <div className="skill-card-name skill-name-horizontal">MySQL</div>
                  <div className="skill-card-desc">Relational DB</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Programming Logic (span-1) */}
          <div className="bento-card span-1 glass-card reveal-item reveal-delay-3">
            <div className="bento-card-header">
              <i className="fa-solid fa-microchip"></i>
              <h3>Core Programming</h3>
            </div>
            <div className="bento-skills-list-1col">
              <div className="skill-card-item python-skill skill-card-item-large">
                <div className="skill-card-icon skill-icon-large"><i className="fa-brands fa-python python-color"></i></div>
                <div className="skill-card-name">Python</div>
                <div className="skill-card-desc">Scripts, automation, algorithms</div>
              </div>
              <div className="skill-card-item python-skill skill-card-item-large">
                <div className="skill-card-icon skill-icon-large"><i className="fa-brands fa-java java-color"></i></div>
                <div className="skill-card-name">Java</div>
                <div className="skill-card-desc">Object-oriented concepts, app dev</div>
              </div>
            </div>
          </div>

          {/* Card 4: DevOps & Tools (span-1) */}
          <div className="bento-card span-1 glass-card reveal-item reveal-delay-4">
            <div className="bento-card-header">
              <i className="fa-solid fa-toolbox"></i>
              <h3>Tools & DevOps</h3>
            </div>
            <div className="bento-skills-list">
              <div className="skill-card-item git-skill">
                <div className="skill-card-icon"><i className="fa-brands fa-git-alt git-color"></i></div>
                <div className="skill-card-name">Git</div>
              </div>
              <div className="skill-card-item docker-skill">
                <div className="skill-card-icon"><i className="fa-brands fa-docker docker-color"></i></div>
                <div className="skill-card-name">Docker</div>
              </div>
              <div className="skill-card-item github-skill">
                <div className="skill-card-icon"><i className="fa-brands fa-github github-color"></i></div>
                <div className="skill-card-name">GitHub</div>
              </div>
              <div className="skill-card-item responsive-skill">
                <div className="skill-card-icon" style={{ color: '#FCC624' }}><i className="fa-brands fa-linux"></i></div>
                <div className="skill-card-name">Linux</div>
              </div>
            </div>
          </div>

          {/* Card 5: Design & Architecture (span-1) */}
          <div className="bento-card span-1 glass-card reveal-item reveal-delay-5">
            <div className="bento-card-header">
              <i className="fa-solid fa-pen-nib"></i>
              <h3>Design & Systems</h3>
            </div>
            <div className="bento-skills-list-1col">
              <div className="skill-card-item figma-skill skill-card-item-horizontal">
                <div className="skill-card-icon skill-icon-horizontal-svg"><span className="tech-svg-icon svg-figma"></span></div>
                <div>
                  <div className="skill-card-name skill-name-horizontal">Figma</div>
                  <div className="skill-card-desc">UI/UX prototyping</div>
                </div>
              </div>
              <div className="skill-card-item responsive-skill skill-card-item-horizontal">
                <div className="skill-card-icon skill-icon-horizontal" style={{ color: 'var(--accent-cyan)' }}><i className="fa-solid fa-mobile-screen-button"></i></div>
                <div>
                  <div className="skill-card-name skill-name-horizontal">Responsive Design</div>
                  <div className="skill-card-desc">Mobile-first approach</div>
                </div>
              </div>
              <div className="skill-card-item responsive-skill skill-card-item-horizontal">
                <div className="skill-card-icon skill-icon-horizontal-svg"><span className="tech-svg-icon svg-vercel"></span></div>
                <div>
                  <div className="skill-card-name skill-name-horizontal">Vercel Hosting</div>
                  <div className="skill-card-desc">CI/CD Deployments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
