import React from 'react';
import './Policies.css';

const Terms = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>Terms & <span>Conditions</span></h1>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="policy-content">
          <p>
            Welcome to ASAHI Bilingual Services ("ASAHI", "Company", "we", "our", or "us"). By accessing or using our website, courses, materials, or services, you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree with these Terms, please discontinue the use of our website immediately.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>By visiting or using our website, you confirm that:</p>
          <ul>
            <li>You are at least 18 years of age or accessing the website under the supervision of a parent or legal guardian.</li>
            <li>You agree to comply with these Terms and all applicable laws and regulations.</li>
            <li>The information you provide to us is accurate and complete.</li>
          </ul>

          <h2>2. About ASAHI</h2>
          <p>ASAHI Bilingual Services provides professional Japanese language education and services, including but not limited to:</p>
          <ul>
            <li>Japanese Language Courses (JLPT N5 to N1)</li>
            <li>Bilingual Corporate Training</li>
            <li>Translation & Interpretation Services</li>
            <li>Study Material & Books Distribution</li>
            <li>Career & Cultural Consultation</li>
          </ul>
          <p>Information displayed on this website is intended for general informational purposes only and may be updated without prior notice.</p>

          <h2>3. Use of Website</h2>
          <p>You agree that you will not:</p>
          <ul>
            <li>Use the website for any unlawful activity.</li>
            <li>Attempt to gain unauthorized access to our student portals or systems.</li>
            <li>Upload viruses or malicious software.</li>
            <li>Copy, reproduce, or distribute website content or paid study materials without permission.</li>
            <li>Interfere with website security or functionality.</li>
          </ul>
          <p>Any misuse may result in suspension of access and legal action.</p>

          <h2>4. Intellectual Property</h2>
          <p>Unless otherwise stated, all content on this website including Logos, Graphics, Images, Videos, Course Structures, Text, Study Documents, and Branding is the exclusive property of ASAHI Bilingual Services and is protected under applicable intellectual property laws.</p>
          <p>No material, especially paid course content and books, may be copied, modified, republished, sold, or distributed without our written permission.</p>

          <h2>5. Course Enrollments & Book Purchases</h2>
          <ul>
            <li>Enrollment in a course or purchase of a book is subject to seat availability and stock.</li>
            <li>Prices are subject to change without prior notice, but such changes will not affect already confirmed enrollments.</li>
            <li>Access to online portals or digital materials is granted solely to the registered student and cannot be shared.</li>
          </ul>

          <h2>6. Payments & Refunds</h2>
          <p>Clients and students agree to:</p>
          <ul>
            <li>Pay fees in full prior to the commencement of courses or dispatch of books.</li>
            <li>Pay applicable taxes where required.</li>
          </ul>
          <p>Refunds are strictly subject to our Refund Policy. Generally, once a batch starts or a book is dispatched, fees are non-refundable unless specified otherwise under special circumstances.</p>

          <h2>7. Confidentiality</h2>
          <p>Any confidential information shared between ASAHI and corporate clients or students shall remain confidential unless disclosure is required by law or both parties agree in writing.</p>

          <h2>8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, ASAHI shall not be liable for indirect damages, loss of profits, business interruption, or any damages arising from the use or inability to use our website or services. Our total liability shall not exceed the amount paid by the client for the specific service giving rise to the claim.</p>

          <h2>9. Warranty Disclaimer</h2>
          <p>All courses, materials, and website content are provided on an "as is" and "as available" basis. While we strive to provide the best education to help you pass JLPT exams, we do not guarantee specific exam results or job placements unless explicitly contracted.</p>

          <h2>10. Changes to These Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Changes become effective immediately upon publication on this website. Users are encouraged to review this page periodically.</p>

          <h2>11. Contact Us</h2>
          <p>For any questions regarding these Terms & Conditions, please contact:</p>
          <div className="contact-info-block">
            <strong>ASAHI Bilingual Services</strong><br />
            Email: asahi.learning@gmail.com<br />
            Location: Nagpur, Maharashtra, India
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
