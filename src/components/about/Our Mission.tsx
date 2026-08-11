"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { FaHandPointRight } from "react-icons/fa";
import { FaHand, FaHandPointLeft } from "react-icons/fa6";

export default function OurMission() {
  return (
        <section className="w-full  xl:pt-20 pt-5  lg:pt-20  mt-0 lg:mt-15 ">


      {/* Glow Background */}
      <div className="absolute inset-0 opacity-20 blur-3xl "></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20   flex flex-col ">

        {/* 🚀 OUR MISSION */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >

          <Headerbadge tag=" Our mission" text="Making Heart Health Understandable for Everyone" />

          <p className=" text-[#64748B]   max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed   lg:max-w-3xl font-light ">
              HeartView Health exists to make heart health understandable. Most
            people interact with their health data in fragments  a lab report
            here, a blood pressure reading there, a wearable app somewhere else
            with no single place to see the full picture or understand what
            any of it actually means. We built HeartView Health to close that
            gap: one dashboard that brings your vitals, lab reports, and daily
            habits together, translated into insights you can actually act on. </p>

          {/* Glow line */}
        </motion.div>

   

      </div>
    </section>
  );
}