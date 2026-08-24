"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getReportLinkStats, getAllUsers } from "@/redux/Api";
import { IconType } from "react-icons";
import {
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
    key: "totalPatients",
    label: "Total Patients",
    icon: FiUser,
    iconBgStyle: "rgba(59,130,246,0.1)",
    iconColor: "text-blue-600",
    trend: "+12%",
  },
  {
    key: "linksSent",
    label: "Links Sent",
    icon: FiLink,
    iconBgStyle: "rgba(168,85,247,0.1)",
    iconColor: "text-purple-600",
    trend: "+15%",
  },
  {
    key: "viewed",
    label: "Reports Viewed",
    icon: FiEye,
    iconBgStyle: "rgba(6,182,212,0.1)",
    iconColor: "text-cyan-600",
    trend: "+6%",
  },
  {
    key: "newPatients",
    label: "New Patients",
    icon: FiFileText,
    iconBgStyle: "rgba(249,115,22,0.1)",
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
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<StatsData>({
    totalPatients: 0,
    uploaded: 0,
    linksSent: 0,
    viewed: 0,
    newPatients: 0,
    pending: 0,
    downloaded: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsResult, usersResult] = await Promise.allSettled([
          dispatch(getReportLinkStats({ year, month })).unwrap(),
          dispatch(getAllUsers()).unwrap()
        ]);
        
        const stats = statsResult.status === 'fulfilled' ? statsResult.value.data : null;
        const users = usersResult.status === 'fulfilled' ? usersResult.value.data || [] : [];
        
        const targetMonth = month ? month - 1 : new Date().getMonth();
        const targetYear = year || new Date().getFullYear();
        
        const newPatientsCount = users.filter((u: { createdAt?: string }) => {
          if (!u.createdAt) return false;
          const date = new Date(u.createdAt);
          return date.getMonth() === targetMonth && date.getFullYear() === targetYear;
        }).length;
        
        setData((prev) => ({
          ...prev,
          totalPatients: users.length,
          newPatients: newPatientsCount,
          linksSent: stats?.totalSent || 0,
          viewed: stats?.totalViewed || 0,
          downloaded: stats?.totalDownloaded || 0,
          pending: stats?.totalPending || 0,
        }));
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, [dispatch, year, month]);

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

              {/* <p className="mt-2 flex items-center text-sm gap-1 whitespace-nowrap font-medium text-emerald-500">
                <span>{trend}</span>
                <span>vs yesterday</span>
                <span>↑</span>
              </p> */}
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