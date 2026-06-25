
import HowItWorkMain from '@/components/how_work/HowItWorkMain'
import React from 'react'
  import type { Metadata } from "next";

  export const  metadata: Metadata = {
  title: "How It Works | HeartView Health",
  description:
    "Learn how HeartView Health works to help you track your health, upload medical reports, receive AI-powered insights, monitor wellness metrics, and make informed health decisions.",
  keywords: [
    "how HeartView Health works",
    "health tracking",
    "AI health insights",
    "medical report analysis",
    "wellness monitoring",
    "health dashboard",
    "digital healthcare",
  ],
  openGraph: {
    title: "How It Works | HeartView Health",
    description:
      "Discover how HeartView Health simplifies health tracking with AI-powered insights, medical report analysis, and personalized wellness monitoring.",
    url: "https://www.heartviewhealth.com/how-it-works",
    type: "website",
  },
};
function page() {
  return (
    <div>
        <HowItWorkMain></HowItWorkMain>
    </div>
  )
}

export default page
