"use client";

import AuditTable from "@/components/admin/audit/AuditTable";
import { format } from "date-fns";
import { StatusBadge, SeverityBadge } from "@/components/admin/audit/Badges";
import { API } from "@/redux/Api";
import toast from "react-hot-toast";

export default function SecurityAlertsPage() {

  const handleAction = async (id: string, actionType: "acknowledge" | "resolve") => {
    try {
      const res = await API.post(`/audit/alerts/${id}/${actionType}`);
      if (res.data?.success) {
        toast.success(`Alert ${actionType}d successfully`);
        window.location.reload();
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to process action");
    }
  };

  const columns = [
    { key: "createdAt", label: "Date & Time", render: (val: string) => val ? format(new Date(val), "dd MMM yyyy, hh:mm a") : "-" },
    { key: "alertId", label: "Alert ID" },
    { key: "triggerReason", label: "Trigger Reason" },
    { key: "severity", label: "Severity", render: (val: string) => <SeverityBadge severity={val} /> },
    { key: "status", label: "Status", render: (val: string) => <StatusBadge status={val} /> },
    { 
      key: "_id", 
      label: "Actions", 
      render: (val: string, row: Record<string, string>) => (
        <div className="flex gap-2">
           {row.status === "Open" && (
             <button onClick={() => handleAction(val, "acknowledge")} className="text-amber-600 hover:underline text-sm font-medium">Acknowledge</button>
           )}
           {(row.status === "Open" || row.status === "Acknowledged") && (
             <button onClick={() => handleAction(val, "resolve")} className="text-emerald-600 hover:underline text-sm font-medium">Resolve</button>
           )}
           {row.status === "Resolved" && (
             <span className="text-gray-400 text-sm">Resolved</span>
           )}
        </div>
      )
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Security Alerts</h1>
        <p className="text-sm text-gray-500 mt-1">Review and resolve automated security alerts for suspicious or high-risk activity.</p>
      </div>
      
      <AuditTable 
        title="Active & Past Alerts"
        endpoint="/audit/alerts"
        columns={columns}
      />
    </div>
  );
}
