
import Medical from '@/components/legal/Medical'
import React from 'react'
  import type { Metadata } from "next";

 export const metadata: Metadata = {
  title: "Medical Disclaimer | HeartView Health",
  description:
    "Read the Medical Disclaimer for HeartView Health to understand the limitations of the information provided on our platform. Our content is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.",

  keywords: [
    "Medical Disclaimer",
    "Health Disclaimer",
    "Medical Information",
    "Professional Medical Advice",
    "Healthcare Platform",
    "Health Content Disclaimer",
    "HeartView Health",
  ],

  alternates: {
    canonical: "https://heartviewhealth.com//medical-disclaimer",
  },

  openGraph: {
    title: "Medical Disclaimer | HeartView Health",
    description:
      "Understand the limitations of the health information provided by HeartView Health and why it should not replace professional medical advice.",
    url: "https://heartviewhealth.com//medical-disclaimer",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Medical Disclaimer | HeartView Health",
    description:
      "Review the Medical Disclaimer for HeartView Health to understand the scope and limitations of the health information available on our platform.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
function page() {
  return (
    <div>
      <Medical></Medical>
    </div>
  )
}

export default page
