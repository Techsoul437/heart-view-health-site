
import Legal from '@/components/legal/Legal'
import React from 'react'
  import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | HeartView Health",
  description:
    "Read the Privacy Policy to understand how HeartView Health collects, uses, stores, shares, and protects your personal information and health-related data.",

  keywords: [
    "Privacy Policy",
    "Data Privacy",
    "Health Data Protection",
    "Personal Information",
    "Healthcare Privacy",
    "HIPAA",
    "User Privacy",
    "HeartView Health",
  ],

  alternates: {
    canonical: "https://www.heartviewhealth.com/privacy",
  },

  openGraph: {
    title: "Privacy Policy | HeartView Health",
    description:
      "Learn how HeartView Health collects, uses, stores, and protects your personal information and health data.",
    url: "https://www.heartviewhealth.com/privacy",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | HeartView Health",
    description:
      "Understand how HeartView Health safeguards your privacy and manages your personal and health-related information.",
  },

  robots: {
    index: true,
    follow: true,
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
