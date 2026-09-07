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
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tzOffset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzOffset).toISOString().slice(0, -1).split('T')[0];
  });

  const dateObj = new Date(selectedDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const formattedDate = React.useMemo(() => {
    if (!selectedDate) return '';
    const parts = selectedDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return selectedDate;
  }, [selectedDate]);

    return (
        <div className="min-h-screen p-6 md:p-12 text-black overflow-x-hidden">
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
                <div className="flex flex-wrap items-center gap-3">
                    {/* Month Select */}
                    <div className="relative flex items-center justify-between h-10 w-40 rounded-xl border border-black/10 bg-white px-4 shadow-sm focus-within:border-cyan-400/40 overflow-hidden">
                      <span className="text-sm font-medium text-black">
                        {formattedDate}
                      </span>
                      <FiCalendar className="text-[#64748B]" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        lang="en-GB"
                      />
                    </div>
                </div>
            </div>
            <StatCard year={year} month={month} date={selectedDate} />

            <div className="space-y-6 ] py-6">
                <QuickActions />
            </div>
            <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
                <LatestPatient year={year} month={month} date={selectedDate} />
                <LatestLinks year={year} month={month} date={selectedDate} />
            </div>
        </div>
    )
}

export default LabStaffMain
