"use client";

import React, { useState } from 'react';
import {
    Calendar, ChevronDown, X,
} from 'lucide-react';
import { FiChevronLeft, FiChevronRight, FiEye } from 'react-icons/fi';
import FillButton from '@/Ui/buttons/FillButton';

// Mock Data for the Audit Log Table
const auditLogs = [
    { id: 1, timestamp: '2026-06-20 10:45 AM', user: 'Dr. Ananya Sharma', action: 'Created', target: 'Patient (Ankit R.)', details: 'Registered new patient profile' },
    { id: 2, timestamp: '2026-06-20 09:15 AM', user: 'Lab Tech. Raj', action: 'Updated', target: 'Lab (PathCare)', details: 'Updated lab branch address' },
    { id: 3, timestamp: '2026-06-19 04:30 PM', user: 'Admin User', action: 'Deleted', target: 'Patient (Old Record)', details: 'Removed duplicate patient ID #4432' },
    { id: 4, timestamp: '2026-06-19 02:00 PM', user: 'Dr. Ananya Sharma', action: 'Login', target: 'System', details: 'Successful login from IP 192.168.1.10' },
    { id: 5, timestamp: '2026-06-19 11:20 AM', user: 'Manager Shyam', action: 'Created', target: 'User (New Staff)', details: 'Added new lab assistant account' },
];

// Helper component for Action Badges
const ActionBadge = ({ action }: { action: string }) => {
    const styles = {
        Created: 'bg-green-100 text-green-700 border border-green-200',
        Updated: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
        Deleted: 'bg-red-100 text-red-700 border border-red-200',
        Login: 'bg-blue-100 text-blue-700 border border-blue-200',
    };
    return (
        <span className={`px-3 py-1 rounded-full  font-semibold ${styles[action as keyof typeof styles] || 'bg-gray-100 text-[#64748B]'}`}>
            {action}
        </span>
    );
};

// View Details Modal — shows the full audit log entry that was clicked
const AuditLogDetailModal = ({
    log,
    onClose,
}: {
    log: typeof auditLogs[number];
    onClose: () => void;
}) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl  font-normal tracking-tight text-black">

                        Audit Log Details
                    </h1>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-[#64748B] hover:bg-slate-50"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mt-5 space-y-4">
                    <div>
                        <p className=" font-medium text-black">Timestamp</p>
                        <p className="mt-1 text-gray-500 font-medium">{log.timestamp}</p>
                    </div>

                    <div>
                        <p className=" font-medium text-black">User</p>
                        <p className="mt-1 text-[#64748B] text-base sm:text-lg  leading-relaxed  font-light font-medium">{log.user}</p>
                    </div>

                    <div>
                        <p className=" font-medium text-black">Action</p>
                        <div className="mt-1">
                            <ActionBadge action={log.action} />
                        </div>
                    </div>

                    <div>
                        <p className=" font-medium text-black">Target</p>
                        <p className="mt-1 text-[#64748B] text-base sm:text-lg  leading-relaxed  font-light">{log.target}</p>
                    </div>

                    <div>
                        <p className=" font-medium text-black">Details</p>
                        <p className="mt-1 text-[#64748B] text-base sm:text-lg  leading-relaxed  font-light">{log.details}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                    >
                        <FillButton text="Close" href=""></FillButton>

                    </button>
                </div>
            </div>
        </div>
    );
};

const AuditLogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLog, setSelectedLog] = useState<typeof auditLogs[number] | null>(null);

    const ITEMS_PER_PAGE = 10;

    const filtered = auditLogs;

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const getPageNumbers = () => {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    };

    return (
        <div className="min-h-screen bg-white p-5 text-black md:p-12">



            {/* ================= MAIN CONTENT ================= */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Top Header */}

                <div className="flex flex-col gap-5 lg:border-b border-black/8  md:flex-row md:items-start md:justify-between ">
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl  font-normal tracking-tight text-black">
                            Audit Logs
                        </h1>

                        <p className="mt-2 text-[#64748B]  text-base sm:text-lg  leading-relaxed  font-light">
                            Overview of user activities and system changes
                        </p>
                    </div>


                    {/* <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md border border-gray-200 text-[#64748B] text-sm cursor-pointer">
                            <Calendar size={16} className="mr-2" />
                            <span>June 2026</span>
                            <ChevronDown size={14} className="ml-2" />
                        </div>
                    </div> */}

                </div>
                {/* Content Area */}
                <div className="flex-1 overflow-auto pt-10 ">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">


                        {/* Table */}
                        <div className="overflow-x-auto">


                            <table className="w-full min-w-max border-collapse">

                                <thead >
                                    <tr className="border-b border-slate-100 bg-slate-50">

                                        <th className="px-5 py-3 text-left  font-medium text-black">
                                            Timestamp</th>
                                        <th className="px-5 py-3 text-left  font-medium text-black">
                                            User</th>
                                        <th className="px-5 py-3 text-left  font-medium text-black">
                                            Action</th>
                                        <th className="px-5 py-3 text-left  font-medium text-black">
                                            Target</th>
                                        <th className="px-5 py-3 text-left  font-medium text-black">
                                            Details</th>
                                        <th className="px-5 py-3 text-left  font-medium text-black">
                                            Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {auditLogs.map((log) => (
                                        <tr key={log.id} className="border-b border-slate-50 transition hover:bg-slate-50"
                                        >
                                            <td className="px-5 py-4 whitespace-nowrap text-gray-500 font-medium">
                                                {log.timestamp}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap flex items-center gap-3">

                                                <span className="text-[#64748B] font-medium">{log.user}</span>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap">
                                                <ActionBadge action={log.action} />
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-[#64748B]">
                                                {log.target}
                                            </td>
                                            <td className="px-5 py-4 text-[#64748B] max-w-50 truncate" title={log.details}>
                                                {log.details}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-start">
                                                    <div
                                                        className="rounded-xl bg-sky-100 p-3 cursor-pointer"
                                                        onClick={() => setSelectedLog(log)}
                                                    >
                                                        <FiEye className="text-xl text-sky-600" />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer / Pagination */}
                        {filtered.length > 0 && (
                            <div className="flex flex-col gap-4 border-t border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
                                <p className=" text-[#64748B] ">
                                    Showing{" "}
                                    {Math.min(
                                        (currentPage - 1) * ITEMS_PER_PAGE + 1,
                                        filtered.length
                                    )}{" "}
                                    to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{" "}
                                    {filtered.length} links
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => p - 1)}
                                        className="rounded-lg border border-slate-200 p-2 disabled:opacity-40 hover:bg-slate-50"
                                    >
                                        <FiChevronLeft></FiChevronLeft>
                                    </button>

                                    {getPageNumbers().map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setCurrentPage(p)}
                                            className={`rounded-lg px-4 py-2 font-medium transition-colors ${currentPage === p
                                                ? "bg-[#2f5ba5] text-white"
                                                : "border border-slate-200 hover:bg-slate-50"
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}

                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                        className="rounded-lg border border-slate-200 p-2 disabled:opacity-40 hover:bg-slate-50"
                                    >
                                        <FiChevronRight />
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            {selectedLog && (
                <AuditLogDetailModal
                    log={selectedLog}
                    onClose={() => setSelectedLog(null)}
                />
            )}
        </div>
    );
};


export default AuditLogs;