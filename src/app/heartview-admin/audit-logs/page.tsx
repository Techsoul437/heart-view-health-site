"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Calendar, ChevronDown, X, Search, Filter, Download,
    Activity, ShieldAlert, Users, Lock, LogIn, Database, Monitor, AlertTriangle
} from 'lucide-react';
import { FiChevronLeft, FiChevronRight, FiEye, FiLogOut } from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import type { RootState, AppDispatch } from "@/redux/store";
import { getAllAuditLogs, AuditLog, API, getToken } from "@/redux/Api";
import { format, subDays, isSameDay } from "date-fns";
import toast from "react-hot-toast";

// ======================= HELPER COMPONENTS =======================
const ActionBadge = ({ action }: { action: string }) => {
    const actionLower = action?.toLowerCase() || '';
    let style = 'bg-gray-100 text-gray-700 border-gray-200';

    if (actionLower.includes('create') || actionLower.includes('upload') || actionLower.includes('allow')) {
        style = 'bg-green-100 text-green-700 border-green-200';
    } else if (actionLower.includes('update') || actionLower.includes('edit')) {
        style = 'bg-yellow-100 text-yellow-700 border-yellow-200';
    } else if (actionLower.includes('delete') || actionLower.includes('failed') || actionLower.includes('deny') || actionLower.includes('lock')) {
        style = 'bg-red-100 text-red-700 border-red-200';
    } else if (actionLower.includes('login') || actionLower.includes('logout') || actionLower.includes('view') || actionLower.includes('download')) {
        style = 'bg-blue-100 text-blue-700 border-blue-200';
    } else if (actionLower.includes('export') || actionLower.includes('share')) {
        style = 'bg-purple-100 text-purple-700 border-purple-200';
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${style}`}>
            {action || 'Unknown'}
        </span>
    );
};

const SeverityBadge = ({ severity }: { severity: string }) => {
    const styles: Record<string, string> = {
        Low: 'bg-blue-100 text-blue-700',
        Medium: 'bg-yellow-100 text-yellow-700',
        High: 'bg-orange-100 text-orange-700',
        Critical: 'bg-red-100 text-red-700 font-bold',
    };
    return (
        <span className={`px-2 py-1 rounded-md text-xs border border-transparent ${styles[severity] || 'bg-gray-100'}`}>
            {severity}
        </span>
    );
};

// ======================= MODAL COMPONENT =======================
const AuditLogDetailModal = ({ log, onClose }: { log: AuditLog; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900">Audit Event Details</h1>
                    <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div className="col-span-1 md:col-span-2 bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Event ID</p>
                            <p className="mt-1 font-mono text-sm text-gray-900">{log._id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-500">Timestamp</p>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {log.createdAt ? format(new Date(log.createdAt), "dd MMM yyyy, hh:mm a") : "N/A"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">Actor</p>
                        <div className="mt-1 flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                                {((log.actorName || log.adminName || log.user) || 'U')[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{(log.actorName || log.adminName || log.user) || 'System'}</p>
                                <p className="text-xs text-gray-500">{(log.actorId || log.adminId) ? `Admin ID: ${(log.actorId || log.adminId)}` : 'Administrator'}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">Action & Module</p>
                        <div className="mt-2 flex items-center gap-2">
                            <ActionBadge action={log.action} />
                            <span className="text-sm text-gray-500">in</span>
                            <span className="text-sm font-medium text-gray-900">{log.module || "System"}</span>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="mt-1 text-sm text-gray-900 bg-white border border-gray-100 p-3 rounded-lg leading-relaxed">{log.description}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">Network Details</p>
                        <div className="mt-2 space-y-2 text-sm text-gray-700">
                            <div className="flex justify-between border-b border-gray-50 pb-1">
                                <span className="text-gray-500">IP Address:</span>
                                <span className="font-mono">{log.ipAddress || 'N/A'}</span>
                            </div>
                            {/* <div className="flex justify-between border-b border-gray-50 pb-1">
                                <span className="text-gray-500">Device:</span>
                                <span>{log.device || 'MacBook Pro'}</span>
                            </div> */}
                            <div className="flex justify-between pb-1">
                                <span className="text-gray-500">Browser:</span>
                                <span>{log.browser || 'Chrome'}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">Outcome</p>
                        <div className="mt-2 space-y-2 text-sm text-gray-700">
                            <div className="flex justify-between border-b border-gray-50 pb-1">
                                <span className="text-gray-500">Status:</span>
                                <span className={`font-medium ${(log.status || 'Success').toLowerCase() === 'failed' ? 'text-red-600' : 'text-green-600'}`}>
                                    {log.status || 'Success'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ActiveSession {
    id: string;
    user: string;
    ip: string;
    device: string;
    lastActive: string;
    current: boolean;
}

interface RealActiveSession {
    _id: string;
    userId: string;
    userName?: string;
    userRole?: string;
    device?: string;
    browser?: string;
    ipAddress: string;
    lastActive: string;
}

interface SecurityAlert {
    id: string;
    type: string;
    user: string;
    ip: string;
    time: string;
    severity: string;
    status: string;
}

// ======================= MAIN PAGE =======================
export default function AuditLogs() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, data: auditLogs } = useSelector((state: RootState) => state.auditLogs);
    const { data: profile } = useSelector((state: RootState) => state.heartViewAdminProfile);

    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        dispatch(getAllAuditLogs());
    }, [dispatch]);

    const [realActiveSessions, setRealActiveSessions] = useState<RealActiveSession[]>([]);

    useEffect(() => {
        const fetchActiveSessions = async () => {
            try {
                const res = await API.get("/audit/sessions", {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                if (res.data?.success) {
                    setRealActiveSessions(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch sessions", err);
            }
        };

        if (activeTab === 'sessions') {
            void fetchActiveSessions();
        }
    }, [activeTab]);

    const handleRevoke = async (sessionId: string) => {
        try {
            const res = await API.delete(`/audit/sessions/${sessionId}`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            if (res.data?.success) {
                toast.success("Session revoked successfully");
                setRealActiveSessions(prev => prev.filter(s => s._id !== sessionId));
            }
        } catch (err) {
            console.error("Revoke failed", err);
            toast.error("Failed to revoke session");
        }
    };

    // ======================= DYNAMIC COMPUTATIONS =======================
    const dynamicData = useMemo(() => {
        const logs = [...(auditLogs || [])].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

        // --- 1. Dashboard Metrics ---
        const totalActivities = logs.length;
        const failedLogins = logs.filter(log => log.action?.toLowerCase().includes('login') && log.status?.toLowerCase() === 'failed').length;
        const criticalLogs = logs.filter(log => {
            const act = log.action?.toLowerCase() || '';
            const mod = log.module?.toLowerCase() || '';
            return act.includes('delete') || act.includes('export') || act.includes('permission') ||
                   mod.includes('report') || mod.includes('patient') || mod.includes('data');
        }).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

        // --- 2. Chart Data (Last 7 Days) ---
        const activityChartData = [];
        for (let i = 6; i >= 0; i--) {
            const targetDate = subDays(new Date(), i);
            const dayLogs = logs.filter(log => log.createdAt && isSameDay(new Date(log.createdAt), targetDate));

            activityChartData.push({
                name: format(targetDate, 'EEE'), // Mon, Tue, etc.
                activities: dayLogs.length,
                logins: dayLogs.filter(log => log.action?.toLowerCase().includes('login')).length,
                failed: dayLogs.filter(log => log.action?.toLowerCase().includes('login') && log.status?.toLowerCase() === 'failed').length
            });
        }

        // --- 3. Active Sessions (Mocked from latest successful logins) ---
        // Find unique successful logins
        const sessionsMap = new Map();
        logs.forEach(log => {
            if (log.action?.toLowerCase().includes('login') && log.status?.toLowerCase() !== 'failed') {
                if (!sessionsMap.has((log.actorId || log.adminId))) {
                    sessionsMap.set((log.actorId || log.adminId), {
                        id: log._id,
                        user: (log.actorName || log.adminName || log.user),
                        ip: log.ipAddress || 'N/A',
                        device: 'Windows PC / Chrome',
                        lastActive: log.createdAt ? format(new Date(log.createdAt), 'hh:mm a') : 'Recently',
                        current: (profile?._id || (profile as unknown as { id?: string })?.id) === (log.actorId || log.adminId)
                    });
                }
            }
        });
        const activeSessions = Array.from(sessionsMap.values());

        // --- 4. Security Alerts ---
        const alerts = logs
            .filter(log => log.status?.toLowerCase() === 'failed' || criticalLogs.includes(log))
            .map((log, index) => ({
                id: log._id,
                type: log.status?.toLowerCase() === 'failed' ? 'Failed Authentication Attempt' : 'Critical Action Performed',
                user: (log.actorName || log.adminName || log.user) || 'Unknown',
                ip: log.ipAddress || 'N/A',
                time: log.createdAt ? format(new Date(log.createdAt), 'dd MMM, hh:mm a') : 'N/A',
                severity: log.status?.toLowerCase() === 'failed' ? 'Medium' : 'High',
                status: log.status?.toLowerCase() === 'failed' ? 'Open' : 'Resolved'
            })).slice(0, 10); // Show top 10

        return {
            totalActivities,
            failedLogins,
            activeSessionsCount: activeSessions.length,
            alertsCount: alerts.filter(a => a.status === 'Open').length,
            criticalLogs,
            activityChartData,
            activeSessions,
            alerts
        };
    }, [auditLogs, profile]);

    const TABS = [
        { id: 'dashboard', label: 'Dashboard', icon: Activity },
        { id: 'my-activity', label: 'My Activity', icon: Users },
        { id: 'auth-history', label: 'Auth History', icon: LogIn },
        { id: 'sessions', label: 'Active Sessions', icon: Monitor },
        { id: 'data-access', label: 'Data Access', icon: Database },
        { id: 'rbac', label: 'Role Audit', icon: Lock },
        { id: 'alerts', label: 'Alerts', icon: ShieldAlert },
    ];

    // Filter logs based on active tab
    const tabFilteredLogs = useMemo(() => {
        let filtered = [...(auditLogs || [])].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

        switch (activeTab) {
            case 'my-activity':
                const myId = profile?._id || (profile as unknown as { id?: string })?.id;
                if (myId) {
                    filtered = filtered.filter(l => l.actorId === myId || l.adminId === myId);
                }
                break;
            case 'auth-history':
                filtered = filtered.filter(l => {
                    const mod = l.module?.toLowerCase() || '';
                    const act = l.action?.toLowerCase() || '';
                    return mod.includes('auth') || act.includes('login') || act.includes('logout') || act.includes('password');
                });
                break;
            case 'data-access':
                filtered = filtered.filter(l => {
                    const mod = l.module?.toLowerCase() || '';
                    return mod.includes('report') || mod.includes('patient') || mod.includes('data');
                });
                break;
            case 'rbac':
                filtered = filtered.filter(l => {
                    const mod = l.module?.toLowerCase() || '';
                    return mod.includes('role') || mod.includes('permission') || mod.includes('rbac');
                });
                break;
            default:
                break; // 'dashboard', 'sessions', 'alerts' use their own views or all logs
        }
        return filtered;
    }, [auditLogs, activeTab, profile]);

    // Search query filtering
    const searchFilteredLogs = tabFilteredLogs.filter(log =>
    ((log.actorName || log.adminName || log.user)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.module?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalPages = Math.ceil(searchFilteredLogs.length / ITEMS_PER_PAGE);
    const paginatedLogs = searchFilteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // ======================= TAB VIEWS =======================
    const renderDashboard = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Activities', value: dynamicData.totalActivities, trend: 'neutral' },
                    { title: 'Failed Logins', value: dynamicData.failedLogins, trend: dynamicData.failedLogins > 0 ? 'down' : 'neutral' },
                    { title: 'Active Sessions', value: dynamicData.activeSessionsCount, trend: 'neutral' },
                    { title: 'Open Alerts', value: dynamicData.alertsCount, trend: 'up', alert: dynamicData.alertsCount > 0 },
                ].map((kpi, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                            {kpi.alert && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <h2 className="text-3xl font-semibold text-gray-900">{kpi.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Activity Trends (Last 7 Days)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dynamicData.activityChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} allowDecimals={false} />
                                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="activities" stroke="#2f5ba5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Total Activities" />
                                <Line type="monotone" dataKey="logins" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} name="Logins" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Authentication Failures</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dynamicData.activityChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} allowDecimals={false} />
                                <RechartsTooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="failed" fill="#EF4444" radius={[4, 4, 0, 0]} name="Failed Logins" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Critical Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2"><AlertTriangle size={18} className="text-orange-500" /> Recent Critical Actions</h3>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800" onClick={() => setActiveTab('data-access')}>View All</button>
                </div>
                <div className="p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-3 font-medium">User</th>
                                <th className="px-6 py-3 font-medium">Action</th>
                                <th className="px-6 py-3 font-medium">Target</th>
                                <th className="px-6 py-3 font-medium">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {dynamicData.criticalLogs.slice(0, 5).map((log, i) => (
                                <tr key={i} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedLog(log)}>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-xs border border-slate-200">
                                                {((log.actorName || log.adminName || log.user) || 'A')[0].toUpperCase()}
                                            </div>
                                            <span>{(log.actorName || log.adminName || log.user) || 'Admin'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><ActionBadge action={log.action} /></td>
                                    <td className="px-6 py-4 text-gray-500">{log.module}</td>
                                    <td className="px-6 py-4 text-gray-500">{log.createdAt ? format(new Date(log.createdAt), 'dd MMM yyyy, hh:mm a') : 'N/A'}</td>
                                </tr>
                            ))}
                            {dynamicData.criticalLogs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No critical actions recorded recently.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderActiveSessions = () => (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-500">
            <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">Currently Active Sessions</h3>
                <p className="mt-1 text-sm text-gray-500">Based on recent authentication events.</p>
            </div>
            <div className="p-0">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-3 font-medium">User</th>
                            <th className="px-6 py-3 font-medium">IP Address</th>
                            <th className="px-6 py-3 font-medium">Last Login</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {realActiveSessions.map((session: RealActiveSession) => {
                            const isCurrent = (profile?._id || (profile as unknown as { id?: string })?.id) === session.userId;
                            return (
                            <tr key={session._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                            <Monitor size={18} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 flex items-center gap-2">
                                                {session.userName || session.userRole || "User"}
                                                {isCurrent && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">CURRENT</span>}
                                            </p>
                                            <p className="text-gray-500 text-xs">{session.device || session.browser}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-600">{session.ipAddress || 'N/A'}</td>
                                <td className="px-6 py-4 text-gray-500">{session.lastActive ? format(new Date(session.lastActive), 'dd MMM, hh:mm a') : 'N/A'}</td>
                                <td className="px-6 py-4 text-right">
                                    {!isCurrent && (
                                        <button 
                                            onClick={() => handleRevoke(session._id)}
                                            className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1 justify-end w-full"
                                        >
                                            <FiLogOut size={14} /> Revoke
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )})}
                        {realActiveSessions.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No active sessions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderAlerts = () => (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-500">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Security Alerts</h3>
                    <p className="mt-1 text-sm text-gray-500">Dynamically generated alerts based on system activities.</p>
                </div>
            </div>
            <div className="p-0">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-3 font-medium">Alert Type</th>
                            <th className="px-6 py-3 font-medium">User / Source</th>
                            <th className="px-6 py-3 font-medium">Severity</th>
                            <th className="px-6 py-3 font-medium">Time</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {dynamicData.alerts.map((alert: SecurityAlert) => (
                            <tr key={alert.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{alert.type}</td>
                                <td className="px-6 py-4">
                                    <p className="text-gray-900">{alert.user}</p>
                                    <p className="text-xs font-mono text-gray-500">{alert.ip}</p>
                                </td>
                                <td className="px-6 py-4"><SeverityBadge severity={alert.severity} /></td>
                                <td className="px-6 py-4 text-gray-500">{alert.time}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${alert.status === 'Open' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-700'}`}>
                                        {alert.status}
                                    </span>
                                </td>
                                {/* <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Investigate</button>
                                </td> */}
                            </tr>
                        ))}
                        {dynamicData.alerts.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No security alerts triggered.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Generic List Table for Data Access, Roles, Auth, etc.
    const renderLogTable = (title: string, subtitle: string) => (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-500 overflow-hidden flex flex-col h-full">
            {/* Table Toolbar */}
            <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white z-10">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
                <table className="w-full min-w-[800px] text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase sticky top-0 z-10 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">Date & Time</th>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">Actor</th>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">Action</th>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">Target Module</th>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">Description</th>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                            <th className="px-6 py-4 font-medium text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-500">Loading audit logs...</td></tr>
                        ) : paginatedLogs.length === 0 ? (
                            <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-500">No logs found matching your criteria.</td></tr>
                        ) : (
                            paginatedLogs.map((log) => (
                                <tr key={log._id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer" onClick={() => setSelectedLog(log)}>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium text-[13px]">
                                        {log.createdAt ? format(new Date(log.createdAt), 'dd MMM yyyy, hh:mm a') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-xs border border-slate-200">
                                                {((log.actorName || log.adminName || log.user) || 'A')[0].toUpperCase()}
                                            </div>
                                            <span className="text-gray-900 font-medium">{(log.actorName || log.adminName || log.user) || 'Admin'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <ActionBadge action={log.action} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                                        {log.module}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 max-w-md truncate" title={log.description}>
                                        {log.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${(log.status || 'Success').toLowerCase() === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${(log.status || 'Success').toLowerCase() === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            {log.status || 'Success'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" onClick={(e) => { e.stopPropagation(); setSelectedLog(log); }}>
                                            <FiEye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {searchFilteredLogs.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
                    <p className="text-sm text-gray-500 font-medium">
                        Showing <span className="text-gray-900">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, searchFilteredLogs.length)}</span> to <span className="text-gray-900">{Math.min(currentPage * ITEMS_PER_PAGE, searchFilteredLogs.length)}</span> of <span className="text-gray-900">{searchFilteredLogs.length}</span> records
                    </p>
                    <div className="flex items-center gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-transparent transition-colors">
                            <FiChevronLeft />
                        </button>
                        <div className="flex gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum = currentPage;
                                if (currentPage <= 3) pageNum = i + 1;
                                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                else pageNum = currentPage - 2 + i;

                                if (pageNum > 0 && pageNum <= totalPages) {
                                    return (
                                        <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === pageNum ? 'bg-[#2f5ba5] text-white border-transparent' : 'border border-gray-200 text-gray-700 hover:bg-white bg-transparent'}`}>
                                            {pageNum}
                                        </button>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-transparent transition-colors">
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return renderDashboard();
            case 'sessions': return renderActiveSessions();
            case 'alerts': return renderAlerts();
            case 'my-activity': return renderLogTable('My Activity Log', 'View your personal activity history and actions.');
            case 'auth-history': return renderLogTable('Authentication History', 'Track successful logins, failed attempts, and password changes.');
            case 'data-access': return renderLogTable('Data Access Audit', 'Monitor access to sensitive patient information and reports.');
            case 'rbac': return renderLogTable('Role & Permission Audit', 'Track changes to user roles, permissions, and access levels.');
            default: return renderLogTable('Audit Logs', 'Comprehensive view of all system activities.');
        }
    };

    return (
           <div className="min-h-screen bg-white p-5 text-black md:p-12">

            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        Audit & Security
                    </h1>
                    <p className="mt-2 text-[#64748B] leading-relaxed font-light">
                        Monitor system activities, data access, and security events.
                    </p>
                </div>
            </div>

            <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex items-center gap-2 p-1 bg-gray-200/50 rounded-xl inline-flex min-w-max">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setCurrentPage(1); setSearchQuery(''); }}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/5'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                                    }`}
                            >
                                <Icon size={16} className={isActive ? 'text-[#2f5ba5]' : 'text-gray-400'} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <main className="flex-1 overflow-hidden flex flex-col">
                {renderContent()}
            </main>

            {selectedLog && (
                <AuditLogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
            )}
        </div>
    );
}
