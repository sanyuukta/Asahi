import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLaptopCode, FaBookOpen, FaUsers, FaGraduationCap, FaRegClock, FaTrophy, FaUserTie, FaGlobeAmericas } from "react-icons/fa";
import "./CoursesPage.css";
import womenImg from "../assets/women3.png";

const jlptCourses = [
  {
    level: "N5 - Beginner Level",
    duration: "3-4 Months",
    desc: "Perfect foundation for beginners with comprehensive Japanese basics.",
    color: "green",
    img: womenImg
  },
  {
    level: "N4 - Upper Beginner",
    duration: "4-5 Months",
    desc: "Advanced grammar and vocabulary for practical communication.",
    color: "orange",
    img: womenImg
  },
  {
    level: "N3 - Intermediate Level",
    duration: "5-6 Months",
    desc: "Professional-level Japanese for work and academic purposes.",
    color: "blue",
    img: womenImg
  },
  {
    level: "N2 - Advanced Level",
    duration: "6-8 Months",
    desc: "High level Japanese for professional communication.",
    color: "purple",
    img: womenImg
  },
  {
    level: "N1 - Expert Level",
    duration: "8+ Months",
    desc: "Native level Japanese mastery and fluency.",
    color: "dark",
    img: womenImg
  }
];

const natCourses = [
  {
    level: "Q5 - Beginner Level",
    duration: "3-4 Months",
    desc: "Basic Japanese grammar and communication skills.",
    color: "green",
    img: womenImg
  },
  {
    level: "Q4 - Elementary Level",
    duration: "4-5 Months",
    desc: "Intermediate vocabulary and grammar training.",
    color: "orange",
    img: womenImg
  },
  {
    level: "Q3 - Intermediate Level",
    duration: "5-6 Months",
    desc: "Advanced Japanese reading and listening skills.",
    color: "blue",
    img: womenImg
  },
  {
    level: "Q2 - Advanced Level",
    duration: "6-8 Months",
    desc: "Professional Japanese fluency for career growth.",
    color: "purple",
    img: womenImg
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

  return (
    <motion.div className={`course-card-premium ${themeClass}`} variants={cardVariants}>
      {/* Top Banner Image */}
      <div className="course-card-image-wrapper">
        <img src={course.img || womenImg} alt={course.level} className="course-card-banner-img" />
        <div className="course-card-image-overlay"></div>
      </div>

      <div className="card-header-premium">
        <div className="card-badge-row">
          <span className="course-type-badge">{type}</span>
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

      <div className="card-footer-premium">
        <button
          className="enroll-btn-premium"
          onClick={() => navigate("/enquiry", { state: { selectedCourse: `${type} - ${course.level}` } })}
        >
          Enroll Now
        </button>
      </div>
    </motion.div>
  );
}

function CoursesPage() {
  return (
    <section className="courses-page">
      {/* Ambient background glows */}
      <div className="courses-bg-glow-1"></div>
      <div className="courses-bg-glow-2"></div>

      <motion.div 
        className="courses-header-section"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
      >
        {jlptCourses.map((course, index) => (
          <CourseCard key={index} course={course} type="JLPT" />
        ))}
      </motion.div>

      <motion.div 
        className="courses-header-section section-nat"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="courses-subtitle-tag">Evaluation Pipeline</span>
        <h1 className="courses-main-title">
          NAT Test <span>Courses</span>
        </h1>
        <p className="courses-page-desc">
          Accelerated and specialized curricula built to excel in the NAT-TEST examinations, accepted by universities and immigration authorities in Japan.
        </p>
      </motion.div>

      <motion.div 
        className="courses-grid"
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
      >
        {natCourses.map((course, index) => (
          <CourseCard key={index} course={course} type="NAT" />
        ))}
      </motion.div>

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
            <div className="why-icon">
              <FaTrophy />
            </div>
            <div className="why-card-text">
              <h3>95% Success Rate</h3>
              <p>Students pass JLPT exams on first attempt</p>
            </div>
          </motion.div>

          <motion.div className="why-card" variants={cardVariants}>
            <div className="why-icon">
              <FaUserTie />
            </div>
            <div className="why-card-text">
              <h3>Expert Instructors</h3>
              <p>Native speakers and certified professionals</p>
            </div>
          </motion.div>

          <motion.div className="why-card" variants={cardVariants}>
            <div className="why-icon">
              <FaGlobeAmericas />
            </div>
            <div className="why-card-text">
              <h3>Global Recognition</h3>
              <p>Certificates accepted worldwide</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CoursesPage;