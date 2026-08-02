import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import API from "../services/api"
import "./Enquiry.css"

import { MdEmail } from "react-icons/md"
import { 
  FaPhoneAlt, FaChevronDown, FaUser, FaEnvelope, FaPhone, 
  FaGraduationCap, FaCommentDots, FaWhatsapp, FaClock, 
  FaCheckCircle, FaAward, FaShieldAlt, FaPaperPlane, 
  FaMapMarkerAlt, FaExternalLinkAlt 
} from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"

import { ToastContainer, toast } from "react-toastify"

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    exam: "",
    level: "",
    message: ""
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [examOpen, setExamOpen] = useState(false)
  const [levelOpen, setLevelOpen] = useState(false)
  const [modal, setModal] = useState({
    show: false,
    type: "", // "loading" | "success" | "error"
    title: "",
    message: ""
  })

  const handleExamSelect = (val) => {
    setForm(prev => ({
      ...prev,
      exam: val,
      level: ""
    }));
    setExamOpen(false);
  };

  const handleLevelSelect = (val) => {
    setForm(prev => ({
      ...prev,
      level: val
    }));
    setLevelOpen(false);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[6-9]\d{9}$/

  const examLevels = {
    JLPT: ["N5", "N4", "N3", "N2"],
    NAT: ["Q5", "Q4", "Q3", "Q2"]
  }

  const location = useLocation()

  /* AUTO FILL */
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"))
    
    let defaultExam = ""
    let defaultLevel = ""
    let defaultMessage = ""

    if (location.state && location.state.selectedCourse) {
       const parts = location.state.selectedCourse.split(" - ")
       if (parts.length >= 2) {
         defaultExam = parts[0]
         defaultLevel = parts[1]
       }
    }

    if (location.state && location.state.selectedService) {
      defaultMessage = `I am interested in your service: ${location.state.selectedService}`;
      defaultExam = "General Enquiry";
      defaultLevel = "Not Sure";
    }

    if (savedUser || defaultExam || defaultMessage) {
      setForm(prev => ({
        ...prev,
        name: savedUser?.name || "",
        email: savedUser?.email || "",
        phone: savedUser?.phone || "",
        exam: defaultExam || prev.exam,
        level: defaultLevel || prev.level,
        message: defaultMessage || prev.message
      }))
    }
  }, [location.state])

  /* VALIDATE */
  const validate = (name, value) => {
    let error = ""

    if (name === "email" && value && !emailRegex.test(value)) {
      error = "Enter valid email"
    }

    if (name === "phone" && value && !phoneRegex.test(value)) {
      error = "Enter valid Indian phone number"
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

    validate(name, value)
  }

  /* 🔥 FINAL SUBMIT (REAL + FAST WITH MODALS) */
  const submit = async () => {
    if (!form.name || !form.name.trim()) {
      setModal({ show: true, type: "error", title: "Missing Name", message: "Please enter your Full Name." });
      return;
    }
    if (!form.email || !form.email.trim()) {
      setModal({ show: true, type: "error", title: "Missing Email", message: "Please enter your Email Address." });
      return;
    }
    if (!emailRegex.test(form.email)) {
      setModal({ show: true, type: "error", title: "Invalid Email", message: "Please enter a valid Email Address format." });
      return;
    }
    if (!form.phone || !form.phone.trim()) {
      setModal({ show: true, type: "error", title: "Missing Phone Number", message: "Please enter your Phone Number." });
      return;
    }
    if (!phoneRegex.test(form.phone)) {
      setModal({ show: true, type: "error", title: "Invalid Phone Number", message: "Please enter a valid 10-digit Indian Phone Number." });
      return;
    }
    if (!form.exam) {
      setModal({ show: true, type: "error", title: "Category Required", message: "Please select an Exam Track or General Enquiry option." });
      return;
    }
    if (!form.level) {
      setModal({ show: true, type: "error", title: "Level Required", message: "Please select your Level or Category focus." });
      return;
    }

    const data = { ...form }
    setModal({ show: true, type: "loading", title: "Submitting Request", message: "Connecting to the database..." });

    try {
      setLoading(true)
      const res = await API.post("/enquiry/submit", data)

      /* ✅ SUCCESS */
      setModal({
        show: true,
        type: "success",
        title: "Form Submitted Successfully!",
        message: "Thank you for getting in touch. Our team will contact you shortly."
      });

      /* RESET FORM */
      setForm({
        name: "",
        email: "",
        phone: "",
        exam: "",
        level: "",
        message: ""
      })
      setErrors({})
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message || err.message || "Registration failed";
      setModal({
        show: true,
        type: "error",
        title: "Submission Failed",
        message: errMsg.includes("Route Not Found") 
          ? `Route Not Found: /api/enquiry/submit\n\nPlease ensure that your backend API server is running on port 5000 and matches the route configuration.`
          : errMsg
      });
    } finally {
      setLoading(false)
    }
  }

  const getFormTitle = () => {
    const service = location.state?.selectedService || "";
    const course = location.state?.selectedCourse || "";

    if (course) return <><span>Student</span> Enrollment Form</>;

    if (service) {
      const businessServices = [
        "Translation & Interpretation", 
        "Corporate Japanese Training",
        "College & Institutional Collab"
      ];
      const exchangeServices = [
        "Student Exchange Programs", 
        "Guided Japan Study Tours",
        "Study in Japan",
        "Japanese University Admissions"
      ];
      const workerServices = [
        "SSW & TITP Worker Programs"
      ];

      if (businessServices.includes(service)) {
        return <><span>Business</span> Service Request</>;
      }
      if (exchangeServices.includes(service)) {
        return <><span>Program</span> Admission Request</>;
      }
      if (workerServices.includes(service)) {
        return <><span>SSW / Workers</span> Registration</>;
      }
    }

    // Dynamic fallback based on manual dropdown selections
    if (form.exam === "General Enquiry") {
      return <><span>General</span> Enquiry Form</>;
    }
    if (form.exam === "JLPT" || form.exam === "NAT") {
      return <><span>Student</span> Enrollment Form</>;
    }

    return <><span>Student</span> Enrollment Form</>;
  };

  return (
    <div className="contact-page">
      <ToastContainer position="top-center" />

      <div className="contact-header">
        <span className="enquiry-subtitle-tag">Admissions & Inquiries</span>
        <h1>Begin Your <span className="gradient-text">Japanese Language Journey</span></h1>
        <div className="gradient-underline" />

        <p>
          Take the first step towards mastering Japanese. Fill out the application form below, and our expert coordinators will review your requirements and get in touch with you shortly.
        </p>
      </div>

      <div className="enquiry-container">

        {/* FORM */}
        <div className="form-section">

          <h2>{getFormTitle()}</h2>

          <div className="input-group-field">
            <FaUser className="field-icon" />
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group-field">
            <FaEnvelope className="field-icon" />
            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="input-group-field">
            <FaPhone className="field-icon" />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          {errors.phone && <p className="error">{errors.phone}</p>}

          {/* CUSTOM EXAM SELECT */}
          <div className="custom-select-container">
            {examOpen && <div className="select-dropdown-overlay" onClick={() => setExamOpen(false)}></div>}
            <div 
              className={`custom-select-trigger ${examOpen ? "trigger-open" : ""}`}
              onClick={() => {
                setExamOpen(!examOpen);
                setLevelOpen(false);
              }}
            >
              <span className="trigger-left-content">
                <FaGraduationCap className="field-icon" />
                <span>{form.exam || "Select Exam"}</span>
              </span>
              <FaChevronDown className="select-arrow-icon" />
            </div>
            
            {examOpen && (
              <div className="custom-options-dropdown animate-fade-in-down">
                <div className={`custom-option-item ${form.exam === "" ? "selected-opt" : ""}`} onClick={() => handleExamSelect("")}>
                  Select Exam
                </div>
                <div className={`custom-option-item ${form.exam === "JLPT" ? "selected-opt" : ""}`} onClick={() => handleExamSelect("JLPT")}>
                  JLPT
                </div>
                <div className={`custom-option-item ${form.exam === "NAT" ? "selected-opt" : ""}`} onClick={() => handleExamSelect("NAT")}>
                  NAT
                </div>
                <div className={`custom-option-item ${form.exam === "General Enquiry" ? "selected-opt" : ""}`} onClick={() => handleExamSelect("General Enquiry")}>
                  General Enquiry
                </div>
              </div>
            )}
          </div>

          {/* CUSTOM LEVEL SELECT */}
          <div className="custom-select-container">
            {levelOpen && <div className="select-dropdown-overlay" onClick={() => setLevelOpen(false)}></div>}
            <div 
              className={`custom-select-trigger ${levelOpen ? "trigger-open" : ""}`}
              onClick={() => {
                setLevelOpen(!levelOpen);
                setExamOpen(false);
              }}
            >
              <span className="trigger-left-content">
                <FaAward className="field-icon" />
                <span>
                  {form.level === "Not Sure" 
                    ? "Not sure / Need guidance" 
                    : (form.level || "Select Level")}
                </span>
              </span>
              <FaChevronDown className="select-arrow-icon" />
            </div>
            
            {levelOpen && (
              <div className="custom-options-dropdown animate-fade-in-down">
                <div className={`custom-option-item ${form.level === "" ? "selected-opt" : ""}`} onClick={() => handleLevelSelect("")}>
                  Select Level
                </div>
                <div className={`custom-option-item ${form.level === "Not Sure" ? "selected-opt" : ""}`} onClick={() => handleLevelSelect("Not Sure")}>
                  Not sure / Need guidance
                </div>
                {form.exam &&
                  examLevels[form.exam]?.map(lvl => (
                    <div 
                      key={lvl} 
                      className={`custom-option-item ${form.level === lvl ? "selected-opt" : ""}`} 
                      onClick={() => handleLevelSelect(lvl)}
                    >
                      {lvl}
                    </div>
                  ))
                }
              </div>
            )}
          </div>

          <div className="input-group-field textarea-field">
            <FaCommentDots className="field-icon textarea-icon" />
            <textarea
              name="message"
              placeholder="Your Message (Optional)"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button onClick={submit} disabled={loading} className="btn-submit-enquiry">
            {loading ? "Submitting..." : <><FaPaperPlane className="btn-icon-space" /> Submit Application</>}
          </button>

        </div>

        {/* CONTACT */}
        <div className="contact-section">

          <div className="contact-section-header">
            <span className="contact-badge"><FaMapMarkerAlt /> ASAHI HEADQUARTERS</span>
            <h2>Contact <span>Information</span></h2>
            <p className="contact-sub">Have questions? Speak directly with our bilingual education counselors.</p>
          </div>

          <a href="mailto:asahibilingual@gmail.com" className="contact-box">
            <div className="contact-icon email"><MdEmail /></div>
            <div className="contact-text">
              <h3>OFFICIAL EMAIL</h3>
              <p>asahibilingual@gmail.com</p>
            </div>
          </a>

          <a href="tel:+917796530192" className="contact-box">
            <div className="contact-icon phone"><FaPhoneAlt /></div>
            <div className="contact-text">
              <h3>PHONE & ADMISSIONS</h3>
              <p>+91 77965 30192 / +91 93254 75225</p>
            </div>
          </a>

          <a
            href="https://www.google.com/maps?q=Nagpur"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-box"
          >
            <div className="contact-icon loc"><FaLocationDot /></div>
            <div className="contact-text">
              <h3>CAMPUS LOCATION</h3>
              <p>Nagpur, Maharashtra, India</p>
            </div>
          </a>

          <div className="map-widget-card">
            <div className="map-card-header">
              <span><FaMapMarkerAlt /> ASAHI NAGPUR CAMPUS MAP</span>
              <a 
                href="https://www.google.com/maps?q=Nagpur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-header-link"
              >
                Open Maps <FaExternalLinkAlt />
              </a>
            </div>
            <div className="map-frame-wrapper">
              <iframe
                title="ASAHI Campus Map"
                src="https://www.google.com/maps?q=Nagpur&output=embed"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>

      {/* COMPACT HIGH-TRUST GUARANTEE BAR */}
      <div className="trust-promises-wrapper">
        <div className="section-header trust-header">
          <span className="milestones-tag">ADMISSIONS GUARANTEE & SUPPORT</span>
          <h2>Why Students & Parents <span className="gradient-text">Trust ASAHI</span></h2>
          <div className="gradient-underline" />
          <p>Our commitment to transparent guidance, fast response, and complete data privacy.</p>
        </div>

        <div className="trust-promises-section">
          <div className="trust-promise-card">
            <div className="promise-icon-wrap green">
              <FaShieldAlt />
            </div>
            <div className="promise-content">
              <h4>100% Privacy Guarantee</h4>
              <p>Your details are strictly confidential & never shared with third parties.</p>
            </div>
          </div>

          <div className="trust-promise-card">
            <div className="promise-icon-wrap red">
              <FaClock />
            </div>
            <div className="promise-content">
              <h4>24-Hour Fast Callback</h4>
              <p>Our senior bilingual counselors respond within 24 business hours.</p>
            </div>
          </div>

          <div className="trust-promise-card">
            <div className="promise-icon-wrap purple">
              <FaGraduationCap />
            </div>
            <div className="promise-content">
              <h4>Free Level Assessment</h4>
              <p>Get 1-on-1 guidance to select your ideal JLPT or NAT course level.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM CENTERED VIEWPORT MODAL */}
      {modal.show && (
        <div className="enquiry-modal-backdrop animate-fade-in" onClick={() => modal.type !== "loading" && setModal(prev => ({ ...prev, show: false }))}>
          <div className="enquiry-modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
            
            {modal.type !== "loading" && (
              <button 
                className="enquiry-modal-x-close" 
                onClick={() => setModal({ show: false, type: "", title: "", message: "" })}
                aria-label="Close modal"
              >
                ✕
              </button>
            )}

            {modal.type === "loading" && (
              <div className="modal-content">
                <div className="modal-spinner"></div>
                <h3>{modal.title}</h3>
                <p>{modal.message}</p>
              </div>
            )}

            {modal.type === "success" && (
              <div className="modal-content">
                <div className="modal-icon-circle success-circle">✓</div>
                <h3>{modal.title}</h3>
                <p>{modal.message}</p>
                <button 
                  className="enquiry-modal-action-btn" 
                  onClick={() => setModal({ show: false, type: "", title: "", message: "" })}
                >
                  Got It
                </button>
              </div>
            )}

            {modal.type === "error" && (
              <div className="modal-content">
                <div className="modal-icon-circle error-circle">✕</div>
                <h3>{modal.title}</h3>
                <p style={{ whiteSpace: "pre-line" }}>{modal.message}</p>
                <button 
                  className="enquiry-modal-action-btn error-btn" 
                  onClick={() => setModal({ show: false, type: "", title: "", message: "" })}
                >
                  Try Again
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}

export default Register