import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./AboutPreview.css";
import owner from "../assets/owner.png";

function AboutPreview() {
  const navigate = useNavigate();

  return (
    <section className="about-preview">
      {/* Background ambient blurs */}
      <div className="about-bg-glow"></div>
      <div className="about-bg-glow-2"></div>

      <motion.div 
        className="about-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1>
          What is <span>ASAHI</span>?
        </h1>
        <p className="about-subtitle">Empowering your journey to learn Japanese and build a career in Japan</p>
      </motion.div>

      <div className="about-container">
        {/* LEFT COLUMN: ANIMATED IMAGE ACCENT FRAME */}
        <motion.div 
          className="about-image"
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-img-wrapper">
            <img src={owner} alt="ASAHI Founder & Owner" />
          </div>
        </motion.div>

        {/* RIGHT COLUMN: ANIMATED TYPOGRAPHY SIDE */}
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Discover <span>ASAHI</span></h2>
          <p>
            ASAHI is a Japanese language learning academy dedicated to helping
            Indian students achieve their dream of studying and working in Japan.
            Our programs cover JLPT preparation from N5 to N1, real-world
            conversation training, and career guidance for opportunities in Japan.
          </p>

          <p>
            We focus on practical language skills, cultural understanding,
            and career support so students can confidently build a future in Japan.
          </p>

          <button
            className="about-btn"
            onClick={() => navigate("/about")}
          >
            Explore More
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutPreview;