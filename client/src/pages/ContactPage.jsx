import { useState } from "react";
import { 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, 
  FaFacebookMessenger, FaGlobeAsia, FaPaperPlane 
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactPage.css";

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! Your message has been sent successfully.");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="contact-page-wrapper">
      <ToastContainer position="top-right" autoClose={3500} theme="colored" />

      {/* 1. HERO BANNER */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="contact-tag">Get In Touch</span>
          <h1>Contact <span>ASAHI</span></h1>
          <p>
            Have queries about our courses, translation services, or corporate training? Send us a message and our team will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT SECTION */}
      <section className="contact-split-section">
        <div className="contact-container">
          <div className="contact-grid">
            
            {/* LEFT COLUMN: INFO & MAP */}
            <div className="contact-info-col">
              <h2>Connect With Us</h2>
              <p className="subtitle">
                Visit our campus or reach out via phone or email. We are always ready to assist you.
              </p>

              <div className="info-cards-list">
                <div className="info-card">
                  <div className="info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="info-details">
                    <h3>Our Address</h3>
                    <p>Nagpur, Maharashtra, India</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaPhoneAlt />
                  </div>
                  <div className="info-details">
                    <h3>Call Us</h3>
                    <p>+91 9876543210</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-details">
                    <h3>Email Address</h3>
                    <p>asahi.learning@gmail.com</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <div className="info-details">
                    <h3>Office Hours</h3>
                    <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* MAP EMBED */}
              <div className="contact-map-wrapper">
                <h3>Our Location</h3>
                <div className="map-iframe-container">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41701349386!2d79.00246944964645!3d21.14936343513364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf11%3A0x39be5b9ca10543e3!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="200" 
                    style={{ border: 0, display: "block" }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ASAHI Office Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM */}
            <div className="contact-form-col">
              <div className="form-card-header">
                <h2>Send Us A Message</h2>
                <p>Fill out the form below and we will contact you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="premium-contact-form">
                <div className="input-group-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="e.g. John Doe"
                      value={form.name} 
                      onChange={handleChange} 
                      required 
                    />
                    <span className="focus-line"></span>
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="e.g. john@example.com"
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                    />
                    <span className="focus-line"></span>
                  </div>
                </div>

                <div className="input-group-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="e.g. +91 99999 88888"
                      value={form.phone} 
                      onChange={handleChange} 
                    />
                    <span className="focus-line"></span>
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      placeholder="How can we help?"
                      value={form.subject} 
                      onChange={handleChange} 
                    />
                    <span className="focus-line"></span>
                  </div>
                </div>

                <div className="form-group msg-group">
                  <label>Message *</label>
                  <textarea 
                    name="message" 
                    rows="5"
                    placeholder="Write your details here..."
                    value={form.message} 
                    onChange={handleChange} 
                    required
                  ></textarea>
                  <span className="focus-line"></span>
                </div>

                <button type="submit" className="submit-form-btn" disabled={loading}>
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
