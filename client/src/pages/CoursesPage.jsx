import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaLaptopCode, 
  FaBookOpen, 
  FaUsers, 
  FaGraduationCap, 
  FaRegClock, 
  FaTrophy, 
  FaUserTie, 
  FaGlobeAmericas,
  FaWhatsapp,
  FaArrowRight,
  FaCheckCircle,
  FaBullseye
} from "react-icons/fa";
import "./CoursesPage.css";

import imgN5 from "../assets/course_n5.png";
import imgN4 from "../assets/course_n4.png";
import imgN3 from "../assets/course_n3.png";
import imgN2 from "../assets/course_n2.png";
import imgN1 from "../assets/course_n1.png";

const adminPhone = "917796530192";

const jlptCourses = [
  {
    level: "N5 - Beginner Level",
    duration: "3-4 Months",
    desc: "Perfect foundation for beginners with comprehensive Japanese basics, Hiragana, Katakana, & 100 Kanji.",
    color: "green",
    img: imgN5,
    waMsg: "Kon'nichiwa ASAHI Advisory Team! 🌸\n\nI am interested in enrolling for the *JLPT N5 - Beginner Course*.\n\n📌 Requested Info:\n• Upcoming N5 Batch Dates & Timings\n• Course Fee Details\n\nPlease connect me with Sensei. Arigatou!"
  },
  {
    level: "N4 - Upper Beginner",
    duration: "4-5 Months",
    desc: "Advanced grammar and 300 vocabulary words for practical everyday communication and reading.",
    color: "orange",
    img: imgN4,
    waMsg: "Kon'nichiwa ASAHI Advisory Team! 🌸\n\nI am interested in enrolling for the *JLPT N4 - Upper Beginner Course*.\n\n📌 Requested Info:\n• N4 Batch Schedules & Live Class Timings\n• Fee Details & Exam Mock Test Series\n\nPlease connect me with Sensei. Arigatou!"
  },
  {
    level: "N3 - Intermediate Level",
    duration: "5-6 Months",
    desc: "Professional-level Japanese for work and academic purposes, mastering 650 Kanji & natural dialogues.",
    color: "blue",
    img: imgN3,
    waMsg: "Kon'nichiwa ASAHI Advisory Team! 🌸\n\nI am interested in enrolling for the *JLPT N3 - Intermediate Course*.\n\n📌 Requested Info:\n• N3 Live Batch Timings & Fee Structure\n• Pitch Accent Listening Dialogues\n\nPlease connect me with Sensei. Arigatou!"
  },
  {
    level: "N2 - Advanced Level",
    duration: "6-8 Months",
    desc: "High-level Japanese for corporate communication, business Keigo, and direct hiring in Tokyo & Osaka.",
    color: "purple",
    img: imgN2,
    waMsg: "Kon'nichiwa ASAHI Career Team! 💼\n\nI am interested in enrolling for the *JLPT N2 - Advanced Business Course* and Tokyo/Osaka Placement Assistance.\n\n📌 Requested Info:\n• N2 Batch Timings & Fee Details\n• Corporate Placement & Resume Formatting\n\nPlease connect me with Senior Sensei. Arigatou!"
  },
  {
    level: "N1 - Expert Level",
    duration: "8+ Months",
    desc: "Native-level Japanese mastery, academic paper translation, and executive level fluency in Japan.",
    color: "dark",
    img: imgN1,
    waMsg: "Kon'nichiwa ASAHI Advisory Team! ⛩️\n\nI am interested in the *JLPT N1 - Expert Native Course*.\n\n📌 Requested Info:\n• N1 Special Mentorship Batch Timings\n• Advanced 2,000 Kanji & Literature\n\nPlease connect me with Head Sensei. Arigatou!"
  }
];

