import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaWhatsapp, 
  FaBookOpen, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaGraduationCap, 
  FaGlobeAsia, 
  FaAward, 
  FaStar,
  FaHeadphones,
  FaChalkboardTeacher,
  FaEye
} from "react-icons/fa";
import { FUJICHAN_BOOKS, WHATSAPP_NUMBER } from "../utils/booksData";
import japanHeroImg from "../assets/japan_hero_scene.png";
import "./BookDetailPage.css";

function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentBook, setCurrentBook] = useState(null);
  const [otherBooks, setOtherBooks] = useState([]);

  const infoGridRef = useRef(null);
  const [activeInfoIdx, setActiveInfoIdx] = useState(0);

  // Auto-slide the info cards grid on mobile view
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth <= 768 && infoGridRef.current) {
        setActiveInfoIdx((prevIdx) => {
          const nextIdx = (prevIdx + 1) % 4; // 4 cards total
          const container = infoGridRef.current;
          const card = container.children[nextIdx];
          if (card) {
            const scrollLeft = card.offsetLeft;
            container.scrollTo({ left: scrollLeft, behavior: "smooth" });
          }
          return nextIdx;
        });
      }
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const rawId = String(id || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    
    let foundBook = FUJICHAN_BOOKS.find((b) => {
      const bId = String(b.id).toLowerCase().replace(/[^a-z0-9]/g, "");
      return bId === rawId || bId.includes(rawId) || rawId.includes(bId);
    });

    if (!foundBook) {
      if (rawId.includes("1")) foundBook = FUJICHAN_BOOKS[0];
      else if (rawId.includes("2")) foundBook = FUJICHAN_BOOKS[1];
      else if (rawId.includes("3")) foundBook = FUJICHAN_BOOKS[2];
      else foundBook = FUJICHAN_BOOKS[0];
    }

    setCurrentBook(foundBook);
    setOtherBooks(FUJICHAN_BOOKS.filter((b) => b.id !== foundBook.id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!currentBook) return null;

  const handleWhatsApp = (book) => {
    const msg = book.waMessage || `Kon'nichiwa ASAHI Publishing! 📚\n\nI want to order *${book.name}* (${book.subtitle}).\n\nPlease share payment link and doorstep delivery details. Arigatou! 🌸`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="book-detail-page-root">
      <div className="detail-container">
        {/* Top Navigation */}
        <div className="detail-top-nav">
          <button className="back-library-btn" onClick={() => navigate("/books")}>
            <FaArrowLeft /> Back to All Books
          </button>
        </div>

        {/* Compact Professional Header */}
        <header className="detail-header-compact">
          <span className="detail-top-badge">
            <FaBookOpen /> OFFICIAL ASAHI JAPANESE BOOK SERIES
          </span>
          <h1 className="detail-heading-title">
            {currentBook.name} <span className="gradient-text">— {currentBook.subtitle}</span>
          </h1>
          <div className="gradient-underline" />
          <p className="detail-heading-subtitle">
            Master Japanese language proficiency effortlessly with our structured <strong>{currentBook.name}</strong> textbook series — crafted by expert bilingual Senseis for JLPT success.
          </p>
        </header>

        {/* 1. MAIN BOOK SHOWCASE CARD */}
        <div className="main-showcase-card">
          <div className="showcase-grid">
            {/* Left: Book Cover Image */}
            <div className="showcase-image-col">
              <div className="showcase-image-frame">
                <img src={currentBook.imageUrl} alt={currentBook.name} />
                <span className="showcase-level-badge">{currentBook.levelBadge}</span>
              </div>
            </div>

            {/* Right: Book Details */}
            <div className="showcase-info-col">
              <div className="showcase-header-row">
                <span className="showcase-sub-tag">{currentBook.subtitle}</span>
                <span className="price-tag">Official Hardcover Edition</span>
              </div>

              <div className="detail-rating-row">
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <span className="rating-score">4.9 / 5.0 • Verified ASAHI Edition</span>
              </div>

              <h2 className="showcase-book-name">{currentBook.name}</h2>
              <p className="showcase-book-desc">{currentBook.description}</p>

              {/* What's Included Box */}
              <div className="showcase-included-box">
                <h4><FaBookOpen className="included-icon" /> What's Included in this Book:</h4>
                <ul className="included-list">
                  {currentBook.highlights.map((item, index) => (
                    <li key={index}>
                      <FaCheckCircle className="check-bullet" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side-by-side Action Buttons */}
              <div className="showcase-action-row">
                <button 
                  className="btn-buy-whatsapp-lg" 
                  onClick={() => handleWhatsApp(currentBook)}
                >
                  <FaWhatsapp className="btn-icon" /> Buy Now on WhatsApp
                </button>
                <button 
                  className="btn-view-details-lg" 
                  onClick={() => navigate("/enquiry", { state: { selectedCourse: `Book & Course - ${currentBook.name}` } })}
                >
                  <FaGraduationCap className="btn-icon" /> Enroll for Batch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. OTHER BOOKS SECTION (PROPERLY ALIGNED & COMPACT) */}
        <section className="other-books-section">
          <div className="section-header-compact">
            <span className="other-section-badge">
              <FaBookOpen /> COMPLETE ACADEMIC ECOSYSTEM
            </span>
            <h2>Explore Other <span className="gradient-text">Fujichan Books</span></h2>
            <div className="gradient-underline-sm" />
            <p className="other-section-subtitle">Complete your Japanese learning journey with our complementary level textbooks</p>
          </div>

          <div className="other-books-grid">
            {otherBooks.map((b) => (
              <article className="other-book-card" key={b.id}>
                <div className="other-card-top">
                  <div className="other-image-container">
                    <img src={b.imageUrl} alt={b.name} />
                  </div>
                  <span className="other-card-badge">{b.levelBadge}</span>
                </div>

                <div className="other-card-body">
                  <div className="other-card-meta">
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="star-icon-sm" />
                      ))}
                    </div>
                    <span className="other-card-sub">{b.subtitle}</span>
                  </div>

                  <h3 className="other-card-title">{b.name}</h3>
                  <p className="other-card-desc">{b.description}</p>

                  <div className="other-card-highlights">
                    {b.highlights ? (
                      b.highlights.slice(0, 2).map((item, hIdx) => (
                        <div key={hIdx} className="other-highlight-item">
                          <FaCheckCircle className="check-bullet" />
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="other-highlight-item"><FaCheckCircle className="check-bullet" /> <span>JLPT Exercises Included</span></div>
                        <div className="other-highlight-item"><FaCheckCircle className="check-bullet" /> <span>Native Audio MP3 Guide</span></div>
                      </>
                    )}
                  </div>

                  <div className="other-card-actions">
                    <button 
                      className="btn-buy-whatsapp-card" 
                      onClick={() => handleWhatsApp(b)}
                    >
                      <FaWhatsapp className="btn-icon" /> Buy Now
                    </button>
                    <button 
                      className="btn-view-details-card" 
                      onClick={() => navigate(`/books/${b.id}`)}
                    >
                      <FaEye className="btn-icon" /> View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. INFORMATIVE SECTION: JAPAN CULTURE, CAREER & ASAHI IMMERSION */}
        <section className="detail-informative-section">
          <div className="section-header-compact">
            <span className="japan-badge">🌸 日本文化 & ASAHI Gateway</span>
            <h2>Explore Japan: Culture, <span className="gradient-text">Careers & Language Mastery</span></h2>
            <div className="gradient-underline-sm" />
            <p className="japan-section-subtitle">
              Mastering Japanese with ASAHI opens doors to higher education, top IT & engineering careers, and authentic cultural immersion across Tokyo & Osaka.
            </p>
          </div>

          {/* 4 Feature Pillars (2x2 Grid) */}
          <div className="informative-grid-2x2" ref={infoGridRef}>
            <div className="info-card-horizontal">
              <div className="info-card-header">
                <div className="info-icon-wrap red">
                  <FaGlobeAsia />
                </div>
                <span className="info-pill-badge">Hospitality & Keigo</span>
              </div>
              <div className="info-card-content">
                <h3>Culture & Etiquette (日本の文化)</h3>
                <p>Master Omotenashi (hospitality), business card etiquette (Meishi), polite honorifics (Keigo), and daily Japanese customs.</p>
              </div>
            </div>

            <div className="info-card-horizontal">
              <div className="info-card-header">
                <div className="info-icon-wrap orange">
                  <FaHeadphones />
                </div>
                <span className="info-pill-badge">Pitch Accent Guide</span>
              </div>
              <div className="info-card-content">
                <h3>Native Audio & Dialogue (音声学習)</h3>
                <p>Includes downloadable audio files recorded by native Japanese speakers to build authentic pitch accent and listening skills.</p>
              </div>
            </div>

            <div className="info-card-horizontal">
              <div className="info-card-header">
                <div className="info-icon-wrap purple">
                  <FaChalkboardTeacher />
                </div>
                <span className="info-pill-badge">Live 1-on-1 Feedback</span>
              </div>
              <div className="info-card-content">
                <h3>Sensei Mentorship (専任講師)</h3>
                <p>Get live batch guidance, personalized doubt clearance sessions, and exam strategy from certified bilingual Senseis.</p>
              </div>
            </div>

            <div className="info-card-horizontal">
              <div className="info-card-header">
                <div className="info-icon-wrap green">
                  <FaGraduationCap />
                </div>
                <span className="info-pill-badge">Tokyo & Osaka MNCs</span>
              </div>
              <div className="info-card-content">
                <h3>Japan Career & Visas (就職・留学)</h3>
                <p>Unlock study abroad pathways, university admissions, IT engineering jobs, and visa guidance for living in Japan.</p>
              </div>
            </div>
          </div>

          {/* Mobile Info Indicator Dots */}
          <div className="info-mobile-dots">
            {[0, 1, 2, 3].map((idx) => (
              <span
                key={idx}
                className={`info-dot ${activeInfoIdx === idx ? "active" : ""}`}
                onClick={() => {
                  setActiveInfoIdx(idx);
                  if (infoGridRef.current) {
                    const container = infoGridRef.current;
                    const card = container.children[idx];
                    if (card) {
                      const scrollLeft = card.offsetLeft;
                      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
                    }
                  }
                }}
              />
            ))}
          </div>

          {/* Side-by-Side Japanese Experience Story Showcase */}
          <div className="japan-experience-banner">
            <div className="exp-image-box">
              <img src={japanHeroImg} alt="Japan Experience & ASAHI" />
              <div className="exp-floating-badge">
                <FaAward className="gold-icon" />
                <div>
                  <strong>ASAHI Japanese Gateway</strong>
                  <span>1000+ Successful Learners</span>
                </div>
              </div>
            </div>

            <div className="exp-content-box">
              <span className="exp-sub-tag">🎌 Why Japanese Language?</span>
              <h3>Your Superpower for <span className="gradient-text">Global Success & Future Growth</span></h3>
              <p>
                Japan is home to leading global tech giants, world-class universities, and a rich cultural heritage. By studying with the <strong>Fujichan book series</strong>, you gain practical vocabulary, Kanji stroke order rules, and exam formulas tailored for real-world confidence.
              </p>

              <ul className="exp-check-list">
                <li>
                  <FaCheckCircle className="check-icon" />
                  <span>Comprehensive Hiragana, Katakana, and JLPT Kanji mastery.</span>
                </li>
                <li>
                  <FaCheckCircle className="check-icon" />
                  <span>Real-life workplace, travel, and school conversation dialogues.</span>
                </li>
                <li>
                  <FaCheckCircle className="check-icon" />
                  <span>Direct guidance for JLPT certifications (N5 to N1).</span>
                </li>
              </ul>

              <div className="exp-cta-btns">
                <button className="btn-buy-whatsapp-card" onClick={() => handleWhatsApp(currentBook)}>
                  <FaWhatsapp /> Buy {currentBook.name} Book
                </button>
                <button className="btn-view-details-card" onClick={() => navigate("/courses")}>
                  Explore Live Batches
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BookDetailPage;
