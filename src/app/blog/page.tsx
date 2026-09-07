"use client"
import Link from "next/link";
import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "@/redux/Api";
import type { AppDispatch, RootState } from "@/redux/store";
import Navbar from "@/Ui/navbar/Navbar";
import Footer from "@/Ui/footer/Footer";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import BlogCard from "@/components/blog/BlogCard";

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

const ITEMS_PER_PAGE = 12;

export default function BlogList() {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading } = useSelector((state: RootState) => state.BlogList);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const allArticlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  // All published blogs, sorted newest first
  const publishedBlogs = useMemo(() => {
    return [...blogs].filter((blog) => blog.status === "published").reverse();
  }, [blogs]);

  // Derived sections
  // Simulating popular blogs
  const popularBlogs = publishedBlogs.slice(3, 6);

  // Filtered blogs for the main grid
  const filteredBlogs = useMemo(() => {
    let filtered = publishedBlogs;
    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((blog) => 
        blog.title.toLowerCase().includes(q) || 
        blog.description?.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [publishedBlogs, selectedCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const scrollToAllArticles = () => {
    allArticlesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isFiltering = selectedCategory !== null || searchQuery.trim() !== "";

  return (
    <div className="page-bg pt-5 lg:pt-20 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 lg:pt-14 pb-20">
        
        {/* BREADCRUMBS */}
        {/* <div className="flex items-center gap-2 text-sm text-[#64748B] mb-8">
          <Link href="/" className="hover:text-[#2f5ba5] transition">Home</Link>
          <span>/</span>
          <span className="text-black font-medium">Blog</span>
        </div> */}

        {/* HEADING */}
        <div className="w-full py-4 text-center mb-8">
          <Headerbadge tag="Blog" text="Our Blog" />
          <p className="text-[#64748B] mt-4 text-lg font-light max-w-2xl mx-auto">
            Explore expert health articles, wellness tips, nutrition guides, and the latest healthcare insights from HeartView Health.
          </p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* CATEGORIES */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedCategory === null
                  ? "bg-[#2f5ba5] text-white border-[#2f5ba5]"
                  : "bg-white text-[#64748B] border-[#E5E7EB] hover:bg-gray-50"
              }`}
            >
              All
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  selectedCategory === cat
                    ? "bg-[#2f5ba5] text-white border-[#2f5ba5]"
                    : "bg-white text-[#64748B] border-[#E5E7EB] hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-72">
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#2f5ba5] focus:ring-1 focus:ring-[#2f5ba5] transition bg-white"
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && publishedBlogs.length === 0 && (
          <div className="py-20 text-center text-[#64748B] text-lg">Loading articles...</div>
        )}

        {!loading && publishedBlogs.length > 0 && (
          <>
            {/* ONLY SHOW LATEST & POPULAR IF NOT FILTERING */}
            {!isFiltering && (
              <>
                {/* POPULAR ARTICLES */}
                {popularBlogs.length > 0 && (
                  <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-medium text-black">Popular Articles</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {popularBlogs.map((blog) => (
                        <BlogCard key={blog.slug} blog={blog} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* ALL ARTICLES (MAIN GRID) */}
            <section ref={allArticlesRef} className="mt-8 pt-8 border-t border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-medium text-black">
                  {isFiltering ? "Search Results" : "All Articles"}
                </h2>
                {isFiltering && (
                  <p className="text-[#64748B] mt-2">Found {filteredBlogs.length} articles matching your criteria.</p>
                )}
              </div>

              {filteredBlogs.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-lg font-medium text-black">No articles found</h3>
                  <p className="text-[#64748B] mt-1">Try adjusting your category or search term.</p>
                  <button 
                    onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                    className="mt-4 px-6 py-2 bg-[#2f5ba5] text-white rounded-full text-sm font-medium hover:bg-[#1e4480] transition"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                    {paginatedBlogs.map((blog) => (
                      <BlogCard key={blog.slug} blog={blog} />
                    ))}
                  </div>

                  {/* PAGINATION */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                            currentPage === i + 1 
                              ? "bg-[#2f5ba5] text-white" 
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
