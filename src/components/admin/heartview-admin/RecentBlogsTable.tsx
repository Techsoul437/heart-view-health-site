"use client";

import { useEffect, useState } from "react";
import type { BlogData } from "@/redux/Api";
import type { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";

export default function RecentBlogsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading } = useSelector((state: RootState) => state.BlogList);

  const [recentBlogs, setRecentBlogs] = useState<BlogData[]>([]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const latest = [...blogs]
        .sort((a, b) => new Date(b.createdAt || b.publishDate || "").getTime() - new Date(a.createdAt || a.publishDate || "").getTime())
        .slice(0, 5);

      const normalized = latest.map((b) => ({
        // Ensure `_id` is a string to satisfy `BlogData` type
        ...b,
        _id: (b as any)._id ?? (b as any).slug ?? "",
      })) as BlogData[];

      setRecentBlogs(normalized);
    }
  }, [blogs]);

  return (
    <div className="rounded-2xl border min-h-[300px] border-slate-200 bg-[#f7f7f7] shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6">
        <div className="min-w-0 flex-1">
          <h4 className="text-md md:text-lg xl:text-xl text-black">
            Recent Blog Posts
          </h4>
          <p className="mt-5 sm:mt-1 whitespace-nowrap font-light text-[#64748B]">
            Latest articles
          </p>
        </div>

        <Link href="/admin/Blog">
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
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black text-sm">Title</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black text-sm">Category</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="py-10 text-center text-sm text-[#64748B]">Loading...</td></tr>
            ) : recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <tr key={blog._id} className="border-b border-black/10 transition hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-[#64748B] truncate max-w-[150px]">{blog.title}</td>
                  <td className="px-6 py-4 text-sm text-[#64748B]">{blog.category}</td>
                  <td className="px-6 py-4 text-sm text-[#64748B] capitalize">{blog.status}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={3} className="py-10 text-center text-sm text-[#64748B]">No blogs available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
