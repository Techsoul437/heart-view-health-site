"use client";

import FillButton from "@/Ui/buttons/FillButton";
import { useEffect, useMemo, useState } from "react";
import {
    FiChevronLeft,
    FiChevronRight,
    FiFileText,
    FiSearch,
    FiTrash2,
    FiEye,
    FiCalendar,
    FiUser,
    FiFilter,
    FiUpload,
    FiSend,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ReportItem {
    id: number;
    patientId: number;
    patientName: string;
    reportType: string;
    testDate: string;
    notes: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileData: string;
    createdAt: string;
}

function formatFileSize(bytes: number): string {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(1) + " MB";
}

function getFileIconColor(fileType: string): {
    bg: string;
    text: string;
    label: string;
} {
    const t = (fileType || "").toLowerCase();
    if (t.includes("pdf"))
        return { bg: "bg-red-50", text: "text-red-500", label: "PDF" };
    if (t.includes("xlsx") || t.includes("excel") || t.includes("spreadsheet"))
        return { bg: "bg-green-50", text: "text-green-600", label: "XLSX" };
    return { bg: "bg-blue-50", text: "text-blue-500", label: "DOC" };
}

function getBadgeStyle(type: string): string {
    const t = (type || "").toLowerCase();
    if (t.includes("ecg")) return "bg-blue-50 text-blue-700";
    if (t.includes("blood")) return "bg-yellow-50 text-yellow-700";
    if (t.includes("lipid")) return "bg-green-50 text-green-700";
    if (t.includes("echo")) return "bg-purple-50 text-purple-700";
    if (t.includes("tmt")) return "bg-rose-50 text-rose-700";
    return "bg-gray-100 text-gray-600";
}

function formatUploadDate(str: string): { date: string; time: string } {
    if (!str) return { date: "—", time: "" };
    const d = new Date(str);
    if (isNaN(d.getTime())) return { date: str, time: "" };
    const date = d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    const time = d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return { date, time };
}

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

export default function ReportsListPage() {
    const [reports, setReports] = useState<ReportItem[]>([]);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const router = useRouter();

    // LOAD REPORTS
    useEffect(() => {
        const storedReports = localStorage.getItem("reports");
        if (storedReports) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setReports(JSON.parse(storedReports));
        }
    }, []);

    // STATS — derived from data, show — when empty
    const stats = useMemo(() => {
        if (!reports.length)
            return { total: null, thisMonth: null, patients: null, views: null };
        const now = new Date();
        const thisMonth = reports.filter((r) => {
            const d = new Date(r.createdAt);
            return (
                d.getMonth() === now.getMonth() &&
                d.getFullYear() === now.getFullYear()
            );
        }).length;
        const uniquePatients = new Set(
            reports.map((r) => r.patientId ?? r.patientName)
        ).size;
        const storedViews = localStorage.getItem("report-views");
        const views = storedViews ? parseInt(storedViews) : null;
        return {
            total: reports.length,
            thisMonth,
            patients: uniquePatients,
            views,
        };
    }, [reports]);

    // DELETE REPORT
    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this report?"
        );
        if (!confirmDelete) return;
        const updatedReports = reports.filter((report) => report.id !== id);
        setReports(updatedReports);
        localStorage.setItem("reports", JSON.stringify(updatedReports));
    };

    // UNIQUE REPORT TYPES for filter dropdown
    const reportTypes = useMemo(() => {
        const types = Array.from(new Set(reports.map((r) => r.reportType).filter(Boolean)));
        return types;
    }, [reports]);

    // SEARCH + TYPE FILTER
    const filteredReports = useMemo(() => {
        return reports.filter((report) => {
            const matchSearch =
                !search ||
                report.patientName.toLowerCase().includes(search.toLowerCase()) ||
                report.reportType.toLowerCase().includes(search.toLowerCase()) ||
                report.fileName.toLowerCase().includes(search.toLowerCase());
            const matchType = !typeFilter || report.reportType === typeFilter;
            return matchSearch && matchType;
        });
    }, [reports, search, typeFilter]);

    // PAGINATION
    const totalPages = Math.max(
        1,
        Math.ceil(filteredReports.length / itemsPerPage)
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReports = filteredReports.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(e.target.value);
        setCurrentPage(1);
    };

    // Build pagination page numbers with ellipsis
    const getPageNumbers = () => {
        const pages: (number | "...")[] = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...");
            }
        }
        return pages;
    };

    return (
        <div className="min-h-screen p-5 md:p-12 text-black">
            {/* HEADER */}

            <div className="flex flex-col gap-5 lg:border-b border-black/8  md:flex-row md:items-start md:justify-between ">
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl  font-normal tracking-tight text-black">
                        Uploaded Reports
                    </h1>

                    <p className="mt-2 text-[#64748B]  text-base sm:text-lg  leading-relaxed  font-light">
                        View and manage all uploaded reports
                    </p>
                </div>


                <FillButton text="Upload Report" href="/lab-admin/upload-report" ></FillButton>

            </div>
            {/* STATS CARDS */}
            <div className="grid grid-cols mt-5 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {/* Total Reports */}
                <div className="bg-white border border-black/5 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                        <FiFileText className="text-xl" />
                    </div>
                    <div>
                        <p className="text-base sm:text-lg  leading-relaxed  font-light  text-[#64748B]">
Total Reports</p>
                        <p className="text-2xl font-semibold text-black leading-tight mt-0.5">
                            {stats.total ?? "—"}
                        </p>
                        <p className="  text-[#64748B] mt-0.5 text-base sm:text-lg  leading-relaxed  font-light ">All uploaded reports</p>
                    </div>
                </div>

                {/* This Month */}
                <div className="bg-white border border-black/5 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                        <FiCalendar className="text-xl" />
                    </div>
                    <div>
                        <p className="text-base sm:text-lg  leading-relaxed  font-light  text-[#64748B]">
This Month</p>
                        <p className="text-2xl font-semibold text-black leading-tight mt-0.5">
                            {stats.thisMonth ?? "—"}
                        </p>
                        <p className="  text-[#64748B] mt-0.5 text-base sm:text-lg  leading-relaxed  font-light ">Reports uploaded</p>
                    </div>
                </div>

                {/* Total Patients */}
                <div className="bg-white border border-black/5 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 flex-shrink-0">
                        <FiUser className="text-xl" />
                    </div>
                    <div>
                        <p className="text-base sm:text-lg  leading-relaxed  font-light  text-[#64748B]">
Total Patients</p>
                        <p className="text-2xl font-semibold text-black leading-tight mt-0.5">
                            {stats.patients ?? "—"}
                        </p>
                        <p className="  text-[#64748B] mt-0.5 text-base sm:text-lg  leading-relaxed  font-light ">With reports</p>
                    </div>
                </div>

            </div>

            {/* SEARCH + FILTERS */}
            <div className="flex flex-wrap gap-3 mb-5">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] " />
                    <input
                        type="text"
                        placeholder="Search reports by name or patient..."
                        value={search}
                        onChange={handleSearchChange}
                        className="h-10 w-full rounded-xl border border-black/10 bg-white pl-10 pr-4  text-black outline-none placeholder:text-[#64748B] focus:border-cyan-400/40"
                    />
                </div>



                {/* Report Type filter */}
                <select
                    value={typeFilter}
                    onChange={handleTypeChange}
                    className="h-10 px-4 rounded-xl border border-black/10 bg-white  text-[#64748B] outline-none cursor-pointer hover:bg-gray-50"
                >
                    <option value="">All Report Types</option>
                    {reportTypes.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>



            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse">
                        {/* HEADER */}
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-5 py-3.5 text-left  font-medium text-black">
                                    Report
                                </th>
                                <th className="px-5 py-3.5 text-left  font-medium text-black">
                                    Patient Name
                                </th>
                                <th className="px-5 py-3.5 text-left  font-medium text-black">
                                    Report Type
                                </th>
                                <th className="px-5 py-3.5 text-left  font-medium text-black">
                                    Test Date
                                </th>
                                <th className="px-5 py-3.5 text-left  font-medium text-black">
                                    Uploaded Date
                                </th>
                                <th className="px-5 py-3.5 text-center  font-medium text-black">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {currentReports.length > 0 ? (
                                currentReports.map((report) => {
                                    const fileStyle = getFileIconColor(report.fileType);
                                    const { date, time } = formatUploadDate(report.createdAt);
                                    return (
                                        <tr
                                            key={report.id}
                                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                        >
                                            {/* REPORT FILE */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${fileStyle.bg} ${fileStyle.text}`}
                                                    >
                                                        <FiFileText className="text-lg" />
                                                    </div>
                                                    <div>
                                                        <p className=" font-medium text-black">
                                                            {report.fileName}
                                                        </p>
                                                        <p className="  text-[#64748B] mt-0.5 text-base sm:text-lg  leading-relaxed  font-light ">
                                                            {fileStyle.label}
                                                            {report.fileSize
                                                                ? ` • ${formatFileSize(report.fileSize)}`
                                                                : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* PATIENT */}
                                            <td className="px-5 py-4">
                                                <span className=" text-[#64748B] font-medium cursor-pointer hover:underline">
                                                    {report.patientName}
                                                </span>
                                            </td>

                                            {/* REPORT TYPE */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center text-[#64748B]  font-medium `}
                                                >
                                                    {report.reportType}
                                                </span>
                                            </td>

                                            {/* TEST DATE */}
                                            <td className="px-5 py-4  text-[#64748B]">
                                                {report.testDate}
                                            </td>

                                            {/* UPLOAD DATE */}
                                            <td className="px-5 py-4">
                                                <p className=" text-black">{date}</p>
                                                <p className="  text-[#64748B] mt-0.5 text-base sm:text-lg  leading-relaxed  font-light ">{time}</p>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        onClick={() =>
                                                            router.push(`/lab-admin/reports/${report.id}`)
                                                        }
                                                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-black/10 text-blue-500 hover:bg-blue-50 transition-colors"
                                                        title="View report"
                                                    >
                                                        <FiEye className="" />
                                                    </button>
                                                    {/* <button
                                                        onClick={() =>
                                                            router.push(`/lab-admin/report_link/add-report_link/${report.id}`)
                                                        }
                                                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-black/10 text-green-600 hover:bg-green-50"
                                                    >
                                                        <FiSend />
                                                    </button> */}
                                                    <button
                                                        onClick={() => handleDelete(report.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-black/10 text-red-400 hover:bg-red-50 transition-colors"
                                                        title="Delete report"
                                                    >
                                                        <FiTrash2 className="" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-20 h-20 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-400">
                                                <FiFileText className="text-4xl" />
                                            </div>
                                            <h2 className="text-xl font-medium text-black">
                                                No Reports Found
                                            </h2>
                                            <p className="text-base sm:text-lg  leading-relaxed  font-light  text-[#64748B]">

                                                Upload reports to show data here
                                            </p>
                                            <div className="mt-1">
                                                <FillButton
                                                    text="Upload Report"
                                                    href="/lab-admin/upload-report"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {filteredReports.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 px-5 py-4">
                        <p className="text-base sm:text-lg  leading-relaxed  font-light  text-[#64748B]">

                            Showing {indexOfFirstItem + 1} to{" "}
                            {Math.min(indexOfLastItem, filteredReports.length)} of{" "}
                            {filteredReports.length} reports
                        </p>

                        <div className="flex items-center gap-3">
                            {/* PAGE BUTTONS */}
                            <div className="flex items-center gap-1.5">
                                {/* PREV */}
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    <FiChevronLeft className="" />
                                </button>

                                {getPageNumbers().map((p, i) =>
                                    p === "..." ? (
                                        <span
                                            key={`ellipsis-${i}`}
                                            className="flex h-8 w-8 items-center justify-center text-[#64748B] "
                                        >
                                            …
                                        </span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => setCurrentPage(p as number)}
                                            className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2  font-medium transition-colors ${currentPage === p
                                                ? "bg-[#2f5ba5] text-white"
                                                : "border border-black/10 bg-white text-[#64748B] hover:bg-gray-50"
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    )
                                )}

                                {/* NEXT */}
                                <button
                                    disabled={
                                        currentPage === totalPages || totalPages === 0
                                    }
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    <FiChevronRight className="" />
                                </button>
                            </div>

                            {/* PER PAGE SELECTOR */}
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="h-8 px-2 rounded-lg border border-black/10 bg-white  text-[#64748B] outline-none cursor-pointer hover:bg-gray-50"
                            >
                                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                                    <option key={n} value={n}>
                                        {n} / page
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}