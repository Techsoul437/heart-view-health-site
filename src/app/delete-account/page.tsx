import React from "react";
import type { Metadata } from "next";
import Navbar from "@/Ui/navbar/Navbar";
import Footer from "@/Ui/footer/Footer";

export const metadata: Metadata = {
  title: "Delete Account | HeartView Health",
  description: "Learn how to request deletion of your HeartView Health account and understand what data will be deleted.",
  keywords: ["Delete Account", "Account Deletion", "Privacy", "HeartView Health"],
  alternates: {
    canonical: "https://heartviewhealth.com/delete-account",
  },
  openGraph: {
    title: "Delete Account | HeartView Health",
    description: "Learn how to request deletion of your HeartView Health account and understand what data will be deleted.",
    url: "https://heartviewhealth.com/delete-account",
    siteName: "HeartView Health",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete Account | HeartView Health",
    description: "Learn how to request deletion of your HeartView Health account and understand what data will be deleted.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DeleteAccountPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen max-w-8xl px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 text-black">

        <div className="pt-5  lg:pt-16 mx-auto">

          {/* Header */}
          <div className="mt-15">
            <span className="text-xs tracking-widest uppercase font-semibold text-[#2f5ba5] border border-[#2f5ba5]/70 rounded-full px-4 py-1">
              Legal Document
            </span>

            <h1 className="mt-5 text-2xl sm:text-3xl lg:text-4xl text-black font-medium leading-tight">
              Delete Your HeartView Health Account
            </h1>

            <p className="mt-3 mb-5 text-[#475569] text-sm sm:text-base">
              At HeartView Health, we respect your privacy and your right to control
              your personal data.
            </p>
          </div>

          <div className="space-y-4">

            {/* Card 1 */}
            {/* Card 1 */}
            <section className="rounded-2xl shadow-md shadow-black/10 border-t border-black/10 backdrop-blur-md p-5 sm:p-6">

              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                How to Request Account Deletion
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed mb-5">
                You can permanently delete your HeartView Health account by following these
                steps:
              </p>

              <ol className="space-y-4 list-decimal pl-6 text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                <li>
                  Open the <strong className="text-black">HeartView Health</strong> app and
                  log in to your account.
                </li>

                <li>
                  Navigate to <strong className="text-black">Profile → Settings → Delete Account</strong>.
                </li>

                <li>
                  Confirm your account deletion request.
                </li>

                <li>
                  Once confirmed, your account deletion request will be processed and your
                  account along with associated user data will be permanently deleted from
                  our database.
                </li>

                <li>
                  If you are unable to access the app, send an email to{" "}
                  <a
                    href="mailto:heartviewhealth@gmail.com"
                    className="text-[#2f5ba5] hover:underline"
                  >
                    heartviewhealth@gmail.com
                  </a>{" "}
                  with the subject <strong>Delete My Account</strong> from your registered
                  email address. Our support team will verify your request and process the
                  deletion.
                </li>
              </ol>

            </section>

            {/* Card 2 */}
            <section className="rounded-2xl shadow-md shadow-black/10 border-t border-black/10 backdrop-blur-md p-5 sm:p-6">

              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                What Data Will Be Deleted
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed mb-5">
                When your account deletion request is processed, we will permanently
                delete:
              </p>

              <ul className="space-y-3">

                {[
                  "Account information (name, email address, phone number)",
                  "Profile information",
                  "Health records and health metrics",
                  "App preferences and settings",
                  "Associated user data stored on our servers",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[#475569] text-base sm:text-lg font-light leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2f5ba5]/70 shrink-0" />
                    {item}
                  </li>
                ))}

              </ul>

            </section>

            {/* Card 3 */}
            <section className="rounded-2xl shadow-md shadow-black/10 border-t border-black/10 backdrop-blur-md p-5 sm:p-6">

              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                Data That May Be Retained
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                Certain information may be retained for a limited period if required
                by applicable laws, fraud prevention, security purposes, or to resolve
                disputes. Any retained information will be securely stored and deleted
                once the legal or operational retention period expires.
              </p>

            </section>

            {/* Card 4 */}
            <section className="rounded-2xl shadow-md shadow-black/10 border-t border-black/10 backdrop-blur-md p-5 sm:p-6">

              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                Processing Time
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                Account deletion requests are typically processed within 7 business
                days.
              </p>

            </section>

            {/* Card 5 */}
            {/* Card 5 */}
            <section className="rounded-2xl shadow-md shadow-black/10 border-t border-black/10 backdrop-blur-md p-5 sm:p-6">

              <h2 className="text-xl sm:text-xl lg:text-2xl text-black/90 mb-5">
                Contact Us
              </h2>

              <p className="text-[#475569] text-base sm:text-lg font-light leading-relaxed">
                If you have any questions about account deletion or need assistance,
                please contact us.
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
                  <span className="font-medium text-black">Contact No:</span>{" "}
                  <a
                    href="tel:+918238524094"
                    className="text-[#2f5ba5] hover:underline"
                  >
                    +91 8238524094
                  </a>
                </p>

                <p>
                  <span className="font-medium text-black">Request Subject:</span>{" "}
                  Delete My Account
                </p>
              </div>

            </section>



          </div>

        </div>

      </main>
      <Footer />
    </>
  );
}
