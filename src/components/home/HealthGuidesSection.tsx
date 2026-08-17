"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion, type Variants } from "framer-motion";
import { HeartPulse, FlaskConical, Activity, Droplet, ShieldPlus } from "lucide-react";
import React from "react";

const guides = [
  {
    title: "Heart Health",
    desc: "Understand your heart, risk factors and ways to keep it healthy.",
    icon: HeartPulse,
  },
  {
    title: "Laboratory Tests",
    desc: "Learn about common lab tests and what your results mean.",
    icon: FlaskConical,
  },
  {
    title: "Diabetes & Blood Sugar",
    desc: "Explore blood sugar management and tips for a healthier you.",
    icon: Activity,
  },
  {
    title: "Cholesterol",
    desc: "Understand cholesterol levels and how they affect your health.",
    icon: Droplet,
  },
  {
    title: "General Health",
    desc: "Read about daily habits, prevention and overall well-being.",
    icon: ShieldPlus,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Decorative background wave for the cards
const WaveDecoration = () => (
  <svg
    className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 text-[#2f5ba5] opacity-[0.03] pointer-events-none transform translate-x-2 translate-y-2"
    viewBox="0 0 100 100"
    fill="currentColor"
    preserveAspectRatio="none"
  >
    <path d="M100,100 L100,20 C75,20 65,60 40,60 C20,60 10,80 0,80 L0,100 Z" />
    <path d="M100,100 L100,40 C80,40 70,75 45,75 C25,75 15,90 0,90 L0,100 Z" opacity="0.6" />
    <path d="M100,100 L100,60 C85,60 75,85 50,85 C30,85 20,95 0,95 L0,100 Z" opacity="0.3" />
  </svg>
);

export default function HealthGuidesSection() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10 text-black">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center">
        <Headerbadge tag="KNOWLEDGE & WELLNESS" text="Health Information & Guides" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto -mt-3 mb-16"
        >
          <p className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed px-4">
            Learn more about common health measurements, laboratory tests and everyday health topics through easy-to-understand educational articles.
          </p>
        </motion.div>
      </div>

      {/* GRID SECTION */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto z-10 relative mb-16"
      >
        {guides.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-[1.5rem] p-6 sm:p-7 border border-gray-100 shadow-[0_4px_25px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(47,91,165,0.08)] transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] relative overflow-hidden group"
            >
              <WaveDecoration />
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-[#f4f7fb] text-[#2f5ba5] flex items-center justify-center relative z-10 group-hover:bg-[#2f5ba5] group-hover:text-white transition-colors duration-300 shadow-sm border border-white">
                <Icon size={28} strokeWidth={1.5} className="sm:scale-110" />
              </div>
              
              <div className="relative z-10 flex flex-col justify-center h-full pt-1 sm:pt-0">
                <h3 className="text-xl sm:text-xl lg:text-2xl font-medium text-black group-hover:text-[#2f5ba5] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#64748B] text-lg font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}
