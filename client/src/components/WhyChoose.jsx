import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaClock,
  FaCertificate,
  FaGlobeAsia,
  FaCheckCircle,
  FaRocket,
  FaHeadphones,
  FaGraduationCap,
  FaArrowRight,
  FaAward
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./WhyChoose.css";

function WhyChoose() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "✨ All Advantages" },
    { id: "training", label: "📚 JLPT & NAT Training" },
    { id: "careers", label: "💼 Japan Careers & Visas" },
    { id: "flexibility", label: "⚡ Batch Flexibility" }
  ];

  const features = [
    {
      id: "live-classes",
      category: "training",
      title: "Live Interactive Classes",
      subtitle: "REAL-TIME SENSEI FEEDBACK",
      desc: "Learn directly from certified bilingual instructors in live interactive batches with digital whiteboards, speech accent tuning, and immediate doubt clearance.",
      icon: <FaChalkboardTeacher />,
      tag: "98.4% Satisfaction Rate",
      highlight: true,
      stats: "Live Every Day",
      oppositeBadge: "ライブ授業 (Live Batches)",
      theme: "asahi-red"
    },
    {
      id: "jlpt-focused",
      category: "training",
      title: "JLPT & NAT Exam Mastery",
      subtitle: "GUARANTEED CONFIDENCE",
      desc: "Curricula tailored around authentic exam question banks, stroke-order Kanji worksheets, and real-time timed mock exams to clear levels on first attempt.",
      icon: <FaCertificate />,
      tag: "N5 to N1 Certification",
      highlight: true,
      stats: "98.4% Pass Rate",
      oppositeBadge: "合格率 98.4% (JLPT Pass)",
      theme: "asahi-red"
    },
    {
      id: "placement-support",
      category: "careers",
      title: "Direct Placement Assistance",
      subtitle: "TOKYO & OSAKA HIRING",
      desc: "Direct recruitment pipelines, bilingual resume formatting, and mock interview coaching for IT engineers, university grads, and working professionals in Japan.",
      icon: <FaRocket />,
      tag: "Direct Job Placement",
      highlight: false,
      stats: "120+ Placed Students",
      oppositeBadge: "就職支援 (Tokyo Hiring)",
      theme: "asahi-red"
    },
    {
      id: "native-audio",
      category: "training",
      title: "Native Pitch Accent Audio",
      subtitle: "AUDIO PRACTICE FILES",
      desc: "Downloadable listening dialogues recorded by native Japanese speakers to help master natural pronunciation, daily greetings, and business keigo.",
      icon: <FaHeadphones />,
      tag: "Included with Fujichan Books",
      highlight: false,
      stats: "100+ Audio Lessons",
      oppositeBadge: "音声教材 (Native Audio)",
      theme: "asahi-red"
    },
    {
      id: "flexible-schedules",
      category: "flexibility",
      title: "Flexible Batch Timings",
      subtitle: "MORNING & EVENING",
      desc: "Specially designed schedules for college students and working IT professionals, offering weekend and evening batches with full session recordings.",
      icon: <FaClock />,
      tag: "Weekend & Evening Options",
      highlight: false,
      stats: "Flexible Hours",
      oppositeBadge: "柔軟な時間 (Flexible Batch)",
      theme: "asahi-red"
    },
    {
      id: "visa-pathways",
      category: "careers",
      title: "Visa & University Guidance",
      subtitle: "100% LEGAL & VISA ASSISTANCE",
      desc: "End-to-end documentation assistance for study abroad visas, university admissions, COE processing, and career transition to top Japanese cities.",
      icon: <FaGraduationCap />,
      tag: "Full Visa Guidance",
      highlight: false,
      stats: "100% Visa Success",
      oppositeBadge: "ビザサポート (Visa Ready)",
      theme: "asahi-red"
    }
  ];

  return (
    <section className="whychoose-section">
      {/* Ambient Glows */}
      <div className="whychoose-bg-glow"></div>
      <div className="whychoose-bg-glow-2"></div>

      {/* JAPANESE SAKURA PETALS FALLING ANIMATION */}
      <div className="sakura-petals-container" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span 
            key={i} 
            className={`sakura-petal p-${i + 1}`}
            style={{
              left: `${(i * 8.5) + 2}%`,
              animationDelay: `${(i * 0.65)}s`,
              animationDuration: `${5.5 + (i % 4) * 1.2}s`
            }}
          >
            🌸
          </span>
        ))}
      </div>

      <div className="whychoose-container">
        {/* Section Header */}
        <header className="whychoose-header">
          <span className="whychoose-top-tag">
            <FaAward className="tag-award-icon" /> THE ASAHI ADVANTAGE
          </span>
          <h2 className="whychoose-title">
            Why Choose <span className="gradient-text">ASAHI</span>?
          </h2>
          <div className="gradient-underline" />
          <p className="whychoose-subtitle">
            Whether your goal is clearing JLPT certifications, studying in Tokyo, or securing a high-paying career in Japan, ASAHI provides the ultimate proven roadmap.
          </p>
        </header>

        {/* ALTERNATING VERTICAL TIMELINE LAYOUT */}
        <div className="whychoose-timeline-wrapper">
          <div className="timeline-center-line">
            <div className="laser-pulse-dot"></div>
          </div>

          {features.map((item, idx) => {
            const isEven = idx % 2 === 0; // Even = Left side, Odd = Right side
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`timeline-row-item ${isEven ? "left-item" : "right-item"}`}
              >
                {/* OPPOSITE SIDE JAPANESE KANJI BADGE PILL */}
                <div className="timeline-opposite-pill-wrapper">
                  <span className="opposite-kanji-pill">{item.oppositeBadge}</span>
                </div>

                {/* HORIZONTAL CONNECTOR ARM & CIRCLE NODE ON CENTER LINE */}
                <div className="timeline-connector-arm"></div>
                <div className={`timeline-node-icon-wrapper ${item.theme}`}>
                  <div className="node-icon-inner">{item.icon}</div>
                  <span className="node-step-number">0{idx + 1}</span>
                </div>

                {/* TIMELINE CARD CONTENT */}
                <div className={`timeline-card-box ${item.highlight ? "highlight-box" : ""}`}>
                  <div className="t-card-top-row">
                    <span className="t-sub-tag">{item.subtitle}</span>
                    <span className="t-step-badge">#0{idx + 1}</span>
                  </div>
                  
                  <h3 className="t-card-title">{item.title}</h3>
                  <p className="t-card-desc">{item.desc}</p>

                  <div className="t-card-footer">
                    <span className="t-pill-tag">
                      <FaCheckCircle className="check-bullet" /> {item.tag}
                    </span>
                    <span className="t-stat-highlight">{item.stats}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;