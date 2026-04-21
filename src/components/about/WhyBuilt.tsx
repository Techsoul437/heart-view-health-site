"use client";

import React from "react";
import { motion } from "framer-motion";

function WhyBuilt() {
  return (
    <section className="w-full overflow-hidden ">
      <div className="max-w-8xl mx-auto w-full pt-10  px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20  flex justify-center">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl flex flex-col items-center text-center"
        >

          {/* Badge */}
          <div className="py-4">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/30 rounded-full px-4 py-1">
              Why We Built
            </span>

            {/* Heading */}
            <h1 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-medium text-white">
              Why We Built HeartView Health
            </h1>
          </div>
          {/* Description */}
          <p className=" text-gray-400 text-base sm:text-lg leading-relaxed lg:max-w-3xl font-light mt-5">
            We saw people struggling with scattered health data, confusing reports, and no clear direction.
            So we built HeartView Health to make health simple, clear, and actionable.
          </p>

          {/* Subtext */}
          <p className="mt-8 text-white text-base sm:text-lg font-light">
            A platform that connects everything:
          </p>

          {/* Points */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {[
              "Monitoring", "Insights", "Organization", "Action"
            ].map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-45 text-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-base sm:text-lg  leading-relaxed font-light backdrop-blur-md"
              >
                {item}
              </motion.span>
            ))}
          </div>
          {/* Bottom */}
          <p className="mt-8 text-gray-400 text-base sm:text-lg leading-relaxed font-light">
            So users don’t just collect data{" "}
            <span className="text-white font-medium">
              they understand and use it.
            </span>
          </p>

        </motion.div>
      </div>
    </section>
  );
}

export default WhyBuilt;