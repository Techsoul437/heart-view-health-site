"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { User, HeartPulse, Users, FlaskConical } from "lucide-react";
import React from "react";

const audiences = [
  {
    title: "Individuals",
    desc: "Keep your health information and laboratory reports organized in one place.",
    icon: <User className="text-[#2f5ba5] w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
  },
  {
    title: "Health-Conscious Users",
    desc: "Track supported health measurements and review changes over time.",
    icon: <HeartPulse className="text-[#2f5ba5] w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
  },
  {
    title: "Families",
    desc: "Keep important health records easier to access and manage.",
    icon: <Users className="text-[#2f5ba5] w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
  },
  {
    title: "Participating Laboratories",
    desc: "Digitally deliver laboratory reports to verified users through the HeartView Lab Portal.",
    icon: <FlaskConical className="text-[#2f5ba5] w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
  },
];

export default function WhoItsFor() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10  py-5 text-black bg-[#fafafa]">

      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center">
        <Headerbadge tag="WHO IT’S FOR" text="Who Can Use HeartView Health?" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto -mt-3 mb-20"
        >
          <p className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
            HeartView Health is designed for everyone who wants to keep health information organized, accessible and easy to understand.
          </p>
        </motion.div>
      </div>

      {/* GRID SECTION */}
      <div className="max-w-8xl mx-auto relative mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 gap-y-12 lg:gap-y-0">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center relative px-4 lg:py-0"
            >
              {/* Vertical Divider (Desktop) */}
              {i !== audiences.length - 1 && (
                <div className="hidden lg:flex absolute top-0 bottom-0 right-0 items-center justify-center z-0 translate-x-1/2">
                  <div className="w-[1px] h-full border-r border-dashed border-[#2f5ba5]/30 relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#4285f4] shadow-sm absolute"></div>
                  </div>
                </div>
              )}



              {/* Icon Container with glowing background */}
              <div className="relative mb-2 sm:mb-8">
                <div className="absolute inset-0 bg-[#eef4ff] blur-xl rounded-full opacity-70 scale-125"></div>
                <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-white border border-[#2f5ba5]/10 flex items-center justify-center shadow-sm relative z-10 shrink-0 aspect-square">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border border-[#2f5ba5]/20 flex items-center justify-center bg-white shadow-sm">
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <h2 className="text-xl sm:text-xl lg:text-2xl font-medium h-16 text-black flex items-center justify-center">

                {item.title}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#4285f4] rounded-full"></span>
              </h2>

              <p className="text-base sm:text-lg   xl:max-w-xl text-[#64748B]   mb-2 leading-relaxed font-light text-center line-clamp-2">

                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
