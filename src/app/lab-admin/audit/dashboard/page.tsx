"use client";

import React, { useEffect, useState } from "react";
import { API } from "@/redux/Api";
import { Activity, ShieldAlert, LogIn, Monitor, Lock, Database } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import AuditTable from "@/components/admin/audit/AuditTable";
import { StatusBadge, SeverityBadge } from "@/components/admin/audit/Badges";

interface Metrics {
  totalActivities: number;
  myActivities: number;
  failedLogins: number;
  activeSessions: number;
  openAlerts: number;
  criticalActions: number;
  dataAccess: number;
}

export default function AuditDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await API.get("/audit/dashboard");
        if (res.data?.success) {
          setMetrics(res.data.data.metrics);
        }
      } catch (err: unknown) {
        toast.error("Failed to load dashboard metrics");
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const cards = metrics ? [
    { title: "Total Activities", value: metrics.totalActivities, icon: Activity, color: "bg-blue-50 text-blue-600" },
    { title: "My Activities", value: metrics.myActivities, icon: Monitor, color: "bg-emerald-50 text-emerald-600" },
    { title: "Active Sessions", value: metrics.activeSessions, icon: Lock, color: "bg-purple-50 text-purple-600" },
    { title: "Security Alerts", value: metrics.openAlerts, icon: ShieldAlert, color: "bg-red-50 text-red-600" },
    { title: "Critical Actions", value: metrics.criticalActions, icon: ShieldAlert, color: "bg-orange-50 text-orange-600" },
    { title: "Failed Logins", value: metrics.failedLogins, icon: LogIn, color: "bg-amber-50 text-amber-600" },
  ] : [];

  const columns = [
    { key: "createdAt", label: "Date & Time", render: (val: string) => val ? format(new Date(val), "dd MMM yyyy, hh:mm a") : "-" },
    { key: "actorName", label: "User" },
    { key: "action", label: "Action" },
    { key: "module", label: "Module" },
    { key: "status", label: "Status", render: (val: string) => <StatusBadge status={val} /> },
    { key: "severity", label: "Severity", render: (val: string) => <SeverityBadge severity={val} /> },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Audit & Security Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time overview of system activities, access events, and security metrics.</p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading metrics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embedded Table for recent generic activity */}
      <div className="mt-8">
        <AuditTable 
          title="Recent System Activity"
          endpoint="/audit/activity"
          columns={columns}
        />
      </div>
    </div>
  );
}
