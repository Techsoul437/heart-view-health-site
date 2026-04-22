"use client";

import { motion } from "framer-motion";
import {
    Activity,
    HeartPulse,
    FileText,
    Pill,
    Watch,
    Heart,
    AlertTriangle,
    BarChart,
} from "lucide-react";
import Image from "next/image";

const features = [
    {
        title: "Adaptive Heart Risk Intelligence",
        icon: HeartPulse,
        points: [
            "Continuously evaluates cardiovascular risk using dynamic scoring",
            "Calculates 0–100 Heart View Score (Good, Watch, High)",
            "Identifies key factors like BP, lipids, activity",
            "Provides next-best-action recommendations",
            "Works even with partial data",
            "Explainable logic (no black-box predictions)",
        ],
    },
    {
        title: "Comprehensive Health Data Tracking",
        icon: Activity,
        points: [
            "Track BP, Glucose, Weight, Heart Rate, SpO₂, Sleep, Activity",
            "Supports manual entry, wearable sync, imports",
            "Shows trends, averages, patterns",
            "Context-aware inputs (fasting, post-meal, etc.)",
            "Built for long-term monitoring & prevention",
        ],
    },
    {
        title: "Lab Report Digitization (OCR)",
        icon: FileText,
        points: [
            "Upload images or PDFs of lab reports",
            "Extract Cholesterol, HbA1c, Thyroid, Vitamins",
            "Smart unit normalization",
            "Editable confirmation before saving",
            "Secure storage for future tracking",
        ],
    },
    {
        title: "Precision Medication Management",
        icon: Pill,
        points: [
            "Time-based, interval-based, meal-linked dosing",
            "Reminders for before/after meals",
            "Snooze, skip, adherence tracking",
            "Daily intake history & insights",
            "Supports multiple conditions",
        ],
    },
    {
        title: "Connected Health Ecosystem",
        icon: Watch,
        points: [
            "Syncs with Apple Health & Android Health Connect",
            "Imports steps, sleep, heart rate",
            "Maintains source-based data integrity",
            "Continuous background sync",
            "Unified health profile",
        ],
    },
    {
        title: "Insights & Preventive Guidance",
        icon: BarChart,
        points: [
            "Visual dashboards for trends",
            "Highlights risk drivers",
            "Personalized recommendations",
            "Encourages preventive lifestyle",
            "Continuously evolving insights",
        ],
    },

];

export default function FeatureSection() {
    return (
        <section className="w-full  xl:pt-20 pt-5 md:pt-8 lg:pt-20  mt-0 lg:mt-15 ">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20">
                <div className="py-4 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                    >
                        Features
                    </motion.span>
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mt-4 max-w-8xl mx-auto"
                    >
                        <h2 className=" text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white">
                            Advanced Cardiac Monitoring & Health Intelligence
                        </h2>
                        <p className="mt-4 text-white/70 text-lg  font-light   leading-relaxed">
                            A complete system to monitor, analyze, and improve cardiovascular health with real-time insights.
                        </p>
                    </motion.div>
                </div>
                {/* Grid */}
                <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="group rounded-2xl  p-6 shadow-sm shadow-[#3D7773]  hover:border border-teal-500/40 hover:bg-white/2   transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-[#3D7773] font-bold text-white">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-xl sm:text-xl lg:text-2xl font-medium text-white">
                                        {feature.title}
                                    </h2>
                                </div>

                                <ul className="mt-4 space-y-2">
                                    {feature.points.map((point, i) => (
                                        <li
                                            key={i}
                                            className="text-base sm:text-lg   font-light text-gray-400 leading-relaxed flex gap-2"
                                        >
                                            <span className="text-[#3D7773]">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Security Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-10 relative w-full"
                >
                    <div className="relative z-10 w-full max-w-8xl  mx-auto">

                        {/* HEADING */}
                        <div className="text-center px-4 py-4">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                            >
                                Security
                            </motion.span>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight text-white">
                                Data Privacy & Security
                            </h3>

                            <p className="mt-3 sm:mt-4 text-gray-400 max-w-xl mx-auto text-base sm:text-lg  leading-relaxed  font-light">
                                Your health data is handled with strict privacy and security standards.
                            </p>
                        </div>

                        {/* CARD */}
                        <div className="mt-8 sm:mt-10 ">
                            <div className="
        w-full 
        max-w-4xl 
        mx-auto 
        rounded-2xl 
        border border-white/10 
        bg-white/5 
        backdrop-blur-md
        p-5 sm:p-6 md:p-8
      ">

                               <ul className="space-y-4 sm:space-y-5 text-gray-300 text-base sm:text-lg font-light">

  {[
    "Secure storage with data encryption and access control",
    "User-controlled permissions for data sharing and integrations",
    "Designed with a privacy-first architecture",
    "No unauthorized third-party data access"
  ].map((item, i) => (
    <li 
      key={i} 
      className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-white/5"
    >
      
      {/* ICON */}
      <div className="
        flex items-center justify-center 
        w-8 h-8 
        rounded-full 
        bg-gradient-to-br from-[#3D7773] to-[#2b5f5b]
        shadow-md shadow-[#3D7773]/30
        shrink-0
      ">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* TEXT */}
      <span className="group-hover:text-white transition-colors duration-300">
        {item}
      </span>

    </li>
  ))}

</ul>
                            </div>
                        </div>

                    </div>

                    {/* BACKGROUND GLOW (Responsive Safe) */}
                    <div className="absolute inset-0 -z-0">
                        <div className="
      absolute 
      top-1/2 left-1/2 
      w-72 sm:w-96 md:w-100
      h-72 sm:h-96 md:h-100
      bg-[#3D7773]/20 
      blur-[100px] sm:blur-[120px] 
      -translate-x-1/2 -translate-y-1/2
    " />
                    </div>

                </motion.section>

            </div>
        </section>
    );
}
