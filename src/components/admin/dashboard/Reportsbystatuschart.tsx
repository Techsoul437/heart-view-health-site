"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

type ChartDataItem = {
  name: string;
  value: number;
  color: string;
  key: keyof StatusItem;
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

const LABELS: Record<keyof StatusItem, string> = {
  completed: "Completed",
  pending: "Pending",
  processing: "Processing",
  failed: "Failed",
};

function pct(val: number, total: number): number {
  return Math.round((val / total) * 100);
}

interface CustomLabelProps {
  cx?: number;
  cy?: number;
  total: number;
}

const CustomLabel = ({ cx = 0, cy = 0, total }: CustomLabelProps) => (
  <>
    <text
      x={cx}
      y={cy - 8}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#0f172a"
      fontSize={20}
      fontWeight={500}
    >
      {total.toLocaleString()}
    </text>
    <text
      x={cx}
      y={cy + 14}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#94a3b8"
      fontWeight={400}
      fontSize={11}
    >
      Total
    </text>
  </>
);

export default function ReportsByStatusChart({
  year,
  month,
}: ReportsByStatusChartProps) {
  const raw = statusData[year]?.[month] || statusData[2024][5];
  const total = Object.values(raw).reduce((a, b) => a + b, 0);

  const chartData: ChartDataItem[] = (
    Object.entries(raw) as [keyof StatusItem, number][]
  ).map(([key, value]) => ({
    name: LABELS[key],
    value,
    color: COLORS[key],
    key,
  }));

  const statItems: { key: keyof StatusItem; label: string; color: string }[] = [
    { key: "completed", label: "Completed", color: COLORS.completed },
    { key: "pending", label: "Pending", color: COLORS.pending },
    { key: "processing", label: "Processing", color: COLORS.processing },
    { key: "failed", label: "Failed", color: COLORS.failed },
  ];

  return (
    <div className="rounded-2xl border border-black/10    min-h-170    bg-[#f7f7f7]  shadow-xl
        backdrop-blur-md p-5 w-full">
      {/* Header */}
      <div className="mb-3">
                 <h4 className="text-lg md:text-xl xl:text-2xl text-black">

          Reports by Status
        </h4>
                <p className="mt-1 text-[#64748B] text-base sm:text-lg  leading-relaxed  font-light">

          Current report processing overview
        </p>
      </div>

      {/* Top section: Donut + 2x2 grid */}
      <div className="flex items-center gap-3 mb-3">
        {/* Donut chart */}
        <div className="relative shrink-0 w-27.5 h-27.5">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={52}
                paddingAngle={2}
                dataKey="value"
                stroke="transparent"
                labelLine={false}
                label={(props) => (
                  <CustomLabel cx={props.cx} cy={props.cy} total={total} />
                )}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.key} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  Number(value ?? 0).toLocaleString(),
                  String(name),
                ]}
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                itemStyle={{ color: "#e2e8f0" }}
                labelStyle={{ color: "#94a3b8" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 2x2 stat grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 min-w-0">
          {statItems.map(({ key, label, color }) => (
            <div
              key={key}
              className="bg-white rounded-xl px-3 py-2 flex flex-col gap-0.5 min-w-0"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className=" text-base sm:text-lg  leading-relaxed  font-light text-[#64748B] truncate">{label}</span>
              </div>
              <span className="text-2xl font-bold text-black leading-tight">
                {raw[key].toLocaleString()}
              </span>
              <span className="  text-[#64748B] ">
                {pct(raw[key], total)}% of total
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: stacked distribution bar */}
      <div className="border-t border-black/5 pt-3">
        <div className="flex justify-between  text-base sm:text-lg  leading-relaxed  font-light text-[#64748B]  mb-1.5">
          <span>Distribution</span>
          <span>{total.toLocaleString()} reports</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
          {statItems.map(({ key, color }) => (
            <div
              key={key}
              className="h-full rounded-full"
              style={{
                width: `${pct(raw[key], total)}%`,
                backgroundColor: color,
              }}
            />
          ))}
        </div>
        {/* Bar legend */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          {statItems.map(({ key, label, color }) => (
            <div key={key} className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-sm shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className=" text-[#64748B] ">
                {label} {pct(raw[key], total)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}