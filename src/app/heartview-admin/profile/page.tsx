"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    User,
    Phone,
    Mail,
    MapPin,
    Upload,
    Save,
} from "lucide-react";
import SubmitButton from "@/Ui/buttons/SubmitButton";

interface AdminProfile {
    photo: string;
    fullName: string;
    adminId: string;
    role: string;
    phone: string;
    email: string;
    address: string;
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

export default function AdminProfilePage() {
    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] =
        useState<AdminProfile>({
            photo: "",
            fullName: "",
            adminId: "",
            role: "",
            phone: "",
            email: "",
            address: "",
        });

    useEffect(() => {
        const storedData = localStorage.getItem("heartviewAdminProfile");

        if (storedData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInitialValues(JSON.parse(storedData));
        } else {
            setInitialValues({
                photo: "",
                fullName: "HeartView Admin",
                adminId: "ADM-1001",
                role: "Support & Onboarding Admin",
                phone: "+91 9876543210",
                email: "admin@heartviewhealth.com",
                address: "HeartView Health HQ, Ahmedabad, Gujarat, India",
            });
        }

        setLoading(false);
    }, []);

    const handlePhotoUpload = (
        e: ChangeEvent<HTMLInputElement>,
        setFieldValue: (
            field: string,
            value: string
        ) => void
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setFieldValue(
                "photo",
                reader.result as string
            );
        };

        reader.readAsDataURL(file);
    };

    if (loading) {
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

                <div className="flex flex-col gap-5 border-b border-black/8  md:flex-row md:items-start md:justify-between ">
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl  font-normal tracking-tight text-black">
                            Admin Profile
                        </h1>

                        <p className="mt-2 text-[#64748B]  text-base sm:text-lg  leading-relaxed  font-light">
                            Manage your HeartView Admin account and profile
                            information
                        </p>
                    </div>



                </div>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        localStorage.setItem(
                            "heartviewAdminProfile",
                            JSON.stringify(values)
                        );

                        alert(
                            "Profile Updated Successfully"
                        );
                    }}
                >
                    {({
                        values,
                        setFieldValue,
                    }) => (
                        <Form>

                            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

                                {/* Card Header */}

                                <div className="border-b border-slate-200 p-6">
                                    <div className="flex items-center gap-3">

                                        <div className="rounded-2xl bg-blue-50 p-3">
                                            <User className="h-5 w-5 text-blue-600" />
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-medium">
                                                HeartView Admin
                                            </h2>

                                            <p className=" text-base sm:text-lg  leading-relaxed  font-light text-[#64748B] ">
                                                Update your administrator account details
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                {/* Content */}

                                <div className="grid gap-8 p-6 xl:grid-cols-[18rem_1fr]">

                                    {/* Photo Section */}

                                    <div className="rounded-2xl border border-slate-200 p-5">

                                        <h3 className="mb-4 font-medium text-slate-900">
                                            Profile Photo
                                        </h3>

                                        <div className="flex flex-col items-center gap-4">

                                            <div className="relative h-36 w-36 overflow-hidden rounded-full border border-slate-200">

                                                {values.photo ? (
                                                    <Image
                                                        src={values.photo}
                                                        alt="Profile Photo"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                                        <User className="h-10 w-10 text-slate-400" />
                                                    </div>
                                                )}

                                            </div>

                                            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2  font-medium text-blue-700">

                                                <Upload className="h-4 w-4" />

                                                Upload Photo

                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handlePhotoUpload(
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
                                            <label className="mb-2 block  font-medium">
                                                Full Name
                                            </label>

                                            <Field
                                                name="fullName"
                                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                                            />

                                            <ErrorMessage
                                                name="fullName"
                                                component="p"
                                                className="mt-1  text-red-500"
                                            />
                                        </div>

                                        {/* Admin ID */}

                                        <div>
                                            <label className="mb-2 block  font-medium">
                                                Admin ID
                                            </label>

                                            <Field
                                                name="adminId"
                                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                                            />

                                            <ErrorMessage
                                                name="adminId"
                                                component="p"
                                                className="mt-1  text-red-500"
                                            />
                                        </div>

                                        {/* Role */}

                                        <div>
                                            <label className="mb-2 block  font-medium">
                                                Role
                                            </label>

                                            <Field
                                                name="role"
                                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                                            />

                                            <ErrorMessage
                                                name="role"
                                                component="p"
                                                className="mt-1  text-red-500"
                                            />
                                        </div>

                                        {/* Phone */}

                                        <div>
                                            <label className="mb-2 block  font-medium">
                                                Phone Number
                                            </label>

                                            <div className="relative">

                                                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <Field
                                                    name="phone"
                                                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                                                />

                                            </div>

                                            <ErrorMessage
                                                name="phone"
                                                component="p"
                                                className="mt-1  text-red-500"
                                            />
                                        </div>

                                        {/* Email */}

                                        <div>
                                            <label className="mb-2 block  font-medium">
                                                Email Address
                                            </label>

                                            <div className="relative">

                                                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <Field
                                                    type="email"
                                                    name="email"
                                                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                                                />

                                            </div>

                                            <ErrorMessage
                                                name="email"
                                                component="p"
                                                className="mt-1  text-red-500"
                                            />
                                        </div>

                                        {/* Address */}

                                        <div className="md:col-span-2">

                                            <label className="mb-2 block  font-medium">
                                                Address
                                            </label>

                                            <div className="relative">

                                                <MapPin className="absolute left-4 top-4 h-4 w-4 text-slate-400" />

                                                <Field
                                                    name="address"
                                                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                                                />

                                            </div>

                                            <ErrorMessage
                                                name="address"
                                                component="p"
                                                className="mt-1  text-red-500"
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