import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({ from: `"TravelApp" <${process.env.SMTP_USER}>`, to, subject, html });
};

export const bookingConfirmationEmail = (booking, user) => ({
  to: user.email,
  subject: `Booking Confirmed — ${booking.bookingRef}`,
  html: `<div style="font-family:Arial;max-width:600px;margin:0 auto">
    <div style="background:linear-gradient(135deg,#f97316,#ea580c);padding:30px;border-radius:12px 12px 0 0">
      <h1 style="color:white;margin:0">Booking Confirmed! ✈️</h1>
    </div>
    <div style="padding:30px;background:#f9fafb">
      <p>Hi <strong>${user.name}</strong>, your booking <strong>${booking.bookingRef}</strong> is confirmed.</p>
      <p><strong>Amount:</strong> ₹${booking.finalAmount?.toLocaleString()}</p>
      <p>Thank you for choosing TravelApp! 🌍</p>
    </div>
  </div>`,
});

export const passwordResetEmail = (name, resetUrl) => ({
  subject: "Password Reset Request",
  html: `<div style="font-family:Arial;max-width:600px">
    <h2>Hi ${name},</h2>
    <p>Click below to reset your password (expires in 1 hour):</p>
    <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#f97316;color:white;border-radius:8px;text-decoration:none">Reset Password</a>
  </div>`,
});