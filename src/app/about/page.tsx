  import About from '@/components/about/About'
  import React from 'react'
  import type { Metadata } from "next";

  export const  metadata: Metadata = {
      title: "About Us | HeartView Health",
      description: "Learn more about Heartview Health,our mission,vision, and commitment to helping users improve their health through smart technology and personalized insights.",
      keywords: [
          "Heartview Health",
          "About Us",
          "Healthcare Technology",
          "Health Tracking",
          "Wellness platform"
        
      ],
      openGraph: {
          title: "About Heartview Health",
          description: "Learn more about Heartview Health,our mission,vision,and commitment to improving healthcare through technology.",
          url: "https://www.heartviewhealth.com/about",
          type: "website",
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
