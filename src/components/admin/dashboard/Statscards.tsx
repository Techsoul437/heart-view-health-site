"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getReportLinkStats } from "@/redux/Api";

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

type CardItem = {
  key: keyof StatsData;
  label: string;
  icon: IconType;
  iconBgStyle: string;
  iconColor: string;
  trend: string;
};

const cards: CardItem[] = [
  {
    key: "uploaded",
    label: "Reports Sent",
    icon: FiUploadCloud,
    iconBgStyle: "rgba(59,130,246,0.1)",
    iconColor: "text-blue-400",
    trend: "+18%",
  },
  {
    key: "pending",
    label: "Pending Views",
    icon: FiClock,
    iconBgStyle: "rgba(249,115,22,0.1)",
    iconColor: "text-orange-400",
    trend: "+5%",
  },
  {
    key: "viewed",
    label: "Viewed Reports",
    icon: FiEye,
    iconBgStyle: "rgba(6,182,212,0.1)",
    iconColor: "text-cyan-400",
    trend: "+22%",
  },
  {
    key: "downloaded",
    label: "Downloaded Reports",
    icon: FiDownload,
    iconBgStyle: "rgba(99,102,241,0.1)",
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
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<StatsData>({
    uploaded: 0,
    pending: 0,
    viewed: 0,
    downloaded: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await dispatch(getReportLinkStats({ year, month }));
        if (getReportLinkStats.fulfilled.match(result)) {
          const stats = result.payload.data;
          
          setData({
            uploaded: stats?.totalSent || 0,
            pending: stats?.totalPending || 0,
            viewed: stats?.totalViewed || 0,
            downloaded: stats?.totalDownloaded || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, [dispatch, year, month]);

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

              {/* <p className="mt-2 flex items-center gap-1 whitespace-nowrap  text-sm  font-medium text-emerald-500">
                <span>{trend}</span>
                <span>vs yesterday</span>
                <span>↑</span>
              </p> */}
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