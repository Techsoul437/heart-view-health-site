"use client";

import { motion } from "framer-motion";

export default function OurVision() {
  return (
    <section className="relative w-full pt-16  overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 opacity-20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 flex flex-col ">

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
            className="mt-4   text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white"
          >
            A unified platform where heart awareness meets everyday health
          </motion.h1>

          <p className="mt-6 text-gray-400 max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed   lg:max-w-xl font-light ">
            Empowering people with clarity, consistency, and control over their
            health  so they don’t just track data, they truly understand it.
          </p>

          {/* Glow line */}
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-transparent via-[#3D7773] to-transparent"></div>
        </motion.div>

        {/* ⚠️ RESPONSIBILITY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl  mt-16 p-6 sm:p-8 md:p-10 lg:p-14"
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
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white">
              Built for awareness, not medical decisions
            </h1>

            <p className="mt-3 text-gray-400 max-w-2xl sm:max-w-3xl text-base sm:text-lg  leading-relaxed lg:max-w-xl font-light">
              HeartView Health is designed for general wellness and informational
              purposes. It helps you stay aware and organized  but it is not a
              replacement for professional medical advice.
            </p>

            {/* Points */}
            <div className="flex flex-col gap-3 text-base sm:text-lg  leading-relaxed lg:max-w-md font-light mt-4">
              {[
                "We do not provide medical diagnosis or treatment",
                "Always consult qualified healthcare professionals when needed",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[#3D7773]"></div>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}