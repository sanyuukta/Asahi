import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FaGraduationCap, 
  FaBuilding, 
  FaAward, 
  FaRocket, 
  FaGlobeAsia,
  FaCheckCircle
} from "react-icons/fa";
import "./Stats.css";

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <h2 className="stat-number">
      {count}{suffix}
    </h2>
  );
}

function Stats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const statsList = [
    { 
      target: 982, 
      suffix: "+", 
      label: "Students Trained", 
      sub: "Across N5 - N1 Levels",
      icon: <FaGraduationCap />,
      pill: "JLPT Certified"
    },
    { 
      target: 60, 
      suffix: "+", 
      label: "Indian School Tie-ups", 
      sub: "Partnered Schools & Academies",
      icon: <FaBuilding />,
      pill: "Institutional Partner"
    },
    { 
      target: 15, 
      suffix: "+", 
      label: "Years Teaching Experience", 
      sub: "Bilingual Sensei Mentorship",
      icon: <FaAward />,
      pill: "Native Instructors"
    },
    { 
      target: 320, 
      suffix: "+", 
      label: "Students Placed in Japan", 
      sub: "Living & Working in Tokyo",
      icon: <FaRocket />,
      pill: "100% Visa Assistance"
    }
  ];

  return (
    <section className="stats-section">
      {/* Background ambient glows */}
      <div className="stats-bg-glow"></div>

      <div className="stats-main-container">
        {/* SECTION HEADER */}
        <motion.header 
          className="stats-header"
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="stats-top-tag">
            <FaGlobeAsia className="globe-icon" /> PROVEN TRACK RECORD & PLACEMENTS
          </span>
          <h2 className="stats-title">
            Our <span className="gradient-text-red">Impact</span> in Numbers
          </h2>
          <div className="gradient-underline" />
          <p className="stats-subtitle">
            Thousands of students have trusted ASAHI to master the Japanese language and secure direct career placement in Japan.
          </p>
        </motion.header>

        {/* 4 STAT CARDS GRID */}
        <motion.div 
          className="stats-grid-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
        >
          {statsList.map((stat, i) => (
            <motion.article className="stat-card-item" key={i} variants={cardVariants}>
              <div className="card-top-row">
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
                <span className="stat-pill-badge">
                  <FaCheckCircle className="check-bullet" /> {stat.pill}
                </span>
              </div>

              <div className="stat-counter-wrap">
                <Counter target={stat.target} suffix={stat.suffix} />
                <h3 className="stat-label-title">{stat.label}</h3>
                <span className="stat-sub-label">{stat.sub}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Stats;