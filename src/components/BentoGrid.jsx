import { useState, useEffect } from 'react';
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
  const [timeStr, setTimeStr] = useState('');
  const [status, setStatus] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('night'); // morning, day, sunset, night

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      
      const parts = formatter.formatToParts(now);
      const hourPart = parts.find(p => p.type === 'hour').value;
      const minutePart = parts.find(p => p.type === 'minute').value;
      const secondPart = parts.find(p => p.type === 'second').value;
      const dayPeriodPart = parts.find(p => p.type === 'dayPeriod')?.value || 'AM';
      
      setTimeStr(`${hourPart}:${minutePart}:${secondPart} ${dayPeriodPart}`);
      
      let hour24 = parseInt(hourPart, 10);
      if (dayPeriodPart === 'PM' && hour24 !== 12) hour24 += 12;
      if (dayPeriodPart === 'AM' && hour24 === 12) hour24 = 0;

      if (hour24 >= 9 && hour24 < 17) {
        setStatus('Focus & Productivity Mode 🚀');
        setTimeOfDay('day');
      } else if (hour24 >= 17 && hour24 < 23) {
        setStatus('Designing & Coding 💻');
        setTimeOfDay('sunset');
      } else if (hour24 >= 23 || hour24 < 6) {
        setStatus('Recharging / In Sleep State 😴');
        setTimeOfDay('night');
      } else {
        setStatus('Morning Coffee & Planning ☕');
        setTimeOfDay('morning');
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBackgroundGradient = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'linear-gradient(135deg, rgba(254, 180, 123, 0.08) 0%, rgba(255, 126, 95, 0.03) 100%)';
      case 'day':
        return 'linear-gradient(135deg, rgba(0, 242, 254, 0.06) 0%, rgba(79, 172, 254, 0.03) 100%)';
      case 'sunset':
        return 'linear-gradient(135deg, rgba(201, 162, 39, 0.08) 0%, rgba(157, 0, 255, 0.04) 100%)';
      case 'night':
      default:
        return 'linear-gradient(135deg, rgba(157, 0, 255, 0.04) 0%, rgba(3, 3, 5, 0.6) 100%)';
    }
  };

  const getAccentColor = () => {
    switch (timeOfDay) {
      case 'morning':
        return '#FEB47B';
      case 'day':
        return '#00f2fe';
      case 'sunset':
        return '#C9A227';
      case 'night':
      default:
        return '#9d00ff';
    }
  };

  const renderIcon = () => {
    const color = getAccentColor();
    switch (timeOfDay) {
      case 'morning':
        return (
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <i className="fa-solid fa-mug-hot" style={{ color, fontSize: '1.8rem' }}></i>
          </motion.div>
        );
      case 'day':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          >
            <i className="fa-solid fa-sun" style={{ color, fontSize: '2rem' }}></i>
          </motion.div>
        );
      case 'sunset':
        return (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <i className="fa-solid fa-cloud-sun" style={{ color, fontSize: '2rem' }}></i>
          </motion.div>
        );
      case 'night':
      default:
        return (
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          >
            <i className="fa-solid fa-moon" style={{ color, fontSize: '1.8rem' }}></i>
          </motion.div>
        );
    }
  };

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

          {/* Item 4: Live Nepal Time Widget */}
          <motion.div 
            whileHover={{ y: -4, borderColor: getAccentColor() }}
            className="glass-card bento-card"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: `1px solid rgba(255, 255, 255, 0.08)`,
              minHeight: '220px',
              background: getBackgroundGradient(),
              transition: 'background 0.5s ease, border-color 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>[Local Timezone]</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginTop: '8px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Nepal Standard</h3>
              </div>
              {renderIcon()}
            </div>

            <div>
              <div 
                style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: '800', 
                  color: 'var(--text-primary)', 
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  textShadow: `0 0 10px ${getAccentColor()}44`
                }}
              >
                {timeStr || '--:--:-- --'}
              </div>
              <div 
                style={{ 
                  fontSize: '0.78rem', 
                  color: 'var(--text-muted)', 
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: getAccentColor(), display: 'inline-block', boxShadow: `0 0 8px ${getAccentColor()}` }}></span>
                {status}
              </div>
            </div>
          </motion.div>

          {/* Item 5: Diagnostics & System Telemetry (Full Width bottom card) */}
          <motion.div
            whileHover={{ y: -4, borderColor: 'var(--accent-cyan)' }}
            className="glass-card bento-card"
            style={{
              gridColumn: 'span 3',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '320px',
              background: 'linear-gradient(135deg, rgba(6, 242, 254, 0.02) 0%, rgba(3, 3, 5, 0.6) 100%)'
            }}
          >
            {/* Widget Title & Subtitle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>[Core Diagnostics System]</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '6px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Interactive Diagnostics Telemetry</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Execute shell instructions directly or monitor active pipeline variables.
                </p>
              </div>
              {/* Pulsing online badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(74, 246, 38, 0.06)', border: '1px solid rgba(74, 246, 38, 0.15)', borderRadius: '50px' }}>
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4af626', display: 'inline-block', boxShadow: '0 0 10px #4af626' }}></motion.span>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4af626', fontFamily: 'monospace' }}>SYSTEM_ONLINE</span>
              </div>
            </div>

            {/* Content Area */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.3fr', gap: '30px', margin: '24px 0', alignItems: 'center', flexGrow: 1 }}>
              {/* Left Column: Simulated Resource Metrics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'monospace' }}>
                    <span>CPU_ALLOCATION</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>18%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div animate={{ width: '18%' }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ height: '100%', background: 'var(--accent-cyan)', borderRadius: '3px' }}></motion.div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'monospace' }}>
                    <span>MEMORY_UTILIZATION</span>
                    <span style={{ color: 'var(--accent-blue)' }}>42%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div animate={{ width: '42%' }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ height: '100%', background: 'var(--accent-blue)', borderRadius: '3px' }}></motion.div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'monospace' }}>
                    <span>DIAGNOSTICS_LATENCY</span>
                    <span style={{ color: '#feb47b' }}>462ms</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div animate={{ width: '70%' }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ height: '100%', background: '#feb47b', borderRadius: '3px' }}></motion.div>
                  </div>
                </div>
              </div>

              {/* Middle Column: Shell directive execution box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', fontFamily: 'monospace' }}>DIRECTIVE_TUNNEL</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    id="telemetry-input"
                    placeholder="help, matrix, neofetch..." 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = e.target.value;
                        if (val.trim()) {
                          window.dispatchEvent(new CustomEvent('toggle-terminal', { detail: { open: true, command: val } }));
                          e.target.value = '';
                        }
                      }
                    }}
                    style={{
                      flexGrow: 1,
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      outline: 'none'
                    }}
                  />
                  <button 
                    onClick={() => {
                      const input = document.getElementById('telemetry-input');
                      if (input && input.value.trim()) {
                        window.dispatchEvent(new CustomEvent('toggle-terminal', { detail: { open: true, command: input.value } }));
                        input.value = '';
                      }
                    }}
                    style={{
                      padding: '8px 14px',
                      background: 'var(--accent-cyan)',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#000',
                      fontWeight: '700',
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    RUN
                  </button>
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Pipe direct input to visual console workspace.</span>
              </div>

              {/* Right Column: Clickable Macro Command Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end' }}>
                {[
                  { label: 'NEOFETCH', cmd: 'neofetch', color: 'var(--accent-cyan)' },
                  { label: 'MATRIX', cmd: 'matrix', color: 'var(--accent-blue)' },
                  { label: 'RETRO SNAKE', cmd: 'snake', color: '#4af626' },
                  { label: 'PAINT OVERLAY', cmd: 'paint', color: '#c9a227' },
                  { label: 'SYNTH SEQUENCER', cmd: 'synth', color: '#9d00ff' }
                ].map((macro) => (
                  <button
                    key={macro.label}
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('toggle-terminal', { detail: { open: true, command: macro.cmd } }));
                    }}
                    style={{
                      padding: '8px 12px',
                      background: 'rgba(255,255,255,0.02)',
                      border: `1px solid ${macro.color}25`,
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${macro.color}10`;
                      e.currentTarget.style.borderColor = macro.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = `${macro.color}25`;
                    }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: macro.color }}></span>
                    {macro.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
