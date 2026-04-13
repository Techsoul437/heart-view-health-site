"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogData";
import Navbar from "@/Ui/navbar/Navbar";
import FinalCTA from "@/Ui/cta/FinalCTA";

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

      <div className="max-w-8xl mx-auto px-20 sm:px-6 mt-15 lg:px-20 py-14">

        {/* HEADING */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs tracking-widest text-[#3D7773] uppercase border border-white/20 rounded-full px-4 py-1">
            {category.replace("-", " ")}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mt-2 capitalize">
            {category.replace("-", " ")} Blogs
          </h1>
        </div>

        {/* GRID */}
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-red-400">
            No blogs found ❌
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredBlogs.map((blog) => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`} className="h-full">

                {/* SAME CARD DESIGN */}
                <div className="group flex flex-col h-full border border-[#181E2B] rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.25)]
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
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#181E2B] to-[#3D7773] backdrop-blur-md text-white text-sm px-3 py-1 rounded-full shadow-md">
                      {blog.category.replace("-", " ").toUpperCase()}
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-grow mt-4 space-y-2">

                    <h3 className="text-2xl font-medium mt-4 text-white group-hover:text-[#3D7773] transition line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-xl font-light text-white/60 line-clamp-3">
                      {blog.description}
                    </p>

                    <div className="mt-auto pt-2">
                      <span className="text-[#3D7773] text-md font-medium">
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