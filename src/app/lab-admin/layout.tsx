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
      href: "/lab-admin/dashboard",
      icon: "dashboard",
    },

    {
      title: "Patients",
      href: "/lab-admin/patients",
      icon: "users",
    },

    {
      title: "Upload Report",
      href: "/lab-admin/upload-report",
      icon: "upload",
    },

    {
      title: "Reports",
      href: "/lab-admin/reports",
      icon: "reports",
    },

    {
      title: "Staff",
      href: "/lab-admin/staff",
      icon: "staff",
    },

    {
      title: "Settings",
      href: "/lab-admin/settings",
      icon: "settings",
    },
  ];

  const isLoginPage =
    pathname === "/lab-admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen page-bg">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 z-50 h-screen">
        <Sidebar
          role="admin"
          menuItems={sidebarMenu}
          labName="City Diagnostic Lab"
          userName="Dr. Ramesh Patel"
          userEmail="ramesh@citylab.com"
        />
      </div>

      {/* Scrollable Content */}
    {/* Scrollable Content */}
<main
  className="
    ml-80
    h-screen
    overflow-y-auto
    overflow-x-hidden
  "
>
  {children}
</main>
    </div>
  );
}