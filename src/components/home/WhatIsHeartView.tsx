"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import React from "react";

export default function WhatIsHeartView() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-20 mb-10 text-black">
      <div className="flex flex-col items-center text-center">
        <Headerbadge 
          tag="YOUR HEALTH INFORMATION, ORGANIZED" 
          text="A Simpler Way to Stay Organized" 
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto -mt-3 mb-10"
        >
          <p className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-6">
            Health information can become difficult to manage when laboratory reports, measurements and older records are spread across email, messages, paper documents and different devices. HeartView Health is designed to bring supported health information together in a structured account so it is easier to access, review and understand.
          </p>
          <p className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
            HeartView Health combines health information organization with educational resources. You can review supported measurements, access laboratory reports that are securely associated with your account, look back at previous information and learn about common health topics without having to search for basic explanations each time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}