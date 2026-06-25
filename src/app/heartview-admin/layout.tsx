"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "../../components/admin/Sidebar";

interface LabAdminLayoutProps {
  children: ReactNode;
}

interface SidebarMenuItem {
  title: string;
  href: string;
  icon: string;
}

export default function LabAdminLayout({
  children,
}: LabAdminLayoutProps) {
  const pathname = usePathname();

  const sidebarMenu: SidebarMenuItem[] = [
    {
      title: "Dashboard",
      href: "/heartview-admin/dashboard",
      icon: "dashboard",
    },

    {
      title: "Labs",
      href: "/heartview-admin/labs",
      icon: "users",
    },

    {
      title: "Patients",
      href: "/heartview-admin/patients",
      icon: "users",
    },

    {
      title: "Audit Logs",
      href: "/heartview-admin/audit-logs",
      icon: "reports",
    },

    {
      title: "My Profile",
      href: "/heartview-admin/profile",
      icon: "settings",
    },
  ];

  const isLoginPage =
    pathname === "/heartview-admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen page-bg">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-50 min-h-screen">
        <Sidebar
          role="heartview-admin"
          menuItems={sidebarMenu}

        />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar
          role="heartview-admin"
          menuItems={sidebarMenu}

        />
      </div>

      {/* Page Content */}
      <main
        className="
         lg:ml-80
        min-h-screen
         overflow-x-hidden
       "
      >
        {children}
      </main>
    </div>
  );
}