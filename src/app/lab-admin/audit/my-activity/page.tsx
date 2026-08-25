"use client";

import AuditTable from "@/components/admin/audit/AuditTable";
import { StatusBadge, SeverityBadge } from "@/components/admin/audit/Badges";
import { format } from "date-fns";

export default function MyActivityPage() {
  const columns = [
    { key: "createdAt", label: "Date & Time", render: (val: string) => val ? format(new Date(val), "dd MMM yyyy, hh:mm a") : "-" },
    { key: "action", label: "Action" },
    { key: "module", label: "Module" },
    { key: "status", label: "Status", render: (val: string) => <StatusBadge status={val} /> },
    { key: "severity", label: "Severity", render: (val: string) => <SeverityBadge severity={val} /> },
    { key: "ipAddress", label: "IP Address" },
    { key: "device", label: "Device" },
    { key: "description", label: "Description" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Activity Log</h1>
        <p className="text-sm text-gray-500 mt-1">Review your recent administrative activities and system interactions.</p>
      </div>
      
      <AuditTable 
        title="Recent Activity"
        endpoint="/audit/my-activity"
        columns={columns}
      />
    </div>
  );
}
