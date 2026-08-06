import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaArrowRight, 
  FaGraduationCap, 
  FaGlobeAsia, 
  FaBriefcase, 
  FaCommentDots, 
  FaAward, 
  FaStar,
  FaCheckCircle 
} from "react-icons/fa";
import "./AboutPreview.css";
import owner from "../assets/owner.png";

function AboutPreview() {
  const navigate = useNavigate();
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const pillarsGridRef = useRef(null);

  const pillars = [
    {
      icon: <FaGraduationCap />,
      title: "JLPT N5 to N1 Prep",
      desc: "Structured N5 to N1 curriculum & mock exam strategies.",
      badge: "N5 to N1 Levels",
      color: "red"
    },
    {
      icon: <FaCommentDots />,
      title: "Conversational Kaiwa",
      desc: "Native pitch accent practice & real-world speech feedback.",
      badge: "Spoken Kaiwa",
      color: "green"
    },
    {
      icon: <FaGlobeAsia />,
      title: "Cultural Immersion",
      desc: "Workplace Keigo honorifics & Japanese business etiquette.",
      badge: "Business Keigo",
      color: "orange"
    },
    {
      icon: <FaBriefcase />,
      title: "Tokyo Placements",
      desc: "Rirekisho resume formatting & direct MNC hiring in Japan.",
      badge: "Tokyo Hiring",
      color: "purple"
    }
  ];

  // Auto-slide pillars on mobile view every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth <= 640 && pillarsGridRef.current) {
        setActivePillarIndex((prevIdx) => {
          const nextIdx = (prevIdx + 1) % pillars.length;
          const container = pillarsGridRef.current;
          const card = container.children[nextIdx];
          if (card) {
            const scrollLeft = card.offsetLeft - container.offsetLeft - 16;
            container.scrollTo({ left: scrollLeft, behavior: "smooth" });
          }
          return nextIdx;
        });
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [pillars.length]);

  return (
    <section className="about-preview-section">
      {/* Background ambient blurs */}
      <div className="about-bg-glow"></div>
      <div className="about-bg-glow-2"></div>

      <div className="about-preview-container">
        {/* Section Header */}
        <header className="about-section-header">
          <span className="about-top-badge">
            <FaAward className="badge-icon" /> ASAHI JLPT PREPARATION CLASSES & ASAHI BILINGUAL SERVICES
          </span>
          <h2 className="about-section-title">
            What is <span className="gradient-text-red">ASAHI</span>?
          </h2>
          <div className="gradient-underline" />
          <p className="about-section-subtitle">
            Empowering your journey to learn Japanese and build a successful, high-paying career in Japan.
          </p>
        </header>

        {/* 2-Column Story Layout */}
        <div className="about-story-grid">
          {/* LEFT COLUMN: FOUNDER PHOTO SHOWCASE FRAME WITH FLOATING BADGES */}
          <motion.div 
            className="about-image-column"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-photo-card">
              <div className="photo-frame-inner">
                <img src={owner} alt="ASAHI Founder & Head Sensei" />
                <div className="photo-overlay-gradient"></div>
              </div>

              {/* Floating Top-Left Badge */}
              <div className="about-floating-badge top-left">
                <div className="badge-icon-box red">
                  <FaAward />
                </div>
                <div>
                  <strong>Native Sensei Academy</strong>
                  <span>Certified Japanese Educators</span>
                </div>
              </div>

              {/* Floating Bottom-Right Badge */}
              <div className="about-floating-badge bottom-right">
                <div className="badge-icon-box gold">
                  <FaStar />
                </div>
                <div>
                  <strong>4.9 / 5 Rating</strong>
                  <span>1000+ Happy Learners</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: RICH TYPOGRAPHY & 4 PILLARS GRID */}
          <motion.div 
            className="about-content-column"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-sub-tag"><FaAward className="tag-inline-icon" /> ASAHI JLPT PREPARATION CLASSES & ASAHI BILINGUAL SERVICES</span>
            <h3 className="about-main-heading">
              Your Premier Gateway to <span className="gradient-text-red">Living & Working</span> in Japan
            </h3>

            <p className="about-desc-paragraph">
              <strong>Asahi JLPT Preparation Classes & Asahi Bilingual Services</strong> is an official Japanese language academy dedicated to helping Indian students and professionals master Japanese language proficiency from <strong>N5 to N1</strong> while unlocking direct career opportunities across Tokyo, Osaka, and leading MNCs.
            </p>

            {/* 4 Pillars Grid */}
            <div className="about-pillars-grid" ref={pillarsGridRef}>
              {pillars.map((p, idx) => (
                <div className={`pillar-item-card ${activePillarIndex === idx ? "active-slide" : ""}`} key={idx}>
                  <div className="pillar-card-top">
                    <div className={`pillar-icon-box ${p.color}`}>
                      {p.icon}
                    </div>
                    <span className="pillar-badge">{p.badge}</span>
                  </div>
                  <div className="pillar-text">
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Indicator Dots */}
            <div className="pillars-mobile-dots">
              {pillars.map((_, idx) => (
                <button
                  key={idx}
                  className={`pillars-dot ${activePillarIndex === idx ? "active" : ""}`}
                  onClick={() => {
                    setActivePillarIndex(idx);
                    if (pillarsGridRef.current) {
                      const container = pillarsGridRef.current;
                      const card = container.children[idx];
                      if (card) {
                        const scrollLeft = card.offsetLeft - container.offsetLeft - 16;
                        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
                      }
                    }
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="about-action-row">
              <button className="btn-about-primary" onClick={() => navigate("/about")}>
                Discover Full Story <FaArrowRight />
              </button>
              <button className="btn-about-secondary" onClick={() => navigate("/enquiry")}>
                Talk to Sensei
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;