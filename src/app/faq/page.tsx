
import FAQMainSection from '@/components/faqs/FAQMainSection'
import FAQSection from '@/components/faqs/FAQSection'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | HeartView Health",
  description:
    "Find answers to frequently asked questions about HeartView Health, including account setup, health tracking, medical reports, data security, subscriptions, and platform features.",

  keywords: [
    "HeartView Health FAQ",
    "Frequently Asked Questions",
    "Health Tracking Help",
    "Healthcare Platform",
    "Medical Reports",
    "Health App Support",
    "Customer Support",
    "HeartView Health",
  ],

  alternates: {
    canonical: "https://www.heartviewhealth.com/faq",
  },

  openGraph: {
    title: "FAQs | HeartView Health",
    description:
      "Get answers to common questions about HeartView Health, health tracking, account management, reports, and platform features.",
    url: "https://www.heartviewhealth.com/faq",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "FAQs | HeartView Health",
    description:
      "Browse frequently asked questions about HeartView Health and learn how to make the most of our healthcare platform.",
  },

  robots: {
    index: true,
    follow: true,
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
