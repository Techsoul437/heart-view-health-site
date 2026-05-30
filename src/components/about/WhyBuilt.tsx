"use client";

import React from "react";
import { motion } from "framer-motion";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

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

          <Headerbadge tag=" Why We Built" text="Why We Built HeartView Health" />

          {/* Description */}
          <p className=" text-[#64748B]   text-base sm:text-lg leading-relaxed lg:max-w-3xl font-light mt-5">
            We saw people struggling with scattered health data, confusing reports, and no clear direction.
            So we built HeartView Health to make health simple, clear, and actionable.
          </p>

          {/* Subtext */}
          <p className="mt-8 text-black text-base sm:text-lg font-light">
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
                className="w-45 text-center px-5 py-2 rounded-full border border-black/10 bg-black/5 text-[#64748B] text-base sm:text-lg  leading-relaxed font-light backdrop-blur-md"
              >
                {item}
              </motion.span>
            ))}
          </div>
          {/* Bottom */}
          <p className="mt-8 text-[#64748B]   text-base sm:text-lg leading-relaxed font-light">
            So users don’t just collect data{" "}
            <span className="text-black font-medium">
              they understand and use it.
            </span>
          </p>

        </motion.div>
      </div>
    </section>
  );
}

export default WhyBuilt;