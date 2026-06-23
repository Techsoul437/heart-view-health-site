"use client"
import React, { useState } from 'react'
import StartCards from './StartCards'
import { FiCalendar } from 'react-icons/fi'

import ResentLab from './ResentLab';
import ResentPaient from './ResentPaient';
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
            <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
                {/* Left */}
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl  font-normal tracking-tight text-black">
                        HeartView  Dashboard
                    </h1>

                    <p className="mt-1 text-[#64748B] text-base sm:text-lg  leading-relaxed  font-light">
                        Overview of reports and activity
                    </p>
                </div>

                {/* Right Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Month Select */}
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

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]">
                            ▾
                        </span>
                    </div>

                    {/* Year Select */}
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

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]">
                            ▾
                        </span>
                    </div>

                    {/* Date Badge */}
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
                </div>
            </div>
            <StartCards></StartCards>


            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

                <div className="col-span-1">
                    <ResentPaient />
                </div>

                <div className="col-span-1">
                    <ResentLab />
                </div>


            </div>
        </div>
    )
}

export default HeartviewAdmin
