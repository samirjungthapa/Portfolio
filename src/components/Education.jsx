

const Education = () => {
  return (
    <section id="education" className="education-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <div className="section-subtitle">My academic qualification timeline</div>
        </div>

        <div className="timeline-container">
          <div className="timeline-item education-item reveal-item reveal-delay-2">
            <div className="timeline-icon">
              <i className="fa-solid fa-user-graduate"></i>
            </div>
            <div className="timeline-date">2024 - 2026 (Expected)</div>
            <div className="timeline-content glass-card">
              <h3 className="degree-title">B.Sc. (Hons) Computing</h3>
              <h4 className="institution-name">Itahari International College</h4>
              <p className="education-description">
                Focusing on core computer science subjects, application design, software engineering, databases, and frontend development. Currently maintaining excellent academic standing and working on hands-on practical project work.
              </p>
              <div className="coursework-tags">
                <span className="course-tag">Web Development</span>
                <span className="course-tag">Database Management Systems</span>
                <span className="course-tag">Software Engineering</span>
                <span className="course-tag">Object Oriented Programming</span>
                <span className="course-tag">Data Structures & Algorithms</span>
              </div>
            </div>
          </div>

          <div className="timeline-item education-item reveal-item reveal-delay-3">
            <div className="timeline-icon">
              <i className="fa-solid fa-laptop-code"></i>
            </div>
            <div className="timeline-date">2021 - 2023</div>
            <div className="timeline-content glass-card">
              <h3 className="degree-title">+2 (Computer Science)</h3>
              <h4 className="institution-name">Koshi Saint James College</h4>
              <p className="education-description">
                Completed higher secondary education in the science stream with a major focus on Computer Science, Mathematics, and Physics. Gained early exposure to programming, database systems, and computer fundamentals.
              </p>
              <div className="coursework-tags">
                <span className="course-tag">Computer Science</span>
                <span className="course-tag">C Programming</span>
                <span className="course-tag">Database Concepts</span>
                <span className="course-tag">Mathematics</span>
                <span className="course-tag">Physics</span>
              </div>
            </div>
          </div>

          <div className="timeline-item education-item reveal-item reveal-delay-4">
            <div className="timeline-icon">
              <i className="fa-solid fa-school"></i>
            </div>
            <div className="timeline-date">Completed 2021</div>
            <div className="timeline-content glass-card">
              <h3 className="degree-title">Secondary Education Exam (SEE)</h3>
              <h4 className="institution-name">Koshi Saint James Secondary School</h4>
              <p className="education-description">
                Completed secondary school education with strong emphasis on Science, Mathematics, and Computer Science.
              </p>
              <div className="coursework-tags">
                <span className="course-tag">Science</span>
                <span className="course-tag">Mathematics</span>
                <span className="course-tag">Computer Science</span>
                <span className="course-tag">English</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
