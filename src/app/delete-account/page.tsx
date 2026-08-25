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
    <>
      <Navbar />

      <main className="min-h-screen max-w-8xl px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 text-black">
        <div className="pt-5 lg:pt-16 mx-auto">
          {/* Header */}
          <div className="mt-15">
            <span className="text-xs tracking-widest uppercase font-semibold text-[#2f5ba5] border border-[#2f5ba5]/70 rounded-full px-4 py-1">
              Legal Document
            </span>

            <h1 className="mt-5 text-2xl sm:text-3xl lg:text-4xl text-black font-medium leading-tight">
              Delete Your HeartView Health Account
            </h1>

            <p className="mt-3 mb-5 text-[#475569] text-sm sm:text-base leading-relaxed">
              At HeartView Health, we respect your privacy and your right to
              control your personal information. You can request deletion of
              your HeartView Health account and associated personal data at any
              time.
            </p>
          </div>

          <div className="space-y-4">
            {/* Card 1 - How to Request Account Deletion */}
            <section className="rounded-2xl backdrop-blur-md p-5 sm:p-6">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                How to Request Account Deletion
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed mb-5">
                You can permanently delete your HeartView Health account by
                following these steps:
              </p>

              <ol className="space-y-4 list-decimal pl-6 text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                <li>
                  Open the{" "}
                  <strong className="text-black">HeartView Health</strong> app
                  and log in to your account.
                </li>

                <li>
                  From the home screen, tap the Settings icon in the
                  top-right corner.
                </li>

                <li>Select Delete Account.</li>

                <li>
                  Review the account deletion information and confirm your
                  request.
                </li>

                <li>
                  Your account deletion request will be submitted for
                  processing.
                </li>
              </ol>

              <p className="mt-5 text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                Once the deletion process is completed, your account and
                eligible associated personal data will be permanently deleted
                from our active systems.
              </p>
            </section>

            {/* Card 2 - Without App Access */}
            <section className="rounded-2xl backdrop-blur-md p-5 sm:p-6">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                Request Account Deletion Without Access to the App
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed mb-5">
                If you are unable to access the HeartView Health app, you can
                still request account deletion without logging in to the app.
              </p>

              <div className="space-y-4 text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                <p>
                  <span className="font-medium text-black">Email:</span>{" "}
                  <a
                    href="mailto:heartviewhealth@gmail.com"
                    className="text-[#2f5ba5] hover:underline"
                  >
                    heartviewhealth@gmail.com
                  </a>
                </p>

                <p>
                  <span className="font-medium text-black">Subject:</span>{" "}
                  Delete My Account
                </p>

                <p>
                  Please send the request from your registered email address
                  whenever possible. If you cannot access your registered email
                  address, please provide your registered mobile number and any
                  additional information requested by our support team to
                  verify ownership of the account.
                </p>

                <p>
                  Our support team will verify the request and process the
                  account deletion accordingly.
                </p>
              </div>
            </section>

            {/* Card 3 - What Data Will Be Deleted */}
            <section className="rounded-2xl backdrop-blur-md p-5 sm:p-6">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                What Data Will Be Deleted
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed mb-5">
                When your account deletion request is processed, we will
                permanently delete:
              </p>

              <ul className="space-y-3">
                {deletedData.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[#475569] text-base sm:text-lg font-light leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2f5ba5]/70 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Card 4 - Data That May Be Retained */}
            <section className="rounded-2xl backdrop-blur-md p-5 sm:p-6">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                Data That May Be Retained
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                Certain information may be retained for a limited period when
                required or permitted by applicable laws, regulatory
                requirements, fraud prevention, security purposes, dispute
                resolution, or other legitimate legal obligations.
              </p>

              <p className="mt-4 text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                Any information retained for these purposes will be securely
                stored, access will be restricted, and the information will be
                deleted when the applicable retention period or purpose has
                expired.
              </p>
            </section>

            {/* Card 5 - What Happens After Account Deletion */}
            <section className="rounded-2xl backdrop-blur-md p-5 sm:p-6">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                What Happens After Account Deletion
              </h2>

              <ul className="space-y-3">
                {afterDeletion.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[#475569] text-base sm:text-lg font-light leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2f5ba5]/70 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Card 6 - Processing Time */}
            <section className="rounded-2xl backdrop-blur-md p-5 sm:p-6">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                Processing Time
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                Account deletion requests are typically processed within 7
                business days after successful verification of the request.
              </p>

              <p className="mt-4 text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                If additional information is required to verify account
                ownership, our support team may contact you before completing
                the deletion request.
              </p>
            </section>

            {/* Card 7 - Contact Us */}
            <section className="rounded-2xl backdrop-blur-md p-5 sm:p-6">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                Contact Us
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                If you have any questions about account deletion or need
                assistance submitting a deletion request, please contact us:
              </p>

              <div className="mt-5 space-y-3 text-[#475569] text-base sm:text-lg font-light">
                <p>
                  <span className="font-medium text-black">Email:</span>{" "}
                  <a
                    href="mailto:heartviewhealth@gmail.com"
                    className="text-[#2f5ba5] hover:underline"
                  >
                    heartviewhealth@gmail.com
                  </a>
                </p>

                <p>
                  <span className="font-medium text-black">Contact No.:</span>{" "}
                  <a
                    href="tel:+918238524984"
                    className="text-[#2f5ba5] hover:underline"
                  >
                    +91 8238524984
                  </a>
                </p>

                <p>
                  <span className="font-medium text-black">
                    Request Subject:
                  </span>{" "}
                  Delete My Account
                </p>
              </div>
            </section>

            {/* Final Note */}
            <section className="rounded-2xl backdrop-blur-md p-5 sm:p-6 pb-10">
              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                HeartView Health is committed to handling account deletion
                requests securely and in accordance with applicable privacy
                and data protection requirements.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}