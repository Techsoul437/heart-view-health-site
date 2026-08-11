"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, HeartPulse, FlaskConical, FileClock, LineChart, BarChart2 } from "lucide-react";
import React from "react";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

const leftFeatures = [
  {
    num: "01",
    title: "Health Dashboard",
    desc: "View available health information from one organized dashboard.",
    icon: <LayoutDashboard className="text-[#2f5ba5]" size={40} strokeWidth={1.5} />,
  },
  {
    num: "02",
    title: "Health Measurements",
    desc: "Record and review supported measurements including heart rate, blood pressure, SpO₂, weight and other available health metrics.",
    icon: <HeartPulse className="text-[#2f5ba5]" size={40} strokeWidth={1.5} />,
  },
  {
    num: "03",
    title: "Laboratory Reports",
    desc: "Access laboratory reports that have been securely associated with your account.",
    icon: <FlaskConical className="text-[#2f5ba5]" size={40} strokeWidth={1.5} />,
  },
];

const rightFeatures = [
  {
    num: "04",
    title: "Report History",
    desc: "Review previous reports and measurements to keep your health information organized over time.",
    icon: <FileClock className="text-[#2f5ba5]" size={40} strokeWidth={1.5} />,
  },
  {
    num: "05",
    title: "Health Trends",
    desc: "Compare supported measurements across different dates and monitor changes in your recorded data.",
    icon: <LineChart className="text-[#2f5ba5]" size={40} strokeWidth={1.5} />,
  },
  {
    num: "06",
    title: "Health Insights",
    desc: "View simplified information for supported health measurements and report values.",
    icon: <BarChart2 className="text-[#2f5ba5]" size={40} strokeWidth={1.5} />,
  },
];

export default function KeyFeatures() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10 text-black">
      
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
      <div className="max-w-6xl mx-auto relative">
        {/* Middle Vertical Divider (Only on MD and above) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 -translate-x-1/2"></div>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          
          {/* Left Column */}
          <div className="flex flex-col">
            {leftFeatures.map((feature, i) => (
              <motion.div
                key={feature.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex gap-5 sm:gap-6 ${
                  i === 0 ? "pb-8" : i === leftFeatures.length - 1 ? "pt-8" : "py-8"
                } ${i !== leftFeatures.length - 1 ? "border-b border-black/10" : ""}`}
              >
                {/* <span className="text-2xl sm:text-3xl font-semibold text-[#2f5ba5] shrink-0 mt-1">
                  {feature.num}
                </span> */}
                <div className="text-[#2f5ba5] shrink-0 mt-0.5">
                  {feature.icon}
                </div>
                <div className="flex flex-col ml-1 sm:ml-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-950 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base sm:text-lg font-light text-[#64748B] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {rightFeatures.map((feature, i) => (
              <motion.div
                key={feature.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                className={`flex gap-5 sm:gap-6 ${
                  i === 0 ? "pt-8 md:pt-0 pb-8 border-t border-black/10 md:border-t-0" : i === rightFeatures.length - 1 ? "pt-8" : "py-8"
                } ${i !== rightFeatures.length - 1 ? "border-b border-black/10" : ""}`}
              >
                {/* <span className="text-2xl sm:text-3xl font-semibold text-[#2f5ba5] shrink-0 mt-1">
                  {feature.num}
                </span> */}
                <div className="text-[#2f5ba5] shrink-0 mt-0.5">
                  {feature.icon}
                </div>
                <div className="flex flex-col ml-1 sm:ml-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-950 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base sm:text-lg font-light text-[#64748B] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
