"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { RootState, AppDispatch } from "@/redux/store";
import { getAllLabs, getLabById } from "@/redux/Api";
import {
  clearSelectedLab,
} from "@/redux/Slice/Getlabbyidslice";

import StatsCards from "./Statscards";
import SearchFilter from "./Searchfilter";
import LabTable from "./LabTable";
import SkeletonLoader from "./Skeletonloader";
import ViewLabModal from "./ViewLabModal";
import EditLabModal from "./EditLabModal";
import ApproveModal from "./Approvemodal";
import RejectModal from "./Rejectmodal";
import DeleteModal from "./Deletemodal";
import type { Lab } from "@/redux/Api";
const ITEMS_PER_PAGE = 10;

const LabOnboardingPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Matches GetAllLabsSlice.ts: { loading, labs, count, success, error }
  const { loading, labs } = useSelector((state: RootState) => state.getalllabs);

  // Matches the new GetLabByIdSlice.ts: { loading, lab, success, error }
  const { lab: selectedLab, loading: selectedLabLoading } = useSelector(
    (state: RootState) => state.getlabbyid
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editLab, setEditLab] = useState<Lab | null>(null);
  const [approveLabTarget, setApproveLabTarget] = useState<Lab | null>(null);
  const [rejectLabTarget, setRejectLabTarget] = useState<Lab | null>(null);
  const [deleteLabTarget, setDeleteLabTarget] = useState<Lab | null>(null);

  // Initial load
  useEffect(() => {
    dispatch(getAllLabs());
  }, [dispatch]);

  // Reset to first page whenever a filter changes.
  // Handled in the change handlers below (not in an effect) to avoid
  // the react-hooks/set-state-in-effect cascading-render warning.
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return labs.filter((lab: Lab) => {
      const matchesStatus = statusFilter === "All" || lab.status === statusFilter;
      const matchesSearch =
        !term ||
        lab.labName?.toLowerCase().includes(term) ||
        lab.branchName?.toLowerCase().includes(term) ||
        lab.email?.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [labs, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => Array.from({ length: totalPages }, (_, i) => i + 1);

  // View button -> dispatch(getLabById(id)) per Redux flow spec
  const handleView = (lab: Lab) => {
    dispatch(getLabById(lab._id));
    setIsViewOpen(true);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
    dispatch(clearSelectedLab());
  };

  return (
    <div className="min-h-screen bg-white p-5 text-black md:p-12">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
              Lab Onboarding
            </h1>
            <p className="mt-2 text-[#64748B] leading-relaxed font-light">
              Manage registered laboratories and onboarding process.
            </p>
          </div>

          {/* <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
          /> */}
        </div>

        {/* Statistics Cards */}
        {/* <div className="mt-8">
          <StatsCards labs={labs} />
        </div> */}

        {/* Content Area */}
        <div className="flex-1 overflow-auto pt-8">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="font-medium text-black">No Labs Found</p>
                  <p className="mt-1 text-[#64748B] font-light">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                <LabTable
                  labs={paginated}
                  onView={handleView}
                  onEdit={setEditLab}
                  onApprove={setApproveLabTarget}
                  onReject={setRejectLabTarget}
                  onDelete={setDeleteLabTarget}
                />
              )}

              {/* Pagination */}
              {filtered.length > 0 && (
                <div className="flex flex-col gap-4 border-t border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
                  <p className="text-sm font-normal text-[#64748B]">
                    Showing{" "}
                    {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}{" "}
                    to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{" "}
                    {filtered.length} labs
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="rounded-lg border border-slate-200 p-2 disabled:opacity-40 hover:bg-slate-50"
                    >
                      <FiChevronLeft />
                    </button>

                    {getPageNumbers().map((p) => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                          currentPage === p
                            ? "bg-[#2f5ba5] text-white"
                            : "border border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="rounded-lg border border-slate-200 p-2 disabled:opacity-40 hover:bg-slate-50"
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* View Modal */}
      {isViewOpen && (
        selectedLabLoading || !selectedLab ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={handleCloseView}
          >
            <div
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
              <div className="mt-4 h-3 w-full animate-pulse rounded bg-slate-100" />
              <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ) : (
          <ViewLabModal
            lab={selectedLab}
            onClose={handleCloseView}
            onApprove={() => {
              setApproveLabTarget(selectedLab);
              handleCloseView();
            }}
            onReject={() => {
              setRejectLabTarget(selectedLab);
              handleCloseView();
            }}
          />
        )
      )}

      {editLab && (
        <EditLabModal lab={editLab} onClose={() => setEditLab(null)} />
      )}

      {approveLabTarget && (
        <ApproveModal
          lab={approveLabTarget}
          onClose={() => setApproveLabTarget(null)}
        />
      )}

      {rejectLabTarget && (
        <RejectModal
          lab={rejectLabTarget}
          onClose={() => setRejectLabTarget(null)}
        />
      )}

      {deleteLabTarget && (
        <DeleteModal
          lab={deleteLabTarget}
          onClose={() => setDeleteLabTarget(null)}
        />
      )}
    </div>
  );
};

export default LabOnboardingPage;