"use client";

import React from "react";

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Active: "bg-green-100 text-green-700 border border-green-200",
  Inactive: "bg-gray-100 text-gray-600 border border-gray-200",
  Rejected: "bg-red-100 text-red-700 border border-red-200",
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full font-medium ${
        STATUS_STYLES[status] || "bg-gray-100 text-[#64748B]"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;