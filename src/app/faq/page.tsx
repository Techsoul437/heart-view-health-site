
import FAQMainSection from '@/components/faqs/FAQMainSection'
import FAQSection from '@/components/faqs/FAQSection'
import React from 'react'
  import type { Metadata } from "next";

  export const  metadata: Metadata = {
  title: "FAQs | HeartView Health",
  description:
    "Find answers to frequently asked questions about HeartView Health, account setup, health tracking, reports, security, and platform features.",
  keywords: [
    "HeartView Health FAQ",
    "health app FAQs",
    "health tracking help",
    "support",
    "questions",
    "healthcare platform",
    "HeartView Health",
  ],
  openGraph: {
    title: "FAQs | HeartView Health",
    description:
      "Get answers to common questions about HeartView Health and how to use our platform.",
    url: "https://www.heartviewhealth.com/faq",
    type: "website",
  },
};
function page() {
  return (
    <div>
<FAQMainSection></FAQMainSection>
    </div>
  )
}

export default page
