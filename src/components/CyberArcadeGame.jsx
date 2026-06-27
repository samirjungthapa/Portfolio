import { useEffect, useRef, useState } from 'react';
import { playClick } from '../utils/audioManager';

const CyberArcadeGame = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('arcade-high-score') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);

  // Audio effects synthesized locally via Web Audio API
  const playSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);

      if (type === 'laser') {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        osc.start();
        osc.stop(now + 0.15);
      } else if (type === 'explosion') {
        const bufferSize = ctx.sampleRate * 0.25; // 0.25 seconds of noise
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(40, now + 0.25);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        noise.connect(filter);
        filter.connect(gain);
        noise.start();
        noise.stop(now + 0.25);
      }
    } catch (e) {
      console.warn("Audio Context init failed:", e);
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set fixed internally sized grid, but handle CSS sizing dynamically
    canvas.width = 600;
    canvas.height = 400;

    let ship = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: 10,
      angle: -Math.PI / 2,
      rotation: 0,
      thrusting: false,
      thrust: { x: 0, y: 0 }
    };

    let asteroids = [];
    let lasers = [];
    let particles = [];
    let animationFrameId;
    let localScore = 0;

    // Controls
    const keys = {};
    const handleKeyDown = (e) => {
      keys[e.code] = true;
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent page scroll
        shootLaser();
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e) => {
      keys[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Helpers
    const createAsteroid = (x, y, radius) => {
      const sides = Math.floor(Math.random() * 5) + 7;
      const offsets = [];
      for (let i = 0; i < sides; i++) {
        offsets.push(Math.random() * 0.4 + 0.8);
      }
      asteroids.push({
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height,
        vx: (Math.random() * 2 - 1) * 1.5,
        vy: (Math.random() * 2 - 1) * 1.5,
        r: radius || 30,
        sides,
        offsets
      });
    };

    const spawnParticles = (x, y, color) => {
      for (let i = 0; i < 12; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() * 2 - 1) * 3,
          vy: (Math.random() * 2 - 1) * 3,
          alpha: 1,
          color: color || '#ff3366'
        });
      }
    };

    const shootLaser = () => {
      if (gameOver) return;
      playSound('laser');
      lasers.push({
        x: ship.x + 4 / 3 * ship.r * Math.cos(ship.angle),
        y: ship.y + 4 / 3 * ship.r * Math.sin(ship.angle),
        vx: 8 * Math.cos(ship.angle),
        vy: 8 * Math.sin(ship.angle),
        life: 50
      });
    };

    // Initial Spawning
    for (let i = 0; i < 4; i++) {
      createAsteroid(null, null, 30);
    }

    // Main Game Loop
    const update = () => {
      // 1. Ship Rotation & Thrust
      if (keys['ArrowLeft'] || keys['KeyA']) {
        ship.angle -= 0.08;
      }
      if (keys['ArrowRight'] || keys['KeyD']) {
        ship.angle += 0.08;
      }
      if (keys['ArrowUp'] || keys['KeyW']) {
        ship.thrusting = true;
        ship.thrust.x += 0.15 * Math.cos(ship.angle);
        ship.thrust.y += 0.15 * Math.sin(ship.angle);
      } else {
        ship.thrusting = false;
        ship.thrust.x *= 0.98;
        ship.thrust.y *= 0.98;
      }

      ship.x += ship.thrust.x;
      ship.y += ship.thrust.y;

      // Wrap ship boundaries
      if (ship.x < -ship.r) ship.x = canvas.width + ship.r;
      if (ship.x > canvas.width + ship.r) ship.x = -ship.r;
      if (ship.y < -ship.r) ship.y = canvas.height + ship.r;
      if (ship.y > canvas.height + ship.r) ship.y = -ship.r;

      // 2. Lasers
      for (let i = lasers.length - 1; i >= 0; i--) {
        const l = lasers[i];
        l.x += l.vx;
        l.y += l.vy;
        l.life--;
        if (l.life <= 0) {
          lasers.splice(i, 1);
        }
      }

      // 3. Asteroids
      for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        a.x += a.vx;
        a.y += a.vy;

        // Warp bounds
        if (a.x < -a.r) a.x = canvas.width + a.r;
        if (a.x > canvas.width + a.r) a.x = -a.r;
        if (a.y < -a.r) a.y = canvas.height + a.r;
        if (a.y > canvas.height + a.r) a.y = -a.r;

        // Collision Check with Ship
        const dist = Math.hypot(ship.x - a.x, ship.y - a.y);
        if (dist < ship.r + a.r && !gameOver) {
          playSound('explosion');
          spawnParticles(ship.x, ship.y, '#ffffff');
          setGameOver(true);
          setHighScore((prev) => {
            const nextHighScore = Math.max(prev, localScore);
            localStorage.setItem('arcade-high-score', nextHighScore.toString());
            return nextHighScore;
          });
        }

        // Collision with Lasers
        for (let j = lasers.length - 1; j >= 0; j--) {
          const l = lasers[j];
          const lDist = Math.hypot(l.x - a.x, l.y - a.y);
          if (lDist < a.r) {
            playSound('explosion');
            spawnParticles(a.x, a.y, 'var(--accent-cyan)');
            lasers.splice(j, 1);

            // Break up asteroid
            if (a.r > 15) {
              createAsteroid(a.x, a.y, a.r / 2);
              createAsteroid(a.x, a.y, a.r / 2);
            }
            asteroids.splice(i, 1);
            localScore += 100;
            setScore(localScore);
            break;
          }
        }
      }

      // Respawn asteroids if empty
      if (asteroids.length === 0) {
        for (let i = 0; i < 5; i++) {
          createAsteroid(null, null, 30);
        }
      }

      // 4. Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      // Render
      ctx.fillStyle = '#06060c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid backdrop
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Particles
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Lasers
      ctx.strokeStyle = 'var(--accent-blue)';
      ctx.lineWidth = 3;
      lasers.forEach((l) => {
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x - l.vx * 1.5, l.y - l.vy * 1.5);
        ctx.stroke();
      });

      // Draw Ship
      if (!gameOver) {
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Nose
        ctx.moveTo(4 / 3 * ship.r, 0);
        // Back Left
        ctx.lineTo(-ship.r * (2 / 3 + 1 / 3), -ship.r);
        // Back Right
        ctx.lineTo(-ship.r * (2 / 3 + 1 / 3), ship.r);
        ctx.closePath();
        ctx.stroke();

        // Thrust Flame
        if (ship.thrusting) {
          ctx.strokeStyle = 'var(--accent-cyan)';
          ctx.beginPath();
          ctx.moveTo(-ship.r * (2 / 3 + 1 / 3), -ship.r / 2);
          ctx.lineTo(-ship.r * (2 / 3 + 1.2), 0);
          ctx.lineTo(-ship.r * (2 / 3 + 1 / 3), ship.r / 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw Asteroids
      ctx.strokeStyle = 'var(--accent-cyan)';
      ctx.lineWidth = 2;
      asteroids.forEach((a) => {
        ctx.beginPath();
        for (let j = 0; j < a.sides; j++) {
          const angle = (j / a.sides) * Math.PI * 2;
          const r = a.r * a.offsets[j];
          const x = a.x + r * Math.cos(angle);
          const y = a.y + r * Math.sin(angle);
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, gameOver]);



  const startGame = () => {
    playClick();
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.8rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
        <span>SCORE: <span style={{ color: 'var(--accent-cyan)' }}>{score}</span></span>
        <span>HI-SCORE: <span style={{ color: 'var(--text-primary)' }}>{highScore}</span></span>
      </div>

      {/* Main Canvas Frame */}
      <div style={{ position: 'relative', flexGrow: 1, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#06060c' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* Start / Game Over Overlay */}
        {(!isPlaying || gameOver) && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(5, 5, 10, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'monospace',
            textAlign: 'center',
            padding: '20px'
          }}>
            {gameOver ? (
              <>
                <h4 style={{ color: '#ff3366', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px', textShadow: '0 0 10px rgba(255, 51, 102, 0.5)' }}>SYSTEM CRASH</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>Game Over. Score: {score}</p>
              </>
            ) : (
              <>
                <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px' }}>CYBER_GRID_ARCADE</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '20px', maxWidth: '300px', lineHeight: '1.5' }}>
                  Avoid the digital debris. Rotate with Left/Right or A/D keys. Thrust with Up or W. Fire with SPACEBAR.
                </p>
              </>
            )}

            <button
              onClick={startGame}
              className="btn"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--accent-cyan)',
                color: 'var(--accent-cyan)',
                padding: '10px 24px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                cursor: 'pointer',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 0 12px rgba(201, 162, 39, 0.15)'
              }}
            >
              {gameOver ? 'REBOOT GAME' : 'INITIALIZE'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberArcadeGame;
