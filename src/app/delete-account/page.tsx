import React from "react";
import type { Metadata } from "next";
import Navbar from "@/Ui/navbar/Navbar";
import Footer from "@/Ui/footer/Footer";

export const metadata: Metadata = {
  title: "Delete Account | HeartView Health",
  description:
    "Learn how to request deletion of your HeartView Health account and understand what data will be deleted.",
  keywords: [
    "Delete Account",
    "Account Deletion",
    "Privacy",
    "HeartView Health",
  ],
  alternates: {
    canonical: "https://heartviewhealth.com/delete-account",
  },
  openGraph: {
    title: "Delete Account | HeartView Health",
    description:
      "Learn how to request deletion of your HeartView Health account and understand what data will be deleted.",
    url: "https://heartviewhealth.com/delete-account",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete Account | HeartView Health",
    description:
      "Learn how to request deletion of your HeartView Health account and understand what data will be deleted.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DeleteAccountPage() {
  const deletedData = [
    "Account information, including name, email address, and phone number",
    "Profile information",
    "Health records and health metrics",
    "Laboratory reports and associated health information stored under your account",
    "App preferences and settings",
    "Other personal information associated with your HeartView Health account",
  ];

  const afterDeletion = [
    "You will no longer be able to access the deleted account.",
    "Eligible personal information and associated health data will be removed from our active systems.",
    "Deleted account data cannot be recovered after the deletion process is completed.",
    "If you choose to use HeartView Health again, you may need to create a new account.",
  ];

  return (
    <div className="page-bg">
      <Navbar />

      <main className="max-w-8xl px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-0 lg:mt-15 text-black">
        <div className="pt-5 lg:pt-16 mx-auto">
          {/* Header */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full">
            <span className="text-xs tracking-widest uppercase font-semibold text-[#2f5ba5] border border-[#2f5ba5]/70 rounded-full px-4 py-1">
              Legal Document
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-black mb-4">
            Delete Your HeartView Health Account
          </h1>

          <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed mb-10">
            At HeartView Health, we respect your privacy and your right to
            control your personal information. You can request deletion of
            your HeartView Health account and associated personal data at any
            time.
          </p>

          <div>
            {/* Card 1 - How to Request Account Deletion */}
            <div className="mb-8 mt-8">
              <div className="rounded-2xl backdrop-blur-md">
                <div className="flex gap-4 mb-4 items-start">
                  <h2 className="text-xl sm:text-xl lg:text-2xl text-black tracking-tight leading-snug">
                    How to Request Account Deletion
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    You can permanently delete your HeartView Health account by following these steps:
                  </div>
                  <ol className="space-y-2 list-decimal pl-6 text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    <li>Open the <strong className="text-black">HeartView Health</strong> app and log in to your account.</li>
                    <li>From the home screen, tap the Settings icon in the top-right corner.</li>
                    <li>Select <strong className="text-black">Delete</strong>  Account.</li>
                    <li>Review the account deletion information and confirm your request.</li>
                    <li>Your account deletion request will be submitted for processing.</li>
                  </ol>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light mt-4">
                    Once the deletion process is completed, your account and eligible associated personal data will be permanently deleted from our active systems.
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Without App Access */}
            <div className="mb-8 mt-8">
              <div className="rounded-2xl backdrop-blur-md">
                <div className="flex gap-4 mb-4 items-start">
                  <h2 className="text-xl sm:text-xl lg:text-2xl text-black tracking-tight leading-snug">
                    Request Account Deletion Without Access to the App
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    If you are unable to access the HeartView Health app, you can still request account deletion without logging in to the app.
                  </div>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light mt-2">
                    <span className="font-medium text-black">Email:</span>{" "}
                    <a href="mailto:heartviewhealth@gmail.com" className="text-[#2f5ba5] hover:underline">
                      heartviewhealth@gmail.com
                    </a>
                  </div>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    <span className="font-medium text-black">Subject:</span> Delete My Account
                  </div>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light mt-2">
                    Please send the request from your registered email address whenever possible. If you cannot access your registered email address, please provide your registered mobile number and any additional information requested by our support team to verify ownership of the account.
                  </div>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light mt-2">
                    Our support team will verify the request and process the account deletion accordingly.
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - What Data Will Be Deleted */}
            <div className="mb-8 mt-8">
              <div className="rounded-2xl backdrop-blur-md">
                <div className="flex gap-4 mb-4 items-start">
                  <h2 className="text-xl sm:text-xl lg:text-2xl text-black tracking-tight leading-snug">
                    What Data Will Be Deleted
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    When your account deletion request is processed, we will permanently delete:
                  </div>
                  {deletedData.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2f5ba5]/70/50 shrink-0" />
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4 - Data That May Be Retained */}
            <div className="mb-8 mt-8">
              <div className="rounded-2xl backdrop-blur-md">
                <div className="flex gap-4 mb-4 items-start">
                  <h2 className="text-xl sm:text-xl lg:text-2xl text-black tracking-tight leading-snug">
                    Data That May Be Retained
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    Certain information may be retained for a limited period when required or permitted by applicable laws, regulatory requirements, fraud prevention, security purposes, dispute resolution, or other legitimate legal obligations.
                  </div>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    Any information retained for these purposes will be securely stored, access will be restricted, and the information will be deleted when the applicable retention period or purpose has expired.
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 - What Happens After Account Deletion */}
            <div className="mb-8 mt-8">
              <div className="rounded-2xl backdrop-blur-md">
                <div className="flex gap-4 mb-4 items-start">
                  <h2 className="text-xl sm:text-xl lg:text-2xl text-black tracking-tight leading-snug">
                    What Happens After Account Deletion
                  </h2>
                </div>
                <div className="space-y-3">
                  {afterDeletion.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2f5ba5]/70/50 shrink-0" />
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 6 - Processing Time */}
            <div className="mb-8 mt-8">
              <div className="rounded-2xl backdrop-blur-md">
                <div className="flex gap-4 mb-4 items-start">
                  <h2 className="text-xl sm:text-xl lg:text-2xl text-black tracking-tight leading-snug">
                    Processing Time
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    Account deletion requests are typically processed within 7 business days after successful verification of the request.
                  </div>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    If additional information is required to verify account ownership, our support team may contact you before completing the deletion request.
                  </div>
                </div>
              </div>
            </div>

            {/* Card 7 - Contact Us */}
            <div className="mb-8 mt-8">
              <div className="rounded-2xl backdrop-blur-md">
                <div className="flex gap-4 mb-4 items-start">
                  <h2 className="text-xl sm:text-xl lg:text-2xl text-black tracking-tight leading-snug">
                    Contact Us
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    If you have any questions about account deletion or need assistance submitting a deletion request, please contact us:
                  </div>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    <span className="font-medium text-black">Email:</span>{" "}
                    <a href="mailto:heartviewhealth@gmail.com" className="text-[#2f5ba5] hover:underline">
                      heartviewhealth@gmail.com
                    </a>
                  </div>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    <span className="font-medium text-black">Contact No.:</span>{" "}
                    <a href="tel:+918238524984" className="text-[#2f5ba5] hover:underline">
                      +91 8238524984
                    </a>
                  </div>
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    <span className="font-medium text-black">Request Subject:</span> Delete My Account
                  </div>
                </div>
              </div>
            </div>

            {/* Final Note */}
            <div className="mb-8 mt-8 pb-10">
              <div className="rounded-2xl backdrop-blur-md">
                <div className="space-y-3">
                  <div className="text-[#475569] text-base sm:text-lg leading-relaxed font-light">
                    HeartView Health is committed to handling account deletion requests securely and in accordance with applicable privacy and data protection requirements.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}