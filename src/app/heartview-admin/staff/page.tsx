"use client";

import { useEffect, useState } from "react";
import FillButton from "@/Ui/buttons/FillButton";

import {
    Users,
    Building2,
    BriefcaseBusiness,
    Search,
    Filter,
    Pencil,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { getAllStaff, deleteStaff } from "@/redux/Api";
import { resetDeleteStaff } from "@/redux/Slice/DeleteStaffSlice";
import ConfirmModal from "@/Ui/ConfirmModal";

export interface Staff {
    _id?: string;
    empId?: string;
    fullName: string;
    phone: string;
    email: string;
    designation: string;
    department: string;
    branch: string;
    address?: string;
    status: "Active" | "Inactive";
    joiningDate?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function StaffManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [branchFilter, setBranchFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { staff, loading } = useSelector(
        (state: RootState) => state.getStaff
    );

    // ✅ Delete state
    const { deletingId, error: deleteError } = useSelector(
        (state: RootState) => state.deleteStaff
    );

    useEffect(() => {
        dispatch(getAllStaff());
    }, [dispatch]);

    // ✅ Cleanup delete state on unmount
    useEffect(() => {
        return () => {
            dispatch(resetDeleteStaff());
        };
    }, [dispatch]);

    const departments = [...new Set(staff.map((item: Staff) => item.department))];
    const branches = [...new Set(staff.map((item: Staff) => item.branch))];

    const filteredData = staff.filter((item: Staff) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            item.empId?.toLowerCase().includes(search) ||
            item.fullName?.toLowerCase().includes(search) ||
            item.phone?.toLowerCase().includes(search) ||
            item.email?.toLowerCase().includes(search) ||
            item.designation?.toLowerCase().includes(search) ||
            item.department?.toLowerCase().includes(search) ||
            item.branch?.toLowerCase().includes(search);

        const matchesDepartment = !departmentFilter || item.department === departmentFilter;
        const matchesBranch = !branchFilter || item.branch === branchFilter;
        const matchesStatus = !statusFilter || item.status === statusFilter;

        return matchesSearch && matchesDepartment && matchesBranch && matchesStatus;
    });

    const handleDelete = async () => {
        if (!selectedId) return;

        try {
            await dispatch(deleteStaff(selectedId)).unwrap();

            dispatch(getAllStaff());

            setOpenDeleteModal(false);
            setSelectedId(null);
        } catch (error) {
            console.error("Failed to delete staff:", error);
        }
    };
    const totalStaff = filteredData.length;

    const activeStaff = filteredData.filter(
        (item: Staff) => item.status === "Active"
    ).length;

    const totalDepartments = new Set(
        filteredData.map((item: Staff) => item.department)
    ).size;

    const totalBranches = new Set(
        filteredData.map((item: Staff) => item.branch)
    ).size;

    return (
        <div className="min-h-screen bg-white p-5 md:p-12">
            <div className="space-y-6">
                <ConfirmModal
                    isOpen={openDeleteModal}
                    title="Delete Staff"
                    message="Are you sure you want to delete this staff member? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                    loading={!!deletingId}
                    onConfirm={handleDelete}
                    onCancel={() => {
                        setOpenDeleteModal(false);
                        setSelectedId(null);
                    }}
                />
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                            Staff Management
                        </h1>
                        <p className="mt-2 text-[#64748B] leading-relaxed font-light">
                            View and manage all staff members
                        </p>
                    </div>

                    <FillButton text="Add Staff" href="/lab-admin/staff/add-staff" />
                </div>

                {/* ✅ Delete error */}
                {deleteError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                        {deleteError}
                    </div>
                )}

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-3">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-slate-500">Total Staff</p>
                                <h3 className="text-2xl font-bold text-slate-900">{totalStaff}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-3">
                                <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-slate-500">Active Staff</p>
                                <h3 className="text-2xl font-bold text-slate-900">{activeStaff}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-purple-100 p-3">
                                <BriefcaseBusiness className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-slate-500">Departments</p>
                                <h3 className="text-2xl font-bold text-slate-900">{totalDepartments}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-orange-100 p-3">
                                <Building2 className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-slate-500">Branches</p>
                                <h3 className="text-2xl font-bold text-slate-900">{totalBranches}</h3>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Filters */}
                <div className="border-b border-slate-200 p-4">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 text-sm h-4 w-4 -translate-y-1/2 text-[#64748B]" />
                            <input
                                type="text"
                                placeholder="Search staff..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border text-sm border-slate-200 bg-white py-2 pl-10 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>

                        <select
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                            className="rounded-lg border text-sm border-slate-200 bg-white px-3 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="">All Departments</option>
                            {departments.map((department) => (
                                <option key={department} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>

                        <select
                            value={branchFilter}
                            onChange={(e) => setBranchFilter(e.target.value)}
                            className="rounded-lg border text-sm border-slate-200 bg-white px-3 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="">All Branches</option>
                            {branches.map((branch) => (
                                <option key={branch} value={branch}>
                                    {branch}
                                </option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-lg border text-sm border-slate-200 bg-white px-3 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setDepartmentFilter("");
                                setBranchFilter("");
                                setStatusFilter("");
                            }}
                            className="flex items-center justify-center gap-2 text-sm rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-600"
                        >
                            <Filter className="h-4 w-4" />
                            Reset
                        </button>

                    </div>
                </div>

                {/* Table Card */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="px-4 py-3 text-left font-medium text-black">#</th>
                                    <th className="px-4 py-3 text-left font-medium text-black">Employee ID</th>
                                    <th className="px-4 py-3 text-left font-medium text-black">Full Name</th>
                                    <th className="px-4 py-3 text-left font-medium text-black">Phone</th>
                                    <th className="px-4 py-3 text-left font-medium text-black">Email</th>
                                    <th className="px-4 py-3 text-left font-medium text-black">Designation</th>
                                    <th className="px-4 py-3 text-left font-medium text-black">Department</th>
                                    <th className="px-4 py-3 text-left font-medium text-black">Branch</th>
                                    <th className="px-4 py-3 text-left font-medium text-black">Status</th>
                                    <th className="px-4 py-3 text-left font-medium text-black">Joining Date</th>
                                    <th className="px-4 py-3 text-center font-medium text-black">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={11} className="py-10 text-center text-slate-500">
                                            Loading staff...
                                        </td>
                                    </tr>
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} className="py-10 text-center text-slate-500">
                                            No staff found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item: Staff, index: number) => {
                                        const isDeleting =
                                            deletingId === item._id ||
                                            (openDeleteModal && selectedId === item._id);

                                        return (
                                            <tr
                                                key={item._id ?? index}
                                                className="border-b border-slate-100 text-sm hover:bg-slate-50"
                                            >
                                                <td className="px-4 py-4 text-[#64748B] text-sm">{index + 1}</td>
                                                <td className="px-4 py-4 text-[#64748B] text-sm font-medium">{item.empId}</td>
                                                <td className="px-4 py-4 text-[#64748B] text-sm font-medium">{item.fullName}</td>
                                                <td className="px-4 text-[#64748B] text-sm py-4">{item.phone}</td>
                                                <td className="px-4 text-[#64748B] text-sm py-4">{item.email}</td>
                                                <td className="px-4 text-[#64748B] text-sm py-4">{item.designation}</td>
                                                <td className="px-4 text-[#64748B] text-sm py-4">{item.department}</td>
                                                <td className="px-4 text-[#64748B] text-sm py-4">{item.branch}</td>
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-sm font-medium ${item.status === "Active"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 text-[#64748B] py-4">{item.joiningDate}</td>
                                                <td className="px-4 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                router.push(`/lab-admin/staff/add-staff/${item._id}`)
                                                            }
                                                            disabled={isDeleting}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-blue-500 transition hover:bg-blue-50 disabled:opacity-50"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (!item._id) return;

                                                                setSelectedId(item._id);
                                                                setOpenDeleteModal(true);
                                                            }}
                                                            disabled={isDeleting}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-red-400 transition hover:bg-red-50 disabled:opacity-50"
                                                        >
                                                            {isDeleting ? (
                                                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                                                            ) : (
                                                                <Trash2 className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-slate-200 p-4">
                        <p className="text-sm font-light text-[#64748B]">
                            Showing {filteredData.length} of {staff.length} Staff members
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}