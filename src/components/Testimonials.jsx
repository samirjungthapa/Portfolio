import { motion } from 'framer-motion';

const testimonialsData = [
  {
    quote: "Samir has an exceptional eye for user interface structure and fluid layouts. His implementation on Courier Nepal was robust, clean, and delivered precisely on schedule.",
    name: "Dr. Ramesh Thapa",
    role: "Computing Faculty Supervisor",
    initials: "RT"
  },
  {
    quote: "Working with Samir has been highly professional. He translates abstract design specifications into highly interactive React interfaces with satisfying micro-animations.",
    name: "N. Chaudhary",
    role: "Fullstack Lead & Client",
    initials: "NC"
  },
  {
    quote: "Samir brings structure and modern software engineering practices to the table. His command over JavaScript/React makes him a valuable asset to any project.",
    name: "S. K. Shrestha",
    role: "Senior Systems Engineer",
    initials: "SS"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section scroll-reveal" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="telemetry-label">CLIENT_TESTIMONIALS v1.2</span>
          <h2 className="section-title">Client Feedback</h2>
          <div className="section-subtitle">
            What supervisors and clients say about my frontend craftsmanship
          </div>
        </div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="testimonials-grid"
        >
          {testimonialsData.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              className="testimonial-card"
            >
              <p className="testimonial-text">
                "{item.quote}"
              </p>
              
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {item.initials}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
