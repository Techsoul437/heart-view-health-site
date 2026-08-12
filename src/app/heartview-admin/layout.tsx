"use client";


import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../components/admin/Sidebar";
import type { AppDispatch, RootState } from "@/redux/store";
import { getHeartViewAdminProfile } from "@/redux/Api";

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

  const { data: profile } = useSelector(
    (state: RootState) => state.heartViewAdminProfile
  );

  useEffect(() => {
    dispatch(getHeartViewAdminProfile());
  }, [dispatch]);
const sidebarMenu = [
  {
    title: "Dashboard",
    href: "/heartview-admin/dashboard",
    icon: "dashboard",
  },
  {
    title: "Lab Management",
    href: "/heartview-admin/labs",
    icon: "building",
  },
  {
    title: "User Management",
    href: "/heartview-admin/users",
    icon: "users",
  },
  {
    title: "Patient Management",
    href: "/heartview-admin/patients",
    icon: "users",
  },
  {
    title: "Report Management",
    href: "/heartview-admin/reports",
    icon: "reports",
  },
  
  {
    title: "Audit & Security",
    href: "/heartview-admin/audit-logs",
    icon: "audit",
  },
 
  {
    title: "Role & Permission",
    href: "/heartview-admin/rbac",
    icon: "permission",
  },
  {
    title: "My Profile",
    href: "/heartview-admin/profile",
    icon: "settings",
  },
];

  const isLoginPage = pathname === "/heartview-admin";

  if (isLoginPage) {
    return <div className="min-h-screen page-bg">{children}</div>;
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-50 min-h-screen">
        <Sidebar
          role="heartview-admin"
          menuItems={sidebarMenu}
          labName=""
          userName={profile?.fullName || ""}
          userEmail={profile?.email || ""}
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
      <main className="lg:ml-60 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}