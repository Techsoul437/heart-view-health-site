"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { FaHandPointRight } from "react-icons/fa";
import { FaHand, FaHandPointLeft } from "react-icons/fa6";

export default function WhyHeartview() {
  return (
        <section className="w-full mt-10">


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

          <Headerbadge tag="WHY IT MATTERS" text="Why Heart Health, Why Now" />

          <p className=" text-[#64748B]   max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed   lg:max-w-3xl font-light ">
             Cardiovascular disease remains one of the leading causes of preventable death worldwide,
and much of that risk builds quietly over years  high blood pressure, rising cholesterol, or
blood sugar drifting toward prediabetes rarely cause symptoms until much later. The tools
to catch these trends early already exist: routine bloodwork, home blood pressure monitors,
wearables. What’s missing is a simple way to bring that data together and understand it in
plain language. That’s the problem HeartView Health is built to solve. </p>

          {/* Glow line */}
        </motion.div>

   

      </div>
    </section>
  );
}