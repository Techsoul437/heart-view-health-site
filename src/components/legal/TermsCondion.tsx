"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ================= TYPES ================= */
type SectionType = {
  number: string;
  title: string;
  points: (string | { title: string; items: string[] })[];
};

/* ================= DATA ================= */

const title = "HeartView Health Terms & Conditions";
const subtitle =
  "Please read these terms carefully before using HeartView Health services.";

const sections: SectionType[] = [
  {
    number: "1",
    title: "Definitions",
    points: [
      '"Company" refers to HeartView Health Technologies Private Limited, incorporated under the Companies Act, 2013.',
      '"Services" include the HeartView Health mobile application, wearable ECG devices, analytics systems, and all related features.',
      '"Device" refers to any HeartView Health wearable ECG hardware or supported third-party device.',
      '"User" means any individual accessing or using the Services.',
      '"Content" includes all reports, notes, data, or files uploaded by Users.',
      '"Wellness Data" includes ECG signals, heart rate, analytics, and user-entered health information.',
    ],
  },
  {
    number: "2",
    title: "Acceptance of Terms",
    points: [
      "By accessing or using the Services, you agree to be legally bound by these Terms.",
      "If you do not agree, you must immediately discontinue use.",
      "Continued use constitutes acceptance of updates and modifications.",
    ],
  },
  {
    number: "3",
    title: "Nature of Services",
    points: [
      "The Services are provided strictly for general wellness and informational purposes.",
      "The Services are not intended to diagnose, treat, cure, or prevent any disease.",
      "The Services are not regulated medical services unless explicitly stated.",
    ],
  },
  {
    number: "4",
    title: "No Medical or Clinical Relationship",
    points: [
      {
        title: "Use of the Services does not establish:",
        items: [
          "Doctor-patient relationship",
          "Clinical supervision",
          "Emergency monitoring",
        ],
      },
      "The Company does not provide healthcare services.",
    ],
  },
  {
    number: "5",
    title: "Medical Disclaimer (Critical – Expanded)",
    points: [
      "All data is informational only.",
      {
        title: "ECG readings and insights:",
        items: ["May be inaccurate", "May be incomplete", "May be delayed"],
      },
      {
        title: "Factors affecting accuracy include:",
        items: [
          "Device placement",
          "Motion artifacts",
          "Skin contact",
          "Environmental interference",
        ],
      },
      {
        title: "AI-generated insights:",
        items: [
          "Are probabilistic",
          "Are not clinically validated",
          "May produce false positives or negatives",
        ],
      },
      {
        title: "You must NOT rely on the Services for:",
        items: ["Medical diagnosis", "Treatment decisions", "Emergency care"],
      },
      "In case of symptoms (e.g., chest pain, dizziness), seek immediate medical attention.",
    ],
  },
  {
    number: "6",
    title: "Device & Hardware Limitations",
    points: [
      "The Device is a consumer-grade wearable.",
      {
        title: "Performance may vary based on:",
        items: [
          "User behavior",
          "Environmental conditions",
          "Technical limitations",
        ],
      },
      "The Company does not guarantee uninterrupted or error-free performance.",
    ],
  },
  {
    number: "7",
    title: "User Responsibilities",
    points: [
      {
        title: "Users agree to:",
        items: [
          "Provide accurate information",
          "Use Services lawfully",
          "Maintain account security",
        ],
      },
      {
        title: "Users shall NOT:",
        items: [
          "Misuse the platform",
          "Upload harmful or illegal content",
          "Attempt to reverse engineer",
        ],
      },
    ],
  },
  {
    number: "8",
    title: "User Content",
    points: [
      "Users retain ownership of their Content.",
      {
        title: "By uploading Content, you grant the Company a license to:",
        items: ["Store", "Process", "Analyze", "Display"],
      },
      {
        title: "You are solely responsible for:",
        items: ["Legality", "Accuracy", "Ownership"],
      },
      "The Company is not liable for user-uploaded content.",
    ],
  },
  {
    number: "9",
    title: "Third-Party Integrations",
    points: [
      {
        title: "Services may integrate with:",
        items: ["Apple Health", "Google Fit", "Other platforms"],
      },
      {
        title: "The Company is not responsible for:",
        items: [
          "Third-party data accuracy",
          "Service interruptions",
          "Data loss",
        ],
      },
    ],
  },
  {
    number: "10",
    title: "Subscriptions & Payments",
    points: [
      "Services may include paid subscriptions.",
      {
        title: "Subscriptions:",
        items: ["Billed in advance", "Auto-renew unless canceled"],
      },
      {
        title: "Strict No-Refund Policy:",
        items: [
          "All payments are non-refundable unless required by applicable law.",
        ],
      },
      "The Company may modify pricing with notice.",
    ],
  },
  {
    number: "11",
    title: "Data & Analytics Disclaimer",
    points: [
      {
        title: "All analytics and scores:",
        items: ["Are informational only", "May contain errors"],
      },
      {
        title: "No guarantee of:",
        items: ["Accuracy", "Reliability", "Outcomes"],
      },
    ],
  },
  {
    number: "12",
    title: "Data Security & Breach Disclaimer",
    points: [
      "The Company implements reasonable security measures.",
      {
        title: "However:",
        items: ["No system is completely secure", "Breaches may occur"],
      },
      {
        title:
          "To the maximum extent permitted by law, the Company shall NOT be liable for:",
        items: ["Data breaches", "Unauthorized access", "Data loss"],
      },
    ],
  },
  {
    number: "13",
    title: "Disclaimer of Warranties",
    points: [
      'Services are provided "AS IS" and "AS AVAILABLE".',
      {
        title: "The Company disclaims:",
        items: [
          "All warranties",
          "Accuracy guarantees",
          "Uninterrupted access",
        ],
      },
    ],
  },
  {
    number: "14",
    title: "Limitation of Liability",
    points: [
      {
        title: "The Company is not liable for:",
        items: ["Indirect damages", "Consequential losses", "Loss of data"],
      },
      {
        title: "Total liability is limited to:",
        items: ["Amount paid by the user (if any)"],
      },
    ],
  },
  {
    number: "15",
    title: "Indemnification",
    points: [
      {
        title: "You agree to indemnify the Company against:",
        items: [
          "Misuse of Services",
          "Violation of Terms",
          "Reliance on data",
        ],
      },
    ],
  },
  {
    number: "16",
    title: "Termination",
    points: [
      "The Company may suspend or terminate access at any time.",
    ],
  },
  {
    number: "17",
    title: "Force Majeure",
    points: [
      {
        title:
          "The Company is not liable for events beyond control, including:",
        items: ["Cyberattacks", "Outages", "Natural disasters"],
      },
    ],
  },
  {
    number: "18",
    title: "Governing Law & Jurisdiction",
    points: [
      "These Terms are governed by the laws of India.",
      "Courts of Mumbai, Maharashtra shall have exclusive jurisdiction.",
    ],
  },
  {
    number: "19",
    title: "Arbitration",
    points: [
      "Disputes shall be resolved through arbitration in India.",
      {
        title: "Users waive:",
        items: ["Class actions", "Collective claims"],
      },
    ],
  },
  {
    number: "20",
    title: "Modifications",
    points: [
      "The Company may update these Terms at any time.",
      "Continued use constitutes acceptance.",
    ],
  },
];

