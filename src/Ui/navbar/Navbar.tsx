"use client";

import React, { useState } from "react";
import Link from "next/link";
import FillButton from "@/Ui/buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "How It Work", href: "/howwork" },
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
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  return (
    <>
      <header className="lg:fixed top-0 left-0 w-full h-20 md:h-25 lg:h-22 sticky flex items-center bg-black/70 lg:bg-transparent z-[999]">

        {/* Main content row */}
  {/* Main content row */}
<div className="w-full max-w-screen-8xl  flex items-center justify-between lg:justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 z-[90]">

  {/* Logo — left on mobile/tablet, center with nav on desktop */}
  <Link href="/" className="flex-shrink-0 relative z-[400] lg:mr-6 xl:mr-8">
    <Image
      src="/logo3.png"
      alt="Logo"
      width={80}
      height={80}
      className="cursor-pointer h-12 sm:h-14 md:h-16 lg:h-16 w-auto"
    />
  </Link>

  {/* Desktop nav links — inline with logo */}
  <ul className="hidden lg:flex justify-center items-center gap-4 xl:gap-6 relative z-[400]">
    {NAV_LINKS.map((link) => (
      <li key={link.label} className="group relative">
        <Link
          href={link.href}
          className="text-lg cursor-pointer text-[#B0B0B0] transition duration-300 whitespace-nowrap group-hover:text-[#3D7773]"
        >
          {link.label}
        </Link>
        <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-[#45657D] to-[#B4B0B0] transition-all duration-300 group-hover:w-full" />
        {link.children && (
          <div className="absolute left-0 top-[120%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-3 min-w-44 z-50">
            {link.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="block px-4 py-2 text-md lg:text-xl 2xl:text-lg text-[#B0B0B0] rounded-md hover:bg-[#3D7773]/20 hover:text-[#3D7773] transition"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </li>
    ))}
  </ul>

  {/* RIGHT — CTA button (desktop) / Hamburger (mobile+tablet) */}
  <div className="flex items-center relative z-[400]">
    {/* Desktop CTA */}
    <div className="hidden lg:flex items-center ml-10 md:ml-20  2xl:ml-68">
      <FillButton text="Join Early Access" href="/contact" />
    </div>
    {/* Mobile/tablet hamburger — right side */}
    <button
      className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer border-none"
      onClick={() => setSidebarOpen(true)}
      aria-label="Open menu"
    >
      <span className="w-6 h-0.5 bg-[#B0B0B0] rounded block" />
      <span className="w-6 h-0.5 bg-[#B0B0B0] rounded block" />
      <span className="w-6 h-0.5 bg-[#B0B0B0] rounded block" />
    </button>
  </div>

</div>

        {/* Background blur shape — desktop only */}
        <div className="w-full hidden h-80 lg:flex justify-center items-start overflow-hidden transition-all duration-500 ease-in-out absolute -top-2 inset-0 mx-auto z-[1] opacity-100 pointer-events-none">
          <svg
            width="100%"
            height="180"
            viewBox="0 0 2850 157"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#bgblur_0_272_516_clip_path)">
              <rect width="100%" height="100%" fill="rgba(0,0,0,0.8)" filter="url(#blurFilter)" />
            </g>
            <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <g filter="url(#filter0_d_272_516)">
              <path
                d="M891.217 37.5H37V8H2707V85H950.478C947.387 85 944.414 83.8068 942.181 81.669L899.514 40.831C897.281 38.6932 894.308 37.5 891.217 37.5Z"
                shapeRendering="crispEdges"
              />
              <path
                d="M2706.5 8.5V84.5H950.479C947.516 84.5 944.667 83.3563 942.526 81.3076L899.86 40.4697C897.534 38.2429 894.437 37 891.217 37H37.5V8.5H2706.5Z"
                stroke="url(#paint0_linear_272_516)"
                strokeOpacity="0.2"
                shapeRendering="crispEdges"
              />
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

      </header>

      {/* ── SIDEBAR OVERLAY ── */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/60 z-[1000] transition-opacity duration-300 lg:hidden
          ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── SIDEBAR PANEL ── */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-black/95 backdrop-blur-xl border-l border-white/10 z-[1001] flex flex-col gap-2 p-6 transition-transform duration-300 lg:hidden
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#B0B0B0] hover:text-white transition text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              {link.children ? (
                <>
                  <Link href={link.href}>
                    <button
                      onClick={() => setBlogOpen(!blogOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 text-[#B0B0B0] hover:text-[#3D7773] hover:bg-[#3D7773]/10 rounded-lg text-base transition text-left cursor-pointer bg-transparent border-none"
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${blogOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 12 12" fill="none"
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </Link>
                  <div className={`ml-4 pl-4 border-l border-[#3D7773]/30 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${blogOpen ? "max-h-64 mt-1" : "max-h-0"}`}>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setSidebarOpen(false)}
                        className="block px-3 py-2 text-sm text-[#888] hover:text-[#3D7773] rounded-md transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-3 text-[#B0B0B0] hover:text-[#3D7773] hover:bg-[#3D7773]/10 rounded-lg text-base transition"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
        </div>
      </aside>
    </>
  );
}