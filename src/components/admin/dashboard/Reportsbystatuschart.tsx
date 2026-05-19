"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  key: keyof typeof COLORS;
};

interface CustomLabelProps {
  cx?: number;
  cy?: number;
  total: number;
}

interface ReportsByStatusChartProps {
  year: number;
  month: number;
}

const statusData: StatusData = {
  2024: {
    5: { completed: 2540, pending: 780, processing: 320, failed: 100 },
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

const COLORS = {
  completed: "#22c55e",
  pending: "#f97316",
  processing: "#3b82f6",
  failed: "#ef4444",
};

const LABELS = {
  completed: "Completed",
  pending: "Pending",
  processing: "Processing",
  failed: "Failed",
};

function pct(val: number, total: number): number {
  return Math.round((val / total) * 100);
}

const CustomLabel = ({
  cx = 0,
  cy = 0,
  total,
}: CustomLabelProps) => (
  <>
    <text
      x={cx}
      y={cy - 6}
      textAnchor="middle"
      fill="#ffffff"
      fontSize={24}
      fontWeight={700}
    >
      {total.toLocaleString()}
    </text>

    <text
      x={cx}
      y={cy + 16}
      textAnchor="middle"
      fill="#94a3b8"
      fontSize={11}
    >
      Total Reports
    </text>
  </>
);

export default function ReportsByStatusChart({
  year,
  month,
}: ReportsByStatusChartProps) {
  const raw =
    statusData[year]?.[month] || statusData[2024][5];

  const total = Object.values(raw).reduce(
    (a, b) => a + b,
    0
  );

  const chartData: ChartDataItem[] = Object.entries(raw).map(
    ([key, value]) => ({
      name: LABELS[key as keyof typeof LABELS],
      value,
      color: COLORS[key as keyof typeof COLORS],
      key: key as keyof typeof COLORS,
    })
  );

  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-[#111827]/80
        p-5
        shadow-xl
        backdrop-blur-md
        w-full
        overflow-hidden
        min-h-110
        h-full
      "
    >
      {/* Header */}
      <div className="mb-5">
        <h4 className="text-lg md:text-xl xl:text-2xl text-white">
          Reports by Status
        </h4>

        <p className="mt-1 text-slate-400">
          Current report processing overview
        </p>
      </div>

      {/* Content */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-5
          w-full
          h-80
        "
      >
        {/* Chart */}
        <div
          className="
            flex
            items-center
            justify-center
            min-w-[220px]
            max-w-[220px]
            h-55
            shrink-0
          "
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="transparent"
                labelLine={false}
                label={
                  <CustomLabel
                    cx={110}
                    cy={110}
                    total={total}
                  />
                }
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={entry.color}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  Number(value ?? 0).toLocaleString(),
                  String(name),
                ]}
                contentStyle={{
                  background: "#0f172a",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                itemStyle={{
                  color: "#e2e8f0",
                }}
                labelStyle={{
                  color: "#94a3b8",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 min-w-0">
          <ul className="flex flex-col gap-4 w-full">
            {chartData.map((item) => (
              <li
                key={item.key}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border border-white/5
                  bg-white/5
                  px-4
                  py-3
                  w-full
                "
              >
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span
                  className="
                    text-slate-400
                    md:text-base
                    truncate
                  "
                >
                  {item.name}
                </span>

                <span
                  className="
                    ml-auto
                    whitespace-nowrap
                    text-white
                    font-semibold
                    md:text-base
                  "
                >
                  {item.value.toLocaleString()}

                  <span className="ml-1 font-normal text-slate-500">
                    ({pct(item.value, total)}%)
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}