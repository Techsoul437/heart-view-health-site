import fs from 'fs';
const path = 'f:/heartView/src/components/admin/dashboard/ReportsPage.tsx';
let text = fs.readFileSync(path, 'utf8');

const newCode = `"use client";

import { useState } from "react";
import { FiCalendar } from "react-icons/fi";

import PendingReportsTable from "./RecentPatientsCard";
import StatsCards from "./Statscards";
import ReportsOverviewChart from "./Reportsoverviewchart";
import ReportsByStatusChart from "./Reportsbystatuschart";
import RecentUploadsTable from "./Recentuploadstable";
import RecentPatientsCard from "./RecentPatientsCard";

export default function ReportsPage() {
  const now = new Date();
  
  // Convert local date to YYYY-MM-DD correctly taking timezone into account
  const tzOffset = now.getTimezoneOffset() * 60000; 
  const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1).split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(localISOTime);

  const dateObj = new Date(selectedDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;

  return (
    <div className=" p-6 text-black overflow-x-hidden">
      {/* ───────────────── HEADER ───────────────── */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        {/* Left */}
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
            Dashboard
          </h1>
          <p className="mt-1 text-[#64748B] leading-relaxed font-light">
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
              className="
                rounded-xl
                border border-black/10
                bg-[#f7f7f7]
                px-4 py-2.5
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
            />
          </div>
        </div>
      </div>

      {/* ───────────────── STATS ───────────────── */}
      <StatsCards year={year} month={month} date={selectedDate} />

      {/* ───────────────── CHARTS ───────────────── */}
      <div className="mt-5 grid grid-cols-1 items-stretch gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 min-w-0">
          <ReportsOverviewChart year={year} month={month} date={selectedDate} />
        </div>

        <div className="min-w-0">
          <ReportsByStatusChart year={year} month={month} date={selectedDate} />
        </div>
      </div>

      {/* ───────────────── TABLES ───────────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="min-w-0">
          <RecentUploadsTable />
        </div>

        <div className="min-w-0">
          <RecentPatientsCard />
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path, newCode);
console.log("ReportsPage updated");
