"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { getStaffProfile } from "@/redux/Api";
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

  const { data } = useSelector(
    (state: RootState) => state.staffProfile
  );

  useEffect(() => {
    if (pathname !== "/lab-staff") {
      dispatch(getStaffProfile());
    }
  }, [dispatch, pathname]);

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

  if (pathname === "/lab-staff") {
    return <div className="min-h-screen page-bg">{children}</div>;
  }

  return (
    <div className="min-h-screen page-bg">
      <div className="hidden lg:block fixed left-0 top-0 z-50 min-h-screen">
        <Sidebar
          role="staff"
          menuItems={sidebarMenu}
          labName={data?.branch ?? ""}
          userName={data?.fullName ?? ""}
          userEmail={data?.email ?? ""}
        />
      </div>

      <div className="lg:hidden">
        <Sidebar
          role="staff"
          menuItems={sidebarMenu}
          labName={data?.branch ?? ""}
          userName={data?.fullName ?? ""}
          userEmail={data?.email ?? ""}
        />
      </div>

      <main className="lg:ml-60 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}