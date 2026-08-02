import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaChalkboardTeacher, FaLanguage, FaGraduationCap, 
  FaHandshake, FaBriefcase, FaSchool, 
  FaUniversity, FaPlane, FaBuilding, 
  FaComments, FaMapMarkedAlt, FaCheckCircle, FaArrowRight,
  FaClock, FaGlobeAsia, FaAward, FaUserCheck, FaWhatsapp,
  FaSearch, FaTimes, FaChevronDown, FaChevronUp, FaShieldAlt,
  FaStar, FaQuestionCircle, FaUserFriends, FaFilter
} from "react-icons/fa";
import { MdSchool, MdCorporateFare, MdFlightTakeoff, MdApps } from "react-icons/md";
import "./ServicesPage.css";

const kanji = ["学", "語", "日", "本", "就", "業", "力", "夢"];

function ServicesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const autoTimer = useRef(null);
  const totalRef = useRef(0);
  const filterRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const personaFilters = [
    { id: "all",          label: "All Categories", icon: <MdApps /> },
    { id: "students",     label: "Students",       icon: <FaGraduationCap /> },
    { id: "institutions", label: "Institutions",   icon: <MdSchool /> },
    { id: "corporate",   label: "Corporate",      icon: <MdCorporateFare /> },
    { id: "japan",        label: "Japan Careers",  icon: <MdFlightTakeoff /> }
  ];

  const services = [
    {
      id: "jlpt-prep",
      icon: <FaChalkboardTeacher />,
      kanji: "学",
      title: "Individual JLPT & NAT Prep",
      subtitle: "One-on-One Personalized Language Coaching",
      category: "students",
      badge: "JLPT N5 → N1",
      duration: "3 – 6 Months",
      mode: "Online & Offline",
      forWhom: "Students & Career Seekers",
      themeTone: "accent-red",
      desc: "Personalized preparation classes for JLPT (N5 to N1) and NAT exams, customized to your learning pace, career roadmap, and fluency targets.",
      deliverables: [
        "Complete N5–N1 Kanji, Vocabulary & Grammar Syllabus",
        "Weekly Mock Exams with Detailed Performance Reports",
        "Dedicated Native Kaiwa Speaking Practice",
        "Flexible Batch Scheduling for Students & Professionals"
      ]
    },
    {
      id: "college-collab",
      icon: <FaUniversity />,
      kanji: "校",
      title: "College & Institutional Collab",
      subtitle: "Integrated Campus Training & MoU Partnerships",
      category: "institutions",
      badge: "Campus MoU",
      duration: "Semester / Annual",
      mode: "On-Campus & Hybrid",
      forWhom: "Engineering & Degree Colleges",
      themeTone: "accent-red",
      desc: "Partnerships with engineering colleges and universities to conduct integrated Japanese language training and JLPT prep directly inside campus schedules.",
      deliverables: [
        "Curriculum Integration with Japanese MNC Hiring Standards",
        "Technical Japanese & Engineering Vocabulary Modules",
        "Joint Certification & On-Campus Recruitment Drives",
        "Faculty Support & Progress Reporting for Academic Heads"
      ]
    },
    {
      id: "school-collab",
      icon: <FaSchool />,
      kanji: "習",
      title: "School Collaborations",
      subtitle: "Junior Language & Cultural Immersion Modules",
      category: "institutions",
      badge: "K-12 Schools",
      duration: "Academic Year",
      mode: "In-Class Batches",
      forWhom: "CBSE, ICSE & IB Schools",
      themeTone: "accent-red",
      desc: "Custom Japanese language modules, cultural workshops, origami sessions, and interactive learning designed specifically for school curricula and young learners.",
      deliverables: [
        "Activity-Based Japanese Alphabet & Cultural Lessons",
        "Annual Japanese Cultural Fest & Language Competitions",
        "60+ Indian School Academic Tie-ups Implemented",
        "Certified Instructors with Child Pedagogy Training"
      ]
    },
    {
      id: "translation",
      icon: <FaLanguage />,
      kanji: "訳",
      title: "Translation & Live Interpretation",
      subtitle: "Commercial, Legal & Technical Translation",
      category: "corporate",
      badge: "Bilingual Pro",
      duration: "Project / Retainer",
      mode: "NDA Confidential",
      forWhom: "Exporters, Law Firms & Tech Enterprises",
      themeTone: "accent-red",
      desc: "High-accuracy commercial, legal, and technical document translations alongside live business interpretation for bilateral corporate meetings.",
      deliverables: [
        "Legal Contracts, Patents & Engineering Manual Translations",
        "Live Interpretation for High-Stakes B2B Meetings",
        "100% Native Japanese Proofreading & Localization",
        "Strict NDA Agreements for Data Protection"
      ]
    },
    {
      id: "corp-training",
      icon: <FaBuilding />,
      kanji: "業",
      title: "Corporate Japanese Training",
      subtitle: "B2B Culture & Business Etiquette Programs",
      category: "corporate",
      badge: "Enterprise",
      duration: "Custom Modules",
      mode: "HQ / Virtual",
      forWhom: "IT Companies, MNCs & Engineering Firms",
      themeTone: "accent-red",
      desc: "Tailored language modules and professional Japanese business etiquette (Keigo) training for corporate workforces collaborating with Tokyo & Osaka MNCs.",
      deliverables: [
        "Keigo Honorifics, Email Writing & Business Etiquette",
        "Domain Vocabulary for IT, Automotive & Finance",
        "Flexible Executive Batches Aligned to Work Shifts",
        "Employee Assessment & International Benchmark Reports"
      ]
    },
    {
      id: "study-tours",
      icon: <FaPlane />,
      kanji: "旅",
      title: "Guided Japan Study & Tech Tours",
      subtitle: "Cultural, Industrial & Academic Immersions",
      category: "japan",
      badge: "Tokyo & Osaka",
      duration: "7 – 14 Days",
      mode: "On-Ground Tour",
      forWhom: "Students, Academics & Delegates",
      themeTone: "accent-red",
      desc: "Organized educational and corporate tours to technological, industrial, and historical destinations — Tokyo, Kyoto, Osaka, and Nagoya.",
      deliverables: [
        "Top Japanese Universities & Robotics Center Visits",
        "Guided Cultural Immersion in Tokyo, Kyoto & Osaka",
        "Corporate HQ Tours & Business Networking",
        "Complete Logistics, Visas & Local Japanese Guides"
      ]
    },
    {
      id: "study-japan",
      icon: <FaMapMarkedAlt />,
      kanji: "留",
      title: "Study in Japan Pipeline",
      subtitle: "Language School Admissions & Visa Processing",
      category: "japan",
      badge: "Direct Admissions",
      duration: "1 – 2 Years",
      mode: "Tokyo / Osaka",
      forWhom: "High School & College Graduates",
      themeTone: "accent-red",
      desc: "Direct admissions guidance, application processing, and student visa (COE) documentation for top language academies and preparatory schools in Japan.",
      deliverables: [
        "Official Admissions to Top Tokyo & Osaka Language Schools",
        "Certificate of Eligibility (COE) & Visa Guidance",
        "Part-Time Job (Arubaito) Assistance in Japan",
        "Pre-Departure Briefing & Airport Pickup Coordination"
      ]
    },
    {
      id: "tokyo-placement",
      icon: <FaBriefcase />,
      kanji: "就",
      title: "Tokyo & Osaka MNC Placements",
      subtitle: "Direct Corporate Recruitment Assistance",
      category: "japan",
      badge: "Direct Hiring",
      duration: "Immediate",
      mode: "Full-Time Jobs",
      forWhom: "Bilingual Job Seekers & Engineers",
      themeTone: "accent-red",
      desc: "Comprehensive career services including Japanese resume drafting (Rirekisho), mock interviews, and direct recruitment pipelines to top Tokyo & Osaka MNCs.",
      deliverables: [
        "Professional Rirekisho & Shokumukeirekisho Formatting",
        "Japanese Interview Training with Native Sensei Feedback",
        "Direct Connections with IT, Engineering & Hospitality MNCs",
        "Work Visa Sponsorship & Relocation Guidance"
      ]
    },
    {
      id: "ssw-titp",
      icon: <FaHandshake />,
      kanji: "特",
      title: "SSW & TITP Worker Programs",
      subtitle: "Specified Skilled Workers Direct Placement",
      category: "japan",
      badge: "Govt SSW Visa",
      duration: "3 – 5 Year Visa",
      mode: "Govt Pipeline",
      forWhom: "Skilled Technicians & Caregivers",
      themeTone: "accent-red",
      desc: "Structured training for SSW skill tests and Technical Intern Training Program (TITP) visas to facilitate direct hiring in healthcare, food, and manufacturing.",
      deliverables: [
        "JFT-Basic Language & SSW Industry Skill Exam Training",
        "Direct Employer Matching Drives in India & Japan",
        "Complete Visa Processing & Documentation Support",
        "High-Paying Salary Packages with Full Benefits"
      ]
    },
    {
      id: "kaiwa-spoken",
      icon: <FaComments />,
      kanji: "話",
      title: "Conversational Kaiwa Batches",
      subtitle: "Fluency & Native Pronunciation Focus",
      category: "students",
      badge: "Native Accent",
      duration: "2 Months",
      mode: "Small Groups",
      forWhom: "N5–N3 Learners",
      themeTone: "accent-red",
      desc: "Conversation-heavy batches eliminating speaking hesitation, building real-world vocabulary, and perfecting native Japanese pronunciation with Sensei feedback.",
      deliverables: [
        "Daily Kaiwa Roleplay Scenarios & Speaking Drills",
        "Native Sensei Pronunciation & Intonation Correction",
        "Confidence Building for Job Interviews & Travels",
        "Small Group Size — Maximum 8 Students per Batch"
      ]
    }
  ];

  const faqs = [
    {
      q: "How do I choose between online and on-campus Japanese classes?",
      a: "Our online batches offer maximum flexibility with live interactive Zoom sessions and recorded lectures, perfect for working professionals and university students. On-campus batches are ideal for institutions looking for structured, face-to-face instruction and MoU integration."
    },
    {
      q: "Does ASAHI assist with Japanese student visa (COE) and relocation?",
      a: "Yes! For our Study in Japan pipeline, we manage the entire end-to-end process — from university/language school applications to Certificate of Eligibility (COE) filing, embassy visa guidance, accommodation arrangement, and airport pickup."
    },
    {
      q: "What is the difference between TITP and Specified Skilled Worker (SSW) programs?",
      a: "TITP (Technical Intern Training Program) focuses on skill transfer and internship experience in Japan for 1–3 years. SSW (Specified Skilled Worker) is a government work visa pathway allowing skilled individuals to work in 12+ designated Japanese industries for up to 5 years with full benefits and higher compensation."
    },
    {
      q: "Can corporate training programs be customized for our engineering team?",
      a: "Absolutely. We tailor custom corporate Japanese modules specifically designed for IT, Automotive, and Manufacturing engineering teams. Training covers business Japanese (Keigo), technical terminology, cross-cultural client communication, and email etiquette."
    },
    {
      q: "How can my school or university partner with ASAHI for an MoU?",
      a: "Educational institutions can partner with ASAHI by signing a bilateral MoU. We provide native-certified instructors, standardized courseware, JLPT exam preparation, joint certification, and direct campus recruitment drives for your students."
    }
  ];

  // Filter services by category and search query
  const filteredServices = services.filter(svc => {
    const matchesCategory = selectedCategory === "all" || svc.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      svc.title.toLowerCase().includes(q) || 
      svc.subtitle.toLowerCase().includes(q) || 
      svc.desc.toLowerCase().includes(q) || 
      svc.badge.toLowerCase().includes(q) ||
      svc.forWhom.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  totalRef.current = filteredServices.length;

  useEffect(() => {
    if (!autoAdvance || filteredServices.length === 0) return;
    clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % (totalRef.current || 1));
    }, 6000);
    return () => clearInterval(autoTimer.current);
  }, [autoAdvance, selectedCategory, searchQuery, filteredServices.length]);

  const safeIdx = Math.min(activeIdx, Math.max(filteredServices.length - 1, 0));
  const activeService = filteredServices[safeIdx] || filteredServices[0];

  const handleSelect = (idx) => {
    setActiveIdx(idx);
    setAutoAdvance(false);
    clearInterval(autoTimer.current);

    setTimeout(() => {
      if (spotlightRef.current) {
        const headerOffset = 85;
        const elementPosition = spotlightRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth"
        });
      }
    }, 60);
  };

  const handleEnroll = (title) => {
    navigate("/enquiry", { state: { selectedService: title } });
  };

  const handleWA = (title) => {
    const msg = `Konnichiwa ASAHI! I want to enquire about *${title}*. Please share details and batch schedules.`;
    window.open(`https://api.whatsapp.com/send?phone=917796530192&text=${encodeURIComponent(msg)}`, "_blank");
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="svc-root">

      {/* FLOATING KANJI BACKGROUND */}
      <div className="svc-kanji-bg" aria-hidden="true">
        {kanji.map((k, i) => (
          <span key={i} className={`svc-kanji-float k-${i}`}>{k}</span>
        ))}
      </div>

      {/* ── HERO ─────────────────────────────── */}
      <section className="svc-hero">
        <div className="svc-hero-ambient" />
        
        <motion.div
          className="svc-hero-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaGlobeAsia /> ASAHI BILINGUAL PROGRAMS
        </motion.div>

        <motion.h1
          className="svc-hero-h1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Every Path.<br />
          <span className="svc-red-text">One Academy.</span>
        </motion.h1>

        {/* ELEGANT SUBHEADING UNDERLINE DIRECTLY UNDER H1 */}
        <motion.div 
          className="svc-sub-underline"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        />

        <motion.p
          className="svc-hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          From N5 foundation to Tokyo MNC placement — select a specialized track and explore what ASAHI has built for you.
        </motion.p>

        {/* UNIFIED SEARCH & FILTER BAR */}
        <motion.div 
          className="svc-search-filter-bar"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="svc-search-input-group">
            <FaSearch className="svc-search-icon" />
            <input 
              type="text"
              placeholder="Search programs by keyword (e.g. JLPT, Corporate, Visa, Tokyo)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIdx(0);
                setAutoAdvance(false);
              }}
            />
            {searchQuery && (
              <button className="svc-search-clear" onClick={() => setSearchQuery("")} title="Clear search">
                <FaTimes />
              </button>
            )}
          </div>

          <div className="svc-filter-divider" />

          {/* CUSTOM FILTER DROPDOWN */}
          <div className="svc-filter-custom-wrapper" ref={filterRef}>
            <button 
              type="button"
              className={`svc-filter-trigger ${isFilterOpen ? "active" : ""}`}
              onClick={() => setIsFilterOpen(prev => !prev)}
            >
              <FaFilter className="svc-filter-icon" />
              <span>{personaFilters.find(f => f.id === selectedCategory)?.label || "All Categories"}</span>
              <FaChevronDown className={`svc-filter-chevron ${isFilterOpen ? "open" : ""}`} />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  className="svc-filter-menu"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {personaFilters.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      className={`svc-filter-option ${selectedCategory === f.id ? "selected" : ""}`}
                      onClick={() => {
                        setSelectedCategory(f.id);
                        setActiveIdx(0);
                        setAutoAdvance(false);
                        setIsFilterOpen(false);
                        setTimeout(() => {
                          if (spotlightRef.current) {
                            const headerOffset = 85;
                            const elementPosition = spotlightRef.current.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            window.scrollTo({ top: Math.max(0, offsetPosition), behavior: "smooth" });
                          }
                        }, 60);
                      }}
                    >
                      <span className="svc-opt-icon">{f.icon}</span>
                      <span className="svc-opt-label">{f.label}</span>
                      {selectedCategory === f.id && <FaCheckCircle className="svc-opt-check" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </section>

      {/* ── MAIN SHOWCASE AREA ─────────────────── */}
      <section className="svc-showcase">
        <div className="svc-showcase-inner">

          {/* LEFT — NUMBERED ACCORDION NAV */}
          <nav className="svc-nav-list">
            <div className="svc-nav-heading">
              <span className="svc-nav-count">{filteredServices.length}</span>
              <span>Programs Available</span>
            </div>

            {filteredServices.length === 0 ? (
              <div className="svc-no-results">
                <FaSearch className="svc-no-res-icon" />
                <p>No programs match "{searchQuery}"</p>
                <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredServices.map((svc, idx) => (
                <motion.div
                  key={svc.id}
                  layout
                  className={`svc-nav-item ${safeIdx === idx ? "active" : ""}`}
                  onClick={() => handleSelect(idx)}
                >
                  <div className="svc-nav-item-left">
                    <span className="svc-nav-num">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="svc-nav-text">
                      <p className="svc-nav-title">{svc.title}</p>
                      <AnimatePresence>
                        {safeIdx === idx && (
                          <motion.span
                            className="svc-nav-sub"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            {svc.subtitle}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <span className="svc-nav-icon">{svc.icon}</span>
                  {safeIdx === idx && (
                    <motion.div
                      className="svc-nav-progress"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: autoAdvance ? 1 : 0 }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  )}
                </motion.div>
              ))
            )}
          </nav>

          {/* RIGHT — SPOTLIGHT PANEL */}
          <div className="svc-spotlight" ref={spotlightRef}>
            <AnimatePresence mode="wait">
              {activeService ? (
                <motion.div
                  key={activeService.id}
                  className="svc-spotlight-card"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* BIG KANJI DECORATION */}
                  <span className="svc-big-kanji" aria-hidden="true">{activeService.kanji}</span>

                  {/* TOP META ROW */}
                  <div className="svc-spot-meta">
                    <span className="svc-spot-badge">{activeService.badge}</span>
                    <span className="svc-spot-for"><FaAward className="svc-inline-tag-icon" /> {activeService.forWhom}</span>
                  </div>

                  {/* TITLE BLOCK */}
                  <div className="svc-spot-title-block">
                    <div className="svc-spot-icon">{activeService.icon}</div>
                    <div>
                      <h2 className="svc-spot-title">{activeService.title}</h2>
                      <h4 className="svc-spot-subtitle">{activeService.subtitle}</h4>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="svc-spot-desc">{activeService.desc}</p>

                  {/* HORIZONTAL STATS STRIP */}
                  <div className="svc-stat-strip">
                    <div className="svc-stat">
                      <FaClock className="svc-stat-icon" />
                      <div>
                        <label>Duration</label>
                        <strong>{activeService.duration}</strong>
                      </div>
                    </div>
                    <div className="svc-stat-div" />
                    <div className="svc-stat">
                      <FaGlobeAsia className="svc-stat-icon" />
                      <div>
                        <label>Format</label>
                        <strong>{activeService.mode}</strong>
                      </div>
                    </div>
                    <div className="svc-stat-div" />
                    <div className="svc-stat">
                      <FaAward className="svc-stat-icon" />
                      <div>
                        <label>Target Audience</label>
                        <strong>{activeService.forWhom}</strong>
                      </div>
                    </div>
                  </div>

                  {/* DELIVERABLES 2-COL */}
                  <div className="svc-deliverables">
                    <h5><FaStar className="svc-heading-icon" /> Key Deliverables & Outcomes</h5>
                    <div className="svc-deliv-grid">
                      {activeService.deliverables.map((d, i) => (
                        <div key={i} className="svc-deliv-item">
                          <FaCheckCircle className="svc-check" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTION BAR */}
                  <div className="svc-spot-actions">
                    <button
                      className="btn-spot-enroll"
                      onClick={() => handleEnroll(activeService.title)}
                    >
                      Begin Your Journey <FaArrowRight />
                    </button>
                    <button
                      className="btn-spot-wa"
                      onClick={() => handleWA(activeService.title)}
                    >
                      <FaWhatsapp /> WhatsApp Inquiry
                    </button>
                  </div>

                  {/* DOT NAV */}
                  {filteredServices.length > 1 && (
                    <div className="svc-dot-nav">
                      {filteredServices.map((_, i) => (
                        <button
                          key={i}
                          className={`svc-dot ${i === safeIdx ? "active" : ""}`}
                          onClick={() => handleSelect(i)}
                          aria-label={`Go to service ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}

                </motion.div>
              ) : (
                <div className="svc-spotlight-empty">
                  <p>Select a program to view comprehensive details.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── PATHWAY STRIP ────────────────────── */}
      <section className="svc-pathway">
        <div className="svc-pathway-inner">
          <div className="svc-pathway-label">YOUR JAPANESE JOURNEY</div>
          <h2 className="svc-pathway-h2">From First Word to <span className="svc-red-text">Tokyo Career</span></h2>
          
          {/* ELEGANT UNDERLINE */}
          <div className="svc-sub-underline" />

          <div className="svc-steps-row">
            {[
              { num: "01", kanji: "一 基礎", tag: "N5 & N4", title: "Foundation", icon: <FaGraduationCap />, desc: "Master Hiragana, Katakana, 300+ Kanji, and basic conversational fluency." },
              { num: "02", kanji: "二 応用", tag: "N3 & N2", title: "Advanced Fluency", icon: <FaAward />, desc: "Business Keigo honorifics, complex grammar, and speed reading comprehension." },
              { num: "03", kanji: "三 面接", tag: "Rirekisho", title: "Interview Prep", icon: <FaUserCheck />, desc: "Japanese format resume drafting, mock interviews, and cultural etiquette." },
              { num: "04", kanji: "四 就職", tag: "Tokyo MNC", title: "Japan Placement", icon: <FaBriefcase />, desc: "Direct recruitment drives, work visa sponsorship, and relocation support." },
            ].map((step, i) => (
              <div key={i} className="svc-step">
                <div className="svc-step-head">
                  <div className="svc-step-icon">{step.icon}</div>
                  <span className="svc-step-num">{step.num}</span>
                </div>
                <div className="svc-step-kanji">{step.kanji}</div>
                <span className="svc-step-tag">{step.tag}</span>
                <h4 className="svc-step-title">{step.title}</h4>
                <p className="svc-step-desc">{step.desc}</p>
                {i < 3 && <div className="svc-step-arrow"><FaArrowRight /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION ──────────────── */}
      <section className="svc-faq-section">
        <div className="svc-faq-inner">
          <div className="svc-section-header">
            <span className="svc-badge-sub"><FaQuestionCircle /> GOT QUESTIONS?</span>
            <h2>Frequently Asked <span className="svc-red-text">Questions</span></h2>
            {/* ELEGANT UNDERLINE DIRECTLY UNDER H2 */}
            <div className="svc-sub-underline" />
            <p>Everything you need to know about ASAHI bilingual programs and admissions.</p>
          </div>

          <div className="svc-faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`svc-faq-item ${openFaq === index ? "active" : ""}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="svc-faq-q">
                  <span>{faq.q}</span>
                  <button className="svc-faq-toggle">
                    {openFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div 
                      className="svc-faq-a"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA BANNER ──────────────────── */}
      <section className="svc-cta-banner">
        <div className="svc-cta-inner">
          <div className="svc-cta-text">
            <span className="svc-cta-label">💼 INSTITUTIONAL & CORPORATE COLLABORATIONS</span>
            <h2>Looking to introduce Japanese at your School, College or Company?</h2>
            <p>Custom MoUs · Corporate Bilingual Training · Direct Placement Support</p>
          </div>
          <button
            className="btn-cta-partner"
            onClick={() => navigate("/enquiry", { state: { selectedService: "Institutional Collaboration" } })}
          >
            Partner With ASAHI <FaArrowRight />
          </button>
        </div>
      </section>

    </div>
  );
}

export default ServicesPage;
