"use client"
import React, { useState } from 'react'
import StatCard from './StatsCard'
import { FiCalendar } from 'react-icons/fi'
import QuickActions from './QuickActions';
import LatestPatient from "./LatestPaient";
import LatestLinks from './LatestLink';

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
function LabStaffMain() {
    const [year, setYear] = useState<number>(
        now.getFullYear()
    );

    const [month, setMonth] = useState<number>(
        now.getMonth() + 1
    );

    const monthLabel =
        MONTHS.find((m) => m.value === month)?.label ?? "";
    return (
        <div className="min-h-screen p-6 text-black overflow-x-hidden">
            {/* ───────────────── HEADER ───────────────── */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                {/* Left */}
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-normal tracking-tight text-black">
                        Dashboard
                    </h1>

                    <p className="mt-1 text-[#64748B]   leading-relaxed  font-light">
                        Overview of reports and activity
                    </p>
                </div>

                {/* Right Controls */}
                {/* <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select
                            value={month}
                            onChange={(e) =>
                                setMonth(Number(e.target.value))
                            }
                            className="
                    appearance-none
                    rounded-xl
                    border border-black/10
                    bg-[#f7f7f7]
                    pl-4 pr-9 py-2.5
                    font-medium
                    text-[#64748B]
                    backdrop-blur-md
                    shadow-lg
                    outline-none
                    transition-all
                    focus:border-indigo-400
                    focus:ring-2
                    focus:ring-indigo-500/30
                    cursor-pointer
                  "
                        >
                            {MONTHS.map((m) => (
                                <option
                                    key={m.value}
                                    value={m.value}
                                    className="bg-white text-black"
                                >
                                    {m.label}
                                </option>
                            ))}
                        </select>


                    </div>

                    <div className="relative">
                        <select
                            value={year}
                            onChange={(e) =>
                                setYear(Number(e.target.value))
                            }
                            className="
                    appearance-none
                    rounded-xl
                    border border-black/10
                                    bg-[#f7f7f7]
    
                    pl-4 pr-9 py-2.5
                    font-medium
                    text-[#64748B]
                    backdrop-blur-md
                    shadow-lg
                    outline-none
                    transition-all
                    focus:border-indigo-400
                    focus:ring-2
                    focus:ring-indigo-500/30
                    cursor-pointer
                  "
                        >
                            {YEARS.map((y) => (
                                <option
                                    key={y}
                                    value={y}
                                    className="bg-white text-black"
                                >
                                    {y}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div
                        className="
                  flex items-center gap-2
                  rounded-xl
                  border border-black/10
                        bg-[#f7f7f7]
                  px-4 py-2.5
                  font-medium
                  text-[#64748B]
                  backdrop-blur-md
                  shadow-lg
                "
                    >
                        <FiCalendar className="text-[#64748B]" />
                        {monthLabel} {year}
                    </div>
                </div> */}
            </div>
            <StatCard></StatCard>

            <div className="space-y-6 ] py-6">
                <QuickActions />
            </div>
            <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
                <LatestPatient></LatestPatient>
                <LatestLinks></LatestLinks>
            </div>
        </div>
    )
}

export default LabStaffMain
