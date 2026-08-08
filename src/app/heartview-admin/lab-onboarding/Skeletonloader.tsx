"use client";

import React from "react";

const SkeletonLoader = () => {
  const rows = Array.from({ length: 8 });
  const cols = Array.from({ length: 10 });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {cols.map((_, i) => (
                <th key={i} className="px-5 py-3 text-left">
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((_, r) => (
              <tr key={r} className="border-b border-slate-50">
                {cols.map((_, c) => (
                  <td key={c} className="px-5 py-4">
                    <div
                      className={`animate-pulse rounded bg-slate-100 ${
                        c === 0 ? "h-8 w-8 rounded-full" : "h-3 w-20"
                      }`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonLoader;