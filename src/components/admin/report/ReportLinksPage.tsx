"use client";

import {
  FiSearch,
  FiSend,
  FiDownload,
  FiLink,
  FiChevronLeft,
  FiChevronRight,
  FiInbox,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllReportLinks, deleteReportLink } from "@/redux/Api";
import FillButton from "@/Ui/buttons/FillButton";
import ConfirmModal from "@/Ui/ConfirmModal";
import { usePathname } from "next/navigation";

interface SentLink {
  id: string;
  reportId: number;
  patientName: string;
  patientInitials: string;
  report: string;
  date: string;
  mobile: string;
  maskedMobile: string;
  status: "Sent" | "Viewed" | "Downloaded" | "Failed";
  sentOn: string;
  sentTime: string;
  expireOn: string;
  expireTime: string;
  linkUrl: string;
  viewed: boolean;
  downloaded: boolean;
}

const STATUS_OPTIONS = ["All Status", "Sent", "Viewed", "Downloaded", "Failed"];
const ITEMS_PER_PAGE = 10;

function getStatusStyle(status: string) {
  switch (status) {
    case "Viewed":
      return " text-blue-700";
    case "Sent":
      return " text-[#64748B] ";
    case "Downloaded":
      return "text-green-700";
    case "Failed":
      return " text-red-700";
    default:
      return "text-[#64748B] ";
  }
}


