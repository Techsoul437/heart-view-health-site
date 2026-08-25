"use client";

import FillButton from "@/Ui/buttons/FillButton";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiUsers,
    FiUser,
} from "react-icons/fi";
import { getAllUsers, deleteUser, type Patient } from "@/redux/Api";
import type { RootState, AppDispatch } from "@/redux/store";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import ConfirmModal from "@/Ui/ConfirmModal";
// Prefer `_id` as the unique key
const getPatientKey = (p: Patient) => p._id as string;

// Role can come back as `role` or `Role` depending on the endpoint
const getPatientRole = (p: Patient): string => {
    const anyP = p as unknown as { role?: string; Role?: string };
    return anyP.role ?? anyP.Role ?? "";
};

// API doesn't send "age" directly — compute it from DOB
const getAge = (dob?: string | null): number | null => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export default function PatientsPage() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        patientData: patients,
        patientLoading,
        patientError,
    } = useSelector((state: RootState) => state.getPatients);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const [search, setSearch] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const [roleFilter, setRoleFilter] = useState("All");
    const [sortBy, setSortBy] = useState("name-az");
    const [currentPage, setCurrentPage] = useState(1);
const [openDeleteModal, setOpenDeleteModal] = useState(false);
const [selectedId, setSelectedId] = useState<string | null>(null);
    // Patients removed from the UI after a successful delete API call