/* ================= PRIVACY POLICY DATA ================= */

const privacyTitle = "Privacy Policy";
const privacySubtitle =
  "HeartView Health Technologies Private Limited — How we collect, use, and protect your information.";

type PrivacySectionType = {
  number: string;
  title: string;
  points: (string | { title: string; items: string[] })[];
};

const privacySections: PrivacySectionType[] = [
  {
    number: "1",
    title: "Introduction",
    points: [
      'This Privacy Policy describes how HeartView Health Technologies Private Limited ("Company," "we," "us," or "our") collects, uses, processes, stores, and protects your information when you use our mobile application, wearable devices, and related services ("Services").',
      "By using the Services, you consent to the practices described in this Privacy Policy.",
    ],
  },
  {
    number: "2",
    title: "Scope of Policy",
    points: [
      {
        title: "This Policy applies to:",
        items: [
          "Mobile application usage",
          "Wearable ECG devices",
          "Website (if applicable)",
          "Third-party integrations (Apple Health, Google Fit, etc.)",
        ],
      },
    ],
  },
  {
    number: "3",
    title: "Information We Collect",
    points: [
      {
        title: "Personal Information:",
        items: ["Name", "Email address", "Phone number", "Account credentials"],
      },
      {
        title: "Wellness & Health Data:",
        items: [
          "ECG signals",
          "Heart rate and related metrics",
          "Activity data",
          "User-uploaded reports, notes, and medical documents",
        ],
      },
      {
        title: "Device & Technical Data:",
        items: [
          "Device type and operating system",
          "App usage logs",
          "IP address",
          "Connectivity data",
        ],
      },
      {
        title: "Third-Party Data — when connected:",
        items: ["Apple Health", "Google Fit — health and activity data"],
      },
    ],
  },
  {
    number: "4",
    title: "How We Use Your Data",
    points: [
      {
        title: "We use your data to:",
        items: [
          "Provide and operate the Services",
          "Generate analytics and insights",
          "Improve performance and features",
          "Personalize user experience",
          "Maintain platform security",
        ],
      },
      "We may also use aggregated and anonymized data for research and product development.",
    ],
  },
  {
    number: "5",
    title: "Data Processing & Legal Basis",
    points: [
      {
        title: "Your data is processed based on:",
        items: [
          "Your consent",
          "Legitimate business interests",
          "Legal obligations (if applicable)",
        ],
      },
      "You may withdraw consent at any time.",
    ],
  },
  {
    number: "6",
    title: "Data Sharing",
    points: [
      "We do NOT sell your personal or health data.",
      {
        title: "We may share data with:",
        items: [
          "Service providers (hosting, analytics, infrastructure)",
          "Legal authorities (if required by law)",
        ],
      },
      "All third parties are bound by confidentiality obligations.",
    ],
  },
  {
    number: "7",
    title: "Data Storage & Retention",
    points: [
      "Data is stored securely on servers controlled by us or trusted providers.",
      "Retention period depends on service usage and legal requirements.",
      "Data may be deleted upon user request (subject to legal obligations).",
    ],
  },
  {
    number: "8",
    title: "Data Security",
    points: [
      {
        title: "We implement reasonable security measures including:",
        items: ["Encryption", "Access control", "Secure infrastructure"],
      },
      "No system is completely secure. Unauthorized access or breaches may occur. By using the Services, you acknowledge and accept these risks.",
    ],
  },
  {
    number: "9",
    title: "Data Breach Disclaimer",
    points: [
      {
        title:
          "To the maximum extent permitted by law, the Company shall NOT be liable for:",
        items: ["Unauthorized access", "Data breaches", "Data loss"],
      },
    ],
  },
  {
    number: "10",
    title: "User Rights",
    points: [
      {
        title: "You may:",
        items: [
          "Access your data",
          "Request correction",
          "Request deletion",
          "Withdraw consent",
        ],
      },
      "Requests can be made through official support channels.",
    ],
  },
  {
    number: "11",
    title: "International Data Transfers",
    points: [
      "Data may be processed outside India depending on infrastructure providers.",
      "We ensure reasonable safeguards for such transfers.",
    ],
  },
  {
    number: "12",
    title: "Children's Privacy",
    points: [
      "The Services are not intended for individuals under 18 without parental consent.",
    ],
  },
  {
    number: "13",
    title: "Changes to Policy",
    points: [
      "We may update this Privacy Policy periodically.",
      "Continued use constitutes acceptance.",
    ],
  },
  {
    number: "14",
    title: "Contact Information",
    points: [
      "HeartView Health Technologies Private Limited",
      "Email: info@heartviewhealth.com",
      "[Add registered address]",
    ],
  },
];

