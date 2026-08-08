"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import FillButton from "@/Ui/buttons/FillButton";
import { rejectLab, getAllLabs } from "@/redux/Api";
import type { Lab } from "@/redux/Api";

interface RejectModalProps {
  lab: Lab;
  onClose: () => void;
}

const RejectModal = ({ lab, onClose }: RejectModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReject = async () => {
    if (!reason.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }
    setSubmitting(true);
    try {
      await dispatch(rejectLab({ id: lab._id, reason: reason.trim() })).unwrap();
      toast.success("Laboratory rejected");
      dispatch(getAllLabs());
      onClose();
    } catch (err) {
      toast.error(
        typeof err === "string" ? err : "Failed to reject laboratory"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
            Reject Laboratory
          </h1>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748B] hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-5 text-[#64748B] leading-relaxed font-light">
          Provide a reason for rejecting{" "}
          <span className="font-medium text-black">{lab.labName}</span>.
        </p>

        <div className="mt-4">
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error) setError("");
            }}
            rows={4}
            placeholder="Enter reason for rejection"
            className={`w-full rounded-lg border bg-white p-3 text-sm text-black placeholder:text-[#64748B] focus:outline-none ${
              error
                ? "border-red-300 focus:border-red-400"
                : "border-slate-200 focus:border-[#2f5ba5]"
            }`}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-[#64748B] hover:bg-slate-50 disabled:opacity-40"
          >
            Cancel
          </button>
          <FillButton
            text={submitting ? "Rejecting..." : "Reject"}
            href=""
            onClick={handleReject}
          />
        </div>
      </div>
    </div>
  );
};

export default RejectModal;