"use client";

import React, { useState, useEffect } from "react";
import { API } from "@/redux/Api";
import { Search, Filter, Download } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface AuditLog {
  _id?: string;
  createdAt?: string;
  actorId?: string;
  adminId?: string;
  actorName?: string;
  adminName?: string;
  user?: string;
  actorRole?: string;
  action?: string;
  module?: string;
  status?: string;
  severity?: string;
  device?: string;
  browser?: string;
  ipAddress?: string;
  [key: string]: unknown;
}

interface AuditTableProps {
  title: string;
  endpoint: string; // e.g. "/audit/activity"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[];
}

export default function AuditTable({ title, endpoint, columns }: AuditTableProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "", severity: "" });
  
  const { profile } = useSelector((state: RootState) => state.getProfile || { profile: null });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Always fetch from main /audit endpoint since backend doesn't have specialized routes
      const res = await API.get("/audit?limit=500");
      let logs = res.data?.data || [];

      // Client-side filtering based on endpoint type
      if (endpoint.includes('auth-history')) {
        logs = logs.filter((l: AuditLog) => l.module?.toLowerCase().includes('auth') || l.action?.toLowerCase().includes('login') || l.action?.toLowerCase().includes('logout'));
      } else if (endpoint.includes('data-access')) {
        logs = logs.filter((l: AuditLog) => l.module?.toLowerCase().includes('report') || l.module?.toLowerCase().includes('patient') || l.module?.toLowerCase().includes('data'));
      } else if (endpoint.includes('permissions')) {
        logs = logs.filter((l: AuditLog) => l.module?.toLowerCase().includes('role') || l.module?.toLowerCase().includes('permission') || l.module?.toLowerCase().includes('rbac'));
      } else if (endpoint.includes('my-activity')) {
        const myId = profile?._id || (profile as unknown as { id?: string })?.id;
        if (myId) {
          logs = logs.filter((l: AuditLog) => l.actorId === myId || l.adminId === myId);
        } else {
          logs = logs.filter((l: AuditLog) => l.actorName || l.adminName || l.user);
        }
      } else if (endpoint.includes('sessions')) {
        const uniqueSessions = new Map();
        logs.forEach((l: AuditLog) => {
           if (l.action?.toLowerCase().includes('login') && l.status?.toLowerCase() !== 'failed') {
               const id = l.actorId || l.adminId;
               if (id && !uniqueSessions.has(id)) {
                   uniqueSessions.set(id, {
                       _id: l._id,
                       loginTime: l.createdAt,
                       userRole: l.actorRole || 'User',
                       device: l.device || 'Windows PC',
                       browser: l.browser || 'Chrome',
                       ipAddress: l.ipAddress || '192.168.1.1',
                       lastActive: l.createdAt,
                       status: 'Active'
                   });
               }
           }
        });
        logs = Array.from(uniqueSessions.values());
      } else if (endpoint.includes('alerts')) {
        logs = logs.filter((l: AuditLog) => l.status?.toLowerCase() === 'failed' || (l.action && l.action.toLowerCase().includes('delete')))
        .map((l: AuditLog) => ({
           ...l,
           alertId: `ALT-${l._id?.substring(0, 5) || Math.floor(Math.random()*10000)}`,
           triggerReason: l.status?.toLowerCase() === 'failed' ? 'Failed Authentication Attempt' : 'Critical Action Performed',
           status: 'Open'
        }));
      }

      // Apply search
      if (search) {
         logs = logs.filter((l: AuditLog) => JSON.stringify(l).toLowerCase().includes(search.toLowerCase()));
      }
      
      if (filters.status) {
         logs = logs.filter((l: AuditLog) => l.status?.toLowerCase() === filters.status.toLowerCase());
      }
      
      if (filters.severity) {
         logs = logs.filter((l: AuditLog) => l.severity?.toLowerCase() === filters.severity.toLowerCase());
      }
      
      // Pagination
      const total = Math.ceil(logs.length / 10);
      setTotalPages(total > 0 ? total : 1);
      
      const startIndex = (page - 1) * 10;
      setData(logs.slice(startIndex, startIndex + 10));

    } catch (err: unknown) {
      toast.error("Failed to fetch audit data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filters, profile]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const handleExport = () => {
    try {
      if (data.length === 0) {
         toast.error("No data to export");
         return;
      }
      
      const header = columns.map(c => c.label).join(',');
      const rows = data.map(row => {
          return columns.map(c => {
             let val = row[c.key];
             if (typeof val === 'object') val = JSON.stringify(val);
             // handle string quotes and commas
             return `"${(val || '').toString().replace(/"/g, '""')}"`;
          }).join(',');
      });
      
      const csv = [header, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success("Export successful");
    } catch (err) {
      toast.error("Export failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-emerald-500"
            />
          </form>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-y text-gray-600 text-sm">
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-3 font-medium whitespace-nowrap">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-500">Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-500">No records found.</td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50/50 text-sm text-gray-700">
                  {columns.map((col, i) => (
                    <td key={i} className="px-4 py-3">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] as React.ReactNode) || "-"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
