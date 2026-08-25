"use client";

import AuditTable from "@/components/admin/audit/AuditTable";
import { format } from "date-fns";

export default function DataAccessPage() {
  const columns = [
    { key: "createdAt", label: "Date & Time", render: (val: string) => val ? format(new Date(val), "dd MMM yyyy, hh:mm a") : "-" },
    { key: "actorName", label: "Actor" },
    { key: "action", label: "Action" },
    { key: "module", label: "Module" },
    { key: "patientId", label: "Patient", render: (val: { name?: string; firstName?: string } | string | null | undefined) => (typeof val === 'object' && val !== null ? (val.name || val.firstName) : val) || "-" },
    { key: "description", label: "Details" },
    { key: "ipAddress", label: "IP Address" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Access Audit</h1>
        <p className="text-sm text-gray-500 mt-1">Audit log of all access to sensitive patient and report information.</p>
      </div>
      
      <AuditTable 
        title="Patient & Report Access Events"
        endpoint="/audit/data-access"
        columns={columns}
      />
    </div>
  );
}
