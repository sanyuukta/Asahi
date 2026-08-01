import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaUserGraduate, FaHandshake, FaBriefcase, FaChalkboardTeacher, 
  FaCertificate, FaGlobeAsia, FaComments, FaYinYang, FaBookOpen, 
  FaChartLine, FaCheckCircle, FaUsers, FaMedal, FaLaptopHouse, FaArrowRight, FaAward, FaWhatsapp
} from "react-icons/fa";
import "./AboutUs.css";
import ownerImg from "../assets/owner.png";

const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = "" }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, suffix, isInView]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { icon: <FaUserGraduate />, value: <AnimatedCounter to={1000} suffix="+" />, label: "Students Successfully Trained" },
    { icon: <FaHandshake />, value: <AnimatedCounter to={60} suffix="+" />, label: "Indian School Tie-ups" },
    { icon: <FaBriefcase />, value: <AnimatedCounter to={100} suffix="%" />, label: "Placement & Visa Guidance" },
    { icon: <FaChalkboardTeacher />, value: <AnimatedCounter to={100} suffix="%" />, label: "Certified Japanese Trainers" }
  ];

  const features = [
    { icon: <FaUserGraduate />, title: "Experienced Faculty", desc: "Learn from highly qualified and certified Japanese language experts." },
    { icon: <FaBookOpen />, title: "Structured Curriculum", desc: "Comprehensive syllabus covering JLPT N5 to N1 levels." },
    { icon: <FaComments />, title: "Practical Speaking", desc: "Interactive sessions to boost conversational fluency." },
    { icon: <FaYinYang />, title: "Culture Workshops", desc: "Immersive experiences into rich Japanese traditions." },
    { icon: <FaGlobeAsia />, title: "Placement Assistance", desc: "End-to-end guidance for jobs in India and Japan." },
    { icon: <FaChartLine />, title: "Performance Tracking", desc: "Regular assessments and personalized feedback loops." },
    { icon: <FaLaptopHouse />, title: "Hybrid Learning", desc: "Flexible online and offline batches to suit your schedule." },
    { icon: <FaCheckCircle />, title: "Visa Guidance", desc: "Complete documentation support for study or work in Japan." }
  ];

  const milestones = [
    {
      year: "2018",
      tag: "Academy Founded",
      icon: <FaAward />,
      title: "Foundation Laid",
      desc: "ASAHI was established with a vision to provide authentic Japanese language education and cultural training in India."
    },
    {
      year: "2020",
      tag: "N5-N1 Expansion",
      icon: <FaBookOpen />,
      title: "JLPT & NAT Expansion",
      desc: "Launched comprehensive N5 to N1 curricula and specialized NAT exam preparation modules with native trainers."
    },
    {
      year: "2022",
      tag: "60+ Schools & MNCs",
      icon: <FaHandshake />,
      title: "60+ Indian School Tie-ups",
      desc: "Partnered with over 60+ Indian schools, colleges, and MNCs for campus Japanese programs and translation services."
    },
    {
      year: "2024",
      tag: "1000+ Graduates",
      icon: <FaGlobeAsia />,
      title: "Global Placement Hub",
      desc: "Crossed 1,000+ successful graduates with direct recruitment pipelines to Tokyo, Osaka, and leading Indian MNCs."
    }
  ];

  const intlExposure = [
    "Japan-focused career opportunities & IT hiring",
    "Placement guidance for Tokyo & Osaka MNCs",
    "Japanese corporate work culture training",
    "Professional business etiquette & Keigo",
    "Business Japanese communication modules",
    "Cross-cultural preparation & relocation guidance"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14
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

  return (
    <div className="about-us-page">
      
      {/* 1. HERO SECTION WITH SPLIT SHOWCASE */}
      <section className="about-hero-redesign">
        <div className="about-hero-grid">
          <motion.div 
            className="about-hero-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-pill-badge">
              <FaBookOpen /> WELCOME TO ASAHI BILINGUAL ACADEMY
            </span>
            <h1>
              Empowering Careers Through <span className="gradient-text">Japanese Mastery</span> & Global Opportunities
            </h1>
            <p>
              ASAHI empowers students with world-class Japanese language education, cultural immersion, career guidance, and international placements in Tokyo & Osaka.
            </p>

            <div className="hero-highlights-list">
              <div className="h-item">
                <FaCheckCircle className="check-bullet" />
                <span>JLPT & NAT Certification Mastery</span>
              </div>
              <div className="h-item">
                <FaCheckCircle className="check-bullet" />
                <span>Direct Tokyo & Osaka MNC Job Placements</span>
              </div>
              <div className="h-item">
                <FaCheckCircle className="check-bullet" />
                <span>60+ Indian School & College Tie-ups</span>
              </div>
            </div>

            <div className="hero-buttons-row">
              <button className="btn-primary-asahi" onClick={() => navigate("/enquiry")}>
                Enroll Now <FaArrowRight />
              </button>
              <button className="btn-secondary-asahi" onClick={() => navigate("/courses")}>
                Explore Courses
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="about-hero-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="founder-image-frame">
              <img src={ownerImg} alt="ASAHI Founder & Sensei" />
              <div className="founder-glass-card">
                <FaAward className="gold-star" />
                <div>
                  <strong>ASAHI Leadership & Excellence</strong>
                  <span>Bridging India & Japan Since 2018</span>
                </div>
              </div>
              <div className="founder-tag-badge">
                <span>100% Certified Senseis</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="about-stats">
        <motion.div 
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
        >
          {stats.map((stat, i) => (
            <motion.div 
              className="stat-card" 
              key={i}
              variants={cardVariants}
            >
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="mission-vision">
        <div className="mv-container">
          <motion.div 
            className="mv-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mv-card-header">
              <div className="mv-icon"><FaGlobeAsia /></div>
              <span className="mv-tag">TARGET EXCELLENCE</span>
            </div>
            <h2>Our Mission</h2>
            <p>"To create globally skilled professionals through quality Japanese language education, cultural immersion, and career-oriented training."</p>
          </motion.div>
          
          <motion.div 
            className="mv-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mv-card-header">
              <div className="mv-icon"><FaChartLine /></div>
              <span className="mv-tag">FUTURE ROADMAP</span>
            </div>
            <h2>Our Vision</h2>
            <p>"To become India's most trusted Japanese Language Institute connecting students with incredible international opportunities in Japan."</p>
          </motion.div>
        </div>
      </section>

      {/* 4. KEY MILESTONES (HORIZONTAL TIMELINE) */}
      <section className="key-milestones-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="milestones-tag">PROVEN TRACK RECORD</span>
          <h2>Key <span className="gradient-text">Milestones</span></h2>
          <p>Our journey of academic excellence, corporate partnerships, and student success</p>
          <div className="gradient-underline-sm" />
        </motion.div>

        <div className="milestones-wrapper">
          <div className="milestones-line"></div>

          <div className="milestones-nodes-row">
            {milestones.map((m, i) => (
              <div className="milestone-node-wrapper" key={i}>
                <div className="milestone-node">
                  <span className="node-icon">{m.icon}</span>
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            className="milestones-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
          >
            {milestones.map((m, i) => (
              <motion.div className="milestone-card" key={i} variants={cardVariants}>
                <div className="milestone-card-top-icon">{m.icon}</div>
                <span className="milestone-pill-badge">{m.tag}</span>
                <h3 className="milestone-year">{m.year}</h3>
                <h4 className="milestone-card-title">{m.title}</h4>
                <p className="milestone-card-desc">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. INTERNATIONAL EXPOSURE & TRUST */}
      <section className="intl-trust-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="milestones-tag">GLOBAL IMPACT & TRUST</span>
          <h2>Connecting Students With <span className="gradient-text">Top Japanese MNCs</span></h2>
          <p>Bridging language proficiency and international careers with certified Japanese training</p>
          <div className="gradient-underline-sm" />
        </motion.div>

        <div className="intl-container">
          <motion.div 
            className="intl-box dark-box"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="intl-pill-badge dark">⚡ CAREER PLACEMENT PIPELINE</span>
            <h2>International <span className="gradient-text-light">Exposure</span></h2>
            <p>We prepare you not just for exams, but for real-world career success in Tokyo & Osaka.</p>
            
            <div className="intl-list-grid">
              {intlExposure.map((item, i) => (
                <div className="intl-glass-item" key={i}>
                  <div className="glass-icon-wrap">
                    <FaCheckCircle className="list-icon" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="intl-box light-box"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="intl-pill-badge light">⭐ INSTITUTIONAL RECOGNITION</span>
            <h2>Trusted <span className="gradient-text">By All</span></h2>
            <p>Our commitment to excellence makes us the preferred choice across India & Japan.</p>
            
            <div className="trust-badges-grid">
              <div className="trust-badge-card">
                <div className="t-icon-box red"><FaUsers /></div>
                <div className="t-card-info">
                  <strong>Students & Parents</strong>
                  <span>1000+ Active Learners</span>
                </div>
              </div>

              <div className="trust-badge-card">
                <div className="t-icon-box purple"><FaChalkboardTeacher /></div>
                <div className="t-card-info">
                  <strong>Native Teachers</strong>
                  <span>N1 Certified Senseis</span>
                </div>
              </div>

              <div className="trust-badge-card">
                <div className="t-icon-box orange"><FaBriefcase /></div>
                <div className="t-card-info">
                  <strong>Top Corporates</strong>
                  <span>Tokyo & Osaka MNCs</span>
                </div>
              </div>

              <div className="trust-badge-card">
                <div className="t-icon-box green"><FaUserGraduate /></div>
                <div className="t-card-info">
                  <strong>60+ Schools</strong>
                  <span>Indian Campus Tie-ups</span>
                </div>
              </div>
            </div>

            <div className="trust-ticks">
              <div className="tick-row">
                <FaMedal className="tick-icon" />
                <span>Industry Standard N5-N1 Curriculum</span>
              </div>
              <div className="tick-row">
                <FaMedal className="tick-icon" />
                <span>98.4% JLPT & NAT Success Rate</span>
              </div>
              <div className="tick-row">
                <FaMedal className="tick-icon" />
                <span>Direct Career & Relocation Guidance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="about-cta">
        <motion.div 
          className="cta-container dark-luxury-cta"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="cta-badge">🌸 ASAHI BILINGUAL ACADEMY</span>
          <h2>Start Your <span className="gradient-text-light">Japanese Journey</span> Today</h2>
          <p>Join India's most trusted Japanese Language Institute and unlock direct career opportunities across Tokyo & Osaka.</p>
          
          <div className="cta-features-pills">
            <span><FaCheckCircle className="c-icon" /> JLPT N5-N1 Preparation</span>
            <span><FaCheckCircle className="c-icon" /> Tokyo & Osaka MNC Hiring</span>
            <span><FaCheckCircle className="c-icon" /> Complete Visa Guidance</span>
          </div>

          <div className="cta-buttons-row">
            <button className="btn-primary-asahi" onClick={() => navigate("/enquiry")}>
              Enroll Now <FaArrowRight />
            </button>
            <button 
              className="btn-whatsapp-cta" 
              onClick={() => window.open(`https://api.whatsapp.com/send?phone=917796530192&text=${encodeURIComponent("Hello ASAHI! I want to enquire about your Japanese courses.")}`, "_blank")}
            >
              <FaWhatsapp /> Quick WhatsApp Enquiry
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutUs;
