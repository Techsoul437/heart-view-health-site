"use client";

import { IconType } from "react-icons";
import {
  FiUploadCloud,
  FiClock,
  FiEye,
  FiDownload,
  FiUser,
  FiFileText,
  FiLink,
} from "react-icons/fi";

type StatsData = {
  totalPatients: number;
  uploaded: number;
  linksSent: number;
  viewed: number;
  newPatients: number;
  pending: number;
  downloaded: number;
};

type StatsConfig = {
  [year: number]: {
    [month: number]: StatsData;
  };
};

const statsConfig: StatsConfig = {
  2025: {
    1: {
      totalPatients: 126,
      uploaded: 38,
      linksSent: 34,
      viewed: 18,
      newPatients: 5,
      pending: 45,
      downloaded: 25,
    },
    2: {
      totalPatients: 145,
      uploaded: 42,
      linksSent: 28,
      viewed: 21,
      newPatients: 7,
      pending: 32,
      downloaded: 18,
    },
  },
};

type CardItem = {
  key: keyof StatsData;
  label: string;
  icon: IconType;
  iconBgStyle: string;  // ✅ inline style — Tailwind purge se safe
  iconColor: string;
  trend: string;
};

const cards: CardItem[] = [
  {
    key: "totalPatients",
    label: "Total Patients",
    icon: FiUser,
    iconBgStyle: "rgba(59,130,246,0.1)",    // blue-100 equivalent
    iconColor: "text-blue-600",
    trend: "+12%",
  },
  // {
  //   key: "uploaded",
  //   label: "Reports Uploaded",
  //   icon: FiUploadCloud,
  //   iconBgStyle: "rgba(34,197,94,0.1)",
  //   iconColor: "text-green-600",
  //   trend: "+8%",
  // },
  {
    key: "linksSent",
    label: "Links Sent",
    icon: FiLink,
    iconBgStyle: "rgba(168,85,247,0.1)",    // purple-100 equivalent
    iconColor: "text-purple-600",
    trend: "+15%",
  },
  {
    key: "viewed",
    label: "Reports Viewed",
    icon: FiEye,
    iconBgStyle: "rgba(6,182,212,0.1)",     // cyan-100 equivalent
    iconColor: "text-cyan-600",
    trend: "+6%",
  },
  {
    key: "newPatients",
    label: "New Patients",
    icon: FiFileText,
    iconBgStyle: "rgba(249,115,22,0.1)",    // orange-100 equivalent
    iconColor: "text-orange-600",
    trend: "+4%",
  },
];

interface StatsCardsProps {
  year?: number;
  month?: number;
}

export default function StatCard({
  year = 2025,
  month = 1,
}: StatsCardsProps) {
  const selectedYear = Number(year);
  const selectedMonth = Number(month);

  const data: StatsData = {
    totalPatients: statsConfig[selectedYear]?.[selectedMonth]?.totalPatients ?? 0,
    uploaded:      statsConfig[selectedYear]?.[selectedMonth]?.uploaded ?? 0,
    linksSent:     statsConfig[selectedYear]?.[selectedMonth]?.linksSent ?? 0,
    viewed:        statsConfig[selectedYear]?.[selectedMonth]?.viewed ?? 0,
    newPatients:   statsConfig[selectedYear]?.[selectedMonth]?.newPatients ?? 0,
    pending:       statsConfig[selectedYear]?.[selectedMonth]?.pending ?? 0,
    downloaded:    statsConfig[selectedYear]?.[selectedMonth]?.downloaded ?? 0,
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
            {/* Left */}
            <div className="min-w-0 flex-1">
              <p className="text-[#64748B]">{label}</p>

              <h3 className="mt-2 text-2xl font-bold text-black">
                {data[key]}
              </h3>

              <p className="mt-2 flex items-center text-sm gap-1 whitespace-nowrap font-medium text-emerald-500">
                <span>{trend}</span>
                <span>vs yesterday</span>
                <span>↑</span>
              </p>
            </div>

            {/* Right Icon — ✅ overflow-hidden nahi, inline bg, responsive size */}
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