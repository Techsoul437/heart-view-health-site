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
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tzOffset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzOffset).toISOString().slice(0, -1).split('T')[0];
  });

  const dateObj = new Date(selectedDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
    return (
        <div className="min-h-screen p-6 md:p-12 text-black overflow-x-hidden">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
                {/* Left */}
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-normal tracking-tight text-black">
                        HeartView  Dashboard
                    </h1>

                    <p className="mt-1 text-[#64748B]  leading-relaxed  font-light">
                        Overview of reports and activity
                    </p>
                </div>

                {/* Right Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex items-center">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-10 rounded-xl border text-sm font-normal border-black/10 bg-[#f7f7f7] px-4 text-black outline-none cursor-pointer shadow-sm focus:border-cyan-400/40"
              lang="en-GB"
            />
          </div>
                </div>
            </div>
            <StartCards year={year} month={month} date={selectedDate} />


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
