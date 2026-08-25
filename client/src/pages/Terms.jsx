import React, { useEffect } from 'react';
import './Policies.css';
import {
  MdVerifiedUser,
  MdWarning,
  MdLightbulb,
  MdLocationOn,
  MdEmail,
  MdPhone,
  MdSchool,
  MdBusiness,
  MdTranslate,
  MdMenuBook,
  MdWork,
} from 'react-icons/md';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <span className="policy-badge">
            <MdVerifiedUser className="policy-badge-icon" /> ASAHI OFFICIAL TERMS
          </span>
          <h1>Terms & <span>Conditions</span></h1>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="policy-content">
          <p>
            Welcome to <strong>ASAHI Bilingual Services</strong> ("ASAHI", "Company", "we", "our", or "us"). By accessing or using our website, courses, materials, or services, you agree to be bound by these <span className="highlight-pill">Terms & Conditions</span>. If you do not agree with these Terms, please discontinue the use of our website immediately.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>By visiting or using our website, you confirm that:</p>
          <ul>
            <li><span>You are <strong>at least 18 years of age</strong> or accessing under the supervision of a parent or legal guardian.</span></li>
            <li><span>You agree to comply with these Terms and all applicable Indian and international laws.</span></li>
            <li><span>The information you provide during enrollment or book ordering is <strong>accurate and complete</strong>.</span></li>
          </ul>

          <h2>2. About ASAHI Services</h2>
          <p>ASAHI Bilingual Services provides professional Japanese language education and services, including:</p>
          <ul>
            <li><MdSchool className="policy-list-icon" /><span><strong>Japanese Language Courses:</strong> Comprehensive preparation for <span className="highlight-pill">JLPT N5 to N1</span> and NAT-TEST exams.</span></li>
            <li><MdBusiness className="policy-list-icon" /><span><strong>Corporate Training:</strong> Specialized bilingual training for Indian & Japanese MNCs.</span></li>
            <li><MdTranslate className="policy-list-icon" /><span><strong>Translation & Interpretation:</strong> Professional technical and business Japanese services.</span></li>
            <li><MdMenuBook className="policy-list-icon" /><span><strong>Study Material & Distribution:</strong> Physical JLPT prep workbooks and digital resources.</span></li>
            <li><MdWork className="policy-list-icon" /><span><strong>Career Guidance:</strong> Placement assistance for opportunities in Tokyo & Osaka.</span></li>
          </ul>

          <h2>3. Use of Website & Student Portals</h2>
          <div className="alert-note-box">
            <MdWarning className="alert-icon" />
            <span>Unfair usage, unauthorized distribution of course materials, or portal credentials sharing will result in immediate termination of access without refund.</span>
          </div>
          <p>You agree that you will <strong>not</strong>:</p>
          <ul>
            <li><span>Use the website or study materials for any unlawful or unauthorized activity.</span></li>
            <li><span>Attempt to breach security or gain unauthorized access to student portals.</span></li>
            <li><span>Copy, reproduce, or resell ASAHI proprietary study materials and books.</span></li>
          </ul>

          <h2>4. Intellectual Property Rights</h2>
          <p>All content on this platform—including <strong>Logos, Course Syllabi, Books, Video Lectures, and Branding</strong>—is the exclusive property of <strong>ASAHI Bilingual Services</strong> and protected under Copyright and Intellectual Property laws.</p>

          <h2>5. Course Enrollments & Book Purchases</h2>
          <ul>
            <li><span>Course enrollments and book orders are subject to <strong>seat availability and stock status</strong>.</span></li>
            <li><span>Course portal access is granted <strong>strictly to the registered learner</strong> and cannot be transferred.</span></li>
          </ul>

          <h2>6. Payments & Refund Policy</h2>
          <div className="alert-note-box">
            <MdLightbulb className="alert-icon" />
            <span><strong>Strict Refund Policy:</strong> Once a batch has commenced or a study material/book is dispatched, fees are strictly non-refundable.</span>
          </div>
          <ul>
            <li><span>All course fees and book charges must be paid in full prior to batch commencement or shipping.</span></li>
            <li><span>Payments are processed securely via encrypted gateway integration (Razorpay).</span></li>
          </ul>

          <h2>7. Limitation of Liability</h2>
          <p>While ASAHI provides world-class guidance and certified native sensei coaching, passing scores for JLPT/NAT exams depend on individual student dedication and study hours. Our total liability is limited to the amount paid for the specific course or item.</p>

          <h2>8. Contact & Legal Enquiries</h2>
          <p>For official questions regarding these Terms & Conditions, please reach out to our administration team:</p>
          <div className="policy-contact-block">
            <strong className="policy-contact-title">ASAHI Bilingual Services</strong>
            <div className="policy-contact-row"><MdLocationOn className="policy-contact-icon" /><span><strong>Location:</strong> Sankranti Apartment, Near Wateshwar Hanuman Mandir, Reshimbagh, Nagpur, Maharashtra, India</span></div>
            <div className="policy-contact-row"><MdEmail className="policy-contact-icon" /><span><strong>Email:</strong> absindia20@gmail.com</span></div>
            <div className="policy-contact-row"><MdPhone className="policy-contact-icon" /><span><strong>Hotline:</strong> +91-8698888336</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
