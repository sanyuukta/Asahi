import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FaTimes, FaFacebook, FaInstagram, FaLinkedin, FaBars, FaChevronRight,
  FaHome, FaInfoCircle, FaBriefcase, FaUserPlus, FaBook, FaPhoneAlt, FaLink
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import logo from "../assets/asahilogo.jpeg";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/books", label: "Books" },
    { path: "/courses", label: "Courses" },
    { path: "/services", label: "Services" }
  ];

  const handleGoHome = () => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleNavClick = (item) => {
    setMenuOpen(false);
    if (item.isSpecial) {
      toast.info(item.msg, { position: "top-center" });
    } else {
      navigate(item.path);
    }
  };

  const handleExploreMore = () => {
    setMenuOpen(false);
    const message = "Hello ASAHI! I want to explore more about your courses and services.";
    window.open(`https://api.whatsapp.com/send?phone=917796530192&text=${encodeURIComponent(message)}`, "_blank");
  };



  return (
    <>
      <ToastContainer position="top-center" limit={1} autoClose={2500} />
      <header className="navbar-premium">
        <div className="navbar-container-premium">
          <div className="main-nav-premium" onClick={handleGoHome}>
            <div className="logo-premium"><img src={logo} alt="ASAHI" /></div>
            <div className="brand-text-premium">
              <h2>ASAHI</h2>
              <span className="sub-line-1">JLPT PREPARATION &amp;</span>
              <span className="sub-line-2">BILINGUAL SERVICES</span>
            </div>
          </div>

          <ul className="nav-links-premium desktop-only-links">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.isSpecial ? (
                  <span className="special-nav-link" onClick={() => handleNavClick(item)}>
                    {item.label}
                  </span>
                ) : (
                  <NavLink to={item.path} className={({ isActive }) => isActive ? "active" : ""}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-right-premium">
            <button className="enroll-pill-btn" onClick={() => { setMenuOpen(false); navigate("/enquiry"); }}>
              Enroll Now
            </button>

            <div className="menu-icon-premium" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY & CONTAINER */}
        <div className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)} />

        <div className={`mobile-menu-container ${menuOpen ? "active" : ""}`}>
          <div className="mobile-menu-header-swiggy">
            <div className="swiggy-user-info" onClick={handleGoHome} style={{ cursor: "pointer" }}>
              <h2>ASAHI</h2>
              <p>Bilingual Services</p>
            </div>
            <div className="mobile-close-btn" onClick={() => setMenuOpen(false)} title="Close Menu">
              <FaTimes />
            </div>
          </div>

          <div className="mobile-menu-body">
            <div className="swiggy-list-container" style={{ marginTop: "20px" }}>
              <div className="swiggy-list-item" onClick={handleGoHome}>
                <div className="sli-left"><FaHome className="sli-icon"/> <span>Home</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className="swiggy-list-item" onClick={() => { setMenuOpen(false); navigate("/courses"); }}>
                <div className="sli-left"><FaBriefcase className="sli-icon"/> <span>Courses</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className="swiggy-list-item" onClick={() => { setMenuOpen(false); navigate("/books"); }}>
                <div className="sli-left"><FaBook className="sli-icon"/> <span>Books</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className="swiggy-list-item" onClick={() => { setMenuOpen(false); navigate("/enquiry"); }}>
                <div className="sli-left"><FaUserPlus className="sli-icon"/> <span>Enroll Now</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className="swiggy-list-item" onClick={() => { setMenuOpen(false); navigate("/services"); }}>
                <div className="sli-left"><FaBriefcase className="sli-icon"/> <span>Services</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className="swiggy-other-title">Other</div>
              <div className="swiggy-list-item" onClick={() => { setMenuOpen(false); navigate("/about"); }}>
                <div className="sli-left"><FaInfoCircle className="sli-icon"/> <span>About</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className="swiggy-list-item" onClick={() => { setMenuOpen(false); navigate("/terms"); }}>
                <div className="sli-left"><FaInfoCircle className="sli-icon"/> <span>Terms & Conditions</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className="swiggy-list-item" onClick={() => { setMenuOpen(false); navigate("/privacy-policy"); }}>
                <div className="sli-left"><FaInfoCircle className="sli-icon"/> <span>Privacy Policy</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
            </div>
          </div>

          <div className="mobile-footer">
            <div className="legal-links">
              <span onClick={() => { setMenuOpen(false); navigate('/privacy-policy') }}>Privacy Policy</span>
              <span>|</span>
              <span onClick={() => { setMenuOpen(false); navigate('/terms') }}>Terms</span>
            </div>
            <div className="social-connect">
              <p>Connect With Us</p>
              <div className="social-icons">
                <FaFacebook className="social-icon" />
                <FaInstagram className="social-icon" />
                <FaLinkedin className="social-icon" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Navbar;