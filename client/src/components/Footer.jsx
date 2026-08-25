import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
  FaExternalLinkAlt,
  FaChevronRight,
  FaAward
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/asahilogo.jpeg";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    const msg = "Konnichiwa ASAHI! I want to inquire about Japanese Language courses and enrollment.";
    window.open(`https://api.whatsapp.com/send?phone=918698888336&text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <footer className="footer-luxury-root">
      {/* BACKGROUND AMBIENT GLOWS & KANJI BACKDROP */}
      <div className="footer-glow-overlay" />
      <span className="footer-kanji-watermark">日本語学校</span>

      <div className="footer-main-wrapper">
        {/* MAIN 4-COLUMN FOOTER GRID */}
        <div className="footer-columns-grid">
          
          {/* BRAND COLUMN */}
          <div className="footer-col-brand">
            <div className="footer-logo-header" onClick={() => navigate("/")}>
              <img src={logo} alt="ASAHI Logo" />
              <div>
                <h2>ASAHI</h2>
                <span>Bilingual Services</span>
              </div>
            </div>

            <p className="brand-description">
              Empowering students and professionals with world-class Japanese language education, JLPT/NAT certification, cultural immersion, and career placement pipelines across Tokyo & Osaka.
            </p>

            <div className="footer-socials-strip">
              <a href="https://www.facebook.com/asahigs" target="_blank" rel="noopener noreferrer" title="Facebook">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/asahigs/?hl=en" target="_blank" rel="noopener noreferrer" title="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
                <FaYoutube />
              </a>
              <a href="#" onClick={handleWhatsApp} title="WhatsApp Direct Chat">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li><Link to="/"><FaChevronRight className="nav-arrow" /> Home</Link></li>
              <li><Link to="/about"><FaChevronRight className="nav-arrow" /> About Us</Link></li>
              <li><Link to="/books"><FaChevronRight className="nav-arrow" /> Fujichan Books</Link></li>
              <li><Link to="/courses"><FaChevronRight className="nav-arrow" /> Japanese Courses</Link></li>
              <li><Link to="/services"><FaChevronRight className="nav-arrow" /> Career Services</Link></li>
              <li><Link to="/enquiry"><FaChevronRight className="nav-arrow" /> Enrollment Form</Link></li>
            </ul>
          </div>

          {/* JAPANESE CURRICULA */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">JLPT & NAT Courses</h4>
            <ul className="footer-nav-list">
              <li><Link to="/courses"><FaChevronRight className="nav-arrow" /> JLPT N5 (Foundation)</Link></li>
              <li><Link to="/courses"><FaChevronRight className="nav-arrow" /> JLPT N4 (Elementary)</Link></li>
              <li><Link to="/courses"><FaChevronRight className="nav-arrow" /> JLPT N3 (Intermediate)</Link></li>
              <li><Link to="/courses"><FaChevronRight className="nav-arrow" /> JLPT N2 (Business Level)</Link></li>
              <li><Link to="/courses"><FaChevronRight className="nav-arrow" /> JLPT N1 (Native Mastery)</Link></li>
              <li><Link to="/courses"><FaChevronRight className="nav-arrow" /> NAT-TEST Prep Series</Link></li>
            </ul>
          </div>

          {/* CONTACT & MAP COLUMN */}
          <div className="footer-col-contact">
            <h4 className="footer-col-title">Contact & Location</h4>

            <div className="contact-items-stack">
              <div className="c-item">
                <div className="c-icon-wrap"><FaMapMarkerAlt /></div>
                <div>
                  <strong>Nagpur Campus</strong>
                  <span>Sankranti Apartment, Near Wateshwar Hanuman Mandir, Reshimbagh, Nagpur, Maharashtra, India</span>
                </div>
              </div>

              <div className="c-item">
                <div className="c-icon-wrap"><FaPhone /></div>
                <div>
                  <strong>Phone Support</strong>
                  <span>+91 86988 88336</span>
                </div>
              </div>

              <div className="c-item">
                <div className="c-icon-wrap"><FaEnvelope /></div>
                <div>
                  <strong>Email Support</strong>
                  <span>absindia20@gmail.com</span>
                </div>
              </div>

              <div className="c-item">
                <div className="c-icon-wrap"><FaClock /></div>
                <div>
                  <strong>Office Hours</strong>
                  <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* MAP CONTAINER CARD */}
            <div className="footer-map-card">
              <div className="map-top-bar">
                <span className="live-dot" />
                <span>ASAHI Nagpur Campus</span>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=wateshwar+hanuman+mandir+reshimbagh+nagpur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-dir-link"
                >
                  Directions <FaExternalLinkAlt />
                </a>
              </div>
              <iframe 
                src="https://www.google.com/maps?q=wateshwar+hanuman+mandir+reshimbagh+nagpur&output=embed" 
                width="100%" 
                height="120" 
                style={{ border: 0, display: "block" }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="ASAHI Location Map"
              ></iframe>
            </div>
          </div>

        </div>

        {/* 3. FOOTER BOTTOM LEGAL & COPYRIGHT BAR */}
        <div className="footer-bottom-bar">
          <div className="copy-text">
            <p>© {new Date().getFullYear()} <strong>ASAHI Bilingual Services</strong>. All Rights Reserved.</p>
            <span className="craft-caption">Crafted for Japanese Language Excellence & Global Placements.</span>
          </div>

          <div className="legal-links-row">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="divider">•</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="divider">•</span>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/terms"); }}>Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;