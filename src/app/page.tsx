"use client";

import CookieConsent from "@/components/Cookies/CookieConsent";
import FAQSection from "@/components/faqs/FAQSection";
import HomePage from "@/components/home/HomePage";
import Privacy from "@/components/legal/Privacy";
import WhatsAppButton from "@/Ui/whatsAppButton/WhatsAppButton";


export default function Home() {
  return (
  <div>
        <CookieConsent />

    <HomePage></HomePage>
        <WhatsAppButton />
  
    </div>
  );
}
