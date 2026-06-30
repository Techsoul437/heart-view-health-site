"use client";

import { useEffect, useState } from "react";
import FillButton from "@/Ui/buttons/FillButton";

import {
    Users,
    Building2,
    BriefcaseBusiness,
    Search,
    Filter,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Staff {
    id: number;
    empId: string;
    fullName?: string;
    name?: string;
    phone: string;
    email: string;
    designation: string;
    department: string;
    branch: string;
    status: string;
    joiningDate: string;
}

export default function StaffManagementPage() {
    const [staffData, setStaffData] = useState<Staff[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [branchFilter, setBranchFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    useEffect(() => {
        const storedStaff = JSON.parse(
            localStorage.getItem("staffData") || "[]"
        );

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStaffData(storedStaff);
    }, []);

    const departments = [
        ...new Set(staffData.map((item) => item.department)),
    ];

    const branches = [
        ...new Set(staffData.map((item) => item.branch)),
    ];

    const filteredData = staffData.filter((staff) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            staff.empId?.toLowerCase().includes(search) ||
            (staff.fullName || staff.name || "")
                .toLowerCase()
                .includes(search) ||
            staff.phone?.toLowerCase().includes(search) ||
            staff.email?.toLowerCase().includes(search) ||
            staff.designation?.toLowerCase().includes(search) ||
            staff.department?.toLowerCase().includes(search) ||
            staff.branch?.toLowerCase().includes(search);

        const matchesDepartment =
            !departmentFilter ||
            staff.department === departmentFilter;

        const matchesBranch =
            !branchFilter ||
            staff.branch === branchFilter;

        const matchesStatus =
            !statusFilter ||
            staff.status === statusFilter;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesBranch &&
            matchesStatus
        );
    });

    const handleDelete = (id: number) => {
        const updatedData = staffData.filter(
            (item) => item.id !== id
        );

        setStaffData(updatedData);

        localStorage.setItem(
            "staffData",
            JSON.stringify(updatedData)
        );
    };

    const totalStaff = filteredData.length;

    const activeStaff = filteredData.filter(
        (item) => item.status === "Active"
    ).length;
    const router = useRouter();

    const totalDepartments = new Set(
        filteredData.map((item) => item.department)
    ).size;

    const totalBranches = new Set(
        filteredData.map((item) => item.branch)
    ).size;
    return (
        <div className="min-h-screen bg-white p-5 md:p-12">
            <div className="space-y-6">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-normal tracking-tight text-black">

                            Staff Management
                        </h1>
                        <p className="mt-2 text-[#64748B]   leading-relaxed  font-light">

                            View and manage all staff members
                        </p>
                    </div>

                    <FillButton
                        text="Add Staff"
                        href="/lab-admin/staff/add-staff"
                    />
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-3">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>

                            <div>
                                <p className="   text-slate-500">
                                    Total Staff
                                </p>

                                <h3 className="text-2xl font-bold text-slate-900">
                                    {totalStaff}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-3">
                                <Users className="h-5 w-5 text-green-600" />
                            </div>

                            <div>
                                <p className="  text-slate-500">
                                    Active Staff
                                </p>

                                <h3 className="text-2xl font-bold text-slate-900">
                                    {activeStaff}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-purple-100 p-3">
                                <BriefcaseBusiness className="h-5 w-5 text-purple-600" />
                            </div>

                            <div>
                                <p className=" text-slate-500">
                                    Departments
                                </p>

                                <h3 className="text-2xl font-bold text-slate-900">
                                    {totalDepartments}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-orange-100 p-3">
                                <Building2 className="h-5 w-5 text-orange-600" />
                            </div>

                            <div>
                                <p className=" text-slate-500">
                                    Branches
                                </p>

                                <h3 className="text-2xl font-bold text-slate-900">
                                    {totalBranches}
                                </h3>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Filters Same Rahenge */}
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
                            onChange={(e) =>
                                setDepartmentFilter(e.target.value)
                            }
                            className="rounded-lg border text-sm border-slate-200 bg-white px-3 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="">All Departments</option>

                            {departments.map((department) => (
                                <option
                                    key={department}
                                    value={department}
                                >
                                    {department}
                                </option>
                            ))}
                        </select>

                        <select
                            value={branchFilter}
                            onChange={(e) =>
                                setBranchFilter(e.target.value)
                            }
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
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
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



                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max">

                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="px-4 py-3 text-left  font-medium text-black">#</th>
                                    <th className="px-4 py-3 text-left  font-medium text-black">Employee ID</th>
                                    <th className="px-4 py-3 text-left  font-medium text-black">Full Name</th>
                                    <th className="px-4 py-3 text-left  font-medium text-black">Phone</th>
                                    <th className="px-4 py-3 text-left  font-medium text-black">Email</th>
                                    <th className="px-4 py-3 text-left  font-medium text-black">Designation</th>
                                    <th className="px-4 py-3 text-left  font-medium text-black">Department</th>
                                    <th className="px-4 py-3 text-left  font-medium text-black">Branch</th>
                                    <th className="px-4 py-3 text-left  font-medium text-black">Status</th>
                                    <th className="px-4 py-3 text-left  font-medium text-black">Joining Date</th>
                                    <th className="px-4 py-3 text-center  font-medium text-black">Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={11}
                                            className="py-10 text-center  text-slate-500"
                                        >
                                            No staff found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((staff, index) => (
                                        <tr
                                            key={staff.id}
                                            className="border-b border-slate-100 text-sm hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-4 text-[#64748B] text-sm  ">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-4 text-[#64748B] text-sm  font-medium">
                                                {staff.empId}
                                            </td>

                                            <td className="px-4 py-4 text-[#64748B] text-sm  font-medium">
                                                {staff.fullName || staff.name}
                                            </td>

                                            <td className="px-4  text-[#64748B] text-sm py-4 ">
                                                {staff.phone}
                                            </td>

                                            <td className="px-4 text-[#64748B] text-sm py-4 ">
                                                {staff.email}
                                            </td>

                                            <td className="px-4 text-[#64748B] text-sm py-4 ">
                                                {staff.designation}
                                            </td>

                                            <td className="px-4 text-[#64748B] text-sm py-4 ">
                                                {staff.department}
                                            </td>

                                            <td className="px-4 text-[#64748B] text-sm py-4 ">
                                                {staff.branch}
                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-medium ${staff.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {staff.status}
                                                </span>
                                            </td>

                                            <td className="px-4 text-[#64748B]  py-4 ">
                                                {staff.joiningDate}
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => router.push(`/lab-admin/staff/add-staff/${staff.id}`)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-blue-500 transition hover:bg-blue-50"

                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(staff.id)
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-red-400 transition hover:bg-red-50"

                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-slate-200 p-4">
                        <p className=" text-sm font-light text-[#64748B]">
                            Showing {filteredData.length} of{" "}
                            {staffData.length} Staff members
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}