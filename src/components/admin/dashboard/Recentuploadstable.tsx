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
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
                      <h4 className="text-md md:text-lg xl:text-xl text-black">

            Recent Uploads
          </h4>

          <p className="mt-5 sm:mt-1 whitespace-nowrap  font-light text-[#64748B]">
            Latest uploaded reports
          </p>
        </div>

        <Link href="/lab-admin/reports">
          <button
            className="shrink-0 whitespace-nowrap rounded-xl border border-[#2f5ba5]/20 bg-black px-4 py-2 text-white"
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
                    <span className="font-medium text-sm  text-[#64748B]">
                      {report.fileName}
                    </span>
                  </td>

                  <td className="py-4 pr-4 text-sm  text-[#64748B]">
                    {report.patientName}
                  </td>

                  <td className="py-4 pr-4 text-sm  text-[#64748B]">
                    {report.reportType}
                  </td>

                  <td className="py-4 text-sm   text-[#64748B]">
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