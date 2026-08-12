"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getProfile } from "@/redux/Api";
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
  const dispatch = useDispatch<AppDispatch>();

  const { profile } = useSelector(
    (state: RootState) => state.getProfile
  );

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
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
      title: "Report Links",
      href: "/lab-admin/report_link",
      icon: "staff",
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
    pathname === "/lab-admin";
  if (isLoginPage) {
    return (
      <div className="h-screen page-bg">
        {children}
      </div>
    );
  }

  //   return (
  //     <div className="min-h-screen page-bg">
  //       {/* Fixed Sidebar */}
  //       <div className="fixed left-0 top-0 z-50 h-screen">
  //         <Sidebar
  //           role="admin"
  //           menuItems={sidebarMenu}
  //           labName="City Diagnostic Lab"
  //           userName="Dr. Ramesh Patel"
  //           userEmail="ramesh@citylab.com"
  //         />
  //       </div>

  //       {/* Scrollable Content */}
  //     {/* Scrollable Content */}
  // <main
  //   className="
  //     ml-80
  //     h-screen
  //     overflow-y-auto
  //     overflow-x-hidden
  //   "
  // >
  //   {children}
  // </main>
  //     </div>
  //   );


  //   <div className="min-h-screen page-bg">
  //     <Sidebar
  //       role="admin"
  //       menuItems={sidebarMenu}
  //       labName="City Diagnostic Lab"
  //       userName="Dr. Ramesh Patel"
  //       userEmail="ramesh@citylab.com"
  //     />

  //     <main
  //       className="
  //         min-h-screen
  //         lg:ml-80
  //         overflow-x-hidden
  //       "
  //     >
  //       {children}
  //     </main>
  //   </div>
  // );

  return (
    <div className="min-h-screen page-bg">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-50 min-h-screen">
        <Sidebar
          role="admin"
          menuItems={sidebarMenu}
          labName={profile?.labName || ""}
          userName={profile?.fullName || ""}
          userEmail={profile?.email || ""}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar
          role="admin"
          menuItems={sidebarMenu}
          labName={profile?.labName || ""}
          userName={profile?.fullName || ""}
          userEmail={profile?.email || ""}
        />
      </div>

      {/* Page Content */}
      <main
        className="
              lg:ml-60

       min-h-screen
        overflow-x-hidden
      "
      >
        {children}
      </main>
    </div>
  );
}
