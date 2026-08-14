"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
    Pencil,
    Trash2,
    Users,
    Search,
    AlertCircle,
    UserCircle
} from "lucide-react";

import { AppDispatch, RootState } from "@/redux/store";
import { getTeams, deleteTeam, TeamMember, getImageUrl } from "@/redux/Api";
import { resetTeamState } from "@/redux/Slice/TeamSlice";

import FillButton from "@/Ui/buttons/FillButton";
import DeleteModal from "@/Ui/ConfirmModal";

export default function TeamManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // ✅ Get Team State
    const { teams, loading, error, success } = useSelector(
        (state: RootState) => state.team
    );

    // ✅ Fetch teams on load
    useEffect(() => {
        dispatch(getTeams());
    }, [dispatch]);

    // ✅ Handle Delete Success
    useEffect(() => {
        if (success && selectedId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedId(null);
            dispatch(getTeams());
            dispatch(resetTeamState());
        }
    }, [success, dispatch, selectedId]);

    // ✅ Filter logic
    const filteredTeams = useMemo(() => {
        let temp = [...(teams || [])];
        if (searchTerm) {
            temp = temp.filter((t: TeamMember) =>
                t.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return temp;
    }, [teams, searchTerm]);

    const totalMembers = teams?.length || 0;
    const activeMembers = teams?.filter((t: TeamMember) => t.status === "Active").length || 0;

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-12">
            <div className="mx-auto  space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                            Team Management
                        </h1>
                        <p className="mt-2 text-[#64748B] leading-relaxed font-light">
                            View and manage website team members
                        </p>
                    </div>

                    <FillButton text="Add Team Member" href="/admin/team/add-team" />
                </div>

                {/* ✅ Delete error */}
                {error && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-slate-500">Total Team Members</p>
                                <h3 className="text-2xl font-bold text-slate-900">{totalMembers}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                                <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-slate-500">Active Members</p>
                                <h3 className="text-2xl font-bold text-slate-900">{activeMembers}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {/* Filters Bar */}
                    <div className="border-b border-slate-200 p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1 md:max-w-md">
                                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Member</th>
                                    <th className="px-6 py-4 font-medium">Role</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
                                                <p>Loading team data...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredTeams.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                                                    <Users className="h-6 w-6 text-slate-400" />
                                                </div>
                                                <p>No team members found</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTeams.map((item: TeamMember) => (
                                        <tr key={item._id} className="transition hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-12 w-12 overflow-hidden    flex items-center justify-center">
                                                        {item.image ? (
                                                            <div className="flex flex-col items-center">
                                                              <img
                                                                  src={getImageUrl(item.image)}
                                                                  alt={item.fullName}
                                                                  className="h-full w-full object-cover"
                                                              />
                                                            </div>
                                                        ) : (
                                                            <UserCircle className="h-6 w-6 text-slate-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-slate-900">
                                                            {item.fullName}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                {item.designation}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        item.status === "Active"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            router.push(`/admin/team/add-team/${item._id}`)
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-blue-500 transition hover:bg-blue-50"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (!item._id) return;
                                                            setSelectedId(item._id);
                                                            setOpenDeleteModal(true);
                                                        }}
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
                </div>
            </div>

            <DeleteModal
                isOpen={openDeleteModal}
                onCancel={() => {
                    setOpenDeleteModal(false);
                    setSelectedId(null);
                }}
                onConfirm={() => {
                    if (selectedId) {
                        dispatch(deleteTeam(selectedId));
                        setOpenDeleteModal(false);
                    }
                }}
                title="Delete Team Member"
            />
        </div>
    );
}