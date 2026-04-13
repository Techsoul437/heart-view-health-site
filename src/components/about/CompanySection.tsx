"use client";

import { motion } from "framer-motion";

export default function CompanySection() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute " />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-[#3D7773]/10 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* Heading */}
  <div className="w-full py-4 text-center">

                {/* Badge */}
                <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                >
                   Our Company
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
                           Built with Trust & Transparency
                </motion.h1>

            </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-14"
        >
          {/* Glow Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#3D7773]/20 via-transparent to-[#45657D]/20 opacity-40 blur-xl" />

          <div className="relative z-10 flex flex-col gap-8 text-center">
            
            {/* Company Name */}
            <h3 className="text-white text-xl md:text-2xl font-medium">
              HeartView Health Technologies Private Limited
            </h3>

            {/* Divider */}
            <div className="w-16 h-[0.15rem] mx-auto bg-gradient-to-r from-[#3D7773] to-[#45657D] rounded-full" />

            {/* Description */}
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Incorporated in India under the Companies Act, 2013, HeartView Health is built with a vision to create a reliable and transparent platform for everyday health management.
            </p>

            {/* Tag Pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {[
                "India Registered Company",
                "Healthcare Technology",
                "Trusted Platform",
              ].map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm backdrop-blur-md"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}