"use client";

import React, { useState, use } from "react";
import { blogs } from "@/data/blogData";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/Ui/navbar/Navbar";
import Image from "next/image";
import FinalCTA from "@/Ui/cta/FinalCTA";
import { Plus, X } from "lucide-react";

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
    <div className="page-bg text-white min-h-screen">

      <Navbar />

      <div className="max-w-8xl mx-auto px-20 sm:px-6 mt-15 lg:px-20 py-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

        {/* LEFT CONTENT */}
        <div>

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-3">
            {blog.title}
          </h1>

          {/* CATEGORY */}
          <span className="inline-block text-xs tracking-widest text-[#3D7773] uppercase border border-white/20 rounded-full px-4 py-1">
            {blog.category}
          </span>

          {/* HERO IMAGE */}
          <div className="relative w-full h-170 my-3   rounded-2xl overflow-hidden">
            <Image
              src={blog.content?.[0]?.images?.[0]}
              fill
              className="object-cover"
              alt={blog.title}
              priority
            />
          </div>

          {/* DESCRIPTION */}
          <p className="text-white/70 text-lg lg:text-xl mb-10">
            {blog.description}
          </p>

          {/* CONTENT */}
          {blog.content.map((section, index) => (
            <div key={index} className="mb-12">

              <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#3D7773] mb-4">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-white/70 mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* FAQ ACCORDION */}
          {blog.faq?.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl lg:text-4xl text-[#3D7773] mb-6">
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
                        <h3 className="text-lg text-left">
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
                            <p className="mt-4 text-white/70">
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
            <div className="mt-20">
              <h2 className="text-3xl text-[#3D7773] mb-6">
                People Also Ask
              </h2>

              <div className="space-y-4">
                {blog.peopleAlsoAsk.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl border border-white/10 bg-white/5"
                  >
                    <h3 className="text-lg mb-2">{item.question}</h3>
                    <p className="text-white/70">{item.answer}</p>
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
    .slice(0, 4);

  return (
    relatedBlogs.length > 0 && (
      <div className="mt-20">
        <h2 className="text-3xl text-[#3D7773] mb-6">
          Related Articles
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {relatedBlogs.map((item, index) => (
            <Link
              key={index}
              href={`/blog/${item.slug}`}
              className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-[#3D7773]/10 transition"
            >
              <p className="text-white/80 hover:text-[#3D7773]">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    )
  );
})()}

        </div>

        {/* SIDEBAR */}
        <div className="lg:sticky lg:top-40 flex flex-col gap-6">

          {/* RECENT POSTS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-xl mb-4">Recent Posts</h3>

            {blogs.slice(0, 3).map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`}>
                <p className="text-white/70 hover:text-[#3D7773] mb-2">
                  • {item.title}
                </p>
              </Link>
            ))}
          </motion.div>

          {/* STAY HEALTHY */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-white/10"
          >
            <h3 className="text-xl mb-2">Stay Healthy </h3>
            <p className="text-white/60">
              Daily tracking helps prevent serious health risks.
              Stay consistent with your health journey.
            </p>
          </motion.div>

        </div>
      </div>

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blog.schemaMarkup),
        }}
      />

      <FinalCTA />
    </div>
  );
}