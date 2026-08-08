"use client";

import React from "react";
import { Building2, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { Lab } from "@/redux/Api";
interface StatsCardsProps {
  labs: Lab[];
}

const StatsCards = ({ labs }: StatsCardsProps) => {
  const total = labs.length;
  const pending = labs.filter((l) => l.status === "Pending").length;
  const active = labs.filter((l) => l.status === "Active").length;
  const rejected = labs.filter((l) => l.status === "Rejected").length;

  const cards = [
    {
      label: "Total Labs",
      value: total,
      icon: Building2,
      color: "text-[#2f5ba5] bg-sky-100",
    },
    {
      label: "Pending Labs",
      value: pending,
      icon: Clock,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      label: "Approved Labs",
      value: active,
      icon: CheckCircle2,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Rejected Labs",
      value: rejected,
      icon: XCircle,
      color: "text-red-600 bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div>
              <p className="text-[#64748B] font-light">{card.label}</p>
              <p className="mt-2 text-2xl font-normal text-black">{card.value}</p>
            </div>
            <div className={`rounded-xl p-3 ${card.color}`}>
              <Icon size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;