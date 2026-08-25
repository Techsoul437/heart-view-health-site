"use client";

import AuditTable from "@/components/admin/audit/AuditTable";
import { StatusBadge } from "@/components/admin/audit/Badges";
import { format } from "date-fns";

export default function AuthHistoryPage() {
  const columns = [
    { key: "createdAt", label: "Date & Time", render: (val: string) => val ? format(new Date(val), "dd MMM yyyy, hh:mm a") : "-" },
    { key: "actorName", label: "User", render: (val: string, row: Record<string, string>) => row.actorName || row.adminName || row.user || "Unknown" },
    { key: "actorRole", label: "Role" },
    { key: "action", label: "Event Type" },
    { key: "status", label: "Status", render: (val: string) => <StatusBadge status={val} /> },
    { key: "ipAddress", label: "IP Address" },
    { key: "device", label: "Device & OS" },
    { key: "browser", label: "Browser" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Login & Authentication History</h1>
        <p className="text-sm text-gray-500 mt-1">Track system logins, logouts, OTP verifications, and failed authentication attempts.</p>
      </div>
      
      <AuditTable 
        title="Authentication Logs"
        endpoint="/audit/auth-history"
        columns={columns}
      />
    </div>
  );
}
