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

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getMonthlyAnalytics, MonthlyAnalyticsData } from "@/redux/Api";

interface ReportsOverviewChartProps {
  year: number;
  month: number;
}

export default function ReportsOverviewChart({
  year,
  month,
}: ReportsOverviewChartProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<MonthlyAnalyticsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getMonthlyAnalytics({ year, month })).unwrap();
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch monthly analytics", error);
      }
    };
    fetchData();
  }, [dispatch, year, month]);

  return (
    <div
      className="
        rounded-2xl
        border border-black/10
       bg-[#f7f7f7]
        p-5
        h-full
        shadow-xl
        backdrop-blur-md
      "
    >
      {/* Header */}
      <div className="mb-5">
        <div>
          <h4 className="text-md md:text-lg xl:text-xl font-medium text-black">
            Reports Overview
          </h4>

          <p className="mt-1 text-[#64748B]  font-light">
            Monthly upload and activity analytics
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={420}>
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
            stroke="#E2E8F0"
          />

          <XAxis
            dataKey="day"
            tick={{
              fontSize: 11,
              fill: "#475569",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: "#475569",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: "14px",
              fontSize: "12px",
              color: "#0F172A",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            labelStyle={{
              color: "#334155",
            }}
            itemStyle={{
              color: "#0F172A",
            }}
          />

          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: "14px",
              paddingTop: "16px",
              color: "#334155",
            }}
          />

          {/* Uploaded */}
          <Line
            type="monotone"
            dataKey="uploaded"
            stroke="#16A34A"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            name="Uploaded"
          />

          {/* Viewed */}
          <Line
            type="monotone"
            dataKey="viewed"
            stroke="#7C3AED"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            name="Viewed"
          />

          {/* Downloaded */}
          <Line
            type="monotone"
            dataKey="downloaded"
            stroke="#2563EB"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            name="Downloaded"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}