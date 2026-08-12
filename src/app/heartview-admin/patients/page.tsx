"use client";

import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllUsers, Patient } from "@/redux/Api";

export default function PatientsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users: patients, loading, error } = useSelector((state: RootState) => state.getAllUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

  const totalPages = Math.max(1, Math.ceil((patients?.length || 0) / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = patients?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const getPageNumbers = () => {
      const pages: (number | "...")[] = [];
      for (let i = 1; i <= totalPages; i++) {
          if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
              pages.push(i);
          } else if (pages[pages.length - 1] !== "...") {
              pages.push("...");
          }
      }
      return pages;
  };

  return (
    <div className="min-h-screen bg-white p-5 text-black md:p-12">
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
            Patient Management
          </h1>
          <p className="mt-2 text-[#64748B] leading-relaxed font-light">
            Global view of all patients across labs.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 text-left font-medium text-black">Name</th>
                <th className="px-5 py-3 text-left font-medium text-black">Email</th>
                <th className="px-5 py-3 text-left font-medium text-black">Phone</th>
                <th className="px-5 py-3 text-left font-medium text-black">Gender</th>
                <th className="px-5 py-3 text-left font-medium text-black">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="py-14 text-center text-[#64748B]">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan={5} className="py-14 text-center text-red-500">Error loading patients</td></tr>
              ) : currentPatients.length > 0 ? (
                currentPatients.map((patient: Patient, index: number) => (
                  <tr key={patient._id || index} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-5 py-4 text-sm text-black">{patient.name || "N/A"}</td>
                    <td className="px-5 py-4 text-sm text-[#64748B]">{patient.email || "N/A"}</td>
                    <td className="px-5 py-4 text-sm text-[#64748B]">{patient.phone || "N/A"}</td>
                    <td className="px-5 py-4 text-sm text-[#64748B]">{patient.sex || "N/A"}</td>
                    <td className="px-5 py-4 text-sm text-[#64748B] capitalize">{patient.role || "patient"}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="py-14 text-center text-[#64748B]">No patients found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && !error && patients && patients.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 px-5 py-4">
            <p className="text-sm leading-relaxed font-light text-[#64748B]">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, patients.length)} of {patients.length} entries
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <FiChevronLeft />
                </button>

                {getPageNumbers().map((p, i) =>
                    p === "..." ? (
                        <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center text-[#64748B]">
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => setCurrentPage(p as number)}
                            className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 font-medium transition-colors ${currentPage === p
                                ? "bg-[#2f5ba5] text-white"
                                : "border border-black/10 bg-white text-[#64748B] hover:bg-gray-50"
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <FiChevronRight />
                </button>
              </div>

              <select
                  value={itemsPerPage}
                  onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                  }}
                  className="h-8 px-2 rounded-lg border border-black/10 bg-white text-[#64748B] outline-none cursor-pointer hover:bg-gray-50 text-sm"
              >
                  {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                          {n} / page
                      </option>
                  ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
