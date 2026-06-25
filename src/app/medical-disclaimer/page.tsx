
import Medical from '@/components/legal/Medical'
import React from 'react'
  import type { Metadata } from "next";

  export const  metadata: Metadata = {
  title: "Medical Disclaimer | HeartView Health",
  description:
    "Read the Medical Disclaimer for HeartView Health to understand the limitations of the information provided on our platform. Our content is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.",
  keywords: [
    "medical disclaimer",
    "health disclaimer",
    "HeartView Health",
    "medical information",
    "health advice",
    "healthcare platform",
  ],
  openGraph: {
    title: "Medical Disclaimer | HeartView Health",
    description:
      "Learn about the medical disclaimer and limitations of the health information provided by HeartView Health.",
    url: "https://www.heartviewhealth.com/medical-disclaimer",
    type: "website",
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
