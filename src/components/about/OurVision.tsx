"use client";

import { motion } from "framer-motion";

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
          className="flex flex-col items-center text-center py-4"
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
          >
            Our vision
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mt-4   text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white"
          >
     Make health awareness simple and part of daily life.
          </motion.h1>

          <p className="mt-6 text-gray-400 max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed   lg:max-w-3xl font-light ">
          To create a unified platform where heart awareness meets everyday health management  empowering people with clarity, consistency, and control over their health.
          </p>

          {/* Glow line */}
          <div className="mt-6 h-1 w-20 bg-gradient-to-r from-transparent via-[#3D7773] to-transparent"></div>
        </motion.div>

        {/* ⚠️ RESPONSIBILITY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl  mt-10 p-6 sm:p-8 md:p-10 lg:p-14"
        >
          {/* subtle glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-30 blur-xl"></div>

          <div className="relative flex flex-col ">

            <motion.span
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-semibold tracking-widest w-47 text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
            >
              Our Responsibility

            </motion.span>
            <h1 className="mt-4  text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white">
              Built for awareness, not medical decisions
            </h1>

            <p className="mt-3 text-gray-400 max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed lg:max-w-xl font-light">
              HeartView Health is designed for general wellness and informational
              purposes. We do not provide medical diagnosis or treatment, and we encourage users to consult qualified healthcare professionals when needed.
            </p>

            {/* Points */}
            <div className="flex flex-col gap-3 text-base sm:text-lg  leading-relaxed lg:max-w-md font-light mt-4">
              {[
                "We do not provide medical diagnosis or treatment",
                "Always consult qualified healthcare professionals when needed",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[#3D7773]"></div>
                  <p className="text-gray-400 text-base sm:text-lg  leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}