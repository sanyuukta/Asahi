import { useState, useEffect } from "react";
import { 
  FaWhatsapp, 
  FaTimes, 
  FaGraduationCap, 
  FaComments, 
  FaHandshake, 
  FaPaperPlane,
  FaBookOpen,
  FaAward,
  FaBriefcase
} from "react-icons/fa";
import fujichan1 from "../assets/fujichan1.png";
import fujichan2 from "../assets/fujichan2.png";
import fujichan3 from "../assets/fujichan-3.png";
import asahiLogo from "../assets/asahilogo.jpeg";
import "./WhatsAppWidget.css";

function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [customMessage, setCustomMessage] = useState("");

  // Auto-hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Target WhatsApp phone number (+91 77965 30192)
  const adminPhone = "917796530192";

  const topics = [
    {
      id: "n5_course",
      title: "JLPT N5 / Q5 Beginner Course",
      subtitle: "Basic Foundation & Vocabulary (3 Months)",
      icon: <FaGraduationCap />,
      message: `Kon'nichiwa ASAHI Advisory Team! 🌸\n\nI am interested in enrolling for the *JLPT N5 / Q5 Beginner Course*.\n\n📌 Requested Details:\n• Next Upcoming N5 Batch Dates & Timings\n• Fee Structure & Payment Modes\n• Hiragana, Katakana & 100 Kanji Worksheets\n\nPlease connect me with Sensei to confirm my enrollment. Arigatou gozaimasu! 🙏`
    },
    {
      id: "n4_course",
      title: "JLPT N4 / Q4 Pre-Intermediate",
      subtitle: "Grammar & Listening Mastery (4 Months)",
      icon: <FaGraduationCap />,
      message: `Kon'nichiwa ASAHI Advisory Team! 🌸\n\nI am interested in enrolling for the *JLPT N4 / Q4 Course*.\n\n📌 Requested Details:\n• N4 Batch Schedules & Live Class Timings\n• Fee Details & Exam Mock Test Series\n• 300 Kanji & Vocabulary Prep\n\nPlease share the enrollment procedure. Arigatou! 🙏`
    },
    {
      id: "n3_course",
      title: "JLPT N3 / Q3 Intermediate Course",
      subtitle: "Natural Speed Conversation & 650 Kanji",
      icon: <FaGraduationCap />,
      message: `Kon'nichiwa ASAHI Advisory Team! 🌸\n\nI want to enroll in the *JLPT N3 / Q3 Intermediate Course*.\n\n📌 Requested Details:\n• N3 Live Batch Timings & Instructor Info\n• Course Fee Structure & Mock Assessment Series\n• Pitch Accent Audio Dialogues\n\nLooking forward to joining. Arigatou gozaimasu! 🙏`
    },
    {
      id: "n2_course",
      title: "JLPT N2 / Q2 Business Level",
      subtitle: "Advanced Corporate Japanese & Placements",
      icon: <FaBriefcase />,
      message: `Kon'nichiwa ASAHI Advisory Team! 💼\n\nI am aiming for *JLPT N2 / Q2 Business Level Certification* and direct career opportunities in Japan.\n\n📌 Requested Details:\n• N2 Advanced Batch Timings & Curriculum\n• Tokyo & Osaka Corporate Placement Support\n• Keigo Speech & Business Interview Prep\n\nKindly guide me through the registration. Arigatou! 🎌`
    },
    {
      id: "n1_course",
      title: "JLPT N1 / Q1 Native Mastery",
      subtitle: "Highest Japanese Proficiency Level",
      icon: <FaAward />,
      message: `Kon'nichiwa ASAHI Senior Advisory Team! ⛩️\n\nI am interested in the *JLPT N1 / Q1 Native Level Course*.\n\n📌 Requested Details:\n• N1 Special Mentorship Batch Timings\n• Advanced 2,000 Kanji & Academic Literature\n• University & Executive Career Pipelines\n\nPlease connect me with Head Sensei. Arigatou gozaimasu! 🙏`
    },
    {
      id: "services",
      title: "Japan Careers & SSW Visas",
      subtitle: "Tokyo & Osaka Direct Placement",
      icon: <FaComments />,
      message: `Kon'nichiwa ASAHI Career Advisory Team! 💼\n\nI would like to explore ASAHI's Bilingual Recruitment & SSW Placement Services in Japan.\n\n📌 My Areas of Interest:\n• Direct Placement in Tokyo / Osaka (IT & Engineering)\n• SSW Visa Guidance & Interview Coaching\n• Japanese Resume Formatting & Keigo Mock Interviews\n\nKindly share the enrollment process and career consultation details. Arigatou! 🎌`
    },
    {
      id: "tieup",
      title: "Corporate & School Tie-Ups",
      subtitle: "Institutional & Academic Partnerships",
      icon: <FaHandshake />,
      message: `Kon'nichiwa ASAHI Management! 🤝\n\nI am reaching out regarding an Institutional Tie-up & Academic Collaboration with ASAHI Bilingual Services.\n\n📌 Collaboration Scope:\n• School / College Japanese Language Programs (60+ Partnered Institutions)\n• Corporate Japanese Training for Employees\n• Student Exchange & Visa Pipeline\n\nLooking forward to discussing a partnership. Best regards!`
    },
    {
      id: "book1",
      title: "Fujichan 1 (Book)",
      subtitle: "Comprehensive N5-N4 Textbook",
      image: fujichan1,
      message: `Kon'nichiwa ASAHI Publishing! 📚\n\nI wish to order the *Fujichan 1 (JLPT N5-N4)* official Japanese textbook.\n\n📌 Item Details:\n• Book Title: Fujichan 1 (Comprehensive N5-N4)\n• Includes: Native Audio Exercises & Kanji Worksheets\n\nPlease share the payment link and doorstep delivery timeline. Arigatou! 🌸\n\nBook Reference: `
    },
    {
      id: "book2",
      title: "Fujichan 2 (Book)",
      subtitle: "Intermediate N3 Textbook",
      image: fujichan2,
      message: `Kon'nichiwa ASAHI Publishing! 📚\n\nI wish to order the *Fujichan 2 (JLPT N3)* official Japanese textbook.\n\n📌 Item Details:\n• Book Title: Fujichan 2 (Intermediate N3)\n• Includes: Native Audio Exercises & Kanji Worksheets\n\nPlease share the payment link and doorstep delivery timeline. Arigatou! 🌸\n\nBook Reference: `
    },
    {
      id: "book3",
      title: "Fujichan 3 (Book)",
      subtitle: "Advanced N2-N1 Textbook",
      image: fujichan3,
      message: `Kon'nichiwa ASAHI Publishing! 📚\n\nI wish to order the *Fujichan 3 (JLPT N2-N1)* official Japanese textbook.\n\n📌 Item Details:\n• Book Title: Fujichan 3 (Advanced N2-N1)\n• Includes: Native Audio Exercises & Kanji Worksheets\n\nPlease share the payment link and doorstep delivery timeline. Arigatou! 🌸\n\nBook Reference: `
    }
  ];

  const handleTopicClick = (topic) => {
    let finalMessage = topic.message;
    if (topic.id.startsWith("book")) {
      const fullUrl = window.location.origin + topic.image;
      finalMessage += fullUrl;
    }
    const encoded = encodeURIComponent(finalMessage);
    window.open(`https://api.whatsapp.com/send?phone=${adminPhone}&text=${encoded}`, "_blank");
  };

  const handleSendCustomMessage = (e) => {
    e.preventDefault();
    if (!customMessage.trim()) {
      const defaultMsg = `Kon'nichiwa ASAHI Team! 🌸\n\nI have a general enquiry regarding Japanese language courses and career pathways. Please connect me with an advisor.\n\nArigatou gozaimasu! 🙏`;
      window.open(`https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(defaultMsg)}`, "_blank");
      return;
    }

    const formattedCustom = `Kon'nichiwa ASAHI Advisory Team! 🌸\n\n${customMessage.trim()}\n\nKindly assist me at your earliest convenience. Arigatou gozaimasu! 🙏`;
    window.open(`https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(formattedCustom)}`, "_blank");
    setCustomMessage("");
  };

  return (
    <div className="whatsapp-widget-wrapper">
      {/* Floating Tooltip */}
      {showTooltip && !isOpen && (
        <div className="whatsapp-tooltip">
          <span>🌸 Chat with ASAHI Support</span>
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
              <div className="header-avatar-container">
                <img src={asahiLogo} alt="ASAHI Logo" className="header-avatar-img" />
                <span className="online-indicator-dot"></span>
              </div>
              <div className="header-title-details">
                <h4>ASAHI Bilingual Services</h4>
                <p>🟢 Online • Replies in &lt; 5 mins</p>
              </div>
            </div>
          </div>

          {/* Sub Header Tag */}
          <div className="whatsapp-sub-banner">
            <span>Select a course or type your query below:</span>
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

          {/* Custom Message Direct Input Footer */}
          <form className="whatsapp-card-footer" onSubmit={handleSendCustomMessage}>
            <input
              type="text"
              className="whatsapp-input-field"
              placeholder="Write your custom query..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
            />
            <button type="submit" className="whatsapp-send-btn" title="Send on WhatsApp">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default WhatsAppWidget;
