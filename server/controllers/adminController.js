const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* =========================
   ADMIN LOGIN
========================= */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* VALIDATION */
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    /* CHECK ADMIN CREDENTIALS */
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      /* GENERATE TOKEN */
      const token = jwt.sign(
        {
          role: "admin",
          email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d"
        }
      );

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
        user: {
          email,
          role: "admin"
        }
      });
    }

    /* INVALID */
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials"
    });

  } catch (err) {
    console.log("❌ ADMIN LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

/* =========================
   DASHBOARD ANALYTICS
========================= */
const dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      success: true,
      analytics: {
        totalUsers
      }
    });

  } catch (err) {
    console.log("❌ DASHBOARD ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard"
    });
  }
};

/* =========================
   GET ALL USERS (ENQUIRIES)
========================= */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (err) {
    console.log("❌ FETCH USERS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

/* =========================
   DELETE USER (ENQUIRY)
========================= */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully"
    });

  } catch (err) {
    console.log("❌ DELETE USER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to delete enquiry"
    });
  }
};

/* =========================
   EXPORTS
========================= */
module.exports = {
  adminLogin,
  dashboard,
  getAllUsers,
  deleteUser
};