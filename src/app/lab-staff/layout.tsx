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
      href: "/lab-staff/dashboard",
      icon: "dashboard",
    },

    {
      title: "Patients",
      href: "/lab-staff/patients",
      icon: "users",
    },

    {
      title: "Upload Report",
      href: "/lab-staff/staff_upload_report",
      icon: "upload",
    },

    {
      title: "Reports",
      href: "/lab-staff/reports",
      icon: "reports",
    },

    {
      title: "Report Links",
      href: "/lab-staff/report_link",
      icon: "staff",
    },

    {
      title: "My Profile",
      href: "/lab-staff/profile",
      icon: "settings",
    },
  ];

  const isLoginPage =
    pathname === "/lab-staff/login";

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
         role="staff"
         menuItems={sidebarMenu}
        
       />
     </div>
 
     {/* Mobile Sidebar */}
     <div className="lg:hidden">
      <Sidebar
          role="staff"
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