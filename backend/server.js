import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (local + live)
const allowedOrigins = [
  "http://localhost:3000",
  "https://heartviewhealth.com",
  "https://www.heartviewhealth.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
  })
);

// ✅ API Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // ❌ validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Mail config
 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

    // ✅ Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // tujhko hi mail aayega
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Details</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // ✅ Success Response
    res.status(200).json({
      success: true,
      message: "We will contact you within 24 hours.",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error sending email",
    });
  }
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));