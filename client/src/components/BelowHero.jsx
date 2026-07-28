import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaUserTie, FaPlane } from "react-icons/fa";
import "./BelowHero.css";

const logos = [
  "Toyota", "Sony", "Panasonic", "Rakuten", "SoftBank", "Hitachi",
  "Honda", "Canon", "Nintendo", "Mitsubishi", "Nissan", "NTT"
];

const features = [
  {
    icon: <FaUserTie />,
    title: "Expert Trainers",
    desc: "Learn from native speakers and JLPT certified mentors with decades of combined bilingual training expertise."
  },
  {
    icon: <FaGraduationCap />,
    title: "JLPT Courses",
    desc: "Rigorous curriculum from N5 to N1 level optimized for speed, fluency, and deep cultural assimilation."
  },
  {
    icon: <FaBriefcase />,
    title: "Placement Support",
    desc: "Direct recruitment paths with Fortune 500 companies in Japan, complete with resume reviews and mock interviews."
  },
  {
    icon: <FaPlane />,
    title: "Visa Assistance",
    desc: "Complete documentation guidance and support through foreign ministry processes for stress-free relocations."
  }
];

function BelowHero() {
  return (
    <section className="below-hero-section" id="marquee-section">
      <div className="below-hero-container">
        
        {/* LOGO MARQUEE */}
        <div className="marquee-wrapper">
          <p className="marquee-title">OUR ALUMNI WORK AT GLOBAL LEADERS</p>
          <div className="marquee-content">
            <div className="marquee-track">
              {logos.concat(logos).map((logo, index) => (
                <div key={index} className="logo-item">
                  <span className="logo-placeholder">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURE CARDS GRID */}
        <div className="features-grid">
          {features.map((f, idx) => (
            <motion.div 
              key={idx}
              className="feature-card-premium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8 }}
            >
              <div className="f-card-glow"></div>
              <div className="f-card-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BelowHero;
