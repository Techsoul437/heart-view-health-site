"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Upload,
    Shield,
    Briefcase
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { getStaffProfile, updateStaffProfile } from "@/redux/Api";
import toast from "react-hot-toast";
import SubmitButton from "@/Ui/buttons/SubmitButton";

const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    designation: Yup.string().required("Designation is required"),
    department: Yup.string().required("Department is required"),
    address: Yup.string().required("Address is required"),
});

export default function StaffProfilePage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.staffProfile
    );

    const [initialValues, setInitialValues] = useState({
        logo: "",
        fullName: "",
        email: "",
        phone: "",
        designation: "",
        department: "",
        address: "",
    });

    useEffect(() => {
        dispatch(getStaffProfile());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInitialValues({
                logo: data.logo ?? "",
                fullName: data.fullName ?? "",
                email: data.email ?? "",
                phone: data.phone ?? "",
                designation: data.designation ?? "",
                department: data.department ?? "",
                address: data.address ?? "",
            });
        }
    }, [data]);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    const handleLogoUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: string) => void
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload a valid image file.");
            e.target.value = "";
            setFieldValue("logo", "");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            const fileSize = (file.size / (1024 * 1024)).toFixed(2);
            toast.error(
                `Selected image is ${fileSize} MB. Maximum allowed size is 10 MB.`
            );
            e.target.value = "";
            setFieldValue("logo", "");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setFieldValue("logo", reader.result as string);
        };
        reader.onerror = () => {
            toast.error("Failed to read image.");
            e.target.value = "";
            setFieldValue("logo", "");
        };
        reader.readAsDataURL(file);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-[#64748B]">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-red-500">
                    Failed to load profile: {String(error)}
                </p>
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
                            My Profile
                        </h1>
                        <p className="mt-2 text-[#64748B] leading-relaxed font-light">
                            Manage your personal and account information
                        </p>
                    </div>
                </div>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        try {
                            const result = await dispatch(
                                updateStaffProfile({
                                    fullName: values.fullName,
                                    designation: values.designation,
                                    department: values.department,
                                    address: values.address,
                                    logo: values.logo,
                                })
                            ).unwrap();
                            toast.success(result.message || "Profile Updated Successfully");
                            dispatch(getStaffProfile());
                        } catch (err: unknown) {
                            toast.error("Failed to update profile");
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
                                                Profile Details
                                            </h2>
                                            <p className=" text-[#64748B] ">
                                                Update your personal details
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
                                            <div className="relative h-36 w-36 overflow-hidden rounded-full border border-slate-200">
                                                {values.logo ? (
                                                    <img
                                                        src={values.logo}
                                                        alt="Profile"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                                        <User className="h-12 w-12 text-slate-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <label className="flex cursor-pointer items-center gap-2 text-sm rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 font-medium text-blue-700">
                                                <Upload className="h-4 w-4" />
                                                Upload Photo
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) => handleLogoUpload(e, setFieldValue)}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Form Section */}
                                    <div className="grid gap-5 md:grid-cols-2">
                                        {/* Full Name */}
                                        <div>
                                            <label className="mb-2 block font-medium">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    name="fullName"
                                                    className="w-full text-sm rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="fullName"
                                                component="p"
                                                className="mt-1 text-red-500 text-sm"
                                            />
                                        </div>

                                        {/* Phone Number (Read Only) */}
                                        <div>
                                            <label className="mb-2 block font-medium">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    name="phone"
                                                    readOnly
                                                    className="w-full text-sm rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none text-slate-500 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        {/* Email Address (Read Only) */}
                                        <div>
                                            <label className="mb-2 block font-medium">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    readOnly
                                                    className="w-full text-sm rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none text-slate-500 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Department */}
                                        <div>
                                            <label className="mb-2 block font-medium">
                                                Department
                                            </label>
                                            <div className="relative">
                                                <Shield className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    name="department"
                                                    className="w-full text-sm rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="department"
                                                component="p"
                                                className="mt-1 text-red-500 text-sm"
                                            />
                                        </div>

                                        {/* Designation */}
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block font-medium">
                                                Designation
                                            </label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    name="designation"
                                                    className="w-full text-sm rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="designation"
                                                component="p"
                                                className="mt-1 text-red-500 text-sm"
                                            />
                                        </div>

                                        {/* Address */}
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block font-medium">
                                                Address
                                            </label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                                                <Field
                                                    name="address"
                                                    className="w-full text-sm rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="address"
                                                component="p"
                                                className="mt-1 text-red-500 text-sm"
                                            />
                                        </div>

                                        {/* Save Button */}
                                        <div className="flex justify-end md:col-span-2">
                                            <SubmitButton text="Save" type="submit" />
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