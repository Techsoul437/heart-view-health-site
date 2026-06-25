
import Termsmain from '@/components/legal/Termsmain'
import React from 'react'
  import type { Metadata } from "next";

  export const  metadata: Metadata = {
  title: "Terms & Conditions | HeartView Health",
  description:
    "Review the Terms & Conditions governing the use of HeartView Health, including user responsibilities, acceptable use, intellectual property, and service policies.",
  keywords: [
    "terms and conditions",
    "terms of service",
    "HeartView Health",
    "user agreement",
    "website terms",
    "legal",
  ],
  openGraph: {
    title: "Terms & Conditions | HeartView Health",
    description:
      "Read the Terms & Conditions for using the HeartView Health platform and services.",
    url: "https://www.heartviewhealth.com/terms",
    type: "website",
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
