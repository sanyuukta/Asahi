const PDFDocument = require("pdfkit")
const fs = require("fs")

const generateInvoice = (order) => {

const doc = new PDFDocument()

const filePath = `invoices/invoice-${order._id}.pdf`

doc.pipe(fs.createWriteStream(filePath))

doc.fontSize(20).text("ASAHI Japanese Learning")

doc.moveDown()

doc.text(`Order ID : ${order._id}`)
doc.text(`Customer : ${order.customer.name}`)
doc.text(`Phone : ${order.customer.phone}`)

doc.moveDown()

order.products.forEach(p => {

doc.text(`${p.title} - ₹${p.price} x ${p.quantity}`)

})

doc.moveDown()

doc.text(`Total Amount : ₹${order.totalAmount}`)

doc.end()

return filePath

}

module.exports = generateInvoice