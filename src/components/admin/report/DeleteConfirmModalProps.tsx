"use client";

import { Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  testName: string;
  onDelete: () => void;
  onRescan: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  testName,
  onDelete,
  onRescan,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-xs rounded-2xl bg-[#1c1c1e] px-6 py-6 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15">
          <Trash2 className="h-6 w-6 text-red-500" />
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-white">
          Delete this result?
        </h2>

        {/* Subtext */}
        <p className="mt-1 text-sm text-gray-400">
          {testName
            ? `"${testName}" will not be saved to your health data.`
            : "This result will not be saved to your health data."}
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onDelete}
            className="w-full rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 active:bg-red-700"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={onRescan}
            className="w-full rounded-xl bg-white/10 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 active:bg-white/20"
          >
            Re-scan Report
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 text-sm font-medium text-gray-400 transition-colors hover:text-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}