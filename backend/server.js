import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (FIXED)
const allowedOrigins = [
  "http://localhost:3000",
  "https://heartviewhealth.com",
  "https://www.heartviewhealth.com",
  "https://heart-view-health-site.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming origin:", origin); // ✅ debug

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ IMPORTANT: Handle preflight requests
app.options("*", cors());

// ✅ API Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message, captcha } = req.body;

    // ❌ validation
    if (!name || !email || !phone || !message || !captcha) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // ✅ CAPTCHA VERIFY
    const verifyURL = "https://www.google.com/recaptcha/api/siteverify";

    const captchaRes = await axios.post(verifyURL, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captcha,
      },
    });

    if (!captchaRes.data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed",
      });
    }

    // ✅ Score check (v3 safe)
    if (captchaRes.data.score !== undefined && captchaRes.data.score < 0.5) {
      return res.status(400).json({
        success: false,
        message: "Low captcha score - suspected bot",
      });
    }

    // ✅ HOSTNAME CHECK (FIXED)
    const allowedDomains = [
      "heartviewhealth.com",
      "www.heartviewhealth.com"
    ];

    if (
      captchaRes.data.hostname &&
      !allowedDomains.includes(captchaRes.data.hostname)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid domain",
      });
    }

    // ✅ MAIL CONFIG
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // ✅ use app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // ✅ MAIL CONTENT
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

    // ✅ SUCCESS
    res.status(200).json({
      success: true,
      message: "We will contact you within 24 hours.",
    });

  } catch (error) {
    console.error("Server Error:", error);

    res.status(500).json({
      success: false,
      message: "Error sending email",
    });
  }
});

// ✅ SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));