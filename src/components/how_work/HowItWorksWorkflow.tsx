"use client";

import React from "react";
import { motion } from "framer-motion";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { FilePlus, CloudUpload, Folder, BarChart2, LineChart, Info } from "lucide-react";

const workflowSteps = [
  {
    label: "Report Available",
    description: "Your report is uploaded and received.",
    icon: FilePlus
  },
  {
    label: "Added to Your Account",
    description: "It is securely added to your HeartView account.",
    icon: CloudUpload
  },
  {
    label: "Report Accessed",
    description: "You can access your report anytime.",
    icon: Folder
  },
  {
    label: "Results Reviewed",
    description: "Review and understand your health results.",
    icon: BarChart2
  },
  {
    label: "Previous Results Compared",
    description: "Compare with your past results and track changes.",
    icon: LineChart
  },
];

export default function HowItWorksWorkflow() {
  return (
    <section className="max-w-480 mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10 overflow-hidden">
      <div className="flex flex-col items-center text-center mb-16">
        <Headerbadge tag="WORKFLOW" text="What Happens to Your Report?" />
        <div className="mt-2 h-1 w-20 bg-linear-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>
      </div>

      <div className="relative mt-8  w-full mx-auto">

        {/* Mobile View - Vertical Stack */}
        <div className="flex flex-col gap-6 lg:hidden">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
              >
                <div className="w-16 h-16 bg-[#f4f7f9] rounded-full flex items-center justify-center text-[#2f5ba5] mb-4">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-black text-base mb-2">
                  {step.label}
                </h3>
                <p className="text-[#64748B] text-lg font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop View - Horizontal Layout with Dashed Lines */}
        <div className="hidden lg:flex flex-row items-stretch justify-between relative">

          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === workflowSteps.length - 1;

            return (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] w-full  z-10 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-20 h-20 bg-[#f4f7fb] rounded-full flex items-center justify-center text-[#2f5ba5] mb-5">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl sm:text-xl lg:text-2xl font-medium  text-black  mb-3 group-hover:text-[#2f5ba5] transition-colors duration-300">

                    {step.label}
                  </h3>
                  <p className="text-[#64748B] text-lg font-light leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connecting Dashed Line */}
                {!isLast && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    className="flex-1 flex items-center relative z-0 min-w-[20px] mx-1"
                  >
                    <div className="w-full h-0 border-t-2 border-dashed border-[#2f5ba5]/80 relative flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#2f5ba5] absolute -left-1"></div>
                      <div className="w-2 h-2 rounded-full bg-[#2f5ba5] absolute -right-1"></div>
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

    </section>
  );
}
