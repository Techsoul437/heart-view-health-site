"use client";

import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogData";
import Navbar from "@/Ui/navbar/Navbar";
import FinalCTA from "@/Ui/cta/FinalCTA";

export default function BlogList() {
  return (
    <div className="page-bg">
      <Navbar />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 mt-15 lg:px-20 lg:pt-10">

        {/* HEADING */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs tracking-widest text-[#3D7773] uppercase border border-white/20 rounded-full px-4 py-1">
            Blog
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white  mt-4">
          Our Blog
          </h1>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="h-full">

              {/* CARD */}
              <div className="group flex flex-col h-full border border-[#181E2B] rounded-lg p-3  shadow-[0_4px_20px_rgba(0,0,0,0.25)]
              hover:shadow-[0_8px_30px_rgba(61,119,115,0.35)]  transition-all duration-300">

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

                  {/* CATEGORY */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-[#181E2B] to-[#3D7773] backdrop-blur-md text-white text-xs md:text-sm px-2 py-1 lg:px-3 rounded-full shadow-md">
                    {blog.category.replace("-", " ").toUpperCase()}
                  </div>

                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-grow mt-4 space-y-2">

                  {/* TITLE */}
                  <h3 className="lg:text-xl sm:text-lg text-lg font-medium mt-4 text-white group-hover:text-[#3D7773] transition line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-base sm:text-lg  leading-relaxed lg:max-w-md font-light text-white/60 line-clamp-2">
                    {blog.description}
                  </p>

                  {/* PUSH DOWN */}
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
      </div>

      <FinalCTA />
    </div>
  );
}