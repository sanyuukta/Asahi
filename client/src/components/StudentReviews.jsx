import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";
import "./StudentReviews.css";

const students = [
  {
    initials: "AS",
    gradient: "linear-gradient(135deg, #ef4444, #b91c1c)",
    name: "Aarav Sharma",
    achievement: "JLPT N3 Cleared",
    review: "ASAHI coaching helped me improve my understanding and boosted my confidence for exams."
  },
  {
    initials: "PP",
    gradient: "linear-gradient(135deg, #a855f7, #6b21a8)",
    name: "Priyanka Patel",
    achievement: "Placed at Rakuten, Tokyo",
    review: "The faculty explains concepts in a very simple and practical way. Truly life-changing!"
  },
  {
    initials: "RD",
    gradient: "linear-gradient(135deg, #10b981, #047857)",
    name: "Rohan Das",
    achievement: "JLPT N2 Cleared",
    review: "Best learning environment and proper guidance for competitive exams. I cleared N2 in first go."
  },
  {
    initials: "SG",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    name: "Sneha Gupta",
    achievement: "JLPT N4 Cleared",
    review: "Regular tests and doubt solving helped me perform better. The support is outstanding."
  },
  {
    initials: "KV",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    name: "Karan Verma",
    achievement: "Placed at Wipro Japan",
    review: "Highly recommended coaching institute for serious students who wish to work in Japan."
  }
];

function StudentReviews() {
  return (
    <section className="reviews-section">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="reviews-title">
          ASAHI <span className="gradient-text-red">Student Reviews</span>
        </h2>
        <div className="gradient-underline" />
        <p className="reviews-subtitle">
          Hear firsthand experiences from our graduates who successfully cleared JLPT exams and relocated to Japan.
        </p>
      </motion.div>

      {/* TRACK 1: STUDENT PROFILE BUBBLES (LEFT TO RIGHT) */}
      <div className="students-slider">
        <div className="students-track">
          <div className="marquee-content">
            {students.map((s, i) => (
              <div className="student-box" key={i}>
                <div className="student-avatar" style={{ background: s.gradient }}>
                  {s.initials}
                </div>
                <p>{s.name}</p>
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {students.map((s, i) => (
              <div className="student-box" key={i + students.length}>
                <div className="student-avatar" style={{ background: s.gradient }}>
                  {s.initials}
                </div>
                <p>{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRACK 2: STUDENT TESTIMONIAL CARDS (RIGHT TO LEFT) */}
      <div className="reviews-slider">
        <div className="reviews-track">
          <div className="marquee-content-reviews">
            {students.map((s, i) => (
              <div className="review-box" key={i}>
                <div className="review-box-top">
                  <div className="star-rating-row">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="star-icon" />
                    ))}
                  </div>
                  <FaQuoteLeft className="quote-icon" />
                </div>

                <p className="review-text">"{s.review}"</p>

                <div className="review-author">
                  <h5>{s.name}</h5>
                  <span className="achievement-badge">
                    <FaCheckCircle className="check-icon" /> {s.achievement}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="marquee-content-reviews" aria-hidden="true">
            {students.map((s, i) => (
              <div className="review-box" key={i + students.length}>
                <div className="review-box-top">
                  <div className="star-rating-row">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="star-icon" />
                    ))}
                  </div>
                  <FaQuoteLeft className="quote-icon" />
                </div>

                <p className="review-text">"{s.review}"</p>

                <div className="review-author">
                  <h5>{s.name}</h5>
                  <span className="achievement-badge">
                    <FaCheckCircle className="check-icon" /> {s.achievement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentReviews;