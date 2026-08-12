"use client";

import React from "react";
import { motion } from "framer-motion";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { ShieldCheck } from "lucide-react";

const securityFeatures = [
  "Secure account access",
  "Access to available health reports",
  "Controlled access to your information",
  "Privacy-focused experience",
  "Convenient access to your health records",
];

export default function HowItWorksSecurity() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10">
      <div className="bg-[#f4f7f9] rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 border border-gray-100">
        
        {/* Decorative Graphic */}
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none hidden lg:block"></div>
        
        <div className="flex-1 lg:max-w-xl text-center lg:text-left z-10">
          <Headerbadge tag="SECURITY" text="Your Health Information Matters" />
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-[#2f5ba5]/70 to-transparent mx-auto lg:mx-0 mb-8"></div>
          
          <p className="text-[#64748B] text-lg md:text-xl font-light leading-relaxed mb-8">
            HeartView Health is designed to give you convenient access to your own available health information.
          </p>
          
        </div>

        <div className="flex-1 w-full max-w-lg mx-auto z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-col gap-4"
          >
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                }}
                className="bg-white rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm border border-white hover:border-[#2f5ba5]/20 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[#2f5ba5]/10 text-[#2f5ba5] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} strokeWidth={2} />
                </div>
                <span className="text-black text-lg font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
