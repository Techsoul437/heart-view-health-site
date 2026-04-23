import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios"; // ✅ ADD

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (local + live)
const allowedOrigins = [
  "http://localhost:3000",
   "heartviewhealth.com",
  "www.heartviewhealth.com",
  "heart-view-health-site.vercel.app"
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
    // ✅ captcha add
    const { name, email, phone, message, captcha } = req.body;

    // ❌ validation
    if (!name || !email || !phone || !message || !captcha) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Email format validation (extra safety)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const verifyURL = "https://www.google.com/recaptcha/api/siteverify";

    const captchaRes = await axios.post(
      verifyURL,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captcha,
        },
      }
    );

    // 🔥 EXTRA SECURITY ADD (NEW - IMPORTANT)
    if (!captchaRes.data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed",
      });
    }

    // 🔥 SCORE CHECK (future safe - v3 ke liye bhi ready)
    if (captchaRes.data.score !== undefined && captchaRes.data.score < 0.5) {
      return res.status(400).json({
        success: false,
        message: "Low captcha score - suspected bot",
      });
    }

    // 🔥 HOSTNAME CHECK (extra protection)
    if (
      captchaRes.data.hostname &&
      !allowedOrigins.some((origin) =>
        captchaRes.data.hostname.includes(origin.replace(/^https?:\/\//, ""))
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid domain",
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
      to: process.env.EMAIL_USER,
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