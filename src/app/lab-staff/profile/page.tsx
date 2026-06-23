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
    Save,
} from "lucide-react";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import toast from "react-hot-toast";

type ProfileType = {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    department: string;
    role: string;
    joinedOn: string;
    status: string;
};

export default function StaffProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState<ProfileType>({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        department: "",
        role: "",
        joinedOn: "",
        status: "",
    });

    useEffect(() => {
        const savedProfile = localStorage.getItem("staffProfile");

        if (savedProfile) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProfile(JSON.parse(savedProfile));
        } else {
            const defaultProfile = {
                fullName: "Lab Staff User",
                email: "staff@heartview.com",
                phone: "+91 98765 43210",
                dob: "01 Jan 1995",
                address: "Ahmedabad, Gujarat, India",
                department: "Laboratory",
                role: "Lab Staff",
                joinedOn: "10 Mar 2024",
                status: "Active",
            };

            setProfile(defaultProfile);

            localStorage.setItem(
                "staffProfile",
                JSON.stringify(defaultProfile)
            );
        }
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = () => {
        localStorage.setItem(
            "staffProfile",
            JSON.stringify(profile)
        );

        setIsEditing(false);

        toast.success("Profile Updated Successfully");

    };

    return (
        <div className="min-h-screen bg-white p-5 md:p-12">
            <div className="mx-auto max-w-8xl">
                {/* Header */}

                <div className="flex flex-col gap-5 shrink-0">
                    <div className="flex items-center gap-3">

                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl  font-normal tracking-tight text-black">
                                My Profile
                            </h1>

                            <p className="text-base sm:text-lg  leading-relaxed  font-light  text-[#64748B]">

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

                            <p className=" text-[#64748B] ">
                                {profile.role}
                            </p>
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                     <div className="mb-8 flex flex-col gap-4">
                                               <h2 className="text-2xl font-medium">

        Personal Information
    </h2>

    <button
        onClick={() => setIsEditing(true)}
        className="flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl border border-[#2f5ba5] px-5 py-3 text-[#2f5ba5]"
    >
        <Edit3 size={18} />
        Edit Profile
    </button>
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
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    icon={<Phone size={16} />}
                                    label="Phone Number"
                                    name="phone"
                                    value={profile.phone}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    icon={<Calendar size={16} />}
                                    label="Date Of Birth"
                                    name="dob"
                                    value={profile.dob}
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
                                    <label className="mb-2 flex items-center gap-2  text-[#64748B] ">
                                        <Shield size={16} />
                                        Department
                                    </label>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-black">
                                        {profile.department}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                                               <h2 className="text-2xl font-medium">

                        Account Information
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className=" text-[#64748B] ">Role</p>
                            <p className="mt-1 font-medium text-black">
                                {profile.role}
                            </p>
                        </div>

                        <div>
                            <p className=" text-[#64748B] ">Joined On</p>
                            <p className="mt-1 font-medium text-black">
                                {profile.joinedOn}
                            </p>
                        </div>

                        <div>
                            <p className=" text-[#64748B] ">Status</p>

                            <div className="mt-1 flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="font-medium text-black">
                                    {profile.status}
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className=" text-[#64748B] ">
                                Last Login
                            </p>
                            <p className="mt-1 font-medium text-black">
                                Today, 10:30 AM
                            </p>
                        </div>
                    </div>
                </div>
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
            <label className="mb-2 flex items-center gap-2  text-[#64748B] ">
                {icon}
                {label}
            </label>

            {isEditing ? (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#2f5ba5]"
                />
            ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-black">
                    {value}
                </div>
            )}
        </div>
    );
}