"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogData";
import { motion } from "framer-motion";
import FillButton from "@/Ui/buttons/FillButton";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

function BlogSection() {
  const [blogCount, setBlogCount] = useState(3);
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width >= 600 && width < 1024) {
        // Tablet (Tailwind md)
        setBlogCount(4);
      } else {
        setBlogCount(3);
      }
    };

    updateCount(); // initial call
    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);
  const categories = [
    "all",
    ...new Set(blogs.map((b) => b.category)),
  ];
  const selectedBlogs = blogs.slice(0, blogCount);
  return (
    <section className="max-w-screen-8xl pt-10 mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 ">

      {/* HEADING */}
    <Headerbadge tag="Blog" text="Latest from Our Blog" />
      {/* CATEGORY TAGS */}

 <div className="flex flex-wrap gap-4 mt-4">
  {categories
    .filter((item) => item.toLowerCase() !== "all")
    .map((item, index) => (
      <Link
        key={index}
        href={`/category/${item.toLowerCase()}`}
        className="basis-32" // 👈 same width (Tailwind scale)
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-center w-full py-2 rounded-full border capitalize border-white/10 bg-white/5 text-white/70 text-sm sm:text-base font-light backdrop-blur-md hover:bg-white/10 transition"
        >
          {item}
        </motion.span>
      </Link>
    ))}
</div>
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 ">

        {selectedBlogs.map((blog) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`}>

            {/* CARD */}
            <div className="group h-full flex flex-col border border-[#181E2B] rounded-lg p-3
              shadow-[0_4px_20px_rgba(0,0,0,0.25)]
              hover:shadow-[0_8px_30px_rgba(61,119,115,0.35)]
              transition-all duration-300">

              {/* IMAGE */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">

                <Image
                  src={blog.content[0].images[0]}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />

                {/* 🔥 CATEGORY BADGE */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-[#181E2B] to-[#3D7773] backdrop-blur-md text-white text-xs md:text-sm px-2 py-1 lg:px-3 rounded-full shadow-md">
                  {blog.category.replace("-", " ").toUpperCase()}
                </div>

              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-grow">

                <h2 className="lg:text-xl sm:text-lg text-lg font-medium mt-4 text-white group-hover:text-[#3D7773] transition line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-base sm:text-lg  leading-relaxed lg:max-w-md font-light text-gray-400 mt-2 line-clamp-2 ">
                  {blog.description}
                </p>

                {/* OPTIONAL: PUSH CONTENT DOWN */}
                <div className="mt-auto pt-1 flex justify-end">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#45657D] to-[#3D7773] text-white 
    group-hover:bg-[#3D7773] group-hover:text-white transition-all duration-300">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>

                  </div>
                </div>

              </div>

            </div>

          </Link>
        ))}

      </div>

      {/* BUTTONS */}
      <div className="text-center mt-12 space-y-4">
        <FillButton text="View More Blogs →" href="/blog" />
      </div>

    </section>
  );
}

export default BlogSection;