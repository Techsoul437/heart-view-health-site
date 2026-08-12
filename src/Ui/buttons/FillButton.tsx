"use client";

import Link from "next/link";
import React from "react";

interface FillButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
}

export default function FillButton({
  text = "Click Me",
  href,
  onClick,
}: FillButtonProps) {
  const className = `
    group relative px-6 py-3 sm:px-7 sm:py-2.5 lg:px-8 lg:py-3 rounded-full
    text-white overflow-hidden text-xs sm:text-sm lg:text-base
    bg-linear-to-r from-[#7CC4FF] to-[#85bdf8]
    before:absolute before:inset-0 before:rounded-full
    before:p-px before:bg-linear-to-r before:from-[#0f61b3]
    before:to-[#6AA2E5]/10 before:content-['']
    cursor-pointer
  `;

  const content = (
    <>
      <span className="absolute inset-0.5 rounded-full border bg-linear-to-r from-[#2f5ba5]/70 to-[#4a7bc9]/30" />
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 -left-full h-full w-[30%] bg-white/30 blur-md rotate-12 group-hover:left-[120%] transition-all duration-700 ease-in-out" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}