import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaWhatsapp, 
  FaBookOpen, 
  FaEye, 
  FaCheckCircle, 
  FaGraduationCap, 
  FaGlobeAsia, 
  FaAward, 
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaHeadphones
} from "react-icons/fa";
import API from "../services/api";
import { FUJICHAN_BOOKS, WHATSAPP_NUMBER } from "../utils/booksData";
import "./BooksPage.css";

import japanHeroImg from "../assets/japan_hero_scene.png";

function BooksPage() {
  const navigate = useNavigate();
  const [booksList, setBooksList] = useState(FUJICHAN_BOOKS);
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const fetchApiBooks = async () => {
      try {
        const res = await API.get("/books");
        if (res.data && res.data.books && res.data.books.length > 0) {
          const apiBooksMapped = res.data.books.map((b, idx) => ({
            id: `fujichan-${idx + 1}`,
            name: b.name || `Fujichan ${idx + 1}`,
            subtitle: b.subtitle || FUJICHAN_BOOKS[idx % 3].subtitle,
            levelBadge: b.levelBadge || FUJICHAN_BOOKS[idx % 3].levelBadge,
            imageUrl: b.imageUrl || FUJICHAN_BOOKS[idx % 3].imageUrl,
            description: b.description || FUJICHAN_BOOKS[idx % 3].description,
            highlights: b.highlights || FUJICHAN_BOOKS[idx % 3].highlights,
            priceTag: b.priceTag || FUJICHAN_BOOKS[idx % 3].priceTag,
            waMessage: `Kon'nichiwa ASAHI Publishing! 📚\n\nI wish to order the *${b.name}* official Japanese textbook.\n\n📌 Item Details:\n• Book Title: ${b.name}\n• Includes: Native Audio Exercises & Kanji Worksheets\n\nPlease share the payment link and doorstep delivery timeline. Arigatou! 🌸`
          }));
          
          setBooksList(apiBooksMapped);
        }
      } catch (error) {
        console.log("Using static Fujichan books fallback:", error);
        setBooksList(FUJICHAN_BOOKS);
      }
    };

    fetchApiBooks();
  }, []);

  const handleNext = () => {
    setActiveIdx((prev) => (prev === booksList.length - 1 ? 0 : prev + 1));
    setAnimKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? booksList.length - 1 : prev - 1));
    setAnimKey((prev) => prev + 1);
  };

  const handleWhatsApp = (book) => {
    const message = book.waMessage || `Kon'nichiwa ASAHI Publishing! 📚\n\nI wish to order the *${book.name}* official Japanese textbook.\n\nPlease share payment link and delivery details. Arigatou! 🌸`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleOpenDetails = (book, idx) => {
    const bookId = book.id || `fujichan-${idx + 1}`;
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="books-page-root">
      {/* 1. HERO & MAIN HEADING WITH GRADIENT UNDERLINE */}
      <section className="books-header-section">
        <div className="books-header-content">
          <span className="books-top-badge">
            <FaBookOpen className="badge-icon" /> OFFICIAL ASAHI JAPANESE LIBRARY
          </span>
          <h1 className="books-heading-title">
            Fujichan <span className="gradient-text">Learning Books</span>
          </h1>
          <div className="gradient-underline" />
          <p className="books-heading-subtitle">
            Master the Japanese language effortlessly with our specially designed <strong>Fujichan 1, Fujichan 2, and Fujichan 3</strong> textbook series — crafted by expert Senseis for JLPT excellence.
          </p>
        </div>
      </section>

      {/* 2. THREE HORIZONTAL BLOCKS FOR BOOKS */}
      <section className="books-cards-container">
        {/* DESKTOP GRID */}
        <div className="books-horizontal-grid desktop-books-grid">
          {booksList.slice(0, 3).map((book, idx) => (
            <article className="book-card-item" key={book.id || idx}>
              <div className="book-card-badge">{book.levelBadge}</div>
              
              <div className="book-image-container">
                <img src={book.imageUrl} alt={book.name} loading="lazy" />
                <div className="book-image-overlay">
                  <span className="overlay-tag">{book.subtitle}</span>
                </div>
              </div>

              <div className="book-card-body">
                <div className="book-card-meta-row">
                  <div className="star-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>
                  <span className="price-tag-pill">Hardcover Edition</span>
                </div>

                <h3 className="book-title">{book.name}</h3>
                <p className="book-description">{book.description}</p>

                {/* Highlights List */}
                <div className="book-card-highlights">
                  <span className="highlights-header">Includes:</span>
                  <ul>
                    {book.highlights ? (
                      book.highlights.slice(0, 3).map((item, hIdx) => (
                        <li key={hIdx}>
                          <FaCheckCircle className="check-bullet" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li><FaCheckCircle className="check-bullet" /> <span>Kanji & Stroke Worksheets</span></li>
                        <li><FaCheckCircle className="check-bullet" /> <span>Native Audio Exercises Included</span></li>
                        <li><FaCheckCircle className="check-bullet" /> <span>JLPT Exam Prep Mock Papers</span></li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="book-action-buttons">
                  <button 
                    className="btn-buy-whatsapp-card" 
                    onClick={() => handleWhatsApp(book)}
                    title="Order on WhatsApp"
                  >
                    <FaWhatsapp className="btn-icon" /> Buy Now
                  </button>
                  <button 
                    className="btn-view-details-card" 
                    onClick={() => handleOpenDetails(book, idx)}
                    title="View Book Details"
                  >
                    <FaEye className="btn-icon" /> View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* MOBILE SLIDER CAROUSEL WITH LEFT & RIGHT ARROWS */}
        <div className="mobile-books-slider-wrapper">
          <button 
            className="slider-arrow-btn left-arrow" 
            onClick={handlePrev} 
            aria-label="Previous Book"
          >
            <FaChevronLeft />
          </button>

          <div className="slider-card-stage">
            {booksList.slice(0, 3).map((book, idx) => {
              if (idx !== activeIdx) return null;
              return (
                <article className="book-card-item slide-anim-card" key={`${book.id || idx}-${animKey}`}>
                  <div className="book-card-badge">{book.levelBadge}</div>
                  
                  <div className="book-image-container">
                    <img src={book.imageUrl} alt={book.name} />
                    <div className="book-image-overlay">
                      <span className="overlay-tag">{book.subtitle}</span>
                    </div>
                  </div>

                  <div className="book-card-body">
                    <div className="book-card-meta-row">
                      <div className="star-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="star-icon" />
                        ))}
                      </div>
                      <span className="price-tag-pill">Hardcover Edition</span>
                    </div>

                    <h3 className="book-title">{book.name}</h3>
                    <p className="book-description">{book.description}</p>
                    
                    <div className="book-action-buttons">
                      <button 
                        className="btn-buy-whatsapp-card" 
                        onClick={() => handleWhatsApp(book)}
                      >
                        <FaWhatsapp className="btn-icon" /> Buy Now
                      </button>
                      <button 
                        className="btn-view-details-card" 
                        onClick={() => handleOpenDetails(book, idx)}
                      >
                        <FaEye className="btn-icon" /> View Details
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button 
            className="slider-arrow-btn right-arrow" 
            onClick={handleNext} 
            aria-label="Next Book"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Mobile Slider Controls Footer */}
        <div className="slider-controls-footer">
          <div className="slider-dots">
            {booksList.slice(0, 3).map((_, i) => (
              <span 
                key={i} 
                className={`dot-item ${i === activeIdx ? "active" : ""}`} 
                onClick={() => { setActiveIdx(i); setAnimKey((k) => k + 1); }}
              />
            ))}
          </div>
          <span className="slider-step-tag">
            Fujichan {activeIdx + 1} of {Math.min(booksList.length, 3)}
          </span>
        </div>
      </section>

      {/* 3. JAPAN & ASAHI IMMERSION SECTION */}
      <section className="japan-asahi-showcase-section">
        {/* 3. JAPAN & ASAHI IMMERSION SHOWCASE */}
        <div className="japan-showcase-header">
          <span className="japan-badge">
            <FaGlobeAsia className="japan-badge-icon" /> ASAHI SPIRIT & ADVANTAGE
          </span>
          <h2>Explore Japan & The <span className="gradient-text">ASAHI Advantage</span></h2>
          <div className="gradient-underline-sm" />
          <p>
            Language is the doorway to a new culture. Experience Japan's rich traditions, world-class education, and booming global career ecosystem with ASAHI Bilingual Services.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="japan-features-grid">
          <div className="japan-feature-card">
            <div className="feature-card-header">
              <div className="feature-icon-wrapper red">
                <FaGraduationCap />
              </div>
              <span className="feature-pill-badge">JLPT N5-N1 Practice</span>
            </div>
            <h3>JLPT Exam Mastery</h3>
            <p>
              Structured curriculum designed specifically to conquer N5 to N1 exams with authentic practice material, mock tests, and personalized feedback.
            </p>
          </div>

          <div className="japan-feature-card">
            <div className="feature-card-header">
              <div className="feature-icon-wrapper orange">
                <FaGlobeAsia />
              </div>
              <span className="feature-pill-badge">Tokyo & Osaka MNCs</span>
            </div>
            <h3>Japan Career & Study Pathways</h3>
            <p>
              Direct guidance for higher education, university admissions, IT job placements, and engineering career opportunities across Tokyo and Osaka.
            </p>
          </div>

          <div className="japan-feature-card">
            <div className="feature-card-header">
              <div className="feature-icon-wrapper purple">
                <FaAward />
              </div>
              <span className="feature-pill-badge">Certified Senseis</span>
            </div>
            <h3>Native Sensei Excellence</h3>
            <p>
              Learn authentic pronunciation, business etiquette, and cultural nuances directly from certified bilingual Japanese educators.
            </p>
          </div>
        </div>

        {/* Story Banner */}
        <div className="japan-story-banner">
          <div className="story-image-wrap">
            <img src={japanHeroImg} alt="Japan Culture & Fujichan" />
            <div className="story-floating-card">
              <FaAward className="gold-star" />
              <div>
                <strong>100% Focused Learning</strong>
                <span>Empowering 1000+ Japanese Learners</span>
              </div>
            </div>
          </div>

          <div className="story-content-wrap">
            <span className="story-sub-tag"><FaAward className="tag-inline-icon" /> Why ASAHI Japanese?</span>
            <h3>Your Gateway to <span className="gradient-text">Living, Studying & Working in Japan</span></h3>
            <p>
              At ASAHI Bilingual Services, we don't just teach grammar rules — we connect you to the heart of Japan. Whether you dream of strolling through Kyoto’s cherry blossoms, studying in Tokyo, or working in Japan's top tech firms, our <strong>Fujichan book series</strong> gives you the exact tools to achieve your goals.
            </p>

            <ul className="story-check-list">
              <li>
                <FaCheckCircle className="check-icon" /> 
                <span>Authentic Japanese dialogue formulas & Kanji stroke orders.</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" /> 
                <span>Cultural etiquette lessons included in every chapter.</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" /> 
                <span>Step-by-step guidance for visa, university, and employment.</span>
              </li>
            </ul>

            <div className="story-cta-btns">
              <button className="story-btn-primary" onClick={() => navigate("/enquiry")}>
                Enroll in Live Classes <FaArrowRight />
              </button>
              <button className="story-btn-secondary" onClick={() => navigate("/courses")}>
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BooksPage;
