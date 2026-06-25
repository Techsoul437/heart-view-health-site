import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import Tesseract from "tesseract.js";  // ✅ SIRF YEH LINE ADD KAR DO TOP PE

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
      callback(null, false);
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};

// ✅ 1. CORS FIRST
app.use(cors(corsOptions));
app.options("/{*path}", cors(corsOptions));

// ✅ 2. HANDLE OPTIONS CLEANLY
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ 3. Body parser — limit badha diya base64 ke liye
app.use(express.json({ limit: "20mb" }));  // ✅ SIRF LIMIT BADLI HAI

// ✅ Health check — same as before
app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});

// ✅ Contact route — BILKUL SAME, TOUCH NAHI KIYA
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message, captcha } = req.body;

    if (!name || !email || !phone || !message || !captcha) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

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
    console.log("reCAPTCHA response:", JSON.stringify(captchaRes.data));
    if (!captchaRes.data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha failed",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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
      message: err.message,
    });
  }
});

// ✅ ==========================================
// ✅ NEW — OCR ROUTE (neeche add kiya, upar kuch nahi toda)
// ✅ ==========================================

function parseMedicalReport(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const result = {
    patientName: "",
    age: "",
    gender: "",
    date: "",
    reportTitle: "",
    findings: [],
    allLines: lines,
  };

  lines.forEach((line) => {
    const lower = line.toLowerCase();

    if (lower.includes("patient name") || lower.startsWith("name:")) {
      result.patientName = line.replace(/patient\s*name\s*:/i, "").replace(/name\s*:/i, "").trim();
    }
    if (lower.includes("age:") || lower.match(/^age\s/)) {
      result.age = line.replace(/age\s*:/i, "").trim();
    }
    if (lower.includes("gender:") || lower.includes("sex:")) {
      result.gender = line.replace(/(gender|sex)\s*:/i, "").trim();
    }
    if (lower.includes("date:") || lower.includes("report date")) {
      result.date = line.replace(/(report\s*)?date\s*:/i, "").trim();
    }
    if (!result.reportTitle && (lower.includes("report") || lower.includes("test") || lower.includes("scan"))) {
      result.reportTitle = line;
    }
  });

  result.findings = lines.filter((line) => line.length > 5).slice(0, 20);

  return result;
}

app.post("/api/ocr", async (req, res) => {
  try {
    const { fileData, fileType } = req.body;

    if (!fileData) {
      return res.status(400).json({ success: false, error: "No file data provided" });
    }

    // PDF directly supported nahi Tesseract mein — image hi bhejo
    if (fileType === "application/pdf") {
      return res.status(400).json({
        success: false,
        error: "PDF OCR abhi supported nahi hai. JPG/PNG upload karein.",
      });
    }

    const base64Data = fileData.replace(/^data:[^;]+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    console.log("OCR start:", fileType, "size:", buffer.length);

    const { data } = await Tesseract.recognize(buffer, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          console.log(`OCR progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    });

    const parsed = parseMedicalReport(data.text);

    return res.json({
      success: true,
      rawText: data.text,
      parsed,
    });
  } catch (err) {
    console.error("OCR Error:", err);
    return res.status(500).json({
      success: false,
      error: "OCR failed",
      details: err.message,
    });
  }
});

// ✅ ==========================================
// ✅ OCR ROUTE END
// ✅ ==========================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));