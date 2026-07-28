const User = require("../models/User");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getEnquiryTemplate, getAdminEnquiryTemplate } = require("../utils/emailTemplates");

/* =========================
   REGEX VALIDATION
========================= */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/; // Indian numbers

/* =========================
   SUBMIT ENQUIRY
========================= */
exports.submitEnquiry = async (req, res) => {
  try {
    let { name, email, password, phone, exam, level, message } = req.body;

    // Auto-generate password if not provided to keep DB model compatibility
    if (!password) {
      password = Math.random().toString(36).slice(-8) + "A1@";
    }

    /* =========================
       VALIDATION
    ========================= */
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required"
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    if (phone && !phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid Indian phone number"
      });
    }

    /* =========================
       CHECK EXISTING / UPSERT
    ========================= */
    let enquiry = await User.findOne({ email });

    if (enquiry) {
      // Update existing user/enquiry with latest details
      enquiry.name = name || enquiry.name;
      enquiry.phone = phone || enquiry.phone;
      enquiry.exam = exam || enquiry.exam;
      enquiry.level = level || enquiry.level;
      enquiry.message = message || enquiry.message;
      await enquiry.save();
    } else {
      /* =========================
         HASH PASSWORD
      ========================= */
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      /* =========================
         SAVE ENQUIRY / USER
      ========================= */
      enquiry = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        exam,
        level,
        message
      });
    }

    /* =========================
       JWT TOKEN (FOR BACKWARDS COMPATIBILITY)
    ========================= */
    const token = jwt.sign(
      { id: enquiry._id },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    /* =========================
       USER EMAIL (PREMIUM)
    ========================= */
    const userHtml = getEnquiryTemplate(name, email, phone, exam, level, message);
    sendMail(email, "Thank You for Contacting ASAHI Japanese Learning", userHtml)
      .catch(err => console.log("❌ User email error:", err));

    /* =========================
       ADMIN EMAIL
    ========================= */
    const adminHtml = getAdminEnquiryTemplate(name, email, phone, exam, level, message);
    sendMail(process.env.ADMIN_EMAIL, `Action Required: New Enrollment Enquiry - ${name}`, adminHtml)
      .catch(err => console.log("❌ Admin email error:", err));

    /* =========================
       RESPONSE
    ========================= */
    res.json({
      success: true,
      message: "Enquiry submitted successfully",
      token,
      enquiry
    });

  } catch (err) {
    console.log("❌ ENQUIRY ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later."
    });
  }
};
