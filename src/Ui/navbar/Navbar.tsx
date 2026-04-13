"use client";

import React, { useState } from "react";
import Link from "next/link";
import FillButton from "@/Ui/buttons/FillButton"; // apna path change kar lena
import BorderButton from "../buttons/BorderButton";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  // { label: "How It Works", href: "#how-it-works" },
 {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Heart Risk", href: "/category/heart-risk" },
      { label: "BP", href: "/category/bp" },
      { label: "Diabetes", href: "/category/diabetes" },
      { label: "Lifestyle", href: "/category/lifestyle" },
      { label: "Lab Reports", href: "/category/lab-reports" },
    ],
  },
  { label: "About", href: "/about" },
{ label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute xl:fixed top-0 left-0 w-full h-20 flex items-center z-[999]">
      {/* Main content row */}
      <div className="w-full flex items-center justify-between px-6 xl:px-12 z-[90]">

        {/* Left: Logo + Nav + Mobile buttons */}
        <div className="flex items-center gap-8 xl:gap-10 relative z-[400] ml-50 xl:ml-50">
          {/* Logo */}
          <Link href="/">
            {/* <img
              src="/logo.png"
              alt="Logo"
              className="z-[100] w-11  ml-[20px] xl:ml-90 h-auto xl:w-[96px] cursor-pointer"
            /> */}
            <Image src="/logo3.png" alt="Logo" width={80} height={80} className="z-[100] ml-[20px] xl:ml-90 h-auto  cursor-pointer" />
          </Link>

          {/* Desktop Nav Links */}
        <ul className="hidden xl:flex justify-center ml-50 items-center gap-6">
  {NAV_LINKS.map((link) => (
    <li key={link.label} className="group relative">
      
      {/* Main Link */}
      <Link
        href={link.href}
        className="text-lg cursor-pointer text-[#B0B0B0] transition duration-300 group-hover:text-[#3D7773]"
      >
        {link.label}
      </Link>

      {/* Underline */}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-[#45657D] to-[#B4B0B0] transition-all duration-300 group-hover:w-full"></span>

      {/* Dropdown */}
      {link.children && (
        <div className="absolute left-0 top-[120%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-3 min-w-[180px] z-50">
          
          {link.children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block px-4 py-2 text-sm text-[#B0B0B0] rounded-md hover:bg-[#3D7773]/20 hover:text-[#3D7773] transition"
            >
              {child.label}
            </Link>
          ))}

        </div>
      )}
    </li>
  ))}
</ul>


        </div>

        {/* Right: Desktop CTA pill — Get Started + Download App */}
        <div className="hidden md:flex items-center gap-4 ml-auto pr-30 xl:pr-10">
          {/* Get Started Button */}
          <div className="hidden md:flex items-center justify-end px-3 gap-4 ml-auto">
            <FillButton text="Get Started" href="/contact" />
            <BorderButton text="Download App" href="#download" />

          </div>
        </div>

        {/* Download App */}
      </div>



      {/* Desktop background blur bar */}
      <div className="w-screen hidden h-30 xl:flex justify-center items-start overflow-hidden transition-all duration-500 ease-in-out absolute -top-[8px] inset-0 mx-auto z-[1] opacity-100 pointer-events-none">
        <svg width="2750" height="157" viewBox="0 0 2750 157" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: "2750px", left: "2%", position: "relative" }}>
          <g clipPath="url(#bgblur_0_272_516_clip_path)">
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.8)" filter="url(#blurFilter)" />
          </g>
          <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <g filter="url(#filter0_d_272_516)">
            <path d="M891.217 37.5H37V8H2707V85H950.478C947.387 85 944.414 83.8068 942.181 81.669L899.514 40.831C897.281 38.6932 894.308 37.5 891.217 37.5Z" shapeRendering="crispEdges" />
            <path d="M2706.5 8.5V84.5H950.479C947.516 84.5 944.667 83.3563 942.526 81.3076L899.86 40.4697C897.534 38.2429 894.437 37 891.217 37H37.5V8.5H2706.5Z" stroke="url(#paint0_linear_272_516)" strokeOpacity="0.2" shapeRendering="crispEdges" />
          </g>
          <defs>
            <clipPath id="bgblur_0_272_516_clip_path" transform="translate(-0.799999 -0.799999)">
              <path d="M891.217 37.5H37V8H2707V85H950.478C947.387 85 944.414 83.8068 942.181 81.669L899.514 40.831C897.281 38.6932 894.308 37.5 891.217 37.5Z" />
            </clipPath>
            <linearGradient id="paint0_linear_272_516" x1="1372" y1="85" x2="1372" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#E4DFDC" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Desktop decorative line */}
      <span className="w-screen overflow-x-hidden hidden xl:flex justify-center items-center absolute top-7 left-[-101px] right-0 mx-auto origin-left translate-x-10 pointer-events-none z-50 opacity-0">
        <svg width="2559" height="49" viewBox="0 0 2559 49" fill="none" xmlns="http://www.w3.org/2000/svg" className="left-[2%] relative" style={{ minWidth: "2559px" }}>
          <path opacity="0.14" d="M0 1.43957H799.102C801.985 1.43957 804.76 2.53677 806.863 4.50836L849.986 44.931C852.089 46.9026 854.864 47.9998 857.747 47.9998H2558.5" stroke="#F8F8F8" strokeWidth="1.06389" />
        </svg>
      </span>

    </header>
  );
}