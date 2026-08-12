"use client"
import React, { useState, useEffect } from 'react'
import StartCards from './StartCards'
import { FiCalendar, FiActivity } from 'react-icons/fi'
import { FaRobot, FaPen } from 'react-icons/fa'
import RecentInquiriesTable from './RecentInquiriesTable'
import RecentBlogsTable from './RecentBlogsTable'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const now = new Date();
const MONTHS = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

const YEARS: number[] = [2024, 2025, 2026];
function HeartviewAdmin() {
    const [year, setYear] = useState<number>(now.getFullYear());
    const [month, setMonth] = useState<number>(now.getMonth() + 1);

    const monthLabel = MONTHS.find((m) => m.value === month)?.label ?? "";
    
    const { data: inquiries } = useSelector((state: RootState) => state.inquiry);
    const { blogs } = useSelector((state: RootState) => state.BlogList);
    const { teams } = useSelector((state: RootState) => state.team);

    // Generate synthetic recent activity from actual data
    const activities = React.useMemo(() => {
        const arr: { id: string, action: string, description: string, date: Date, type: 'inquiry' | 'blog' | 'team' }[] = [];

        if (inquiries) {
            inquiries.forEach(inq => {
                if (inq.createdAt) {
                    arr.push({
                        id: `inq-${inq._id}`,
                        action: 'New inquiry received',
                        description: `From ${inq.name}`,
                        date: new Date(inq.createdAt),
                        type: 'inquiry'
                    });
                }
            });
        }

        if (blogs) {
            blogs.forEach(blog => {
                const dateStr = blog.createdAt || blog.publishDate;
                if (dateStr) {
                    arr.push({
                        id: `blog-${blog._id}`,
                        action: 'Blog added',
                        description: `${blog.title}`,
                        date: new Date(dateStr),
                        type: 'blog'
                    });
                }
            });
        }

        if (teams) {
            teams.forEach(team => {
                if (team.createdAt) {
                    arr.push({
                        id: `team-${team._id}`,
                        action: 'Team member added',
                        description: `${team.fullName}`,
                        date: new Date(team.createdAt),
                        type: 'team'
                    });
                }
            });
        }

        return arr.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
    }, [inquiries, blogs, teams]);

    return (
        <div className="min-h-screen p-6 text-black overflow-x-hidden">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        HeartView Dashboard
                    </h1>
                    <p className="mt-1 text-[#64748B] leading-relaxed font-light">
                        Welcome back, Admin
                    </p>
                </div>
            </div>

            <StartCards></StartCards>

          

            {/* Recent Tables */}
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <div className="col-span-1">
                    <RecentInquiriesTable />
                </div>
                <div className="col-span-1">
                    <RecentBlogsTable />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 bg-[#f7f7f7] rounded-2xl border border-black/10 shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-5 border-b border-black/5 pb-3 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
                    Recent Activity
                </h3>
                <ul className="space-y-4">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <li key={activity.id} className="flex items-center gap-4 text-gray-700 bg-white p-3 rounded-xl border border-black/5 shadow-sm hover:border-purple-200 transition-colors">
                                <div className={`flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0 ${
                                    activity.type === 'inquiry' ? 'bg-blue-100 text-blue-600' :
                                    activity.type === 'blog' ? 'bg-green-100 text-green-600' :
                                    'bg-purple-100 text-purple-600'
                                }`}>
                                    {activity.type === 'inquiry' ? <FiCalendar /> :
                                     activity.type === 'blog' ? <FaPen /> :
                                     <FiActivity />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">{activity.action}</span>
                                    <span className="text-xs text-gray-500">{activity.description}</span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500 text-sm">No recent activity</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default HeartviewAdmin
