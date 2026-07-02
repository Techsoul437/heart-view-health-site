/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLink, FiEye, FiClock } from "react-icons/fi";

interface LabItem {
  id: number;
  labName: string;
  location: string;
  status: "Active" | "Pending";
  branchName?: string;
  createdAt?: string;
}

const defaultLabs: LabItem[] = [
  {
    id: 1,
    labName: "City Diagnostic Lab",
    location: "Mumbai, MH",
    status: "Active",
    branchName: "df",
    createdAt: "2026-06-05T10:00:00",
  },
  {
    id: 2,
    labName: "ABC Diagnostics",
    location: "Delhi, DL",
    status: "Active",
    branchName: "3890",
    createdAt: "2026-06-05T09:30:00",
  },
  {
    id: 3,
    labName: "Care Path Lab",
    location: "Bangalore, KA",
    status: "Active",
    branchName: "3210",
    createdAt: "2026-06-05T09:00:00",
  },
  {
    id: 4,
    labName: "LifeCare Diagnostics",
    location: "Pune, MH",
    status: "Active",
    branchName: "2980",
    createdAt: "2026-06-05T08:30:00",
  },
  {
    id: 5,
    labName: "Good Health Lab",
    location: "Ahmedabad, GJ",
    status: "Pending",
    branchName: "1450",
    createdAt: "2026-06-05T08:00:00",
  },
];

export default function ResentLab() {
  const [labs, setLabs] = useState<LabItem[]>([]);

  useEffect(() => {
    const storedLabs = JSON.parse(
      localStorage.getItem("labs") || "[]"
    );

    const formattedLabs = storedLabs.map((lab: any) => ({
      ...lab,
      location:
        lab.location ||
        `${lab.city || ""}${lab.city && lab.state ? ", " : ""}${lab.state || ""
        }`,
      branchName: lab.branchName ?? 0,
      status: lab.status ?? "Pending",
    }));

    const data =
      formattedLabs.length > 0 ? formattedLabs : defaultLabs;

    const latestLabs = [...data]
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

    setLabs(latestLabs);
  }, []);

  return (
    <div className="min-h-125 rounded-2xl border border-slate-200 bg-[#f7f7f7] shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6">
        <div className="flex-1 min-w-0">
                    <h4 className="text-md md:text-lg xl:text-xl text-black">

            Recent Labs
          </h4>

          <p className="mt-5 sm:mt-1 whitespace-nowrap   text-[#64748B] font-light">
            Recently registered laboratories
          </p>
        </div>

        <Link href="/heartview-admin/labs">
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
                Lab Name
              </th>

              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">
                Location
              </th>


              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">
                branchName
              </th>
            </tr>
          </thead>

          <tbody>
            {labs.map((item) => (
              <tr
                key={item.id}
                className="border-b text-sm border-black/10 hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium text-[#64748B]">
                  {item.labName}
                </td>

                <td className="px-6 py-4 text-[#64748B]">
                  {item.location}
                </td>


                <td className="px-6 py-4 text-[#64748B]">
                  {item.branchName?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}