const natCourses = [
  {
    level: "Q5 - Beginner Level",
    duration: "3-4 Months",
    desc: "Basic Japanese grammar, HIRAGANA, KATAKANA, and essential communication skills for NAT-TEST Q5.",
    color: "green",
    img: imgN5,
    waMsg: "Kon'nichiwa ASAHI Team! 🌸\n\nI want to enroll for the *NAT Q5 Test Prep Course*. Please share batch timings and fee details. Arigatou!"
  },
  {
    level: "Q4 - Elementary Level",
    duration: "4-5 Months",
    desc: "Intermediate vocabulary, grammar training, and timed mock test series for NAT-TEST Q4.",
    color: "orange",
    img: imgN4,
    waMsg: "Kon'nichiwa ASAHI Team! 🌸\n\nI want to enroll for the *NAT Q4 Test Prep Course*. Please share batch timings and fee details. Arigatou!"
  },
  {
    level: "Q3 - Intermediate Level",
    duration: "5-6 Months",
    desc: "Advanced Japanese reading and listening skills tailored specifically for NAT-TEST Q3 examination.",
    color: "blue",
    img: imgN3,
    waMsg: "Kon'nichiwa ASAHI Team! 🌸\n\nI want to enroll for the *NAT Q3 Test Prep Course*. Please share batch timings and fee details. Arigatou!"
  },
  {
    level: "Q2 - Advanced Level",
    duration: "6-8 Months",
    desc: "Professional Japanese fluency, rapid reading strategies, and business evaluation for NAT-TEST Q2.",
    color: "purple",
    img: imgN2,
    waMsg: "Kon'nichiwa ASAHI Team! 💼\n\nI want to enroll for the *NAT Q2 Test Prep Course*. Please share batch timings and fee details. Arigatou!"
  }
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
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

function CourseCard({ course, type }) {
  const navigate = useNavigate();
  const themeClass = `theme-${course.color || 'dark'}`;

  const handleWhatsAppEnroll = () => {
    const encoded = encodeURIComponent(course.waMsg);
    window.open(`https://api.whatsapp.com/send?phone=${adminPhone}&text=${encoded}`, "_blank");
  };

  return (
    <motion.div className={`course-card-premium ${themeClass}`} variants={cardVariants}>
      {/* Top Banner Image */}
      <div className="course-card-image-wrapper">
        <img src={course.img} alt={course.level} className="course-card-banner-img" />
        <div className="course-card-image-overlay"></div>
      </div>

      <div className="card-header-premium">
        <div className="card-badge-row">
          <span className="course-type-badge">{type} CERTIFIED</span>
          <span className="course-duration-badge">
            <FaRegClock className="clock-icon" /> {course.duration}
          </span>
        </div>
        <h3 className="course-level-title">{course.level}</h3>
        <p className="course-desc-premium">{course.desc}</p>
      </div>

      <div className="card-divider-premium"></div>

      <div className="card-highlights-premium">
        <h4 className="highlights-title">Course Highlights</h4>
        <div className="highlights-grid">
          <div className="highlight-item">
            <div className="h-icon-wrapper"><FaLaptopCode className="h-icon" /></div>
            <span>Live Classes</span>
          </div>
          <div className="highlight-item">
            <div className="h-icon-wrapper"><FaBookOpen className="h-icon" /></div>
            <span>Grammar & Vocab</span>
          </div>
          <div className="highlight-item">
            <div className="h-icon-wrapper"><FaUsers className="h-icon" /></div>
            <span>Spoken Batches</span>
          </div>
          <div className="highlight-item">
            <div className="h-icon-wrapper"><FaGraduationCap className="h-icon" /></div>
            <span>Exam Practice</span>
          </div>
        </div>
      </div>

      {/* Single Full-Width Enroll Button */}
      <div className="card-footer-premium">
        <button
          className="enroll-btn-premium"
          onClick={() => navigate("/enquiry", { state: { selectedCourse: `${type} - ${course.level}` } })}
        >
          <FaGraduationCap /> Enroll Now
        </button>
      </div>
    </motion.div>
  );
}

function CoursesPage() {
  const [activeExamTrack, setActiveExamTrack] = useState("JLPT");

  return (
    <section className="courses-page">
      {/* Ambient background glows */}
      <div className="courses-bg-glow-1"></div>
      <div className="courses-bg-glow-2"></div>

      {/* EXAM TRACK TOGGLE SWITCHER (WITH SLIDING LAYOUT PILL ANIMATION) */}
      <div className="exam-track-toggle-wrapper">
        <button 
          className={`exam-toggle-btn ${activeExamTrack === "JLPT" ? "active" : ""}`}
          onClick={() => setActiveExamTrack("JLPT")}
        >
          {activeExamTrack === "JLPT" && (
            <motion.div 
              layoutId="activeTrackPill" 
              className="active-pill-bg" 
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}
          <span className="btn-content-relative">
            <FaTrophy className="toggle-icon-react red-icon" /> JLPT Courses
          </span>
        </button>
        <button 
          className={`exam-toggle-btn ${activeExamTrack === "NAT" ? "active" : ""}`}
          onClick={() => setActiveExamTrack("NAT")}
        >
          {activeExamTrack === "NAT" && (
            <motion.div 
              layoutId="activeTrackPill" 
              className="active-pill-bg" 
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}
          <span className="btn-content-relative">
            <FaBullseye className="toggle-icon-react dark-icon" /> NAT-TEST Prep
          </span>
        </button>
      </div>

      {activeExamTrack === "JLPT" ? (
        <>
          <motion.div 
            className="courses-header-section"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="courses-subtitle-tag">Academics Ecosystem</span>
            <h1 className="courses-main-title">
              JLPT <span>Preparation Courses</span>
            </h1>
            <p className="courses-page-desc">
              Structured language training aligned with official JLPT standards, designed to take you from a absolute beginner to a native-level professional.
            </p>
          </motion.div>

          <motion.div 
            className="courses-grid"
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
          >
            {jlptCourses.map((course, index) => (
              <CourseCard key={index} course={course} type="JLPT" />
            ))}
          </motion.div>
        </>
      ) : (
        <>
          <motion.div 
            className="courses-header-section section-nat"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="courses-subtitle-tag">Evaluation Pipeline</span>
            <h1 className="courses-main-title">
              NAT-TEST <span>Exam Mastery</span>
            </h1>
            <p className="courses-page-desc">
              Accelerated and specialized curricula built to excel in the NAT-TEST examinations, accepted by universities and immigration authorities in Japan.
            </p>
          </motion.div>

          <motion.div 
            className="courses-grid"
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
          >
            {natCourses.map((course, index) => (
              <CourseCard key={index} course={course} type="NAT" />
            ))}
          </motion.div>
        </>
      )}

      {/* WHY OUR COURSES SECTION */}
      <div className="courses-why">
        <motion.div 
          className="why-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="why-badge">Unparalleled Excellence</span>
          <h2 className="why-title">
            Why Our Courses <br /><span>Stand Out</span>
          </h2>
          <p className="why-subtitle-courses">Learn about the core academic advantages that make our programs highly effective</p>
        </motion.div>

        <motion.div 
          className="why-container"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
        >
          <motion.div className="why-card" variants={cardVariants}>
            <div className="why-card-top-row">
              <div className="why-icon">
                <FaTrophy />
              </div>
              <span className="why-pill-badge">
                <FaCheckCircle className="check-bullet" /> First-Try Pass Rate
              </span>
            </div>
            <div className="why-card-text">
              <h3>98.4% Exam Success</h3>
              <p>Students pass JLPT & NAT exams on their first attempt with our proven practice mock series.</p>
            </div>
          </motion.div>

          <motion.div className="why-card" variants={cardVariants}>
            <div className="why-card-top-row">
              <div className="why-icon">
                <FaUserTie />
              </div>
              <span className="why-pill-badge">
                <FaCheckCircle className="check-bullet" /> JLPT Certified
              </span>
            </div>
            <div className="why-card-text">
              <h3>Native Sensei Instructors</h3>
              <p>Learn directly from certified native Japanese educators and experienced bilingual mentors.</p>
            </div>
          </motion.div>

          <motion.div className="why-card" variants={cardVariants}>
            <div className="why-card-top-row">
              <div className="why-icon">
                <FaGlobeAmericas />
              </div>
              <span className="why-pill-badge">
                <FaCheckCircle className="check-bullet" /> Tokyo & Osaka
              </span>
            </div>
            <div className="why-card-text">
              <h3>Japan Career Placement</h3>
              <p>Direct hiring pipelines, bilingual resume formatting, and interview preparation for Japanese MNCs.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CoursesPage;