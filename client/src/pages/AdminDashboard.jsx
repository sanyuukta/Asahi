import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import API from "../services/api";

import "./AdminDashboard.css";

import {
  FaUsers,
  FaBars,
  FaTimes,
  FaTrash,
  FaSearch,
  FaClock,
  FaFileExcel
} from "react-icons/fa";
import { downloadStudentListExcel } from "../utils/downloadStudentExcel";

function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    message: "",
    onConfirm: null,
    onCancel: null
  });

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEnquiries(res.data.users || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load enquiries ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================
     DELETE ENQUIRY
  ========================= */
  const handleDeleteEnquiry = (id) => {
    setConfirmDialog({
      isOpen: true,
      message: "Are you sure you want to delete this enquiry permanently?",
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        try {
          await API.delete(`/admin/delete-user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setEnquiries(prev => prev.filter(item => item._id !== id));
          toast.success("Enquiry deleted successfully 🗑️");
        } catch (err) {
          console.log(err);
          toast.error("Failed to delete enquiry ❌");
        }
      }
    });
  };

  /* =========================
     FILTER ENQUIRIES
  ========================= */
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(item => {
      const searchStr = search.toLowerCase();
      return (
        item.name?.toLowerCase().includes(searchStr) ||
        item.email?.toLowerCase().includes(searchStr) ||
        item.phone?.toLowerCase().includes(searchStr) ||
        item.exam?.toLowerCase().includes(searchStr) ||
        item.level?.toLowerCase().includes(searchStr) ||
        item.message?.toLowerCase().includes(searchStr)
      );
    });
  }, [enquiries, search]);

  const handleDownloadExcel = () => {
    if (filteredEnquiries.length === 0) {
      toast.warning("No student records to download");
      return;
    }

    try {
      downloadStudentListExcel(filteredEnquiries);
      toast.success("Student list downloaded as Excel");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate Excel file");
    }
  };

  if (loading) {
    return (
      <div className="loader-page">
        <div className="loader"></div>
        <h2>Loading Enquiries...</h2>
      </div>
    );
  }

  return (
    <>
      {/* CUSTOM CONFIRM MODAL */}
      {confirmDialog.isOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h3>Confirm Action</h3>
            <p>{confirmDialog.message}</p>
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setConfirmDialog({ isOpen: false, message: "", onConfirm: null, onCancel: null })}
              >
                Cancel
              </button>
              <button 
                className="btn-danger" 
                onClick={confirmDialog.onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-container">
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* MOBILE SIDEBAR TOGGLE */}
        <button
          type="button"
          className="mobile-menu"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
          <div className="logo-area">
            <h2>ASAHI</h2>
            <p>Enquiry Management Panel</p>
          </div>
          <button className="active">
            Enquiries
          </button>
        </aside>

        {/* MAIN PANEL */}
        <main className="main">
          {/* TOPBAR */}
          <div className="topbar">
            <div>
              <h1>Enquiry Dashboard</h1>
              <p>Monitor student enrollments, exam levels, and custom messages.</p>
            </div>
            <div className="topbar-right">
              <div className="admin-badge">Admin</div>
            </div>
          </div>

          <ToastContainer position="top-right" autoClose={3000} />

          {/* METRIC CARD */}
          <div className="cards">
            <div className="card">
              <div className="card-icon-area blue">
                <FaUsers />
              </div>
              <div>
                <h3>Total Enquiries</h3>
                <p>{enquiries.length}</p>
              </div>
            </div>
          </div>

          {/* LIST HEADER WITH SEARCH */}
          <div className="section-top">
            <h2>Enquiry Submissions</h2>
            <div className="section-top-actions">
              <button className="btn-primary download-excel-btn" onClick={handleDownloadExcel}>
                <FaFileExcel /> Download Excel
              </button>
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search enquiries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* TABLE OF ENQUIRIES */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Exam</th>
                  <th>Level</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map(item => (
                  <tr key={item._id}>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td><a href={`mailto:${item.email}`} style={{ color: "#3b82f6" }}>{item.email}</a></td>
                    <td>{item.phone || "N/A"}</td>
                    <td><span className="badge-info" style={{ background: "#eff6ff", color: "#1e3a8a", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>{item.exam || "N/A"}</span></td>
                    <td><span className="badge-level" style={{ background: "#fef2f2", color: "#991b1b", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>{item.level || "N/A"}</span></td>
                    <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.message}>
                      {item.message || "—"}
                    </td>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748b" }}>
                        <FaClock /> {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <button className="btn-danger" onClick={() => handleDeleteEnquiry(item._id)}>
                        <FaTrash style={{ marginRight: '6px' }} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredEnquiries.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;