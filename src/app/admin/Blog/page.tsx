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
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/redux/store";

import {
    getBlogs,
    deleteBlog,
} from "@/redux/Api";

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
    // ERROR TOAST
    // =========================

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // =========================
    // SUCCESS TOAST
    // =========================

    useEffect(() => {
        if (success && message) {
            toast.success(message);
        }
    }, [success, message]);

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

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Blogs</h1>
                    <p className="mt-1 text-sm text-[#64748B]">
                        Manage all your blog articles.
                    </p>
                </div>
                <FillButton text="Add Blog" href="/admin/Blog/add" />
            </div>

            {/* MAIN CARD */}

            <div className="mt-8 rounded-xl border border-black/10 bg-white p-4 shadow-sm md:p-6">
                <div className="flex flex-col gap-3 md:flex-row">
                    <label className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                            size={18}
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search by title, author or category"
                            className="w-full rounded-lg border border-black/10 bg-[#F8FAFC] py-3 pl-10 pr-4 outline-none focus:border-[#1D7DAF]"
                        />
                    </label>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(
                                event.target.value as
                                | "all"
                                | "draft"
                                | "published"
                            )
                        }
                        className="rounded-lg border border-black/10 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1D7DAF]"
                    >
                        <option value="all">All statuses</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                {/* BLOG TABLE */}

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left">
                        <thead className="border-y border-black/10 bg-[#F8FAFC] text-sm text-[#64748B]">
                            <tr>
                                <th className="p-4 font-medium">Blog</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Author</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 text-right font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-[#64748B]">
                                        Loading blogs...
                                    </td>
                                </tr>
                            ) : filteredBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-[#64748B]">
                                        <FileText className="mx-auto mb-3" size={30} />
                                        No blogs found.
                                    </td>
                                </tr>
                            ) : (
                                filteredBlogs.map((blog) => (
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