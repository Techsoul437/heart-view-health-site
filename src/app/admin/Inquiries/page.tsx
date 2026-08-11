"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FiTrash2,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiMail,
    FiMessageSquare,
    FiX,
} from "react-icons/fi";
import { getAllInquiry, deleteInquiry, type Inquiry } from "@/redux/Api";
import type { RootState, AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";

// Prefer `_id` as the unique key
const getInquiryKey = (i: Inquiry) => i._id as string;

export default function InquiriesPage() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        data: inquiries,
        loading: inquiryLoading,
        error: inquiryError,
    } = useSelector((state: RootState) => state.inquiry);

    useEffect(() => {
        dispatch(getAllInquiry());
    }, [dispatch]);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    // Inquiries removed from the UI after a successful delete API call
    const [deletedIds, setDeletedIds] = useState<(number | string)[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    // Full-message preview modal
    const [activeMessage, setActiveMessage] = useState<Inquiry | null>(null);

    const handleDelete = async (key: number | string) => {
        const id = String(key);

        if (!window.confirm("Are you sure you want to delete this inquiry?")) {
            return;
        }

        setDeletingId(id);
        setDeleteError(null);

        try {
            const result = await dispatch(deleteInquiry(id));

            if (deleteInquiry.fulfilled.match(result)) {
                toast.success(result.payload.message);

                // Remove row from UI
                setDeletedIds((prev) => [...prev, key]);

                // Refresh inquiry list
                dispatch(getAllInquiry());
            } else {
                throw result.payload;
            }
        } catch (err) {
            const message =
                typeof err === "string" ? err : "Failed to delete inquiry";

            setDeleteError(message);
            toast.error(message);
        } finally {
            setDeletingId(null);
        }
    };

    const itemsPerPage = 10;

    const visibleInquiries: Inquiry[] = useMemo(
        () =>
            (inquiries ?? []).filter(
                (i: Inquiry) => !deletedIds.includes(getInquiryKey(i))
            ),
        [inquiries, deletedIds]
    );

    // STATS
    const totalInquiries = visibleInquiries.length;

    const todayCount = useMemo(() => {
        const today = new Date().toDateString();
        return visibleInquiries.filter(
            (i) => i.createdAt && new Date(i.createdAt).toDateString() === today
        ).length;
    }, [visibleInquiries]);

    const uniqueEmailCount = useMemo(() => {
        const emails = visibleInquiries
            .map((i) => i.email?.toLowerCase())
            .filter((e): e is string => Boolean(e));
        return new Set(emails).size;
    }, [visibleInquiries]);

    const filteredInquiries = useMemo(() => {
        const q = search.toLowerCase();

        let list = visibleInquiries.filter((i) => {
            const nameMatch = (i.name ?? "").toLowerCase().includes(q);
            const emailMatch = (i.email ?? "").toLowerCase().includes(q);
            const phoneMatch = (i.phone ?? "").toString().toLowerCase().includes(q);
            const messageMatch = (i.message ?? "").toLowerCase().includes(q);

            return (
                q === "" || nameMatch || emailMatch || phoneMatch || messageMatch
            );
        });

        list = [...list].sort((a, b) => {
            if (sortBy === "name-az")
                return (a.name ?? "").localeCompare(b.name ?? "");
            if (sortBy === "name-za")
                return (b.name ?? "").localeCompare(a.name ?? "");
            if (sortBy === "newest")
                return (
                    new Date(b.createdAt ?? 0).getTime() -
                    new Date(a.createdAt ?? 0).getTime()
                );
            if (sortBy === "oldest")
                return (
                    new Date(a.createdAt ?? 0).getTime() -
                    new Date(b.createdAt ?? 0).getTime()
                );
            return 0;
        });

        return list;
    }, [visibleInquiries, search, sortBy]);

    const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
    const indexOfLastInquiry = currentPage * itemsPerPage;
    const indexOfFirstInquiry = indexOfLastInquiry - itemsPerPage;
    const currentInquiries = filteredInquiries.slice(
        indexOfFirstInquiry,
        indexOfLastInquiry
    );

    const truncate = (text: string, max: number) =>
        text.length > max ? `${text.slice(0, max)}…` : text;

    return (
        <div className="min-h-screen bg-white p-5 text-black md:p-12">
            {/* HEADER */}
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        Inquiries
                    </h1>
                    <p className="mt-2 text-[#64748B] leading-relaxed font-light">
                        View and manage inquiries
                    </p>
                </div>
            </div>

            {/* DELETE ERROR BANNER */}
            {deleteError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {deleteError}
                </div>
            )}

            {/* STATS CARDS */}
            <div className="mb-6 mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Total */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                        <FiMessageSquare className="text-xl text-blue-500" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">All inquiries</p>
                        <p className="text-2xl font-semibold text-black">{totalInquiries}</p>
                        <p className="text-sm text-[#64748B]">Total received</p>
                    </div>
                </div>

                {/* Today */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                        <FiMessageSquare className="text-xl text-green-500" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">Today</p>
                        <p className="text-2xl font-semibold text-black">{todayCount}</p>
                        <p className="text-sm text-[#64748B]">New inquiries</p>
                    </div>
                </div>

                {/* Unique senders */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                        <FiMail className="text-xl text-purple-500" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">Unique emails</p>
                        <p className="text-2xl font-semibold text-black">{uniqueEmailCount}</p>
                        <p className="text-sm text-[#64748B]">Distinct senders</p>
                    </div>
                </div>
            </div>

            {/* CONTROLS */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative w-full max-w-sm">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                        type="text"
                        placeholder="Search inquiries..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-black outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
                    />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">Sort by</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 rounded-lg border border-slate-200 text-sm bg-white px-3 text-black outline-none focus:border-blue-300"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="name-az">Name (A-Z)</option>
                        <option value="name-za">Name (Z-A)</option>
                    </select>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                <th className="px-5 py-3 text-left font-medium text-black">#</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Name</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Email</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Phone</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Message</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Submitted On</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiryLoading ? (
                                <tr>
                                    <td colSpan={7} className="py-14 text-center text-[#64748B]">
                                        Loading inquiries...
                                    </td>
                                </tr>
                            ) : inquiryError ? (
                                <tr>
                                    <td colSpan={7} className="py-14 text-center text-red-500">
                                        {typeof inquiryError === "string"
                                            ? inquiryError
                                            : "Failed to load inquiries."}
                                    </td>
                                </tr>
                            ) : currentInquiries.length > 0 ? (
                                currentInquiries.map((inquiry, index) => {
                                    const key = getInquiryKey(inquiry);
                                    const isDeleting = deletingId === key;
                                    return (
                                        <tr
                                            key={key}
                                            className="border-b border-slate-50 transition hover:bg-slate-50"
                                        >
                                            <td className="px-5 py-4 text-[#64748B]">
                                                {indexOfFirstInquiry + index + 1}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-sm text-black">
                                                    {inquiry.name || "—"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-[#64748B]">
                                                {inquiry.email || "—"}
                                            </td>
                                            <td className="px-5 py-4 text-sm text-[#64748B]">
                                                {inquiry.phone || "—"}
                                            </td>
                                            <td className="px-5 py-4 text-sm text-[#64748B] max-w-xs">
                                                <button
                                                    onClick={() => setActiveMessage(inquiry)}
                                                    className="text-left hover:underline"
                                                    title="Click to view full message"
                                                >
                                                    {inquiry.message
                                                        ? truncate(inquiry.message, 40)
                                                        : "—"}
                                                </button>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-[#64748B]">
                                                {inquiry.createdAt ? (
                                                    <>
                                                        <div>
                                                            {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </div>
                                                        <div>
                                                            {new Date(inquiry.createdAt).toLocaleTimeString("en-US", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </div>
                                                    </>
                                                ) : (
                                                    "—"
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleDelete(key)}
                                                        disabled={isDeleting}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-red-400 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                                    <td colSpan={7} className="py-14 text-center text-[#64748B]">
                                        No inquiries found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* FOOTER */}
                {filteredInquiries.length > 0 && (
                    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                        <p className="text-sm font-light text-[#64748B]">
                            Showing {indexOfFirstInquiry + 1} to{" "}
                            {Math.min(indexOfLastInquiry, filteredInquiries.length)} of{" "}
                            {filteredInquiries.length} inquiries
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                            >
                                <FiChevronLeft />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg font-semibold transition ${currentPage === i + 1
                                            ? "bg-[#2f5ba5] text-white"
                                            : "border border-slate-200 text-[#64748B] hover:bg-slate-50"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* FULL MESSAGE MODAL */}
            {activeMessage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setActiveMessage(null)}
                >
                    <div
                        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-black">
                                    {activeMessage.name || "—"}
                                </h3>
                                <p className="text-sm text-[#64748B]">
                                    {activeMessage.email} · {activeMessage.phone}
                                </p>
                            </div>
                            <button
                                onClick={() => setActiveMessage(null)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-50"
                            >
                                <FiX />
                            </button>
                        </div>
                        <p className="whitespace-pre-wrap text-sm text-black">
                            {activeMessage.message}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}