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
      '"Services" include the HeartView Health mobile application, analytics systems, and all related features.',
      '"Device" refers to any HeartView Health supported third-party device.',
      '"User" means any individual accessing or using the Services.',
      '"Content" includes all reports, notes, data, or files uploaded by Users.',
      '"Wellness Data" includes heart rate, analytics, and user-entered health information.',
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
          "Clinical supervision"
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
        items: ["Medical diagnosis", "Treatment decisions"],
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

/* ================= SECTION COMPONENT ================= */

function Section({ data }: { data: SectionType }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="mb-8 mt-8"
    >
      {/* 🔥 CARD WRAPPER (NEW DESIGN) */}
      <div className="rounded-2xl shadow-md shadow-white/10 border-t border-white/10 backdrop-blur-md p-5 sm:p-6">

        {/* HEADER */}
        <div className="flex gap-4 mb-4 items-start">
          {/* <span className="text-[#3D7773] font-semibold bg-[#3D7773]/10 px-3 py-1 rounded-lg">
            {data.number}
          </span> */}

          <h2 className="text-xl sm:text-xl lg:text-2xl text-white tracking-tight leading-snug">
            {data.title}
          </h2>
        </div>

        {/* CONTENT */}
        <div className="space-y-3">
          {data.points.map((point, i) => (
            <div key={i} className="flex items-start gap-3 text-white/60 text-base sm:text-lg leading-relaxed font-light">

              {/* ✅ DOT REPLACED (MODERN LOOK) */}
              {/* <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3D7773]/70 shrink-0" /> */}

              <div>
                {typeof point === "string" ? (
                  point
                ) : (
                  <div>
                    <p className="text-white/60 text-base sm:text-lg leading-relaxed font-light">
                      {point.title}
                    </p>

                    <div className="mt-2 space-y-2">
                      {point.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-white/50 text-base sm:text-lg leading-relaxed font-light"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3D7773]/50 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

/* ================= MAIN ================= */

export default function TermsCondition() {
  return (
    <div className="  max-w-8xl px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-0 lg:mt-15  text-white">
      <div className="pt-5 md:pt-8 lg:pt-20  mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full ">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1">
            Legal Document
          </span>
        </div>
        {/* Terms & Conditions */}
        <h1 className=" text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white mb-4">{title}</h1>
        <p className="text-base sm:text-lg font-light font-light leading-relaxed mb-10">{subtitle}</p>

        {sections.map((sec, i) => (
          <Section key={i} data={sec} />
        ))}


      

      </div>
    </div>
  );
}