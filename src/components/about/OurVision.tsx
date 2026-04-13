"use client";

import { motion } from "framer-motion";

export default function OurVision() {
  return (
    <section className="relative w-full py-24  overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 opacity-20 blur-3xl "></div>

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col gap-20">

        {/* 🚀 OUR VISION */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                >
                   Our vision
                </motion.span>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 80, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                        duration: 0.9,
                        delay: 0.1,
                        ease: [0.22, 1, 0.36, 1], // premium smooth easing
                    }}
                    className="mt-4 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white"
                >
                   A unified platform where heart awareness meets everyday health
                </motion.h1>
          <p className="mt-6 text-gray-400 max-w-3xl text-2xl font-light leading-relaxed">
            Empowering people with clarity, consistency, and control over their
            health — so they don’t just track data, they truly understand it.
          </p>

          {/* Glow line */}
          <div className="mt-8 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#3D7773] to-transparent"></div>
        </motion.div>

        {/* ⚠️ RESPONSIBILITY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-14"
        >
          {/* subtle glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-30 blur-xl"></div>

          <div className="relative flex flex-col gap-6">

            <span className="text-sm tracking-[0.3em] text-[#3D7773] uppercase">
              Our Responsibility
            </span>

            <h3 className="text-2xl md:text-4xl font-medium text-white">
              Built for awareness, not medical decisions
            </h3>

            <p className="text-gray-400 max-w-3xl text-xl font-light leading-relaxed">
              HeartView Health is designed for general wellness and informational
              purposes. It helps you stay aware and organized — but it is not a
              replacement for professional medical advice.
            </p>

            {/* Points */}
            <div className="flex flex-col gap-3 text-xl font-light mt-4">
              {[
                "We do not provide medical diagnosis or treatment",
                "Always consult qualified healthcare professionals when needed",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[#3D7773]"></div>
                  <p className="text-gray-300 ">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}