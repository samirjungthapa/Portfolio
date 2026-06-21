import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const actions = [
  { id: 'home', label: 'Go to Home', icon: 'fa-solid fa-house', shortcut: 'G H', action: 'scroll' },
  { id: 'about', label: 'Go to About', icon: 'fa-solid fa-user', shortcut: 'G A', action: 'scroll' },
  { id: 'skills', label: 'Go to Skills', icon: 'fa-solid fa-code', shortcut: 'G S', action: 'scroll' },
  { id: 'projects', label: 'Go to Projects', icon: 'fa-solid fa-laptop-code', shortcut: 'G P', action: 'scroll' },
  { id: 'github', label: 'Open GitHub Profile', icon: 'fa-brands fa-github', shortcut: 'O G', action: 'url', url: 'https://github.com/samirjungthapa' },
  { id: 'linkedin', label: 'Open LinkedIn Profile', icon: 'fa-brands fa-linkedin', shortcut: 'O L', action: 'url', url: 'https://www.linkedin.com/in/samir-jung-thapa-21aaa83b6' },
  { id: 'resume', label: 'View Resume (Interactive/Print)', icon: 'fa-solid fa-file-pdf', shortcut: 'D R', action: 'custom' },
  { id: 'vscode', label: 'Open VS Code Mode (Mock IDE Editor)', icon: 'fa-solid fa-code', shortcut: 'O V', action: 'custom' },
  { id: 'contact', label: 'Go to Contact', icon: 'fa-solid fa-paper-plane', shortcut: 'G C', action: 'scroll' }
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = actions.filter((act) =>
    act.label.toLowerCase().includes(search.toLowerCase())
  );

  const triggerAction = (item) => {
    setIsOpen(false);
    if (item.action === 'scroll') {
      const target = document.getElementById(item.id);
      if (target) {
        // Dispatch page transition event
        window.dispatchEvent(new CustomEvent('page-transition-trigger'));
        setTimeout(() => {
          if (window.lenis) {
            window.lenis.scrollTo(target, { offset: -80, immediate: true });
          } else {
            target.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }, 350);
      }
    } else if (item.action === 'url') {
      window.open(item.url, '_blank');
    } else if (item.action === 'custom') {
      if (item.id === 'resume') {
        window.dispatchEvent(new CustomEvent('open-resume-modal'));
      } else if (item.id === 'vscode') {
        window.dispatchEvent(new CustomEvent('open-vscode-mode'));
      }
    }
  };

  // Key listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch('');
        setSelectedIndex(0);
      }
      
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          triggerAction(filtered[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, search, selectedIndex, filtered]);

  // Autofocus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="cmd-palette-backdrop"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(5, 5, 5, 0.7)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="glass-card cmd-palette-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '600px',
              background: 'rgba(8, 8, 8, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Search Input Bar */}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', padding: '16px 20px' }}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--text-muted)', marginRight: '12px' }}></i>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search actions, sections, profiles..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)'
                }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>ESC</span>
            </div>

            {/* Actions List */}
            <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '8px' }}>
              {filtered.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '24px', fontSize: '0.9rem' }}>
                  No matches found. Try searching for "Github" or "Projects"
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => triggerAction(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <i className={item.icon} style={{ width: '18px', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)' }}></i>
                        <span style={{ fontSize: '0.9rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{item.label}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {item.shortcut.split(" ").map((key, kIdx) => (
                          <span key={kIdx} style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', background: isSelected ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>{key}</span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Help Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.06)', padding: '12px 20px', background: 'rgba(2, 2, 2, 0.5)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Use ↑ ↓ arrow keys to select, ENTER to run</span>
              <span>Ctrl + K to toggle</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
