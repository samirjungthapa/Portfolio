import { useState } from 'react';

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
    // Reset individual error status on type
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

    // If no validation errors exist, send message to Web3Forms
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
          setShowSuccess(true);
          // Reset form state
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        } else {
          setSubmitError(result.message || "Something went wrong. Please check your Access Key.");
        }
      } catch {
        setSubmitError("Failed to connect to the server. Please check your internet connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <section id="contact" className="contact-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact Me</h2>
          <div className="section-subtitle">Let's work together or get in touch</div>
        </div>

        <div className="contact-grid">
          {/* Left Side: Contact Information Cards */}
          <div className="contact-info-column reveal-left reveal-delay-2">
            <h3 className="contact-heading">Get in Touch</h3>
            <p className="contact-text">
              Whether you want to discuss a potential project, ask a question about my studies, or just say hello, feel free to reach out. I will get back to you as soon as possible.
            </p>

            <div className="contact-cards">
              {/* Email link */}
              <div className="contact-info-card glass-card">
                <div className="card-icon"><i className="fa-solid fa-envelope"></i></div>
                <div className="card-details">
                  <h4>Email Me</h4>
                  <a href="mailto:Samirjungthapa7@gmail.com" className="contact-link">Samirjungthapa7@gmail.com</a>
                </div>
              </div>

              {/* Phone link */}
              <div className="contact-info-card glass-card">
                <div className="card-icon"><i className="fa-solid fa-phone"></i></div>
                <div className="card-details">
                  <h4>Call Me</h4>
                  <a href="tel:9822434711" className="contact-link">9822434711</a>
                </div>
              </div>

              {/* Location Card */}
              <div className="contact-info-card glass-card">
                <div className="card-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="card-details">
                  <h4>Location</h4>
                  <span className="contact-link-text">SundarHaraicha-5, Morang, Nepal</span>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="social-links-wrapper">
              <a href="https://github.com/samirjungthapa" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.linkedin.com/in/samir-jung-thapa-21aaa83b6" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/shameerthapa/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          {/* Right Side: Message Submission Form */}
          <div className="contact-form-column glass-card reveal-right reveal-delay-3">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <h3 className="form-title">Send a Message</h3>
              
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
                  <label htmlFor="name">Your Name</label>
                </div>
                <span className="error-message">Name is required</span>
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
                  <label htmlFor="email">Your Email</label>
                </div>
                <span className="error-message">
                  {errors.email ? 'Email is required' : 'Please enter a valid email'}
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
                  <label htmlFor="subject">Subject</label>
                </div>
                <span className="error-message">Subject is required</span>
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
                  <label htmlFor="message" style={{ top: '18px' }}>Message</label>
                </div>
                <span className="error-message">Message is required</span>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending... <i className="fa-solid fa-spinner fa-spin"></i></>
                ) : (
                  <>Send Message <i className="fa-solid fa-paper-plane"></i></>
                )}
              </button>

              {submitError && (
                <div className="form-submit-error" style={{ color: '#EF4444', marginTop: '12px', fontSize: '0.9rem', textAlign: 'center', fontWeight: '600' }}>
                  <i className="fa-solid fa-triangle-exclamation"></i> {submitError}
                </div>
              )}
            </form>
            
            {/* Form Success Overlay Popup Modal */}
            <div className={`success-message-overlay ${showSuccess ? 'show' : ''}`}>
              <div className="success-message-box glass-card">
                <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
                <h3>Thank you!</h3>
                <p>Your message has been sent successfully. Samir will get back to you shortly.</p>
                <button type="button" className="btn btn-primary" onClick={closeSuccess}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
