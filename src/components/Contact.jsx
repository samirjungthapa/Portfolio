import { useState } from 'react';
import { playSuccess } from '../utils/audioManager';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    emailInvalid: false,
    subject: false,
    message: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false, emailInvalid: false }));
    setSubmitError(null);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {
      name: formData.name.trim() === '',
      email: formData.email.trim() === '',
      emailInvalid: formData.email.trim() !== '' && !validateEmail(formData.email),
      subject: formData.subject.trim() === '',
      message: formData.message.trim() === ''
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
        
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            from_name: `${formData.name} via Portfolio`
          })
        });

        const result = await response.json();

        if (result.success) {
          playSuccess();
          setShowSuccess(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setSubmitError(result.message || "Failed to finalize communication socket.");
        }
      } catch {
        setSubmitError("Failed to resolve socket address. Please check your system link.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="contact-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <span className="telemetry-label">COMMS_LINK v3.2</span>
          <h2 className="section-title">Holographic Sockets</h2>
          <div className="section-subtitle">Establish transmission channels for active routing.</div>
        </div>

        <div className="contact-grid">
          {/* Left Side: Comms Sockets */}
          <div className="contact-info-column reveal-left reveal-delay-2">
            <h3 className="contact-heading">Channel Routing</h3>
            <p className="contact-text">
              Configure parameters to connect directly with Samir's host terminal. Sockets automatically resolve connection sequences:
            </p>

            <div className="contact-cards">
              <div className="contact-info-card glass-card">
                <div className="card-icon" style={{ borderColor: 'rgba(226,201,153,0.3)' }}><i className="fa-solid fa-envelope"></i></div>
                <div className="card-details">
                  <span className="socket-label">SOCKET_01 [EMAIL]</span>
                  <a href="mailto:Samirjungthapa7@gmail.com" className="contact-link">Samirjungthapa7@gmail.com</a>
                </div>
              </div>

              <div className="contact-info-card glass-card">
                <div className="card-icon" style={{ borderColor: 'rgba(226,201,153,0.3)' }}><i className="fa-solid fa-phone"></i></div>
                <div className="card-details">
                  <span className="socket-label">SOCKET_02 [VOICE]</span>
                  <a href="tel:9822434711" className="contact-link">9822434711</a>
                </div>
              </div>

              <div className="contact-info-card glass-card">
                <div className="card-icon" style={{ borderColor: 'rgba(226,201,153,0.3)' }}><i className="fa-solid fa-location-dot"></i></div>
                <div className="card-details">
                  <span className="socket-label">SOCKET_03 [LOC]</span>
                  <span className="contact-link-text">Morang, Nepal [UTC+5:45]</span>
                </div>
              </div>
            </div>

            <div className="social-links-wrapper">
              <a href="https://github.com/samirjungthapa" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.linkedin.com/in/samir-jung-thapa-21aaa83b6" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/shameerthapa/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          {/* Right Side: Form Submission Socket */}
          <div className="contact-form-column glass-card reveal-right reveal-delay-3">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <h3 className="form-title">Open Link Socket</h3>
              
              <div className={`form-group-floating ${errors.name ? 'invalid' : ''}`}>
                <div className="input-wrapper">
                  <i className="fa-solid fa-user input-icon"></i>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=" " 
                  />
                  <label htmlFor="name">IDENTIFIER</label>
                </div>
                <span className="error-message">Identifier required</span>
              </div>

              <div className={`form-group-floating ${errors.email || errors.emailInvalid ? 'invalid' : ''}`}>
                <div className="input-wrapper">
                  <i className="fa-solid fa-envelope input-icon"></i>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" " 
                  />
                  <label htmlFor="email">RESPONSE PATH (EMAIL)</label>
                </div>
                <span className="error-message">
                  {errors.email ? 'Response path required' : 'Invalid route address'}
                </span>
              </div>

              <div className={`form-group-floating ${errors.subject ? 'invalid' : ''}`}>
                <div className="input-wrapper">
                  <i className="fa-solid fa-pen-nib input-icon"></i>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder=" " 
                  />
                  <label htmlFor="subject">TRANSMISSION HEADER</label>
                </div>
                <span className="error-message">Transmission header required</span>
              </div>

              <div className={`form-group-floating ${errors.message ? 'invalid' : ''}`}>
                <div className="input-wrapper align-start">
                  <i className="fa-solid fa-message input-icon top-icon"></i>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder=" "
                  ></textarea>
                  <label htmlFor="message">MESSAGE CONTENT</label>
                </div>
                <span className="error-message">Message body required</span>
              </div>

              {submitError && (
                <div className="submit-error-msg" style={{ color: '#ff5f56', fontSize: '0.85rem', marginBottom: '16px' }}>
                  <i className="fa-solid fa-triangle-exclamation"></i> {submitError}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> TRANSMITTING CYCLES...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i> INITIALIZE CONNECTION
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog Popup */}
      {showSuccess && (
        <div className="proj-modal-overlay active" onClick={() => setShowSuccess(false)}>
          <div className="proj-modal-card" style={{ maxWidth: '450px', padding: '40px 32px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-cyan)', fontSize: '3.5rem', marginBottom: '20px' }}></i>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Connection Established</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
              Your transmission package has been routed successfully. Samir's terminal will respond in due cycles.
            </p>
            <button className="btn btn-primary" onClick={() => setShowSuccess(false)} style={{ width: '100%' }}>
              Close Socket Link
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
