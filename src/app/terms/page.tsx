
import Termsmain from '@/components/legal/Termsmain'
import React from 'react'
  import type { Metadata } from "next";

 export const metadata: Metadata = {
  title: "Terms & Conditions | HeartView Health",
  description:
    "Review the Terms & Conditions for using HeartView Health, including user responsibilities, acceptable use, intellectual property rights, service policies, and legal agreements.",

  keywords: [
    "Terms and Conditions",
    "Terms of Service",
    "User Agreement",
    "Website Terms",
    "Legal Policies",
    "Healthcare Platform",
    "HeartView Health",
  ],

  alternates: {
    canonical: "https://www.heartviewhealth.com/terms",
  },

  openGraph: {
    title: "Terms & Conditions | HeartView Health",
    description:
      "Read the Terms & Conditions for using the HeartView Health platform, services, and website.",
    url: "https://www.heartviewhealth.com/terms",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | HeartView Health",
    description:
      "Review the Terms & Conditions governing the use of HeartView Health and its healthcare services.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
function page() {
  return (
    <div>
      <Termsmain></Termsmain>
    </div>
  )
}

export default page
