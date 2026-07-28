import { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes, FaGraduationCap, FaComments, FaHandshake } from "react-icons/fa";
import fujichan1 from "../assets/fujichan1.png";
import fujichan2 from "../assets/fujichan2.png";
import fujichan3 from "../assets/fujichan-3.png";
import "./WhatsAppWidget.css";

function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-hide the 'Chat with us!' tooltip after 5 seconds on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // User provided target number +91 77965 30192
  const adminPhone = "917796530192";

  const topics = [
    {
      id: "jlpt",
      title: "JLPT & NAT Courses",
      subtitle: "Enquire about prep batches",
      icon: <FaGraduationCap />,
      message: "Hello ASAHI! I am interested in preparing for JLPT/NAT. Could you please share batch details and fee structure?"
    },
    {
      id: "services",
      title: "Explore Bilingual Services",
      subtitle: "SSW, Placements, & Translation",
      icon: <FaComments />,
      message: "Hello ASAHI! I would like to explore your Bilingual Services (SSW / Placements / Translation). Please share more details."
    },
    {
      id: "tieup",
      title: "Corporate & College Tie-Up",
      subtitle: "Bilingual recruitment partnership",
      icon: <FaHandshake />,
      message: "Hello ASAHI! I am looking for corporate tie-ups or institutional collaborations. Let's connect."
    },
    {
      id: "book1",
      title: "Fujichan 1 (Book)",
      subtitle: "Comprehensive N5-N4 Textbook",
      image: fujichan1,
      message: "Hello ASAHI! I would like to purchase the *Fujichan 1 (JLPT N5-N4)* textbook. Please share payment and shipping details.\n\nBook Image: "
    },
    {
      id: "book2",
      title: "Fujichan 2 (Book)",
      subtitle: "Intermediate N3 Textbook",
      image: fujichan2,
      message: "Hello ASAHI! I would like to purchase the *Fujichan 2 (JLPT N3)* textbook. Please share payment and shipping details.\n\nBook Image: "
    },
    {
      id: "book3",
      title: "Fujichan 3 (Book)",
      subtitle: "Advanced N2-N1 Textbook",
      image: fujichan3,
      message: "Hello ASAHI! I would like to purchase the *Fujichan 3 (JLPT N2-N1)* textbook. Please share payment and shipping details.\n\nBook Image: "
    }
  ];

  const handleTopicClick = (topic) => {
    let finalMessage = topic.message;
    if (topic.id.startsWith("book")) {
      // Dynamic absolute URL so WhatsApp displays an automatic link preview
      const fullUrl = window.location.origin + topic.image;
      finalMessage += fullUrl;
    }
    const encoded = encodeURIComponent(finalMessage);
    window.open(`https://wa.me/${adminPhone}?text=${encoded}`, "_blank");
  };

  const handleGeneralEnquiry = () => {
    const message = "Hello ASAHI! I have a general enquiry. Please connect me with an advisor.";
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${adminPhone}?text=${encoded}`, "_blank");
  };

  return (
    <div className="whatsapp-widget-wrapper">
      {/* Floating Tooltip */}
      {showTooltip && !isOpen && (
        <div className="whatsapp-tooltip">
          <span>Chat with us!</span>
          <button 
            className="tooltip-close" 
            onClick={(e) => { 
              e.stopPropagation(); 
              setShowTooltip(false); 
            }}
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button 
        className={`whatsapp-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <FaTimes /> : <FaWhatsapp />}
      </button>

      {/* Slide-up Card Container */}
      {isOpen && (
        <div className="whatsapp-card animate-slide-up">
          {/* Header */}
          <div className="whatsapp-card-header">
            <div className="header-logo-row">
              <FaWhatsapp className="header-wa-icon" />
              <div>
                <h4>Chat with us on WhatsApp</h4>
                <p>Choose a topic to start the conversation</p>
              </div>
            </div>
          </div>

          {/* Topics List */}
          <div className="whatsapp-topics-list">
            {topics.map((t) => (
              <button 
                key={t.id} 
                className="whatsapp-topic-item"
                onClick={() => handleTopicClick(t)}
              >
                {t.image ? (
                  <img src={t.image} alt={t.title} className="topic-thumbnail" />
                ) : (
                  <div className="topic-icon-wrapper">
                    {t.icon}
                  </div>
                )}
                <div className="topic-text">
                  <h5>{t.title}</h5>
                  <p>{t.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          {/* General Enquiry Button */}
          <div className="whatsapp-card-footer">
            <button className="general-enquiry-btn" onClick={handleGeneralEnquiry}>
              <FaWhatsapp className="btn-wa-icon" />
              <span>General Enquiry</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WhatsAppWidget;
