"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import {
  HeartPulse,
  FileText,
  Clock,
  BarChart2,
  ClipboardList,
  Folder,
  History,
  Info,
  LineChart,
  Shield
} from "lucide-react";

// Section 1 Data
const features = [
  {
    title: "Health Tracking",
    desc: "Record and review supported health measurements such as heart rate, blood pressure, SpO₂, weight and other available metrics.",
    icon: <HeartPulse className="text-[#2f5ba5]" size={28} />,
  },
  {
    title: "Laboratory Reports",
    desc: "Keep your laboratory reports organized and access them from your HeartView Health account.",
    icon: <FileText className="text-[#2f5ba5]" size={28} />,
  },
  {
    title: "Health History",
    desc: "Review previous measurements and reports to keep your health information organized over time.",
    icon: <Clock className="text-[#2f5ba5]" size={28} />,
  },
  {
    title: "Health Insights",
    desc: "View simplified information about supported health data to make your records easier to understand.",
    icon: <BarChart2 className="text-[#2f5ba5]" size={28} />,
  },
];

// Section 2 Data
const steps = [
  {
    num: "01",
    title: "Track",
    desc: "Record supported health measurements and keep them organized.",
    icon: <ClipboardList className="text-[#2f5ba5]" size={22} />,
  },
  {
    num: "02",
    title: "Store",
    desc: "Access laboratory reports and health information from one place.",
    icon: <Folder className="text-[#2f5ba5]" size={22} />,
  },
  {
    num: "03",
    title: "Review",
    desc: "Look back at previous measurements and reports whenever needed.",
    icon: <History className="text-[#2f5ba5]" size={22} />,
  },
  {
    num: "04",
    title: "Understand",
    desc: "View supported health information in a clear and structured format.",
    icon: <Info className="text-[#2f5ba5]" size={22} />,
  },
  {
    num: "05",
    title: "Monitor",
    desc: "Follow changes in your recorded health information over time.",
    icon: <LineChart className="text-[#2f5ba5]" size={22} />,
  },
];

export default function Problem() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10">
      
      {/* ===== SECTION 1 ===== */}
      <div className="pt-10">
        <Headerbadge tag="EVERYTHING IN ONE PLACE" text="Everything You Need to Manage Your Health Information" />
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-base sm:text-lg font-light text-[#64748B] max-w-3xl mx-auto -mt-3 mb-12 leading-relaxed"
        >
          All your health data, organized and easy to access in your HeartView Health account.
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-xl p-6 sm:p-8 border border-black/10 bg-white transition-all duration-300 hover:border-[#2f5ba5]/40 hover:shadow-sm flex flex-col"
            >
              <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-full bg-[#f0f4f8]">
                {item.icon}
              </div>
              <h2 className="text-xl sm:text-xl lg:text-2xl text-gray-950 font-medium mb-3">
                {item.title}
              </h2>
              <p className="text-base sm:text-lg font-light text-[#64748B] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== SECTION 2 ===== */}
      <div className="mt-20 rounded-3xl bg-[#f9fafb] border border-black/5 p-8 sm:p-12 lg:p-16">
        <Headerbadge tag="WHAT YOU CAN DO" text="What You Can Do With HeartView Health" />
        
        <div className="grid gap-10 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-5 mt-12 relative">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`flex flex-col items-center text-center relative ${i === steps.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              
              {/* Desktop Connector Line */}
              {i !== steps.length - 1 && (
                <div className="hidden lg:flex absolute top-8 left-[50%] right-[-50%] items-center justify-center z-0">
                  <div className="w-full h-[1px] border-b border-dashed border-[#2f5ba5]/30 relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#2f5ba5] shadow-sm absolute"></div>
                  </div>
                </div>
              )}



              <div className="mb-2 sm:mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-[#2f5ba5]/10 relative z-10 shrink-0">
                {item.icon}
              </div>
              
              <h3 className="text-xl sm:text-xl lg:text-2xl text-gray-950 font-medium mb-4 relative pb-2 inline-block">
                {item.title}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#2f5ba5] rounded-full"></span>
              </h3>
              
              <p className="text-base sm:text-lg font-light text-[#64748B] leading-relaxed flex-1 mt-1">
                {item.desc}
              </p>
              
              {/* <div className="mt-8 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[#2f5ba5]/20 text-[#2f5ba5] font-medium text-sm">
                {item.num}
              </div> */}
            </motion.div>
          ))}
        </div>

        {/* <div className="mt-20 pt-6 border-t border-black/5 flex items-start sm:items-center justify-center gap-3 text-sm sm:text-base text-gray-500 font-light max-w-4xl mx-auto">
          <Shield className="text-[#2f5ba5] shrink-0 mt-0.5 sm:mt-0" size={20} />
          <p>Note: HeartView Health is not intended to diagnose, treat, or replace professional medical advice.</p>
        </div> */}
      </div>

    </section>
  );
}
