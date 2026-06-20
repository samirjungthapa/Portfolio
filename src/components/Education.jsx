import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const educationData = [
  {
    id: 1,
    date: "2024 - 2026 (Expected)",
    title: "B.Sc. (Hons) Computing",
    institution: "Itahari International College",
    desc: "Focusing on core computer science subjects, application design, software engineering, databases, and frontend development. Currently maintaining excellent academic standing and working on hands-on practical project work.",
    icon: "fa-solid fa-user-graduate",
    tags: ["Web Development", "Database Management Systems", "Software Engineering", "Object Oriented Programming", "Data Structures & Algorithms"]
  },
  {
    id: 2,
    date: "2021 - 2023",
    title: "+2 (Computer Science)",
    institution: "Koshi Saint James College",
    desc: "Completed higher secondary education in the science stream with a major focus on Computer Science, Mathematics, and Physics. Gained early exposure to programming, database systems, and computer fundamentals.",
    icon: "fa-solid fa-laptop-code",
    tags: ["Computer Science", "C Programming", "Database Concepts", "Mathematics", "Physics"]
  },
  {
    id: 3,
    date: "Completed 2021",
    title: "Secondary Education Exam (SEE)",
    institution: "Koshi Saint James Secondary School",
    desc: "Completed secondary school education with strong emphasis on Science, Mathematics, and Computer Science.",
    icon: "fa-solid fa-school",
    tags: ["Science", "Mathematics", "Computer Science", "English"]
  }
];

const EducationCard = ({ item, idx, total }) => {
  const cardRef = useRef(null);
  
  // Track the scroll progress of the card relative to the window viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Calculate dynamic scale-down effect as subsequent cards stack on top
  const targetScale = 1 - (total - idx) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 1, targetScale, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 1, 0.6, 0.6]);

  return (
    <motion.div 
      ref={cardRef}
      className="education-card glass-card"
      style={{
        position: 'sticky',
        top: `calc(130px + ${idx * 32}px)`,
        zIndex: idx + 1,
        padding: '36px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'rgba(8, 8, 8, 0.96)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        scale,
        opacity,
      }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        scale: 1.015, 
        borderColor: "rgba(201, 162, 39, 0.35)",
        boxShadow: "0 40px 80px rgba(201, 162, 39, 0.06)"
      }}
    >
      {/* Header row */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap', 
          gap: '16px', 
          marginBottom: '20px' 
        }}
      >
        <div>
          <h3 className="degree-title" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {item.title}
          </h3>
          <h4 className="institution-name" style={{ fontSize: '1rem', color: 'var(--accent-cyan)', marginTop: '4px', fontWeight: '500' }}>
            {item.institution}
          </h4>
        </div>
        
        <div 
          style={{ 
            fontSize: '0.8rem', 
            fontWeight: '600', 
            color: 'var(--text-secondary)', 
            padding: '6px 14px', 
            borderRadius: '50px', 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className={item.icon} style={{ color: 'var(--accent-cyan)' }}></i>
          {item.date}
        </div>
      </div>
      
      {/* Description */}
      <p className="education-description" style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
        {item.desc}
      </p>
      
      {/* Coursework Tags */}
      <div className="coursework-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {item.tags.map((tag) => (
          <span 
            key={tag} 
            className="course-tag" 
            style={{ 
              fontSize: '0.75rem', 
              padding: '5px 12px', 
              borderRadius: '50px', 
              background: 'rgba(255, 255, 255, 0.02)', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section id="education" className="education-section scroll-reveal" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        {/* Animated Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="telemetry-label">ACADEMIC_RECORD v1.5</span>
          <h2 className="section-title">Education</h2>
          <div className="section-subtitle">My academic qualification stacked deck</div>
        </motion.div>

        {/* Sticky Stacking Cards Container */}
        <div 
          className="education-stack-container" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '40px', 
            maxWidth: '850px', 
            margin: '0 auto',
            paddingBottom: '60px'
          }}
        >
          {educationData.map((item, idx) => (
            <EducationCard 
              key={item.id} 
              item={item} 
              idx={idx} 
              total={educationData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
