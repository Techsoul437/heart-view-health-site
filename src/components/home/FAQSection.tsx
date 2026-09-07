"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

const faqs = [
  {
    "question": "What is HeartView Health and how does it support your wellness?",
    "answer": "HeartView Health is a digital wellness platform that combines a mobile app with compatible wearable technology. It helps you monitor heart rate, activity, sleep, and other wellness metrics in one place. The platform turns your data into simple trends and personalized insights. It is designed to help you build healthier habits and better understand your everyday wellness."
  },
  {
    "question": "Is HeartView Health a medical device or diagnostic platform?",
    "answer": "No, HeartView Health is designed for general wellness and fitness tracking purposes only. It is not a medical device and should not be used to diagnose, treat, or prevent any disease or medical condition. The information provided is intended for general awareness and lifestyle tracking. Always consult a qualified healthcare professional for medical advice or treatment."
  },
  {
    "question": "Can I use HeartView Health to make medical or treatment decisions?",
    "answer": "No, HeartView Health should not be used to make medical, medication, or treatment decisions. The app provides general wellness trends and insights rather than clinically validated medical diagnoses. You should never change medication or treatment based only on information from the platform. If you have health concerns, always discuss them with a qualified healthcare professional."
  },
  {
    "question": "What types of health and wellness data can HeartView Health track?",
    "answer": "HeartView Health can track various wellness metrics depending on your connected devices and apps. These may include heart rate, resting heart rate, heart rate variability, steps, activity, workouts, sleep, and calorie-related estimates. You may also be able to upload reports and add personal health notes. Supported integrations can bring additional wellness information into one centralized dashboard."
  },
  {
    "question": "Do I need a subscription to use HeartView Health?",
    "answer": "HeartView Health offers both basic and premium features to support different user needs. Basic features may include heart rate tracking, activity monitoring, step counting, and report uploads. Premium plans may provide advanced analytics, AI-powered insights, personalized recommendations, and detailed reports. Subscription options and available features may vary, so users should check the current plan details."
  },
  {
    "question": "How does HeartView Health protect my personal and health data?",
    "answer": "HeartView Health takes the privacy and security of your personal and wellness information seriously. The platform may use encryption, secure cloud infrastructure, access controls, authentication, and security monitoring to protect your data. Connected third-party services may have their own privacy and security policies. While we use appropriate safeguards, no online system can guarantee complete security."
  },
  {
    "question": "Does HeartView Health sell my personal or health data to third parties?",
    "answer": "No, HeartView Health does not sell your personal identifying information or individual health data to third-party data brokers, advertisers, or marketers. Information may be used to provide, maintain, secure, and improve the platform according to the applicable privacy policy. Aggregated or de-identified information may also be used for analytics and product improvement. Your privacy and responsible handling of your information remain important priorities."
  },
  {
    "question": "Can I connect HeartView Health with other health apps and devices?",
    "answer": "Yes, HeartView Health is designed to connect with compatible health platforms and wearable devices. Depending on available integrations, you may be able to connect services such as Apple Health and Google Fit. This can help bring activity, sleep, workout, weight, and other wellness information into one place. The available data depends on your connected device, application, and granted permissions."
  },
  {
    "question": "What should I do if HeartView Health shows incorrect or unusual data?",
    "answer": "If you notice incorrect or unusual data, first check that your wearable is properly fitted, clean, charged, and connected to the app. You can also restart the device or application and allow time for synchronization. Wearable readings may sometimes be affected by movement, sensor contact, or technical limitations. Never use an unusual reading for medical decisions, and contact a healthcare professional if you have health concerns."
  }
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
