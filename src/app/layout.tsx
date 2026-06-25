
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";


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

// export const metadata: Metadata = {
//   title: {
//     default: "HeartView Health",
//     template: "%s | HeartView Health",
//   },
//   description:
//     "Monitor heart rate, blood pressure, blood sugar, sleep, and overall wellness with HeartView Health. Get personalized insights, reminders, and health reports.",

//   keywords: [
//     "HeartView Health",
//     "heart health monitoring",
//     "blood pressure tracking",
//     "blood sugar monitoring",
//     "health analytics",
//     "wellness tracking",
//     "health reports",
//   ],


//   openGraph: {
//     title: "HeartView Health",
//     description:
//       "Monitor heart rate, blood pressure, and blood sugar with smart health insights.",
//     siteName: "HeartView Health",
//     url: "https://www.heartviewhealth.com",
//     type: "website",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-snippet": -1,
//       "max-image-preview": "large",
//       "max-video-preview": -1,
//     },
//   },
// };

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

        <Toaster position="top-right" />

        {/* <PageLoader></PageLoader> */}

        {children}
        <GoogleAnalytics gaId="G-JYXHGBWQVM"></GoogleAnalytics>
           <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HeartView Health",
            url: "https://www.heartviewhealth.com",
            logo: "https://heartview-images.s3.ap-south-1.amazonaws.com/favicon3.png",
          }),
        }}
      />
      </body>
   
    </html>
  );
}