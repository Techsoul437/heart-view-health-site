"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

const STATUS_OPTIONS = ["All", "Pending", "Active", "Inactive", "Rejected"];

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: SearchFilterProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search by Lab Name / Branch / Email */}
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by lab, branch or email"
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-black placeholder:text-[#64748B] focus:border-[#2f5ba5] focus:outline-none sm:w-64"
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-black focus:border-[#2f5ba5] focus:outline-none"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
        />
      </div>
    </div>
  );
};

export default SearchFilter;