"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

const faqs = [
  {
    question: "What health metrics can I track with HeartView Health?",
    answer: "You can track a comprehensive range of health measurements including heart rate, blood pressure, SpO2, blood sugar, weight, and BMI. Our platform allows you to monitor these metrics over time to identify trends and improve your overall wellbeing.",
  },
  {
    question: "How do I connect my wearable devices?",
    answer: "HeartView Health seamlessly integrates with popular health platforms like Apple Health and Google Fit. Once connected, your daily activity and health metrics from supported wearables will automatically sync to your dashboard.",
  },
  {
    question: "Are my laboratory reports stored securely?",
    answer: "Yes, security and privacy are our top priorities. Your laboratory reports and health information are encrypted and stored securely, ensuring that only you have access to your personal health data.",
  },
  {
    question: "Can I set reminders for my medications?",
    answer: "Absolutely. The platform includes a comprehensive medication tracking system that allows you to set custom reminders for your prescriptions, supplements, and daily routines, helping you stay consistent with your health plan.",
  },
  {
    question: "How does the Smart Health Insights feature work?",
    answer: "Smart Health Insights analyzes your recorded health data over time to provide you with visual charts, personalized indicators, and benchmark comparisons. This helps you understand what's improving and what might need your attention.",
  }
];

export default function FeatureFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10 text-black bg-white mb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center mb-16">
        <Headerbadge tag="FEATURES FAQ" text="Frequently Asked Questions About Features" />
        <div className="mt-2 h-1 w-20 bg-gradient-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>
      </div>

      {/* FAQ ACCORDION LIST */}
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
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
