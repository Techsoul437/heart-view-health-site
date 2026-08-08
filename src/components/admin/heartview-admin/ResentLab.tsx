"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { getAllLabs } from "@/redux/Api";

export default function ResentLab() {
  const dispatch = useDispatch<AppDispatch>();

  const { labs, loading } = useSelector(
    (state: RootState) => state.getalllabs
  );

  useEffect(() => {
    dispatch(getAllLabs());
  }, [dispatch]);

  const latestLabs = [...labs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="min-h-125 rounded-2xl border border-slate-200 bg-[#f7f7f7] shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6">
        <div className="flex-1 min-w-0">
          <h4 className="text-md md:text-lg xl:text-xl text-black">
            Recent Labs
          </h4>

          <p className="mt-5 sm:mt-1 whitespace-nowrap text-[#64748B] font-light">
            Recently registered laboratories
          </p>
        </div>

        {/* <Link href="/heartview-admin/labs">
          <button className="shrink-0 whitespace-nowrap rounded-xl border border-[#2f5ba5]/20 bg-black px-4 py-2 text-white">
            View All
          </button>
        </Link> */}
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
                Branch Name
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-10 text-center">
                  Loading...
                </td>
              </tr>
            ) : latestLabs.length > 0 ? (
              latestLabs.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-black/10 hover:bg-slate-50 text-sm"
                >
                  <td className="px-6 py-4 font-medium text-[#64748B]">
                    {item.labName}
                  </td>

                  <td className="px-6 py-4 text-[#64748B]">
                    {item.city || "-"}
                  </td>

                  <td className="px-6 py-4 text-[#64748B]">
                    {item.branchName || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-10 text-center text-gray-500"
                >
                  No Labs Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}