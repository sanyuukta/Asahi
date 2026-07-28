import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaRocket, FaShieldAlt, FaGraduationCap, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroWoman from "../assets/women3.png";
import asahiGateway from "../assets/asahi_gateway.png";

// Background Concentric Waves emerging from the right side center
function ConcentricWaves() {
  return (
    <div className="concentric-waves-overlay">
      <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="rgba(217, 28, 60, 0.03)" strokeWidth="1.2">
          <circle cx="1100" cy="450" r="280" stroke="rgba(217, 28, 60, 0.04)" />
          <circle cx="1100" cy="450" r="380" />
          <circle cx="1100" cy="450" r="480" stroke="rgba(217, 28, 60, 0.02)" strokeDasharray="6 4" />
          <circle cx="1100" cy="450" r="580" />
          <circle cx="1100" cy="450" r="680" stroke="rgba(217, 28, 60, 0.02)" strokeDasharray="12 8" />
          <circle cx="1100" cy="450" r="780" />
        </g>
      </svg>
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2);
  };

  const slideData = [
    {
      tagline: "TRUSTED BY 120+ PLACED STUDENTS",
      headline: (
        <>
          Launch Your <br />
          Professional Career <br />
          In <span className="highlight-text-red">Japan.</span>
          <span className="headline-gradient-line"></span>
        </>
      ),
      subtext: "Learn from expert mentors, experience cultural immersion, and secure direct placement opportunities with top companies in Japan.",
      image: heroWoman,
      imageClass: "hero-rebuilt-image transparent-visual",
      card1: {
        icon: <FaGraduationCap className="rocket-icon" />,
        title: <>Your Future, <span className="red-text-bold">Our Mission.</span></>,
        bullets: ["Quality education.", "Real opportunities."]
      },
      card2: {
        icon: <FaRocket className="rocket-icon" />,
        title: <>Your Journey <br /> to Success <span className="red-text-bold">Starts Now!</span></>,
        bullets: ["Quality education.", "Real opportunities."]
      }
    },
    {
      tagline: "BILINGUAL JAPANESE TRAINING & PLACEMENTS",
      headline: (
        <>
          Asahi: The Ultimate <br />
          Gateway To Your <br />
          Dream In <span className="highlight-text-red">Japan.</span>
          <span className="headline-gradient-line"></span>
        </>
      ),
      subtext: "We combine native Japanese language training, deep cultural immersion, and direct corporate recruitment pipelines to turn your career ambitions into reality.",
      image: asahiGateway,
      imageClass: "rounded-image landscape-3d",
      card1: {
        icon: <FaGraduationCap className="rocket-icon" />,
        title: <>Why Asahi?, <span className="red-text-bold">Our Guarantee.</span></>,
        bullets: ["Expert native training.", "Proven placement track."]
      },
      card2: {
        icon: <FaRocket className="rocket-icon" />,
        title: <>Direct Placements, <span className="red-text-bold">Visa Support.</span></>,
        bullets: ["Direct corporate hires.", "100% visa assistance."]
      }
    }
  ];

  return (
    <section className="hero-premium">
      {/* BACKGROUND ELEMENTS */}
      <div className="hero-grid-overlay"></div>
      <div className="hero-ambient-glow"></div>
      <div className="hero-ambient-glow-2"></div>
      <ConcentricWaves />
      <div className="hero-dots-decoration"></div>

      {/* SLIDE NAVIGATION ARROWS (CADDVERSE STYLE) */}
      <button className="hero-nav-btn btn-prev" onClick={handlePrevSlide} aria-label="Previous Slide">
        <FaChevronLeft />
      </button>
      <button className="hero-nav-btn btn-next" onClick={handleNextSlide} aria-label="Next Slide">
        <FaChevronRight />
      </button>

      <div className="hero-grid-layout">
        {/* LEFT COLUMN: ACTIVE SLIDE CONTENT */}
        <div className="hero-left-column-wrapper">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide} // Refades on slide change
              className="hero-left-content"
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-badge-mockup">
                <FaShieldAlt className="badge-shield-icon" />
                <span>{slideData[currentSlide].tagline}</span>
              </div>

              <h1 className="hero-headline-mockup">
                {slideData[currentSlide].headline}
              </h1>

              <p className="hero-subtext-mockup">
                {slideData[currentSlide].subtext}
              </p>

              <div className="hero-actions-mockup">
                <button className="btn-hero-primary-pill" onClick={() => navigate("/courses")}>
                  Explore Programs 
                </button>
              </div>

              {/* Slide Indicator Dots */}
              <div className="hero-slide-indicators">
                {slideData.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`indicator-dot ${currentSlide === idx ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: ACTIVE SLIDE VISUALS */}
        <div className="hero-right-column-wrapper">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`visual-${currentSlide}`} // Refades on slide change
              className="hero-right-visual-mockup"
              initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="visual-glowing-backdrop"></div>
              <img 
                src={slideData[currentSlide].image} 
                alt="Japan Career Mentoring" 
                className={slideData[currentSlide].imageClass} 
              />
              
              {/* Card 1: Left Floating Card (above hand / bottom-left) */}
              <div className="floating-rocket-card float-slow-1">
                <div className="rocket-icon-box">
                  {slideData[currentSlide].card1.icon}
                </div>
                <div className="rocket-card-content">
                  <h5>{slideData[currentSlide].card1.title}</h5>
                  <hr className="card-divider" />
                  <ul>
                    {slideData[currentSlide].card1.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>
                        <span className="red-dot-bullet">•</span> {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card 2: Right Floating Card (bottom-right) */}
              <div className="floating-rocket-card floating-achievement-card float-slow-2">
                <div className="rocket-icon-box circular-icon-box">
                  {slideData[currentSlide].card2.icon}
                </div>
                <div className="rocket-card-content">
                  <h5>{slideData[currentSlide].card2.title}</h5>
                  <hr className="card-divider" />
                  <ul>
                    {slideData[currentSlide].card2.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>
                        <span className="red-dot-bullet">•</span> {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Hero;