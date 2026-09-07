"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { ShieldCheck, FileText, FileWarning, HeadphonesIcon } from "lucide-react";

export default function TrustPrivacySection() {
  const links = [
    { name: "Privacy Policy", href: "/privacy", icon: <ShieldCheck size={20} /> },
    { name: "Terms & Conditions", href: "/terms", icon: <FileText size={20} /> },
    { name: "Medical Disclaimer", href: "/medical-disclaimer", icon: <FileWarning size={20} /> },
    { name: "Contact Support", href: "/contact", icon: <HeadphonesIcon size={20} /> },
  ];

  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-20 mb-10 text-black">
      <div className="flex flex-col items-center text-center">
        <Headerbadge 
          tag="YOUR INFORMATION MATTERS" 
          text="Designed With Responsible Health Information Access in Mind" 
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto -mt-3 mb-10"
        >
          <p className="text-[#64748B] text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-10">
            Health information is personal. HeartView Health should clearly explain how account verification, report association, privacy and access work. Users should be able to review the Privacy Policy, Terms & Conditions and Medical Disclaimer before using the platform.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {links.map((link, i) => (
              <Link 
                key={i} 
                href={link.href}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 bg-white text-gray-800 hover:border-[#2f5ba5]/40 hover:text-[#2f5ba5] hover:shadow-sm transition-all duration-300 font-medium text-sm sm:text-base"
              >
                <span className="text-[#2f5ba5]">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
