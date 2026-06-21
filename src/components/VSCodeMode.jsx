import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playSuccess, playHover } from '../utils/audioManager';

const files = {
  'about.json': `{
  "name": "Samir Jung Thapa",
  "role": "Frontend Web Developer & Computing Student",
  "location": "Morang, Nepal",
  "education": "B.Sc. (Hons) Computing @ Itahari International College",
  "status": "Available for Freelance Deployments",
  "interests": [
    "High-fidelity UI Architecture",
    "Interactive 3D Environments",
    "Performance Optimization",
    "Clean-Code Systems"
  ]
}`,
  'skills.js': `// System Capabilities Telemetry Profile
export const technicalSkills = {
  frontend: [
    "React.js",
    "Next.js",
    "JavaScript (ES6+)",
    "TypeScript",
    "Tailwind CSS"
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Java",
    "SQLite / Sequelize"
  ],
  tools: [
    "Git & GitHub",
    "Python",
    "Vite Bundling Solutions"
  ]
};`,
  'projects.json': `[
  {
    "id": "courier-nepal",
    "name": "Courier Nepal",
    "stack": ["React", "TypeScript", "Redux", "Node.js", "Express", "SQLite"],
    "features": "Multi-role dashboard portals, real-time tracking, integrated parcel helper AI assistant"
  },
  {
    "id": "thapamart",
    "name": "ThapaMart E-Commerce",
    "stack": ["React", "Redux Toolkit", "Node.js", "Express", "Tailwind CSS", "JWT"],
    "features": "Encrypted JWT session storage, dynamic catalog queries, full admin dashboard panel"
  }
]`,
  'contact.json': `{
  "email": "Samirjungthapa7@gmail.com",
  "phone": "9822434711",
  "github": "https://github.com/samirjungthapa",
  "linkedin": "https://www.linkedin.com/in/samir-jung-thapa-21aaa83b6"
}`,
  'snake.js': `// Retro Snake Module Console Setup
// Click Initialize Game to start the Matrix control loop inside editor.
// steer using Arrow keys or WASD.`
};

