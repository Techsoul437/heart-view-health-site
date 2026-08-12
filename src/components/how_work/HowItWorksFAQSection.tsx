"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

const faqs = [
  {
    question: "Can I access my laboratory reports?",
    answer: "Yes, supported laboratory reports can be accessed through your HeartView Health account.",
  },
  {
    question: "Can I view previous reports?",
    answer: "If previous reports are available in your account, you can access and review them.",
  },
  {
    question: "Can I track my health measurements over time?",
    answer: "Yes, where supported, you can review available measurements and compare previous results.",
  },
  {
    question: "Does HeartView Health diagnose medical conditions?",
    answer: "No. HeartView Health provides health information and informational insights; it does not replace professional diagnosis or medical advice.",
  },
  {
    question: "Can my doctor use my HeartView Health information?",
    answer: "Available information may help you discuss your health with your healthcare professional. Follow the sharing options provided by your account.",
  },
  {
    question: "How do I access my health reports?",
    answer: "Available reports can be accessed through your HeartView Health account once they are made available to you.",
  }
];

export default function HowItWorksFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10 text-black bg-white mb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center mb-16">
        <Headerbadge tag="FAQ" text="Frequently Asked Questions" />
        <div className="mt-2 h-1 w-20 bg-linear-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>
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
