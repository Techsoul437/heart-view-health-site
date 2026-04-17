"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sections = [
  {
    number: "01",
    title: "Introduction",
    content:
      "This Privacy Policy describes how HeartView Health Technologies Private Limited collects, uses, processes, stores, and protects your information when you use our mobile application, wearable devices, and related services . By using the Services, you consent to the practices described in this Privacy Policy.",
  },
  {
    number: "02",
    title: "Scope of Policy",
    content: "This Policy applies to:",
    list: [
      "Mobile application usage",
      "Website (if applicable)",
      "Third party integrations (Apple Health, Google Fit, etc.)",
    ],
  },
  {
    number: "03",
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
    number: "04",
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
    number: "05",
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
    number: "06",
    title: "Data Sharing",
    content:
      "We do NOT sell your personal or health data. All third parties are bound by confidentiality obligations.",
    list: [
      "Service providers (hosting, analytics, infrastructure)",
      "Legal authorities (if required by law)",
    ],
  },
  {
    number: "07",
    title: "Data Storage & Retention",
    content: null,
    list: [
      "Data is stored securely on servers controlled by us or trusted providers",
      "Retention period depends on service usage and legal requirements",
      "Data may be deleted upon user request (subject to legal obligations)",
    ],
  },
  {
    number: "08",
    title: "Data Security",
    content:
      "We implement reasonable security measures. However, no system is completely secure, and unauthorized access or breaches may occur. By using the Services, you acknowledge and accept these risks.",
    list: ["Encryption", "Access control", "Secure infrastructure"],
  },
  {
    number: "09",
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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border-b border-white/[0.06] pb-12 mb-10 last:border-0"
    >
      {/* Section number + title row */}
      <div className="flex items-start  gap-6 mb-6">
        <span className="font-mono text-lg text-[#3D7773]/60 mt-1 shrink-0 tracking-widest">
          {section.number}
        </span>
        <h3 className="text-lg md:text-base lg:text-2xl font-light text-white/90 tracking-tight leading-snug">
          {section.title}
        </h3>
      </div>

      <div className="pl-10 space-y-4">
        {section.highlight && (
          <div className="border border-red-500/20 bg-red-500/5 rounded-xl px-5 py-4">
            <p className="text-red-300/80 text-base sm:text-lg  leading-relaxed ">
              {section.content}
            </p>
          </div>
        )}

        {section.content && !section.highlight && (
          <p className="text-white/50 text-base sm:text-lg    max-w-7xl font-light leading-relaxed">
            {section.content}
          </p>
        )}

        {section.list && (
          <ul className="space-y-2">
            {section.list.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + i * 0.05,
                  ease: "easeOut",
                }}
                className="flex items-center  gap-3 text-white/50 text-base sm:text-lg  leading-relaxed  font-light"
              >
                <span className="w-1 h-1 rounded-full bg-teal-400/50 shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        )}

        {section.subsections?.map((sub, si) => (
          <div key={si} className="pt-2">
            <p className="text-white/70 text-lg md:text-base lg:text-2xl font-light mb-2 tracking-wide">
              {sub.subtitle}
            </p>
            <ul className="space-y-2">
              {sub.list.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-white/40 text-base sm:text-lg  leading-relaxed  font-light"
                >
                  <span className="w-1 h-1 rounded-full bg-teal-400/40 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}   

export default function Privacy() {
  return (
    <div className="min-h-screen max-w-8xl px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 text-white">
 

      {/* ── Hero ── */}
      <div className="pt-16 pb-20  mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full ">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1">
              Legal Document
            </span>
          </div>

          <h1 className=" text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white mb-4 ">
        HEARTVIEW HEALTH PRIVACY POLICY
          </h1>

          <p className="text-base sm:text-lg font-light leading-relaxed">
            HeartView Health Technologies Private Limited  Last updated April
            2026
          </p>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="origin-left h-px bg-gradient-to-r from-teal-500/40 via-white/10 to-transparent mt-12 mb-16"
        />

        {/* ── Sections ── */}
        <div>
          {sections.map((section, index) => (
            <AnimatedSection key={index} section={section} index={index} />
          ))}
        </div>

        {/* ── Contact Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8"
        >
          <p className="text-xs font-mono text-[#3D7773]/60 tracking-widest uppercase mb-4">
            14  Contact
          </p>
          <h3 className="text-lg md:text-base lg:text-2xl font-light text-white/90 mb-2">
            HeartView Health Technologies Private Limited
          </h3>
          <p className="text-white/40 text-base sm:text-lg  leading-relaxed  font-light mb-1">[Registered Address]</p>
          <a
            href="mailto:info@heartviewhealth.com"
            className="text-[#3D7773]/70 hover:text-teal-300 text-base sm:text-lg  leading-relaxed  font-light transition-colors"
          >
            info@heartviewhealth.com
          </a>
        </motion.div>

     
      </div>
    </div>
  );
}