"use client";

import FillButton from "@/Ui/buttons/FillButton";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import { FiUsers, FiUser } from "react-icons/fi";

interface PatientItem {
    id: number;
    name: string;
    mobile: string;
    age: string;
    gender: string;
    patientId: string;
    createdAt?: string;
}

export default function PatientsPage() {
    const [patients, setPatients] = useState<PatientItem[]>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("lab-staff-patients") || "[]");
        }
        return [];
    });

    const [search, setSearch] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const [sortBy, setSortBy] = useState("name-az");
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = (id: number) => {
        const updatedPatients = patients.filter((p) => p.id !== id);
        setPatients(updatedPatients);
        localStorage.setItem("lab-staff-patients", JSON.stringify(updatedPatients));
    };

    const itemsPerPage = 10;

    // STATS - dynamic from patients list
    const totalPatients = patients.length;
    const maleCount = patients.filter(
        (p) => p.gender?.toLowerCase() === "male"
    ).length;
    const femaleCount = patients.filter(
        (p) => p.gender?.toLowerCase() === "female"
    ).length;
    const otherCount = patients.filter(
        (p) =>
            p.gender?.toLowerCase() !== "male" &&
            p.gender?.toLowerCase() !== "female"
    ).length;

    const pct = (n: number) =>
        totalPatients === 0
            ? "0%"
            : `${((n / totalPatients) * 100).toFixed(1)}% of total`;

    const filteredPatients = useMemo(() => {
        let list = patients.filter(
            (p) =>
                (p.name.toLowerCase().includes(search.toLowerCase()) ||
                    p.mobile.includes(search) ||
                    p.patientId.toLowerCase().includes(search.toLowerCase())) &&
                (genderFilter === "All" ||
                    p.gender?.toLowerCase() === genderFilter.toLowerCase())
        );

        list = [...list].sort((a, b) => {
            if (sortBy === "name-az") return a.name.localeCompare(b.name);
            if (sortBy === "name-za") return b.name.localeCompare(a.name);
            if (sortBy === "age-asc") return parseInt(a.age) - parseInt(b.age);
            if (sortBy === "age-desc") return parseInt(b.age) - parseInt(a.age);
            return 0;
        });

        return list;
    }, [patients, search, genderFilter, sortBy]);

    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
    const indexOfLastPatient = currentPage * itemsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
    const currentPatients = filteredPatients.slice(
        indexOfFirstPatient,
        indexOfLastPatient
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

    const GenderBadge = ({ gender }: { gender: string }) => {
        const g = gender?.toLowerCase();
        if (g === "male")
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1  font-semibold text-blue-600">
                    ♂ Male
                </span>
            );
        if (g === "female")
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1  font-semibold text-pink-600">
                    ♀ Female
                </span>
            );
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1  font-semibold text-purple-600">
                ⚥ Other
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-white p-5 text-black md:p-12">
            {/* HEADER */}

            <div className="flex flex-col gap-5 lg:border-b border-black/8  md:flex-row md:items-start md:justify-between ">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        Patients
                    </h1>

                    <p className="mt-2 text-[#64748B]">
                        View and manage patients
                    </p>
                </div>


                <FillButton text="Add Patient" href="/lab-staff/patients/add-patient" ></FillButton>

            </div>
            {/* STATS CARDS */}
            <div className="mb-6 mt-5 grid grid-cols gap-4 md:grid-cols-2 xl:grid-cols-4">
                {/* Total */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                        <FiUsers className="text-xl text-blue-500" />
                    </div>
                    <div>
                        <p className=" text-[#64748B]">Total Patients</p>
                        <p className="text-2xl font-semibold text-black">{totalPatients}</p>
                        <p className=" text-[#64748B]">All registered patients</p>
                    </div>
                </div>

                {/* Male */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                        <FiUser className="text-xl text-green-500" />
                    </div>
                    <div>
                        <p className=" text-[#64748B]">Male</p>
                        <p className="text-2xl font-semibold text-black">{maleCount}</p>
                        <p className=" text-[#64748B]">{pct(maleCount)}</p>
                    </div>
                </div>

                {/* Female */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
                        <span className="text-lg text-pink-500">♀</span>
                    </div>
                    <div>
                        <p className=" text-[#64748B]">Female</p>
                        <p className="text-2xl font-semibold text-black">{femaleCount}</p>
                        <p className=" text-[#64748B]">{pct(femaleCount)}</p>
                    </div>
                </div>

                {/* Other */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                        <FiUsers className="text-xl text-purple-500" />
                    </div>
                    <div>
                        <p className=" text-[#64748B]">Other</p>
                        <p className="text-2xl font-semibold text-black">{otherCount}</p>
                        <p className=" text-[#64748B]">{pct(otherCount)}</p>
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
                        placeholder="Search by name or mobile number..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4  text-black outline-none placeholder:text-[#64748B] focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
                    />
                </div> */}

                {/* Gender Filter */}
                <div className="flex items-center gap-2">
                    <span className=" text-[#64748B]">Filter by Gender</span>
                    <select
                        value={genderFilter}
                        onChange={(e) => {
                            setGenderFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-10 rounded-lg border border-slate-200 bg-white px-3  text-black outline-none focus:border-blue-300"
                    >
                        <option value="All">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                    <span className=" text-[#64748B]">Sort by</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 rounded-lg border border-slate-200 bg-white px-3  text-black outline-none focus:border-blue-300"
                    >
                        <option value="name-az">Name (A-Z)</option>
                        <option value="name-za">Name (Z-A)</option>
                        <option value="age-asc">Age (Low-High)</option>
                        <option value="age-desc">Age (High-Low)</option>
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
                                    #
                                </th>
                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Name
                                </th>
                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Mobile
                                </th>
                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Age
                                </th>
                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Gender
                                </th>
                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Registered On
                                </th>
                                <th className="px-5 py-3 text-left  font-medium text-black">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPatients.length > 0 ? (
                                currentPatients.map((patient, index) => (
                                    <tr
                                        key={patient.id}
                                        className="border-b border-slate-50 transition hover:bg-slate-50"
                                    >
                                        <td className="px-5 py-4  text-[#64748B]">
                                            {indexOfFirstPatient + index + 1}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full  font-semibold ${getAvatarColor(index)}`}
                                                >
                                                    {getInitials(patient.name)}
                                                </div>
                                                <span className=" text-black">
                                                    {patient.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4  text-[#64748B]">
                                            {patient.mobile}
                                        </td>
                                        <td className="px-5 py-4  text-[#64748B]">
                                            {patient.age}
                                        </td>
                                        <td className="px-5 py-4">
                                            <GenderBadge gender={patient.gender} />
                                        </td>
                                        <td className="px-5 py-4  text-[#64748B]">
                                            {patient.createdAt ? (
                                                <>
                                                    <div>
                                                        {new Date(patient.createdAt).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </div>
                                                    <div>
                                                        {new Date(patient.createdAt).toLocaleTimeString(
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
                                                    href={`/lab-staff/patients/add-patient/${patient.id}`}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-blue-500 transition hover:bg-blue-50"
                                                >
                                                    <FiEdit2 className="" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(patient.id)}
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
                                        colSpan={7}
                                        className="py-14 text-center  text-[#64748B]"
                                    >
                                        No patients found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* FOOTER */}
                {filteredPatients.length > 0 && (
                    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                        <p className=" text-[#64748B]">
                            Showing {indexOfFirstPatient + 1} to{" "}
                            {Math.min(indexOfLastPatient, filteredPatients.length)} of{" "}
                            {filteredPatients.length} patients
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