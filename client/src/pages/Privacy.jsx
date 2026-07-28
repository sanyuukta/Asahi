import React from 'react';
import './Policies.css';

const Privacy = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>Privacy <span>Policy</span></h1>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="policy-content">
          <p>
            At ASAHI Bilingual Services ("ASAHI," "we," "our," or "us"), your privacy is important to us. This Privacy Policy explains how we collect, use, store, disclose, and protect your personal information when you visit our website, interact with our platforms, or use our educational services.
          </p>
          <p>By accessing or using our website, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>

          <h2>1. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>You may voluntarily provide us with information such as:</p>
          <ul>
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Shipping Address (for book deliveries)</li>
            <li>Current Educational/Professional Status</li>
            <li>Billing and Payment Information (where applicable)</li>
            <li>Any information submitted through contact forms, enrollment requests, or demo bookings.</li>
          </ul>

          <h3>Technical Information</h3>
          <p>When you visit our website, certain information may be collected automatically, including:</p>
          <ul>
            <li>IP Address</li>
            <li>Browser Type and Version</li>
            <li>Device Information</li>
            <li>Pages Visited and Date/Time of Access</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process course enrollments and book orders.</li>
            <li>Respond to inquiries, demo bookings, and support requests.</li>
            <li>Deliver study materials and provide access to student portals.</li>
            <li>Process payments and invoices securely.</li>
            <li>Send important updates regarding batch schedules, exams, or orders.</li>
            <li>Share educational newsletters or promotional communications (where permitted).</li>
            <li>Maintain website security and prevent fraud.</li>
          </ul>

          <h2>3. Sharing of Information</h2>
          <p>We value your trust and do not sell, rent, or trade your personal information. We may share information only when necessary with:</p>
          <ul>
            <li>Delivery and courier partners (for book shipping).</li>
            <li>Payment processing partners (e.g., Razorpay) for secure transactions.</li>
            <li>Cloud hosting and communication service providers.</li>
            <li>Government authorities when required by applicable law.</li>
          </ul>
          <p>All third-party service providers are expected to maintain appropriate confidentiality and security standards.</p>

          <h2>4. Data Security</h2>
          <p>We implement commercially reasonable administrative, technical, and organizational measures to protect your information against unauthorized access, alteration, disclosure, misuse, or destruction. While we strive to use industry-standard security practices, no method of electronic transmission or storage can be guaranteed to be completely secure.</p>

          <h2>5. Data Retention</h2>
          <p>We retain personal information only for as long as necessary to deliver requested educational services, fulfill contractual obligations, meet legal requirements, or resolve disputes. When information is no longer required, it is securely deleted or anonymized where appropriate.</p>

          <h2>6. Your Rights</h2>
          <p>Depending on applicable laws, you may have the right to:</p>
          <ul>
            <li>Access your personal information.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your personal data.</li>
            <li>Withdraw previously provided consent.</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the details provided below.</p>

          <h2>7. Children's Privacy</h2>
          <p>Our website and courses are open to students of various ages, but registrations and payments must be handled by individuals who are at least 18 years of age. We do not knowingly collect personal information directly from children under 13 without parental consent.</p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy periodically to reflect changes in our services, business practices, or legal obligations. Any updates will be published on this page with the revised Last Updated date.</p>

          <h2>9. Contact Us</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or the way your personal information is handled, please contact us.</p>
          <div className="contact-info-block">
            <strong>ASAHI Bilingual Services</strong><br />
            Email: asahi.learning@gmail.com<br />
            Phone: +91-9876543210<br />
            Location: Nagpur, Maharashtra, India
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
