const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

service: "gmail",

auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}

})

const sendOrderMail = async (order) => {

try {

await transporter.sendMail({

from: `"ASAHI Academy" <${process.env.EMAIL_USER}>`,

to: order.email,

subject: "🎌 Your ASAHI Book Order Confirmation",

html: `

<h2>Arigatō gozaimasu 🙏</h2>

<p>Dear ${order.name},</p>

<p>Thank you for ordering from <b>ASAHI Japanese Learning</b>.</p>

<p><b>Book:</b> ${order.book}</p>
<p><b>Quantity:</b> ${order.quantity}</p>
<p><b>Total Amount:</b> ₹${order.totalAmount}</p>

<p>Your order has been successfully placed and our team will contact you shortly.</p>

<hr>

<p><b>Team ASAHI</b></p>
<p>Japanese Language Academy</p>

`

})

console.log("📧 Order email sent")

} catch (error) {

console.log("❌ Email error:", error.message)

}

}

module.exports = sendOrderMail