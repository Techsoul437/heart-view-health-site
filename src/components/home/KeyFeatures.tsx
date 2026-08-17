"use client";

import { motion, type Variants } from "framer-motion";
import { LayoutDashboard, HeartPulse, FlaskConical, FileClock, LineChart, BarChart2 } from "lucide-react";
import React from "react";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

const features = [
  {
    num: "01",
    title: "Health Dashboard",
    desc: "View available health information from one organized dashboard.",
    icon: LayoutDashboard,
  },
  {
    num: "02",
    title: "Health Measurements",
    desc: "Record and review supported measurements including heart rate, blood pressure, SpO₂, weight and other available health metrics.",
    icon: HeartPulse,
  },
  {
    num: "03",
    title: "Laboratory Reports",
    desc: "Access laboratory reports that have been securely associated with your account.",
    icon: FlaskConical,
  },
  {
    num: "04",
    title: "Report History",
    desc: "Review previous reports and measurements to keep your health information organized over time.",
    icon: FileClock,
  },
  {
    num: "05",
    title: "Health Trends",
    desc: "Compare supported measurements across different dates and monitor changes in your recorded data.",
    icon: LineChart,
  },
  {
    num: "06",
    title: "Health Insights",
    desc: "View simplified information for supported health measurements and report values.",
    icon: BarChart2,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function KeyFeatures() {
  return (
    <section className="w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-0 text-black">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center">
        <Headerbadge tag="KEY FEATURES" text="Features Built Around Your Health Information" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-16 -mt-3"
        >
          HeartView Health provides the tools you need to organize, track, and understand your health information in one secure platform.
        </motion.p>
      </div>

      {/* GRID SECTION */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.num}
              variants={cardVariants}
              className="relative group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(47,91,165,0.12)] transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Background Number Watermark */}
              <div className="absolute -right-4 -top-6 text-[120px] font-black text-gray-50/50 group-hover:text-[#2f5ba5]/5 transition-colors duration-500 pointer-events-none select-none leading-none z-0">
                {feature.num}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-[#2f5ba5]/10 text-[#2f5ba5] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2f5ba5] group-hover:text-white transition-all duration-300">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Step Number Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold text-[#2f5ba5] tracking-wider">FEATURE {feature.num}</span>
                </div>

                {/* Content */}
                <h2 className="text-xl sm:text-xl lg:text-2xl font-medium h-16 text-black flex ">
                  {feature.title}
                </h2>
                <p className="text-[#64748B] font-light text-lg leading-relaxed grow">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}
