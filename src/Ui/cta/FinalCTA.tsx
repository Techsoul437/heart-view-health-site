"use client";

import { motion } from "framer-motion";
import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import Footer from "../footer/Footer";

export default function FinalCTA() {
  return (
    <section className="relative max-w-8xl mx-auto px-20 py-16 overflow-hidden">

      {/* MAIN BOX */}
      <div className="relative rounded-2xl border border-white/10 overflow-hidden">

        {/* ================= CTA WRAPPER — grid sirf yahan ================= */}
        <div className="relative ">

          {/* GRID — only CTA ke andar */}
          <div
            className="
              absolute inset-0 pointer-events-none
              opacity-10
              [background-image:linear-gradient(to_right,rgba(61,119,115,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(61,119,115,0.35)_1px,transparent_1px)]
              [background-size:48px_48px]
            "
          />

          {/* HALF ELLIPSE — top pe, center se nahi */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[56rem] h-[20rem] pointer-events-none">
            {/* Main teal glow */}
            <div
              className="
                w-full h-full
                bg-[radial-gradient(ellipse_at_top,rgba(61,119,115,0.65),transparent_65%)]
                blur-[40px]
              "
            />
            {/* Inner white hotspot */}
            <div
              className="
                absolute top-0 left-1/2 -translate-x-1/2
                w-[32rem] h-[10rem]
                bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_70%)]
                blur-2xl
              "
            />
          </div>

          {/* SOFT SPREAD — footer tak jaata hai */}
          <div
            className="
              absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none
              w-[72rem] h-[40rem]
              bg-[radial-gradient(ellipse_at_top,rgba(61,119,115,0.22),transparent_70%)]
              blur-[80px]
            "
          />

          {/* CTA CONTENT */}
          <div className="relative z-10 px-6 pt-20 pb-16 text-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1">
                Final CTA
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
            >
              Take the First Step Toward Better Health
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 max-w-2xl mx-auto text-lg md:text-base lg:text-xl font-light text-white/40"
            >
              Start tracking your health, get insights, and build better habits — all in one smart platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <FillButton text="Download App" href="#download" />
              <BorderButton text="Join Early Access" href="/contact" />
            </motion.div>
          </div>
        </div>

        {/* ================= FOOTER — no grid ================= */}
        <div className="relative z-10 pt-10 ">
          <Footer />
        </div>

      </div>
    </section>
  );
}