"use client";

import AuditTable from "@/components/admin/audit/AuditTable";
import { StatusBadge } from "@/components/admin/audit/Badges";
import { format, formatDistanceToNow } from "date-fns";
import { API } from "@/redux/Api";
import toast from "react-hot-toast";

export default function ActiveSessionsPage() {

  const handleRevoke = async (id: string) => {
    if (!confirm("Are you sure you want to revoke this session? The user will be logged out immediately.")) return;
    try {
      const res = await API.delete(`/audit/sessions/${id}`);
      if (res.data?.success) {
        toast.success("Session revoked successfully");
        window.location.reload(); // simple refresh
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to revoke session");
    }
  };

  const columns = [
    { key: "loginTime", label: "Login Time", render: (val: string) => val ? format(new Date(val), "dd MMM yyyy, hh:mm a") : "-" },
    { key: "userRole", label: "Role" },
    { key: "device", label: "Device" },
    { key: "browser", label: "Browser" },
    { key: "ipAddress", label: "IP Address" },
    { key: "lastActive", label: "Last Active", render: (val: string) => val ? formatDistanceToNow(new Date(val), { addSuffix: true }) : "-" },
    { key: "status", label: "Status", render: (val: string) => <StatusBadge status={val} /> },
    { 
      key: "_id", 
      label: "Actions", 
      render: (val: string) => (
        <button 
          onClick={() => handleRevoke(val)}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
        >
          Revoke Session
        </button>
      )
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Active Sessions</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor and manage currently authenticated devices across the system.</p>
      </div>
      
      <AuditTable 
        title="Active Device Sessions"
        endpoint="/audit/sessions"
        columns={columns}
      />
    </div>
  );
}
