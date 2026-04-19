"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldIcon } from "lucide-react";

const BadgeIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200 text-xs shadow-sm shadow-cyan-400/20">
    {children}
  </span>
);

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    hoverClass: "hover:text-[#E1306C]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    hoverClass: "hover:text-[#0A66C2]",
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.193L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.834L0 1.153h7.594l5.243 6.932L18.901 1.153zm-1.293 19.54h2.037L6.486 3.273H4.3l13.308 17.42z" />
      </svg>
    ),
    hoverClass: "hover:text-[#1DA1F2]",
  },
];

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Features", href: "/features" },
  { label: "FAQs", href: "/faq" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
];

export default function Footer() {
  return (
    <footer className="w-full max-w-screen-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-14 md:py-16">
      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-slate-950/95 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_22%)] opacity-90" />
        <div className="relative px-6 py-10 sm:px-8 md:px-10 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[0.95fr_1fr_1fr_1fr] lg:gap-12">
            <div className="flex flex-col justify-between text-left">
              <div className="max-w-[320px] sm:max-w-[360px]">
                <Image src="/logo3.png" alt="HeartView Health" height={140} width={120} className="h-auto w-full max-w-[120px]" />
                <p className="mt-4 text-sm sm:text-base leading-7 text-slate-200/90 font-light max-w-[340px] sm:max-w-[400px]">
                  Stay aware, track health easily, and take control of your well-being with smarter insights and effortless habits.
                </p>
              </div>

            </div>

            <div>
              <h4 className="mb-5 text-xl font-semibold tracking-[0.02em] text-white">
                Company
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm lg:text-base text-slate-300 transition duration-200 ease-in-out hover:text-white hover:underline underline-offset-4 active:text-slate-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-xl font-semibold tracking-[0.02em] text-white">
                Legal & Compliance
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm lg:text-base text-slate-300 transition duration-200 ease-in-out hover:text-white hover:underline underline-offset-4 active:text-slate-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 text-slate-200/90">
              <h4 className="text-xl font-semibold tracking-[0.02em] text-white">
                Contact Details
              </h4>
              <div className="space-y-2 text-sm leading-7 text-slate-300">
                <a
                  href="https://maps.google.com/?q=19,+Arth+Residency,+Near+V.I.P.+Circle,+Utran,+Surat+394105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:text-white hover:underline"
                >
                  19, Arth Residency, Near V.I.P. Circle,
                  <br /> Utran, Surat – 394105, Gujarat
                </a>
                <a
                  href="tel:+918238524984"
                  className="block transition hover:text-white hover:underline"
                >
                  +91 82385 24984
                </a>
                <a
                  href="mailto:info@heartviewhealth.com"
                  className="block transition hover:text-white hover:underline"
                >
                  info@heartviewhealth.com
                </a>
              </div>

            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="grid gap-4 text-center md:grid-cols-[auto_1fr_auto] md:text-left md:items-center">
              <p className="text-sm text-slate-400 md:text-left">
                © 2026 HeartViewHealth. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {[
                  { label: "HIPAA" },
                  { label: "GDPR" },
                  { label: "DPDPA" },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-slate-950/30"
                  >
                    <BadgeIcon>
                      <ShieldIcon size={12} className="text-cyan-300" />
                    </BadgeIcon>
                    {badge.label}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center md:justify-end gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={`group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-slate-300 transition duration-300 hover:bg-white/20 ${item.hoverClass} transform hover:-translate-y-1`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
