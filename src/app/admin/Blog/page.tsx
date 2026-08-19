"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Edit3,
    Eye,
    FileText,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/redux/store";

import {
    getBlogs,
    deleteBlog,
} from "@/redux/Api";

import {
    clearBlogMessage,
    clearBlogError,
} from "@/redux/Slice/BlogListSlice";

import ConfirmModal from "@/Ui/ConfirmModal";
import FillButton from "@/Ui/buttons/FillButton";

export default function BlogListPage() {
    const pathname = usePathname();

    const baseUrl = `/${pathname.split("/")[1]}`;

    const dispatch = useDispatch<AppDispatch>();

    // =========================
    // REDUX STATE
    // =========================

    const {
        blogs,
        loading,
        deleteLoading,
        error,
        success,
        message,
    } = useSelector(
        (state: RootState) => state.BlogList
    );

    // =========================
    // LOCAL STATE
    // =========================

    const [search, setSearch] = useState<string>("");

    const [status, setStatus] = useState<
        "all" | "draft" | "published"
    >("all");

    // Pagination State
    const [currentPage, setCurrentPage] = useState<number>(1);
    const blogsPerPage = 10;

    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedTitle, setSelectedTitle] = useState<string>("");

    // =========================
    // GET ALL BLOGS
    // =========================

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    // =========================
    // FILTER BLOGS
    // =========================

    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const searchText = `
        ${blog.title}
        ${blog.author}
        ${blog.category}
        ${blog.slug}
      `.toLowerCase();

            const matchesSearch = searchText.includes(
                search.toLowerCase()
            );

            const matchesStatus =
                status === "all" ||
                blog.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [blogs, search, status]);

    // =========================
    // PAGINATION LOGIC
    // =========================
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    // =========================
    // OPEN DELETE MODAL
    // =========================

    const openDeleteConfirm = (
        blogId: string | undefined,
        title: string
    ) => {
        if (!blogId) {
            toast.error("Blog ID not found");
            return;
        }

        setSelectedId(blogId);
        setSelectedTitle(title);
        setOpenDeleteModal(true);
    };

    // =========================
    // DELETE BLOG (called by modal confirm)
    // =========================

    const handleDelete = async () => {
        if (!selectedId || deleteLoading) {
            return;
        }

        const result = await dispatch(
            deleteBlog(selectedId)
        );

        if (deleteBlog.fulfilled.match(result)) {
            toast.success(result.payload.message || "Blog deleted successfully");

            // ✅ Refresh list so latest records show
            dispatch(getBlogs());
        } else {
            toast.error(
                result.payload ||
                "Unable to delete blog"
            );
        }

        setOpenDeleteModal(false);
        setSelectedId(null);
        setSelectedTitle("");
    };

    // =========================
    // RETURN
    // =========================

    return (
        <div className="min-h-screen p-6 text-black md:p-12">
            {/* HEADER */}

           <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        Blogs
                    </h1>
                    <p className="mt-2 text-[#64748B] leading-relaxed font-light">
                        Manage all your blog articles.

                    </p>
                </div>
                <FillButton text="Add Blog" href="/admin/Blog/add" />
            </div>
            
            {/* CONTROLS */}
            <div className="mt-8 mb-4 flex flex-wrap items-center gap-3">
                <div className="relative w-full max-w-sm">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                        size={18}
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search by title, author or category"
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-black outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[#64748B] text-sm">Status</span>
                    <select
                        value={status}
                        onChange={(event) => {
                            setStatus(
                                event.target.value as
                                | "all"
                                | "draft"
                                | "published"
                            );
                            setCurrentPage(1);
                        }}
                        className="h-10 rounded-lg border border-slate-200 text-sm bg-white px-3 text-black outline-none focus:border-blue-300"
                    >
                        <option value="all">All statuses</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                <th className="px-5 py-3 text-left font-medium text-black">Blog</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Category</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Author</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Date</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Status</th>
                                <th className="px-5 py-3 text-right font-medium text-black">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-[#64748B]">
                                        Loading blogs...
                                    </td>
                                </tr>
                            ) : currentBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-[#64748B]">
                                        <FileText className="mx-auto mb-3" size={30} />
                                        No blogs found.
                                    </td>
                                </tr>
                            ) : (
                                currentBlogs.map((blog) => (
                                    <tr
                                        key={blog._id}
                                        className="border-b border-black/10 last:border-0"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-[#E2E8F0]">
                                                    {blog.mainImage ? (
                                                        <img
                                                            src={blog.mainImage}
                                                            alt={blog.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <FileText size={20} className="text-[#94A3B8]" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-medium">{blog.title}</p>
                                                    <p className="mt-0.5 max-w-xs truncate text-sm text-[#64748B]">
                                                        {blog.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4 text-sm">{blog.category}</td>
                                        <td className="p-4 text-sm">{blog.author}</td>

                                        <td className="p-4 text-sm">
                                            {blog.publishDate
                                                ? new Date(blog.publishDate).toLocaleDateString("en-GB")
                                                : "-"}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${blog.status === "published"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-amber-100 text-amber-700"
                                                    }`}
                                            >
                                                {blog.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                {/* <Link
                          href={`${baseUrl}/Blog/${blog._id}`}
                          title="View"
                          className="rounded-lg p-2 text-[#1D7DAF] hover:bg-blue-50"
                        >
                          <Eye size={18} />
                        </Link> */}

                                                <Link
                                                    href={`${baseUrl}/Blog/${blog._id}/edit`}
                                                    title="Edit"
                                                    className="rounded-lg p-2 text-[#1D7DAF] hover:bg-blue-50"
                                                >
                                                    <Edit3 size={18} />
                                                </Link>

                                                <button
                                                    type="button"
                                                    disabled={deleteLoading}
                                                    onClick={() =>
                                                        openDeleteConfirm(blog._id, blog.title)
                                                    }
                                                    title="Delete"
                                                    className={`rounded-lg p-2 text-red-600 hover:bg-red-50 ${deleteLoading ? "cursor-not-allowed opacity-50" : ""
                                                        }`}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {filteredBlogs.length > 0 && (
                    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                        <p className="text-sm font-light text-[#64748B]">
                            Showing {indexOfFirstBlog + 1} to{" "}
                            {Math.min(indexOfLastBlog, filteredBlogs.length)} of{" "}
                            {filteredBlogs.length} blogs
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                            >
                                <FiChevronLeft />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg font-semibold transition ${currentPage === i + 1
                                            ? "bg-[#2f5ba5] text-white"
                                            : "border border-slate-200 text-[#64748B] hover:bg-slate-50"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* DELETE CONFIRM MODAL */}

            <ConfirmModal
                isOpen={openDeleteModal}
                title="Delete Blog"
                message={`Are you sure you want to delete "${selectedTitle}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                loading={!!deleteLoading}
                onConfirm={handleDelete}
                onCancel={() => {
                    setOpenDeleteModal(false);
                    setSelectedId(null);
                    setSelectedTitle("");
                }}
            />
        </div>
    );
}