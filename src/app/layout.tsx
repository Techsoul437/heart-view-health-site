
import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/Ui/whatsAppButton/WhatsAppButton";
import CookieConsent from "@/components/Cookies/CookieConsent";
import PageLoader from "@/Ui/loader/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HeartviewHealth",
  description: "Monitor heart rate, blood pressure, and sugar levels with HeartView Health. Get smart insights, reminders, and health reports in one app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">


        <CookieConsent />
        <PageLoader></PageLoader>

        {children}

        <WhatsAppButton />

      </body>
    </html>
  );
}