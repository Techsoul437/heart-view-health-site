"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { CloudUpload, ShieldCheck, FolderLock, FileSearch, Info, ChevronRight } from "lucide-react";
import React from "react";

const steps = [
  {
    title: "Receive",
    desc: "Participating laboratories can upload reports through the HeartView Lab Portal.",
    icon: <CloudUpload className="text-[#2f5ba5]" size={36} strokeWidth={1.5} />,
  },
  {
    title: "Verify",
    desc: "User information can be verified using supported mobile number or email verification.",
    icon: <ShieldCheck className="text-[#2f5ba5]" size={36} strokeWidth={1.5} />,
  },
  {
    title: "Access",
    desc: "Once securely associated with the correct account, the report can be accessed by the user.",
    icon: <FolderLock className="text-[#2f5ba5]" size={36} strokeWidth={1.5} />,
  },
  {
    title: "Review",
    desc: "Users can review current and previous reports from their account.",
    icon: <FileSearch className="text-[#2f5ba5]" size={36} strokeWidth={1.5} />,
  },
];

export default function LabReportsSection() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10 text-black">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center">
        <Headerbadge tag="LABORATORY REPORTS" text="Your Laboratory Reports, Organized in One Place" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto -mt-3 mb-16 space-y-4"
        >
          <p className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
            Laboratory reports can be difficult to manage when they are stored across emails, messages, paper documents and different devices.
          </p>
          <p className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
            HeartView Health provides a centralized place for supported laboratory reports so users can access their health records more conveniently.
          </p>
        </motion.div>
      </div>

      {/* PROCESS FLOW SECTION */}
      <div className="max-w-8xl mx-auto relative px-2 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Connector Line (Desktop) */}
              {i !== steps.length - 1 && (
                <div className="hidden md:flex absolute top-[44px] left-[60%] w-full items-center justify-center -z-10">
                  <div className="h-[2px] border-b-2 border-dashed border-[#2f5ba5]/30 w-full relative">
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#2f5ba5] flex items-center justify-center text-white shadow-sm">
                      <ChevronRight size={14} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              )}

              {/* Connector Line (Mobile) */}
              {i !== steps.length - 1 && (
                <div className="md:hidden absolute top-[100%] left-1/2 -translate-x-1/2 h-8 flex flex-col items-center justify-center -z-10">
                   <div className="w-[2px] border-l-2 border-dashed border-[#2f5ba5]/30 h-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#2f5ba5] flex items-center justify-center text-white shadow-sm">
                      <ChevronRight size={12} strokeWidth={3} className="rotate-90" />
                    </div>
                   </div>
                </div>
              )}

              {/* Icon */}
              <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-[#f0f4f8] border border-[#2f5ba5]/10 flex items-center justify-center mb-6 shadow-sm shrink-0 aspect-square">
                {step.icon}
              </div>

              {/* Text */}
                          <h2 className="text-xl sm:text-xl lg:text-2xl font-medium h-10 text-[#2f5ba5] flex items-center justify-center">

                {step.title}
              </h2>
              <p className="text-base sm:text-lg text-[#64748B] font-light leading-relaxed px-2">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOOTER INFO BOX */}
      {/* <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-4xl mx-auto bg-[#f8fafc] border border-[#2f5ba5]/20 rounded-xl p-5 sm:p-6 flex items-start sm:items-center gap-4 shadow-sm"
      >
        <div className="shrink-0 rounded-full border-2 border-[#2f5ba5] w-8 h-8 flex items-center justify-center mt-0.5 sm:mt-0">
          <Info className="text-[#2f5ba5]" size={18} strokeWidth={2.5} />
        </div>
        <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
          All reports are securely handled to help you keep your important health information organized and easy to access in one place.
        </p>
      </motion.div> */}

    </section>
  );
}
