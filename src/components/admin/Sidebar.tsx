"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  role = "admin",
  menuItems = [],
  labName = "HeartView Lab",
  userName = "Admin User",
  userEmail = "admin@heartview.com",
}: SidebarProps) {
  const pathname = usePathname();

  // Initials from userName
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside
      className="
        sticky
        top-0
        hidden
        h-screen
        w-80
        border-r
        border-white/10
        bg-[#0e151d]
        backdrop-blur-2xl
        lg:flex
        lg:flex-col
      "
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
      <div className="relative z-10 flex-1 py-6">
        <nav className="flex flex-col gap-2 px-4">
          {menuItems.map((item, index) => {
            const Icon = iconMap[item.icon];

            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
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
                  ${
                    isActive
                      ? "border-[#5AA39A]/40 bg-linear-to-r from-[#5AA39A]/30 to-[#132738]/80 text-white"
                      : "border-transparent text-[#8A97AD] hover:border-white/10 hover:bg-[#101B2D]/90 hover:text-white"
                  }
                `}
              >
                <div
                  className={`
                    shrink-0
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    ${
                      isActive
                        ? "bg-[#5AA39A]/20 text-white"
                        : "bg-[#162133] text-[#7C8CA5]"
                    }
                  `}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </div>

                <div className="ml-4 flex items-center gap-3">
                  <span className="whitespace-nowrap text-base font-medium">
                    {item.title}
                  </span>

                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom User Card ── */}
      <div className="relative z-10 border-t border-white/10 px-4 py-4">
        <div className="flex items-center justify-start gap-3">
          {/* Avatar with initials */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#4A8B86] to-[#2D5F5C]   text-white shadow-lg shadow-[#3D7773]/30">
            {initials}
          </div>

          {/* Info */}
          <div>
            {/* Lab name */}
            <div className="mb-1 inline-flex items-center gap-1 rounded-md  py-0.5">
              <ShieldCheck className="h-4 w-4 text-slate-400" />

              <span className="whitespace-nowrap  font-medium text-slate-400">
                {labName}
              </span>
            </div>

            {/* User name */}
            <p className="whitespace-nowrap  font-semibold leading-tight text-white">
              {userName}
            </p>

            {/* Email */}
            <p className="mt-0.5 max-w-42.5 truncate whitespace-nowrap  text-slate-400">
              {userEmail}
            </p>
          </div>

          {/* Logout */}
          <button className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}