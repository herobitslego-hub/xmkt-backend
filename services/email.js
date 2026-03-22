const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendDeliveryReceipt(order) {
  if (!order || !order.user || !order.user.email) return;
  const to = order.user.email;
  const subject = `Receipt — Order ${order.id} delivered`;
  const itemsHtml = (order.orderItems || [])
    .map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${i.price.toFixed(2)}</td></tr>`)
    .join("");

  const html = `
    <h2>Thank you — your order ${order.id} was delivered</h2>
    <p>Delivered on: ${new Date(order.dateOrdered || order.updatedAt || Date.now()).toLocaleString()}</p>
    <table border="0" cellpadding="6" cellspacing="0">
      <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <p><strong>Total: ${Number(order.totalPrice || 0).toFixed(2)}</strong></p>
    <p>If you need help, reply to this email.</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[email] Delivery receipt sent to ${to} for order ${order.id}`);
  } catch (err) {
    console.error("[email] Error sending delivery receipt:", err);
  }
}

module.exports = { sendDeliveryReceipt };