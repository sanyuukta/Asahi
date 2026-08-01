import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  FaArrowRight, 
  FaGraduationCap, 
  FaGlobeAsia,
  FaChalkboardTeacher,
  FaStar,
  FaBookOpen,
  FaWhatsapp,
  FaAward,
  FaCheckCircle,
  FaBuilding
} from "react-icons/fa";
import "./Hero.css";
import heroImg1 from "../assets/heroimg1.png";
import heroImg2 from "../assets/heroimage2.png";
import heroImg3 from "../assets/heroimg3.png";

// DYNAMIC ANIMATED COUNTER COMPONENT
function Counter({ end, duration = 2000, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const incrementTime = 16; // ~60 FPS
    const steps = Math.ceil(duration / incrementTime);
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function Hero() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const heroShowcaseCards = [
    {
      badge: "🎌 JAPAN CAREER PIPELINES",
      title: "Direct Recruitment in Tokyo & Osaka",
      info: "IT, Engineering, Healthcare & Hospitality MNC Hiring",
      target: "Tokyo & Osaka Placements",
      pass: "100% Visa Assistance",
      img: heroImg1
    },
    {
      badge: "🎓 STUDENT ACHIEVEMENTS",
      title: "98.4% JLPT & NAT Success Rate",
      info: "982+ Students Trained across JLPT N5 to N1",
      target: "1000+ Verified Reviews",
      pass: "4.9 / 5.0 Star Rating",
      img: heroImg2
    },
    {
      badge: "🌸 ASAHI BILINGUAL ACADEMY",
      title: "Native Japanese Sensei Mentorship",
      info: "15+ Years Mentorship & Authentic Culture Immersion",
      target: "JLPT & NAT Curricula",
      pass: "N1 Certified Faculty",
      img: heroImg3
    }
  ];

  // Auto-switch slides every 7.5 seconds for comfortable reading
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsApp = () => {
    const msg = "Konnichiwa ASAHI! I want to consult regarding Japanese courses & career opportunities in Japan.";
    window.open(`https://api.whatsapp.com/send?phone=917796530192&text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="hero-split-root">
      {/* LUXURY BACKGROUND SPOTLIGHTS & WATERMARK */}
      <div className="hero-ambient-glow-1" />
      <div className="hero-ambient-glow-2" />
      <span className="hero-kanji-watermark">夢を叶える・日本就職</span>

      <div className="hero-split-container">
        
        {/* ================= LEFT COLUMN: CONTENT & ACTION ================= */}
        <motion.div 
          className="hero-split-left-col"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main Headline */}
          <h1 className="hero-luxury-title">
            Launch Your Career In <span className="gradient-text-red">Japan</span> With ASAHI.
          </h1>

          {/* Subheading Paragraph */}
          <p className="hero-luxury-description">
            Master Japanese language proficiency (JLPT N5-N1), learn authentic business Keigo, and secure direct placement opportunities with top tech companies & MNCs across Japan.
          </p>

          {/* 3 Key Trust Bullet Badges */}
          <div className="hero-trust-bullets-row">
            <div className="trust-bullet">
              <FaCheckCircle className="check-bullet-icon" />
              <span>Native & Bilingual Senseis</span>
            </div>
            <div className="trust-bullet">
              <FaCheckCircle className="check-bullet-icon" />
              <span>98.4% JLPT & NAT Pass Rate</span>
            </div>
            <div className="trust-bullet">
              <FaCheckCircle className="check-bullet-icon" />
              <span>Tokyo & Osaka MNC Hiring</span>
            </div>
          </div>

          {/* Primary Action Button (Single Button matching reference) */}
          <div className="hero-actions-group">
            <button className="btn-caddverse-explore-lg" onClick={() => navigate("/courses")}>
              Explore Courses <FaArrowRight className="arrow-icon" />
            </button>
          </div>

          {/* DARK NAVY STATS STRIP PILL (DYNAMIC ANIMATED COUNTING NUMBERS) */}
          <div className="hero-caddverse-stats-pill">
            {/* Stat 1 */}
            <div className="cadd-stat-item">
              <div className="cadd-icon-circle"><FaGraduationCap /></div>
              <div className="cadd-stat-info">
                <h3><Counter end={982} suffix="+" /></h3>
                <p>Students Trained</p>
              </div>
            </div>

            <div className="cadd-divider" />

            {/* Stat 2 */}
            <div className="cadd-stat-item">
              <div className="cadd-icon-circle"><FaBuilding /></div>
              <div className="cadd-stat-info">
                <h3><Counter end={60} suffix="+" /></h3>
                <p>School Tie-ups</p>
              </div>
            </div>

            <div className="cadd-divider" />

            {/* Stat 3 */}
            <div className="cadd-stat-item">
              <div className="cadd-icon-circle"><FaChalkboardTeacher /></div>
              <div className="cadd-stat-info">
                <h3><Counter end={15} suffix="+" /></h3>
                <p>Years Experience</p>
              </div>
            </div>

            <div className="cadd-divider" />

            {/* Stat 4 */}
            <div className="cadd-stat-item">
              <div className="cadd-icon-circle"><FaAward /></div>
              <div className="cadd-stat-info">
                <h3><Counter end={320} suffix="+" /></h3>
                <p>Placed in Japan</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: INTERACTIVE VISUAL CARD ================= */}
        <motion.div 
          className="hero-split-right-col"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <div className="hero-glass-visual-card">
            
            {/* Top Interactive Dot Indicators */}
            <div className="interactive-tabs-topbar">
              <span className="tabs-label">ASAHI GATEWAY HIGHLIGHTS</span>
              <div className="dots-indicator-row">
                {heroShowcaseCards.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`dot-pill-btn ${activeTab === idx ? "active" : ""}`}
                    onClick={() => setActiveTab(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Dynamic Active Card Highlight Info Box */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                className="dynamic-level-info-box"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="info-box-left">
                  <span className="level-badge-tag">{heroShowcaseCards[activeTab].badge}</span>
                  <h4>{heroShowcaseCards[activeTab].title}</h4>
                  <p className="kanji-info">{heroShowcaseCards[activeTab].info}</p>
                </div>
                <div className="info-box-right">
                  <span className="target-pill">{heroShowcaseCards[activeTab].target}</span>
                  <span className="pass-pill"><FaCheckCircle /> {heroShowcaseCards[activeTab].pass}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Clean Showcase Image Frame with Dynamic High-Res Images */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`img-${activeTab}`}
                className="showcase-image-frame-luxury"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src={heroShowcaseCards[activeTab].img} alt={heroShowcaseCards[activeTab].title} />
                <div className="image-luxury-gradient-overlay" />
              </motion.div>
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;