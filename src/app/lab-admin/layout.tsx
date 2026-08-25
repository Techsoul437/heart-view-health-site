"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  subItems?: { title: string; href: string }[];
}

export default function LabAdminLayout({
  children,
}: LabAdminLayoutProps) {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const { profile } = useSelector(
    (state: RootState) => state.getProfile
  );

  const [adminPerms, setAdminPerms] = useState<Record<string, Record<string, boolean>> | null>(null);

  useEffect(() => {
    if (pathname !== "/lab-admin") {
      dispatch(getProfile());
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const { API } = await import("@/redux/Api");
        const response = await API.get("/rbac");
        if (response.data?.success && response.data.data) {
          const data = response.data.data;
          if (data.permState?.admin) {
            setAdminPerms(data.permState.admin);
          }
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    fetchPermissions();
  }, []);

  const hasPerm = (module: string, perm: string) => {
    if (!adminPerms) return true; // Show by default until loaded
    return adminPerms[module]?.[perm] === true;
  };
  
  const hasAnyPerm = (module: string) => {
    if (!adminPerms) return true;
    if (!adminPerms[module]) return false;
    return Object.values(adminPerms[module]).some(v => v === true);
  };

  const sidebarMenu: SidebarMenuItem[] = [];

  if (hasAnyPerm("dashboard")) {
    sidebarMenu.push({
      title: "Dashboard",
      href: "/lab-admin/dashboard",
      icon: "dashboard",
    });
  }

  if (hasPerm("patients", "view_patients")) {
    sidebarMenu.push({
      title: "Patients",
      href: "/lab-admin/patients",
      icon: "users",
    });
  }

  if (hasPerm("reports", "create_reports")) {
    sidebarMenu.push({
      title: "Upload Report",
      href: "/lab-admin/upload-report",
      icon: "upload",
    });
  }

  if (hasPerm("reports", "view_reports")) {
    sidebarMenu.push({
      title: "Reports",
      href: "/lab-admin/reports",
      icon: "reports",
    });
  }

  if (hasPerm("report_links", "view_links")) {
    sidebarMenu.push({
      title: "Report Links",
      href: "/lab-admin/report_link",
      icon: "staff", // assuming icon remains staff or file
    });
  }

  if (hasPerm("staff", "view_staff")) {
    sidebarMenu.push({
      title: "Staff",
      href: "/lab-admin/staff",
      icon: "staff",
    });
  }


  sidebarMenu.push({
    title: "Settings",
    href: "/lab-admin/settings",
    icon: "settings",
  });

  if (hasAnyPerm("audit")) {
    sidebarMenu.push({
      title: "Audit & Security",
      href: "#",
      icon: "audit", // "audit" icon should exist in Sidebar iconMap (ClipboardList)
      subItems: [
        { title: "Audit Dashboard", href: "/lab-admin/audit/dashboard" },
        { title: "My Activity Log", href: "/lab-admin/audit/my-activity" },
        { title: "Login & Authentication", href: "/lab-admin/audit/auth-history" },
        { title: "Active Sessions", href: "/lab-admin/audit/sessions" },
        { title: "Data Access Audit", href: "/lab-admin/audit/data-access" },
        { title: "Role & Permission", href: "/lab-admin/audit/permissions" },
        { title: "Security Alerts", href: "/lab-admin/audit/alerts" },
        { title: "Security Profile", href: "/lab-admin/audit/profile" },
      ]
    });
  }

  const isLoginPage =
    pathname === "/lab-admin";
  if (isLoginPage) {
    
  
  if (hasAnyPerm("audit")) {
    sidebarMenu.push({
      title: "Audit & Security",
      href: "#",
      icon: "audit", // "audit" icon should exist in Sidebar iconMap (ClipboardList)
      subItems: [
        { title: "Audit Dashboard", href: "/lab-admin/audit/dashboard" },
        { title: "My Activity Log", href: "/lab-admin/audit/my-activity" },
        { title: "Login & Authentication", href: "/lab-admin/audit/auth-history" },
        { title: "Active Sessions", href: "/lab-admin/audit/sessions" },
        { title: "Data Access Audit", href: "/lab-admin/audit/data-access" },
        { title: "Role & Permission", href: "/lab-admin/audit/permissions" },
        { title: "Security Alerts", href: "/lab-admin/audit/alerts" },
        { title: "Security Profile", href: "/lab-admin/audit/profile" },
      ]
    });
  }

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
          role="lab-admin"
          menuItems={sidebarMenu}
          labName={profile?.labName || ""}
          userName={profile?.fullName || ""}
          userEmail={profile?.email || ""}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar
          role="lab-admin"
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
