import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playHover, playSuccess } from '../utils/audioManager';

const PRESETS = [
  { label: 'Who is Samir?', query: 'tell me about samir' },
  { label: 'Open VS Code Mode', query: 'open vscode' },
  { label: 'Scroll to Projects', query: 'show projects' },
  { label: 'Contact Details', query: 'get contact' }
];

const BOT_DATA = {
  welcome: "SYSTEM: Connection established. Neural Net loaded. How may I assist you today? I can guide you through Samir's portfolio, scroll to sections, or open interactive modes.",
  who: "Samir Jung Thapa is a computing student at Itahari International College and a creative Frontend Web Developer. He is based in Nepal and builds ultra-premium, interactive web projects.",
  vscode: "Understood. Initializing VS Code simulation interface now...",
  projects: "Directing viewport focus to Samir's featured projects. Check out the rotating 3D particle cube behind the project cards!",
  contact: "Samir's credentials:\n• Email: Samirjungthapa7@gmail.com\n• Phone: 9822434711\n• LinkedIn: linkedin.com/in/samir-jung-thapa-21aaa83b6",
  skills: "Samir's current technical stack:\n• Frontend: React, Three.js, GSAP, TailwindCSS\n• Backend: Node.js, Express, Java, SQLite, RESTful API design",
  fallback: "Query analyzed but no matching database records were retrieved. Try typing 'open vscode', 'show projects', 'skills', or 'contact'."
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: BOT_DATA.welcome, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('portfolio-gemini-key') || '');
  const [showKeySettings, setShowKeySettings] = useState(false);
  const [inputKey, setInputKey] = useState('');
  
  const chatEndRef = useRef(null);
  const speechSynthRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/SYSTEM:|•|•\s*/g, ''));
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSaveApiKey = () => {
    try { playSuccess(); } catch (e) {}
    setApiKey(inputKey);
    localStorage.setItem('portfolio-gemini-key', inputKey);
    setShowKeySettings(false);
    setInputKey('');
    setMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: inputKey ? 'SYSTEM: Gemini API Key successfully saved and integrated. Dynamic AI mode active!' : 'SYSTEM: API Key cleared. Running in standard local simulation mode.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text, time: userTimestamp }]);
    setInputVal('');
    setIsTyping(true);
    playClick();

    // Check query for Portfolio Action Triggers
    const query = text.toLowerCase();
    let actionTriggered = false;

    if (query.includes('vscode') || query.includes('ide') || query.includes('editor')) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-vscode-mode'));
      }, 1200);
      actionTriggered = 'vscode';
    } else {
      const sections = ['about', 'education', 'experience', 'skills', 'certifications', 'services', 'projects', 'contact'];
      const targetSection = sections.find(sec => query.includes(sec));
      if (targetSection) {
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            if (window.lenis) window.lenis.scrollTo(el, { offset: -80 });
            else el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1200);
        actionTriggered = targetSection;
      }
    }

    let responseText = '';

    if (apiKey) {
      try {
        const sysInstruction = `You are the professional AI Assistant for Samir Jung Thapa's online portfolio.
Samir is a computing student at Itahari International College and a creative Frontend Developer based in Nepal.
Stack: React, Three.js, GSAP, TailwindCSS, Node.js, Express, Java, SQLite, REST APIs.
Email: Samirjungthapa7@gmail.com. Phone: 9822434711. LinkedIn: linkedin.com/in/samir-jung-thapa-21aaa83b6.
Keep responses concise (2-3 sentences max) and themed like a high-tech system console log. Avoid bullet points if possible.`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${sysInstruction}\n\nUser Question: ${text}` }] }]
            })
          }
        );
        const data = await res.json();
        responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'SYSTEM_ERR: Failed to parse Gemini response payload.';
      } catch (err) {
        responseText = `SYSTEM_ERR: Connection to Gemini API failed. Falling back to local index. Detail: ${err.message}`;
      }
    }

    if (!responseText) {
      // Fallback: Get matching local response text
      responseText = BOT_DATA.fallback;
      if (actionTriggered === 'vscode') responseText = BOT_DATA.vscode;
      else if (actionTriggered === 'projects') responseText = BOT_DATA.projects;
      else if (actionTriggered === 'contact') responseText = BOT_DATA.contact;
      else if (actionTriggered) responseText = `Acknowledged. Re-focusing viewport layout on the ${actionTriggered} section...`;
      else if (query.includes('who') || query.includes('samir') || query.includes('about')) responseText = BOT_DATA.who;
      else if (query.includes('skill') || query.includes('stack') || query.includes('code')) responseText = BOT_DATA.skills;
    }

    // Simulate streaming text response
    setIsTyping(false);
    const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Initialize an empty message and stream text character by character
    const words = responseText.split(' ');
    let currentText = '';
    let wordIdx = 0;
    
    setMessages((prev) => [...prev, { sender: 'bot', text: '', time: botTimestamp, isStreaming: true }]);

    const interval = setInterval(() => {
      if (wordIdx < words.length) {
        currentText += (wordIdx === 0 ? '' : ' ') + words[wordIdx];
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            sender: 'bot',
            text: currentText,
            time: botTimestamp,
            isStreaming: wordIdx < words.length - 1
          };
          return updated;
        });
        wordIdx++;
      } else {
        clearInterval(interval);
        playSuccess();
      }
    }, 45);
  };

  return (
    <>
      {/* Floating Badge Trigger */}
      <div style={{ position: 'fixed', bottom: '150px', right: '30px', zIndex: 999, pointerEvents: 'auto' }}>
        <button
          onClick={() => { playClick(); setIsOpen(!isOpen); }}
          onMouseEnter={playHover}
          className="glass-card"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px solid rgba(0, 242, 254, 0.35)',
            background: isOpen ? 'rgba(0, 242, 254, 0.15)' : 'rgba(15,13,12,0.9)',
            color: 'var(--accent-cyan)',
            boxShadow: '0 8px 32px rgba(0,242,254,0.15)'
          }}
          aria-label="Toggle Advanced AI Assistant"
        >
          <div style={{ position: 'relative' }}>
            <i className="fa-solid fa-brain" style={{ fontSize: '1.25rem' }}></i>
            <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', border: '1.5px solid #000' }}></span>
          </div>
        </button>
      </div>

      {/* Advanced UI Chat Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="glass-card"
            style={{
              position: 'fixed',
              bottom: '215px',
              right: '30px',
              width: '380px',
              height: '500px',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              background: 'rgba(4, 4, 6, 0.97)',
              border: '1px solid rgba(0, 242, 254, 0.15)',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 242, 254, 0.05)'
            }}
          >
            {/* Holographic Glowing Border Accent */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #ff007f, var(--accent-cyan), #00f2fe)', width: '100%' }}></div>

            {/* Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.015)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-microchip" style={{ color: 'var(--accent-cyan)', animation: 'pulse 2s infinite' }}></i>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)', letterSpacing: '0.5px', fontFamily: 'var(--font-mono)' }}>CORE_INTELLIGENCE.EXE</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.62rem', color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}></div>
                    SYNC: ACTIVE | LATENCY: 22ms
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { playClick(); setIsOpen(false); }}
                style={{ color: 'var(--text-muted)', cursor: 'pointer', opacity: 0.7 }}
                onMouseEnter={playHover}
              >
                <i className="fa-solid fa-xmark" style={{ fontSize: '1rem' }}></i>
              </button>
            </div>

            {/* Neural Telemetry Monitor */}
            <div style={{ padding: '4px 16px', background: 'rgba(0, 242, 254, 0.03)', borderBottom: '1px solid rgba(0, 242, 254, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', opacity: 0.8 }}>
              <span>MEM_LOAD: 14.8%</span>
              <div 
                onClick={(e) => { 
                  e.stopPropagation();
                  try { playClick(); } catch(err) {}
                  setShowKeySettings(prev => !prev); 
                }}
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4.5px', 
                  color: apiKey ? '#10b981' : 'var(--accent-cyan)',
                  position: 'relative',
                  zIndex: 1060,
                  pointerEvents: 'auto',
                  background: 'rgba(0, 242, 254, 0.05)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: apiKey ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(0, 242, 254, 0.2)',
                  userSelect: 'none'
                }}
              >
                <i className="fa-solid fa-gear" style={{ fontSize: '0.65rem' }}></i>
                <span>{apiKey ? 'GEMINI: ON' : 'GEMINI: OFF'}</span>
              </div>
            </div>

            {/* Settings Overlay for API Key */}
            {showKeySettings && (
              <div style={{
                position: 'absolute',
                top: '90px',
                left: '16px',
                right: '16px',
                background: 'rgba(10, 10, 15, 0.98)',
                border: '1px solid var(--accent-cyan)',
                borderRadius: '8px',
                padding: '16px',
                zIndex: 1100,
                pointerEvents: 'auto',
                boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
              }}>
                <h4 style={{ fontSize: '0.75rem', color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>[GEMINI_API_CONFIG]</h4>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.4' }}>
                  Paste a client-side Gemini API key to activate dynamic conversations. Keys are saved strictly in your local storage.
                </p>
                <input 
                  type="password" 
                  placeholder="Paste AI key here..." 
                  value={inputKey} 
                  onChange={(e) => setInputKey(e.target.value)} 
                  style={{
                    width: '100%',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '12px',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="button"
                    onClick={handleSaveApiKey}
                    className="btn btn-sm btn-primary"
                    style={{ flex: 1, padding: '6px', fontSize: '0.65rem', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', background: 'var(--accent-gradient)', color: '#050505', fontWeight: 'bold' }}
                  >
                    Save Key
                  </button>
                  <button 
                    type="button"
                    onClick={() => { 
                      try { playClick(); } catch (e) {}
                      setShowKeySettings(false); 
                    }}
                    className="btn btn-sm btn-secondary"
                    style={{ flex: 1, padding: '6px', fontSize: '0.65rem', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Message Thread */}
            <div 
              className="ai-chat-messages"
              style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '88%',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '12px 15px',
                      borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                      background: msg.sender === 'user' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.025)',
                      color: msg.sender === 'user' ? '#040406' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontFamily: msg.sender === 'bot' ? 'var(--font-mono)' : 'inherit',
                      whiteSpace: 'pre-line',
                      border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      boxShadow: msg.sender === 'user' ? '0 8px 20px rgba(201,162,39,0.15)' : 'none',
                      position: 'relative'
                    }}
                  >
                    {msg.text}
                    
                    {/* TTS Speaker Icon on bot replies */}
                    {msg.sender === 'bot' && !msg.isStreaming && (
                      <button
                        onClick={() => speakText(msg.text)}
                        style={{
                          position: 'absolute',
                          bottom: '-22px',
                          right: '2px',
                          background: 'transparent',
                          color: 'var(--text-muted)',
                          fontSize: '0.65rem',
                          cursor: 'pointer',
                          opacity: 0.6,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <i className="fa-solid fa-volume-high"></i>
                        <span>Speak</span>
                      </button>
                    )}
                  </div>
                  <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', marginTop: '6px', padding: '0 4px', fontFamily: 'var(--font-mono)' }}>
                    {msg.time}
                  </span>
                </div>
              ))}
              
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px 14px', background: 'rgba(255,255,255,0.015)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="heartbeat" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PARSING_NEURAL_SYNAPSE...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Advanced Quick Presets */}
            <div style={{ display: 'flex', gap: '6px', padding: '8px 16px 12px 16px', overflowX: 'auto', scrollbarWidth: 'none', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {PRESETS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.query)}
                  onMouseEnter={playHover}
                  style={{
                    flexShrink: 0,
                    padding: '8px 14px',
                    borderRadius: '30px',
                    fontSize: '0.72rem',
                    background: 'rgba(0, 242, 254, 0.03)',
                    border: '1px solid rgba(0, 242, 254, 0.15)',
                    color: '#00f2fe',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-mono)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Console */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              style={{
                padding: '14px 16px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: '8px',
                background: 'rgba(4, 4, 6, 0.99)'
              }}
            >
              <input
                type="text"
                placeholder="Type dynamic system inquiry..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                style={{
                  flex: 1,
                  fontSize: '0.8rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                onMouseEnter={playHover}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'var(--accent-gradient)',
                  color: '#050505',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none'
                }}
              >
                <i className="fa-solid fa-terminal" style={{ fontSize: '0.9rem' }}></i>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
