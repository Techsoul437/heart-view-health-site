"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function WhatIsHeartViewSection() {
  return (
    <section className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 pt-16 pb-12 text-black">
      
      <div className="flex flex-col items-center text-center">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-widest text-[#2f5ba5] bg-[#eef4ff] uppercase rounded-full px-5 py-2 mb-6 border border-[#2f5ba5]/10"
        >
          WHAT IS HEARTVIEW HEALTH?
        </motion.span>
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold relative pb-6 inline-block mb-10 text-gray-950"
        >
          What Is HeartView Health?
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-[#4285f4] rounded-full"></span>
        </motion.h2>

        {/* Descriptions */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-4xl mx-auto mb-6"
        >
          HeartView Health is a digital health platform designed to help individuals organize and monitor their health information.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-4xl mx-auto mb-16"
        >
          The platform brings supported health measurements, laboratory reports, health history and health insights together in one place.
        </motion.p>
      </div>

      {/* List Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-center sm:text-left text-gray-900">
          With HeartView Health, you can:
        </h3>
        
        <div className="grid gap-5 sm:gap-y-6 sm:gap-x-12 sm:grid-cols-2">
          {/* Item 1 */}
          <div className="flex items-center gap-4">
            <CheckCircle2 className="text-[#4285f4] shrink-0" size={24} />
            <span className="text-sm sm:text-base font-medium text-gray-700">Track supported health measurements</span>
          </div>
          {/* Item 2 */}
          <div className="flex items-center gap-4">
            <CheckCircle2 className="text-[#4285f4] shrink-0" size={24} />
            <span className="text-sm sm:text-base font-medium text-gray-700">Monitor changes over time</span>
          </div>
          {/* Item 3 */}
          <div className="flex items-center gap-4">
            <CheckCircle2 className="text-[#4285f4] shrink-0" size={24} />
            <span className="text-sm sm:text-base font-medium text-gray-700">Store and access laboratory reports</span>
          </div>
          {/* Item 4 */}
          <div className="flex items-center gap-4">
            <CheckCircle2 className="text-[#4285f4] shrink-0" size={24} />
            <span className="text-sm sm:text-base font-medium text-gray-700">View supported health information in a simpler format</span>
          </div>
          {/* Item 5 */}
          <div className="flex items-center gap-4">
            <CheckCircle2 className="text-[#4285f4] shrink-0" size={24} />
            <span className="text-sm sm:text-base font-medium text-gray-700">Review previous health records</span>
          </div>
          {/* Item 6 */}
          <div className="flex items-center gap-4">
            <CheckCircle2 className="text-[#4285f4] shrink-0" size={24} />
            <span className="text-sm sm:text-base font-medium text-gray-700">Keep important health information organized</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
