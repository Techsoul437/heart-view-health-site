  import About from '@/components/about/About'
  import React from 'react'
  import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Us | HeartView Health",
  description:
    "Learn more about HeartView Health, our mission, vision, and commitment to helping people improve their health through smart technology and personalized insights.",

  keywords: [
    "HeartView Health",
    "About Us",
    "Healthcare Technology",
    "Health Tracking",
    "Wellness Platform",
  ],

  alternates: {
    canonical: "https://heartviewhealth.com//about",
  },

  openGraph: {
    title: "About Us | HeartView Health",
    description:
      "Learn more about HeartView Health, our mission, vision, and commitment to improving healthcare through technology.",
    url: "https://heartviewhealth.com//about",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | HeartView Health",
    description:
      "Learn more about HeartView Health and our mission to improve healthcare through technology.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
  function page() {
    return (
      <div>
        <About></About>
      </div>
    )
  }

  export default page
