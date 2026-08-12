"use client";

import React from "react";
import { X } from "lucide-react";
import FillButton from "@/Ui/buttons/FillButton";
import StatusBadge from "./Statusbadge";
import type { Lab } from "@/redux/Api";

interface ViewLabModalProps {
  lab: Lab;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="font-medium text-black">{label}</p>
    <p className="mt-1 text-[#64748B] text-sm leading-relaxed font-light">
      {value || "-"}
    </p>
  </div>
);

const ViewLabModal = ({ lab, onClose, onApprove, onReject }: ViewLabModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
            Laboratory Details
          </h1>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748B] hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-4">
          {lab.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lab.logo}
              alt={lab.labName}
              className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[#64748B] font-medium">
              {lab.labName?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium text-black">{lab.labName}</p>
            <div className="mt-1">
              <StatusBadge status={lab.status} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <DetailRow label="Branch" value={lab.branchName} />
          <DetailRow label="Owner Name" value={lab.fullName} />
          <DetailRow label="Email" value={lab.email} />
          <DetailRow label="Phone" value={lab.mobile} />
          <DetailRow label="Lab Type" value={lab.labType} />
          <DetailRow label="City" value={lab.city} />
          <DetailRow
            label="Created Date"
            value={new Date(lab.createdAt).toLocaleString()}
          />
          <DetailRow
            label="Updated Date"
            value={new Date(lab.updatedAt).toLocaleString()}
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          {/* <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-[#64748B] hover:bg-slate-50"
          >
            Close
          </button> */}
          {lab.status === "Pending" && (
            <>
              <button
                onClick={onReject}
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-600 hover:bg-red-100"
              >
                Reject
              </button>
              <FillButton text="Approve" href="" onClick={onApprove} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLabModal;