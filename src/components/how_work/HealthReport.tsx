"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { FaHandPointRight } from "react-icons/fa";
import { FaHand, FaHandPointLeft } from "react-icons/fa6";

export default function Hero() {
  return (
        <section className="w-full  mt-10 ">


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

          <Headerbadge tag="Health Report" text="Your Health Reports, All in One Place" />

          <p className=" text-[#64748B]   max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed   lg:max-w-3xl font-light ">
           Access Your Reports When You Need Them </p>
 <p className=" text-[#64748B]   max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed   lg:max-w-3xl font-light ">
           HeartView Health makes supported laboratory reports easier to access through your account. Review
available reports and return to previous results when you need to look back at your health information. </p>
          {/* Glow line */}
        </motion.div>

   

      </div>
    </section>
  );
}