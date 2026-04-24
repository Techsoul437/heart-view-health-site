import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

// ✅ CORS config
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
      callback(null, false); // ❗ FIX: error throw mat karo
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};

// ✅ 1. CORS FIRST
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ safer than path pattern

// ✅ 2. 🔥 HANDLE OPTIONS CLEANLY (NO LOGIC EXECUTION)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ 3. Body parser
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});

// ✅ Contact route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message, captcha } = req.body;

    if (!name || !email || !phone || !message || !captcha) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ ENV check
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("Missing RECAPTCHA key");
      return res.status(500).json({
        success: false,
        message: "Server config error",
      });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email config");
      return res.status(500).json({
        success: false,
        message: "Server config error",
      });
    }

    // ✅ CAPTCHA verify
    const captchaRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captcha,
        },
      }
    );

    if (!captchaRes.data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha failed",
      });
    }

    // ✅ Mail config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return res.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (err) {
    console.error("Server Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ✅ Server start (Render ke liye)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));