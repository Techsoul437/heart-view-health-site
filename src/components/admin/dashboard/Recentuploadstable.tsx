"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllReports, ReportData } from "@/redux/Api";

interface RecentUploadsProps {
  year?: number;
  month?: number;
  date?: string;
}

export default function RecentUploadsTable({ year, month, date }: RecentUploadsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentReports();
  }, [year, month, date]);

  const fetchRecentReports = async () => {
    try {
      setLoading(true);

      const response = await dispatch(getAllReports()).unwrap();

      const allReports = response.data || [];
      const filtered = allReports.filter(report => {
          if (!report.createdAt) return false;
          if (date) {
             const tzOffset = new Date().getTimezoneOffset() * 60000;
             const linkDateStr = new Date(new Date(report.createdAt).getTime() - tzOffset).toISOString().split('T')[0];
             return linkDateStr === date;
          }
          if (year && month) {
             const linkDate = new Date(report.createdAt);
             return linkDate.getFullYear() === year && (linkDate.getMonth() + 1) === month;
          }
          return true;
      });

      const latestReports = filtered
        .sort(
          (a: ReportData, b: ReportData) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        )
        .slice(0, 5);

      setReports(latestReports);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-125 rounded-2xl border border-black/10 bg-[#f7f7f7] p-5 shadow-xl">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold text-black">
            Recent Uploads
          </h4>

          <p className="mt-1 text-sm text-[#64748B]">
            Latest uploaded reports
          </p>
        </div>

        <Link href="/lab-admin/reports">
          <button className="shrink-0 whitespace-nowrap rounded-xl bg-black h-10 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
            View All
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-black/10 text-left text-sm uppercase text-black">
              <th className="w-[58%] py-3 px-6">Report Name</th>
              <th className="w-[42%] py-3 px-6">Patient</th>
              <th className="w-[25%] py-3 px-6">Upload Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="py-10 text-center text-[#64748B]"
                >
                  Loading...
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="py-10 text-center text-[#64748B]"
                >
                  No reports uploaded yet
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report._id}
                  className="border-b border-black/5 hover:bg-black/5"
                >
                  <td className="py-4 px-6">
                    <div
                      className="max-w-full truncate text-sm font-medium text-[#64748B]"
                      title={report.filename}
                    >
                      {report.filename || "-"}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-[#64748B]">
                    {((report as unknown) as { patient?: { name?: string }; userId?: { name?: string; fullName?: string; } | string }).patient?.name || (typeof report.userId === 'object' && report.userId !== null ? (((report.userId as unknown) as {name?: string; fullName?: string}).name || ((report.userId as unknown) as {name?: string; fullName?: string}).fullName) : null) || "-"}
                  </td>

                

                  <td className="py-4 px-6 text-sm text-[#64748B]">
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleDateString("en-GB")
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
