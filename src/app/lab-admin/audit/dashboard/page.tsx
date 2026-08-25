"use client";

import React, { useEffect, useState } from "react";
import { API } from "@/redux/Api";
import { Activity, ShieldAlert, LogIn, Monitor, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import AuditTable from "@/components/admin/audit/AuditTable";
import { StatusBadge, SeverityBadge } from "@/components/admin/audit/Badges";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Metrics {
  totalActivities: number;
  myActivities: number;
  failedLogins: number;
  activeSessions: number;
  openAlerts: number;
  criticalActions: number;
  dataAccess: number;
}

interface AuditLogEntry {
  actorId?: string;
  adminId?: string;
  actorName?: string;
  adminName?: string;
  user?: string;
  action?: string;
  status?: string;
  module?: string;
}

export default function AuditDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { profile } = useSelector((state: RootState) => state.getProfile || { profile: null });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await API.get("/audit?limit=500");
        if (res.data?.success) {
          const logs = res.data.data || [];
          
          const totalActivities = logs.length;
          
          const myId = profile?._id || (profile as unknown as { id?: string })?.id;
          let myActivities = 0;
          if (myId) {
            myActivities = logs.filter((l: AuditLogEntry) => l.actorId === myId || l.adminId === myId).length;
          } else {
            myActivities = logs.filter((l: AuditLogEntry) => l.actorName || l.adminName || l.user).length;
          }
          
          const failedLogins = logs.filter((l: AuditLogEntry) => l.action?.toLowerCase().includes('login') && l.status?.toLowerCase() === 'failed').length;
          
          // Active Sessions: unique successful logins based on user/adminId
          const activeSessionsSet = new Set();
          logs.forEach((log: AuditLogEntry) => {
             if (log.action?.toLowerCase().includes('login') && log.status?.toLowerCase() !== 'failed') {
                 if (log.actorId || log.adminId) activeSessionsSet.add(log.actorId || log.adminId);
             }
          });
          const activeSessions = activeSessionsSet.size;

          const criticalActions = logs.filter((l: AuditLogEntry) => {
              const act = l.action?.toLowerCase() || '';
              return act.includes('delete') || act.includes('export') || act.includes('permission');
          }).length;
          
          const openAlerts = logs.filter((l: AuditLogEntry) => l.status?.toLowerCase() === 'failed' || (l.action && l.action.toLowerCase().includes('delete'))).length;
          
          const dataAccess = logs.filter((l: AuditLogEntry) => {
              const mod = l.module?.toLowerCase() || '';
              return mod.includes('report') || mod.includes('patient') || mod.includes('data');
          }).length;

          setMetrics({
            totalActivities,
            myActivities,
            failedLogins,
            activeSessions,
            openAlerts,
            criticalActions,
            dataAccess
          });
        }
      } catch (err: unknown) {
        toast.error("Failed to load dashboard metrics");
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [profile]);

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
    { key: "actorName", label: "User", render: (val: string, row: Record<string, string>) => row.actorName || row.adminName || row.user || "Unknown" },
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
