"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLink, FiEye, FiClock } from "react-icons/fi";

interface LinkItem {
  id: number;
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

export default function LatestLinks() {
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const storedLinks: LinkItem[] = JSON.parse(
      localStorage.getItem("reportLinks") || "[]"
    );

    const data =
      storedLinks.length > 0 ? storedLinks : defaultLinks;

    const latestLinks = [...data]
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLinks(latestLinks);
  }, []);

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
            className="shrink-0 whitespace-nowrap rounded-xl border border-[#2f5ba5]/20 bg-black px-4 py-2 text-white"

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