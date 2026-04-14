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
        <section className="w-full py-24 ">
            <div className="max-w-8xl mx-auto px-20 text-center">
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
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white">
                        Advanced Cardiac Monitoring & Health Intelligence
                    </h2>
                    <p className="mt-4 text-white/70 text-lg  font-light   leading-relaxed">
                        A complete system to monitor, analyze, and improve cardiovascular health with real-time insights.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="group rounded-2xl bg-white/1 backdrop-blur border border-white/10 p-6 hover:border-[#3D7773] hover:bg-white/2   transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-[#3D7773] font-bold text-white">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-medium text-white">
                                        {feature.title}
                                    </h3>
                                </div>

                                <ul className="mt-4 space-y-2">
                                    {feature.points.map((point, i) => (
                                        <li
                                            key={i}
                                            className="text-sm md:text-base font-light text-gray-400 leading-relaxed flex gap-2"
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
                    className="mt-24"
                >
                    <div className="grid lg:grid-cols-2 gap-10  px-5 items-center">

                        {/* LEFT CONTENT */}
                        <div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-start text-white">
                                Data Privacy & Security
                            </h3>

                            <p className="mt-4 text-gray-400 max-w-xl text-start">
                                Your health data is handled with strict privacy and security standards.
                            </p>

                            <ul className="mt-8 space-y-5 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400 mt-1">✔</span>
                                    Secure storage with data encryption and access control
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="text-green-400 mt-1">✔</span>
                                    User-controlled permissions for data sharing and integrations
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="text-green-400 mt-1">✔</span>
                                    Designed with a privacy-first architecture
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="text-green-400 mt-1">✔</span>
                                    No unauthorized third-party data access
                                </li>
                            </ul>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative w-full h-100 ">
                            <Image
                                src="/safe-4.png"
                                alt="Health Data Security"
                               fill
                                className="object-cover   rounded-2xl"
                                priority
                            />
                        </div>

                    </div>
                </motion.section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 rounded-2xl border border-amber-400/30 bg-amber-500/5 backdrop-blur p-8"
                >
                    <h4 className="text-xl font-semibold text-amber-300">
                        Important Notice
                    </h4>
                    <p className="mt-3 text-md text-gray-400 leading-relaxed">
                        HeartView Health is intended for monitoring and awareness purposes only. It does not provide medical diagnosis, treatment, or clinical decision support. Always consult a qualified healthcare professional for medical advice.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
