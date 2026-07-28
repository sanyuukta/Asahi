import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaClock,
  FaCertificate,
  FaGlobeAsia,
  FaCheckCircle,
  FaBookOpen
} from "react-icons/fa";
import "./WhyChoose.css";

function WhyChoose() {
  const features = [
    {
      title: "Live Interactive Classes",
      desc: "Learn with certified bilingual instructors in live, real-time sessions with interactive whiteboard tools and speech feedback.",
      icon: <FaChalkboardTeacher />
    },
    {
      title: "Flexible Schedules",
      desc: "Choose between morning and evening batches designed perfectly for working professionals and university students.",
      icon: <FaClock />
    },
    {
      title: "JLPT & NAT Focused",
      desc: "Curricula built around real-time assessments, direct mock exams, and test strategies to clear levels first try.",
      icon: <FaCertificate />
    },
    {
      title: "Cultural Immersion",
      desc: "Interactive webinars on Japanese business ethics, lifestyle etiquettes, and cultural activities to get comfortable with Japan.",
      icon: <FaGlobeAsia />
    },
    {
      title: "Direct Placement Assistance",
      desc: "Bilingual recruitment pipelines and resume building matching direct vacancies in Tokyo, Osaka, and top MNCs in India.",
      icon: <FaBookOpen />
    },
    {
      title: "Structured Mock Tests",
      desc: "Continuous mock test series simulating actual JLPT/NAT exam structures, timing constraints, and scoring methodologies.",
      icon: <FaCheckCircle />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="whychoose-section">
      {/* Background ambient blurs */}
      <div className="whychoose-bg-glow"></div>
      <div className="whychoose-bg-glow-2"></div>

      <motion.div 
        className="whychoose-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="whychoose-title">
          Why Choose <span>ASAHI</span>?
        </h2>
        <p className="whychoose-subtitle">
          Whether you aim to master the JLPT, study in top universities, or build a successful career in Japan, ASAHI provides the comprehensive guidance you need.
        </p>
      </motion.div>

      <motion.div 
        className="whychoose-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
      >
        {features.map((item, index) => (
          <motion.div 
            key={index} 
            className="whychoose-card"
            variants={cardVariants}
          >
            <div className="card-header-row">
              <div className="whychoose-icon">
                {item.icon}
              </div>
              <span className="card-number">0{index + 1}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default WhyChoose;