"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getLatestBlogs } from "@/redux/Api";
import type { AppDispatch, RootState } from "@/redux/store";
import FillButton from "@/Ui/buttons/FillButton";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

function BlogSection() {
  const [blogCount, setBlogCount] = useState(3);

  const dispatch = useDispatch<AppDispatch>();

  const { blogs, loading } = useSelector(
    (state: RootState) => state.BlogList
  );

  useEffect(() => {
    dispatch(getLatestBlogs());
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

  const categoryLabels: Record<string, string> = {
    bp: "Blood Pressure",
  };

  /*
   * API already returns published latest blogs.
   * So no need to filter by blog.status here.
   */
  const selectedBlogs = blogs.slice(0, blogCount);

  return (
    <section className="max-w-screen-8xl pt-10 mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20">
      {/* HEADING */}
      <Headerbadge tag="Blog" text="Latest from Our Blog" />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {loading ? (
          Array.from({ length: blogCount }).map((_, index) => (
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
          ))
        ) : selectedBlogs.length > 0 ? (
          selectedBlogs.map((blog) => (
            <Link
              key={blog._id || blog.slug}
              href={`/blog/${blog.slug}`}
            >
              <div
                className="
                  group h-full flex flex-col
                  border border-[#dcdcdc]
                  rounded-xl p-3
                  bg-white/90 backdrop-blur-sm
                  transition-all duration-300
                "
              >
                {/* IMAGE */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                  {blog.mainImage ? (
                    <Image
                      src={blog.mainImage}
                      alt={blog.title || "Blog image"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}

                  {/* CATEGORY BADGE */}
                  {blog.category && (
                    <div
                      className="
                        absolute
                        group
                        inline-flex
                        items-center
                        rounded-full
                        overflow-hidden
                        text-white
                        text-xs md:text-sm
                        top-3 left-3
                        px-2 py-1 lg:px-3
                        shadow-md
                      "
                    >
                      <span
                        className="
                          absolute inset-0 rounded-full p-px
                          bg-linear-to-r
                          from-[#0f61b3]
                          to-[#6AA2E5]/10
                        "
                      />

                      <span
                        className="
                          absolute inset-px rounded-full
                          bg-linear-to-r
                          from-[#2f5ba5]/70
                          to-[#4a7bc9]/30
                          backdrop-blur-md
                        "
                      />

                      <span className="relative z-10 tracking-wide">
                        {categoryLabels[blog.category.toLowerCase()] ||
                          blog.category
                            .replace("-", " ")
                            .toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-grow">
                  <h2
                    className="
                      lg:text-xl
                      sm:text-lg
                      text-lg
                      font-medium
                      mt-4
                      text-black
                      group-hover:text-[#2f5ba5]
                      transition
                      line-clamp-2
                    "
                  >
                    {blog.title}
                  </h2>

                  <p
                    className="
                      text-base
                      sm:text-lg
                      leading-relaxed
                      font-light
                      lg:max-w-md
                      text-[#64748B]
                      mt-2
                      line-clamp-2
                    "
                  >
                    {blog.description}
                  </p>

                  <div className="mt-auto pt-1 flex justify-end">
                    <div
                      className="
                        w-10 h-10
                        flex items-center justify-center
                        rounded-full
                        bg-linear-to-r
                        from-[#0f61b3]/70
                        to-[#4a7bc9]/60
                        text-white
                        group-hover:bg-[#2f5ba5]/70
                        transition-all duration-300
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-[#64748B]">
            No blogs found.
          </div>
        )}
      </div>

      {/* BUTTON */}
      <div className="text-center mt-10 space-y-4">
        <FillButton text="View More Blogs →" href="/blog" />
      </div>
    </section>
  );
}

export default BlogSection;