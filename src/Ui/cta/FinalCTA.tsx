"use client";

import { motion } from "framer-motion";
import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import Footer from "../footer/Footer";

export default function FinalCTA() {
  return (
    <section className="relative w-full max-w-screen-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 py-12 sm:py-16 overflow-hidden">

      {/* MAIN BOX */}
      <div className="relative rounded-2xl border border-white/10 overflow-hidden">

        <div className="relative">

          {/* GRID */}
          <div
            className="
              absolute inset-0 pointer-events-none opacity-10
              [background-image:linear-gradient(to_right,rgba(61,119,115,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(61,119,115,0.35)_1px,transparent_1px)]
              [background-size:40px_40px] sm:[background-size:48px_48px]
            "
          />

          {/* GLOW */}
          <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl h-40 sm:h-56 lg:h-72 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(61,119,115,0.65),transparent_65%)] blur-3xl" />
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_70%)] blur-xl" />
          </div>

          {/* SOFT SPREAD */}
          <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl lg:max-w-6xl h-64 sm:h-80 lg:h-96 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(61,119,115,0.22),transparent_70%)] blur-[60px]" />

          {/* CONTENT */}
          <div className="relative z-10 px-4 sm:px-6 pt-10 xl:pt-20 text-center">

            {/* TAG */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4 sm:mb-6"
            >
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/30 rounded-full px-3 py-1 sm:px-4">
                Final CTA
              </span>
            </motion.div>

            {/* HEADING */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white"
            >
              Take the First Step Toward Better Health
            </motion.h2>

            {/* TEXT */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg  leading-relaxed  font-light text-white/50"
            >
              Start tracking your health, get insights, and build better habits — all in one smart platform.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <FillButton text="Download App" href="#download" />
              <BorderButton text="Join Early Access" href="/contact" />
            </motion.div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 pt-0 sm:pt-10">
          <Footer />
        </div>

      </div>
    </section>
  );
}