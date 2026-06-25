
import Contactmain from '@/components/contact/Contactmain'
import React from 'react'
  import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | HeartView Health",
  description:
    "Get in touch with HeartView Health for support, partnership inquiries, or general questions. We're here to help you on your health journey.",

  keywords: [
    "Contact HeartView Health",
    "Contact Us",
    "Customer Support",
    "Healthcare Support",
    "Health Platform",
    "HeartView Health",
    "Medical Support",
  ],

  alternates: {
    canonical: "https://heartviewhealth.com//contact",
  },

  openGraph: {
    title: "Contact Us | HeartView Health",
    description:
      "Contact HeartView Health for support, inquiries, partnerships, or assistance with our healthcare platform.",
    url: "https://heartviewhealth.com//contact",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Us | HeartView Health",
    description:
      "Reach out to HeartView Health for support, partnerships, and healthcare-related inquiries.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
function page() {
  return (
    <div>
      <Contactmain></Contactmain>
    </div>
  )
}

export default page
