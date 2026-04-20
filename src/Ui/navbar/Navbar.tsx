"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FillButton from "@/Ui/buttons/FillButton";
import { usePathname } from "next/navigation";
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

  return (
    <>
      <header className="lg:fixed top-0 left-0 w-full h-24 md:h-28 sticky flex items-center bg-slate-950/95 border-b border-white/10 backdrop-blur-xl z-[999]">
        <div className="w-full max-w-screen-8xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <Link href="/">
            <Image src="/logo3.png" alt="HeartView Health" height={140} width={120} />

          </Link>

       <nav className="hidden lg:flex flex-wrap items-center gap-4 xl:gap-6">
  {NAV_LINKS.map((link) => {
    const isActive = pathname === link.href;

    return (
      <Link
        key={link.label}
        href={link.href}
        className={`relative group text-md font-medium whitespace-nowrap transition duration-200
          ${isActive ? "text-[#3D7773]" : "text-slate-300 hover:text-[#3D7773]"}`}
      >
        {link.label}

        {/* underline */}
        <span
          className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#45657D] to-[#B4B0B0] transition-all duration-300
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
        ></span>
      </Link>
    );
  })}
</nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <FillButton text="Join Early Access" href="/contact" />
            </div>
            <button
              className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <div className="flex flex-col justify-center items-center gap-1.5">
                <span className="block h-0.5 w-6 rounded-full bg-current" />
                <span className="block h-0.5 w-6 rounded-full bg-current" />
                <span className="block h-0.5 w-6 rounded-full bg-current" />
              </div>
            </button>
          </div>
        </div>

        <div className="w-full hidden lg:flex justify-center items-start overflow-hidden absolute inset-x-0 top-0 z-0 pointer-events-none">
          <div className="h-28 w-full max-w-screen-8xl rounded-b-[30px] bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl" />
        </div>
      </header>

      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/60 z-[1000] transition-opacity duration-300 lg:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-xl border-l border-white/10 z-[1001] flex flex-col gap-4 p-6 transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setSidebarOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 group relative">
     {NAV_LINKS.map((link) => {
    const isActive = pathname === link.href;

    return (
      <Link
        key={link.label}
        href={link.href}
        className={`relative group text-md py-3 font-medium whitespace-nowrap transition duration-200
          ${isActive ? "text-[#3D7773]" : "text-slate-300 hover:text-[#3D7773]"}`}
      >
        {link.label}

        {/* underline */}
        <span
          className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#45657D] to-[#B4B0B0] transition-all duration-300
       `}
        ></span>
      </Link>
    );
  })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <FillButton text="Join Early Access" href="/contact" />
        </div>
      </aside>
    </>
  );
}
