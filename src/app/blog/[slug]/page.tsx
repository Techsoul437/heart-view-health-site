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
    <div className="page-bg text-white min-h-screen mt-20">

      <Navbar />

      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20  mt-10  lg:pt-10 grid grid-cols-1 xl:grid-cols-[1fr_300px] lg:gap-8 items-start">

        {/* LEFT CONTENT */}
        <div>

          {/* TITLE */}
          <h1 className=" text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-3">
            {blog.title}
          </h1>

          {/* CATEGORY */}
          <span className="inline-block text-xs tracking-widest text-[#3D7773] uppercase border border-white/20 rounded-full px-4 py-1">
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
          <p className="text-white/70 text-base sm:text-lg   font-light mb-10">
            {blog.description}
          </p>

          {/* CONTENT */}
          {blog.content.map((section, index) => (
            <div key={index} className="mb-10">

              <h2 className="text-xl sm:text-xl lg:text-2xl text-[#3D7773] mb-4">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-white/70 text-base sm:text-lg    font-light mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* FAQ ACCORDION */}
          {blog.faq?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl sm:text-xl lg:text-2xl text-[#3D7773] mb-5">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {blog.faq.map((item, index) => {
                  const isOpen = activeFAQ === index;

                  return (
                    <div
                      key={index}
                      className="rounded-xl border  border-[#3D7773]/50 bg-white/5 p-5"
                    >
                      {/* QUESTION */}
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center"
                      >
                        <h3 className="text-base sm:text-lg  leading-relaxed  font-light text-left">
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
                            <p className="mt-4 text-white/70 text-base sm:text-lg    font-light">
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
              <h2 className="text-xl sm:text-xl lg:text-2xl text-[#3D7773] mb-5">
                People Also Ask
              </h2>

              <div className="space-y-4">
                {blog.peopleAlsoAsk.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl border border-white/10 bg-white/5"
                  >
                    <h3 className="text-base sm:text-lg  leading-relaxed  mb-2  font-light">{item.question}</h3>
                    <p className="text-white/70 text-base sm:text-lg   font-light">{item.answer}</p>
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
                  <h2 className="text-xl sm:text-xl lg:text-2xl text-[#3D7773] mb-6">
                    Related Articles
                  </h2>

                  {/* GRID SAME AS BLOG LIST */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

                    {relatedBlogs.map((item) => (
                      <Link key={item.slug} href={`/blog/${item.slug}`} className="h-full">

                        <div className="group flex flex-col h-full border border-[#181E2B] rounded-lg p-3 
              shadow-[0_4px_20px_rgba(0,0,0,0.25)]
              hover:shadow-[0_8px_30px_rgba(61,119,115,0.35)] transition-all duration-300">

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
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#181E2B] to-[#3D7773] text-white text-xs px-2 py-1 rounded-full">
                              {item.category.replace("-", " ").toUpperCase()}
                            </div>

                          </div>

                          {/* CONTENT */}
                          <div className="flex flex-col flex-grow">

                            <h3 className="lg:text-xl sm:text-lg text-lg font-medium mt-4 text-white group-hover:text-[#3D7773] transition line-clamp-2">
                              {item.title}
                            </h3>

                            {/* DESCRIPTION */}
                            <p className="text-base sm:text-lg  leading-relaxed lg:max-w-md font-light text-white/60 line-clamp-2">
                              {item.description}
                            </p>

                            <div className="mt-auto pt-3 flex justify-end">
                              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#45657D] to-[#3D7773] text-white">

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