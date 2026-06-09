"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { FaHandPointRight } from "react-icons/fa";
import { FaHand, FaHandPointLeft } from "react-icons/fa6";

export default function OurVision() {
  return (
    <section className="relative w-full ">

      {/* Glow Background */}
      <div className="absolute inset-0 opacity-20 blur-3xl "></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 pt-10  flex flex-col ">

        {/* 🚀 OUR VISION */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >

          <Headerbadge tag=" Our vision" text="A Future Where Every Individual Understands Their Health With Confidence " />

          <p className=" text-[#64748B]   max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed   lg:max-w-3xl font-light ">
            We envision a world where health awareness is proactive rather than reactive, empowering people to take greater ownership of their wellbeing through accessible technology and meaningful insights.
          </p>

          {/* Glow line */}
          <div className="mt-6 h-1 w-20 bg-gradient-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>
        </motion.div>

        {/* ⚠️ RESPONSIBILITY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-lg border border-black/10 bg-[#EDEDEE] backdrop-blur-xl  mt-10 p-6 sm:p-8 md:p-10 lg:p-10 lg:pt-6 lg:px-10 "
        >
          {/* subtle glow */}

          <div className="relative flex flex-col items-center text-center">
            <Headerbadge tag="OUR COMMITMENT" text="Designed for Wellness. Guided by Responsibility. " />

            <p className="text-[#64748B]   max-w-2xl sm:max-w-3xl lg:max-w-2xl text-base sm:text-lg leading-relaxed font-light">
              HeartView Health provides informational tools and wellness-focused insights to help users better understand their health journey. Our platform is intended to complement not replace professional medical advice, diagnosis, or treatment.
            </p>

            {/* Points */}
            <div className="flex flex-col gap-3 mt-4 lg:max-w-2xl">
              {[
                "Privacy-First Design",
                "Secure Data Handling",
                "Transparent Information Practices",
                "User-Controlled Health Data",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FaHandPointRight className="text-[#2f5ba5]/70 shrink-0" />
                  <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}