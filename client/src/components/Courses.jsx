import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Courses.css";

import imgN5 from "../assets/course_n5.png";
import imgN4 from "../assets/course_n4.png";
import imgN3 from "../assets/course_n3.png";
import imgN2 from "../assets/course_n2.png";
import imgN1 from "../assets/course_n1.png";

const courses = [
  { 
    title: "N5 / Q5", 
    desc: "Basic Foundation & Vocabulary", 
    img: imgN5,
    info: "Master basic Hiragana, Katakana, and about 100 Kanji. Perfect for beginners to understand daily phrases and simple conversations."
  },
  { 
    title: "N4 / Q4", 
    desc: "Pre-Intermediate Grammar", 
    img: imgN4,
    info: "Learn basic grammar, around 300 Kanji, and 1,500 vocabulary words. Helps you hold simple daily conversations in slower speech."
  },
  { 
    title: "N3 / Q3", 
    desc: "Intermediate Communication", 
    img: imgN3,
    info: "Understand daily Japanese at natural speed. Learn about 650 Kanji to read articles, headlines, and grasp intermediate content."
  },
  { 
    title: "N2 / Q2", 
    desc: "Advanced Business Japanese", 
    img: imgN2,
    info: "Fluency level required for working in Japan. Master advanced grammar, business communication, and about 1,000 Kanji."
  },
  { 
    title: "N1 / Q1", 
    desc: "Native Level Proficiency", 
    img: imgN1,
    info: "Highest level of JLPT. Read complex literature, newspapers, and converse fluently in native environments with 2,000 Kanji."
  }
];

function Courses() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="courses">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="courses-title">
          Japanese <span>Courses</span>
        </h2>
        <p className="courses-subtitle">Structured language curricula designed for JLPT mastery and conversational fluency</p>
      </motion.div>

      <div className="courses-container">
        {/* LEFT COLUMN: ACTIVE IMAGE DISPLAY */}
        <motion.div 
          className="courses-image"
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={courses[activeIndex].img}
              alt="course"
              className="active-img"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <div className="courses-image-caption">
            <h4>{courses[activeIndex].title} level</h4>
            <p>{courses[activeIndex].info}</p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: INTERACTIVE COURSE LIST */}
        <motion.div 
          className="courses-list"
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="course-group-title">
            JLPT & NAT
          </h3>

          {courses.map((course, index) => (
            <div
              key={index}
              className={`course-item ${activeIndex === index ? "active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <div className="course-item-content">
                <h4>{course.title}</h4>
                {activeIndex === index && (
                  <p className="course-item-desc">
                    {course.desc}
                  </p>
                )}
              </div>
              <FaArrowRight className="course-arrow" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="courses-btn-wrapper">
        <button
          className="courses-btn"
          onClick={() => navigate("/courses")}
        >
          Explore Full Courses
        </button>
      </div>
    </section>
  );
}

export default Courses;