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

          <Headerbadge tag="OUR STORY" text="Built to Bridge the Gap Between Information and Understanding " />

          {/* Description */}
          <p className=" text-[#64748B]   text-base sm:text-lg leading-relaxed lg:max-w-3xl font-light mt-5">
            Healthcare data is becoming increasingly accessible, yet many individuals struggle to interpret what it means for their daily lives. 

          </p>

          {/* Subtext */}
          <p className="mt-8 text-[#64748B] lg:max-w-3xl  text-base sm:text-lg font-light">
          HeartView Health was created to simplify health management by turning fragmented information into clear, personalized insights that support informed decision-making.
          </p>

          {/* Points */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {[
              "Clarity", "Visibility", "Engagement", "Confidence"
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
          {/* <p className="mt-8 text-[#64748B]   text-base sm:text-lg leading-relaxed font-light">
            So users don’t just collect data{" "}
            <span className="text-black font-medium">
              they understand and use it.
            </span>
          </p> */}

        </motion.div>
      </div>
    </section>
  );
}

export default WhyBuilt;