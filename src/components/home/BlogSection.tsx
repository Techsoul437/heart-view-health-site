"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogData";
import { motion } from "framer-motion";
import FillButton from "@/Ui/buttons/FillButton";

function BlogSection() {
  const selectedBlogs = blogs.slice(0, 3);

  return (
    <section className="max-w-screen-8xl pt-16 mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 ">

      {/* HEADING */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
        >
          Blog
        </motion.span>

        <h1 className=" text-2xl md:text-3xl lg:text-4xl font-medium text-white mt-4">
          Latest from Our Blog
        </h1>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

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
                <div className="mt-auto pt-4">
                  <span className="text-[#3D7773] text-sm md:text-md font-medium">
                    Read More →
                  </span>
                </div>

              </div>

            </div>

          </Link>
        ))}

      </div>

      {/* BUTTON */}
      <div className="text-center mt-12">
        <FillButton text="View More Blogs →" href="/blog" />
      </div>

    </section>
  );
}

export default BlogSection;