const [deletedIds, setDeletedIds] = useState<(number | string)[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const pathname = usePathname();
    const role = pathname.split("/")[1]; // lab-admin / staff

    // Dynamic Permission Checks
    const [perms, setPerms] = useState<Record<string, Record<string, boolean>> | null>(null);
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const { API } = await import("@/redux/Api");
                const response = await API.get("/rbac");
                if (response.data?.success && response.data.data) {
                    const data = response.data.data;
                    const userRole = role === "lab-staff" ? "staff" : "admin";
                    if (data.permState?.[userRole]) {
                        setPerms(data.permState[userRole]);
                    }
                }
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        };
        fetchPermissions();
    }, [role]);

    const hasPerm = (module: string, perm: string) => {
        if (!perms) return true; // Show by default until loaded
        return perms[module]?.[perm] === true;
    };
    const canCreatePatient = hasPerm("patients", "create_patient");
    const canEditPatient = hasPerm("patients", "edit_patient");
    const canDeletePatient = hasPerm("patients", "delete_patient");

    const handleDelete = async () => {
    if (!selectedId) return;

    try {
        setDeletingId(selectedId);
        setDeleteError(null);

        const result = await dispatch(deleteUser(selectedId));

        if (deleteUser.fulfilled.match(result)) {
            toast.success(result.payload.message);

            setDeletedIds((prev) => [...prev, selectedId]);

            dispatch(getAllUsers());

            setOpenDeleteModal(false);
            setSelectedId(null);
        } else {
            throw result.payload;
        }
    } catch (err) {
        const message =
            typeof err === "string"
                ? err
                : "Failed to delete user";

        setDeleteError(message);
        toast.error(message);
    } finally {
        setDeletingId(null);
    }
};

    const itemsPerPage = 10;

    const visiblePatients: Patient[] = useMemo(
        () =>
            (patients ?? []).filter(
                (p: Patient) => !deletedIds.includes(getPatientKey(p))
            ),
        [patients, deletedIds]
    );

    // STATS - dynamic from patients list (API field is "sex", not "gender")
    const totalPatients = visiblePatients.length;
    const maleCount = visiblePatients.filter(
        (p) => p.sex?.toLowerCase() === "male"
    ).length;
    const femaleCount = visiblePatients.filter(
        (p) => p.sex?.toLowerCase() === "female"
    ).length;
    const otherCount = visiblePatients.filter(
        (p) =>
            p.sex?.toLowerCase() !== "male" &&
            p.sex?.toLowerCase() !== "female"
    ).length;

    const pct = (n: number) =>
        totalPatients === 0
            ? "0%"
            : `${((n / totalPatients) * 100).toFixed(1)}% of total`;

    // UNIQUE ROLES present in the data — drives the role filter dropdown
    const roleOptions = useMemo(() => {
        const roles = visiblePatients
            .map((p) => getPatientRole(p))
            .filter((r): r is string => Boolean(r));
        return Array.from(new Set(roles));
    }, [visiblePatients]);

    const filteredPatients = useMemo(() => {
        const q = search.toLowerCase();

        let list = visiblePatients.filter((p) => {
            const nameMatch = (p.name ?? "").toLowerCase().includes(q);
            const phoneMatch = (p.phone ?? "").toString().toLowerCase().includes(q);
            const emailMatch = (p.email ?? "").toLowerCase().includes(q);

            const matchesSearch = q === "" || nameMatch || phoneMatch || emailMatch;
            const matchesGender =
                genderFilter === "All" ||
                p.sex?.toLowerCase() === genderFilter.toLowerCase();
            const matchesRole =
                roleFilter === "All" ||
                getPatientRole(p).toLowerCase() === roleFilter.toLowerCase();

            return matchesSearch && matchesGender && matchesRole;
        });

        list = [...list].sort((a, b) => {
            if (sortBy === "name-az")
                return (a.name ?? "").localeCompare(b.name ?? "");
            if (sortBy === "name-za")
                return (b.name ?? "").localeCompare(a.name ?? "");
            if (sortBy === "age-asc")
                return (getAge(a.DOB) ?? 0) - (getAge(b.DOB) ?? 0);
            if (sortBy === "age-desc")
                return (getAge(b.DOB) ?? 0) - (getAge(a.DOB) ?? 0);
            return 0;
        });

        return list;
    }, [visiblePatients, search, genderFilter, roleFilter, sortBy]);

    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
    const indexOfLastPatient = currentPage * itemsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
    const currentPatients = filteredPatients.slice(
        indexOfFirstPatient,
        indexOfLastPatient
    );

    const GenderBadge = ({ gender }: { gender?: string | null }) => {
        const g = gender?.toLowerCase();
        if (g === "male")
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600">
                    Male
                </span>
            );
        if (g === "female")
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 font-medium text-pink-600">
                    Female
                </span>
            );
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 font-medium text-purple-600">
                Other
            </span>
        );
    };

    const RoleBadge = ({ role }: { role: string }) => {
        if (!role)
            return <span className="text-[#64748B]">—</span>;
        return (
            <span className="inline-flex items-center gap-1 rounded-full  px-3 py-1 font-medium text-slate-700 capitalize">
                {role}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-white p-5 text-black md:p-12">
            {/* HEADER */}
            <ConfirmModal
    isOpen={openDeleteModal}
    title="Delete Patient"
    message="Are you sure you want to delete this patient? This action cannot be undone."
    confirmText="Delete"
    cancelText="Cancel"
    loading={!!deletingId}
    onConfirm={handleDelete}
    onCancel={() => {
        setOpenDeleteModal(false);
        setSelectedId(null);
    }}
/>
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        Patients
                    </h1>
                    <p className="mt-2 text-[#64748B] leading-relaxed font-light">
                        View and manage patients
                    </p>
                </div>

                {canCreatePatient && (
                    <FillButton
                        text="Add Patient"
                        href={`/${role}/patients/add-patient`}
                    />
                )}
            </div>

            {/* DELETE ERROR BANNER */}
            {deleteError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {deleteError}
                </div>
            )}

            {/* STATS CARDS */}
            <div className="mb-6 mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* Total */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                        <FiUsers className="text-xl text-blue-500" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">All patients</p>
                        <p className="text-2xl font-semibold text-black">{totalPatients}</p>
                        <p className="text-sm text-[#64748B]">Registered</p>
                    </div>
                </div>

                {/* Male */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                        <FiUser className="text-xl text-green-500" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">Male</p>
                        <p className="text-2xl font-semibold text-black">{maleCount}</p>
                        <p className="text-sm text-[#64748B]">{pct(maleCount)}</p>
                    </div>
                </div>

                {/* Female */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
                        <FiUser className="text-xl text-pink-500" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">Female</p>
                        <p className="text-2xl font-semibold text-black">{femaleCount}</p>
                        <p className="text-sm text-[#64748B]">{pct(femaleCount)}</p>
                    </div>
                </div>

                {/* Other */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                        <FiUsers className="text-xl text-purple-500" />
                    </div>
                    <div>
                        <p className="text-[#64748B]">Other</p>
                        <p className="text-2xl font-semibold text-black">{otherCount}</p>
                        <p className="text-sm text-[#64748B]">{pct(otherCount)}</p>
                    </div>
                </div>
            </div>

            {/* CONTROLS */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative w-full max-w-sm">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-black outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
                    />
                </div>

                {/* Gender Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">Filter by Gender</span>
                    <select
                        value={genderFilter}
                        onChange={(e) => {
                            setGenderFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-10 rounded-lg border text-sm border-slate-200 bg-white px-3 text-black outline-none focus:border-blue-300"
                    >
                        <option value="All">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Role Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">Filter by Role</span>
                    <select
                        value={roleFilter}
                        onChange={(e) => {
                            setRoleFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-10 rounded-lg border text-sm border-slate-200 bg-white px-3 text-black outline-none focus:border-blue-300 capitalize"
                    >
                        <option value="All">All</option>
                        {roleOptions.map((r) => (
                            <option key={r} value={r} className="capitalize">
                                {r}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">Sort by</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 rounded-lg border border-slate-200 text-sm bg-white px-3 text-black outline-none focus:border-blue-300"
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
                                <th className="px-5 py-3 text-left font-medium text-black">#</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Name</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Phone</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Age</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Gender</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Role</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Registered On</th>
                                <th className="px-5 py-3 text-left font-medium text-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientLoading ? (
                                <tr>
                                    <td colSpan={8} className="py-14 text-center text-[#64748B]">
                                        Loading patients...
                                    </td>
                                </tr>
                            ) : patientError ? (
                                <tr>
                                    <td colSpan={8} className="py-14 text-center text-red-500">
                                        {typeof patientError === "string"
                                            ? patientError
                                            : "Failed to load patients."}
                                    </td>
                                </tr>
                            ) : currentPatients.length > 0 ? (
                                currentPatients.map((patient, index) => {
                                    const key = getPatientKey(patient);
                                    const isDeleting = deletingId === key;
                                    const age = getAge(patient.DOB);
                                    return (
                                        <tr
                                            key={key}
                                            className="border-b border-slate-50 transition hover:bg-slate-50"
                                        >
                                            <td className="px-5 py-4 text-[#64748B]">
                                                {indexOfFirstPatient + index + 1}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-black">
                                                        {patient.name || "—"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-[#64748B]">
                                                {patient.phone || "—"}
                                            </td>
                                            <td className="px-5 py-4 text-sm text-[#64748B]">
                                                {age ?? "—"}
                                            </td>
                                            <td className="px-5 text-sm py-4">
                                                <GenderBadge gender={patient.sex} />
                                            </td>
                                            <td className="px-5 text-sm py-4">
                                                <RoleBadge role={getPatientRole(patient)} />
                                            </td>
                                            <td className="px-5 py-4 text-sm text-[#64748B]">
                                                {patient.createdAt ? (
                                                    <>
                                                        <div>
                                                            {new Date(patient.createdAt).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </div>
                                                        <div>
                                                            {new Date(patient.createdAt).toLocaleTimeString("en-US", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </div>
                                                    </>
                                                ) : (
                                                    "—"
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    {canEditPatient && (
                                                        <Link
                                                            href={`/${role}/patients/add-patient/${key}`}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-blue-500 transition hover:bg-blue-50"
                                                        >
                                                            <FiEdit2 />
                                                        </Link>
                                                    )}
                                                    {canDeletePatient && (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedId(String(key));
                                                                setOpenDeleteModal(true);
                                                            }}
                                                            disabled={isDeleting}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-red-400 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-14 text-center text-[#64748B]">
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
                        <p className="text-sm font-light text-[#64748B]">
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
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg font-semibold transition ${currentPage === i + 1
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