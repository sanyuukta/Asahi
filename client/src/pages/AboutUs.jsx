import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaUserGraduate, FaHandshake, FaBriefcase, FaChalkboardTeacher, 
  FaCertificate, FaGlobeAsia, FaComments, FaYinYang, FaBookOpen, 
  FaChartLine, FaCheckCircle, FaUsers, FaMedal, FaLaptopHouse
} from "react-icons/fa";
import "./AboutUs.css";

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
    { icon: <FaHandshake />, value: <AnimatedCounter to={50} suffix="+" />, label: "Partner Schools & Colleges" },
    { icon: <FaBriefcase />, value: <AnimatedCounter to={100} suffix="%" />, label: "Placement Guidance" },
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
      title: "Foundation Laid",
      desc: "ASAHI was established with a vision to provide authentic Japanese language education and cultural training in India."
    },
    {
      year: "2020",
      title: "JLPT & NAT Expansion",
      desc: "Launched comprehensive N5 to N1 curricula and specialized NAT exam preparation modules with native trainers."
    },
    {
      year: "2022",
      title: "Corporate & Campus Collabs",
      desc: "Partnered with over 50+ schools, colleges, and MNCs for campus Japanese programs and commercial translations."
    },
    {
      year: "2024",
      title: "Global Placement Hub",
      desc: "Crossed 1,000+ successful graduates with direct recruitment pipelines to Tokyo, Osaka, and leading Indian MNCs."
    }
  ];

  const intlExposure = [
    "Japan-focused career opportunities",
    "Placement guidance for Japan",
    "Japanese work culture training",
    "Professional business etiquette",
    "Business Japanese communication",
    "Cross-cultural preparation"
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
      
      {/* 1. HERO SECTION */}
      <section className="about-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-badge">WELCOME TO ASAHI BILINGUAL ACADEMY</div>
          <h1>Empowering Careers Through <span>Japanese Mastery</span> & Global Opportunities</h1>
          <p>
            ASAHI empowers students with world-class Japanese language education, cultural immersion, career guidance, and international placements. Our mission is to transform passionate learners into globally confident professionals.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/enquiry")}>Enroll Now</button>
          </div>
        </motion.div>
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
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mv-icon"><FaGlobeAsia /></div>
            <h2>Our Mission</h2>
            <p>"To create globally skilled professionals through quality Japanese language education and career-oriented training."</p>
          </motion.div>
          
          <motion.div 
            className="mv-card"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mv-icon"><FaChartLine /></div>
            <h2>Our Vision</h2>
            <p>"To become India's most trusted Japanese Language Institute connecting students with incredible international opportunities."</p>
          </motion.div>
        </div>
      </section>



      {/* 5. KEY MILESTONES (HORIZONTAL TIMELINE) */}
      <section className="key-milestones-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="milestones-tag">PROVEN TRACK RECORD</span>
          <h2>Key <span>Milestones</span></h2>
          <p>Our journey of academic excellence, corporate partnerships, and student success</p>
        </motion.div>

        <div className="milestones-wrapper">
          <div className="milestones-line"></div>

          <div className="milestones-nodes-row">
            {milestones.map((_, i) => (
              <div className="milestone-node-wrapper" key={i}>
                <div className="milestone-node">
                  <div className="node-dot"></div>
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
                <h3 className="milestone-year">{m.year}</h3>
                <h4 className="milestone-card-title">{m.title}</h4>
                <p className="milestone-card-desc">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. INTERNATIONAL EXPOSURE & TRUST */}
      <section className="intl-trust-section">
        <div className="intl-container">
          <motion.div 
            className="intl-box dark-box"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>International <span>Exposure</span></h2>
            <p>We prepare you not just for exams, but for real-world success in Japan.</p>
            <ul className="intl-list">
              {intlExposure.map((item, i) => (
                <li key={i}><FaCheckCircle className="list-icon" /> {item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="intl-box light-box"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>Trusted <span>By All</span></h2>
            <p>Our commitment to excellence makes us the preferred choice.</p>
            <div className="trust-badges">
              <span><FaUsers /> Students & Parents</span>
              <span><FaChalkboardTeacher /> Teachers</span>
              <span><FaBriefcase /> Top Corporates</span>
              <span><FaUserGraduate /> Educational Institutions</span>
            </div>
            <div className="trust-ticks">
              <p><FaMedal className="tick-icon" /> Industry Standard Curriculum</p>
              <p><FaMedal className="tick-icon" /> Student Success Focused</p>
              <p><FaMedal className="tick-icon" /> Career Ready Programs</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="about-cta">
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Start Your Japanese Journey Today</h2>
          <p>Join India's most trusted Japanese Language Institute and unlock global career opportunities.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/enquiry")}>Enroll Now</button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutUs;
