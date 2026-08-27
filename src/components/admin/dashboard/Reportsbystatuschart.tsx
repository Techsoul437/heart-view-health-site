"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getReportStatusStats } from "@/redux/Api";

type StatusItem = {
  completed: number;
  pending: number;
  processing: number;
  failed: number;
};

type StatusData = {
  [year: number]: {
    [month: number]: StatusItem;
  };
};

interface ReportsByStatusChartProps {
  year: number;
  month: number;
}

const statusData: StatusData = {
  2024: {
    5: { completed: 1540, pending: 780, processing: 320, failed: 200 },
    6: { completed: 2700, pending: 800, processing: 330, failed: 110 },
    7: { completed: 2900, pending: 820, processing: 340, failed: 90 },
    8: { completed: 3000, pending: 840, processing: 350, failed: 95 },
    9: { completed: 2850, pending: 810, processing: 335, failed: 105 },
    10: { completed: 3100, pending: 860, processing: 360, failed: 120 },
    11: { completed: 3250, pending: 880, processing: 370, failed: 100 },
    12: { completed: 3400, pending: 900, processing: 380, failed: 130 },
  },
  2025: {
    1: { completed: 3500, pending: 920, processing: 390, failed: 140 },
    2: { completed: 3600, pending: 940, processing: 395, failed: 135 },
    3: { completed: 3700, pending: 960, processing: 400, failed: 145 },
    4: { completed: 3800, pending: 970, processing: 405, failed: 150 },
    5: { completed: 3900, pending: 980, processing: 410, failed: 155 },
    6: { completed: 4000, pending: 990, processing: 415, failed: 160 },
  },
};

const COLORS: Record<keyof StatusItem, string> = {
  completed: "#22c55e",
  pending: "#f97316",
  processing: "#3b82f6",
  failed: "#ef4444",
};

const BG_COLORS: Record<keyof StatusItem, string> = {
  completed: "#dcfce7",
  pending: "#ffedd5",
  processing: "#dbeafe",
  failed: "#fee2e2",
};

const LABELS: Record<keyof StatusItem, string> = {
  completed: "Completed",
  pending: "Pending",
  processing: "Viewed",
  failed: "Failed",
};

const ICONS: Record<keyof StatusItem, React.ReactNode> = {
  completed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  pending: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  processing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
    </svg>
  ),
  failed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

function pct(val: number, total: number): number {
  return Math.round((val / total) * 100);
}

function CircularRing({
  value,
  total,
  color,
  bgColor,
  icon,
}: {
  value: number;
  total: number;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}) {
  const percentage = pct(value, total);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke={bgColor} strokeWidth="5" />
        <circle
          cx="36" cy="36" r={radius}
          fill="none" stroke={color} strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 36 36)"
        />
      </svg>
      <div className="absolute flex items-center justify-center" style={{ color, width: 32, height: 32 }}>
        {icon}
      </div>
    </div>
  );
}

export default function ReportsByStatusChart({ year, month }: ReportsByStatusChartProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [raw, setRaw] = useState<StatusItem>({ completed: 0, pending: 0, processing: 0, failed: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(getReportStatusStats({ year, month }));
        if (getReportStatusStats.fulfilled.match(result)) {
          const data = result.payload?.data || {};
          setRaw({
            completed: data.completed || data.downloaded || data.Downloaded || 0,
            pending: data.pending || data.sent || data.Sent || 0,
            processing: data.processing || data.viewed || data.Viewed || 0,
            failed: data.failed || data.Failed || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch report status stats:", error);
      }
    };
    fetchData();
  }, [dispatch, year, month]);

  const actualTotal = Object.values(raw).reduce((a, b) => a + b, 0);
  const total = actualTotal || 1; // avoid division by zero

  const statKeys: (keyof StatusItem)[] = ["completed", "pending", "processing", "failed"];

  return (
    // h-full so it stretches to match sibling card height; parent row must be items-stretch
    <div className="rounded-2xl border border-black/10 bg-[#f7f7f7] shadow-xl backdrop-blur-md p-5 w-full h-full flex flex-col">

      {/* Header */}
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div>
          <h4 className="text-md md:text-lg xl:text-xl text-black">Reports by Status</h4>
          <p className="mt-1 text-[#64748B] font-light">Current report processing overview</p>
        </div>
        {/* <button className="text-[#64748B] hover:text-black transition-colors mt-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button> */}
      </div>

      {/* 2×2 grid of rings — grows to fill available space */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 flex-1 content-center mb-4">
        {statKeys.map((key) => (
          <div key={key} className="flex flex-col items-center gap-2">
            <CircularRing
              value={raw[key]}
              total={total}
              color={COLORS[key]}
              bgColor={BG_COLORS[key]}
              icon={ICONS[key]}
            />
            <div className="text-center">
              <div className="text-2xl font-bold text-black leading-tight">
                {raw[key].toLocaleString()}
              </div>
              <div className="font-semibold" style={{ color: COLORS[key] }}>
                {pct(raw[key], total)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Distribution bar — pinned to bottom */}
      <div className="border-t border-black/5 pt-3 shrink-0">
        <div className="flex text-sm justify-between font-light text-[#64748B] mb-1.5">
          <span>Distribution</span>
          <span>{actualTotal.toLocaleString()} reports</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
          {statKeys.map((key) => (
            <div
              key={key}
              className="h-full rounded-full"
              style={{ width: `${pct(raw[key], total)}%`, backgroundColor: COLORS[key] }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          {statKeys.map((key) => (
            <div key={key} className="flex items-center gap-1 text-sm">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[key] }} />
              <span className="text-[#64748B]">{LABELS[key]} {pct(raw[key], total)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}