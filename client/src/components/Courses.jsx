import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowRight, 
  FaCheckCircle, 
  FaGraduationCap, 
  FaBookOpen, 
  FaClock, 
  FaAward,
  FaTrophy,
  FaBullseye
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Courses.css";

import imgN5 from "../assets/course_n5.png";
import imgN4 from "../assets/course_n4.png";
import imgN3 from "../assets/course_n3.png";
import imgN2 from "../assets/course_n2.png";
import imgN1 from "../assets/course_n1.png";

const coursesData = [
  { 
    id: "n5",
    level: "N5 / Q5", 
    tagline: "Beginner & Foundational Japanese",
    badge: "JLPT N5 Level",
    img: imgN5,
    info: "Master basic Hiragana, Katakana, and essential 100 Kanji. Designed for complete beginners to grasp daily greetings, self-introductions, and basic Japanese sentence structures.",
    kanji: "100+ Kanji",
    vocab: "800+ Vocab",
    outcome: "Daily Greetings & Basic Kaiwa",
    highlights: [
      "100+ Essential Kanji with stroke-order diagrams",
      "Hiragana & Katakana handwriting worksheets",
      "15 Practical daily conversation scenarios",
      "Full N5 Mock exam papers & solution keys"
    ],
    duration: "3 Months (60 Hours)"
  },
  { 
    id: "n4",
    level: "N4 / Q4", 
    tagline: "Pre-Intermediate Fluency & Grammar",
    badge: "JLPT N4 Level",
    img: imgN4,
    info: "Expand your vocabulary to 1,500 words, master 300 Kanji, and build confidence in listening to daily conversations spoken at slow-to-natural speed.",
    kanji: "300+ Kanji",
    vocab: "1,500 Vocab",
    outcome: "Basic Immersion & Travel Readiness",
    highlights: [
      "300+ Intermediate Kanji & vocabulary lists",
      "Comprehensive breakdown of grammar particles",
      "Reading passages with Furigana assistance",
      "Targeted practice tests for JLPT N4 exam"
    ],
    duration: "4 Months (80 Hours)"
  },
  { 
    id: "n3",
    level: "N3 / Q3", 
    tagline: "Intermediate Everyday Japanese",
    badge: "JLPT N3 Level",
    img: imgN3,
    info: "Bridge the gap between basic and advanced Japanese. Understand everyday conversation at natural speed, read news headlines, and master 650 Kanji.",
    kanji: "650+ Kanji",
    vocab: "3,750 Vocab",
    outcome: "Everyday Kaiwa & Campus Immersion",
    highlights: [
      "650+ Essential Kanji with compound readings",
      "Natural speed audio listening practice",
      "Complex sentence structure & conjunctions",
      "JLPT N3 mock test series with Sensei feedback"
    ],
    duration: "4.5 Months (90 Hours)"
  },
  { 
    id: "n2",
    level: "N2 / Q2", 
    tagline: "Advanced Business & Career Level",
    badge: "JLPT N2 Level",
    img: imgN2,
    info: "The official certification required for working in Japanese MNCs & IT firms. Master advanced business etiquette, email writing, and 1,000 Kanji.",
    kanji: "1,000+ Kanji",
    vocab: "6,000 Vocab",
    outcome: "100% Tokyo & Osaka Placement Ready",
    highlights: [
      "1,000+ Business & Technical Kanji terms",
      "Keigo (Honorable) & Kenjougo (Humble) speech",
      "Business Japanese dialogue templates",
      "Direct placement interview coaching in Tokyo/Osaka"
    ],
    duration: "5 Months (100 Hours)"
  },
  { 
    id: "n1",
    level: "N1 / Q1", 
    tagline: "Native Mastery & Higher Education",
    badge: "JLPT N1 Level",
    img: imgN1,
    info: "The pinnacle of Japanese language proficiency. Gain native-level fluency to read complex literature, academic papers, and negotiate in corporate environments.",
    kanji: "2,000+ Kanji",
    vocab: "10,000 Vocab",
    outcome: "Native Professional & Academic Level",
    highlights: [
      "2,000+ Advanced Kanji & nuanced expressions",
      "Native-level listening & rapid reading strategies",
      "Academic & corporate paper translation",
      "Highest JLPT credential for Japan universities"
    ],
    duration: "6 Months (120 Hours)"
  }
];

