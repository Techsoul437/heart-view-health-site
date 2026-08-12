"use client";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../components/admin/Sidebar";
import type { AppDispatch, RootState } from "@/redux/store";
import { getAdminProfile } from "@/redux/Api";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const { data: profile } = useSelector(
    (state: RootState) => state.adminProfile
  );

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  const sidebarMenu = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: "dashboard",
    },
    {
      title: "Inquiry",
      href: "/admin/Inquiries",
      icon: "users",
    },
    {
      title: "Blog",
      href: "/admin/Blog",
      icon: "users",
    },
    {
      title: "Team",
      href: "/admin/team",
      icon: "users",
    },
    {
      title: "My Profile",
      href: "/admin/profile",
      icon: "settings",
    },
  ];

  const isLoginPage = pathname === "/admin";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
   <div className="min-h-screen page-bg">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-50 min-h-screen">
        <Sidebar
          role="admin"
          menuItems={sidebarMenu}
          labName=""
          userName={profile?.fullName || "Admin"}
          userEmail={profile?.email || ""}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar
          role="admin"
          menuItems={sidebarMenu}
          labName=""
          userName={profile?.fullName || "Admin"}
          userEmail={profile?.email || ""}
        />
      </div>

      {/* Page Content */}
<main className="lg:ml-60 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}