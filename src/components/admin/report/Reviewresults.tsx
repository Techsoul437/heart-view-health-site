"use client";

import { useMemo, useState } from "react";
import { FileText, Info, CheckCircle2, AlertTriangle, Save } from "lucide-react";
import DeleteConfirmModal from "./DeleteConfirmModalProps";

type Status = "verified" | "needs_review";

interface ResultRow {
  id: string;
  testName: string;
  value: string;
  unit: string;
  status: Status;
}

const initialResults: ResultRow[] = [
  { id: "1", testName: "Hemoglobin (Hb)", value: "13.2", unit: "g/dL", status: "verified" },
  { id: "2", testName: "Total Cholesterol", value: "168", unit: "mg/dL", status: "verified" },
  { id: "3", testName: "HDL Cholesterol", value: "45", unit: "mg/dL", status: "verified" },
  { id: "4", testName: "Non HDL Cholesterol", value: "124", unit: "mg/dL", status: "needs_review" },
  { id: "5", testName: "LDL Cholesterol", value: "98", unit: "mg/dL", status: "verified" },
  { id: "6", testName: "Triglycerides", value: "112", unit: "mg/dL", status: "verified" },
];

export default function ReviewResults() {
  const [results, setResults] = useState<ResultRow[]>(initialResults);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const verifiedCount = useMemo(
    () => results.filter((r) => r.status === "verified").length,
    [results]
  );
  const needsReviewCount = useMemo(
    () => results.filter((r) => r.status === "needs_review").length,
    [results]
  );

  const deleteTarget = results.find((r) => r.id === deleteTargetId) ?? null;

  function handleValueChange(id: string, value: string) {
    setResults((prev) =>
      prev.map((r) => (r.id === id ? { ...r, value } : r))
    );
  }

  function handleEditToggle(id: string) {
    // Only rows that "Need Review" can ever be edited.
    setEditingId((current) => (current === id ? null : id));
  }

  function handleDeleteConfirm() {
    if (!deleteTargetId) return;
    setResults((prev) => prev.filter((r) => r.id !== deleteTargetId));
    setDeleteTargetId(null);
  }

  function handleRescan() {
    // Placeholder: hook this up to your re-scan flow.
    console.log("Re-scan requested for:", deleteTarget?.testName);
    setDeleteTargetId(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50">
              <FileText className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Review Extracted Results
              </h1>
              <p className="mt-0.5 text-sm text-gray-500">
                Review and confirm the values extracted from your report.
              </p>
            </div>
          </div>

          <div className="flex flex-shrink-0 gap-2">
            <span className="flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              {verifiedCount} Verified
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700">
              <AlertTriangle className="h-4 w-4" />
              {needsReviewCount} Need Review
            </span>
          </div>
        </div>

        {/* Info banner */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Review your results
            </p>
            <p className="text-sm text-gray-600">
              Please review each value below. You can edit any incorrect
              values before saving.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3">Test Name</th>
                <th className="px-5 py-3">Your Value</th>
                <th className="px-5 py-3">Unit</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => {
                const needsReview = row.status === "needs_review";
                const isEditing = editingId === row.id;
                // Verified rows are NEVER editable. Needs-review rows are
                // only editable once "Edit" has been clicked.
                const inputDisabled = !needsReview || !isEditing;

                return (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-100 last:border-b-0 ${
                      needsReview ? "bg-amber-50/60" : ""
                    }`}
                  >
                    <td className="px-5 py-4 text-sm text-gray-800">
                      {row.testName}
                    </td>
                    <td className="px-5 py-4">
                      <input
                        type="text"
                        value={row.value}
                        disabled={inputDisabled}
                        onChange={(e) =>
                          handleValueChange(row.id, e.target.value)
                        }
                        className={`w-32 rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${
                          inputDisabled
                            ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500"
                            : "border-teal-400 bg-white text-gray-900 ring-2 ring-teal-100 focus:border-teal-500"
                        }`}
                      />
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {row.unit}
                    </td>
                    <td className="px-5 py-4">
                      {needsReview ? (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Needs Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {needsReview ? (
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleEditToggle(row.id)}
                            className={`text-sm font-medium ${
                              isEditing
                                ? "flex items-center gap-1 text-teal-600 hover:text-teal-700"
                                : "text-blue-600 hover:text-blue-700"
                            }`}
                          >
                            {isEditing ? (
                              <>
                                <Save className="h-3.5 w-3.5" />
                                Done
                              </>
                            ) : (
                              "Edit"
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTargetId(row.id)}
                            className="rounded-md p-1.5 text-red-500 hover:bg-red-50"
                            aria-label={`Delete ${row.testName}`}
                          >
                            <Trash2Icon />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Showing {results.length} of {results.length} results
        </p>

        {/* Footer status */}
        {needsReviewCount === 0 ? (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">All good!</p>
              <p className="text-sm text-gray-600">
                {verifiedCount} results verified. You can save them to your
                health profile.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3.5">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Almost there
              </p>
              <p className="text-sm text-gray-600">
                {needsReviewCount} result{needsReviewCount > 1 ? "s" : ""}{" "}
                still need{needsReviewCount === 1 ? "s" : ""} your review
                before saving.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={needsReviewCount > 0}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Save Approved Results ({verifiedCount})
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          You can edit values marked as &apos;Needs Review&apos; before
          saving.
        </p>
      </div>

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        isOpen={deleteTargetId !== null}
        testName={deleteTarget?.testName ?? ""}
        onDelete={handleDeleteConfirm}
        onRescan={handleRescan}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

// Small inline icon to avoid an extra top-level import collision with the
// modal's own Trash2 import when both files are bundled together.
function Trash2Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}