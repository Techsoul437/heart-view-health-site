"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs = [
  {
    question: "What is HeartView Health?",
    answer: `HeartView Health is a digital platform that combines a mobile app and wearable technology to help you monitor and understand your heart-related wellness data.
     It provides insights based on  heart rate, and lifestyle patterns to support better awareness of your heart health.`,
  },
  {
    question: "Is HeartView Health a medical device?",
    answer: `No.

HeartView Health is designed for general wellness purposes only and is not intended for medical diagnosis, treatment, or prevention of any disease.`,
  },
  {
    question: "Can I rely on HeartView Health for medical decisions?",
    answer: `No.

You should not rely on the app or device for medical decisions. Always consult a qualified healthcare professional for diagnosis or treatment.`,
  },
  {
    question: "What kind of data does the app track?",
    answer: `The app may track and analyze:
• Heart rate  
• Activity levels  
• User-uploaded reports and notes  
• Data from connected apps like Apple Health or Google Fit`,
  },
  {
    question: "Does HeartView Health replace a doctor?",
    answer: `No.

HeartView Health is not a replacement for medical professionals and does not provide clinical care.`,
  },
  {
    question: "Do I need a subscription to use the app?",
    answer: `Some features may be available for free, while advanced insights and analytics may require a monthly or yearly subscription.`,
  },
  {
    question: "Are subscriptions refundable?",
    answer: `No.

All subscription payments are non refundable, unless required by applicable law.`,
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: `Yes.

You can cancel your subscription at any time, but cancellation will apply to future billing cycles.`,
  },
  {
    question: "Does the app store my health data?",
    answer: `Yes.

Your data is stored securely to provide insights and improve your experience.`,
  },
  {
    question: "Is my data safe?",
    answer: `We use security measures such as encryption and secure systems.

However:
 No digital system is completely secure 
There is always a risk of unauthorized access`,
  },
  {
    question: "Does HeartView Health sell my data?",
    answer: `No.

We do not sell your personal or health data.`,
  },
  {
    question: "Can I delete my data?",
    answer: `Yes.

You can request deletion of your data through support channels.`,
  },
  {
    question: "Can I connect other apps or devices?",
    answer: `Yes.

HeartView Health may integrate with platforms like:
• Apple Health  
• Google Fit`,
  },
  {
    question: "What happens if the device or app gives incorrect data?",
    answer: `The app provides informational insights only.

You should not rely on the data for medical decisions, and the company is not responsible for inaccuracies.`,
  },
  {
    question: "Who owns the data I upload?",
    answer: `You retain ownership of your data.

However, you grant us permission to process and analyze it to provide the Services.`,
  },
  {
    question: "What if there is a data breach?",
    answer: `While we take security seriously, no system is fully secure.

👉 HeartView Health is not liable for data breaches to the extent permitted by law.`,
  },
  {
    question: "Where is HeartView Health available?",
    answer: `Currently, HeartView Health is designed for users across India, with plans for global expansion.`,
  },
  {
    question: "How can I contact support?",
    answer: `You can contact us at:

📧 info@heartviewhealth.com`,
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-[1800px] mx-auto mt-5">
       
        {/* Heading */}
        <div className="text-center mb-10">
           <div className="inline-flex text-center items-center gap-2 mb-2 px-3 py-1.5 rounded-full ">
          <span className="inline-block text-xs justify-content-center font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1">
            FAQs
          </span>
        </div>
          <h2 className=" text-3xl md:text-4xl lg:text-5xl font-medium  text-white leading-tight">
            Have Questions?
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg font-[InterCustom]" >
            HeartView Health – Frequently Asked Questions
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 overflow-hidden h-fit ${isOpen
                  ? "border-[#3D7773]/50 bg-white/5"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/5"
                  }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center font-[InterCustom] justify-between px-6 py-5 text-left gap-4"
                >
                  <span
                    className={`text-sm sm:text-base font-[InterCustom] font-medium ${isOpen ? "text-white" : "text-gray-200"
                      }`}
                  >
                    {faq.question}
                  </span>

                  {/* Icon */}
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen
                      ? "border-[#3D7773] bg-[#3D7773]/20 rotate-45"
                      : "border-white/20 bg-white/5"
                      }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 ${isOpen ? "text-[#B4B0B0]" : "text-gray-400"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 4v16M4 12h16"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 ease-in-out ${isOpen
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0"
                    } overflow-hidden`}
                >
                  <p className="px-6 pb-6 text-sm sm:text-base text-gray-400 font-[InterCustom] leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-md">
            Still have questions?{" "}
            <a
              href="mailto:info@heartviewhealth.com"
              className="text-[#5a9e9a] hover:text-[#769bb8] font-medium underline underline-offset-4"
            >
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}