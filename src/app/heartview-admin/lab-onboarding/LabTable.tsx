"use client";

import React from "react";
import { FiEye, FiEdit2, FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import StatusBadge from "./Statusbadge";
import type { Lab } from "@/redux/Api";

interface LabTableProps {
  labs: Lab[];
  onView: (lab: Lab) => void;
  onEdit: (lab: Lab) => void;
  onApprove: (lab: Lab) => void;
  onReject: (lab: Lab) => void;
  onDelete: (lab: Lab) => void;
}

const LabTable = ({
  labs,
  onView,
  onEdit,
  onApprove,
  onReject,
  onDelete,
}: LabTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            <th className="px-5 py-3 text-left font-medium text-black">Logo</th>
            <th className="px-5 py-3 text-left font-medium text-black">Lab Name</th>
            <th className="px-5 py-3 text-left font-medium text-black">Branch</th>
            <th className="px-5 py-3 text-left font-medium text-black">Owner</th>
            <th className="px-5 py-3 text-left font-medium text-black">Email</th>
            <th className="px-5 py-3 text-left font-medium text-black">Phone</th>
            <th className="px-5 py-3 text-left font-medium text-black">City</th>
            <th className="px-5 py-3 text-left font-medium text-black">Status</th>
            <th className="px-5 py-3 text-left font-medium text-black">Created At</th>
            <th className="px-5 py-3 text-left font-medium text-black">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {labs.map((lab) => (
            <tr
              key={lab._id}
              className="border-b border-slate-50 transition hover:bg-slate-50"
            >
              <td className="px-5 py-4 whitespace-nowrap">
                {lab.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={lab.logo}
                    alt={lab.labName}
                    className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#64748B] font-medium">
                    {lab.labName?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-black">
                {lab.labName}
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-sm text-[#64748B]">
                {lab.branchName || "-"}
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-sm text-[#64748B]">
                {lab.fullName}
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-sm text-[#64748B]">
                {lab.email}
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-sm text-[#64748B]">
                {lab.mobile}
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-sm text-[#64748B]">
                {lab.city}
              </td>
              <td className="px-5 py-4 text-sm whitespace-nowrap">
                <StatusBadge status={lab.status} />
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                {new Date(lab.createdAt).toLocaleDateString()}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(lab)}
                    className="rounded-xl bg-sky-100 p-2.5 text-sky-600 hover:bg-sky-200"
                    title="View"
                  >
                    <FiEye size={16} />
                  </button>
                  {/* <button
                    onClick={() => onEdit(lab)}
                    className="rounded-xl bg-slate-100 p-2.5 text-[#2f5ba5] hover:bg-slate-200"
                    title="Edit"
                  >
                    <FiEdit2 size={16} />
                  </button> */}
                  {lab.status === "Pending" && (
                    <>
                      <button
                        onClick={() => onApprove(lab)}
                        className="rounded-xl bg-green-100 p-2.5 text-green-600 hover:bg-green-200"
                        title="Approve"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() => onReject(lab)}
                        className="rounded-xl bg-yellow-100 p-2.5 text-yellow-600 hover:bg-yellow-200"
                        title="Reject"
                      >
                        <FiX size={16} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onDelete(lab)}
                    className="rounded-xl bg-red-100 p-2.5 text-red-600 hover:bg-red-200"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabTable;