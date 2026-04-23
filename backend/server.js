import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://heartviewhealth.com",
      "https://www.heartviewhealth.com",
      "https://heart-view-health-site.vercel.app",
    ];

    console.log("Incoming origin:", origin);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};

// ✅ CORS - Express 5 compatible syntax
app.options("/{*path}", cors(corsOptions));
app.use(cors(corsOptions));

// ✅ Body parser
app.use(express.json());

// ✅ Health check - Render ke liye
app.get("/", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

// ✅ Contact Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message, captcha } = req.body;

    if (!name || !email || !phone || !message || !captcha) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY is not set");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

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

    if (captchaRes.data.score !== undefined && captchaRes.data.score < 0.5) {
      return res.status(400).json({
        success: false,
        message: "Low captcha score - suspected bot",
      });
    }

    const allowedDomains = [
      "heartviewhealth.com",
      "www.heartviewhealth.com",
      "localhost",
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

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("EMAIL_USER or EMAIL_PASS is not set");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));