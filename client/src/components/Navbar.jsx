import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FaTimes, FaFacebook, FaInstagram, FaLinkedin, FaBars, FaChevronRight,
  FaHome, FaUserPlus, FaBookOpen, FaGraduationCap,
  FaFileContract, FaShieldAlt, FaUsers, FaConciergeBell
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import logo from "../assets/asahilogo.jpeg";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return;
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen]);

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

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <>
      <ToastContainer position="top-center" limit={1} autoClose={2500} />
      <header className={`navbar-premium ${visible ? "" : "navbar-hidden"}`}>
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
              <div className="drawer-logo-img"><img src={logo} alt="ASAHI" /></div>
              <div className="drawer-brand-text">
                <h2>ASAHI</h2>
                <span className="sub-line-1">JLPT PREPARATION &amp;</span>
                <span className="sub-line-2">BILINGUAL SERVICES</span>
              </div>
            </div>
            <div className="mobile-close-btn" onClick={() => setMenuOpen(false)} title="Close Menu">
              <FaTimes />
            </div>
          </div>

          <div className="mobile-menu-body">
            <div className="swiggy-list-container">
              <div className={`swiggy-list-item ${isCurrentPath("/") ? "active-item" : ""}`} onClick={handleGoHome}>
                <div className="sli-left"><FaHome className="sli-icon"/> <span>Home</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className={`swiggy-list-item ${isCurrentPath("/courses") ? "active-item" : ""}`} onClick={() => { setMenuOpen(false); navigate("/courses"); }}>
                <div className="sli-left"><FaGraduationCap className="sli-icon"/> <span>Courses</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className={`swiggy-list-item ${isCurrentPath("/books") ? "active-item" : ""}`} onClick={() => { setMenuOpen(false); navigate("/books"); }}>
                <div className="sli-left"><FaBookOpen className="sli-icon"/> <span>Books</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className={`swiggy-list-item ${isCurrentPath("/enquiry") ? "active-item" : ""}`} onClick={() => { setMenuOpen(false); navigate("/enquiry"); }}>
                <div className="sli-left"><FaUserPlus className="sli-icon"/> <span>Enroll Now</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className={`swiggy-list-item ${isCurrentPath("/services") ? "active-item" : ""}`} onClick={() => { setMenuOpen(false); navigate("/services"); }}>
                <div className="sli-left"><FaConciergeBell className="sli-icon"/> <span>Services</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>

              <div className="swiggy-other-title">OTHER &amp; LEGAL</div>

              <div className={`swiggy-list-item ${isCurrentPath("/about") ? "active-item" : ""}`} onClick={() => { setMenuOpen(false); navigate("/about"); }}>
                <div className="sli-left"><FaUsers className="sli-icon"/> <span>About Us</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className={`swiggy-list-item ${isCurrentPath("/terms") ? "active-item" : ""}`} onClick={() => { setMenuOpen(false); navigate("/terms"); }}>
                <div className="sli-left"><FaFileContract className="sli-icon"/> <span>Terms &amp; Conditions</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
              <div className={`swiggy-list-item ${isCurrentPath("/privacy-policy") ? "active-item" : ""}`} onClick={() => { setMenuOpen(false); navigate("/privacy-policy"); }}>
                <div className="sli-left"><FaShieldAlt className="sli-icon"/> <span>Privacy Policy</span></div>
                <FaChevronRight className="sli-arrow" />
              </div>
            </div>
          </div>

          <div className="mobile-footer">
            <div className="social-connect">
              <p>CONNECT WITH US</p>
              <div className="social-icons">
                <FaFacebook className="social-icon" />
                <FaInstagram className="social-icon" />
                <FaLinkedin className="social-icon" />
              </div>
            </div>
            <div className="drawer-copyright-text">
              <p>© 2026 ASAHI Bilingual Services. All Rights Reserved.</p>
              <p className="tagline">Japanese Language Excellence &amp; Global Placements</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Navbar;