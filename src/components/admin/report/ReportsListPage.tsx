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
    FiSend,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllReports, ReportData, deleteReport, getAllUsers } from "@/redux/Api";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import ConfirmModal from "@/Ui/ConfirmModal";
// UI-level shape derived from ReportData
interface ReportItem {
    id: string;
    patientId: string;
    patientName: string;
    reportType: string;
    testDate: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    createdAt: string;
    role: string;
}

// Map backend ReportData -> UI ReportItem
function mapReport(r: ReportData): ReportItem {
    return {
        id: r._id,
        patientId: r.userId ?? "",
        patientName: r.userId ?? "—", // backend doesn't return patient name directly, adjust if API is updated
        reportType: r.lab_name ?? "General",
        testDate: r.report_date ?? "",
        fileName: r.filename ?? "Untitled Report",
        fileType: r.filename?.split(".").pop() ?? "",
        fileSize: 0,
        createdAt: r.createdAt ?? "",
        role: r.Role ?? r.Role ?? "",
    };
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
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [reports, setReports] = useState<ReportItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const pathname = usePathname();
    const currentRole = useMemo(() => {
        if (pathname.startsWith("/lab-admin")) return "lab-admin";
        if (pathname.startsWith("/lab-staff")) return "lab-staff";
        if (pathname.startsWith("/heartview-admin")) return "heartview-admin";
        return "";
    }, [pathname]);
    
    // LOAD REPORTS FROM API
  const fetchReports = async () => {
    try {
        setLoading(true);
        setError(null);
        const result = await dispatch(getAllReports()).unwrap();
        const mapped = (result?.data ?? []).map(mapReport);
        setReports(mapped);
    } catch (err) {
        setError(typeof err === "string" ? err : "Failed to load reports");
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
const [totalPatients, setTotalPatients] = useState(0);
useEffect(() => {
    fetchReports();

    const fetchPatients = async () => {
        try {
            const response = await dispatch(getAllUsers()).unwrap();
            setTotalPatients(response.data?.length || 0);
        } catch (error) {
            console.error("Failed to fetch patients:", error);
            setTotalPatients(0);
        }
    };

    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
    // STATS
const stats = useMemo(() => {
    if (!reports.length)
        return { total: 0, thisMonth: 0 };

    const now = new Date();
    const thisMonth = reports.filter((r) => {
        const d = new Date(r.createdAt);
        return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
        );
    }).length;

    return {
        total: reports.length,       // ✅ getAllReports se total count
        thisMonth,                   // ✅ getAllReports se filtered this-month count
    };
}, [reports]);

    // DELETE REPORT
   const handleDelete = async () => {
  if (!selectedId) return;

  try {
    setLoading(true);

    await dispatch(deleteReport(selectedId)).unwrap();

    toast.success("Report deleted successfully");

    fetchReports();

    setOpenDeleteModal(false);
    setSelectedId(null);
  } catch (error) {
    toast.error(
      typeof error === "string"
        ? error
        : "Failed to delete report"
    );
  } finally {
    setLoading(false);
  }
};

    // SEARCH FILTER (report type filter removed)
    const filteredReports = useMemo(() => {
        return reports.filter((report) => {
            const matchRole = !currentRole || currentRole === "heartview-admin" || report.role === currentRole;

            const matchSearch =
                !search ||
                report.patientId.toLowerCase().includes(search.toLowerCase()) ||
                report.fileName.toLowerCase().includes(search.toLowerCase());

            return matchRole && matchSearch;
        });
    }, [reports, currentRole, search]);

    // PAGINATION
    const totalPages = Math.max(
        1,
        Math.ceil(filteredReports.length / itemsPerPage)
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };
const [totalReports, setTotalReports] = useState(0);
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
            <ConfirmModal
  isOpen={openDeleteModal}
  title="Delete Report"
  message="Are you sure you want to delete this report? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  loading={loading}
  onConfirm={handleDelete}
  onCancel={() => {
    setOpenDeleteModal(false);
    setSelectedId(null);
  }}
/>
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        Uploaded Reports
                    </h1>
                    <p className="mt-2 text-[#64748B] leading-relaxed font-light">
                        View and manage all uploaded reports
                    </p>
                </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols mt-5 md:grid-cols-3 gap-3 mb-6">
                <div className="bg-white border border-black/5 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                        <FiFileText className="text-xl" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">Total Reports</p>
                        <p className="text-2xl font-semibold text-black leading-tight mt-0.5">
                            {stats.total ?? "—"}
                        </p>
                        <p className="text-[#64748B] mt-0.5 text-sm">uploaded reports</p>
                    </div>
                </div>

                <div className="bg-white border border-black/5 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                        <FiCalendar className="text-xl" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">This Month</p>
                        <p className="text-2xl font-semibold text-black leading-tight mt-0.5">
                            {stats.thisMonth ?? "—"}
                        </p>
                        <p className="text-sm text-[#64748B] mt-0.5">Reports uploaded</p>
                    </div>
                </div>

                <div className="bg-white border border-black/5 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 flex-shrink-0">
                        <FiUser className="text-xl" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">Total Patients</p>
                        <p className="text-2xl font-semibold text-black leading-tight mt-0.5">
                            {totalPatients.toLocaleString() ?? "—"}
                        </p>
                        <p className="text-sm text-[#64748B] mt-0.5">With reports</p>
                    </div>
                </div>
            </div>

            {/* SEARCH (type filter removed) */}
            <div className="flex flex-wrap gap-3 mb-5">
                <div className="relative flex-1 min-w-50 max-w-sm">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                        type="text"
                        placeholder="Search reports by user id or file name..."
                        value={search}
                        onChange={handleSearchChange}
                        className="h-10 w-full rounded-xl border text-sm border-black/10 bg-white pl-10 pr-4 text-black outline-none focus:border-cyan-400/40"
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-5 py-3.5 text-left font-medium text-black">Report</th>
                                <th className="px-5 py-3.5 text-left font-medium text-black">User ID</th>
                                <th className="px-5 py-3.5 text-left font-medium text-black">Test Date</th>
                                <th className="px-5 py-3.5 text-left font-medium text-black">Uploaded Date</th>
                                <th className="px-5 py-3.5 text-center font-medium text-black">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-[#64748B]">
                                        Loading reports...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-red-500">
                                        {error}
                                    </td>
                                </tr>
                            ) : currentReports.length > 0 ? (
                                currentReports.map((report) => {
                                    const fileStyle = getFileIconColor(report.fileType);
                                    const { date, time } = formatUploadDate(report.createdAt);
                                    return (
                                        <tr
                                            key={report.id}
                                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <p className="font-medium text-sm text-black">
                                                            {report.fileName}
                                                        </p>
                                                        <p className="text-[#64748B] mt-0.5 text-sm leading-relaxed font-light">
                                                            {fileStyle.label}
                                                            {report.fileSize
                                                                ? ` • ${formatFileSize(report.fileSize)}`
                                                                : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="text-[#64748B] text-sm font-medium cursor-pointer hover:underline">
                                                    {report.patientId}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-[#64748B]">
                                                {report.testDate}
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="text-sm text-black">{date}</p>
                                                <p className="text-[#64748B] mt-0.5 text-sm leading-relaxed font-light">{time}</p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        onClick={() => router.push(`/${currentRole}/reports/${report.id}`)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-black/10 text-blue-500 hover:bg-blue-50 transition-colors"
                                                        title="View report"
                                                    >
                                                        <FiEye />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            router.push(`/${currentRole}/report_link/add-report_link/${report.id}`)
                                                        }
                                                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-black/10 text-green-600 hover:bg-green-50"
                                                    >
                                                        <FiSend />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedId(report.id);
                                                            setOpenDeleteModal(true);
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-black/10 text-red-400 hover:bg-red-50 transition-colors"
                                                        title="Delete report"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-20 h-20 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-400">
                                                <FiFileText className="text-4xl" />
                                            </div>
                                            <h2 className="text-xl font-medium text-black">No Reports Found</h2>
                                            <p className="text-base sm:text-lg leading-relaxed font-light text-[#64748B]">
                                                Upload reports to show data here
                                            </p>
                                            {/* <div className="mt-1">
                                                <FillButton text="Upload Report" href="/lab-staff/staff_upload_report" />
                                            </div> */}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {!loading && !error && filteredReports.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 px-5 py-4">
                        <p className="text-sm leading-relaxed font-light text-[#64748B]">
                            Showing {indexOfFirstItem + 1} to{" "}
                            {Math.min(indexOfLastItem, filteredReports.length)} of{" "}
                            {filteredReports.length} reports
                        </p>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    <FiChevronLeft />
                                </button>

                                {getPageNumbers().map((p, i) =>
                                    p === "..." ? (
                                        <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center text-[#64748B]">
                                            …
                                        </span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => setCurrentPage(p as number)}
                                            className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 font-medium transition-colors ${currentPage === p
                                                ? "bg-[#2f5ba5] text-white"
                                                : "border border-black/10 bg-white text-[#64748B] hover:bg-gray-50"
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    )
                                )}

                                <button
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    <FiChevronRight />
                                </button>
                            </div>

                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="h-8 px-2 rounded-lg border border-black/10 bg-white text-[#64748B] outline-none cursor-pointer hover:bg-gray-50"
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