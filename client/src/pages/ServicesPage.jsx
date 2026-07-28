import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaChalkboardTeacher, FaLanguage, FaGraduationCap, 
  FaHandshake, FaBriefcase, FaSchool, 
  FaExchangeAlt, FaMapMarkedAlt, FaUniversity, FaPlane, FaBuilding, 
  FaComments, FaChalkboard, FaCheckCircle
} from "react-icons/fa";
import "./ServicesPage.css";

function ServicesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Offerings", count: 13 },
    { id: "edu", label: "Education & Academics", count: 5 },
    { id: "japan", label: "Careers & Study Abroad", count: 5 },
    { id: "corp", label: "Corporate & Translation", count: 3 }
  ];

  const services = [
    {
      icon: <FaChalkboardTeacher />,
      title: "Individual JLPT & NAT Prep",
      subtitle: "One-on-One Language Coaching",
      desc: "Personalized individual preparation classes for JLPT (N5 to N1) and NAT exams, customized to match your learning pace and fluency goals.",
      badge: "Personalized",
      color: "crimson",
      category: "edu"
    },
    {
      icon: <FaUniversity />,
      title: "College & Institutional Collab",
      subtitle: "Integrated Campus Training",
      desc: "Partnerships with colleges and technical institutes to conduct integrated Japanese language training and JLPT prep directly on campus.",
      badge: "Colleges",
      color: "blue",
      category: "edu"
    },
    {
      icon: <FaSchool />,
      title: "School Collaborations",
      subtitle: "Junior Language Curricula",
      desc: "Custom Japanese language modules, cultural workshops, and interactive learning sessions designed for school curricula and young learners.",
      badge: "Schools",
      color: "teal",
      category: "edu"
    },
    {
      icon: <FaLanguage />,
      title: "Translation & Interpretation",
      subtitle: "Professional Commercial Translations",
      desc: "High-accuracy commercial, legal, and technical document translations alongside consecutive and simultaneous live business interpretation.",
      badge: "Bilingual",
      color: "purple",
      category: "corp"
    },
    {
      icon: <FaExchangeAlt />,
      title: "Student Exchange Programs",
      subtitle: "Inter-Cultural Study Travels",
      desc: "Coordinating exchange trips and collaborative courses between Indian and Japanese educational institutions for deep language immersion.",
      badge: "Exchange",
      color: "orange",
      category: "japan"
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Study in Japan",
      subtitle: "Language School Admission Pipelines",
      desc: "Direct admissions guidance, application processing, and student visa documentation to enroll in top language academies in Japan.",
      badge: "Abroad Study",
      color: "emerald",
      category: "japan"
    },
    {
      icon: <FaGraduationCap />,
      title: "Japanese University Admissions",
      subtitle: "Degree Program Placement Support",
      desc: "End-to-end consulting for undergraduate and postgraduate university applications in Japan, including scholarship guidance.",
      badge: "University",
      color: "blue",
      category: "japan"
    },
    {
      icon: <FaPlane />,
      title: "Guided Japan Study Tours",
      subtitle: "Cultural & Corporate Visits",
      desc: "Organized educational and corporate tours to key technological, industrial, and historical destinations like Tokyo, Kyoto, and Osaka.",
      badge: "Travel",
      color: "crimson",
      category: "corp"
    },
    {
      icon: <FaBuilding />,
      title: "Corporate Japanese Training",
      subtitle: "B2B Culture & Etiquette Modules",
      desc: "Language modules and professional Japanese business etiquette training tailored for corporate workforces collaborating with Japan.",
      badge: "Corporate",
      color: "purple",
      category: "corp"
    },
    {
      icon: <FaComments />,
      title: "Conversational Speaking Batches",
      subtitle: "Fluency & Pronunciation Focus",
      desc: "Dedicated conversation-heavy batches aimed at eliminating speaking hesitation, building vocabulary, and perfecting pronunciation.",
      badge: "Spoken",
      color: "teal",
      category: "edu"
    },
    {
      icon: <FaBriefcase />,
      title: "Placement Support (India & Japan)",
      subtitle: "100% Career Placement Services",
      desc: "Resume drafting (Rirekisho/Shokumukeirekisho), mock interview practice, and direct corporate placement connections in India and Japan.",
      badge: "Careers",
      color: "emerald",
      category: "japan"
    },
    {
      icon: <FaChalkboard />,
      title: "Japanese Teachers Training",
      subtitle: "Instructors Certification Program",
      desc: "Pedagogical training programs for Japanese language educators to learn advanced classroom instructional design and teaching formats.",
      badge: "Teachers",
      color: "orange",
      category: "edu"
    },
    {
      icon: <FaHandshake />,
      title: "SSW & TITP Worker Programs",
      subtitle: "Specified Skilled Workers Pipeline",
      desc: "Structured training support for SSW tests and Technical Intern Training Program (TITP) visas to facilitate direct hiring in Japan.",
      badge: "Work Visas",
      color: "crimson",
      category: "japan"
    }
  ];

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
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

  const filteredServices = services.filter(svc => {
    if (activeCategory === "all") return true;
    return svc.category === activeCategory;
  });

  const handleEnrollClick = (serviceTitle) => {
    navigate("/enquiry", { state: { selectedService: serviceTitle } });
  };

  return (
    <div className="services-page-wrapper">
      {/* Background ambient glows */}
      <div className="services-bg-glow"></div>
      <div className="services-bg-glow-2"></div>
      <div className="services-bg-glow-3"></div>

      <div className="services-dashboard-container">
        
        {/* LEFT COLUMN: STICKY BRAND & NAVIGATION CONTROL */}
        <aside className="services-sidebar">
          <motion.div 
            className="sidebar-sticky-content"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="services-tag-crimson">Bilingual Ecosystem</span>
            <h1 className="sidebar-title">
              Our Premium <br />
              <span>Bilingual Services</span>
            </h1>
            <p className="sidebar-desc">
              Bridging cultural gaps and opening doors to global placements with structured programs, school collaborations, and translations.
            </p>

            {/* INTERACTIVE CATEGORY TABS */}
            <div className="category-tabs-vertical">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="tab-label">{cat.label}</span>
                  <span className="tab-count">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* TRUST BADGE WIDGET */}
            <div className="sidebar-trust-card">
              <div className="trust-icon-row">
                <FaCheckCircle className="trust-check-icon" />
                <span>Certified Excellence</span>
              </div>
              <p>Government aligned curricula and direct recruitment collaborations with Tokyo corporations.</p>
            </div>
          </motion.div>
        </aside>

        {/* RIGHT COLUMN: DYNAMIC GRID OF SERVICES */}
        <main className="services-main-content">
          <div className="grid-header">
            <h3>Showing {filteredServices.length} Programs & Services</h3>
          </div>

          <motion.div 
            className="services-grid-asymmetric"
            key={activeCategory}
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((svc) => (
                <motion.div 
                  key={svc.title} 
                  className={`service-card-premium border-${svc.color}`}
                  variants={cardVariants}
                  layout
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.93, y: 15 }}
                >
                  <div className="card-top">
                    <span className={`svc-badge-premium badge-${svc.color}`}>{svc.badge}</span>
                    <div className={`svc-icon-premium icon-${svc.color}`}>
                      {svc.icon}
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <h3>{svc.title}</h3>
                    <h4>{svc.subtitle}</h4>
                    <p>{svc.desc}</p>
                  </div>
                  
                  <div className="card-body-bottom">
                    <button className={`enroll-btn btn-${svc.color}`} onClick={() => handleEnrollClick(svc.title)}>
                      Enroll Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

      {/* 3. FLOATING GLASS STATS BLOCK */}
      <section className="services-stats-section">
        <motion.div 
          className="services-stats-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="stat-item">
            <h3>500+</h3>
            <p>Students Placed in Japan</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>JLPT Exam Success Rate</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Corporate Clients Assisted</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default ServicesPage;
