"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Built for Daily Life",
    desc: "Designed to fit naturally into your everyday routine without extra effort.",
  },
  {
    title: "No Complicated Setup",
    desc: "Start instantly with a simple and intuitive experience no learning curve.",
  },
  {
    title: "Fits Into Routine",
    desc: "Seamlessly blends into your lifestyle so you stay consistent effortlessly.",
  },
  {
    title: "Consistency Made Easy",
    desc: "Stay on track without thinking too much everything works quietly in the background.",
  },
];

export default function LifestyleSection() {
  return (
    <section className="text-white pt-10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20">

        {/* Heading */}
        <div className="w-full py-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/30 rounded-full px-4 py-1"
          >
            Lifestyle
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight"
          >
            Designed for Your Everyday Lifestyle
          </motion.h1>
        </div>

        {/* Timeline */}
        <div className="relative mt-5">

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#3D7773]/30 -translate-x-1/2" />

          <div className="space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch"
              >
                {/* LEFT */}
                <div
                  className={`hidden md:flex ${
                    index % 2 === 0 ? "justify-end pr-4 lg:pr-6" : ""
                  }`}
                >
                  {index % 2 === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="max-w-sm text-right flex flex-col justify-center min-h-40"
                    >
                      <h2 className="text-xl lg:text-2xl font-medium text-[#3D7773]">
                        {step.title}
                      </h2>

                      <p className="text-gray-400 mt-2 text-base sm:text-lg leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* CENTER */}
                <div className="flex justify-center items-center relative min-h-40">
                  <div className="w-10 h-10 rounded-full bg-[#3D7773]/10 border border-[#3D7773]/40 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3D7773]" />
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className={`hidden md:flex ${
                    index % 2 !== 0 ? "justify-start pl-4 lg:pl-6" : ""
                  }`}
                >
                  {index % 2 !== 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="max-w-sm text-left flex flex-col justify-center min-h-40"
                    >
                      <h2 className="text-xl lg:text-2xl font-medium text-[#3D7773]">
                        {step.title}
                      </h2>

                      <p className="text-gray-400 mt-2 text-base sm:text-lg leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* MOBILE */}
                <div className="md:hidden text-center py-6">
                  <h3 className="text-lg font-semibold text-[#3D7773]">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mt-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}