export default function ReportLinksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { reportLinks, loading } = useSelector((state: RootState) => state.sendReportLink);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
const pathname = usePathname();
const role = pathname.split("/")[1]; // lab-admin / staff
  useEffect(() => {
    dispatch(getAllReportLinks());
  }, [dispatch]);

  const links: SentLink[] = useMemo(() => {
    if (!reportLinks) return [];
    
    type ReportLinkResponse = {
      _id: string;
      patientId?: { name?: string; fullName?: string };
      reportId?: { report_name?: string; _id?: string };
      createdAt?: string;
      expiresAt?: string;
      status?: string;
      viewed?: boolean;
      downloaded?: boolean;
      mobile: string;
      linkUrl: string;
    };

    return (reportLinks as unknown as ReportLinkResponse[]).map((link) => {
      const pName = link.patientId?.name || link.patientId?.fullName || "Unknown";
      const pInitials = pName.substring(0, 2).toUpperCase();
      const rName = link.reportId?.report_name || "Report";
      // Fallback numerical ID for display if needed
      const rIdNum = link.reportId?._id ? parseInt(link.reportId._id.slice(-6), 16) % 10000 : 0;
      const cDate = link.createdAt ? new Date(link.createdAt) : new Date();
      const eDate = link.expiresAt ? new Date(link.expiresAt) : new Date();

      let status = link.status || "Sent";
      if (link.viewed) status = "Viewed";
      if (link.downloaded) status = "Downloaded";

      return {
        id: link._id,
        reportId: rIdNum,
        patientName: pName,
        patientInitials: pInitials,
        report: rName,
        date: cDate.toLocaleDateString(),
        mobile: link.mobile,
        maskedMobile: link.mobile,
        status: status as SentLink["status"],
        sentOn: cDate.toLocaleDateString(),
        sentTime: cDate.toLocaleTimeString(),
        expireOn: eDate.toLocaleDateString(),
        expireTime: eDate.toLocaleTimeString(),
        linkUrl: link.linkUrl,
        viewed: link.viewed || false,
        downloaded: link.downloaded || false,
      };
    });
  }, [reportLinks]);

  const handleDelete = () => {
    if (!selectedId) return;
    setIsDeleting(true);
    dispatch(deleteReportLink(selectedId)).then(() => {
      dispatch(getAllReportLinks());
      setIsDeleting(false);
      setOpenDeleteModal(false);
      setSelectedId(null);
    }).catch(() => {
      setIsDeleting(false);
    });
  };

  // Stats derived from real data
  const stats = useMemo(() => {
    const total = links.length;
    const sent = links.filter((l) => l.status === "Sent").length;
    const viewed = links.filter(
      (l) => l.status === "Viewed" || l.viewed
    ).length;
    const downloaded = links.filter(
      (l) => l.status === "Downloaded" || l.downloaded
    ).length;
    return { total, sent, viewed, downloaded };
  }, [links]);

  // Filter
  const filtered = useMemo(() => {
    return links.filter((l) => {
      const matchSearch =
        !search ||
        l.patientName.toLowerCase().includes(search.toLowerCase()) ||
        l.maskedMobile.includes(search) ||
        l.report.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "All Status" || l.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [links, search, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
    <div className="min-h-screen bg-white p-5 md:p-12">
      <div className="mx-auto max-w-8xl space-y-6">
        {/* Header */}
        <ConfirmModal
          isOpen={openDeleteModal}
          title="Delete Report Link"
          message="Are you sure you want to delete this sent link? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          loading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => {
            setOpenDeleteModal(false);
            setSelectedId(null);
          }}
        />

        <div className="flex flex-col gap-5   md:flex-row md:items-start md:justify-between ">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl   font-normal tracking-tight text-black">
              Report Links
            </h1>

            <p className="mt-2 text-[#64748B]   leading-relaxed  font-light">
              Send, track and manage report links shared with patients.
            </p>
          </div>


          <FillButton text="Send New Link"  href={`/${role}/reports`} ></FillButton>

        </div>
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-100 p-3">
                <FiLink className="text-xl text-blue-600" />
              </div>
              <div>
                <p className=" text-[#64748B] ">Total Links</p>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {stats.total || "—"}
                </h3>
                <p className="text-sm text-[#64748B] ">All time</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-indigo-100 p-3">
                <FiSend className="text-xl text-indigo-600" />
              </div>
              <div>
                <p className=" text-[#64748B] ">Sent</p>
                <h3 className="text-3xl font-bold text-slate-900">
                  {stats.total ? stats.sent : "—"}
                </h3>
                <p className="text-sm text-[#64748B] ">
                  {stats.total
                    ? `${Math.round((stats.sent / stats.total) * 100)}% of total`
                    : "No links yet"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-sky-100 p-3">
                <FiEye className="text-xl text-sky-600" />
              </div>
              <div>
                <p className=" text-[#64748B] ">Viewed</p>
                <h3 className="text-3xl font-bold text-slate-900">
                  {stats.total ? stats.viewed : "—"}
                </h3>
                <p className="text-sm text-[#64748B] ">
                  {stats.total
                    ? `${Math.round((stats.viewed / stats.total) * 100)}% of total`
                    : "No links yet"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-green-100 p-3">
                <FiDownload className="text-xl text-green-600" />
              </div>
              <div>
                <p className=" text-[#64748B] ">Downloaded</p>
                <h3 className="text-3xl font-bold text-slate-900">
                  {stats.total ? stats.downloaded : "—"}
                </h3>
                <p className="text-sm text-[#64748B] ">
                  {stats.total
                    ? `${Math.round((stats.downloaded / stats.total) * 100)}% of total`
                    : "No links yet"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="max-w-4xl ">
          <div className="flex flex-col gap-4 xl:flex-row">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] " />
              <input
                type="text"
                placeholder="Search by patient name, mobile, or report type..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4  text-sm outline-none focus:border-[#2f5ba5]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none cursor-pointer"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Table Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Patient",
                    "Report",
                    "Mobile",
                    "Status",
                    "Sent On",
                    "Expires On",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className={`px-5 py-4  font-medium uppercase tracking-wider text-black  ${h === "Actions" ? "text-center" : "text-left"
                        }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-100  hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                        
                          <div>
                            <p className="font-medium text-sm text-slate-900">
                              {item.patientName}
                            </p>
                            <p className="text-sm text-[#64748B] ">
                              Report #{item.reportId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-sm text-slate-900">
                          {item.report}
                        </p>
                        <p className=" text-[#64748B] text-sm">{item.date}</p>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#64748B] ">
                        {item.maskedMobile}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm  font-medium ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-900">{item.sentOn}</p>
                        <p className="text-sm text-[#64748B] ">{item.sentTime}</p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-900">{item.expireOn}</p>
                        <p className="text-sm text-[#64748B] ">
                          {item.expireTime}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedId(item.id);
                              setOpenDeleteModal(true);
                            }}
                            className="rounded-lg border border-slate-200 p-2 text-red-400 hover:bg-red-50 transition-colors"
                            title="Delete link"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                          <FiInbox size={40} />
                        </div>
                        <h2 className="text-xl font-medium text-[#64748B] ">
                          No Links Sent Yet
                        </h2>
                        <p className=" text-[#64748B] ">
                          {search || statusFilter !== "All Status"
                            ? "No links match your filter"
                            : "Go to Reports and click the send button to share a report"}
                        </p>
                        {/* {!search && statusFilter === "All Status" && (

                          <FillButton text="Go to Reports" href="/lab-staff/reports"></FillButton>
                        )} */}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          {filtered.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-sm text-[#64748B] ">
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
                  <FiChevronLeft />
                </button>

                {getPageNumbers().map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`e${i}`}
                      className="px-2 text-[#64748B]  "
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p as number)}
                      className={`rounded-lg px-4 py-2  font-medium transition-colors ${currentPage === p
                          ? "bg-[#2f5ba5] text-white"
                          : "border border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      {p}
                    </button>
                  )
                )}

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
    </div>
  );
}