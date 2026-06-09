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
  iconBg: string;
  iconColor: string;
  trend: string;
};

const cards: CardItem[] = [
  {
    key: "totalPatients",
    label: "Total Patients",
    icon: FiUser,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trend: "+12%",
  },
  {
    key: "uploaded",
    label: "Reports Uploaded",
    icon: FiUploadCloud,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    trend: "+8%",
  },
  {
    key: "linksSent",
    label: "Links Sent",
    icon: FiLink,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    trend: "+15%",
  },
  {
    key: "viewed",
    label: "Reports Viewed",
    icon: FiEye,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    trend: "+6%",
  },
  {
    key: "newPatients",
    label: "New Patients",
    icon: FiFileText,
    iconBg: "bg-orange-100",
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
    totalPatients:
      statsConfig[selectedYear]?.[selectedMonth]?.totalPatients ?? 0,

    uploaded:
      statsConfig[selectedYear]?.[selectedMonth]?.uploaded ?? 0,

    linksSent:
      statsConfig[selectedYear]?.[selectedMonth]?.linksSent ?? 0,

    viewed:
      statsConfig[selectedYear]?.[selectedMonth]?.viewed ?? 0,

    newPatients:
      statsConfig[selectedYear]?.[selectedMonth]?.newPatients ?? 0,

    pending:
      statsConfig[selectedYear]?.[selectedMonth]?.pending ?? 0,

    downloaded:
      statsConfig[selectedYear]?.[selectedMonth]?.downloaded ?? 0,
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map(
        ({
          key,
          label,
          icon: Icon,
          iconBg,
          iconColor,
          trend,
        }) => (
          <div
            key={key}
            className="
              group
              relative
              overflow-hidden
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

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[#64748B]">{label}</p>

                <h3 className="mt-2 text-2xl font-bold text-black">
                  {data[key]}
                </h3>

                <p className="mt-2 text-emerald-400">
                  {trend} vs yesterday ↑
                </p>
              </div>

              <div
                className={`
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl border border-black/5
                  ${iconBg}
                `}
              >
                <Icon className={`text-2xl ${iconColor}`} />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}