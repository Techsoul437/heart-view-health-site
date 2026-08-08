"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import FillButton from "@/Ui/buttons/FillButton";
import { deleteLab, getAllLabs } from "@/redux/Api";
import type { Lab } from "@/redux/Api";


interface DeleteModalProps {
  lab: Lab;
  onClose: () => void;
}

const DeleteModal = ({ lab, onClose }: DeleteModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await dispatch(deleteLab(lab._id)).unwrap();
      toast.success("Laboratory deleted successfully");
      dispatch(getAllLabs());
      onClose();
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to delete laboratory"
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
            Delete Laboratory
          </h1>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748B] hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-5 text-[#64748B] leading-relaxed font-light">
          Are you sure you want to delete{" "}
          <span className="font-medium text-black">{lab.labName}</span>? This
          action cannot be undone.
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
            text={submitting ? "Deleting..." : "Delete"}
            href=""
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;