"use client";

import { IconType } from "react-icons";
import {
  FiUsers,
  FiUser,
  FiCheckCircle,
  FiHome,
} from "react-icons/fi";

type StatsData = {
 totalLabs: number;
  activeLabs: number;
  totalPatients: number;
  newLabs: number;
};

type StatsConfig = {
  [year: number]: {
    [month: number]: StatsData;
  };
};

const statsConfig: StatsConfig = {
  2026: {
    6: {
       totalLabs: 125,
      activeLabs: 98,
      totalPatients: 25400,
      newLabs: 12,
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
    key: "totalLabs",
    label: "Total Labs",
    icon: FiHome,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trend: "+8%",
  },
  {
    key: "activeLabs",
    label: "Active Labs",
    icon: FiCheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    trend: "+5%",
  },
  {
    key: "totalPatients",
    label: "Total Patients",
    icon: FiUser,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    trend: "+12%",
  },
  {
    key: "newLabs",
    label: "New Labs This Month",
    icon: FiUsers,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    trend: "+3%",
  },
];

interface StatsCardsProps {
  year?: number;
  month?: number;
}

export default function StartCards({
  year = 2025,
  month = 1,
}: StatsCardsProps) {
  const selectedYear = Number(year);
  const selectedMonth = Number(month);

const data: StatsData = {
  totalLabs:
    statsConfig[selectedYear]?.[selectedMonth]?.totalLabs ?? 0,

  activeLabs:
    statsConfig[selectedYear]?.[selectedMonth]?.activeLabs ?? 0,

  totalPatients:
    statsConfig[selectedYear]?.[selectedMonth]?.totalPatients ?? 0,

  newLabs:
    statsConfig[selectedYear]?.[selectedMonth]?.newLabs ?? 0,
};

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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