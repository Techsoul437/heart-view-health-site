"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    User,
    Phone,
    Mail,
    MapPin,
    ArrowLeft,
} from "lucide-react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import ResetButton from "@/Ui/buttons/ResetButton";
import SubmitButton from "@/Ui/buttons/SubmitButton";

const StaffSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid phone number")
        .required("Phone Number is required"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

    designation: Yup.string().required("Designation is required"),
    department: Yup.string().required("Department is required"),
    branch: Yup.string().required("Branch is required"),
});

interface StaffFormValues {
    fullName: string;
    phone: string;
    email: string;
    designation: string;
    department: string;
    branch: string;
    address: string;
    status: string;
}

export default function EditStaffPage() {
    const router = useRouter();
    const params = useParams();
    const staffId = Number(params.id);

    const [initialValues, setInitialValues] =
        useState<StaffFormValues | null>(null);
    const [empId, setEmpId] = useState("");

    useEffect(() => {
        const storedStaff = JSON.parse(
            localStorage.getItem("staffData") || "[]"
        );

        const staff = storedStaff.find(
            (item: { id: number }) => item.id === staffId
        );

        if (staff) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEmpId(staff.empId);
            setInitialValues({
                fullName: staff.fullName || staff.name || "",
                phone: staff.phone || "",
                email: staff.email || "",
                designation: staff.designation || "",
                department: staff.department || "",
                branch: staff.branch || "",
                address: staff.address || "",
                status: staff.status || "Active",
            });
        } else {
            // Staff not found, go back
            router.push("/lab-admin/staff");
        }
    }, [staffId, router]);

    if (!initialValues) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-5 md:p-12">
            <div className="space-y-6">
                {/* Header */}

                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/lab-admin/staff"
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-black transition hover:bg-black/10"
                        >
                            <ArrowLeft size={20} />
                        </Link>

                        <div>
                            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl   font-normal tracking-tight text-black">
                                Edit Staff
                            </h1>

                            <p className=" leading-relaxed  font-light  text-[#64748B]">

                                Update staff member details
                            </p>
                        </div>
                    </div>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={StaffSchema}
                    onSubmit={(values) => {
                        const storedStaff = JSON.parse(
                            localStorage.getItem("staffData") || "[]"
                        );

                        const updatedStaff = storedStaff.map(
                            (item: { id: number }) =>
                                item.id === staffId
                                    ? { ...item, ...values }
                                    : item
                        );

                        localStorage.setItem(
                            "staffData",
                            JSON.stringify(updatedStaff)
                        );

                        router.push("/lab-admin/staff");
                    }}
                >
                    {({ resetForm }) => (  // ✅ Fix here

                        <Form>
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="p-6">
                                    {/* Row 1 */}
                                    <div className="grid gap-6 lg:grid-cols-4">
                                        {/* Full Name */}
                                        <div>
                                            <label className="mb-2 block font-medium text-slate-700">
                                                Full Name{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <Field
                                                    name="fullName"
                                                    type="text"
                                                    placeholder="Enter full name"
                                                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <ErrorMessage
                                                name="fullName"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>

                                        {/* Employee ID - readonly */}
                                        <div>
                                            <label className="mb-2 block font-medium text-slate-700">
                                                Employment ID
                                            </label>

                                            <input
                                                type="text"
                                                value={empId}
                                                readOnly
                                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 font-medium text-slate-700"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="mb-2 block font-medium text-slate-700">
                                                Phone Number{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <Field
                                                    name="phone"
                                                    type="text"
                                                    placeholder="Enter phone number"
                                                    className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <ErrorMessage
                                                name="phone"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="mb-2 block font-medium text-slate-700">
                                                Email Address{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <Field
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter email address"
                                                    className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <ErrorMessage
                                                name="email"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="mt-6 grid gap-6 lg:grid-cols-4">
                                        <div>
                                            <label className="mb-2 block font-medium text-slate-700">
                                                Designation *
                                            </label>

                                            <Field
                                                name="designation"
                                                type="text"
                                                placeholder="Enter designation"
                                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 outline-none focus:border-blue-500"
                                            />

                                            <ErrorMessage
                                                name="designation"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block font-medium text-slate-700">
                                                Department *
                                            </label>

                                            <Field
                                                name="department"
                                                type="text"
                                                placeholder="Enter department"
                                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 outline-none focus:border-blue-500"
                                            />

                                            <ErrorMessage
                                                name="department"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block font-medium text-slate-700">
                                                Branch *
                                            </label>

                                            <Field
                                                name="branch"
                                                type="text"
                                                placeholder="Enter branch"
                                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 outline-none focus:border-blue-500"
                                            />

                                            <ErrorMessage
                                                name="branch"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="mt-6">
                                        <label className="mb-2 block font-medium text-slate-700">
                                            Address
                                        </label>

                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-4 h-4 w-4 text-slate-400" />

                                            <Field
                                                name="address"
                                                type="text"
                                                placeholder="Enter full address"
                                                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="mt-8">
                                        <label className="mb-3 block font-medium text-slate-700">
                                            Status
                                        </label>

                                        <div className="flex gap-8">
                                            <label className="flex items-center gap-2">
                                                <Field
                                                    type="radio"
                                                    name="status"
                                                    value="Active"
                                                />
                                                Active
                                            </label>

                                            <label className="flex items-center gap-2">
                                                <Field
                                                    type="radio"
                                                    name="status"
                                                    value="Inactive"
                                                />
                                                Inactive
                                            </label>
                                        </div>
                                    </div>

                                    {/* Footer */}


                                    <div className="flex  gap-4 pt-4 sm:flex-row sm:justify-end">
                                        <ResetButton onReset={resetForm} />
                                        <SubmitButton text="Update" type="submit" />
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