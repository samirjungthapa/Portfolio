import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playSuccess } from '../utils/audioManager';

const ResumeModal = ({ isOpen, onClose }) => {
  const iframeRef = useRef(null);

  const handlePrint = () => {
    playSuccess();
    if (iframeRef.current) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="proj-modal-overlay active" 
          onClick={() => { playClick(); onClose(); }}
          style={{ zIndex: 100000 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="proj-modal-card" 
            style={{ maxWidth: '900px', width: '90%', height: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <span className="telemetry-label">[CV_TRANSMISSION_SOCKET]</span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginTop: '4px' }}>Interactive Curriculum Vitae</h3>
              </div>
              <button 
                onClick={() => { playClick(); onClose(); }} 
                className="proj-modal-close"
                style={{ position: 'static', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Iframe Viewport */}
            <div style={{ flex: 1, background: '#fff', position: 'relative' }}>
              <iframe 
                ref={iframeRef}
                src="/assets/resume.html" 
                title="Samir Jung Thapa Resume"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>

            {/* Modal Footer Controls */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(2, 2, 2, 0.4)' }}>
              <button 
                onClick={handlePrint}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <i className="fa-solid fa-print"></i> Print Resume (PDF)
              </button>
              <a 
                href="/assets/resume.pdf"
                download="Samir_Jung_Thapa_Resume.pdf"
                onClick={playSuccess}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <i className="fa-solid fa-download"></i> Direct PDF Download
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
