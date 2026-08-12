/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { User, Briefcase, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import ResetButton from "@/Ui/buttons/ResetButton";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addTeam } from "@/redux/Api";
import { resetTeamState } from "@/redux/Slice/TeamSlice";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TeamFormValues {
    fullName: string;
    designation: string;
    description: string;
    status: "Active" | "Inactive";
}

const TeamSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    designation: Yup.string().required("Designation (Role) is required"),
    description: Yup.string().required("Description is required"),
});

export default function AddTeamPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, success, error } = useSelector(
        (state: RootState) => state.team
    );

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Redirect on success
    useEffect(() => {
        if (success) {
            router.push("/admin/team");
        }
    }, [success, router]);

    // Reset state on unmount so returning to this page doesn't auto-redirect
    useEffect(() => {
        return () => {
            dispatch(resetTeamState());
        };
    }, [dispatch]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="mx-auto  space-y-6">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/team"
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-black transition hover:bg-black/10"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                                Add New Team Member
                            </h1>
                            <p className="leading-relaxed font-light text-[#64748B]">
                                Add a member to show on the website
                            </p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                        {error}
                    </div>
                )}

                <Formik<TeamFormValues>
                    initialValues={{
                        fullName: "",
                        designation: "",
                        description: "",
                        status: "Active",
                    }}
                    validationSchema={TeamSchema}
                    onSubmit={(values) => {
                        const payload: any = {
                            fullName: values.fullName,
                            designation: values.designation,
                            description: values.description,
                            status: values.status,
                        };
                        if (imagePreview) {
                            payload.image = imagePreview;
                        }
                        dispatch(addTeam(payload));
                    }}
                >
                    {({ resetForm }) => (
                        <Form>
                            <div className="rounded-4xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                                <div className="p-8">
                                    
                                    {/* Image Upload */}
                                    <div className="mb-8 flex flex-col items-center sm:flex-row sm:items-start gap-6">
                                        <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex-shrink-0 group">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
                                                    <ImageIcon className="h-8 w-8 mb-2" />
                                                    <span className="text-xs font-medium">Upload Photo</span>
                                                </div>
                                            )}
                                            <div 
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <span className="text-white text-sm font-medium">Change</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-slate-900">Profile Photo</h3>
                                            <p className="text-sm text-slate-500 mt-1 mb-3 max-w-md">
                                                Upload a high-quality photo of the team member. Recommended size is 400x500px.
                                            </p>
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                onChange={handleImageChange} 
                                                accept="image/*" 
                                                className="hidden" 
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                            >
                                                Select Image
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Full Name */}
                                        <div>
                                            <label className="mb-2 block font-medium text-slate-700">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    name="fullName"
                                                    type="text"
                                                    placeholder="e.g. Flora Nyra"
                                                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <ErrorMessage name="fullName" component="p" className="mt-1 text-sm text-red-500" />
                                        </div>

                                        {/* Designation */}
                                        <div>
                                            <label className="mb-2 block font-medium text-slate-700">
                                                Designation (Role) <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Field
                                                    name="designation"
                                                    type="text"
                                                    placeholder="e.g. Product Manager"
                                                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mt-6">
                                        <label className="mb-2 block font-medium text-slate-700">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Field
                                                as="textarea"
                                                name="description"
                                                rows={4}
                                                placeholder="Enter a brief description or bio"
                                                className="w-full rounded-lg border border-slate-200 bg-white py-3 px-3 outline-none focus:border-blue-500 resize-none"
                                            />
                                        </div>
                                        <ErrorMessage name="description" component="p" className="mt-1 text-sm text-red-500" />
                                    </div>

                                    <div className="mt-8 border-t border-slate-100 pt-6">
                                        <label className="mb-3 block font-medium text-slate-700">
                                            Status on Website
                                        </label>
                                        <div className="flex gap-8">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <Field type="radio" name="status" value="Active" className="h-4 w-4 text-blue-600" />
                                                <span className="text-slate-700">Active (Visible)</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <Field type="radio" name="status" value="Inactive" className="h-4 w-4 text-slate-400" />
                                                <span className="text-slate-700">Inactive (Hidden)</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end bg-slate-50 p-4 -mx-8 -mb-8">
                                        <ResetButton onReset={() => {
                                            resetForm();
                                            setImageFile(null);
                                            setImagePreview(null);
                                        }} />
                                        <SubmitButton text={loading ? "Saving..." : "Save Member"} type="submit" />
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