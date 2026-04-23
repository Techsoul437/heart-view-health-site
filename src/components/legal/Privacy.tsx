"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sections = [
  {
    number: "1",
    title: "Introduction",
    content:
      "This Privacy Policy describes how HeartView Health Technologies Private Limited collects, uses, processes, stores, and protects your information when you use our mobile application, wearable devices, and related services . By using the Services, you consent to the practices described in this Privacy Policy.",
  },
  {
    number: "2",
    title: "Scope of Policy",
    content: "This Policy applies to:",
    list: [
      "Mobile application usage",
      "Website (if applicable)",
      "Third party integrations (Apple Health, Google Fit, etc.)",
    ],
  },
  {
    number: "3",
    title: "Information We Collect",
    content: "",
    subsections: [
      {
        subtitle: "Personal Information",
        list: ["Name", "Email address", "Phone number", "Account credentials"],
      },
      {
        subtitle: "Wellness & Health Data",
        list: [
          "Heart rate and related metrics",
          "Activity data",
          "User uploaded reports, notes, and medical documents",
        ],
      },
      {
        subtitle: "Device & Technical Data",
        list: [
          "Device type and operating system",
          "App usage logs",
          "IP address",
          "Connectivity data",
        ],
      },
      {
        subtitle: "Third-Party Data",
        list: [
          "Apple Health  health and activity data",
          "Google Fit  health and activity data",
        ],
      },
    ],
  },
  {
    number: "4",
    title: "How We Use Your Data",
    content:
      "We may also use aggregated and anonymized data for research and product development.",
    list: [
      "Provide and operate the Services",
      "Generate analytics and insights",
      "Improve performance and features",
      "Personalize user experience",
      "Maintain platform security",
    ],
  },
  {
    number: "5",
    title: "Data Processing & Legal Basis",
    content: "Your data is processed based on:",
    list: [
      "Your consent",
      "Legitimate business interests",
      "Legal obligations (if applicable)",
      "You may withdraw consent at any time."
    ],
  },
  {
    number: "6",
    title: "Data Sharing",
    content:
      "We do NOT sell your personal or health data. All third parties are bound by confidentiality obligations.",
    list: [
      "Service providers (hosting, analytics, infrastructure)",
      "Legal authorities (if required by law)",
    ],
  },
  {
    number: "7",
    title: "Data Storage & Retention",
    content: null,
    list: [
      "Data is stored securely on servers controlled by us or trusted providers",
      "Retention period depends on service usage and legal requirements",
      "Data may be deleted upon user request (subject to legal obligations)",
    ],
  },
  {
    number: "8",
    title: "Data Security",
    content:
      "We implement reasonable security measures. However, no system is completely secure, and unauthorized access or breaches may occur. By using the Services, you acknowledge and accept these risks.",
    list: ["Encryption", "Access control", "Secure infrastructure"],
  },
  {
    number: "9",
    title: "Data Breach Disclaimer",
  highlight: false,
    content:
      "To the maximum extent permitted by law, the Company shall NOT be liable for unauthorized access, data breaches, or data loss.To the maximum extent permitted by law:",
  list:[
    "unauthorized access",
    "data breaches",
    "data loss",
  ]
  },
  {
    number: "10",
    title: "User Rights",
    content: "Requests can be made through official support channels.",
    list: [
      "Access your data",
      "Request correction",
      "Request deletion",
      "Withdraw consent",
    ],
  },
  {
    number: "11",
    title: "International Data Transfers",
    content:
      "Data may be processed outside India depending on infrastructure providers.We ensure reasonable safeguards for such transfers.",
  },
  {
    number: "12",
    title: "Children's Privacy",
    content:
      "The Services are not intended for individuals under 18 without parental consent.",
  },
  {
    number: "13",
    title: "Changes to Policy",
    content:
      "We may update this Privacy Policy periodically. Continued use of our Services constitutes acceptance of the updated policy.",
  },
  {
  number: "14",
  title: "Contact Information",
  content:
    "For any questions, concerns, or requests regarding this Privacy Policy or your data, you may contact us at:",
  list: [
    "HeartView Health Technologies Private Limited",
    "Address: 19, Arth Residency, Near V.I.P. Circle, Utran, Surat – 394105, Gujarat.",
    "Email: info@heartviewhealth.com"
  ],
}
];

function AnimatedSection({
  section,
  index,
}: {
  section: (typeof sections)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      {/* CARD */}
      <div className="rounded-2xl   shadow-md shadow-white/10 border-t border-white/10 backdrop-blur-md p-5 sm:p-6">

        {/* HEADER */}
        <div className="flex items-start gap-4 mb-4">
          {/* <div className="flex items-center justify-center rounded-full bg-teal-500/10 text-white font-mono w-10 h-10 text-sm px-3 py-1">
            {section.number}
          </div> */}

          <h2 className="text-xl sm:text-xl lg:text-2xl text-white/90 leading-snug">
            {section.title}
          </h2>
        </div>

        {/* CONTENT */}
        <div className="space-y-3">

          {section.highlight && (
            <div className="border border-red-500/20 bg-red-500/5 rounded-xl px-4 py-3">
              <p className="text-red-300/80 text-base sm:text-lg font-light leading-relaxed  ">
                {section.content}
              </p>
            </div>
          )}

          {section.content && !section.highlight && (
            <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed">
              {section.content}
            </p>
          )}

          {/* LIST */}
          {section.list && (
            <ul className="space-y-2">
              {section.list.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-start gap-3 text-white/60 text-base sm:text-lg font-light leading-relaxed  "
                >
                  {/* ✅ DOT REPLACED WITH MODERN ICON STYLE */}
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3D7773]/60 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          )}

          {/* SUBSECTIONS */}
          {section.subsections?.map((sub, si) => (
            <div key={si} className="pt-2">
              <p className="text-white/80 text-sm sm:text-base mb-2">
                {sub.subtitle}
              </p>

              <ul className="space-y-2">
                {sub.list.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-white/50 text-base sm:text-lg font-light leading-relaxed  "
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3D7773]/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </motion.div>
  );
}

export default function Privacy() {
  return (
    <div className="min-h-screen max-w-8xl px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-0 lg:mt-15  text-white">

      {/* HERO */}
      <div className="pt-6 sm:pt-10 lg:pt-16 mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          {/* TAG */}
          <div className="mb-5">
            <span className="text-xs tracking-widest uppercase text-[#3D7773] border border-white/20 rounded-full px-4 py-1">
              Legal Document
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight mb-3">
            HEARTVIEW HEALTH PRIVACY POLICY
          </h1>

          {/* SUBTITLE */}
          <p className="text-white/60 text-sm sm:text-base">
            HeartView Health Technologies Private Limited Last updated April 2026
          </p>
        </motion.div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-teal-500/40 via-white/10 to-transparent my-8" />

        {/* SECTIONS */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <AnimatedSection key={index} section={section} index={index} />
          ))}
        </div>

      </div>
    </div>
  );
}