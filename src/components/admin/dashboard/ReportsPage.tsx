"use client";

import { useState } from "react";
import { FiCalendar } from "react-icons/fi";

import PendingReportsTable from "./Pendingreportstable";
import StatsCards from "./Statscards";
import ReportsOverviewChart from "./Reportsoverviewchart";
import ReportsByStatusChart from "./Reportsbystatuschart";
import RecentUploadsTable from "./Recentuploadstable";

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

const now = new Date();

export default function ReportsPage() {
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
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
            Dashboard
          </h1>

          <p className="mt-1 text-[#64748B]">
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
                bg-[#111827]/80
                pl-4 pr-9 py-2.5
                font-medium
                text-slate-200
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
                  className="bg-[#111827] text-black"
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
                bg-[#111827]/80
                pl-4 pr-9 py-2.5
                font-medium
                text-slate-200
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
                  className="bg-[#111827] text-black"
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
              bg-[#111827]/80
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

      {/* ───────────────── STATS ───────────────── */}
      <StatsCards year={year} month={month} />

      {/* ───────────────── CHARTS ───────────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left */}
        <div className="lg:col-span-2 min-w-0">
          <ReportsOverviewChart
            year={year}
            month={month}
          />
        </div>

        {/* Right */}
        <div className="min-w-0">
          <ReportsByStatusChart
            year={year}
            month={month}
          />
        </div>
      </div>

      {/* ───────────────── TABLES ───────────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="min-w-0">
          <RecentUploadsTable
            year={year}
            month={month}
          />
        </div>

        <div className="min-w-0">
          <PendingReportsTable
            year={year}
            month={month}
          />
        </div>
      </div>
    </div>
  );
}