"use client";

import { useEffect, useState } from "react";
import type { Inquiry } from "@/redux/Api";
import type { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";

export default function RecentInquiriesTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: inquiries, loading } = useSelector((state: RootState) => state.inquiry);

  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    if (inquiries && inquiries.length > 0) {
      const latest = [...inquiries]
        .sort((a, b) => new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime())
        .slice(0, 5);
      setRecentInquiries(latest);
    }
  }, [inquiries]);

  return (
    <div className="rounded-2xl border min-h-[300px] border-slate-200 bg-[#f7f7f7] shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6">
        <div className="min-w-0 flex-1">
          <h4 className="text-md md:text-lg xl:text-xl text-black">
            Recent Inquiries
          </h4>
          <p className="mt-5 sm:mt-1 whitespace-nowrap font-light text-[#64748B]">
            Latest contact requests
          </p>
        </div>

        <Link href="/admin/Inquiries">
          <button className="shrink-0 whitespace-nowrap rounded-xl border border-[#2f5ba5]/20 bg-black px-4 py-2 text-white">
            View All
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/10">
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black text-sm">Name</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black text-sm">Email</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black text-sm">Phone</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="py-10 text-center text-sm text-[#64748B]">Loading...</td></tr>
            ) : recentInquiries.length > 0 ? (
              recentInquiries.map((inq) => (
                <tr key={inq._id} className="border-b border-black/10 transition hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-[#64748B]">{inq.name}</td>
                  <td className="px-6 py-4 text-sm text-[#64748B]">{inq.email}</td>
                  <td className="px-6 py-4 text-sm text-[#64748B]">{inq.phone}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={3} className="py-10 text-center text-sm text-[#64748B]">No inquiries available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
