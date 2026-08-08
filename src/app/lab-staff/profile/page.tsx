"use client";

import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Camera,
    Edit3,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { getStaffProfile ,updateStaffProfile } from "@/redux/Api";
import toast from "react-hot-toast";

type ProfileType = {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    designation: string;
    department: string;
    role: string;
    joinedOn: string;
    status: string;
};

const EMPTY_PROFILE: ProfileType = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    designation: "",
    department: "",
    role: "",
    joinedOn: "",
    status: "",
};

export default function StaffProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // Redux se aane wala API data / loading / error
    const { data, loading, error } = useSelector(
        (state: RootState) => state.staffProfile
    );

    // Ye local editable state hai jo API data se sync hoti hai
    const [profile, setProfile] = useState<ProfileType>(EMPTY_PROFILE);

    // Component mount hote hi API call
    useEffect(() => {
        dispatch(getStaffProfile());
    }, [dispatch]);

    // Jab bhi Redux se naya data aaye, usse local editable state me map karo
    useEffect(() => {
        if (!data) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProfile((prev) => ({
            fullName: data.fullName ?? "",
            email: data.email ?? "",
            phone: data.phone ?? "",
            // API me dob field nahi hai abhi — agar edit karke user ne
            // pehle se koi value save ki thi to wahi preserve karo
            dob: prev.dob || "",
            address: data.address ?? "",
            department: data.department ?? "",
            designation: data.designation ?? "",
            role: data.role ?? "",
            joinedOn: data.joiningDate
                ? new Date(data.joiningDate).toLocaleDateString()
                : "",
            status: data.status ?? "",
        }));
    }, [data]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

 const handleSave = async () => {
  try {
    const result = await dispatch(
      updateStaffProfile({
        fullName: profile.fullName,
        designation: profile.designation,
        department: profile.department,
        address: profile.address,
      })
    ).unwrap();

    toast.success(result.message);

    dispatch(getStaffProfile());

    setIsEditing(false);
  } catch (error: unknown) {
    toast.error("Failed to update profile");
  }
};

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-[#64748B]">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-red-500">
                    Failed to load profile: {String(error)}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-5 md:p-12">
            <div className="mx-auto max-w-8xl">
                {/* Header */}
                <div className="flex flex-col gap-5 shrink-0">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                                My Profile
                            </h1>

                            <p className="leading-relaxed font-light text-[#64748B]">
                                Manage your personal and account information.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="rounded-3xl border mt-5 border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex flex-col gap-10 lg:flex-row">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center">
                            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-blue-50">
                                <User className="h-20 w-20 text-[#2f5ba5]" />

                                {isEditing && (
                                    <button
                                        type="button"
                                        className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-md"
                                    >
                                        <Camera className="h-4 w-4 text-[#2f5ba5]" />
                                    </button>
                                )}
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-black">
                                {profile.fullName}
                            </h3>
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <div className="mb-8 flex flex-col gap-4">
                                <h2 className="text-md md:text-lg xl:text-xl">
                                    Personal Information
                                </h2>

                                {isEditing ? (
                                    <button
                                        onClick={handleSave}
                                        className="flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl border border-[#2f5ba5] bg-[#2f5ba5] px-5 py-3 text-white"
                                    >
                                        Save Profile
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl border border-[#2f5ba5] px-5 py-3 text-[#2f5ba5]"
                                    >
                                        <Edit3 size={18} />
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <ProfileField
                                    icon={<User size={16} />}
                                    label="Full Name"
                                    name="fullName"
                                    value={profile.fullName}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    icon={<Mail size={16} />}
                                    label="Email Address"
                                    name="email"
                                    value={profile.email}
                                     isEditing={false}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    icon={<Phone size={16} />}
                                    label="Phone Number"
                                    name="phone"
                                    value={profile.phone}
                                   isEditing={false}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    icon={<Calendar size={16} />}
                                    label="Designation"
                                    name="designation"
                                    value={profile.designation}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    icon={<MapPin size={16} />}
                                    label="Address"
                                    name="address"
                                    value={profile.address}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                                <div>
                                   
<ProfileField
  icon={<Shield size={16} />}
  label="Department"
  name="department"
  value={profile.department}
  isEditing={isEditing}
  onChange={handleChange}
/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                {/* <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl">Account Information</h2>

                    <div className="mt-3 mb-6 h-px w-full bg-slate-200" />

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-black">Role</p>
                            <p className="mt-1 text-[#64748B]">{profile.role}</p>
                        </div>

                        <div>
                            <p className="text-black">Joined On</p>
                            <p className="mt-1 text-[#64748B]">{profile.joinedOn}</p>
                        </div>

                        <div>
                            <p className="text-black">Status</p>

                            <div className="mt-1 flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-[#64748B]">{profile.status}</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-black">Last Login</p>
                            <p className="mt-1 text-[#64748B]">Today, 10:30 AM</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

function ProfileField({
    icon,
    label,
    name,
    value,
    isEditing,
    onChange,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
    return (
        <div>
            <label className="mb-2 flex items-center gap-2 text-black">
                {icon}
                {label}
            </label>

            {isEditing ? (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-xl text-sm border border-slate-300 px-4 py-3 outline-none transition focus:border-[#2f5ba5]"
                />
            ) : (
                <div className="rounded-xl border text-sm border-slate-200 bg-slate-50 px-4 py-3 text-black">
                    {value}
                </div>
            )}
        </div>
    );
}