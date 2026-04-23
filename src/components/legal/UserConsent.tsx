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

const title = "HEARTVIEW HEALTH USER CONSENT & MEDICAL DISCLAIMER";
const subtitle =
  "IMPORTANT: Read carefully before use. By using HeartView Health, you acknowledge and agree to the following.";

const sections: SectionType[] = [
  {
    number: "1",
    title: "Not a Medical Device",
    points: [
      {
        title: "The Services, including the mobile application and wearable device:",
        items: [
          "Are intended for general wellness purposes only",
          "Are NOT a certified medical device (unless explicitly stated)",
          "Do NOT provide diagnosis, treatment, or medical advice",
        ],
      },
    ],
  },
  {
    number: "2",
    title: "No Medical Advice",
    points: [
      {
        title: "The Services:",
        items: [
          "Do not replace doctors",
          "Do not provide clinical guidance",
          "Do not create a doctor-patient relationship",
        ],
      },
      "Always consult a qualified healthcare professional.",
    ],
  },
  {
    number: "3",
    title: "Accuracy Limitations (Very Important)",
    points: [
      {
        title: "You understand and accept:",
        items: [
          "data may be inaccurate or incomplete",
        ],
      },
      {
        title: "Readings may be affected by:",
        items: [
          "Movement",
          "Device placement",
          "Skin conditions",
          "Environmental interference",
        ],
      },
      {
        title: "AI insights may:",
        items: [
          "Be incorrect",
          "Miss conditions",
          "Generate false alerts",
        ],
      },
    ],
  },
  {
    number: "4",
    title: "No Reliance Clause",
    points: [
      {
        title: "You agree NOT to rely on the Services for:",
        items: [
          "Medical diagnosis",
          "Treatment decisions"
        ],
      },
    ],
  },
  {
    number: "5",
    title: "Risk Acknowledgment",
    points: [
      {
        title: "You explicitly acknowledge:",
        items: [
          "Use of the Services involves inherent risks",
          "Digital health data may be inaccurate",
          "System failures, delays, or outages may occur",
        ],
      },
      "You use the Services entirely at your own risk.",
    ],
  },
  {
    number: "6",
    title: "Data Risks",
    points: [
      {
        title: "You understand:",
        items: [
          "Data may be stored digitally",
          "Breaches or unauthorized access may occur",
        ],
      },
      "You accept these risks.",
    ],
  },
  {
    number: "7",
    title: "User Responsibility",
    points: [
      {
        title: "You are solely responsible for:",
        items: [
          "Your health decisions",
          "Interpreting data",
          "Seeking medical care",
        ],
      },
    ],
  },
  {
    number: "8",
    title: "Consent to Terms & Privacy Policy",
    points: [
      {
        title: "By proceeding, you confirm that you:",
        items: [
          "Have read and understood this document",
          "Agree to the Terms & Conditions",
          "Agree to the Privacy Policy",
        ],
      },
    ],
  },
  {
    number: "9",
    title: "Binding Agreement",
    points: [
      "This Consent forms a legally binding agreement between you and HeartView Health Technologies Private Limited.",
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
      {/* 🔥 CARD */}
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
            <div
              key={i}
              className="flex items-start gap-3 text-white/60 text-base sm:text-lg leading-relaxed font-light"
            >
              {/* ✅ MODERN DOT */}
              {/* <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3D7773]/70 shrink-0" /> */}

              <div>
                {typeof point === "string" ? (
                  point
                ) : (
                  <div>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
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

export default function UserConsent() {
  return (
    <div className="max-w-8xl px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-0 lg:mt-15  text-white">
      <div className="pt-5 md:pt-8 lg:pt-20   mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full ">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1">
            Legal Document
          </span>
        </div>
        <h1 className=" text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white mb-4">{title}</h1>
        <p className="text-base sm:text-lg  font-light leading-relaxed mb-10">{subtitle}</p>

        {sections.map((sec, i) => (
          <Section key={i} data={sec} />
        ))}

      </div>
    </div>
  );
}