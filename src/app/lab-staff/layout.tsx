"use client";

import { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
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

  const [staffPerms, setStaffPerms] = useState<Record<string, Record<string, boolean>> | null>(null);

  useEffect(() => {
    if (pathname !== "/lab-staff") {
      dispatch(getStaffProfile());
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const { API } = await import("@/redux/Api");
        const response = await API.get("/rbac");
        if (response.data?.success && response.data.data) {
          const data = response.data.data;
          if (data.permState?.staff) {
            setStaffPerms(data.permState.staff);
          }
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    fetchPermissions();
  }, []);

  const hasPerm = (module: string, perm: string) => {
    if (!staffPerms) return true; // Show by default until loaded
    return staffPerms[module]?.[perm] === true;
  };
  
  const hasAnyPerm = (module: string) => {
    if (!staffPerms) return true;
    if (!staffPerms[module]) return false;
    return Object.values(staffPerms[module]).some(v => v === true);
  };

  const sidebarMenu: SidebarMenuItem[] = [];

  if (hasAnyPerm("dashboard")) {
    sidebarMenu.push({
      title: "Dashboard",
      href: "/lab-staff/dashboard",
      icon: "dashboard",
    });
  }

  if (hasPerm("patients", "view_patients")) {
    sidebarMenu.push({
      title: "Patients",
      href: "/lab-staff/patients",
      icon: "users",
    });
  }

  if (hasPerm("reports", "create_reports")) {
    sidebarMenu.push({
      title: "Upload Report",
      href: "/lab-staff/staff_upload_report",
      icon: "upload",
    });
  }

  if (hasPerm("reports", "view_reports")) {
    sidebarMenu.push({
      title: "Reports",
      href: "/lab-staff/reports",
      icon: "reports",
    });
  }

  if (hasPerm("report_links", "view_links")) {
    sidebarMenu.push({
      title: "Report Links",
      href: "/lab-staff/report_link",
      icon: "staff",
    });
  }

  sidebarMenu.push({
    title: "My Profile",
    href: "/lab-staff/profile",
    icon: "settings",
  });



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