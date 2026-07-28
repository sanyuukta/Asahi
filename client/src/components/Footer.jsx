import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa"
import { Link } from "react-router-dom"
import "./Footer.css"

function Footer(){

  return(

    <footer className="footer">

      <div className="footer-container">

        {/* BRAND & SOCIALS */}
        <div className="footer-brand">
          <h2>ASAHI</h2>
          <p>
            Learn Japanese language with expert guidance.  
            Prepare for JLPT exams and explore Japanese culture
            with our structured courses and learning material.
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com/asahigs" target="_blank" rel="noopener noreferrer"><FaFacebook/></a>
            <a href="https://www.instagram.com/asahigs/?hl=en" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/enquiry">Enquiry</Link></li>
          </ul>
        </div>

        {/* JAPANESE LEVELS */}
        <div className="footer-links">
          <h3>Japanese Levels</h3>
          <ul>
            <li><Link to="/courses">JLPT N5</Link></li>
            <li><Link to="/courses">JLPT N4</Link></li>
            <li><Link to="/courses">JLPT N3</Link></li>
            <li><Link to="/courses">JLPT N2</Link></li>
            <li><Link to="/courses">JLPT N1</Link></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-contact" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h3>Contact Us</h3>
          <p style={{ display: "inline-flex", alignItems: "center", gap: "12px", margin: "0 0 12px 0" }}>
            <FaMapMarkerAlt className="contact-icon" style={{ flexShrink: 0 }} />
            <span>Nagpur, Maharashtra, India</span>
          </p>
          <p style={{ display: "inline-flex", alignItems: "center", gap: "12px", margin: "0 0 12px 0" }}>
            <FaPhone className="contact-icon" style={{ flexShrink: 0 }} />
            <span>+91 9876543210</span>
          </p>
          <p style={{ display: "inline-flex", alignItems: "center", gap: "12px", margin: "0 0 12px 0" }}>
            <FaEnvelope className="contact-icon" style={{ flexShrink: 0 }} />
            <span>asahi.learning@gmail.com</span>
          </p>
        </div>

        {/* MAP LOCATION (REPLACED NEWSLETTER) */}
        <div className="footer-map">
          <h3>Our Location</h3>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41701349386!2d79.00246944964645!3d21.14936343513364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf11%3A0x39be5b9ca10543e3!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="150" 
              style={{ border: 0, display: "block" }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="ASAHI Location Map"
            ></iframe>
          </div>
        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ASAHI Japanese Learning. All rights reserved.
        </p>
        <div className="footer-policy">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
          <a href="#">Refund Policy</a>
        </div>
      </div>

    </footer>

  )

}

export default Footer