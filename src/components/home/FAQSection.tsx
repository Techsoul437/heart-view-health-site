"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

const faqs = [
  {
    question: "What is HeartView Health?",
    answer: "HeartView Health is a digital health platform that helps users organize health information, track supported measurements and access laboratory reports.",
  },
  {
    question: "Can I store my laboratory reports?",
    answer: "Yes. Supported laboratory reports can be associated with your HeartView Health account and accessed from your report history.",
  },
  {
    question: "Can I track my health measurements?",
    answer: "Yes. The platform supports tracking of available health measurements such as heart rate, blood pressure, SpO₂ and weight.",
  },
  {
    question: "Can I view previous reports?",
    answer: "Yes. Reports associated with your account can be accessed from your report history.",
  },
  {
    question: "Does HeartView Health provide medical diagnosis?",
    answer: "No. HeartView Health is designed to help users organize and understand supported health information. It does not replace professional medical diagnosis or treatment.",
  },
  {
    question: "How are laboratory reports connected to my account?",
    answer: "Participating laboratories can use supported user verification information to associate a report with the correct HeartView Health account.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first one by default for presentation

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10 text-black bg-white">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center mb-16">
        <Headerbadge tag="FAQ" text="Frequently Asked Questions" />
      </div>

      {/* FAQ ACCORDION SECTION */}
      <div className="max-w-4xl mx-auto space-y-4 relative z-10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`rounded-xl overflow-hidden transition-all duration-300 border ${
                isOpen
                  ? "bg-[#f4f7f9] border-[#2f5ba5] shadow-sm"
                  : "bg-white border-black/10 hover:border-black/20"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-950">
                  {faq.question}
                </span>

                <div
                  className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    isOpen
                      ? "border-[#2f5ba5]/40 text-[#2f5ba5] bg-white"
                      : "border-black/20 text-gray-500 bg-[#f8fafc]"
                  }`}
                >
                  {isOpen ? (
                    <X size={16} strokeWidth={2} />
                  ) : (
                    <Plus size={16} strokeWidth={2} />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-0">
                      <p className="text-[#64748B] text-base sm:text-lg font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
