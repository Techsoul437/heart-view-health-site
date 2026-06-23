"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  Upload,
  FileText,
  ShieldCheck,
  Settings,
  ChevronRight,
  LogOut,
  LucideIcon,
  Menu,
  X,
} from "lucide-react";

import Image from "next/image";

interface SidebarMenuItem {
  title: string;
  href: string;
  icon: keyof typeof iconMap;
}

interface SidebarProps {
  role?: string;
  menuItems?: SidebarMenuItem[];
  labName?: string;
  userName?: string;
  userEmail?: string;
}

const iconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  users: Users,
  upload: Upload,
  reports: FileText,
  staff: ShieldCheck,
  settings: Settings,
};

export default function Sidebar({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  role = "",
  menuItems = [],
  labName,
  userName,
  userEmail,
}: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Initials from userName
  const initials = (userName ?? "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  // Component ke andar, return se pehle ya upar:
  const loginPathMap: Record<string, string> = {
    staff: "/lab-staff/login",
    "lab-admin": "/lab-admin/login",
    admin: "/lab-admin/login",
    "heartview-admin": "/heartview-admin/login",
    
  };

  const loginHref = loginPathMap[role ?? ""] ?? "/lab-admin/login";
  return (
    <>
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-black px-4 lg:hidden">
        <div className="relative h-10 w-28 overflow-hidden">
          <Image
            src="/APP ICONSM.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-80
          bg-black
          backdrop-blur-2xl
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"
          }
          lg:sticky
          lg:translate-x-0
          lg:flex
          lg:flex-col
        `}
      >
        {/* ── Logo ── */}
        <div className="relative z-10 flex h-24 items-center justify-start border-b border-white/10 px-6">
          <div className="flex min-w-max items-center gap-4">
            <div className="relative h-40 w-40 overflow-hidden">
              <Image
                src="/APP ICONSM.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* ── Menu ── */}
        <div className="relative z-10 flex-1 py-6 overflow-y-auto">
          <nav className="flex flex-col gap-2 pl-4 rounded-l-2xl">
            {menuItems.map((item, index) => {
              const Icon = iconMap[item.icon];

              const isActive = pathname === item.href;

              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex
                    h-16
                    items-center
                    justify-start
                    rounded-2xl
                    border
                    px-4
                    transition-all
                    duration-300
                    ${isActive
                      ? "border-white border-2 bg-white text-[#2f5ba5] px-0 rounded-r-none"
                      : "border-transparent text-white hover:border-black/10 hover:bg-[#101B2D]/90 hover:text-white"
                    }
                  `}
                >
                  <div
                    className={`
                      shrink-0
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      ${isActive
                        ? "bg-[#ffffff] border text-[#2f5ba5]"
                        : "bg-[#ffffff] text-[#2f5ba5]"
                      }
                    `}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>

                  <div className="ml-4 flex items-center gap-3">
                    <span className="whitespace-nowrap text-base font-medium">
                      {item.title}
                    </span>

                    <ChevronRight className="h-4 w-4 text-[#64748B]" />
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ── Bottom User Card ── */}
        <div className="relative z-10 border-t border-white/10 px-4 py-4">
          {labName || userName || userEmail ? (
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#2f5ba5]">
                {initials}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                {labName && (
                  <p className="truncate text-sm font-medium text-white">
                    {labName}
                  </p>
                )}

                {userName && (
                  <p className="truncate text-sm text-slate-300">
                    {userName}
                  </p>
                )}

                {userEmail && (
                  <p className="truncate text-xs text-slate-400">
                    {userEmail}
                  </p>
                )}
              </div>

            <Link
              href={loginHref}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-white transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
            </div>
          ) : (
            <Link
              href={loginHref}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-white transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}