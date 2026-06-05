"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Building2,
    Phone,
    Mail,
    MapPin,
    Upload,
    Save,
} from "lucide-react";
import SubmitButton from "@/Ui/buttons/SubmitButton";

interface LabProfile {
    logo: string;
    labName: string;
    branchName: string;
    labtype: string;
    phone: string;
    email: string;
    address: string;
}

const validationSchema = Yup.object({
    labName: Yup.string().required("Lab Name is required"),
    labtype: Yup.string().required("Lab Type is required"),
    phone: Yup.string()
        .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
        .required("Phone Number is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email Address is required"),
    address: Yup.string().required("Address is required"),
});

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] =
        useState<LabProfile>({
            logo: "",
            labName: "",
            branchName: "",
            labtype: "",
            phone: "",
            email: "",
            address: "",
        });

    useEffect(() => {
        const storedData = localStorage.getItem("labProfile");

        if (storedData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInitialValues(JSON.parse(storedData));
        } else {
            setInitialValues({
                logo: "",
                labName: "HeartView Diagnostic Lab",
                branchName: "Main Branch",
                labtype: "Diagnostic Lab",
                phone: "+91 9876543210",
                email: "info@heartview.com",
                address: "Ahmedabad, Gujarat, India",
            });
        }

        setLoading(false);
    }, []);

    const handleLogoUpload = (
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
                "logo",
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
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                            Settings
                        </h1>

                        <p className="mt-2 text-[#64748B]">
                            Manage laboratory settings and profile
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
                            "labProfile",
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
                                            <Building2 className="h-5 w-5 text-blue-600" />
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-medium">

                                                Lab Profile
                                            </h2>

                                            <p className=" text-[#64748B] ">
                                                Update laboratory details
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                {/* Content */}

                                <div className="grid gap-8 p-6 xl:grid-cols-[18rem_1fr]">

                                    {/* Logo Section */}

                                    <div className="rounded-2xl border border-slate-200 p-5">

                                        <h3 className="mb-4 font-medium text-slate-900">
                                            Lab Logo
                                        </h3>

                                        <div className="flex flex-col items-center gap-4">

                                            <div className="relative h-36 w-36 overflow-hidden rounded-full border border-slate-200">

                                                {values.logo ? (
                                                    <Image
                                                        src={values.logo}
                                                        alt="Lab Logo"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                                        <Building2 className="h-10 w-10 text-slate-400" />
                                                    </div>
                                                )}

                                            </div>

                                            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2  font-medium text-blue-700">

                                                <Upload className="h-4 w-4" />

                                                Upload Logo

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

                                        {/* Lab Name */}

                                        <div>
                                            <label className="mb-2 block  font-medium">
                                                Lab Name
                                            </label>

                                            <Field
                                                name="labName"
                                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                                            />

                                            <ErrorMessage
                                                name="labName"
                                                component="p"
                                                className="mt-1  text-red-500"
                                            />
                                        </div>

                                        {/* Branch Name */}

                                        <div>
                                            <label className="mb-2 block  font-medium">
                                                Branch Name
                                            </label>

                                            <Field
                                                name="branchName"
                                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                                            />

                                            <ErrorMessage
                                                name="branchName"
                                                component="p"
                                                className="mt-1  text-red-500"
                                            />
                                        </div>

                                        {/* Lab Type */}

                                        <div>
                                            <label className="mb-2 block  font-medium">
                                                Lab Type
                                            </label>

                                            <Field
                                                name="labtype"
                                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                                            />

                                            <ErrorMessage
                                                name="labtype"
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