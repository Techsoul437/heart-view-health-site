"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918238524984"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-2xl shadow-green-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 lg:bottom-24"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-2xl" />
    </a>
  );
}
