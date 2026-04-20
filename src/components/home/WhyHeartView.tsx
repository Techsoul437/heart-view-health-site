"use client";

import { motion } from "framer-motion";
import { FaUserCheck, FaLightbulb, FaChartLine, FaMobileAlt, FaHeartbeat } from "react-icons/fa";

const features = [
  {
    icon: FaUserCheck,
    title: "Designed for Everyone",
    desc: "Built for everyday users, not just professionals.",
  },
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
    icon: FaMobileAlt,
    title: "Works Anywhere",
    desc: "Works even without advanced devices.",
  },
  {
    icon: FaHeartbeat,
    title: "Long-Term Focus",
    desc: "Built for long-term health awareness.",
  },
];

export default function WhyHeartView() {
  return (
    <section className="w-full max-w-8xl  mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 pt-10 text-white">
      
      {/* Header */}
  <div className="w-full py-4 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/30 rounded-full px-4 py-1"
                    >
                         Why HeartView
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-4   text-2xl md:text-3xl lg:text-4xl font-medium leading-tight"
                    >
                         Built for Real Life, Not Just Numbers
                    </motion.h1>
                </div>

      {/* Layout */}
      <div className="flex flex-wrap justify-center xl:grid xl:grid-cols-5 mt-5">
  {features.map((item, index) => {
    const Icon = item.icon;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative flex flex-col items-center text-center w-full md:w-1/3  mt-6 xl:w-auto"
      >
        {/* Vertical Divider */}
        {index !== features.length - 1 && (
          <div className="hidden lg:block absolute right-0 top-0 h-full w-px bg-white/10"></div>
        )}

        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#3D7773]/10 mb-6">
          <Icon className="text-[#3D7773] text-lg" />
        </div>

        {/* Content */}
        <h2 className="text-xl sm:text-xl lg:text-2xl font-medium mb-2">
          {item.title}
        </h2>

        <p className="text-base sm:text-lg font-light text-slate-400 leading-relaxed max-w-xs md:max-w-70 lg:max-w-70 xl:max-w-70 2xl:max-w-80">
          {item.desc}
        </p>
      </motion.div>
    );
  })}
</div>
    </section>
  );
}