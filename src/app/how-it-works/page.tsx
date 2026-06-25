
import HowItWorkMain from '@/components/how_work/HowItWorkMain'
import React from 'react'
  import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | HeartView Health",
  description:
    "Learn how HeartView Health helps you upload medical reports, track health metrics, receive AI-powered insights, monitor wellness, and make informed healthcare decisions.",

  keywords: [
    "How HeartView Health Works",
    "Health Tracking",
    "AI Health Insights",
    "Medical Report Analysis",
    "Wellness Monitoring",
    "Health Dashboard",
    "Digital Healthcare",
    "Healthcare Platform",
    "Personalized Health",
  ],

  alternates: {
    canonical: "https://www.heartviewhealth.com/how-it-works",
  },

  openGraph: {
    title: "How It Works | HeartView Health",
    description:
      "Discover how HeartView Health simplifies healthcare with AI-powered insights, medical report analysis, health tracking, and personalized wellness monitoring.",
    url: "https://www.heartviewhealth.com/how-it-works",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "How It Works | HeartView Health",
    description:
      "Learn how HeartView Health uses AI to analyze reports, monitor wellness, and provide personalized health insights.",
  },

  robots: {
    index: true,
    follow: true,
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
