import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaWhatsapp, 
  FaBookOpen, 
  FaEye, 
  FaChevronLeft, 
  FaChevronRight 
} from "react-icons/fa";
import { FUJICHAN_BOOKS, WHATSAPP_NUMBER } from "../utils/booksData";
import "./BooksPreview.css";

function BooksPreview() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev === FUJICHAN_BOOKS.length - 1 ? 0 : prev + 1));
    setAnimKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? FUJICHAN_BOOKS.length - 1 : prev - 1));
    setAnimKey((prev) => prev + 1);
  };

  const handleWhatsApp = (book) => {
    const message = book.waMessage || `Hello ASAHI! I want to buy ${book.name} book. Please share price and delivery details.`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleViewDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <section className="books-preview-section">
      <div className="books-preview-container">
        {/* Section Header */}
        <header className="books-preview-header">
          <span className="books-top-badge">
            <FaBookOpen /> ASAHI Official Library
          </span>
          <h2 className="books-preview-title">
            Fujichan <span className="gradient-text">Learning Books</span>
          </h2>
          <div className="gradient-underline" />
          <p className="books-preview-subtitle">
            Master the Japanese language effortlessly with our specially designed <strong>Fujichan 1, Fujichan 2, and Fujichan 3</strong> textbook series — crafted by expert Senseis for JLPT excellence.
          </p>
        </header>

        {/* DESKTOP GRID (3 Cards) */}
        <div className="books-horizontal-grid desktop-books-grid">
          {FUJICHAN_BOOKS.map((book) => (
            <article className="book-card-item" key={book.id}>
              <div className="book-card-badge">{book.levelBadge}</div>
              
              <div className="book-image-container">
                <img src={book.imageUrl} alt={book.name} loading="lazy" />
                <div className="book-image-overlay">
                  <span className="overlay-tag">{book.subtitle}</span>
                </div>
              </div>

              <div className="book-card-body">
                <h3 className="book-title">{book.name}</h3>
                <p className="book-description">{book.description}</p>
                
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
                    onClick={() => handleViewDetails(book.id)}
                    title="View Book Details"
                  >
                    <FaEye className="btn-icon" /> View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* MOBILE & TABLET ANIMATED SLIDER CAROUSEL WITH LEFT/RIGHT ARROWS */}
        <div className="mobile-books-slider-wrapper">
          <button 
            className="slider-arrow-btn left-arrow" 
            onClick={handlePrev} 
            aria-label="Previous Book"
          >
            <FaChevronLeft />
          </button>

          <div className="slider-card-stage">
            {FUJICHAN_BOOKS.map((book, index) => {
              if (index !== activeIdx) return null;
              return (
                <article className="book-card-item slide-anim-card" key={`${book.id}-${animKey}`}>
                  <div className="book-card-badge">{book.levelBadge}</div>
                  
                  <div className="book-image-container">
                    <img src={book.imageUrl} alt={book.name} />
                    <div className="book-image-overlay">
                      <span className="overlay-tag">{book.subtitle}</span>
                    </div>
                  </div>

                  <div className="book-card-body">
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
                        onClick={() => handleViewDetails(book.id)}
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

        {/* Slider Pagination Dots & Step Indicator */}
        <div className="slider-controls-footer">
          <div className="slider-dots">
            {FUJICHAN_BOOKS.map((_, i) => (
              <span 
                key={i} 
                className={`dot-item ${i === activeIdx ? "active" : ""}`} 
                onClick={() => { setActiveIdx(i); setAnimKey((k) => k + 1); }}
              />
            ))}
          </div>
          <span className="slider-step-tag">
            Fujichan {activeIdx + 1} of {FUJICHAN_BOOKS.length}
          </span>
        </div>
      </div>
    </section>
  );
}

export default BooksPreview;
