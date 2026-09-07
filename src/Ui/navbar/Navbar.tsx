"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FillButton from "@/Ui/buttons/FillButton";
import { usePathname } from "next/navigation";
import ContactModal from "../contactModel/ContactModal";
import BorderButton from "../buttons/BorderButton";
import { Users, FlaskConical } from "lucide-react";
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Blog", href: "/blog" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [labDropdownOpen, setLabDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isOutsideDesktop = !dropdownRef.current || !dropdownRef.current.contains(target);
      const isOutsideMobile = !mobileDropdownRef.current || !mobileDropdownRef.current.contains(target);

      if (isOutsideDesktop && isOutsideMobile) {
        setLabDropdownOpen(false);
      }
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLabDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const pathname = usePathname();

  return (
    <>
      <header className="lg:fixed top-0 left-0 w-full h-24 md:h-25 sticky flex items-center bg-black border-b border-black/10 backdrop-blur-xl z-999">
        <div className="w-full max-w-screen-8xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <Link href="/">
            <Image src="/APP ICONSM.png" alt="HeartView Health" height={220} width={220} />

          </Link>

          <nav className="hidden lg:flex flex-wrap items-center gap-4 xl:gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative group text-md font-medium whitespace-nowrap transition duration-200
          ${isActive ? "text-[#2f5ba5]" : "text-gray-300 hover:text-[#2f5ba5]"}`}
                >
                  {link.label}

                  {/* underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-linear-to-r from-[#2f5ba5]/70 to-[#4a7bc9]/30 transition-all duration-300
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block relative" ref={dropdownRef}>
              <FillButton onClick={() => setLabDropdownOpen(!labDropdownOpen)} text="Lab Portal ▾" />

              {labDropdownOpen && (
                <div className="absolute top-full right-0 mt-4 w-60 rounded-2xl shadow-xl bg-black border border-white/10 overflow-hidden z-50">
                  <div className="py-2 flex flex-col">
                    <Link
                      href="/lab-staff"
                      onClick={() => setLabDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 focus:bg-white/5 focus:outline-none transition-colors"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#2f5ba5]/15 text-[#4a7bc9]">
                        <Users size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-200">Lab Staff</span>
                        <span className="text-xs text-gray-400">Access lab dashboard</span>
                      </div>
                    </Link>
                    <Link
                      href="/lab-admin"
                      onClick={() => setLabDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 focus:bg-white/5 focus:outline-none transition-colors"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#2f5ba5]/15 text-[#4a7bc9]">
                        <FlaskConical size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-200">Lab Admin</span>
                        <span className="text-xs text-gray-400">Manage lab & reports</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button
              className="lg:hidden inline-flex h-12 w-12 items-center text-white justify-center rounded-full border border-white/10 bg-black/5 text-gray-300-100 transition hover:bg-black/10"
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

  
      </header>

      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/60 z-[1000] transition-opacity duration-300 lg:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-black backdrop-blur-xl border-l border-black/10 z-[1001] flex flex-col gap-4 p-6 transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setSidebarOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/5 text-white transition hover:bg-black/10"
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
                scroll={true}
                className={`relative group text-md py-3 font-medium whitespace-nowrap transition duration-200
          ${isActive ? "text-[#2f5ba5]" : "text-gray-300 hover:text-[#2f5ba5]"}`}

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
          
          <div className="relative w-fit mt-4" ref={mobileDropdownRef}>
            <FillButton onClick={() => setLabDropdownOpen(!labDropdownOpen)} text="Lab Portal ▾" />

            {labDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-60 rounded-2xl shadow-xl bg-black border border-white/10 overflow-hidden z-50">
                <div className="py-2 flex flex-col">
                  <Link
                    href="/lab-staff"
                    onClick={() => {
                      setLabDropdownOpen(false);
                      setSidebarOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 focus:bg-white/5 focus:outline-none transition-colors"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#2f5ba5]/15 text-[#4a7bc9]">
                      <Users size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-200">Lab Staff</span>
                      <span className="text-xs text-gray-400">Access lab dashboard</span>
                    </div>
                  </Link>
                  <Link
                    href="/lab-admin"
                    onClick={() => {
                      setLabDropdownOpen(false);
                      setSidebarOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 focus:bg-white/5 focus:outline-none transition-colors"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#2f5ba5]/15 text-[#4a7bc9]">
                      <FlaskConical size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-200">Lab Admin</span>
                      <span className="text-xs text-gray-400">Manage lab & reports</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

      </aside>
        <ContactModal isOpen={open} onClose={() => setOpen(false)} />

    </>
  );
}
