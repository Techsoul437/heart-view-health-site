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
    1: {
      uploaded: 98,
      pending: 22,
      viewed: 310,
      downloaded: 140,
    },
    2: {
      uploaded: 105,
      pending: 28,
      viewed: 340,
      downloaded: 155,
    },
    3: {
      uploaded: 112,
      pending: 31,
      viewed: 365,
      downloaded: 162,
    },
    4: {
      uploaded: 119,
      pending: 25,
      viewed: 378,
      downloaded: 170,
    },
    5: {
      uploaded: 128,
      pending: 36,
      viewed: 412,
      downloaded: 187,
    },
    6: {
      uploaded: 134,
      pending: 30,
      viewed: 430,
      downloaded: 195,
    },
    7: {
      uploaded: 140,
      pending: 33,
      viewed: 450,
      downloaded: 200,
    },
    8: {
      uploaded: 145,
      pending: 27,
      viewed: 460,
      downloaded: 210,
    },
    9: {
      uploaded: 138,
      pending: 29,
      viewed: 445,
      downloaded: 205,
    },
    10: {
      uploaded: 150,
      pending: 40,
      viewed: 480,
      downloaded: 220,
    },
    11: {
      uploaded: 160,
      pending: 38,
      viewed: 500,
      downloaded: 230,
    },
    12: {
      uploaded: 175,
      pending: 42,
      viewed: 520,
      downloaded: 245,
    },
  },

  2025: {
    1: {
      uploaded: 180,
      pending: 45,
      viewed: 530,
      downloaded: 250,
    },
    2: {
      uploaded: 190,
      pending: 48,
      viewed: 550,
      downloaded: 260,
    },
    3: {
      uploaded: 200,
      pending: 50,
      viewed: 570,
      downloaded: 270,
    },
    4: {
      uploaded: 210,
      pending: 52,
      viewed: 590,
      downloaded: 280,
    },
    5: {
      uploaded: 220,
      pending: 55,
      viewed: 610,
      downloaded: 290,
    },
    6: {
      uploaded: 230,
      pending: 58,
      viewed: 630,
      downloaded: 300,
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
    key: "uploaded",
    label: "Reports Uploaded Today",
    icon: FiUploadCloud,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    trend: "+18%",
  },

  {
    key: "pending",
    label: "Pending Reports",
    icon: FiClock,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    trend: "+5%",
  },

  {
    key: "viewed",
    label: "Reports Viewed Today",
    icon: FiEye,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    trend: "+22%",
  },

  {
    key: "downloaded",
    label: "Reports Downloaded Today",
    icon: FiDownload,
    iconBg: "bg-indigo-500/10",
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
  // Convert string to number
  const selectedYear = Number(year);
  const selectedMonth = Number(month);

  // Get data
  const data: StatsData =
    statsConfig[selectedYear]?.[selectedMonth] || {
      uploaded: 180,
      pending: 45,
      viewed: 530,
      downloaded: 250,
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
              bg-[#111827]/80
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

            <div className="relative flex items-center justify-between">
              {/* Left */}
              <div>
                <p className="text-[#64748B]">
                  {label}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-black">
                  {data[key]}
                </h3>

                <p className="mt-2 text-emerald-400">
                  {trend} vs yesterday ↑
                </p>
              </div>

              {/* Right Icon */}
              <div
                className={`
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl border border-white/5
                  ${iconBg}
                `}
              >
                <Icon
                  className={`text-2xl ${iconColor}`}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}