"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

import { faqs } from "@/data/faqs";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-8xl px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20  mt-10">
      <div className="max-w-8xl mx-auto pt-5  lg:pt-20 ">

        {/* Heading */}

        <Headerbadge tag="FAQs" text="Have Questions?" />
        <p className="text-[#64748B]   text-base text-center sm:text-lg font-light" >
          HeartView Health – Frequently Asked Questions
        </p>
        {/* FAQ Grid */}
        <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 overflow-hidden h-fit ${isOpen
                  ? "border-[#2f5ba5]/70 bg-black/5"
                  : "border-black/10 bg-white/[0.03] hover:border-black/20 hover:bg-black/5"
                  }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center font-[InterCustom] justify-between px-6 py-5 text-left gap-4"
                >
                  <span
                    className={`text-base sm:text-lg font-medium ${isOpen ? "text-black" : "text-black"
                      }`}
                  >
                    {faq.question}
                  </span>

                  {/* Icon */}
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen
                      ? "border-[#2f5ba5]/70 bg-[#2f5ba5]/70/20 rotate-45"
                      : "border-black/20 bg-black/5"
                      }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 ${isOpen ? "text-[#B4B0B0]" : "text-[#64748B]  "
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
                  <p className="px-6 pb-6 text-base sm:text-lg font-light text-[#64748B]   font-[InterCustom] leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#64748B]   text-md">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-[#2f5ba5] hover:text-[#769bb8] font-medium underline underline-offset-4"
            >
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}