
import Contactmain from '@/components/contact/Contactmain'
import React from 'react'
  import type { Metadata } from "next";

  export const  metadata: Metadata = {
  title: "Contact Us | HeartView Health",
  description:
    "Get in touch with HeartView Health for support, partnership inquiries, or general questions. We're here to help you on your health journey.",
  keywords: [
    "contact HeartView Health",
    "contact us",
    "customer support",
    "healthcare support",
    "help center",
    "health platform",
    "HeartView Health",
  ],
  openGraph: {
    title: "Contact Us | HeartView Health",
    description:
      "Contact HeartView Health for support, inquiries, partnerships, or assistance with our healthcare platform.",
    url: "https://www.heartviewhealth.com/contact",
    type: "website",
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
