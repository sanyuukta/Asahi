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
  FaFileExcel,
  FaBook
} from "react-icons/fa";
import { downloadStudentListExcel } from "../utils/downloadStudentExcel";

function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [bookForm, setBookForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [bookSubmitting, setBookSubmitting] = useState(false);
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

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data.books || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load books ❌");
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
    fetchBooks();
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

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookImage = (e) => {
    const file = e.target.files?.[0] || null;
    setBookForm((prev) => ({ ...prev, image: file }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!bookForm.name || !bookForm.image) {
      toast.warning("Book name and image are required");
      return;
    }

    try {
      setBookSubmitting(true);
      const formData = new FormData();
      formData.append("name", bookForm.name);
      formData.append("description", bookForm.description);
      formData.append("image", bookForm.image);

      await API.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Book added successfully ✅");
      setBookForm({ name: "", description: "", image: null });
      fetchBooks();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add book ❌");
    } finally {
      setBookSubmitting(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    setConfirmDialog({
      isOpen: true,
      message: "Delete this book from website?",
      onConfirm: async () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        try {
          await API.delete(`/books/${bookId}`);
          toast.success("Book deleted successfully");
          setBooks((prev) => prev.filter((book) => book._id !== bookId));
        } catch (err) {
          console.log(err);
          toast.error("Failed to delete book ❌");
        }
      },
    });
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
            <div className="card">
              <div className="card-icon-area red">
                <FaBook />
              </div>
              <div>
                <h3>Total Books</h3>
                <p>{books.length}</p>
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

          <section className="books-admin-section">
            <div className="section-top">
              <h2>Books Management</h2>
            </div>

            <form className="book-form-inline" onSubmit={handleAddBook}>
              <input
                type="text"
                name="name"
                value={bookForm.name}
                onChange={handleBookChange}
                placeholder="Book name (e.g. Fujichan 1)"
              />
              <input
                type="text"
                name="description"
                value={bookForm.description}
                onChange={handleBookChange}
                placeholder="Book description"
              />
              <input type="file" accept="image/*" onChange={handleBookImage} />
              <button className="btn-primary" type="submit" disabled={bookSubmitting}>
                {bookSubmitting ? "Adding..." : "Add Book"}
              </button>
            </form>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id}>
                      <td>
                        <img
                          src={book.imageUrl}
                          alt={book.name}
                          style={{ width: "62px", height: "46px", objectFit: "cover", borderRadius: "8px" }}
                        />
                      </td>
                      <td style={{ fontWeight: 600 }}>{book.name}</td>
                      <td style={{ maxWidth: "320px" }}>{book.description || "—"}</td>
                      <td>
                        <button className="btn-danger" onClick={() => handleDeleteBook(book._id)}>
                          <FaTrash style={{ marginRight: "6px" }} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {books.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center", padding: "24px", color: "#64748b" }}>
                        No books added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;