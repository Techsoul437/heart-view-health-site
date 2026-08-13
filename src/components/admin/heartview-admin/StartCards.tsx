"use client";

import { IconType } from "react-icons";
import {
  FiUsers,
  FiUser,
  FiCheckCircle,
  FiHome,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllUsers, getAllLabs } from "@/redux/Api";
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
  iconBgStyle: string;  // ✅ inline style — Tailwind purge se safe
  iconColor: string;
  trend: string;
};

const cards: CardItem[] = [
  {
    key: "totalLabs",
    label: "Total Labs",
    icon: FiHome,
    iconBgStyle: "rgba(59,130,246,0.1)",   // blue-100 equivalent
    iconColor: "text-blue-600",
    trend: "+8%",
  },
  {
    key: "activeLabs",
    label: "Active Labs",
    icon: FiCheckCircle,
    iconBgStyle: "rgba(34,197,94,0.1)",    // green-100 equivalent
    iconColor: "text-green-600",
    trend: "+5%",
  },
  {
    key: "totalPatients",
    label: "Total Patients",
    icon: FiUser,
    iconBgStyle: "rgba(168,85,247,0.1)",   // purple-100 equivalent
    iconColor: "text-purple-600",
    trend: "+12%",
  },
  {
    key: "newLabs",
    label: "New Labs This Month",
    icon: FiUsers,
    iconBgStyle: "rgba(249,115,22,0.1)",   // orange-100 equivalent
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
  const dispatch = useDispatch<AppDispatch>();
  const { labs } = useSelector(
    (state: RootState) => state.getalllabs
  );
  const [totalPatients, setTotalPatients] = useState(0);
 const totalLabs = labs.length;

const activeLabs = labs.filter(
  (lab) => lab.status?.toLowerCase() === "active"
).length;

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const newLabs = labs.filter((lab) => {
  if (!lab.createdAt) return false;

  const date = new Date(lab.createdAt);

  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  );
}).length;

const data = {
  totalLabs,
  activeLabs,
  totalPatients,
  newLabs,
};
  useEffect(() => {
    dispatch(getAllLabs());

    const fetchPatients = async () => {
      try {
        const response = await dispatch(getAllUsers()).unwrap();
        setTotalPatients(response.data?.length || 0);
      } catch (error) {
        console.error(error);
        setTotalPatients(0);
      }
    };

    fetchPatients();
  }, [dispatch]);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await dispatch(getAllUsers()).unwrap();

        setTotalPatients(response.data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        setTotalPatients(0);
      }
    };

    fetchPatients();
  }, [dispatch]);
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
              <p className="text-[#64748B] line-clamp-none lg:line-clamp-2 lg:h-12 xl:h-6 leading-6">
                {label}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-black">
                {data[key].toLocaleString()}
              </h3>

              {/* <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500 whitespace-nowrap">
                <span>{trend}</span>
                <span>vs yesterday</span>
                <span>↑</span>
              </p> */}
            </div>

            {/* Right Icon — overflow-hidden nahi, inline bg, responsive size */}
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