"use client"
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getAllInquiry, getBlogs, getTeams } from '@/redux/Api';
import Link from 'next/link';
import { FiMessageSquare, FiFileText, FiUsers, FiClock } from "react-icons/fi";

export default function AdminDashboard() {
    const dispatch = useDispatch<AppDispatch>();

    const { data: profile } = useSelector((state: RootState) => state.adminProfile);
    const { data: inquiries, loading: loadingInquiries } = useSelector((state: RootState) => state.inquiry);
    const { blogs, loading: loadingBlogs } = useSelector((state: RootState) => state.BlogList);
    const { teams, loading: loadingTeams } = useSelector((state: RootState) => state.team);

    useEffect(() => {
        dispatch(getAllInquiry());
        dispatch(getBlogs());
        dispatch(getTeams());
    }, [dispatch]);

    // Data for Cards
    const totalInquiries = inquiries?.length || 0;
    const totalBlogs = blogs?.length || 0;
    const totalTeams = teams?.length || 0;

    const unreadInquiries = useMemo(() => {
        if (!inquiries) return 0;
        const today = new Date().toDateString();
        return inquiries.filter(inq => new Date(inq.createdAt).toDateString() === today).length;
    }, [inquiries]);

    // Recent 5 Lists
    const recentInquiries = inquiries ? [...inquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5) : [];
    const recentBlogs = blogs ? [...blogs].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).slice(0, 5) : [];
    
    const recentActivity = useMemo(() => {
        const activities: { _id: string, action: string, module: string, adminName: string, createdAt: string }[] = [];
        if (blogs) {
            blogs.forEach(blog => activities.push({
                _id: `blog-${blog._id}`,
                action: 'Added/Updated Blog',
                module: 'Blog',
                adminName: blog.author || 'Admin',
                createdAt: blog.createdAt || new Date().toISOString()
            }));
        }
        if (teams) {
            teams.forEach(team => activities.push({
                _id: `team-${team._id}`,
                action: 'Added Team Member',
                module: 'Team',
                adminName: 'Admin',
                createdAt: team.createdAt || new Date().toISOString()
            }));
        }
        return activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
    }, [blogs, teams]);
    
    const loadingLogs = loadingBlogs || loadingTeams;

    return (
        <div className="min-h-screen p-6 text-black md:p-12 overflow-x-hidden">
            {/* HEADER */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        Admin Dashboard
                    </h1>
                    <p className="mt-1 text-[#64748B] leading-relaxed font-light">
                        Welcome back, {profile?.fullName || 'Admin'}
                    </p>
                </div>
            </div>

            {/* 4 SUMMARY CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Inquiries Card */}
                <div className="group relative rounded-2xl border border-black/10 bg-[#f7f7f7] p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="text-[#64748B] line-clamp-none lg:line-clamp-2 lg:h-12 xl:h-6 leading-6">Inquiries</p>
                            <h3 className="mt-1 text-2xl font-bold text-black">{loadingInquiries ? '...' : totalInquiries.toLocaleString()}</h3>
                            {/* <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500 whitespace-nowrap">
                                <span>+18%</span><span>vs yesterday</span><span>↑</span>
                            </p> */}
                        </div>
                        <div style={{ backgroundColor: "rgba(59,130,246,0.1)" }} className="mt-0.5 flex h-12 w-12 xl:h-12 xl:w-12 flex-shrink-0 items-center justify-center rounded-lg xl:rounded-xl border border-black/5">
                            <FiMessageSquare className="text-lg xl:text-2xl text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Blog Posts Card */}
                <div className="group relative rounded-2xl border border-black/10 bg-[#f7f7f7] p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="text-[#64748B] line-clamp-none lg:line-clamp-2 lg:h-12 xl:h-6 leading-6">Blog Posts</p>
                            <h3 className="mt-1 text-2xl font-bold text-black">{loadingBlogs ? '...' : totalBlogs.toLocaleString()}</h3>
                            {/* <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500 whitespace-nowrap">
                                <span>+5%</span><span>vs yesterday</span><span>↑</span>
                            </p> */}
                        </div>
                        <div style={{ backgroundColor: "rgba(168,85,247,0.1)" }} className="mt-0.5 flex h-12 w-12 xl:h-12 xl:w-12 flex-shrink-0 items-center justify-center rounded-lg xl:rounded-xl border border-black/5">
                            <FiFileText className="text-lg xl:text-2xl text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Team Members Card */}
                <div className="group relative rounded-2xl border border-black/10 bg-[#f7f7f7] p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="text-[#64748B] line-clamp-none lg:line-clamp-2 lg:h-12 xl:h-6 leading-6">Team Members</p>
                            <h3 className="mt-1 text-2xl font-bold text-black">{loadingTeams ? '...' : totalTeams.toLocaleString()}</h3>
                            {/* <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500 whitespace-nowrap">
                                <span>+12%</span><span>vs yesterday</span><span>↑</span>
                            </p> */}
                        </div>
                        <div style={{ backgroundColor: "rgba(34,197,94,0.1)" }} className="mt-0.5 flex h-12 w-12 xl:h-12 xl:w-12 flex-shrink-0 items-center justify-center rounded-lg xl:rounded-xl border border-black/5">
                            <FiUsers className="text-lg xl:text-2xl text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Unread Inquiries Card */}
                <div className="group relative rounded-2xl border border-black/10 bg-[#f7f7f7] p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="text-[#64748B] line-clamp-none lg:line-clamp-2 lg:h-12 xl:h-6 leading-6">Today Inquiries</p>
                            <h3 className="mt-1 text-2xl font-bold text-black">{loadingInquiries ? '...' : unreadInquiries.toLocaleString()}</h3>
                            {/* <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500 whitespace-nowrap">
                                <span>+22%</span><span>vs yesterday</span><span>↑</span>
                            </p> */}
                        </div>
                        <div style={{ backgroundColor: "rgba(249,115,22,0.1)" }} className="mt-0.5 flex h-12 w-12 xl:h-12 xl:w-12 flex-shrink-0 items-center justify-center rounded-lg xl:rounded-xl border border-black/5">
                            <FiClock className="text-lg xl:text-2xl text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLES GRID */}
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2 items-stretch">
                {/* RECENT INQUIRIES */}
                <div className="col-span-1 h-full">
                    <div className="rounded-2xl border h-full flex flex-col border-slate-200 bg-[#f7f7f7] shadow-sm">
                        <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6 shrink-0">
                            <div className="min-w-0 flex-1">
                                <h4 className="text-md md:text-lg xl:text-xl text-black">Recent Inquiries</h4>
                                <p className="mt-5 sm:mt-1 whitespace-nowrap font-light text-[#64748B]">Latest received inquiries</p>
                            </div>
                            <Link href="/admin/Inquiries">
                                <button className="shrink-0 whitespace-nowrap rounded-xl border border-[#2f5ba5]/20 bg-black px-4 py-2 text-white">View All</button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-black/10">
                                        <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Name</th>
                                        <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Message</th>
                                        <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingInquiries ? (
                                        <tr><td colSpan={3} className="py-10 text-center">Loading...</td></tr>
                                    ) : recentInquiries.length > 0 ? (
                                        recentInquiries.map((inquiry) => (
                                            <tr key={inquiry._id} className="border-b border-black/10 transition hover:bg-slate-50 h-[53px]">
                                                <td className="px-6 py-4"><span className="font-medium text-sm text-[#64748B]">{inquiry.name}</span></td>
                                                <td className="px-6 py-4 text-sm text-[#64748B] truncate max-w-[200px]">{inquiry.message}</td>
                                                <td className="px-6 py-4 text-sm text-[#64748B]">{new Date(inquiry.createdAt).toLocaleDateString('en-US')}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={3} className="py-10 text-center text-black">No recent inquiries</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* RECENT BLOG POSTS */}
                <div className="col-span-1 h-full">
                    <div className="rounded-2xl border h-full flex flex-col border-slate-200 bg-[#f7f7f7] shadow-sm">
                        <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6 shrink-0">
                            <div className="min-w-0 flex-1">
                                <h4 className="text-md md:text-lg xl:text-xl text-black">Recent Blog Posts</h4>
                                <p className="mt-5 sm:mt-1 whitespace-nowrap font-light text-[#64748B]">Latest updated blogs</p>
                            </div>
                            <Link href="/admin/Blog">
                                <button className="shrink-0 whitespace-nowrap rounded-xl border border-[#2f5ba5]/20 bg-black px-4 py-2 text-white">View All</button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-black/10">
                                        <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Title</th>
                                        <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Author</th>
                                        <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Status</th>
                                        <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingBlogs ? (
                                        <tr><td colSpan={4} className="py-10 text-center">Loading...</td></tr>
                                    ) : recentBlogs.length > 0 ? (
                                        recentBlogs.map((blog) => (
                                            <tr key={blog._id} className="border-b border-black/10 transition hover:bg-slate-50 h-[53px]">
                                                <td className="px-6 py-4"><span className="font-medium text-sm text-[#64748B] truncate max-w-[150px] inline-block">{blog.title}</span></td>
                                                <td className="px-6 py-4 text-sm text-[#64748B]">{blog.author}</td>
                                                <td className="px-6 py-4 text-sm text-[#64748B]">{blog.status}</td>
                                                <td className="px-6 py-4 text-sm text-[#64748B]">{new Date(blog.createdAt || 0).toLocaleDateString('en-US')}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={4} className="py-10 text-center text-black">No recent blogs</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* RECENT ACTIVITY TABLE */}
            <div className="mt-5">
                <div className="rounded-2xl border min-h-[300px] border-slate-200 bg-[#f7f7f7] shadow-sm">
                    <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6">
                        <div className="min-w-0 flex-1">
                            <h4 className="text-md md:text-lg xl:text-xl text-black">Recent Activity</h4>
                            <p className="mt-5 sm:mt-1 whitespace-nowrap font-light text-[#64748B]">Recent blogs and team members</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-black/10">
                                    <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Action</th>
                                    <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Module</th>
                                    <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">User</th>
                                    <th className="px-6 py-4 text-left font-medium uppercase tracking-wide text-black">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingLogs ? (
                                    <tr><td colSpan={4} className="py-10 text-center">Loading...</td></tr>
                                ) : recentActivity.length > 0 ? (
                                    recentActivity.map((log) => (
                                        <tr key={log._id} className="border-b border-black/10 transition hover:bg-slate-50 h-[53px]">
                                            <td className="px-6 py-4"><span className="font-medium text-sm text-[#64748B]">{log.action}</span></td>
                                            <td className="px-6 py-4 text-sm text-[#64748B] capitalize">{log.module}</td>
                                            <td className="px-6 py-4 text-sm text-[#64748B]">{log.adminName}</td>
                                            <td className="px-6 py-4 text-sm text-[#64748B]">{new Date(log.createdAt).toLocaleString('en-US')}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={4} className="py-10 text-center text-black">No recent activity</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
