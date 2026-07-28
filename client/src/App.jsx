import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import StudentReviews from "./components/StudentReviews"
import ScrollToTop from "./components/ScrollToTop"
import WhatsAppWidget from "./components/WhatsAppWidget"

import Hero from "./components/Hero"
import AboutPreview from "./components/AboutPreview"
import Courses from "./components/Courses"
import WhyChoose from "./components/WhyChoose"
import Stats from "./components/Stats"

import CoursesPage from "./pages/CoursesPage"
import Enquiry from "./pages/Enquiry"
import AboutUs from "./pages/AboutUs"
import ServicesPage from "./pages/ServicesPage"

/* ADMIN */
import AdminDashboard from "./pages/AdminDashboard"
import AdminLogin from "./pages/AdminLogin"

import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"

/* HOME */
function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Courses />
      <WhyChoose />
      <Stats />
      <StudentReviews />
    </>
  )
}

/* 🔐 ADMIN PROTECT */
const AdminProtect = ({ children }) => {
  let user = null

  try {
    const storedUser = localStorage.getItem("user")

    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser)
    }
  } catch (err) {
    console.log("Parse error:", err)
    user = null
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin-login" />
  }

  return children
}

/* APP */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/register" element={<Navigate to="/enquiry" replace />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />

        {/* ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtect>
              <AdminDashboard />
            </AdminProtect>
          }
        />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>

      <WhatsAppWidget />
      <Footer />
    </BrowserRouter>
  )
}

export default App