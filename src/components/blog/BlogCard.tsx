import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/redux/Slice/BlogListSlice";

const categoryLabels: Record<string, string> = {
  bp: "Blood Pressure",
};

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  // Calculate read time and word count
  const getReadStats = () => {
    let text = blog.description || "";
    if (blog.content) {
      blog.content.forEach((sec) => {
        text += " " + (sec.heading || "");
        if (sec.paragraphs) {
          text += " " + sec.paragraphs.join(" ");
        }
      });
    }
    const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
    const readTime = Math.ceil(wordCount / 200);
    return { readTime: readTime > 0 ? readTime : 1, wordCount };
  };

  const { readTime, wordCount } = getReadStats();

  const formattedDate = new Date(blog.updatedAt || blog.publishDate || new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${blog.slug}`} className="h-full">
      <div
        className="group h-full flex flex-col border border-[#dcdcdc] rounded-xl p-3 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        {/* IMAGE */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
          {blog.mainImage ? (
            <Image
              src={blog.mainImage}
              alt={blog.title}
              fill
              loading="lazy"
              sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          <div
            className="group absolute inline-flex items-center rounded-full overflow-hidden text-white text-xs md:text-sm top-3 left-3 px-2 py-1 lg:px-3 shadow-md"
          >
            <span className="absolute inset-0 rounded-full p-px bg-gradient-to-r from-[#0f61b3] to-[#6AA2E5]/10" />
            <span className="absolute inset-px rounded-full bg-gradient-to-r from-[#2f5ba5]/70 to-[#4a7bc9]/30 backdrop-blur-md" />
            <span className="relative z-10 tracking-wide font-medium">
              {categoryLabels[blog.category?.toLowerCase()] ||
                (blog.category ? blog.category.replace("-", " ").toUpperCase() : "GENERAL")}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-grow">
          {/* META INFO */}
          <div className="flex items-center flex-wrap gap-2 text-sm text-[#64748B] mb-2 font-medium">
            {blog.author && (
              <>
                <span className="text-[#2f5ba5]">{blog.author}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
              </>
            )}
            <span>{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{readTime} min read</span>
            {/* <span className="w-1 h-1 rounded-full bg-gray-300" /> */}
            {/* <span>{wordCount} words</span> */}
          </div>

          {/* TITLE */}
          <h3 className="lg:text-xl sm:text-lg text-lg font-medium mt-4 mb-2 text-black group-hover:text-[#2f5ba5] transition">
            {blog.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base leading-relaxed font-light text-[#475569] line-clamp-2 mb-4">
            {blog.description}
          </p>

          {/* PUSH DOWN ICON */}
          <div className="mt-auto pt-2 flex justify-end">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#0f61b3]/70 to-[#4a7bc9]/60 text-white group-hover:bg-[#2f5ba5]/70 transition-all duration-300">
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
  );
}
