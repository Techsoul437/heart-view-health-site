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
    <div className="page-bg">
      <Navbar />

      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-10  lg:pt-14">

        {/* HEADING */}

        <div className="w-full py-4 text-center">
          <motion.span className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1">
            {category.replace("-", " ")}


          </motion.span>

          <motion.h1 className="mt-4  text-2xl md:text-3xl lg:text-4xl font-medium text-white">
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
                <div className="group flex flex-col h-full border border-[#181E2B] rounded-lg p-3 shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                hover:shadow-[0_8px_30px_rgba(61,119,115,0.35)] transition-all duration-300">

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
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#181E2B] to-[#3D7773] backdrop-blur-md text-white text-xs md:text-sm px-2 py-1 lg:px-3 rounded-full shadow-md">
                      {blog.category.replace("-", " ").toUpperCase()}
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-grow">

                    <h3 className="lg:text-xl sm:text-lg text-lg font-medium mt-4 text-white group-hover:text-[#3D7773] transition line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-base sm:text-lg  leading-relaxed lg:max-w-md font-light text-white/60 line-clamp-2">
                      {blog.description}
                    </p>

                    <div className="mt-auto pt-2">
                      <span className="text-[#3D7773] text-sm md:text-md font-medium">
                        Read More →
                      </span>
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