"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogData";
import Navbar from "@/Ui/navbar/Navbar";
import FinalCTA from "@/Ui/cta/FinalCTA";
import { motion, AnimatePresence } from "framer-motion";


export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

  // ✅ filter blogs by category
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="page-bg mt-20">
      <Navbar />

      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10  lg:pt-14">

        {/* HEADING */}

        <div className="w-full py-4 text-center">
          <motion.span className="inline-block text-xs font-semibold tracking-widest text-[#2f5ba5] uppercase border border-white/30 rounded-full px-4 py-1">
            {category.replace("-", " ")}


          </motion.span>

          <motion.h1 className="mt-4  text-2xl md:text-3xl lg:text-4xl font-medium text-black">
            {category.replace("-", " ")} Blogs


          </motion.h1>
        </div>
        {/* GRID */}
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-red-400">
            No blogs found ❌
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-4 md:gap-5 lg:gap-6 xl:gap-7">

            {filteredBlogs.map((blog) => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`} className="h-full">

                {/* SAME CARD DESIGN */}
                    <div className="group h-full flex flex-col
    border border-[#dcdcdc]
    rounded-xl p-3

    bg-white/90 backdrop-blur-sm

    

    transition-all duration-300">

                  {/* IMAGE */}
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">

                    {blog.content?.[0]?.images?.[0] && (
                      <Image
                        src={blog.content[0].images[0]}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    )}

                    {/* CATEGORY BADGE */}
               
                  <div
                    className="
    group relative inline-flex items-center
    rounded-full overflow-hidden
    text-white text-xs md:text-sm top-3 left-3
    px-2 py-1 lg:px-3
    shadow-md
  "
                  >
                    {/* Gradient Border */}
                    <span
                      className="
      absolute inset-0 rounded-full
      p-px
      bg-linear-to-r from-[#0f61b3] to-[#6AA2E5]/10
    "
                    />

                    {/* Inner Background */}
                    <span
                      className="
      absolute inset-px rounded-full
      bg-linear-to-r from-[#2f5ba5]/70 to-[#4a7bc9]/30
      backdrop-blur-md
    "
                    />

                    {/* Content */}
                    <span className="relative z-10 tracking-wide">
                      {blog.category.replace("-", " ").toUpperCase()}
                    </span>
                  </div>

                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-grow">

                    <h3 className="lg:text-xl sm:text-lg text-lg font-medium mt-4 text-black group-hover:text-[#2f5ba5] transition line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-base sm:text-lg  leading-relaxed lg:max-w-md font-light text-[#475569] line-clamp-2">
                      {blog.description}
                    </p>

                       <div className="mt-auto pt-1 flex justify-end">
                    <div className="mt-auto pt-1 flex justify-end">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full    bg-linear-to-r from-[#0f61b3]/70 to-[#4a7bc9]/60 text-white 
    group-hover:bg-[#2f5ba5]/70 group-hover:text-white transition-all duration-300">

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

                </div>

              </Link>
            ))}

          </div>
        )}
      </div>

      <FinalCTA />
    </div>
  );
}