"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function BorderButton({ text = "Click Me", href = "#" }) {
  return (
    <Link href={href}>
      <motion.button
        className="
        group relative

        px-4 py-3 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3
        rounded-full

        border-2 border-[#B4B0B0]

        text-xs sm:text-sm lg:text-base text-white
        overflow-hidden

        transition-all duration-300
        bg-transparent
        cursor-pointer
        "
      >
        {/* Hover Background */}
        <span
          className="
          absolute inset-0 
          bg-gradient-to-r from-[#181E2B] to-[#3D7773]

          scale-x-0 group-hover:scale-x-100
          origin-left

          transition-transform duration-300
          z-0
          "
        />

        {/* Text */}
        <span className="relative z-10 whitespace-nowrap">
          {text}
        </span>
      </motion.button>
    </Link>
  );
}

export default BorderButton;