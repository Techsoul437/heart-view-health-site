
import Features from '@/components/features/Features'
import React from 'react'
  import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Features | HeartView Health",
  description:
    "Explore the powerful features of HeartView Health, including AI-powered health insights, personalized wellness tracking, medical report analysis, health dashboards, and smart monitoring tools.",

  keywords: [
    "HeartView Health Features",
    "AI Health Insights",
    "Health Tracking",
    "Wellness Monitoring",
    "Medical Report Analysis",
    "Health Dashboard",
    "Digital Healthcare",
    "Health Analytics",
    "Personalized Health",
  ],

  alternates: {
    canonical: "https://www.heartviewhealth.com/features",
  },

  openGraph: {
    title: "Features | HeartView Health",
    description:
      "Discover AI-powered health tracking, personalized insights, medical report analysis, and wellness monitoring features offered by HeartView Health.",
    url: "https://www.heartviewhealth.com/features",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Features | HeartView Health",
    description:
      "Discover the smart health tracking, AI insights, and wellness monitoring features of HeartView Health.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
function page() {
  return (
    <div>
        <Features></Features>
    </div>
  )
}

export default page
