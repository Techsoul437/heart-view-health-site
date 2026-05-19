"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useMemo } from "react";

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type ChartData = {
  day: string;
  uploaded: number;
  viewed: number;
  downloaded: number;
};

type MonthlyDataType = {
  [year: number]: {
    [month: number]: ChartData[];
  };
};

interface ReportsOverviewChartProps {
  year: number;
  month: number;
}

/* -------------------------------------------------------
   FULL MONTH DATA
------------------------------------------------------- */

function generateMonthData(
  monthName: string,
  year: number,
  baseUploaded: number
): ChartData[] {
  const totalDays = new Date(
    year,
    months.indexOf(monthName) + 1,
    0
  ).getDate();

  return Array.from({ length: totalDays }, (_, i) => ({
    day: `${i + 1}`,
    uploaded: baseUploaded + i * 2,
    viewed: baseUploaded * 3 + i * 4,
    downloaded: baseUploaded * 1.5 + i * 3,
  }));
}

const monthlyData: MonthlyDataType = {
  2024: {
    1: generateMonthData("January", 2024, 80),
    2: generateMonthData("February", 2024, 90),
    3: generateMonthData("March", 2024, 100),
    4: generateMonthData("April", 2024, 110),
    5: generateMonthData("May", 2024, 120),
    6: generateMonthData("June", 2024, 130),
    7: generateMonthData("July", 2024, 135),
    8: generateMonthData("August", 2024, 140),
    9: generateMonthData("September", 2024, 145),
    10: generateMonthData("October", 2024, 150),
    11: generateMonthData("November", 2024, 155),
    12: generateMonthData("December", 2024, 160),
  },

  2025: {
    1: generateMonthData("January", 2025, 170),
    2: generateMonthData("February", 2025, 180),
    3: generateMonthData("March", 2025, 190),
    4: generateMonthData("April", 2025, 200),
    5: generateMonthData("May", 2025, 210),
    6: generateMonthData("June", 2025, 220),
    7: generateMonthData("July", 2025, 225),
    8: generateMonthData("August", 2025, 230),
    9: generateMonthData("September", 2025, 235),
    10: generateMonthData("October", 2025, 240),
    11: generateMonthData("November", 2025, 245),
    12: generateMonthData("December", 2025, 250),
  },
};

function getFallbackData(
  year: number,
  month: number
): ChartData[] {
  const totalDays = new Date(year, month, 0).getDate();

  return Array.from({ length: totalDays }, (_, i) => ({
    day: `${i + 1}`,
    uploaded: Math.floor(80 + Math.random() * 60),
    viewed: Math.floor(200 + Math.random() * 150),
    downloaded: Math.floor(120 + Math.random() * 80),
  }));
}

export default function ReportsOverviewChart({
  year,
  month,
}: ReportsOverviewChartProps) {
  const data = useMemo<ChartData[]>(() => {
    return (
      monthlyData[year]?.[month] ||
      getFallbackData(year, month)
    );
  }, [year, month]);

  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-[#111827]/80
        p-5
        shadow-xl
        backdrop-blur-md
      "
    >
      {/* Header */}
      <div className="mb-5">
        <div>
          <h4 className="text-lg md:text-xl xl:text-2xl text-white">
            Reports Overview
          </h4>

          <p className="mt-1 text-slate-400">
            Monthly upload and activity analytics
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
          />

          <XAxis
            dataKey="day"
            tick={{
              fontSize: 11,
              fill: "#94a3b8",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: "#94a3b8",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              fontSize: "12px",
              color: "#fff",
            }}
            labelStyle={{
              color: "#94a3b8",
            }}
            itemStyle={{
              color: "#e2e8f0",
            }}
          />

          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: "12px",
              paddingTop: "16px",
              color: "#cbd5e1",
            }}
          />

          {/* Uploaded */}
          <Line
            type="monotone"
            dataKey="uploaded"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
            }}
            name="Uploaded"
          />

          {/* Viewed */}
          <Line
            type="monotone"
            dataKey="viewed"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
            }}
            name="Viewed"
          />

          {/* Downloaded */}
          <Line
            type="monotone"
            dataKey="downloaded"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
            }}
            name="Downloaded"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}