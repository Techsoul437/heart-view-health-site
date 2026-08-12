"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { FaHandPointRight } from "react-icons/fa";
import { FaHand, FaHandPointLeft } from "react-icons/fa6";

export default function HowItWorksClearInfo() {
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

          <Headerbadge tag="Understanging Your Report" text="From Numbers to Clearer Information" />

          <p className=" text-[#64748B]   max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed   lg:max-w-3xl font-light ">
            HeartView Health brings your health information, reports, measurements, appointments, and
medications together in one place. Review your information, follow changes over time, and stay
connected with your healthcare journey </p>

          {/* Glow line */}
        </motion.div>

   

      </div>
    </section>
  );
}