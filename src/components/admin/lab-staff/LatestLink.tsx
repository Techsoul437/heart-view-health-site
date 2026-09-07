"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { FiLink, FiEye, FiClock } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllReportLinks } from "@/redux/Api";

interface LinkItem {
  id: string | number;
  patientName: string;
  mobile: string;
  reportName: string;
  status: "Viewed" | "Pending";
  createdAt?: string;
}

const defaultLinks: LinkItem[] = [
  {
    id: 1,
    patientName: "Rajesh Patel",
    mobile: "9876543210",
    reportName: "CBC Report",
    status: "Viewed",
    createdAt: "2026-06-05T10:00:00",
  },
  {
    id: 2,
    patientName: "Priya Shah",
    mobile: "9876543211",
    reportName: "Blood Sugar",
    status: "Pending",
    createdAt: "2026-06-05T09:30:00",
  },
  {
    id: 3,
    patientName: "Amit Mehta",
    mobile: "9876543212",
    reportName: "Lipid Profile",
    status: "Viewed",
    createdAt: "2026-06-05T09:00:00",
  },
  {
    id: 4,
    patientName: "Neha Joshi",
    mobile: "9876543213",
    reportName: "Thyroid Test",
    status: "Pending",
    createdAt: "2026-06-05T08:30:00",
  },
  {
    id: 5,
    patientName: "Karan Desai",
    mobile: "9876543214",
    reportName: "Vitamin D",
    status: "Viewed",
    createdAt: "2026-06-05T08:00:00",
  },
];

interface LatestLinksProps { year?: number; month?: number; date?: string; }
export default function LatestLinks({ year, month, date }: LatestLinksProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { reportLinks } = useSelector((state: RootState) => state.sendReportLink);

  useEffect(() => {
    dispatch(getAllReportLinks());
  }, [dispatch]);

  const links = useMemo(() => {
    // Map backend data to LinkItem format
    type ReportLinkResponse = {
      _id: string;
      patientId?: { name?: string; fullName?: string };
      reportId?: { report_name?: string; _id?: string };
      createdAt?: string;
      status?: string;
      viewed?: boolean;
      mobile: string;
    };

    const backendLinks = ((reportLinks as unknown as ReportLinkResponse[]) || []).map((link) => {
      const pName = link.patientId?.name || link.patientId?.fullName || "-";
      const rName = link.reportId?.report_name || "Report";
      let status = link.status || "Pending";
      if (link.viewed) status = "Viewed";

      return {
        id: link._id as string,
        patientName: pName,
        mobile: link.mobile,
        reportName: rName,
        status: status as "Viewed" | "Pending",
        createdAt: link.createdAt,
      };
    });

    const data = backendLinks.length > 0 ? backendLinks : defaultLinks;

    let filteredLinks = data;
    if (date) {
        filteredLinks = data.filter(p => {
            if (!p.createdAt) return false;
            const d = new Date(p.createdAt);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}` === date;
        });
    }

    return [...filteredLinks]
      .sort((a, b) => {
        const dateA = a.createdAt
          ? new Date(a.createdAt).getTime()
          : 0;

        const dateB = b.createdAt
          ? new Date(b.createdAt).getTime()
          : 0;

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [date, reportLinks]);

  return (
    <div className="min-h-125 rounded-2xl border border-slate-200 bg-[#f7f7f7] shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6">
        <div className="min-w-0 flex-1">
          <h4 className="text-md md:text-lg xl:text-xl text-black">
            Recent Report Links
          </h4>

          <p className="mt-5 sm:mt-1 whitespace-nowrap  font-light text-[#64748B]">
            Recently shared report links
          </p>
        </div>

        <Link href="/lab-staff/report-links/history">
          <button
            className="shrink-0 whitespace-nowrap rounded-xl bg-black h-10 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            View All
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/10">
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">
                Patient
              </th>

              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">
                Report
              </th>

              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">
                Mobile
              </th>

              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {links.length > 0 ? (
              links.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-black/10 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <span className="font-medium text-sm text-[#64748B]">
                        {item.patientName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[#64748B]">
                    {item.reportName}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#64748B]">
                    {item.mobile}
                  </td>

                  <td className="px-6 text-sm py-4">
                    {item.status === "Viewed" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 font-medium px-3 py-1 text-sm text-green-700">
                        Viewed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 font-medium px-3 py-1 text-sm text-amber-700">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-black"
                >
                  No links available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}