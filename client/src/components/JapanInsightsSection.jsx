import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaGlobeAsia, 
  FaChartLine, 
  FaShieldAlt, 
  FaPassport, 
  FaYenSign, 
  FaCheckCircle, 
  FaArrowRight, 
  FaGraduationCap,
  FaAward,
  FaBriefcase,
  FaUserCheck
} from "react-icons/fa";
import "./JapanInsightsSection.css";

function JapanInsightsSection() {
  const navigate = useNavigate();

  const japanFacts = [
    {
      icon: <FaChartLine />,
      title: "800,000+ Tech & IT Deficit",
      desc: "Japan's Ministry of Economy predicts an urgent shortage of 800K+ engineers & professionals by 2030, opening massive hiring for Indian talent."
    },
    {
      icon: <FaShieldAlt />,
      title: "#1 Global Safety & Quality of Life",
      desc: "Ranked among the safest countries worldwide with 1st-world infrastructure, clean tech cities, zero crime, and universal healthcare."
    },
    {
      icon: <FaPassport />,
      title: "Fast-Track Permanent Residence (1–3 Yrs)",
      desc: "Clear JLPT N2/N1 & qualify for Japan's Highly Skilled Foreign Professional visa for expedited PR within just 1 to 3 years."
    },
    {
      icon: <FaYenSign />,
      title: "High Compensation & Bonus Culture",
      desc: "Attractive starting packages (3.5M to 8M+ JPY/yr), biannual bonuses, overtime protection, and corporate housing allowances."
    }
  ];

  const asahiSolutions = [
    {
      problem: "Language & Spoken Kaiwa Barrier",
      solution: "Native Sensei-led JLPT N5–N1 training focused on authentic pitch accent, listening fluency, and everyday conversational mastery.",
      icon: <FaGraduationCap />
    },
    {
      problem: "Visa & COE Documentation Hurdles",
      solution: "End-to-end legal & visa assistance for student visas, university admissions, COE processing, and work visa transition.",
      icon: <FaPassport />
    },
    {
      problem: "Japanese Interview & Resume Standards",
      solution: "Bilingual Rirekisho formatting, business Keigo speech training, and direct mock interviews with Tokyo recruiters.",
      icon: <FaBriefcase />
    },
    {
      problem: "Relocation & Cultural Adaptation",
      solution: "Pre-departure cultural etiquette workshops, Meishi card custom practice, and active ASAHI alumni network across Tokyo & Osaka.",
      icon: <FaUserCheck />
    }
  ];

  return (
    <section className="japan-insights-section">
      {/* Background Ambient Glows */}
      <div className="japan-insights-glow"></div>
      <div className="japan-insights-glow-2"></div>

      <div className="japan-insights-container">
        {/* Section Header */}
        <header className="japan-insights-header">
          <span className="japan-insights-badge">
            <FaGlobeAsia className="header-badge-icon" /> WHY JAPAN & THE ASAHI ADVANTAGE
          </span>
          <h2 className="japan-insights-title">
            Unlocking Your Future & Career in <span className="gradient-text-red">Japan</span>
          </h2>
          <div className="gradient-underline" />
          <p className="japan-insights-subtitle">
            Japan is actively recruiting Indian professionals and students. Discover why Japan is your #1 career destination and how ASAHI bridges every gap to your success.
          </p>
        </header>

        {/* 2-COLUMN STAGE: JAPAN OPPORTUNITY VS ASAHI SOLUTION */}
        <div className="japan-insights-stage">
          {/* LEFT COLUMN: WHY JAPAN OPPORTUNITY */}
          <motion.div 
            className="japan-insights-card opportunity-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="insights-card-header">
              <span className="card-top-tag red-tag">🇯🇵 THE JAPAN OPPORTUNITY</span>
              <h3>Why Japan is the #1 Destination</h3>
              <p>Key market facts and lifestyle advantages for Indian professionals:</p>
            </div>

            <div className="facts-list">
              {japanFacts.map((fact, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: isLeft ? -35 : 35, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="fact-item"
                  >
                    <div className="fact-icon-box">
                      {fact.icon}
                    </div>
                    <div className="fact-content">
                      <h4>{fact.title}</h4>
                      <p>{fact.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: HOW ASAHI MAKES IT BETTER */}
          <motion.div 
            className="japan-insights-card solution-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="insights-card-header">
              <span className="card-top-tag dark-tag">✨ THE ASAHI SOLUTION</span>
              <h3>How ASAHI Ensures Your Success</h3>
              <p>How we solve the major hurdles students & professionals face:</p>
            </div>

            <div className="solutions-list">
              {asahiSolutions.map((sol, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: isLeft ? -35 : 35, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="solution-item"
                  >
                    <div className="solution-problem-row">
                      <span className="challenge-tag">Hurdle</span>
                      <h5>{sol.problem}</h5>
                    </div>
                    <div className="solution-answer-box">
                      <FaCheckCircle className="sol-check-icon" />
                      <p>{sol.solution}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM METRICS STRIP & CTA BANNER */}
        <div className="japan-insights-bottom-bar">
          <div className="metrics-strip">
            <div className="metric-box">
              <strong>800K+</strong>
              <span>Japan Job Deficit</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <strong>1–3 Yrs</strong>
              <span>Fast-Track PR Visa</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <strong>1000+</strong>
              <span>Successful Learners</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <strong>100%</strong>
              <span>Tokyo Placement Support</span>
            </div>
          </div>

          <button className="insights-cta-btn" onClick={() => navigate("/enquiry")}>
            🚀 Start Your Japan Application <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default JapanInsightsSection;
