

import CookieConsent from "@/components/Cookies/CookieConsent";
import FAQSection from "@/components/faqs/FAQSection";
import HomePage from "@/components/home/HomePage";
import Privacy from "@/components/legal/Privacy";
import WhatsAppButton from "@/Ui/whatsAppButton/WhatsAppButton";

  import type { Metadata } from "next";

  export const  metadata: Metadata = {
  title: "HeartView Health",
  description:
    "HeartView Health helps you track your health, upload medical reports, monitor vital metrics, receive AI-powered health insights, and make informed wellness decisions—all in one secure platform.",
  keywords: [
    "HeartView Health",
    "AI health platform",
    "health tracking",
    "medical report analysis",
    "health insights",
    "wellness monitoring",
    "heart health",
    "health dashboard",
    "preventive healthcare",
    "digital healthcare",
  ],
  openGraph: {
    title: "HeartView Health | AI-Powered Health Tracking & Wellness Platform",
    description:
      "Track your health, analyze medical reports, and receive personalized AI-powered health insights with HeartView Health.",
    url: "https://www.heartviewhealth.com",
    type: "website",
  },
};
export default function Home() {
  return (
    <div>
      <CookieConsent />

      <HomePage></HomePage>
      <WhatsAppButton />

    </div>
  );
}
