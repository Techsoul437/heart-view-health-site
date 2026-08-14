"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    User,
    Briefcase,
    ArrowLeft,
    Image as ImageIcon,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import ResetButton from "@/Ui/buttons/ResetButton";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
    getTeamById,
    updateTeam,
    getImageUrl,
} from "@/redux/Api";
import { resetTeamState } from "@/redux/Slice/TeamSlice";
import { resetGetTeamByIdState } from "@/redux/Slice/GetTeamByIdSlice";

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

export default function EditTeamPage() {
    const router = useRouter();
    const params = useParams();

    const teamId = params.id as string;

    const dispatch = useDispatch<AppDispatch>();

    const {
        team,
        loading: fetchLoading,
        error: fetchError,
    } = useSelector(
        (state: RootState) => state.getTeamById
    );

    const {
        loading: updateLoading,
        success: updateSuccess,
        error: updateError,
    } = useSelector(
        (state: RootState) => state.team
    );

    // =====================================================
    // IMAGE STATE
    // =====================================================

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // =====================================================
    // GET TEAM
    // =====================================================

    useEffect(() => {
        if (teamId) {
            dispatch(getTeamById(teamId));
        }
    }, [teamId, dispatch]);

    // =====================================================
    // SET EXISTING S3 IMAGE
    // =====================================================

    useEffect(() => {
        if (team?.image) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setImagePreview(getImageUrl(team.image));
        }
    }, [team]);

    // =====================================================
    // SUCCESS
    // =====================================================

    useEffect(() => {
        if (updateSuccess) {
            router.push("/admin/team");
        }
    }, [updateSuccess, router]);

    // =====================================================
    // CLEANUP
    // =====================================================

    useEffect(() => {
        return () => {
            dispatch(resetTeamState());
            dispatch(resetGetTeamByIdState());
        };
    }, [dispatch]);

    // =====================================================
    // IMAGE CHANGE
    // =====================================================

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert(
                "Only JPG, JPEG, PNG and WEBP images are allowed"
            );

            e.target.value = "";
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert("Image size must be less than 10MB");

            e.target.value = "";
            return;
        }

        // Actual File save karo
        setImageFile(file);

        // =================================================
        // IMPORTANT:
        // Base64 generate nahi karna.
        // Preview ke liye Blob URL use karo.
        // =================================================

        const previewUrl = URL.createObjectURL(file);

        // Old blob URL cleanup
        setImagePreview((oldPreview) => {
            if (oldPreview?.startsWith("blob:")) {
                URL.revokeObjectURL(oldPreview);
            }

            return previewUrl;
        });
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (fetchLoading || !team) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4 text-slate-500">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                    <p>
                        {fetchError
                            ? fetchError
                            : "Loading team member..."}
                    </p>
                </div>
            </div>
        );
    }

    // =====================================================
    // INITIAL VALUES
    // =====================================================

    const initialValues: TeamFormValues = {
        fullName: team.fullName || "",
        designation: team.designation || "",
        description: team.description || "",
        status: team.status || "Active",
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="mx-auto space-y-6">

                {/* Header */}
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
                                Edit Team Member
                            </h1>

                            <p className="leading-relaxed font-light text-[#64748B]">
                                Update website team member details
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error */}
                {updateError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                        {updateError}
                    </div>
                )}

                <Formik<TeamFormValues>
                    initialValues={initialValues}
                    validationSchema={TeamSchema}
                    enableReinitialize

                    onSubmit={(values) => {

                        // =================================================
                        // FORM DATA
                        // =================================================

                        const formData = new FormData();

                        formData.append(
                            "fullName",
                            values.fullName
                        );

                        formData.append(
                            "designation",
                            values.designation
                        );

                        formData.append(
                            "description",
                            values.description
                        );

                        formData.append(
                            "status",
                            values.status
                        );

                        // =================================================
                        // ONLY NEW FILE
                        // =================================================

                        if (imageFile) {
                            formData.append(
                                "image",
                                imageFile
                            );
                        }

                        // =================================================
                        // UPDATE API
                        // =================================================

                        dispatch(
                            updateTeam({
                                id: teamId,
                                formData,
                            })
                        );
                    }}
                >
                    {({ resetForm }) => (
                        <Form>

                            <div className="rounded-4xl border border-slate-200 bg-white shadow-sm overflow-hidden">

                                <div className="p-8">

                                    {/* =================================================
                                        IMAGE
                                    ================================================= */}

                                    <div className="mb-8 flex flex-col items-center sm:flex-row sm:items-start gap-6">

                                        <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex-shrink-0 group">

                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt="Team member preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
                                                    <ImageIcon className="h-8 w-8 mb-2" />

                                                    <span className="text-xs font-medium">
                                                        Upload Photo
                                                    </span>
                                                </div>
                                            )}

                                            <div
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                            >
                                                <span className="text-white text-sm font-medium">
                                                    Change
                                                </span>
                                            </div>
                                        </div>

                                        <div>

                                            <h3 className="text-lg font-medium text-slate-900">
                                                Profile Photo
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1 mb-3 max-w-md">
                                                Upload a high-quality photo of the team member.
                                                Recommended size is 400x500px.
                                            </p>

                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                                className="hidden"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                            >
                                                Change Image
                                            </button>

                                            {imageFile && (
                                                <p className="mt-2 text-xs text-green-600">
                                                    New image selected:{" "}
                                                    {imageFile.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* =================================================
                                        FORM
                                    ================================================= */}

                                    <div className="grid gap-6 md:grid-cols-2">

                                        {/* Full Name */}
                                        <div>

                                            <label className="mb-2 block font-medium text-slate-700">
                                                Full Name{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            <div className="relative">

                                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <Field
                                                    name="fullName"
                                                    type="text"
                                                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 outline-none focus:border-blue-500"
                                                />

                                            </div>

                                            <ErrorMessage
                                                name="fullName"
                                                component="p"
                                                className="mt-1 text-sm text-red-500"
                                            />
                                        </div>

                                        {/* Designation */}
                                        <div>

                                            <label className="mb-2 block font-medium text-slate-700">
                                                Designation (Role){" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            <div className="relative">

                                                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <Field
                                                    name="designation"
                                                    type="text"
                                                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 outline-none focus:border-blue-500"
                                                />

                                            </div>

                                            <ErrorMessage
                                                name="designation"
                                                component="p"
                                                className="mt-1 text-sm text-red-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mt-6">

                                        <label className="mb-2 block font-medium text-slate-700">
                                            Description{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <Field
                                            as="textarea"
                                            name="description"
                                            rows={4}
                                            placeholder="Enter a brief description or bio"
                                            className="w-full rounded-lg border border-slate-200 bg-white py-3 px-3 outline-none focus:border-blue-500 resize-none"
                                        />

                                        <ErrorMessage
                                            name="description"
                                            component="p"
                                            className="mt-1 text-sm text-red-500"
                                        />

                                    </div>

                                    {/* Status */}
                                    <div className="mt-8 border-t border-slate-100 pt-6">

                                        <label className="mb-3 block font-medium text-slate-700">
                                            Status on Website
                                        </label>

                                        <div className="flex gap-8">

                                            <label className="flex items-center gap-2 cursor-pointer">

                                                <Field
                                                    type="radio"
                                                    name="status"
                                                    value="Active"
                                                    className="h-4 w-4 text-blue-600"
                                                />

                                                <span className="text-slate-700">
                                                    Active (Visible)
                                                </span>

                                            </label>

                                            <label className="flex items-center gap-2 cursor-pointer">

                                                <Field
                                                    type="radio"
                                                    name="status"
                                                    value="Inactive"
                                                    className="h-4 w-4 text-slate-400"
                                                />

                                                <span className="text-slate-700">
                                                    Inactive (Hidden)
                                                </span>

                                            </label>

                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end bg-slate-50 p-4 -mx-8 -mb-8">

                                        <ResetButton
                                            onReset={() => {

                                                resetForm();

                                                setImageFile(null);

                                                setImagePreview(
                                                    team?.image
                                                        ? getImageUrl(team.image)
                                                        : null
                                                );

                                                if (
                                                    fileInputRef.current
                                                ) {
                                                    fileInputRef.current.value =
                                                        "";
                                                }
                                            }}
                                        />

                                        <SubmitButton
                                            text={
                                                updateLoading
                                                    ? "Updating..."
                                                    : "Update Member"
                                            }
                                            type="submit"
                                        />

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