"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { FaUserCheck, FaLightbulb, FaChartLine, FaMobileAlt, FaHeartbeat } from "react-icons/fa";

const features = [
  {
    icon: FaLightbulb,
    title: "Clarity First",
    desc: "Focused on clarity, not complexity.",
  },
  {
    icon: FaChartLine,
    title: "Personalized Insights",
    desc: "Insights tailored based on your data.",
  },
  {
    icon: FaHeartbeat,
    title: "Long-Term Focus",
    desc: "Built for long-term health awareness.",
  },
];

export default function WhyHeartView() {
  return (
    <section className="w-full max-w-8xl  mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 pt-10 text-black">

      {/* Header */}

      <Headerbadge tag="Why HeartView" text="Built for Real Life, Not Just Numbers" />

      {/* Layout */}
      <div className="flex flex-wrap justify-center xl:grid xl:grid-cols-3 mt-5">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center w-full md:w-1/3  sm:w-1/2 mt-6 xl:w-auto"
            >
              {/* Vertical Divider */}
              {index !== features.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-0 h-full w-px bg-black/10"></div>
              )}

              {/* Icon */}
              <div className="w-15 h-15 flex items-center justify-center rounded-full bg-[#2f5ba5]/10 mb-6">
                <Icon className="text-[#2f5ba5] text-2xl" />
              </div>

              {/* Content */}
              <h2 className="text-xl sm:text-xl lg:text-2xl font-medium mb-2">
                {item.title}
              </h2>

              <p className="text-base sm:text-lg font-light text-[#64748B] leading-relaxed max-w-xs md:max-w-70 lg:max-w-70 xl:max-w-70 2xl:max-w-80">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}