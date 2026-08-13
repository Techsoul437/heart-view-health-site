"use client";

import React, { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "@/redux/Api";
import type { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/Ui/navbar/Navbar";
import Image from "next/image";
import FinalCTA from "@/Ui/cta/FinalCTA";
import { Plus, X, ShieldCheck } from "lucide-react";
import Footer from "@/Ui/footer/Footer";

export default function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading } = useSelector((state: RootState) => state.BlogList);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const blog = blogs.find(
    (b) =>
      b.slug?.toLowerCase().trim() ===
      slug?.toLowerCase().trim()
  );
const categoryLabels: Record<string, string> = {
  bp: "Blood Pressure",
 
};
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  if (loading && !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#2f5ba5] text-xl font-medium">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl font-medium">
          Blog not found ❌
        </p>
      </div>
    );
  }

  return (
    <div className="page-bg text-black min-h-screen ">

      <Navbar />

      <div className="max-w-7xl mx-auto w-full xl:pt-20 pt-5  lg:pt-20  mt-0 lg:mt-15  px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20">
        {/* LEFT CONTENT */}
        <div>

          {/* TITLE */}
          <h1 className=" text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-3">
            {blog.title}
          </h1>

          {/* CATEGORY */}
          <div className="flex flex-wrap gap-2">
            {blog.category.split(',').map((cat, idx) => {
              const cleanCat = cat.trim();
              return (
                <span key={idx} className="inline-block text-xs font-semibold tracking-widest text-[#2f5ba5] uppercase border border-[#2f5ba5] rounded-full px-4 py-1">
                  {categoryLabels[cleanCat.toLowerCase()] || cleanCat}
                </span>
              );
            })}
          </div>

          {/* HERO IMAGE */}
          <div className="relative w-full lg:h-120 h-60 mt-10 xl:h-150 sm:h-130 md:h-100 my-3   rounded-2xl overflow-hidden">
            {blog.mainImage && (
              <Image
                src={blog.mainImage}
                fill
                className="object-cover"
                alt={blog.title}
                priority
              />
            )}
          </div>

          {/* AUTHOR INFO */}
          <div className="mt-4 mb-8 flex items-center justify-between text-[#64748B]">
            {blog.author && (
              <div className="flex items-center gap-2">
                <span className="text-sm">Written by</span>
                <span className="text-base font-medium text-black">{blog.author}</span>
              </div>
            )}
            
            {blog.publishDate && (
              <span className="text-sm text-right">
                {new Date(blog.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="text-[#64748B] text-base sm:text-lg   font-light mb-10">
            {blog.description}
          </p>

          {/* CONTENT */}
          {blog.content.map((section, index) => (
            <div key={index} className="mb-10">

              <h2 className="text-xl sm:text-xl lg:text-2xl text-[#2f5ba5] mb-4">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, i) => (
                <div key={i} className="text-[#64748B] text-base sm:text-lg font-light mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5" dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          ))}

          

          {/* FAQ ACCORDION */}
          {blog.faq?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-[#2f5ba5] mb-5">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {blog.faq.map((item, index) => {
                  const isOpen = activeFAQ === index;

                  return (
                    <div
                      key={index}
                      className="rounded-xl border  border-[#2f5ba5]/70 bg-black/5 p-5"
                    >
                      {/* QUESTION */}
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center"
                      >
                        <h3 className="text-base sm:text-lg   font-light text-left">
                          {item.question}
                        </h3>

                        <span className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full">
                          {isOpen ? <X size={16} /> : <Plus size={16} />}
                        </span>
                      </button>

                      {/* ANSWER */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-[#64748B] text-base sm:text-lg    font-light">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PEOPLE ALSO ASK */}
          {blog.peopleAlsoAsk?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-[#2f5ba5] mb-5">
               Common Questions About {categoryLabels[blog.category.toLowerCase()] || blog.category}
              </h2>

              <div className="space-y-4">
                {blog.peopleAlsoAsk.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl border border-black/10 bg-black/5"
                  >
                    <h3 className="text-base sm:text-lg  leading-relaxed  mb-2  font-light">{item.question}</h3>
                    <p className="text-[#64748B] text-base sm:text-lg   font-light">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
{/* MEDICAL DISCLAIMER */}
          <div className="mt-8 mb-10 bg-[#f5f8fc] border border-[#d1e0f0] rounded-xl p-5 sm:p-6 flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <ShieldCheck className="text-[#2f5ba5]" size={28} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-[#1e293b] mb-1">Medical Disclaimer</h3>
              <p className="text-[#64748B] text-[18px] font-light leading-relaxed">
                This article is for general informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. For medical concerns or decisions, consult a qualified healthcare professional.
              </p>
            </div>
          </div>
          {/* INTERNAL LINKS */}
          {/* RELATED ARTICLES (SAME CATEGORY) */}
          {(() => {
            const relatedBlogs = blogs
              .filter(
                (b) =>
                  b.category === blog.category && b.slug !== blog.slug
              )
              .slice(0, 3); // jitne card dikhane ho

            return (
              relatedBlogs.length > 0 && (
                <div className="mt-14">
                  <h2 className="text-xl sm:text-xl lg:text-2xl text-[#2f5ba5] mb-6">
                Related Articles     {/* {categoryLabels[blog.category.toLowerCase()] || blog.category} */}
                  </h2>

                  {/* GRID SAME AS BLOG LIST */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

                    {relatedBlogs.map((item) => (
                      <Link key={item.slug} href={`/blog/${item.slug}`} className="h-full">

                        <div className="group h-full flex flex-col
    border border-[#dcdcdc]
    rounded-xl p-3

    bg-white/90 backdrop-blur-sm

    

    transition-all duration-300">

                          {/* IMAGE */}
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden">

                            {item.mainImage && (
                              <Image
                                src={item.mainImage}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                              />
                            )}

                            {/* CATEGORY */}
                            <div className="absolute top-3 left-3 flex flex-wrap gap-2 pr-3">
                              {item.category.split(',').map((cat, idx) => {
                                const cleanCat = cat.trim();
                                return (
                                  <div
                                    key={idx}
                                    className="
                                      group relative inline-flex items-center
                                      rounded-full overflow-hidden
                                      text-white text-xs md:text-sm
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
                                      {cleanCat.replace("-", " ").toUpperCase()}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>

                          </div>

                          {/* DATE */}
                          {item.publishDate && (
                            <div className="w-full flex justify-end mt-2 px-1">
                              <span className="text-xs text-gray-500 font-medium">
                                {new Date(item.publishDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          )}

                          {/* CONTENT */}
                          <div className="flex flex-col flex-grow">

                            <h3 className="lg:text-xl sm:text-lg text-lg font-medium mt-2 text-black group-hover:text-[#2f5ba5] transition line-clamp-2">
                              {item.title}
                            </h3>

                            {/* DESCRIPTION */}
                            <p className="text-base sm:text-lg   lg:max-w-md font-light text-[#475569] line-clamp-2">
                              {item.description}
                            </p>

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
              )
            );
          })()}

        </div>

      </div>

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blog.schemaMarkup),
        }}
      />
      <Footer></Footer>
    </div>
  );
}