import React, { useEffect } from 'react';
import './Policies.css';
import {
  MdSecurity,
  MdLockOutline,
  MdPerson,
  MdEmail,
  MdLocationOn,
  MdDataUsage,
  MdPayment,
  MdLocalShipping,
  MdPhone,
} from 'react-icons/md';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <span className="policy-badge">
            <MdSecurity className="policy-badge-icon" /> DATA PROTECTION & PRIVACY
          </span>
          <h1>Privacy <span>Policy</span></h1>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="policy-content">
          <p>
            At <strong>ASAHI Bilingual Services</strong> ("ASAHI," "we," "our," or "us"), your privacy is paramount. This <span className="highlight-pill">Privacy Policy</span> explains how we collect, use, store, disclose, and safeguard your personal information when you visit our website, enroll in courses, or use our educational services.
          </p>

          <h2>1. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>You may voluntarily provide us with details such as:</p>
          <ul>
            <li><MdPerson className="policy-list-icon" /><span><strong>Full Name & Contact Details</strong></span></li>
            <li><MdEmail className="policy-list-icon" /><span><strong>Email Address & WhatsApp Phone Number</strong></span></li>
            <li><MdLocationOn className="policy-list-icon" /><span><strong>Shipping Address</strong> (for physical study material and book deliveries)</span></li>
            <li><MdDataUsage className="policy-list-icon" /><span><strong>Educational & Professional Background</strong></span></li>
            <li><MdPayment className="policy-list-icon" /><span><strong>Encrypted Billing Data</strong> (processed securely via Razorpay)</span></li>
          </ul>

          <h2>2. How We Use Your Data</h2>
          <div className="alert-note-box">
            <MdLockOutline className="alert-icon" />
            <span><strong>Data Assurance:</strong> ASAHI never sells, rents, or trades your personal information to third-party marketing agencies.</span>
          </div>
          <p>We use your information exclusively to:</p>
          <ul>
            <li><span>Process course enrollments and book orders efficiently.</span></li>
            <li><span>Deliver JLPT study materials and grant portal access.</span></li>
            <li><span>Send batch schedule notifications, mock test reports, and exam updates.</span></li>
            <li><span>Provide end-to-end career guidance and visa assistance.</span></li>
          </ul>

          <h2>3. Data Protection & Security</h2>
          <p>We implement industry-standard <strong>SSL encryption, secure cloud infrastructure, and administrative controls</strong> to prevent unauthorized access, alteration, or disclosure of your personal data.</p>

          <h2>4. Third-Party Integrations</h2>
          <p>We collaborate only with vetted trusted partners:</p>
          <ul>
            <li><MdPayment className="policy-list-icon" /><span><strong>Razorpay Gateway:</strong> For 256-bit encrypted secure online payments.</span></li>
            <li><MdLocalShipping className="policy-list-icon" /><span><strong>Couriers & Logistics:</strong> To deliver physical books to your doorstep.</span></li>
          </ul>

          <h2>5. Contact Data Privacy Officer</h2>
          <p>If you have any questions regarding your privacy rights or wish to request data updates, please contact our data officer:</p>
          <div className="policy-contact-block">
            <strong className="policy-contact-title">ASAHI Bilingual Services</strong>
            <div className="policy-contact-row"><MdLocationOn className="policy-contact-icon" /><span><strong>Location:</strong> Nagpur, Maharashtra, India</span></div>
            <div className="policy-contact-row"><MdEmail className="policy-contact-icon" /><span><strong>Email:</strong> asahi.learning@gmail.com</span></div>
            <div className="policy-contact-row"><MdPhone className="policy-contact-icon" /><span><strong>Hotline:</strong> +91-8698888336</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
