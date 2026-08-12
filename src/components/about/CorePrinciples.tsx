"use client";

import React from "react";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { FaRegLightbulb, FaChartLine, FaShieldAlt, FaBookMedical } from "react-icons/fa";
import Link from "next/link";

const principles = [
  {
    title: "Clarity over complexity.",
    desc: "We simplify medical data without oversimplifying it — insights are meant to inform your conversations with a doctor, not replace them.",
    icon: FaRegLightbulb,
  },
  {
    title: "Trends over single data points.",
    desc: "A single reading rarely tells the full story. We're built around tracking your numbers over time, against your own personal baseline.",
    icon: FaChartLine,
  },
  {
    title: "Privacy first.",
    desc: (
      <>
        Your health data is sensitive, and we treat it that way. See our{" "}
        <Link href="/privacy-policy" className="text-[#2f5ba5] font-medium hover:underline">
          Privacy Policy
        </Link>{" "}
        for full details on how your information is handled.
      </>
    ),
    icon: FaShieldAlt,
  },
  {
    title: "Research-informed content.",
    desc: "Our health information is developed using reputable medical and public-health sources and is reviewed and updated as appropriate.",
    icon: FaBookMedical,
  },
];

export default function CorePrinciples() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="w-full max-w-8xl mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20  relative">
      <div className="max-w-8xl mx-auto w-full text-center">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-12">
          <Headerbadge tag="CORE VALUES" text="Our Approach" />
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>
          <p className="text-base sm:text-lg font-light leading-relaxed text-[#64748B] text-center max-w-3xl mx-auto mt-4">
            We are dedicated to presenting your health data in the most useful, secure, and accurate way possible.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 text-left">
          {principles.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group relative flex flex-col p-8 sm:p-10 bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(47,91,165,0.08)] hover:border-[#4a7bc9]/30 transition-all duration-500"
              >
                {/* Subtle Background Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4a7bc9]/5 rounded-full blur-3xl group-hover:bg-[#4a7bc9]/10 transition-colors duration-500" />
                
                {/* Icon Container */}
                <div className="mb-6 flex items-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7CC4FF]/20 to-[#4a7bc9]/10 text-[#2f5ba5] group-hover:from-[#2f5ba5] group-hover:to-[#4a7bc9] group-hover:text-white transition-colors duration-500">
                    <Icon size={24} />
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-xl sm:text-xl lg:text-2xl font-medium  text-black  mb-3 group-hover:text-[#2f5ba5] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-base sm:text-lg font-light leading-relaxed text-[#64748B]">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
