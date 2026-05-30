"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function BorderButton({ text = "Click Me", href = "#",bgColor = "" }) {
  return (
    <Link href={href}>
 <motion.button
  className="
  group
  relative

  w-fit
  min-w-45

  flex items-center justify-center

  px-4 py-3 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3
  rounded-full

  border border-transparent

  text-xs sm:text-sm lg:text-base text-white
  overflow-hidden

  transition-all duration-300
  cursor-pointer

  bg-transparent
  isolate

  before:absolute before:inset-0 before:rounded-full
  before:p-px
  before:bg-linear-to-r before:from-[#0f61b3] before:to-[#7CC4FF]
  before:content-['']
  "
>
  {/* Hover Background */}
  <span
    className="
    absolute inset-0 
    rounded-full
    bg-linear-to-r from-[#2f5ba5]/90 to-[#4a7bc9]/70

    scale-x-0 group-hover:scale-x-100
    origin-left

    transition-transform duration-300
    z-0
    "
  />

  {/* Inner Transparent Layer */}
<span
  className={`
    absolute inset-[1px] rounded-full
    ${bgColor}
    group-hover:bg-transparent
    transition-all duration-300
    z-[1]
  `}
/>

  {/* Text */}
  <span className={`relative z-10 whitespace-nowrap   ${bgColor === "bg-black" ? "text-white" : "text-black"} group-hover:text-white transition-colors duration-300`}>
    {text}
  </span>
</motion.button>
    </Link>
  );
}

export default BorderButton;