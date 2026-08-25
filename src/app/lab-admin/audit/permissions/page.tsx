"use client";

import AuditTable from "@/components/admin/audit/AuditTable";
import { format } from "date-fns";
import { SeverityBadge } from "@/components/admin/audit/Badges";

export default function PermissionsAuditPage() {
  const columns = [
    { key: "createdAt", label: "Date & Time", render: (val: string) => val ? format(new Date(val), "dd MMM yyyy, hh:mm a") : "-" },
    { key: "actorName", label: "Changed By", render: (val: string, row: Record<string, string>) => row.actorName || row.adminName || row.user || "Unknown" },
    { key: "actorRole", label: "Role" },
    { key: "action", label: "Action" },
    { key: "description", label: "Details" },
    { key: "severity", label: "Risk Level", render: (val: string) => <SeverityBadge severity={val} /> },
    { key: "ipAddress", label: "IP Address" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Role & Permission Audit</h1>
        <p className="text-sm text-gray-500 mt-1">Track modifications to access levels, role boundaries, and permissions.</p>
      </div>
      
      <AuditTable 
        title="Permission Modification Events"
        endpoint="/audit/permissions"
        columns={columns}
      />
    </div>
  );
}
