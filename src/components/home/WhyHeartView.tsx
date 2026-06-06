"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import {  FaLightbulb,
  FaChartLine,
  FaHeartbeat,
  FaCalendarCheck,
  FaNotesMedical,} from "react-icons/fa";

const features = [
  {
    icon: FaLightbulb,
    title: "Unified Health Dashboard",
    desc: "Track heart rate, blood pressure, sugar, weight and more in one powerful dashboard.",
  },
  {
    icon: FaChartLine,
    title: "Reports & History",
    desc: "Access detailed reports, track your progress and view history over time.",
  },
  {
    icon: FaHeartbeat,
    title: "Smart Health Analysis",
    desc: "Get AI-powered insights and personalized recommendations based on your health data.",
  },
  {
    icon: FaCalendarCheck,
    title: "Appointment Management",
    desc: "Book, reschedule and manage your appointments with ease and reminders.",
  },
  {
    icon: FaNotesMedical,
    title: "Doctor Visit Records",
    desc: "Store and access your doctor visit details, prescriptions and medical notes securely.",
  },
];

export default function WhyHeartView() {
  return (
    <section className="w-full max-w-8xl  mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 pt-10 text-black">

      {/* Header */}

      <Headerbadge tag="Why HeartView" text="Built for Real Life, Not Just Numbers" />

      {/* Layout */}
 <div className="flex flex-wrap justify-center mt-5">
  {features.map((item, index) => {
    const Icon = item.icon;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`
          relative flex flex-col items-center text-center
          w-full sm:w-1/2 md:w-1/3 mt-6

          ${
            features.length === 5 && index >= 3
              ? "xl:w-1/3"
              : ""
          }
        `}
      >
        {/* Icon */}
        <div className="w-15 h-15 flex items-center justify-center rounded-full bg-[#2f5ba5]/10 mb-6">
          <Icon className="text-[#2f5ba5] text-2xl" />
        </div>

        <h2 className="text-xl lg:text-2xl font-medium mb-2">
          {item.title}
        </h2>

        <p className="text-base sm:text-lg font-light text-[#64748B] leading-relaxed max-w-xs line-clamp-2 ">
          {item.desc}
        </p>
      </motion.div>
    );
  })}
</div>
    </section>
  );
}