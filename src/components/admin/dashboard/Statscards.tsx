"use client";

import { IconType } from "react-icons";
import {
  FiUploadCloud,
  FiClock,
  FiEye,
  FiDownload,
} from "react-icons/fi";

type StatsData = {
  uploaded: number;
  pending: number;
  viewed: number;
  downloaded: number;
};

type StatsConfig = {
  [year: number]: {
    [month: number]: StatsData;
  };
};

const statsConfig: StatsConfig = {
  2024: {
    1: { uploaded: 98, pending: 22, viewed: 310, downloaded: 140 },
    2: { uploaded: 105, pending: 28, viewed: 340, downloaded: 155 },
    3: { uploaded: 112, pending: 31, viewed: 365, downloaded: 162 },
    4: { uploaded: 119, pending: 25, viewed: 378, downloaded: 170 },
    5: { uploaded: 128, pending: 36, viewed: 412, downloaded: 187 },
    6: { uploaded: 134, pending: 30, viewed: 430, downloaded: 195 },
    7: { uploaded: 140, pending: 33, viewed: 450, downloaded: 200 },
    8: { uploaded: 145, pending: 27, viewed: 460, downloaded: 210 },
    9: { uploaded: 138, pending: 29, viewed: 445, downloaded: 205 },
    10: { uploaded: 150, pending: 40, viewed: 480, downloaded: 220 },
    11: { uploaded: 160, pending: 38, viewed: 500, downloaded: 230 },
    12: { uploaded: 175, pending: 42, viewed: 520, downloaded: 245 },
  },
  2025: {
    1: { uploaded: 180, pending: 45, viewed: 530, downloaded: 250 },
    2: { uploaded: 190, pending: 48, viewed: 550, downloaded: 260 },
    3: { uploaded: 200, pending: 50, viewed: 570, downloaded: 270 },
    4: { uploaded: 210, pending: 52, viewed: 590, downloaded: 280 },
    5: { uploaded: 220, pending: 55, viewed: 610, downloaded: 290 },
    6: { uploaded: 230, pending: 58, viewed: 630, downloaded: 300 },
  },
};

type CardItem = {
  key: keyof StatsData;
  label: string;
  icon: IconType;
  iconBgStyle: string;   // ✅ inline style string (hex color)
  iconColor: string;     // Tailwind class — same as before
  trend: string;
};

const cards: CardItem[] = [
  {
    key: "uploaded",
    label: "Reports Uploaded",
    icon: FiUploadCloud,
    iconBgStyle: "rgba(59,130,246,0.1)",   // blue-500/10
    iconColor: "text-blue-400",
    trend: "+18%",
  },
  {
    key: "pending",
    label: "Pending Reports",
    icon: FiClock,
    iconBgStyle: "rgba(249,115,22,0.1)",   // orange-500/10
    iconColor: "text-orange-400",
    trend: "+5%",
  },
  {
    key: "viewed",
    label: "Viewed Reports",
    icon: FiEye,
    iconBgStyle: "rgba(6,182,212,0.1)",    // cyan-500/10
    iconColor: "text-cyan-400",
    trend: "+22%",
  },
  {
    key: "downloaded",
    label: "Downloaded Reports",
    icon: FiDownload,
    iconBgStyle: "rgba(99,102,241,0.1)",   // indigo-500/10
    iconColor: "text-indigo-400",
    trend: "+16%",
  },
];

interface StatsCardsProps {
  year?: number;
  month?: number;
}

export default function StatsCards({
  year = 2025,
  month = 1,
}: StatsCardsProps) {
  const selectedYear = Number(year);
  const selectedMonth = Number(month);

  const data: StatsData =
    statsConfig[selectedYear]?.[selectedMonth] || {
      uploaded: 180,
      pending: 45,
      viewed: 530,
      downloaded: 250,
    };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, iconBgStyle, iconColor, trend }) => (
        <div
          key={key}
          className="
            group
            relative
            rounded-2xl
            border border-black/10
            bg-[#f7f7f7]
            p-5
            shadow-xl
            backdrop-blur-md
            transition-all duration-300
            hover:-translate-y-1
            hover:border-white/20
          "
        >
          {/* Glow */}
          <div
            className="
              absolute inset-0
              bg-linear-to-br
              from-white/3
              to-transparent
              opacity-0
              transition-opacity duration-300
              group-hover:opacity-100
            "
          />

          <div className="relative flex items-start justify-between gap-3">
            {/* Left — text classes bilkul same hain */}
            <div className="min-w-0 flex-1">
              <p className="text-[#64748B] line-clamp-none lg:line-clamp-2 lg:h-12 xl:h-6 leading-6">{label}</p>

              <h3 className="mt-2 text-2xl font-bold text-black">
                {data[key]}
              </h3>

              <p className="mt-2 flex items-center gap-1 whitespace-nowrap  text-sm  font-medium text-emerald-500">
                  <span>{trend}</span>
                  <span>vs yesterday</span>
                  <span>↑</span>
                </p>
            </div>

            {/* Right Icon — fixed top-right, same space across all cards */}
            <div
              style={{ backgroundColor: iconBgStyle }}
              className="
                mt-0.5 flex h-12 w-12 xl:h-12 xl:w-12 flex-shrink-0 items-center justify-center
                rounded-lg xl:rounded-xl border border-black/5
              "
            >
              <Icon className={`text-lg xl:text-2xl ${iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}