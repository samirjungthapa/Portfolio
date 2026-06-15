import { motion } from 'framer-motion';

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

const Education = () => {
  return (
    <section id="education" className="education-section scroll-reveal">
      <div className="container">
        {/* Animated Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="section-title">Education</h2>
          <div className="section-subtitle">My academic qualification timeline</div>
        </motion.div>

        <div className="timeline-container">
          {educationData.map((item, idx) => (
            <motion.div 
              key={item.id}
              className="timeline-item education-item"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
            >
              <div className="timeline-icon">
                <i className={item.icon}></i>
              </div>
              <div className="timeline-date">{item.date}</div>
              <motion.div 
                className="timeline-content glass-card"
                whileHover={{ scale: 1.02, translateY: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="degree-title">{item.title}</h3>
                <h4 className="institution-name">{item.institution}</h4>
                <p className="education-description">{item.desc}</p>
                <div className="coursework-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="course-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
