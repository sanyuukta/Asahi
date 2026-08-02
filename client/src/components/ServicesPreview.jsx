import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaGraduationCap, 
  FaBuilding, 
  FaBriefcase, 
  FaPlane, 
  FaArrowRight, 
  FaAward
} from "react-icons/fa";
import "./ServicesPreview.css";

function ServicesPreview() {
  const navigate = useNavigate();

  const handleExplore = () => {
    window.scrollTo(0, 0);
    navigate("/services");
  };

  return (
    <section className="services-preview-section">
      {/* Background ambient glows */}
      <div className="svc-prev-glow-1" />
      <div className="svc-prev-glow-2" />

      <div className="services-preview-container">
        <motion.div 
          className="services-explore-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* TOP TAG */}
          <span className="svc-top-badge">
            <FaAward className="svc-badge-icon" /> ASAHI BILINGUAL SERVICES
          </span>

          {/* MAIN HEADING */}
          <h2 className="svc-explore-title">
            Explore Our <span className="gradient-text-red">Professional Services</span>
          </h2>
          <div className="gradient-underline" />

          {/* SUBTITLE */}
          <p className="svc-explore-subtitle">
            From individual JLPT preparation to corporate training and Tokyo MNC placements — discover how ASAHI empowers every stage of your career.
          </p>

          {/* SLEEK PILLS ROW */}
          <div className="svc-pills-strip">
            <div className="sp-pill-item"><FaGraduationCap className="sp-p-icon" /> JLPT N5–N1 Prep</div>
            <div className="sp-pill-item"><FaBuilding className="sp-p-icon" /> Corporate Training</div>
            <div className="sp-pill-item"><FaBriefcase className="sp-p-icon" /> Tokyo MNC Placements</div>
            <div className="sp-pill-item"><FaPlane className="sp-p-icon" /> Study in Japan & Visas</div>
          </div>

          {/* CTA BUTTON */}
          <div className="svc-cta-wrapper">
            <button className="btn-explore-services-main" onClick={handleExplore}>
              Explore All Services <FaArrowRight className="btn-arrow" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesPreview;
