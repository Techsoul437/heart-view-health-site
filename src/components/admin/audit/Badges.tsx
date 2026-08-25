import React from "react";

export function StatusBadge({ status }: { status: string }) {
  let color = "bg-gray-100 text-gray-700";
  if (status === "Success" || status === "Active" || status === "Resolved") color = "bg-emerald-100 text-emerald-700";
  else if (status === "Failed" || status === "Revoked" || status === "Blocked") color = "bg-red-100 text-red-700";
  else if (status === "Pending" || status === "Open") color = "bg-amber-100 text-amber-700";
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${color}`}>
      {status}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: string }) {
  let color = "bg-gray-100 text-gray-700";
  if (severity === "Low") color = "bg-blue-100 text-blue-700";
  else if (severity === "Medium") color = "bg-amber-100 text-amber-700";
  else if (severity === "High") color = "bg-orange-100 text-orange-700";
  else if (severity === "Critical") color = "bg-red-100 text-red-700 font-bold";
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${color}`}>
      {severity}
    </span>
  );
}
