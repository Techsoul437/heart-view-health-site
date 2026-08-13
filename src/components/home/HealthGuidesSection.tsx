"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { HeartPulse, FlaskConical, Activity, Droplet, ShieldPlus, BookOpen } from "lucide-react";
import React from "react";

const guides = [
  {
    num: "01",
    title: "Heart Health",
    desc: "Understand your heart, risk factors and ways to keep it healthy.",
    icon: <HeartPulse className="text-[#2f5ba5]" size={24} strokeWidth={1.5} />,
  },
  {
    num: "02",
    title: "Laboratory Tests",
    desc: "Learn about common lab tests and what your results mean.",
    icon: <FlaskConical className="text-[#2f5ba5]" size={24} strokeWidth={1.5} />,
  },
  {
    num: "03",
    title: "Diabetes & Blood Sugar",
    desc: "Explore blood sugar management and tips for a healthier you.",
    icon: <Activity className="text-[#2f5ba5]" size={24} strokeWidth={1.5} />,
  },
  {
    num: "04",
    title: "Cholesterol",
    desc: "Understand cholesterol levels and how they affect your health.",
    icon: <Droplet className="text-[#2f5ba5]" size={24} strokeWidth={1.5} />,
  },
  {
    num: "05",
    title: "General Health",
    desc: "Read about daily habits, prevention and overall well-being.",
    icon: <ShieldPlus className="text-[#2f5ba5]" size={24} strokeWidth={1.5} />,
  },
];

export default function HealthGuidesSection() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10 text-black ">

      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center">
        <Headerbadge tag="HEALTH INFORMATION & GUIDES" text="Health Information & Guides" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto -mt-3 mb-20"
        >
          <p className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed px-4">
            Learn more about common health measurements, laboratory tests and everyday health topics through easy-to-understand educational articles.
          </p>
        </motion.div>
      </div>

      {/* ZIG-ZAG GRID SECTION */}
      <div className="max-w-8xl mx-auto relative mb-16">

        {/* SVG Zig-Zag Connector (Hidden on Mobile) */}
        <div className="hidden lg:block absolute top-22 left-[10%] w-[80%] h-32 z-0">
          <svg viewBox="0 0 400 128" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            {/* The main dotted line */}
            <path d="M 0,0 L 100,128 L 200,0 L 300,128 L 400,0" stroke="#2f5ba5" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 6" fill="none" />
          </svg>

          {/* Perfectly round HTML dots to avoid SVG stretching */}
          <div className="absolute top-1/2 left-[12.5%] -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-[#2f5ba5] shadow-sm border-2 border-white"></div>
          <div className="absolute top-1/2 left-[37.5%] -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-[#2f5ba5] shadow-sm border-2 border-white"></div>
          <div className="absolute top-1/2 left-[62.5%] -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-[#2f5ba5] shadow-sm border-2 border-white"></div>
          <div className="absolute top-1/2 left-[87.5%] -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-[#2f5ba5] shadow-sm border-2 border-white"></div>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 lg:gap-y-0 relative z-10">
          {guides.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`flex flex-col items-center text-center relative px-2 ${i % 2 === 1 ? 'lg:mt-32' : 'lg:mt-0'}`}
            >
              {/* Number */}
              <span className="text-[#2f5ba5] font-bold text-lg mb-4">
                {item.num}
              </span>

              {/* Icon Container with glowing background */}
              <div className="relative mb-2 sm:mb-6">
                <div className="absolute inset-0 bg-[#eef4ff] blur-md rounded-full opacity-50 scale-125"></div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-[#2f5ba5]/10 flex items-center justify-center shadow-sm relative z-10 shrink-0 aspect-square">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-[#2f5ba5]/20 flex items-center justify-center bg-white shadow-sm">
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <h2 className="text-xl sm:text-xl lg:text-2xl font-medium h-10 text-black flex items-center justify-center">

                {item.title}
              </h2>

              <p className="text-base sm:text-lg   xl:max-w-xl text-[#64748B]  mt-4  leading-relaxed font-light text-center ">

                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
