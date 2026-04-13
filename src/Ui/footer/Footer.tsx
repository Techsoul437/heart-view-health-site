"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { label } from 'framer-motion/client';
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
const companyLinks = [
    { label: 'About Us', href: '/about' },
    // { label: 'How It Works', href: '/how-it-works' },
    { label: 'Help & Support', href: '#help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' }
]

const offeringLinks = [
    { label: 'Heart Risk Score', href: '/heart-risk-score' },
    { label: 'Health Tracking (BP, Glucose, Weight)', href: '/health-tracking' },
    { label: 'Lab Report Scan (OCR)', href: '/lab-report-scan' },
    { label: 'Medication Reminders', href: '/medication-reminders' },
    { label: 'Wearable Integration', href: '/wearable-integration' },
]
const toolLinks = [
    { label: 'BMI Calculator', href: '/bmi-calculator' },
    { label: 'Heart Risk Calculator', href: '/heart-risk-calculator' },
    { label: 'Blood Pressure Tracker', href: '/blood-pressure-tracker' },
    { label: 'Glucose Tracker', href: '/glucose-tracker' },
    { label: 'Activity & Sleep Insights', href: '/activity-sleep-insights' },


]
const legalLinks = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Medical Disclaimer', href: '/medical-disclaimer' },

]
const trustLinks = [
    { label: '🇮🇳 DPDPA Compliant', href: '/india' },
    { label: 'GDPR Ready', href: '/gdpr' },
    { label: 'Secure & Encrypted', href: '/secure' },

]

export default function Footer() {
    return (
        <footer className="font-sans  max-w-8xl px-20 py-5">
            <div className="mx-auto max-w-8xl px-20  rounded-2xl
            backdrop-blur-sm:px-10 py-10">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-50">
                    <div>
                        <h4 className="mb-5 text-2xl font-medium text-white">Company</h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-lg font-light text-gray-300 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Features */}
                    {/* <div>
                        <h4 className="mb-5 text-[22px] font-[400] text-white">Features</h4>
                        <ul className="space-y-3">
                            {offeringLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-[16px] text-gray-300 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                    {/* Tools */}

                    {/* <div>
                        <h4 className="mb-5 text-[22px] font-[400] text-white">Tools </h4>
                        <ul className="space-y-3">
                            {toolLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-[16px] text-gray-300 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> */}


                    {/* Legal */}
                    <div>
                        <h4 className="mb-5 text-2xl font-medium text-white">Legal & Compliance</h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-lg font-light text-gray-300 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-3 text-lg text-gray-300">
                        <h4 className="mb-5 text-2xl font-medium text-white">Contact Details</h4>

                        {/* Address */}
                        <div className="flex items-start gap-2 font-light">
                            <a
                                href="https://www.google.com/maps?q=19,+Arth+Residency,+Near+VIP+Circle,+Utran,+Surat,+Gujarat+394105"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 cursor-pointer hover:text-white transition"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 shrink-0 mt-0.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span className="leading-relaxed">
                                    19, Arth Residency,
                                    Near V.I.P. Circle,<br /> Beside Indian Oil Petrol  Pump,<br />
                                    Utran, Surat – 394105,<br />
                                    Gujarat, India
                                </span>
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 shrink-0">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                            <a href="tel:+91 8238524984" className="hover:text-white transition-colors">
                                +91 8238524984
                            </a>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" className="text-white-400">
                                <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.646.865 5.093 2.329 7.082L5 29l7.133-1.302A11.936 11.936 0 0016.001 27C22.627 27 28 21.627 28 15S22.627 3 16.001 3zm0 22c-1.936 0-3.76-.56-5.296-1.526l-.379-.227-4.236.772.803-4.127-.247-.395A9.94 9.94 0 016 15c0-5.514 4.486-10 10.001-10C21.514 5 26 9.486 26 15s-4.486 10-9.999 10zm5.503-7.503c-.301-.15-1.775-.875-2.051-.974-.276-.1-.477-.15-.678.15s-.778.974-.954 1.175c-.176.2-.351.225-.652.075-.301-.15-1.27-.468-2.42-1.494-.894-.797-1.498-1.782-1.673-2.083-.176-.3-.019-.462.131-.612.135-.135.301-.351.451-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.635-.929-2.239-.244-.585-.492-.506-.678-.515l-.577-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.513 1.079 2.915 1.229 3.115c.15.2 2.122 3.24 5.144 4.543.719.31 1.279.495 1.716.634.72.229 1.376.197 1.893.119.577-.086 1.775-.725 2.026-1.426.251-.702.251-1.304.176-1.426-.075-.12-.276-.195-.577-.346z" />
                            </svg>

                            <a
                                href="https://wa.me/918888003430"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                08888003430
                            </a>
                        </div> */}
                        {/* Email */}
                        <div className="flex items-center gap-2">
                            <a
                                href="mailto:info@heartviewhealth.com?subject=Enquiry&body=Hello HeartView Team,"
                                className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-300 shrink-0"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>

                                <span>info@heartviewhealth.com</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}

                <div className="mt-7 border-t border-white/10 pt-4">

                    <div className="mt-1 flex items-center justify-between">

                        {/* LEFT - Copyright */}
                        <p className="text-sm text-gray-400">
                            © 2026 HeartViewHealth. All rights reserved.
                        </p>

                        {/* CENTER - Trust Bar */}
                        <div className="flex items-center justify-center gap-4 text-gray-300 text-md">

                            <div className="flex items-center gap-2">
                                <ShieldIcon />
                                <span>DPDPA</span>
                            </div>

                            <span className="opacity-30">|</span>

                            <div className="flex items-center gap-2">
                                <ShieldIcon />
                                <span>GDPR</span>
                            </div>

                            <span className="opacity-30">|</span>

                            <div className="flex items-center gap-2">
                                <ShieldIcon />
                                <span>Secure & Encrypted</span>
                            </div>

                        </div>

                        {/* RIGHT - Social Icons */}
                        <div className="flex items-center gap-4">
                            {/* Instagram */}
                            <a href="#" target="_self" rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="#" target="_self" rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>

                            {/* Twitter */}
                            <a href="#" target="_self" rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.901 1.153h3.68l-8.04 9.193L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.834L0 1.153h7.594l5.243 6.932L18.901 1.153zm-1.293 19.54h2.037L6.486 3.273H4.3l13.308 17.42z" />
                                </svg>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}