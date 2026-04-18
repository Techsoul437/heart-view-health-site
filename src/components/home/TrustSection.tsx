"use client";

import { motion, useInView } from "framer-motion";
import { ShieldCheck, Sparkles, LineChart } from "lucide-react";
import { useRef } from "react";

export default function TrustSection() {
      const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const items = [
    {
      icon: ShieldCheck,
      title: "Built for Long-Term Health",
      desc: "Created to support steady, real-world habits that grow into meaningful awareness over time.",
    },
    {
      icon: Sparkles,
      title: "Clarity Over Noise",
      desc: "Everything is simplified so you can focus only on what truly matters.",
    },
    {
      icon: LineChart,
      title: "Consistency That Stays",
      desc: "Designed to naturally fit your routine without adding effort or friction.",
    },
  ];

  const trustPoints = [
    "No unnecessary complexity",
    "Designed for everyday use",
    "Clear insights, not data overload",
    "Built with consistency in mind",
  ];

  return (
    <section className="w-full text-white pt-10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20">

        {/* Heading */}
   
  <div ref={headerRef} className="w-full py-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block rounded-full border-2 border-white/30 py-1 pl-4 pr-4 text-xs font-semibold uppercase tracking-widest text-[#3D7773]"
          >
            Trust
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-2xl font-medium text-white md:text-3xl lg:text-4xl"
          >
            {/* Problems That Sparked Better Experiences */}
                       Built on Trust, Designed for Everyday Reality

          </motion.h1>
        </div>
        {/* Features (FIXED GRID ALIGNMENT) */}
        <div className="grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-15 mt-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-start gap-4 group  mx-auto"
              >
                {/* FIXED ICON SIZE */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3D7773]/15 border border-[#3D7773]/20 text-[#3D7773] shrink-0 group-hover:scale-110 transition">
                  <Icon size={18} />
                </div>

                {/* TEXT */}
                <div>
                  <h2 className="text-xl sm:text-xl lg:text-2xl mb-2 group-hover:text-[#3D7773] transition">
                    {item.title}
                  </h2>
                  <p className="text-base sm:text-lg   font-light text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CENTER STATEMENT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-base sm:text-lg font-medium text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A calm, reliable system that works quietly in the background — helping you stay aware without turning health into effort.
        </motion.p>

        {/* TRUST POINTS */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-base sm:text-lg  leading-relaxed  font-light text-gray-400">
          {trustPoints.map((point, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#3D7773] rounded-full" />
              {point}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-[#3D7773]/20 to-transparent" />
      </div>
    </section>
  );
}