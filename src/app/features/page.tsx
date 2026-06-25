
import Features from '@/components/features/Features'
import React from 'react'
  import type { Metadata } from "next";

  export const  metadata: Metadata = {
  title: "Features | HeartView Health",
  description:
    "Explore the powerful features of HeartView Health, including health tracking, personalized insights, AI-powered analysis, report management, and wellness monitoring.",
  keywords: [
    "HeartView Health features",
    "health tracking",
    "AI health insights",
    "wellness monitoring",
    "health reports",
    "health dashboard",
    "digital healthcare",
  ],
  openGraph: {
    title: "Features | HeartView Health",
    description:
      "Discover the advanced health tracking, AI insights, and wellness features offered by HeartView Health.",
    url: "https://www.heartviewhealth.com/features",
    type: "website",
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
