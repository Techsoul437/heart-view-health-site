"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import {
  UserPlus,
  FilePlus2,
  FileText,
  BarChart3,
  History,
  CalendarCheck,
} from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Create your HeartView Health account and access the health information and features available to you.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Add & Receive Health Information",
    description:
      "Add supported health information or receive available reports and measurements through your account.",
    icon: FilePlus2,
  },
  {
    number: "03",
    title: "Access Your Health Reports",
    description:
      "View your available laboratory reports digitally and keep your health records easier to access.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Understand Your Results",
    description:
      "Review supported health measurements in a clear, organized format designed to make your information easier to follow.",
    icon: BarChart3,
  },
  {
    number: "05",
    title: "Track Changes Over Time",
    description:
      "Compare available previous measurements and follow changes in your recorded health information.",
    icon: History,
  },
  {
    number: "06",
    title: "Manage Your Healthcare",
    description:
      "Keep supported appointments, appointment details, and medication information organized in one place.",
    icon: CalendarCheck,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HowItWorksSteps() {
  return (
    <section className="w-full max-w-7xl mx-auto mt-10  px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-0">
      <Headerbadge tag="Process" text="Simple Steps to Better Health" />

      <div className="text-center mt-3 mb-10">

        <p className="text-[#64748B] max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Follow these clear steps to organize your health data, understand your results, and manage your wellness journey seamlessly.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="relative group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(47,91,165,0.12)] transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Background Number Watermark */}
              <div className="absolute -right-4 -top-6 text-[120px] font-black text-gray-50/50 group-hover:text-[#2f5ba5]/5 transition-colors duration-500 pointer-events-none select-none leading-none z-0">
                {step.number}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-[#2f5ba5]/10 text-[#2f5ba5] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2f5ba5] group-hover:text-white transition-all duration-300">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Step Number Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold text-[#2f5ba5] tracking-wider">STEP {step.number}</span>
                  {/* <div className="h-px w-8 bg-[#2f5ba5]/30"></div> */}
                </div>

                {/* Content */}
                <h2 className="text-xl sm:text-xl lg:text-2xl font-medium h-16 text-black flex ">

                  {step.title}
                </h2>
                <p className="text-[#64748B] font-light  text-lg leading-relaxed grow">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
