"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function RecentUploadsTable() {
  const [reports, setReports] = useState<ReportItem[]>([]);

  useEffect(() => {
    const storedReports = localStorage.getItem("reports");

    if (storedReports) {
      const parsedReports: ReportItem[] =
        JSON.parse(storedReports);

      // Latest 5 reports
      const latestReports = parsedReports
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 5);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReports(latestReports);
    }
  }, []);

  return (
    <div
      className="
        rounded-2xl
        border border-black/10
        bg-[#f7f7f7]
        p-5
        shadow-xl
        min-h-125
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h4 className="text-lg md:text-xl xl:text-2xl text-black">
            Recent Uploads
          </h4>

          <p className="mt-1 text-[#64748B]   font-light">
            Latest uploaded reports
          </p>
        </div>
        <Link
          href="/lab-admin/reports"
        >
          <button
            className="
            rounded-xl
            border border-indigo-500/20
            bg-[#4a7bc9]/20
            px-3 py-1.5
            text-[#2f5ba5]
            transition-all
            hover:bg-indigo-500/20
          "
          >
            View All
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-162.5">
          <thead>
            <tr
              className="
                border-b border-black/10
                text-left
                uppercase
                tracking-wider
                text-black
              "
            >
              <th className="pb-3 pr-4 font-normal">
                Report Name
              </th>

              <th className="pb-3 pr-4 font-normal">
                Patient Name
              </th>

              <th className="pb-3 pr-4 font-normal">
                Report Type
              </th>

              <th className="pb-3 pr-4 font-normal">
                Upload Date
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr
                  key={report.id}
                  className="
                    border-b border-black/5
                    transition-all
                    hover:bg-black/5
                    last:border-0
                  "
                >
                  <td className="py-4 pr-4 ">
                    <span className="font-medium text-[#64748B]">
                      {report.fileName}
                    </span>
                  </td>

                  <td className="py-4 pr-4 text-[#64748B]">
                    {report.patientName}
                  </td>

                  <td className="py-4 pr-4 text-[#64748B]">
                    {report.reportType}
                  </td>

                  <td className="py-4 text-[#64748B]">
                    {new Date(
                      report.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-[#64748B]"
                >
                  No reports uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}