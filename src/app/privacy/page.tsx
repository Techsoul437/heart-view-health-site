
import Legal from '@/components/legal/Legal'
import React from 'react'
  import type { Metadata } from "next";

  export const  metadata: Metadata = {
  title: "Privacy Policy | HeartView Health",
  description:
    "Read the Privacy Policy to understand how HeartView Health collects, uses, stores, and protects your personal and health-related information.",
  keywords: [
    "privacy policy",
    "data privacy",
    "HeartView Health",
    "user privacy",
    "health data",
    "data protection",
  ],
  openGraph: {
    title: "Privacy Policy | HeartView Health",
    description:
      "Learn how HeartView Health collects, uses, and protects your personal information and health data.",
    url: "https://www.heartviewhealth.com/privacy",
    type: "website",
  },
};
function page() {
  return (
    <div>
<Legal></Legal>
    </div>
  )
}

export default page
