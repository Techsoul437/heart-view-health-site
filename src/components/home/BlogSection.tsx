"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "@/redux/Api";
import type { AppDispatch, RootState } from "@/redux/store";
import FillButton from "@/Ui/buttons/FillButton";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import BlogCard from "@/components/blog/BlogCard";

function BlogSection() {
  const [blogCount, setBlogCount] = useState(3);

  const dispatch = useDispatch<AppDispatch>();

  const { blogs, loading } = useSelector(
    (state: RootState) => state.BlogList
  );

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width >= 600 && width < 1024) {
        setBlogCount(4);
      } else {
        setBlogCount(3);
      }
    };

    updateCount();

    window.addEventListener("resize", updateCount);

    return () => {
      window.removeEventListener("resize", updateCount);
    };
  }, []);

  // Filter published blogs and reverse to show latest
  const publishedBlogs = [...blogs].filter((blog) => blog.status === "published").reverse();
  const selectedBlogs = publishedBlogs.slice(0, blogCount);

  return (
    <section className="max-w-screen-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10">
      {/* HEADING */}
      <Headerbadge tag="Blog" text="Latest from Our Blog" />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 mt-5">
        {loading ? (
          <>
            <div className="col-span-full text-center text-[#64748B] mb-2">
              Loading blogs...
            </div>

            {Array.from({ length: blogCount }).map((_, index) => (
              <div
                key={index}
                className="border border-[#dcdcdc] rounded-xl p-3 bg-white animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full aspect-video rounded-lg bg-gray-200" />

                {/* Content Skeleton */}
                <div className="flex flex-col mt-4">
                  <div className="h-6 bg-gray-200 rounded w-4/5" />

                  <div className="h-4 bg-gray-200 rounded w-full mt-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-2" />

                  <div className="flex justify-end mt-5">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : selectedBlogs.length > 0 ? (
          selectedBlogs.map((blog) => (
            <BlogCard key={blog._id || blog.slug} blog={blog} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-[#64748B]">
            No blogs found.
          </div>
        )}
      </div>

      {/* BUTTON */}
      <div className="text-center mt-10 space-y-4">
        <FillButton text="View More Blogs" href="/blog" />
      </div>
    </section>
  );
}

export default BlogSection;
