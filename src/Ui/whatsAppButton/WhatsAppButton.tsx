"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918238524984" 
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-3 z-50
        flex items-center justify-center
        w-14 h-14  rounded-full
        bg-green-500 hover:bg-green-600
        shadow-lg hover:shadow-xl
        transition-all duration-300
        animate-bounce
      "
    >
      <FaWhatsapp className="text-white text-2xl" />
    </a>
  );
}