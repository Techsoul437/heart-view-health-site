"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

const faqs = [
  {
    question: "Can I securely access my laboratory reports through my HeartView Health account?",
    answer:
      "Yes, supported laboratory reports can be securely accessed and reviewed through your HeartView Health account. Once your reports have been processed and made available, you can conveniently view the available information from your account whenever you need it. This makes it easier to keep your important health records organized and accessible.",
  },
  {
    question: "Can I view my previous laboratory reports and compare them with newer results?",
    answer:
      "Yes, if your previous laboratory reports are available in your HeartView Health account, you can access and review them along with your newer results. Reviewing previous reports can help you understand how your health information has changed over time. It can also make it easier to have meaningful and informed conversations with your healthcare professional.",
  },
  {
    question: "Can I track my health measurements and monitor changes over time?",
    answer:
      "Yes, where supported, HeartView Health allows you to review available health measurements and compare your current information with previous records. Keeping track of your measurements over time can help you better understand changes in your health information and recognize patterns in your available data. This information can also support more informed discussions with your healthcare provider.",
  },
  {
    question: "Does HeartView Health diagnose medical conditions or provide professional medical advice?",
    answer:
      "No. HeartView Health provides health information, reports, and informational insights designed to help you better understand your available health data. The information provided through the platform is not intended to replace professional medical diagnosis, treatment, or advice. Always consult a qualified healthcare professional for medical concerns, diagnosis, or treatment decisions.",
  },
  {
    question: "Can my doctor or healthcare professional review and use my HeartView Health information?",
    answer:
      "Your available HeartView Health information may help you have more informed and productive conversations with your doctor or other healthcare professionals. Where sharing features are supported, you can use the options available through your account to share relevant health information with your healthcare provider. Your healthcare professional can then consider this information alongside your overall health and medical history.",
  },
  {
    question: "How can I access and review my health reports on HeartView Health?",
    answer:
      "You can access your available health reports directly through your HeartView Health account. Reports will become accessible once they have been successfully processed and made available to you. After they are available, you can conveniently review your reports and keep track of the health information provided through your account.",
  },
];

export default function HowItWorksFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 text-black bg-white mt-10">
      
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
