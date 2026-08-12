"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "@/redux/Api";
import type { AppDispatch, RootState } from "@/redux/store";
import Navbar from "@/Ui/navbar/Navbar";
import FinalCTA from "@/Ui/cta/FinalCTA";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/Ui/footer/Footer";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

const categoriesList = [
  "Heart-Risk",
  "Blood Pressure",
  "Diabetes",
  "Lab-Reports",
  "Cholesterol",
  "Lifestyle",
  "Sleep",
  "Step"
];

const categoryLabels: Record<string, string> = {
  bp: "Blood Pressure",

};
import type { Metadata } from "next";

//   export const  metadata: Metadata = {
//   title: "Health Blog | HeartView Health",
//   description:
//     "Read expert health articles, wellness tips, preventive care guides, nutrition advice, fitness insights, and the latest healthcare updates from HeartView Health.",
//   keywords: [
//     "health blog",
//     "health tips",
//     "wellness",
//     "nutrition",
//     "fitness",
//     "preventive healthcare",
//     "heart health",
//     "health insights",
//     "HeartView Health",
//   ],
//   openGraph: {
//     title: "Health Blog | Heartview Health",
//    description:
//       "Explore expert health articles, wellness tips, nutrition guides, and healthcare insights.",
//     url: "https://heartviewhealth.com//blog",
//     type: "website",
//   },
// };
export default function BlogList() {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading } = useSelector((state: RootState) => state.BlogList);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const publishedBlogs = useMemo(() => {
    let filtered = [...blogs].filter((blog) => blog.status === "published").reverse();
    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    return filtered;
  }, [blogs, selectedCategory]);

  return (
    <div className="page-bg pt-5  lg:pt-20">
      <Navbar />

      <div className="max-w-8xl  mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20  lg:pt-14 ">

        {/* HEADING */}

        <div className="w-full py-4 text-center">


          <Headerbadge tag=" Blog" text=" Our Blog" />


        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 mb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
              selectedCategory === null
                ? "bg-[#2f5ba5] text-white border-[#2f5ba5]"
                : "bg-[#F3F4F6] text-[#64748B] border-[#E5E7EB] hover:bg-[#E5E7EB]"
            }`}
          >
            All
          </button>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedCategory === cat
                  ? "bg-[#2f5ba5] text-white border-[#2f5ba5]"
                  : "bg-[#F3F4F6] text-[#64748B] border-[#E5E7EB] hover:bg-[#E5E7EB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-4 md:gap-8 lg:gap-6 xl:gap-7">

          {loading && blogs.length === 0 ? (
            <div className="col-span-full py-10 text-center text-[#64748B]">Loading blogs...</div>
          ) : publishedBlogs.length === 0 ? (
            <div className="col-span-full py-10 text-center text-[#64748B]">No blogs found.</div>
          ) : publishedBlogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="h-full">

              {/* CARD */}
              <div className="group h-full flex flex-col
    border border-[#dcdcdc]
    rounded-xl p-3

    bg-white/90 backdrop-blur-sm

    

    transition-all duration-300">

                {/* IMAGE */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">

                  {blog.mainImage && (
                    <Image
                      src={blog.mainImage}
                      alt={blog.title}
                      fill
                      loading="lazy"
                      sizes="(max-width:768px) 100vw,
         (max-width:1024px) 50vw,
         33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  )}


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
                      {categoryLabels[blog.category.toLowerCase()] ||
                        blog.category.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-grow">

                  {/* TITLE */}
                  <h3 className="lg:text-xl sm:text-lg text-lg font-medium mt-4 text-black group-hover:text-[#2f5ba5] transition line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-base sm:text-lg  leading-relaxed lg:max-w-md font-light text-[#475569] line-clamp-2">
                    {blog.description}
                  </p>

                  {/* PUSH DOWN */}
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

            </Link>
          ))}

        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}