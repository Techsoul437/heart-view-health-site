"use client";
import React from "react";
import Link from "next/link";

const ShieldIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
    <path d="M9.5 12l2 2 3-3" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 ">

      <div className="rounded-2xl py-10 sm:py-10">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-14">

          {/* Company */}
          <div>
            <h4 className="mb-4 text-lg sm:text-xl lg:text-2xl font-medium text-white">
              Company
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Help & Support", href: "#help" },
                { label: "Contact Us", href: "/contact" },
                { label: "FAQs", href: "/faq" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base lg:text-lg text-gray-300 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-lg sm:text-xl lg:text-2xl font-medium text-white">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Medical Disclaimer", href: "/medical-disclaimer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base lg:text-lg text-gray-300 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 text-sm sm:text-base lg:text-lg text-gray-300">
            <h4 className="mb-4 text-lg sm:text-xl lg:text-2xl font-medium text-white">
              Contact Details
            </h4>

            <p className="leading-relaxed">
              19, Arth Residency, Near V.I.P. Circle,<br />
              Utran, Surat – 394105, Gujarat
            </p>

            <a href="tel:+918238524984" className="block hover:text-white">
              +91 8238524984
            </a>

            <a
              href="mailto:info@heartviewhealth.com"
              className="block hover:text-white"
            >
              info@heartviewhealth.com
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-8 border-t border-white/10 pt-6">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

            {/* LEFT */}
            <p className="text-xs sm:text-sm text-gray-400 text-center lg:text-left">
              © 2026 HeartViewHealth. All rights reserved.
            </p>

            {/* CENTER */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <ShieldIcon />
                <span>DPDPA</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldIcon />
                <span>GDPR</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldIcon />
                <span>Secure</span>
              </div>
            </div>

            {/* RIGHT */}
          <div className="flex items-center gap-4"> {/* Instagram */} <a href="#" target="_self" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all"> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> </svg> </a> {/* LinkedIn */} <a href="#" target="_self" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all"> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> </svg> </a> {/* Twitter */} <a href="#" target="_self" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all"> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"> <path d="M18.901 1.153h3.68l-8.04 9.193L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.834L0 1.153h7.594l5.243 6.932L18.901 1.153zm-1.293 19.54h2.037L6.486 3.273H4.3l13.308 17.42z" /> </svg> </a> </div>

          </div>
        </div>
      </div>
    </footer>
  );
}