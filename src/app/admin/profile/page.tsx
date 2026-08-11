"use client";

import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, Phone, Mail, MapPin } from "lucide-react";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
    getAdminProfile,
    updateAdminProfile,
} from "@/redux/Api";

interface AdminProfileFormValues {
    fullName: string;
    adminId: string;
    role: string;
    email: string;
}

const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    role: Yup.string().required("Role is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email Address is required"),
});

export default function AdminProfilePage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data: profile, loading: profileLoading, updateLoading } = useSelector(
        (state: RootState) => state.heartViewAdminProfile
    );

    useEffect(() => {
        dispatch(getAdminProfile());
    }, [dispatch]);

    const initialValues: AdminProfileFormValues = {
        fullName: profile?.fullName || "",
        adminId: profile?._id || "",
        role: profile?.role || "",
        email: profile?.email || "",
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
                            const payload = {
                                id: values.adminId,
                                fullName: values.fullName,
                            };

                            await dispatch(
                                updateAdminProfile(payload)
                            ).unwrap();

                            toast.success("Profile Updated Successfully");
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
                    {() => (
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
                                <div className="p-6">

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
                                        {/* <div>
                                            <label className="mb-2 block font-medium">Admin ID</label>
                                            <Field
                                                name="adminId"
                                                disabled
                                                className="w-full rounded-xl border text-[#64748B] text-sm border-slate-300 bg-slate-50 px-4 py-3 outline-none transition"
                                            />
                                        </div> */}

                                        {/* Role - read only */}
                                        {/* <div>
                                            <label className="mb-2 block font-medium">Role</label>
                                            <Field
                                                name="role"
                                                disabled
                                                className="w-full rounded-xl border border-slate-300 text-sm bg-slate-50 px-4 py-3 outline-none transition"
                                            />
                                            <ErrorMessage name="role" component="p" className="mt-1 text-red-500" />
                                        </div> */}

                                        {/* Email - read only */}
                                        <div>
                                            <label className="mb-2 block font-medium">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    disabled
                                                    className="w-full rounded-xl border text-sm border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition"
                                                />
                                            </div>
                                            <ErrorMessage name="email" component="p" className="mt-1 text-red-500" />
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