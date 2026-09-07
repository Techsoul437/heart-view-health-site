"use client";

import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, Phone, Mail, MapPin, Upload } from "lucide-react";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
    getHeartViewAdminProfile,
    updateHeartViewAdminProfile,
} from "@/redux/Api";

interface AdminProfileFormValues {
    fullName: string;
    adminId: string;
    role: string;
    phone: string;
    email: string;
    address: string;
    profileImage: string;
    profileImageFile: File | null;
}

const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    role: Yup.string().required("Role is required"),
    phone: Yup.string()
        .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
        .required("Phone Number is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email Address is required"),
    address: Yup.string().required("Address is required"),
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function AdminProfilePage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data: profile, loading: profileLoading } = useSelector(
        (state: RootState) => state.heartViewAdminProfile
    );

    const { loading: updateLoading } = useSelector(
        (state: RootState) => state.updateHeartViewAdminProfile
    );

    useEffect(() => {
        dispatch(getHeartViewAdminProfile());
    }, [dispatch]);

    const initialValues: AdminProfileFormValues = {
        fullName: profile?.fullName || "",
        adminId: profile?.adminId || "",
        role: profile?.role || "",
        phone: profile?.mobile || "",
        email: profile?.email || "",
        address: profile?.address || "",
        profileImage: profile?.profileImage || "",
        profileImageFile: null,
    };

    const handleLogoUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any) => void
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Only image files
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload a valid image file.");
            e.target.value = "";
            setFieldValue("profileImage", "");
            setFieldValue("profileImageFile", null);
            return;
        }

        // File size validation
        if (file.size > MAX_FILE_SIZE) {
            const fileSize = (file.size / (1024 * 1024)).toFixed(2);
            toast.error(
                `Selected image is ${fileSize} MB. Maximum allowed size is 10 MB.`
            );
            e.target.value = "";
            setFieldValue("profileImage", "");
            setFieldValue("profileImageFile", null);
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setFieldValue("profileImage", reader.result as string);
            setFieldValue("profileImageFile", file);
        };

        reader.onerror = () => {
            toast.error("Failed to read image.");
            e.target.value = "";
            setFieldValue("profileImage", "");
            setFieldValue("profileImageFile", null);
        };

        reader.readAsDataURL(file);
    };

    if (profileLoading && !profile) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="mx-auto max-w-8xl space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                            Admin Profile
                        </h1>
                        <p className="mt-2 text-[#64748B] leading-relaxed font-light">
                            Manage your HeartView Admin account and profile information
                        </p>
                    </div>
                </div>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        try {
                            await dispatch(
                                updateHeartViewAdminProfile({
                                    fullName: values.fullName,
                                    mobile: values.phone,
                                    address: values.address,
                                    profileImage: values.profileImage, // base64 string
                                })
                            ).unwrap();

                            toast.success("Profile Updated Successfully");
                            dispatch(getHeartViewAdminProfile());
                        } catch (err: unknown) {
                            const error = err as {
                                response?: { status?: number; data?: { message?: string } };
                                message?: string;
                            };

                            if (error?.response?.status === 413) {
                                toast.error("File size cannot exceed 1 MB");
                            } else {
                                const message =
                                    typeof err === "string"
                                        ? err
                                        : error?.response?.data?.message ||
                                          error?.message ||
                                          "Failed to update profile";

                                toast.error(message);
                            }
                        }
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

                                {/* Card Header */}
                                <div className="border-b border-slate-200 p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-2xl bg-blue-50 p-3">
                                            <User className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-md md:text-lg xl:text-xl font-medium">
                                                HeartView Admin
                                            </h2>
                                            <p className="font-light text-[#64748B]">
                                                Update your administrator account details
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="grid gap-8 p-6 xl:grid-cols-[18rem_1fr]">

                                    {/* Logo Section */}
                                    <div className="rounded-2xl border border-slate-200 p-5">
                                        <h3 className="mb-4 font-medium text-slate-900">
                                            Profile Picture
                                        </h3>
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative flex h-36 w-36 overflow-hidden rounded-full border border-slate-200 bg-slate-100 justify-center items-center">
                                                {values.profileImage ? (
                                                    <img
                                                        src={values.profileImage}
                                                        alt="Admin Profile"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <User className="h-10 w-10 text-slate-400" />
                                                )}
                                            </div>
                                            <label className="flex cursor-pointer items-center gap-2 text-sm rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 font-medium text-blue-700 hover:bg-blue-100 transition-colors">
                                                <Upload className="h-4 w-4" />
                                                Upload Photo
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleLogoUpload(
                                                            e,
                                                            setFieldValue
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Form Section */}
                                    <div className="grid gap-5 md:grid-cols-2">

                                        {/* Full Name */}
                                        <div>
                                            <label className="mb-2 block font-medium">Full Name</label>
                                            <Field
                                                name="fullName"
                                                className="w-full rounded-xl text-sm border border-slate-300 text-[#64748B] bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                                            />
                                            <ErrorMessage name="fullName" component="p" className="mt-1 text-red-500" />
                                        </div>

                                        {/* Admin ID - read only */}
                                        <div>
                                            <label className="mb-2 block font-medium">Admin ID</label>
                                            <Field
                                                name="adminId"
                                                disabled
                                                className="w-full rounded-xl border text-[#64748B] text-sm border-slate-300 bg-slate-50 px-4 py-3 outline-none transition"
                                            />
                                        </div>

                                        {/* Role - read only */}
                                        <div>
                                            <label className="mb-2 block font-medium">Role</label>
                                            <Field
                                                name="role"
                                                disabled
                                                className="w-full rounded-xl border border-slate-300 text-[#64748B] text-sm bg-slate-50 px-4 py-3 outline-none transition"
                                            />
                                            <ErrorMessage name="role" component="p" className="mt-1 text-red-500" />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="mb-2 block font-medium">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    name="phone"
                                                    className="w-full rounded-xl text-[#64748B] border text-sm border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                                                />
                                            </div>
                                            <ErrorMessage name="phone" component="p" className="mt-1 text-red-500" />
                                        </div>

                                        {/* Email - read only */}
                                        <div>
                                            <label className="mb-2 block font-medium">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    disabled
                                                    className="w-full rounded-xl text-[#64748B] border text-sm border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition"
                                                />
                                            </div>
                                            <ErrorMessage name="email" component="p" className="mt-1 text-red-500" />
                                        </div>

                                        {/* Address */}
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block font-medium">Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                                                <Field
                                                    name="address"
                                                    className="w-full rounded-xl border text-[#64748B] border-slate-300 text-sm py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                                                />
                                            </div>
                                            <ErrorMessage name="address" component="p" className="mt-1 text-red-500" />
                                        </div>

                                        {/* Save Button */}
                                        <div className="flex justify-end md:col-span-2">
                                            <SubmitButton
                                                text={updateLoading ? "Saving..." : "Save"}
                                                type="submit"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}