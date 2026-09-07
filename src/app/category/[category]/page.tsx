"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "@/redux/Api";
import type { AppDispatch, RootState } from "@/redux/store";
import Navbar from "@/Ui/navbar/Navbar";
import Footer from "@/Ui/footer/Footer";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { useParams } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";


const ITEMS_PER_PAGE = 12;

export default function CategoryPage() {
  const params = useParams();
  const rawCategory = params?.category;
  const category = decodeURIComponent(Array.isArray(rawCategory) ? rawCategory[0] : (rawCategory || ""));
  const categoryLabels: Record<string, string> = {
    bp: "Blood Pressure",
  };

  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading } = useSelector((state: RootState) => state.BlogList);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const publishedBlogs = useMemo(() => {
    return blogs.filter((blog) => blog.status === "published");
  }, [blogs]);

  // ✅ filter blogs by category
  const filteredBlogs = useMemo(() => {
    return publishedBlogs.filter(
      (blog) => blog.category.toLowerCase() === category.toLowerCase()
    );
  }, [publishedBlogs, category]);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  return (
    <div className="page-bg pt-5  lg:pt-20">
      <Navbar />

      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-5  lg:pt-14">

        {/* HEADING */}
<Headerbadge  
  tag={category.replace("-", " ")}
  text={`Explore Our ${category.replace("-", " ")} Blogs`}
/>
        
        {/* GRID */}
        {loading && blogs.length === 0 ? (
          <p className="text-center text-[#64748B] py-10">
            Loading blogs...
          </p>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center text-[#64748B] py-10">
            No blogs found in this category.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-4 md:gap-5 lg:gap-6 xl:gap-7">
              {paginatedBlogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 mb-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                      currentPage === i + 1 
                        ? "bg-[#2f5ba5] text-white" 
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* <FinalCTA /> */}
      <Footer></Footer>
    </div>
  );
}