import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playHover, playSuccess } from '../utils/audioManager';

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const TerminalConsole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { text: 'SYSTEM ONLINE. Type "help" to list available telemetry directives.', type: 'system' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const konamiIndexRef = useRef(0);
  const commandExecutorRef = useRef(null);

  // Snake game states
  const [isPlayingSnake, setIsPlayingSnake] = useState(false);
  const [snake, setSnake] = useState([[10, 6], [10, 7], [10, 8]]);
  const [food, setFood] = useState([5, 4]);
  const [dir, setDir] = useState([0, -1]); // Up
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeGameOver, setSnakeGameOver] = useState(false);

  const restartSnake = () => {
    setSnake([[10, 6], [10, 7], [10, 8]]);
    setFood([5, 4]);
    setDir([0, -1]);
    setSnakeScore(0);
    setSnakeGameOver(false);
  };

  useEffect(() => {
    // Scroll to terminal bottom on history updates
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
    // Listen for keys: tilde shortcut and Konami code sequence
    const handleKeyDown = (e) => {
      // Toggle console
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen((prev) => {
          const newState = !prev;
          playClick();
          return newState;
        });
      }

      // Konami sequence tracking
      if (e.key === konamiCode[konamiIndexRef.current]) {
        konamiIndexRef.current++;
        if (konamiIndexRef.current === konamiCode.length) {
          konamiIndexRef.current = 0;
          playSuccess();
          setIsOpen(true);
          setIsPlayingSnake(true);
          setSnake([[10, 6], [10, 7], [10, 8]]);
          setFood([5, 4]);
          setDir([0, -1]);
          setSnakeScore(0);
          setSnakeGameOver(false);
        }
      } else if (![ 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'b', 'a' ].includes(e.key)) {
        konamiIndexRef.current = 0;
      }
    };
    const handleToggleTerminal = (e) => {
      setIsOpen((prev) => {
        const next = e.detail?.open !== undefined ? e.detail.open : !prev;
        playClick();
        return next;
      });
      if (e.detail?.command && commandExecutorRef.current) {
        commandExecutorRef.current(null, e.detail.command);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-terminal', handleToggleTerminal);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-terminal', handleToggleTerminal);
    };
  }, []);

  useEffect(() => {
    commandExecutorRef.current = handleCommand;
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Snake controls keyboard listener
  useEffect(() => {
    if (!isPlayingSnake) return;
    const handleGameKeys = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }
      if (snakeGameOver) {
        if (e.key === 'Enter') {
          restartSnake();
        }
        return;
      }
      switch (e.key) {
        case 'ArrowUp':
          if (dir[1] !== 1) setDir([0, -1]);
          break;
        case 'ArrowDown':
          if (dir[1] !== -1) setDir([0, 1]);
          break;
        case 'ArrowLeft':
          if (dir[0] !== 1) setDir([-1, 0]);
          break;
        case 'ArrowRight':
          if (dir[0] !== -1) setDir([1, 0]);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleGameKeys);
    return () => window.removeEventListener('keydown', handleGameKeys);
  }, [isPlayingSnake, dir, snakeGameOver]);

  // Snake physics loop
  useEffect(() => {
    if (!isPlayingSnake || snakeGameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = [head[0] + dir[0], head[1] + dir[1]];

        // Wall collision
        if (newHead[0] < 0 || newHead[0] >= 20 || newHead[1] < 0 || newHead[1] >= 12) {
          setSnakeGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
          setSnakeGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          playSuccess();
          setSnakeScore((prev) => prev + 10);
          let newFood;
          do {
            newFood = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 12)];
          } while (newSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 160);
    return () => clearInterval(interval);
  }, [isPlayingSnake, dir, food, snakeGameOver]);

  // Git tracking states
  const [gitBranches, setGitBranches] = useState(['main', 'dev']);
  const [gitActiveBranch, setGitActiveBranch] = useState('main');

  const handleCommand = (e, commandOverride) => {
    if (e && e.key !== 'Enter') return;
    const rawInput = commandOverride !== undefined ? commandOverride : inputVal;
    const cmdLower = rawInput.trim().toLowerCase();
    const trimmedInput = rawInput.trim();
    if (!trimmedInput) return;

    playClick();
    const newHistory = [...history, { text: `(${gitActiveBranch}) $ ${rawInput}`, type: 'input' }];
    setInputVal('');
    let output;
    let logType = 'output';

    // Paint Overlay Trigger
    if (cmdLower === 'paint') {
      window.dispatchEvent(new CustomEvent('paint-toggle', { detail: { active: true } }));
      output = '[SUCCESS] Vector Paint Overlay activated. Left-click/drag mouse to paint. Select color in top panel or click Exit to return.';
      logType = 'system';
    }
    // Synth Overlay Trigger
    else if (cmdLower === 'synth') {
      window.dispatchEvent(new CustomEvent('synth-toggle', { detail: { active: true } }));
      output = '[SUCCESS] Tactile Synth Sequencer activated. Click keys to generate waveforms.';
      logType = 'system';
    }
    // Canvas styling override shortcuts
    else if (cmdLower.startsWith('canvas color') || cmdLower === 'canvas color') {
      const colorVal = cmdLower.substring(12).trim();
      if (!colorVal) {
        output = 'Usage: canvas color [color-name/hex/reset] (e.g. canvas color red, canvas color reset)';
      } else if (colorVal === 'reset') {
        window.dispatchEvent(new CustomEvent('canvas-color', { detail: { color: null } }));
        output = 'Canvas accent colors reset to theme variables.';
      } else {
        window.dispatchEvent(new CustomEvent('canvas-color', { detail: { color: colorVal } }));
        output = `Canvas accent override updated to: "${colorVal}"`;
      }
    }
    else if (cmdLower.startsWith('canvas warp')) {
      const args = cmdLower.substring(11).trim();
      const isActive = args !== 'reset' && args !== 'off';
      window.dispatchEvent(new CustomEvent('canvas-warp', { detail: { active: isActive } }));
      output = `Canvas warp animation: ${isActive ? 'ENABLED (DRIFT ACCELERATED)' : 'DISABLED (RESET)'}`;
    }
    // Git command family parser
    else if (cmdLower.startsWith('git ')) {
      const gitArgs = trimmedInput.substring(4).trim();
      
      // git branch
      if (gitArgs.toLowerCase() === 'branch') {
        output = gitBranches.map(b => b === gitActiveBranch ? `* ${b}` : `  ${b}`).join('\n');
      }
      else if (gitArgs.toLowerCase().startsWith('branch ')) {
        const newBranchName = gitArgs.substring(7).trim();
        if (!newBranchName) {
          output = 'fatal: branch name required';
        } else if (gitBranches.includes(newBranchName)) {
          output = `fatal: A branch named '${newBranchName}' already exists.`;
        } else {
          setGitBranches([...gitBranches, newBranchName]);
          window.dispatchEvent(new CustomEvent('git-command-executed', {
            detail: { type: 'branch', branchName: newBranchName }
          }));
          output = `Created branch '${newBranchName}'`;
        }
      }
      // git checkout
      else if (gitArgs.toLowerCase().startsWith('checkout ')) {
        const targetBranchName = gitArgs.substring(9).trim();
        if (!gitBranches.includes(targetBranchName)) {
          output = `error: pathspec '${targetBranchName}' did not match any file(s) known to git`;
        } else {
          setGitActiveBranch(targetBranchName);
          window.dispatchEvent(new CustomEvent('git-command-executed', {
            detail: { type: 'checkout', branchName: targetBranchName }
          }));
          output = `Switched to branch '${targetBranchName}'`;
        }
      }
      // git commit
      else if (gitArgs.toLowerCase().startsWith('commit')) {
        const mIdx = gitArgs.indexOf('-m');
        let message = '';
        if (mIdx !== -1) {
          let rawMsg = gitArgs.substring(mIdx + 2).trim();
          if ((rawMsg.startsWith('"') && rawMsg.endsWith('"')) || (rawMsg.startsWith("'") && rawMsg.endsWith("'"))) {
            message = rawMsg.substring(1, rawMsg.length - 1);
          } else {
            message = rawMsg;
          }
        }

        if (!message) {
          output = 'error: switch \'m\' requires a value\nUse format: git commit -m "your message"';
        } else {
          const sha = Math.random().toString(16).substring(2, 8);
          window.dispatchEvent(new CustomEvent('git-command-executed', {
            detail: { type: 'commit', message, sha }
          }));
          output = `[${gitActiveBranch} ${sha}] ${message}\n 1 file changed, 1 insertion(+)`;
        }
      }
      // git merge
      else if (gitArgs.toLowerCase().startsWith('merge ')) {
        const branchToMerge = gitArgs.substring(6).trim();
        if (!gitBranches.includes(branchToMerge)) {
          output = `merge: ${branchToMerge} - not something we can merge`;
        } else if (branchToMerge === gitActiveBranch) {
          output = 'Already up to date.';
        } else {
          const sha = Math.random().toString(16).substring(2, 8);
          window.dispatchEvent(new CustomEvent('git-command-executed', {
            detail: { type: 'merge', branchName: branchToMerge, sha }
          }));
          output = `Updating HEAD to merge branch '${branchToMerge}'\nFast-forward\nMerged branch '${branchToMerge}' into '${gitActiveBranch}'`;
        }
      }
      // git log
      else if (gitArgs.toLowerCase() === 'log') {
        output = 'commit f67c45 (HEAD -> main, origin/main)\nAuthor: Samir Jung Thapa <samirjungthapa7@gmail.com>\nDate:   Sun Jun 21 16:03:00 2026 +0545\n\n    feat: integrate PWA offline mode capability and custom service worker\n\ncommit d83a21\nAuthor: Samir Jung Thapa <samirjungthapa7@gmail.com>\nDate:   Sun Jun 21 15:52:00 2026 +0545\n\n    feat: add interactive HTML CV modal viewer and iframe print channel\n\ncommit b18d34\nAuthor: Samir Jung Thapa <samirjungthapa7@gmail.com>\nDate:   Sun Jun 21 14:15:00 2026 +0545\n\n    feat: implement dynamic theme switcher with Accent Color presets';
      }
      else {
        output = `Command not recognized: "${trimmedInput}". Type "help" for a directory of operations.`;
      }
    }
    else {
      switch (cmdLower) {
        case 'help':
          output = 'DIRECTIVES:\n  help      - Print active command directory\n  about     - Output operator biographical logs\n  skills    - Print key competencies profile\n  contact   - Print locations and communications sockets\n  neofetch  - Output system information stats\n  paint     - Open glowing Paint Overlay canvas\n  synth     - Launch oscillator synthesizer keyboard modal\n  git branch <name>   - Create or list git branches\n  git checkout <name> - Switch current working branch\n  git commit -m "msg" - Commit current changes to the pipeline graph\n  git merge <name>    - Merge target branch into current branch\n  git log   - Output repository version timeline\n  matrix    - Initialize neural falling code sequence\n  canvas warp  - Warp canvas speed (canvas warp reset to disable)\n  canvas color - Change canvas color (e.g. canvas color red / reset)\n  snake     - Launch playable retro ASCII Snake game\n  clear     - Wipe buffer history';
          break;
        case 'about':
          output = 'OPERATOR LOG: Samir Jung Thapa\nSECTOR: Morang, Nepal\nSTATUS: Pursuing B.Sc. (Hons) Computing at Itahari International College. Specializing in high-performance frontend interfaces.';
          break;
        case 'skills':
          output = 'KEY CAPABILITIES:\n- Frontend: React.js, JavaScript (ES6+), HTML5, CSS3\n- Databases: Node.js, MySQL, MongoDB\n- Logics: Python, Java, Git & GitHub';
          break;
        case 'contact':
          output = 'CHANNELS CONFIGURATION:\n- Email: Samirjungthapa7@gmail.com\n- Voice: 9822434711\n- Loc: Morang, Nepal';
          break;
        case 'neofetch':
          output = '    .////.          samir@jungthapa.dev\n   .////////.        -------------------\n  .///.  .///.       OS: PortfolioOS v3.5\n .///.    .///.      Kernel: React 19.2.6\n .///.    .///.      Uptime: 2h 45m\n  .///.  .///.       Shell: DiagnosticsConsole v2.0\n   .////////.        Resolution: ' + window.innerWidth + 'x' + window.innerHeight + '\n     .////.          Host: Samir.dev Platform\n                     Tech Stack: React, JavaScript, Vite, CSS3';
          break;
        case 'git':
          output = 'commit f67c45 (HEAD -> main, origin/main)\nAuthor: Samir Jung Thapa <samirjungthapa7@gmail.com>\nDate:   Sun Jun 21 16:03:00 2026 +0545\n\n    feat: integrate PWA offline mode capability and custom service worker\n\ncommit d83a21\nAuthor: Samir Jung Thapa <samirjungthapa7@gmail.com>\nDate:   Sun Jun 21 15:52:00 2026 +0545\n\n    feat: add interactive HTML CV modal viewer and iframe print channel\n\ncommit b18d34\nAuthor: Samir Jung Thapa <samirjungthapa7@gmail.com>\nDate:   Sun Jun 21 14:15:00 2026 +0545\n\n    feat: implement dynamic theme switcher with Accent Color presets';
          break;
        case 'matrix':
          output = 'INITIALIZING MATRIX DIGITAL RAIN COMPILER...\n\n 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 \n 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 \n 0 1   1 0   0 1   1 0   0 1   \n 1   0   1 0   1 0   1 0   1 0 \n   1   0   1   0   1   0   1   \n 0   1   0   1   0   1   0   1 \n\n[SUCCESS] Neural link established. System fully synchronized.';
          break;
        case 'snake':
          setIsPlayingSnake(true);
          setSnake([[10, 6], [10, 7], [10, 8]]);
          setFood([5, 4]);
          setDir([0, -1]);
          setSnakeScore(0);
          setSnakeGameOver(false);
          output = undefined;
          break;
        case 'clear':
          setHistory([]);
          output = undefined;
          break;
        default:
          output = `Command not recognized: "${trimmedInput}". Type "help" for a directory of operations.`;
      }
    }

    if (output !== undefined) {
      setHistory([...newHistory, { text: output, type: logType }]);
    }
  };

  const renderSnakeGrid = () => {
    const grid = [];
    for (let y = 0; y < 12; y++) {
      let row = '';
      for (let x = 0; x < 20; x++) {
        if (snake.some(segment => segment[0] === x && segment[1] === y)) {
          row += '■ ';
        } else if (food[0] === x && food[1] === y) {
          row += '★ ';
        } else {
          row += '· ';
        }
      }
      grid.push(row);
    }
    return grid.join('\n');
  };


  return (
    <>
      {/* Floating terminal trigger pill */}
      <motion.button
        onClick={() => { playClick(); setIsOpen(true); }}
        onMouseEnter={playHover}
        className="floating-terminal-trigger glass-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '30px',
          padding: '12px 20px',
          borderRadius: '50px',
          border: '1px solid rgba(226, 201, 153, 0.25)',
          background: 'rgba(15,13,12,0.85)',
          color: 'var(--accent-cyan)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '1px',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}
      >
        <i className="fa-solid fa-terminal"></i>
        <span>DIAGNOSTICS (~)</span>
      </motion.button>

      {/* Terminal popup overlay panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="terminal-overlay"
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(6,5,4,0.85)',
              backdropFilter: 'blur(16px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="terminal-console-window glass-card"
              onClick={(e) => { e.stopPropagation(); if (inputRef.current) inputRef.current.focus(); }}
              style={{
                width: '100%',
                maxWidth: '680px',
                height: '400px',
                background: 'rgba(3,3,3,0.95)',
                border: '1px solid rgba(226, 201, 153, 0.2)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0,0,0,0.8)'
              }}
            >
              {/* Terminal header */}
              <div 
                style={{ 
                  padding: '12px 20px', 
                  borderBottom: '1px solid rgba(255,255,255,0.06)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  background: 'rgba(255,255,255,0.02)' 
                }}
              >
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer' }} onClick={() => setIsOpen(false)}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span>
                </div>
                <span style={{ margin: '0 auto', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                  {isPlayingSnake ? 'RETRO_GRID - snake_simulator.bin' : 'HOST_SHELL - samir@jungthapa.dev'}
                </span>
              </div>

              {/* Console output buffer / Snake Game workspace */}
              {isPlayingSnake ? (
                <div 
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#080808',
                    fontFamily: 'Courier New, monospace',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '320px', fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                    <span>SCORE: {snakeScore}</span>
                    <span>CONTROLS: ARROW KEYS</span>
                  </div>

                  <pre 
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '8px 16px',
                      background: '#020202',
                      color: snakeGameOver ? '#ff5f56' : '#4af626',
                      lineHeight: '1.2',
                      fontSize: '0.9rem',
                      fontFamily: 'Courier New, monospace'
                    }}
                  >
                    {renderSnakeGrid()}
                  </pre>

                  <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                    {snakeGameOver ? (
                      <button onClick={restartSnake} className="btn btn-primary btn-sm" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                        Restart (Enter)
                      </button>
                    ) : null}
                    <button 
                      onClick={() => { playClick(); setIsPlayingSnake(false); }} 
                      className="btn btn-secondary btn-sm" 
                      style={{ padding: '6px 14px', fontSize: '0.75rem' }}
                    >
                      Exit Game
                    </button>
                  </div>

                  {snakeGameOver && (
                    <div style={{ color: '#ff5f56', fontSize: '0.75rem', marginTop: '8px', fontWeight: 'bold' }}>
                      GAME OVER! System loop crashed.
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div 
                    style={{ 
                      flexGrow: 1, 
                      padding: '20px', 
                      overflowY: 'auto', 
                      fontFamily: 'Courier New, monospace', 
                      fontSize: '0.88rem', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '10px' 
                    }}
                  >
                    {history.map((line, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          whiteSpace: 'pre-wrap',
                          color: line.type === 'input' ? 'var(--text-primary)' : line.type === 'system' ? 'var(--accent-cyan)' : '#4af626'
                        }}
                      >
                        {line.text}
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>

                  {/* Terminal input prompt */}
                  <div 
                    style={{ 
                      padding: '16px 20px', 
                      borderTop: '1px solid rgba(255,255,255,0.06)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      background: 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <span style={{ fontFamily: 'Courier New, monospace', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>({gitActiveBranch}) $</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={handleCommand}
                      style={{
                        flexGrow: 1,
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontFamily: 'Courier New, monospace',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                      placeholder="Enter directive..."
                      autoFocus
                    />
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalConsole;