/* ================= SECTION COMPONENT ================= */

function Section({ data }: { data: SectionType | PrivacySectionType }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="mb-10 border-b border-white/10 pb-8"
    >
      {/* HEADER */}
      <div className="flex gap-4 mb-4">
        <span className="text-[#3D7773] font-semibold">{data.number}</span>
        <h2 className="text-2xl lg:text-4xl text-white tracking-tight leading-snug">{data.title}</h2>
      </div>

      {/* CONTENT */}
      <ul className="pl-6 space-y-2 list-disc marker:text-[#3D7773] text-white/50 text-lg md:text-base lg:text-2xl max-w-7xl font-light leading-relaxed">
        {data.points.map((point, i) => (
          <li key={i}>
            {typeof point === "string" ? (
              point
            ) : (
              <div>
                <p className="text-white/50 text-lg md:text-base lg:text-2xl max-w-7xl font-light leading-relaxed">{point.title}</p>
                <ul className="pl-6 mt-2 list-disc text-white/50 text-lg md:text-base lg:text-2xl max-w-7xl font-light leading-relaxed">
                  {point.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ================= MAIN ================= */

export default function TermsCondition() {
  return (
    <div className=" max-w-8xl px-20 py-20 text-white">
      <div className=" mx-auto">
  <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full ">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1">
              Legal Document
            </span>
          </div>
        {/* Terms & Conditions */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4">{title}</h1>
        <p className="text-lg md:text-base lg:text-2xl font-light leading-relaxed mb-10">{subtitle}</p>

        {sections.map((sec, i) => (
          <Section key={i} data={sec} />
        ))}

        
        {privacySections.map((sec, i) => (
          <Section key={`privacy-${i}`} data={sec} />
        ))}

      </div>
    </div>
  );
}