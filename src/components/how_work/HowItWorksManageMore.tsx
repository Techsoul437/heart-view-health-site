"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { CalendarClock, Pill, LayoutDashboard } from "lucide-react";

const managementItems = [
  {
    title: "Appointments",
    description: "Keep upcoming appointments and available visit details organized.",
    icon: CalendarClock,
  },
  {
    title: "Medications",
    description: "Review your available medication information in one convenient place.",
    icon: Pill,
  },
  {
    title: "Health Dashboard",
    description: "Get a quick overview of your available health information from your dashboard.",
    icon: LayoutDashboard,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HowItWorksManageMore() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10">
      <div className="flex flex-col items-center text-center mb-10">
        <Headerbadge tag="BEYOND DATA" text="Manage More Than Your Health Data" />
        <div className="mt-2 h-1 w-20 bg-gradient-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {managementItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(47,91,165,0.08)] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2f5ba5]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 mb-6 group-hover:bg-[#2f5ba5]/10 group-hover:text-[#2f5ba5] transition-colors duration-300">
                <Icon size={32} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl sm:text-xl lg:text-2xl font-medium  text-black   group-hover:text-[#2f5ba5] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-[#64748B] font-light text-lg leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
