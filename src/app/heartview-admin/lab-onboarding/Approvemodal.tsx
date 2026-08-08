"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import FillButton from "@/Ui/buttons/FillButton";
import { approveLab, getAllLabs } from "@/redux/Api";
import type { Lab } from "@/redux/Api";

interface ApproveModalProps {
  lab: Lab;
  onClose: () => void;
}

const ApproveModal = ({ lab, onClose }: ApproveModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitting, setSubmitting] = useState(false);

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      await dispatch(approveLab(lab._id)).unwrap();
      toast.success("Laboratory approved successfully");
      dispatch(getAllLabs());
      onClose();
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to approve laboratory"
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
            Approve Laboratory
          </h1>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748B] hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-5 text-[#64748B] leading-relaxed font-light">
          Approve{" "}
          <span className="font-medium text-black">{lab.labName}</span> as an
          active laboratory?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-[#64748B] hover:bg-slate-50 disabled:opacity-40"
          >
            Cancel
          </button>
          <FillButton
            text={submitting ? "Approving..." : "Approve"}
            href=""
            onClick={handleApprove}
          />
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;