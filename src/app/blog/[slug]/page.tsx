"use client";

import React, { useState, use } from "react";
import { blogs } from "@/data/blogData";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/Ui/navbar/Navbar";
import Image from "next/image";
import FinalCTA from "@/Ui/cta/FinalCTA";
import { Plus, X } from "lucide-react";
import Footer from "@/Ui/footer/Footer";

export default function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const blog = blogs.find(
    (b) =>
      b.slug?.toLowerCase().trim() ===
      slug?.toLowerCase().trim()
  );

  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

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
    <div className="page-bg text-black min-h-screen mt-20">

      <Navbar />

      <div className="max-w-7xl mx-auto w-full  mt-10 lg:pt-10">
        {/* LEFT CONTENT */}
        <div>

          {/* TITLE */}
          <h1 className=" text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-3">
            {blog.title}
          </h1>

          {/* CATEGORY */}
          <span className="inline-block text-xs font-semibold tracking-widest text-[#2f5ba5] uppercase border border-[#2f5ba5] rounded-full px-4 py-1">
            {blog.category}
          </span>

          {/* HERO IMAGE */}
          <div className="relative w-full lg:h-120 h-60 mt-10 xl:h-170 sm:h-130 md:h-100 my-3   rounded-2xl overflow-hidden">
            <Image
              src={blog.content?.[0]?.images?.[0]}
              fill
              className="object-cover"
              alt={blog.title}
              priority
            />
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
                <p key={i} className="text-[#64748B] text-base sm:text-lg font-light mb-3 ">
                  {p}
                </p>
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
                People Also Ask
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
                    Related Articles
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

                            {item.content?.[0]?.images?.[0] && (
                              <Image
                                src={item.content[0].images[0]}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                              />
                            )}

                            {/* CATEGORY */}
                         
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