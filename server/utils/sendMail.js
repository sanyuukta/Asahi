const nodemailer = require("nodemailer")

/* =========================
   TRANSPORT CONFIG
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

/* =========================
   VERIFY CONNECTION (ON START)
========================= */
const verifyConnection = async () => {
  try {
    await transporter.verify()
    console.log("✅ Mail server ready")
  } catch (error) {
    console.error("❌ MAIL SERVER ERROR:", error.message)
  }
}

// call once when file loads
verifyConnection()

/* =========================
   SEND MAIL FUNCTION
========================= */
const sendMail = async (to, subject, htmlContent, attachments = []) => {
  try {

    const mailOptions = {
      from: `"ASAHI Japanese Learning 🇯🇵" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
      attachments
    }

    const info = await transporter.sendMail(mailOptions)

    console.log("📩 MAIL SENT:", info.messageId)

    return {
      success: true,
      messageId: info.messageId
    }

  } catch (err) {

    console.error("❌ MAIL ERROR:", err.message)

    return {
      success: false,
      error: err.message
    }
  }
}

module.exports = sendMail