const RetroSnake = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const directionRef = useRef({ x: 1, y: 0 });
  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 5, y: 5 });
  const intervalIdRef = useRef(null);

  const startNewGame = () => {
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
    directionRef.current = { x: 1, y: 0 };
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    placeFood();
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(gameStep, 100);
  };

  const placeFood = () => {
    foodRef.current = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    };
  };

  const gameStep = () => {
    const snake = [...snakeRef.current];
    const head = {
      x: snake[0].x + directionRef.current.x,
      y: snake[0].y + directionRef.current.y
    };

    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      handleGameOver();
      return;
    }
    for (let segment of snake) {
      if (segment.x === head.x && segment.y === head.y) {
        handleGameOver();
        return;
      }
    }

    snake.unshift(head);

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore((prev) => prev + 10);
      placeFood();
    } else {
      snake.pop();
    }

    snakeRef.current = snake;
    draw();
  };

  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, 400, 400);

    ctx.strokeStyle = '#252526';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 20; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 20, 0);
      ctx.lineTo(i * 20, 400);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * 20);
      ctx.lineTo(400, i * 20);
      ctx.stroke();
    }

    ctx.fillStyle = 'var(--accent-cyan)';
    ctx.fillRect(foodRef.current.x * 20 + 2, foodRef.current.y * 20 + 2, 16, 16);

    snakeRef.current.forEach((segment, idx) => {
      ctx.fillStyle = idx === 0 ? '#00f2fe' : 'rgba(0, 242, 254, 0.6)';
      ctx.fillRect(segment.x * 20 + 2, segment.y * 20 + 2, 16, 16);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;
      const key = e.key;
      const currentDir = directionRef.current;

      if ((key === 'ArrowUp' || key === 'w') && currentDir.y === 0) {
        directionRef.current = { x: 0, y: -1 };
        e.preventDefault();
      } else if ((key === 'ArrowDown' || key === 's') && currentDir.y === 0) {
        directionRef.current = { x: 0, y: 1 };
        e.preventDefault();
      } else if ((key === 'ArrowLeft' || key === 'a') && currentDir.x === 0) {
        directionRef.current = { x: -1, y: 0 };
        e.preventDefault();
      } else if ((key === 'ArrowRight' || key === 'd') && currentDir.x === 0) {
        directionRef.current = { x: 1, y: 0 };
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    draw();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [gameStarted]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', margin: 'auto' }}>
      <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>SCORE: {score}</div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: '2px solid rgba(255,255,255,0.08)', background: '#1e1e1e', borderRadius: '4px', maxWidth: '100%', height: 'auto' }}
      />
      <div>
        {!gameStarted ? (
          <button
            onClick={startNewGame}
            style={{
              padding: '8px 24px',
              fontSize: '0.8rem',
              borderRadius: '4px',
              background: 'var(--accent-gradient)',
              color: '#050505',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontWeight: 'bold'
            }}
          >
            {gameOver ? 'RESTART MATRIX' : 'INITIALIZE GAME'}
          </button>
        ) : (
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Use WASD / Arrow Keys to steer</div>
        )}
      </div>
      {gameOver && <div style={{ color: '#ff0055', fontSize: '0.85rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>COLLISION_DETECTED: GAME OVER</div>}
    </div>
  );
};

const VSCodeMode = ({ isOpen, onClose }) => {
  const [activeFile, setActiveFile] = useState('about.json');
  const [openTabs, setOpenTabs] = useState(['about.json']);

  const handleFileClick = (filename) => {
    playClick();
    if (!openTabs.includes(filename)) {
      setOpenTabs([...openTabs, filename]);
    }
    setActiveFile(filename);
  };

  const closeTab = (filename, e) => {
    e.stopPropagation();
    playClick();
    const newTabs = openTabs.filter(t => t !== filename);
    setOpenTabs(newTabs);
    if (activeFile === filename && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100100,
            background: '#1e1e1e',
            color: '#d4d4d4',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Top Bar / Menu HUD */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#3c3c3c', padding: '6px 16px', fontSize: '0.72rem', borderBottom: '1px solid #2b2b2b', color: '#cccccc' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <i className="fa-brands fa-square-js" style={{ color: '#F1E05A', fontSize: '0.9rem' }}></i>
              <span>Samir.dev - Visual Studio Code Mode</span>
              <span style={{ color: '#858585' }}>samirjungthapa &gt; Portfolio &gt; src &gt; {activeFile}</span>
            </div>
            <button 
              onClick={() => { playSuccess(); onClose(); }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '4px 10px',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.7rem'
              }}
            >
              Exit VS Code Mode (ESC)
            </button>
          </div>

          <div style={{ display: 'flex', flexGrow: 1 }}>
            {/* Leftmost Sidebar / Activities */}
            <div style={{ width: '48px', background: '#333333', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '16px', borderRight: '1px solid #2b2b2b', color: '#858585' }}>
              <i className="fa-regular fa-copy" style={{ color: '#fff', fontSize: '1.25rem', cursor: 'pointer' }}></i>
              <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '1.1rem', cursor: 'pointer' }}></i>
              <i className="fa-solid fa-code-branch" style={{ fontSize: '1.1rem', cursor: 'pointer' }}></i>
              <i className="fa-solid fa-bug" style={{ fontSize: '1.1rem', cursor: 'pointer' }}></i>
              <i className="fa-solid fa-puzzle-piece" style={{ fontSize: '1.1rem', cursor: 'pointer' }}></i>
            </div>

            {/* Sidebar / Files Explorer */}
            <div style={{ width: '220px', background: '#252526', display: 'flex', flexDirection: 'column', borderRight: '1px solid #2b2b2b' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', padding: '10px 16px', color: '#bbbbbb', letterSpacing: '0.5px' }}>Explorer</span>
              <div style={{ padding: '0 8px' }}>
                <span style={{ fontSize: '0.72rem', color: '#cccccc', display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', fontWeight: 'bold' }}>
                  <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.6rem' }}></i> PORTFOLIO
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '16px' }}>
                  {Object.keys(files).map((filename) => {
                    const isJS = filename.endsWith('.js');
                    const isActive = activeFile === filename;
                    return (
                      <button
                        key={filename}
                        onClick={() => handleFileClick(filename)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          textAlign: 'left',
                          width: '100%',
                          background: isActive ? '#37373d' : 'transparent',
                          color: isActive ? '#ffffff' : '#cccccc',
                          cursor: 'pointer'
                        }}
                      >
                        <i className={`fa-solid ${isJS ? 'fa-file-code' : 'fa-file-lines'}`} style={{ color: isJS ? '#f1e05a' : '#00f2fe', width: '12px' }}></i>
                        {filename}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Code Editor Panel */}
            <div style={{ flexGrow: 1, background: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
              {/* Tab Bar */}
              <div style={{ display: 'flex', background: '#2d2d2d', borderBottom: '1px solid #2b2b2b', overflowX: 'auto', height: '35px' }}>
                {openTabs.map((tab) => {
                  const isActive = activeFile === tab;
                  const isJS = tab.endsWith('.js');
                  return (
                    <div
                      key={tab}
                      onClick={() => { playClick(); setActiveFile(tab); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '0 16px',
                        background: isActive ? '#1e1e1e' : '#2d2d2d',
                        borderRight: '1px solid #252526',
                        color: isActive ? '#ffffff' : '#969696',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        height: '100%',
                        borderTop: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent'
                      }}
                    >
                      <i className={`fa-solid ${isJS ? 'fa-file-code' : 'fa-file-lines'}`} style={{ color: isJS ? '#f1e05a' : '#00f2fe', fontSize: '0.7rem' }}></i>
                      <span>{tab}</span>
                      <i 
                        className="fa-solid fa-xmark" 
                        onClick={(e) => closeTab(tab, e)}
                        style={{ fontSize: '0.65rem', padding: '2px', borderRadius: '20%', cursor: 'pointer', marginLeft: '6px' }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Editor Workspace Content */}
              {openTabs.length === 0 ? (
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: '#666666' }}>
                  No open files in Editor. Select a file from the explorer pane.
                </div>
              ) : activeFile === 'snake.js' ? (
                <div style={{ flexGrow: 1, display: 'flex', overflow: 'auto', padding: '20px' }}>
                  <RetroSnake />
                </div>
              ) : (
                <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto', display: 'flex', gap: '16px' }}>
                  {/* Line Numbers column */}
                  <div style={{ color: '#858585', textAlign: 'right', userSelect: 'none', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '3.6px' }}>
                    {files[activeFile].split('\n').map((_, idx) => (
                      <div key={idx}>{idx + 1}</div>
                    ))}
                  </div>
                  {/* Syntax Highlighted editor block */}
                  <pre style={{ margin: 0, padding: 0, color: '#9cdcfe', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', lineHeight: '1.45', tabSize: 2, whiteSpace: 'pre-wrap' }}>
                    <code>
                      {files[activeFile]}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* VS Code Bottom Status Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#007acc', color: '#ffffff', padding: '3px 10px', fontSize: '0.68rem', height: '22px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <span style={{ background: '#1f8ad2', padding: '0 6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <i className="fa-solid fa-code"></i> Main
              </span>
              <span><i className="fa-solid fa-rotate"></i> Synchronized</span>
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <span>Ln 1, Col 1</span>
              <span>Spaces: 2</span>
              <span>UTF-8</span>
              <span>JavaScript / JSON</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VSCodeMode;
