"use client";

import FillButton from "@/Ui/buttons/FillButton";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiActivity,
    FiMapPin,
    FiFileText,
} from "react-icons/fi";
import { FiUsers, FiUser } from "react-icons/fi";

interface LabItem {
    id: number;
    labName: string;
    branchName: string;
    branches: number;
    location: string;
    contactPerson: string;
    mobile: string;
    reports: number;
    createdAt?: string;
}

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllLabs, Lab } from "@/redux/Api";

export default function LabPage() {
    const dispatch = useDispatch<AppDispatch>();
    
    // Select from redux
    const { labs: labsData, loading } = useSelector((state: RootState) => state.getalllabs);
    
    // Local state for search/sort
    const [search, setSearch] = useState("");
    const [branchFilter, setBranchFilter] = useState("All");
    const [sortBy, setSortBy] = useState("name-az");
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        dispatch(getAllLabs());
    }, [dispatch]);

    // Format the labs array
    const labs: LabItem[] = useMemo(() => {
        if (!labsData) return [];
        return labsData.map((lab: Lab) => ({
            id: lab._id as unknown as number, // Cast to unknown then number to satisfy interface, though string would be better if we changed LabItem
            labName: lab.labName,
            branchName: lab.branchName || "",
            branches: 1, // Defaulting as branch count isn't in Lab model
            location: lab.city || "",
            contactPerson: lab.fullName || "",
            mobile: lab.mobile || "",
            reports: 0,
            createdAt: lab.createdAt
        }));
    }, [labsData]);

    const handleDelete = async (id: number | string) => {
        // Mock delete for now, in real scenario call delete API
        toast("Delete feature not implemented on backend yet", { icon: "ℹ️" });
    };

    const itemsPerPage = 10;

    // STATS - dynamic from labs list
    const totalLabs = labs.length;

    const totalBranches = labs.filter(
        (lab) => lab.branchName && lab.branchName.trim() !== ""
    ).length;


    const filteredLabs = useMemo(() => {
        let list = labs.filter(
            (lab) =>
                lab.labName.toLowerCase().includes(search.toLowerCase()) ||
                lab.branchName.toLowerCase().includes(search.toLowerCase()) ||
                lab.location.toLowerCase().includes(search.toLowerCase()) ||
                lab.mobile.includes(search)
        );

        if (branchFilter !== "All") {
            list = list.filter(
                (lab) => String(lab.branches) === branchFilter
            );
        }

        list = [...list].sort((a, b) => {
            if (sortBy === "name-az")
                return a.labName.localeCompare(b.labName);

            if (sortBy === "name-za")
                return b.labName.localeCompare(a.labName);



            return 0;
        });

        return list;
    }, [labs, search, branchFilter, sortBy]);

    const totalPages = Math.ceil(filteredLabs.length / itemsPerPage);
    const indexOfLastlab = currentPage * itemsPerPage;
    const indexOfFirstlab = indexOfLastlab - itemsPerPage;
    const currentlabs = filteredLabs.slice(
        indexOfFirstlab,
        indexOfLastlab
    );

    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

    const avatarColors = [
        "bg-blue-100 text-blue-600",
        "bg-green-100 text-green-600",
        "bg-yellow-100 text-yellow-600",
        "bg-pink-100 text-pink-600",
        "bg-purple-100 text-purple-600",
    ];

    const getAvatarColor = (index: number) =>
        avatarColors[index % avatarColors.length];


    return (
        <div className="min-h-screen bg-white p-5 text-black md:p-12">
            {/* HEADER */}

            <div className="flex flex-col gap-5  md:flex-row md:items-start md:justify-between ">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl   font-normal tracking-tight text-black">
                        Labs
                    </h1>

                    <p className="mt-2 text-[#64748B]    leading-relaxed  font-light">
                        Manage and Monitor all registered laboratories
                    </p>
                </div>


                <FillButton text="Add Labs" href="/heartview-admin/labs/add-lab" ></FillButton>

            </div>
            {/* STATS CARDS */}
            <div className="mb-6 mt-5 grid grid-cols gap-4 md:grid-cols-2 xl:grid-cols-3">
                {/* Total */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                        <FiActivity className="text-xl text-blue-500" />
                    </div>
                    <div>
                        <p className="  text-[#64748B]">
                            Total Labs</p>
                        <p className="text-2xl font-semibold text-black">{totalLabs}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                        <FiMapPin className="text-xl text-green-500" />
                    </div>
                    <div>
                        <p className="   text-[#64748B]">
                            Total Branches</p>
                        <p className="text-2xl font-semibold text-black">{totalBranches}</p>
                    </div>
                </div>




            </div>

            {/* CONTROLS */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
                {/* Search */}
                {/* <div className="relative w-full max-w-sm">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4  text-black outline-none  focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
                    />
                </div> */}


                {/* Sort */}
                <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">Sort By</span>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 rounded-lg border border-slate-200 text-sm bg-white px-3"
                    >
                        <option value="name-az">Lab Name (A-Z)</option>
                        <option value="name-za">Lab Name (Z-A)</option>

                    </select>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Lab Name
                                </th>

                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Contact Person
                                </th>
                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Mobile
                                </th>

                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Added On
                                </th>
                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentlabs.length > 0 ? (
                                currentlabs.map((lab, index) => (
                                    <tr
                                        key={lab.id}
                                        className="border-b border-slate-50 transition hover:bg-slate-50"
                                    >
                                        <td className="px-5 text-sm py-4">
                                            <div className="flex items-center gap-3">
                                             
                                                <span className=" text-black">
                                                    {lab.labName}
                                                </span>
                                            </div>
                                        </td>
                                     

                                        <td className="px-5 py-4 text-sm  text-[#64748B]">
                                            {lab.contactPerson}
                                        </td>
                                        <td className="px-5 py-4 text-sm  text-[#64748B]">
                                            {lab.mobile}
                                        </td>

                                        <td className="px-5 py-4 text-sm  text-[#64748B]">
                                            {lab.createdAt ? (
                                                <>
                                                    <div>
                                                        {new Date(lab.createdAt).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </div>
                                                    <div>
                                                        {new Date(lab.createdAt).toLocaleTimeString(
                                                            "en-US",
                                                            { hour: "2-digit", minute: "2-digit" }
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/heartview-admin/labs/edit-lab/${lab.id}`}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-blue-500 transition hover:bg-blue-50"
                                                >
                                                    <FiEdit2 className="" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(lab.id)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-red-400 transition hover:bg-red-50"
                                                >
                                                    <FiTrash2 className="" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="py-14 text-center  text-[#64748B]"
                                    >
                                        No labs found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* FOOTER */}
                {filteredLabs.length > 0 && (
                    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                        <p className="text-sm leading-relaxed  font-light  text-[#64748B]">

                            Showing {indexOfFirstlab + 1} to{" "}
                            {Math.min(indexOfLastlab, filteredLabs.length)} of{" "}
                            {filteredLabs.length} labs
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                            >
                                <FiChevronLeft />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg  font-semibold transition ${currentPage === i + 1
                                        ? "bg-[#2f5ba5] text-white"
                                        : "border border-slate-200 text-[#64748B] hover:bg-slate-50"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}