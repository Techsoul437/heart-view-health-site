"use client";

import React from "react";
import Link from "next/link";

function FillButton({ text = "Click Me", href = "#" }) {
  return (
    <Link href={href}>
      <button
        className="
        group relative px-6 py-3 sm:px-7 sm:py-2.5 lg:px-8 lg:py-3 rounded-full 
        text-white overflow-hidden 
text-xs sm:text-sm lg:text-base
        bg-linear-to-r from-[#181E2B] to-[#3D7773]

        before:absolute before:inset-0 before:rounded-full
        before:p-px
        before:bg-linear-to-r before:from-[#45657D] before:to-[#B4B0B0]
        before:content-['']
        cursor-pointer
      "
      >
        {/* INNER BACKGROUND (important for border effect) */}
        <span className="absolute inset-0.5 rounded-full bg-linear-to-r from-[#181E2B] to-[#3D7773]"></span>

        {/* TEXT */}
        <span className="relative z-10">{text}</span>

        {/* SPARKLE LINE */}
        <span
          className="
          absolute top-0 -left-full h-full w-[30%]
          bg-white/30 blur-md rotate-12

          group-hover:left-[120%]
          transition-all duration-700 ease-in-out
        "
        ></span>
      </button>
    </Link>
  );
}

export default FillButton;