function Courses() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeMobileTabRef = useRef(null);
  const mobileBarRef = useRef(null);

  const currentCourse = coursesData[activeIndex];

  // Auto-rotate every 6 seconds ONLY on Mobile View (< 1024px)
  useEffect(() => {
    if (isPaused) return;

    const checkIsMobile = () => window.innerWidth <= 1024;
    if (!checkIsMobile()) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % coursesData.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Auto-scroll ONLY the horizontal mobile bar container (WITHOUT scrolling the browser page window!)
  useEffect(() => {
    if (activeMobileTabRef.current && mobileBarRef.current) {
      const tabElement = activeMobileTabRef.current;
      const barContainer = mobileBarRef.current;
      const tabLeft = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;
      const containerWidth = barContainer.offsetWidth;

      barContainer.scrollTo({
        left: tabLeft - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth"
      });
    }
  }, [activeIndex]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 12000);
  };

  return (
    <section 
      className="courses-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="courses-container">
        {/* Header */}
        <header className="courses-header">
          <span className="courses-top-badge">
            <FaAward className="award-icon" /> JLPT & NAT CERTIFIED CURRICULUM
          </span>
          <h2 className="courses-title">
            Japanese <span className="gradient-text-red">Courses</span>
          </h2>
          <div className="gradient-underline" />
          <p className="courses-subtitle">
            Structured language curricula designed for JLPT mastery, native conversational fluency, and direct corporate career opportunities.
          </p>
        </header>

        {/* MOBILE SWIPEABLE LEVEL SWITCHER TABS WITH AUTO-SHIFT */}
        <div className="courses-mobile-level-bar" ref={mobileBarRef}>
          {coursesData.map((c, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={c.id}
                ref={isActive ? activeMobileTabRef : null}
                className={`mobile-level-btn ${isActive ? "active" : ""}`}
                onClick={() => handleTabClick(index)}
              >
                <span className="lvl-code">{c.level}</span>
                <span className="lvl-sub">{c.badge}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Grid */}
        <div className="courses-grid-layout">
          {/* LEFT COLUMN: ACTIVE COURSE RICH SHOWCASE CARD */}
          <div className="courses-showcase-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCourse.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="showcase-content-wrapper"
              >
                {/* Image Frame */}
                <div className="course-image-frame">
                  <img src={currentCourse.img} alt={currentCourse.level} />
                  <span className="level-badge-pill">{currentCourse.badge}</span>
                  <div className="duration-tag">
                    <FaClock className="clock-icon" /> {currentCourse.duration}
                  </div>
                </div>

                {/* Course Details Info */}
                <div className="course-details-body">
                  <span className="course-tagline-text">{currentCourse.tagline}</span>
                  <h3 className="course-level-heading">{currentCourse.level} Course</h3>
                  <p className="course-info-paragraph">{currentCourse.info}</p>

                  {/* Metrics Pills Strip */}
                  <div className="course-metrics-row">
                    <div className="metric-pill">
                      <FaBookOpen className="m-icon red" /> <span>{currentCourse.kanji}</span>
                    </div>
                    <div className="metric-pill">
                      <FaAward className="m-icon orange" /> <span>{currentCourse.vocab}</span>
                    </div>
                    <div className="metric-pill full-width">
                      <FaCheckCircle className="m-icon green" /> <span>{currentCourse.outcome}</span>
                    </div>
                  </div>

                  {/* Highlights List */}
                  <div className="course-highlights-box">
                    <h5 className="highlights-title">
                      <FaBookOpen className="book-icon" /> Curriculum Highlights:
                    </h5>
                    <ul className="highlights-list">
                      {currentCourse.highlights.map((item, idx) => (
                        <li key={idx}>
                          <FaCheckCircle className="check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="course-action-buttons">
                    <button 
                      className="btn-enroll-course"
                      onClick={() => navigate("/enquiry")}
                    >
                      <FaGraduationCap /> Enroll for {currentCourse.level} Batch
                    </button>
                    <button 
                      className="btn-view-course-details"
                      onClick={() => navigate("/courses")}
                    >
                      Full Details <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE LEVEL SELECTOR LIST */}
          <div className="courses-selector-column">
            <div className="selector-header-box">
              <h3>JLPT & NAT Certification Levels</h3>
              <p>Click or hover to preview curriculum details:</p>
            </div>

            <div className="selector-items-list">
              {coursesData.map((c, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={c.id}
                    className={`selector-item-card ${isActive ? "active" : ""}`}
                    onClick={() => handleTabClick(index)}
                    onMouseEnter={() => handleTabClick(index)}
                  >
                    <div className="selector-item-left">
                      <span className="level-code-tag">{c.level}</span>
                      <div className="level-text-wrap">
                        <h4>{c.tagline}</h4>
                        <span className="level-sub-info">{c.badge} • {c.duration}</span>
                      </div>
                    </div>

                    <div className="selector-item-right">
                      <FaArrowRight className="selector-arrow-icon" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Courses;