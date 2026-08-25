"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    FiChevronDown,
    FiFileText,
    FiPlus,
    FiSearch,
    FiUploadCloud,
    FiUser,
    FiX,
} from "react-icons/fi";
import { FileText, Info, CheckCircle2, AlertTriangle, Save } from "lucide-react";
import { useParams } from "next/navigation";
import ResetButton from "@/Ui/buttons/ResetButton";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import toast from "react-hot-toast";
import PermissionGuard from "@/components/PermissionGuard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
    uploadReport,
    getReportsByUser, // ⚠️ path apne actual slice file ke hisaab se adjust karo
    type LabUserItem,
    type ReportData,
    updateReportMetric,
    finalSaveReport,
    deleteReportMetric,
    getLabUsers,
} from "@/redux/Api";
import DeleteConfirmModal from "./DeleteConfirmModalProps";
import { usePathname } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

type Step = "upload" | "review";

type Status = "verified" | "needs_review";

interface ResultRow {
    id: string;
    testName: string;
    value: string;
    unit: string;
    status: Status;
}

interface UploadedInfo {
    patientId: string;
    patientName: string;
    fileName: string;
}

// ⚠️ Yeh apne ACTUAL API response ke shape se replace karo.
// Neeche ek reasonable guess diya hai — jo bhi fields backend bhejta hai
// unke hisaab se isko update karna.
interface ReportTestItem {
    _id?: string;
    id?: string;
    testName?: string;
    test_name?: string;
    name?: string;
    value?: string | number;
    result?: string | number;
    unit?: string;
    status?: string;
}

interface GetReportsByUserResponse {
    data?: ReportTestItem[];
    reports?: ReportTestItem[];
    message?: string;
}

const validationSchema = Yup.object({
    patientId: Yup.string().required("Please select patient"),
});

/* ------------------------------------------------------------------ */
/*  HELPER — MAP API RESPONSE -> TABLE ROWS                            */
/* ------------------------------------------------------------------ */

function mapReportsToResults(
    reports: ReportData | ReportTestItem[] | null | undefined,
): ResultRow[] {
    if (!reports) return [];

    // Agar backend kabhi direct array bheje
    if (Array.isArray(reports)) {
        return reports.map((item, index) => ({
            id: String(item._id ?? item.id ?? index),
            testName: item.testName ?? item.test_name ?? item.name ?? "Unknown Test",
            value: String(item.value ?? item.result ?? ""),
            unit: item.unit ?? "",
            status:
                item.status === "verified" || item.status === "needs_review"
                    ? item.status
                    : "needs_review",
        }));
    }

    // Actual backend shape: { data: { matrics: [...] } }
    const metrics = reports.matrics ?? [];

    return metrics.map((item, index) => {
        const value = item.value?.value;

        return {
            id: String(item.report_metric_id ?? index),
            testName: item.name ?? item.metric_code ?? "Unknown Test",
            value: value !== undefined && value !== null ? String(value) : "",
            unit: item.unit ?? "",
            // locked: true -> Verified, locked: false -> Needs Review
            status: item.locked ? "verified" : "needs_review",
        };
    });
}
/* ------------------------------------------------------------------ */
/*  PARENT — CONTROLS WHICH STEP IS VISIBLE                            */
/* ------------------------------------------------------------------ */

export default function UploadReportFlow() {
    const [step, setStep] = useState<Step>("upload");
    const [uploadedInfo, setUploadedInfo] = useState<UploadedInfo | null>(null);

    return (
        <PermissionGuard moduleName="reports" permissionName="create_reports">
        <div className="min-h-screen overflow-hidden text-black p-5 md:p-12">
            {/* STEP INDICATOR */}
            <div className="flex flex-col gap-5 mb-8">
                <div className="flex items-center gap-3">

                    <div>
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                            Upload Report
                        </h1>

                        <p className="leading-relaxed font-light text-[#64748B]">
                            {step === "upload"
                                ? "Upload and manage patient reports"
                                : "Enter health details of the patient"}
                        </p>
                    </div>
                </div>

                {/* STEP INDICATOR */}
                <div className="flex items-center gap-3">
                    <div
                        className={`h-2 w-16 rounded-full ${step === "upload" ? "bg-black" : "bg-black/20"
                            }`}
                    />
                    <div
                        className={`h-2 w-16 rounded-full ${step === "review" ? "bg-black" : "bg-black/20"
                            }`}
                    />
                </div>
            </div>


            {step === "upload" ? (
                <UploadReportForm
                    onContinue={(info) => {
                        setUploadedInfo(info);
                        setStep("review");
                    }}
                />
            ) : (
                <ReviewResults
                    uploadedInfo={uploadedInfo}
                    onBack={() => setStep("upload")}
                    onReset={() => {
                        setUploadedInfo(null);
                        setStep("upload");
                    }}
                />
            )}
        </div>
        </PermissionGuard>
    );
}

/* ------------------------------------------------------------------ */
/*  STEP 1 — UPLOAD FORM                                               */
/* ------------------------------------------------------------------ */

function UploadReportForm({
    onContinue,
}: {
    onContinue: (info: UploadedInfo) => void;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();

    const basePath = pathname.startsWith("/lab-staff")
        ? "/lab-staff"
        : "/lab-admin";
    // ⚠️ Adjust "state.getAllUsers" / field names to match your redux slice.
    const { data: users, loading } = useSelector(
        (state: RootState) =>
            state.getLabUsers as {
                data: LabUserItem[];
                loading: boolean;
                error: string | null;
            }
    );
    const [patients, setPatients] = useState<LabUserItem[]>([]);
    const [search, setSearch] = useState("");
    const [isPatientOpen, setIsPatientOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const targetRole = pathname.startsWith("/lab-staff")
        ? "lab-staff"
        : "lab-admin";

    const patientDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(getLabUsers());
    }, [dispatch]);
    useEffect(() => {
        if (Array.isArray(users)) {
            setPatients(users);
        }
    }, [users]);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                patientDropdownRef.current &&
                !patientDropdownRef.current.contains(event.target as Node)
            ) {
                setIsPatientOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredPatients = useMemo(() => {
        return patients.filter(
            (patient) =>
                patient.name?.toLowerCase().includes(search.toLowerCase()) ||
                patient.phone?.includes(search),
        );
    }, [patients, search]);

    return (
        <div
            className="
        h-[calc(100vh-150px)]
        overflow-y-auto
        no-scrollbar
        rounded-4xl
        border
        border-black/10 bg-white/3
        p-4
        shadow-2xl
        backdrop-blur-xl
        sm:p-6
        xl:p-8
      "
        >
            {/* CARD HEADER */}
            <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-700">
                    <FiFileText className="text-2xl" />
                </div>

                <div>
                    <h2 className="text-md md:text-lg xl:text-xl font-medium">
                        Patient & Report Details
                    </h2>
                    <p className="mt-2 font-light text-[#64748B]">
                        Fill in the details below to upload a new report
                    </p>
                </div>
            </div>

            <Formik
                initialValues={{
                    patientId: "",
                    patientName: "",
                    reportFile: null as File | null,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        if (!values.reportFile) return;

                        const formData = new FormData();
                        formData.append("patientId", values.patientId);
                        formData.append("report", values.reportFile);

                        const resultAction = await dispatch(uploadReport(formData));

                        if (uploadReport.fulfilled.match(resultAction)) {
                            toast.success("Report uploaded successfully");

                            // ✅ Same page ke andar step 2 (Review) dikhao
                            onContinue({
                                patientId: values.patientId,
                                patientName: values.patientName,
                                fileName: values.reportFile.name,
                            });
                        } else {
                            toast.error(resultAction.payload as string);
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error("Something went wrong");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, errors, touched, setFieldValue, resetForm }) => {
                    const selectedPatient = patients.find(
                        (patient) => String(patient._id) === values.patientId,
                    );

                    return (
                        <Form className="mt-8">
                            {/* PATIENT DROPDOWN */}
                            <div className="grid gap-6">
                                <div className="relative" ref={patientDropdownRef}>
                                    <label className="mb-3 block font-medium text-black">
                                        Patient <span className="text-red-400">*</span>
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() => setIsPatientOpen(!isPatientOpen)}
                                        className={`
                      flex h-14 w-full items-center justify-between rounded-2xl border
                      bg-[#f7f7f7]/70 px-4 text-left transition-all
                      ${errors.patientId && touched.patientId
                                                ? "border-red-500/50"
                                                : "border-black/10 hover:border-cyan-700/40"
                                            }
                    `}
                                    >
                                        <div className="flex items-center text-sm gap-3">
                                            <FiUser className="text-[#64748B]" />
                                            <span
                                                className={
                                                    selectedPatient ? "text-black" : "text-[#64748B]"
                                                }
                                            >
                                                {selectedPatient ? selectedPatient.name : "Search patients"}
                                            </span>
                                        </div>
                                        <FiChevronDown className="text-[#64748B]" />
                                    </button>

                                    <ErrorMessage
                                        name="patientId"
                                        component="p"
                                        className="mt-2 text-red-400"
                                    />

                                    {isPatientOpen && (
                                        <div className="absolute z-50 mt-3 w-full rounded-3xl text-sm border border-black/10 bg-[#f7f7f7] p-4 shadow-2xl">
                                            <div className="relative">
                                                <FiSearch className="absolute left-4 top-1/2 text-sm -translate-y-1/2 text-[#64748B]" />
                                                <input
                                                    type="text"
                                                    placeholder="Search patient..."
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    className="h-12 w-full rounded-2xl border border-black/10 bg-[#f7f7f7] pl-11 pr-4 text-sm text-black outline-none"
                                                />
                                            </div>

                                            <Link
                                                href={`${basePath}/patients/add-patient`}
                                                className="mt-4 flex items-center gap-2 rounded-2xl bg-[#2f5ba5]/10 px-4 py-3 text-sm font-medium text-[#2f5ba5] transition-all hover:bg-[#2f5ba5]/20"
                                            >
                                                <FiPlus />
                                                Add New Patient
                                            </Link>

                                            <div className="mt-5">
                                                <p className="mb-4 font-medium uppercase text-[#64748B]">
                                                    Recent Patients
                                                </p>

                                                <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                                                    {loading ? (
                                                        <div className="rounded-2xl border border-dashed border-black/10 py-10 text-center text-[#64748B]">
                                                            Loading patients...
                                                        </div>
                                                    ) : filteredPatients.length > 0 ? (
                                                        filteredPatients.map((patient) => (
                                                            <button
                                                                key={patient._id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setFieldValue(
                                                                        "patientId",
                                                                        String(patient._id),
                                                                    );
                                                                    setFieldValue("patientName", patient.name);
                                                                    setIsPatientOpen(false);
                                                                }}
                                                                className="flex w-full items-center gap-4 rounded-2xl border border-transparent bg-white/3 p-3 text-left transition-all hover:border-cyan-700/20 hover:bg-[#2f5ba5]/10"
                                                            >
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-[#2f5ba5]/70 to-[#4a7bc9]/50 font-medium text-white">
                                                                    {patient.name?.slice(0, 2).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-medium text-black">
                                                                        {patient.name}
                                                                    </h3>
                                                                    <p className="mt-1 text-[#64748B]">
                                                                        {patient.phone}
                                                                    </p>
                                                                </div>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="rounded-2xl border border-dashed border-black/10 py-10 text-center text-[#64748B]">
                                                            No patient found
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* FILE UPLOAD */}
                            <div className="mt-4">
                                <label className="mb-3 block font-medium text-black">
                                    Upload Report File <span className="text-red-400">*</span>
                                </label>

                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragActive(true);
                                    }}
                                    onDragLeave={() => setDragActive(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDragActive(false);
                                        const file = e.dataTransfer.files?.[0];
                                        if (file) {
                                            if (file.type === "application/pdf") {
                                                setFieldValue("reportFile", file);
                                            } else {
                                                toast.error("Only PDF files are allowed");
                                            }
                                        }
                                    }}
                                    className={`
                    relative rounded-4xl border border-dashed bg-[#f7f7f7]/70 text-sm transition-all p-4
                    ${dragActive
                                            ? "border-cyan-700 bg-cyan-500/10"
                                            : errors.reportFile && touched.reportFile
                                                ? "border-red-500/50"
                                                : "border-black/10 hover:border-cyan-700/30"
                                        }
                  `}
                                >
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        id="reportFile"
                                        onChange={(e) => {
                                            const file = e.currentTarget.files?.[0];
                                            if (file) {
                                                if (file.type === "application/pdf") {
                                                    setFieldValue("reportFile", file);
                                                } else {
                                                    toast.error("Only PDF files are allowed");
                                                    e.currentTarget.value = "";
                                                }
                                            }
                                        }}
                                    />

                                    <label htmlFor="reportFile" className="block cursor-pointer">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-700">
                                                <FiUploadCloud className="text-2xl" />
                                            </div>
                                            <h3 className="mt-4 text-sm font-medium text-black">
                                                Drag and drop your file here
                                            </h3>
                                            <p className="mt-3 text-[#64748B]">
                                                Or click to browse report file
                                            </p>
                                            <p className="mt-4 text-sm text-[#64748B]">
                                                Supports PDF files up to 5MB
                                            </p>
                                        </div>
                                    </label>

                                    {values.reportFile && (
                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-700/20 bg-cyan-500/10 p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-700">
                                                    <FiFileText className="text-2xl" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-black">
                                                        {values.reportFile.name}
                                                    </h4>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setFieldValue("reportFile", null)}
                                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition-all hover:bg-red-500/20"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <ErrorMessage
                                    name="reportFile"
                                    component="p"
                                    className="mt-2 text-red-400"
                                />

                                <div className="mt-4 flex text-sm flex-wrap items-center justify-between gap-3 text-[#64748B]">
                                    <p>Accepted formats: PDF</p>
                                    <p>Maximum file size: 5MB</p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 sm:flex-row sm:justify-end">
                                <ResetButton onReset={() => resetForm()} />
                                <SubmitButton text="Continue" type="submit"></SubmitButton>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  STEP 2 — REVIEW RESULTS                                            */
/* ------------------------------------------------------------------ */

function ReviewResults({
    uploadedInfo,
    onBack,
    onReset,
}: {
    uploadedInfo: UploadedInfo | null;
    onBack: () => void;
    onReset: () => void;
}) {
    const dispatch = useDispatch<AppDispatch>();

    // ⚠️ store.ts me jo key di hai wahi yahan use karo: Getreport: ReportReducer
    const { reports, loading, error } = useSelector(
        (state: RootState) =>
            state.Getreport as {
                reports: ReportData | null;
                loading: boolean;
                error?: string | null;
            },
    );

    // ✅ Sirf data-fetch trigger karne ke liye effect — yeh theek hai
    // kyunki iske andar setState nahi ho raha, sirf dispatch ho raha hai.
    useEffect(() => {
        if (uploadedInfo?.patientId) {
            dispatch(getReportsByUser(uploadedInfo.patientId));
        }
    }, [dispatch, uploadedInfo?.patientId]);

    // ✅ "Adjusting state when a prop/store value changes" pattern:
    // effect ke bajaye render ke dauraan hi state adjust karte hain.
    // Isse cascading effect-triggered renders nahi hote (lint clean).
    const [prevReports, setPrevReports] = useState(reports);
    const [results, setResults] = useState<ResultRow[]>(() =>
        mapReportsToResults(reports),
    );

    if (reports !== prevReports) {
        setPrevReports(reports);
        setResults(mapReportsToResults(reports));
    }

    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    const verifiedCount = useMemo(
        () => results.filter((r) => r.status === "verified").length,
        [results],
    );
    const needsReviewCount = useMemo(
        () => results.filter((r) => r.status === "needs_review").length,
        [results],
    );

    const deleteTarget = results.find((r) => r.id === deleteTargetId) ?? null;

    function handleValueChange(id: string, value: string) {
        setResults((prev) => prev.map((r) => (r.id === id ? { ...r, value } : r)));
    }

    const handleEditToggle = async (id: string) => {
        const row = results.find((r) => r.id === id);

        if (!row) return;

        // Agar already edit mode me hai to Done click hua hai
        if (editingId === id) {
            try {
                const metric = reports?.matrics?.find(
                    (item) => item.report_metric_id === id
                );

                if (!metric) return;
                if (!reports) return;
                const result = await dispatch(
                    updateReportMetric({
                        reportId: reports._id,
                        report_metric_id: metric.report_metric_id,
                        metric_code: metric.metric_code,
                        value: row.value,
                        unit: metric.unit,
                        ref_range: metric.ref_range,
                        taken_at: metric.taken_at
                            ? new Date(metric.taken_at)
                            : new Date(),
                    })
                );

                if (updateReportMetric.fulfilled.match(result)) {
                    toast.success("Metric updated successfully");
                    if (uploadedInfo?.patientId) {
                        await dispatch(getReportsByUser(uploadedInfo.patientId));
                    }

                    setEditingId(null);
                } else {
                    toast.error(result.payload as string);
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to update metric");
            }

            setEditingId(null);
        } else {
            setEditingId(id);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTargetId || !reports?._id) return;

        try {
            const result = await dispatch(
                deleteReportMetric({
                    reportId: reports._id,
                    report_metric_id: deleteTargetId,
                })
            );

            if (deleteReportMetric.fulfilled.match(result)) {
                toast.success("Metric deleted successfully");

                // Close modal
                setDeleteTargetId(null);

                // Refresh report
                if (uploadedInfo?.patientId) {
                    await dispatch(getReportsByUser(uploadedInfo.patientId));
                }
            } else {
                toast.error(result.payload as string);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete metric");
        }
    };

    function handleRescan() {
        console.log("Re-scan requested for:", deleteTarget?.testName);

        setDeleteTargetId(null);
        onReset(); // Upload screen (Step 1)
    }

    const handleSave = async () => {
        if (!reports?._id) {
            toast.error("Report not found");
            return;
        }

        try {
            const result = await dispatch(
                finalSaveReport({
                    reportId: reports._id,
                    final_save: true,
                })
            );

            if (finalSaveReport.fulfilled.match(result)) {
                toast.success("Results approved successfully");

                // Optional: latest data reload
                if (uploadedInfo?.patientId) {
                    dispatch(getReportsByUser(uploadedInfo.patientId));
                }
                onReset();
            } else {
                toast.error(result.payload as string);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50">
                        <FileText className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                        <h2 className="text-md md:text-lg xl:text-xl font-medium">
                            Review Extracted Results
                        </h2>
                        <p className="mt-2 font-light text-[#64748B]">

                            {uploadedInfo?.patientName
                                ? `Patient: ${uploadedInfo.patientName}`
                                : "Review and confirm the values extracted from your report."}
                            {uploadedInfo?.fileName ? ` · ${uploadedInfo.fileName}` : ""}
                        </p>
                    </div>
                </div>

                <div className="flex flex-shrink-0 gap-2">
                    <span className="flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        {verifiedCount} Verified
                    </span>
                    <span className="flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700">
                        <AlertTriangle className="h-4 w-4" />
                        {needsReviewCount} Need Review
                    </span>
                </div>
            </div>

            {/* Info banner */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                <div>
                    <p className="text-sm font-medium text-gray-900">Review your results</p>
                    <p className="text-sm text-gray-600">
                        Please review each value below. You can edit any incorrect values
                        before saving.
                    </p>
                </div>
            </div>

            {/* Loading state */}
            {loading && (
                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-10 text-center">
                    <p className="text-sm text-[#64748B]">Loading extracted report results...</p>
                </div>
            )}

            {/* Error state */}
            {!loading && error && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            Couldn&apos;t load results
                        </p>
                        <p className="text-sm text-gray-600">{error}</p>
                    </div>
                </div>
            )}

            {/* Table */}
            {!loading && !error && (
                <>
                    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full min-w-[640px] border-collapse text-left">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-medium uppercase tracking-wide text-[#64748B]">
                                    <th className="px-5 py-3.5 text-left font-medium text-black">Test Name</th>
                                    <th className="px-5 py-3.5 text-left font-medium text-black">Your Value</th>
                                    <th className="px-5 py-3.5 text-left font-medium text-black">Unit</th>
                                    <th className="px-5 py-3.5 text-left font-medium text-black">Status</th>
                                    <th className="px-5 py-3.5 text-left font-medium text-black">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-10 text-center text-sm text-[#64748B]"
                                        >
                                            No results found for this patient.
                                        </td>
                                    </tr>
                                ) : (
                                    results.map((row) => {
                                        const needsReview = row.status === "needs_review";
                                        const isEditing = editingId === row.id;
                                        const inputDisabled = !needsReview || !isEditing;

                                        return (
                                            <tr
                                                key={row.id}
                                                className={`border-b border-gray-100 last:border-b-0 ${needsReview ? "bg-amber-50/60" : ""
                                                    }`}
                                            >
                                                <td className="px-5 py-4 text-sm text-gray-800">
                                                    {row.testName}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <input
                                                        type="text"
                                                        value={row.value}
                                                        disabled={inputDisabled}
                                                        onChange={(e) =>
                                                            handleValueChange(row.id, e.target.value)
                                                        }
                                                        className={`w-32 rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${inputDisabled
                                                            ? "cursor-not-allowed border-gray-200 bg-gray-50 text-[#64748B]"
                                                            : "border-teal-400 bg-white text-gray-900 ring-2 ring-teal-100 focus:border-teal-500"
                                                            }`}
                                                    />
                                                </td>
                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {row.unit}
                                                </td>
                                                <td className="px-5 py-4">
                                                    {needsReview ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-md bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700">
                                                            <AlertTriangle className="h-3.5 w-3.5" />
                                                            Needs Review
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                            Verified
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-4">
                                                    {needsReview ? (
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEditToggle(row.id)}
                                                                className={`text-sm font-medium ${isEditing
                                                                    ? "flex items-center gap-1 text-teal-600 hover:text-teal-700"
                                                                    : "text-blue-600 hover:text-blue-700"
                                                                    }`}
                                                            >
                                                                {isEditing ? (
                                                                    <>
                                                                        <Save className="h-3.5 w-3.5" />
                                                                        Done
                                                                    </>
                                                                ) : (
                                                                    "Edit"
                                                                )}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteTargetId(row.id)}
                                                                className="rounded-md p-1.5 text-red-500 hover:bg-red-50"
                                                                aria-label={`Delete ${row.testName}`}
                                                            >
                                                                <Trash2Icon />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-[#64748B]">—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-3 text-sm text-[#64748B]">
                        Showing {results.length} of {results.length} results
                    </p>

                    {/* Footer status */}
                    {results.length > 0 &&
                        (needsReviewCount === 0 ? (
                            <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5">
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">All good!</p>
                                    <p className="text-sm text-gray-600">
                                        {verifiedCount} results verified. You can save them to your
                                        health profile.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-6 flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3.5">
                                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-600" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        Almost there
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {needsReviewCount} result{needsReviewCount > 1 ? "s" : ""}{" "}
                                        still need{needsReviewCount === 1 ? "s" : ""} your review
                                        before saving.
                                    </p>
                                </div>
                            </div>
                        ))}
                </>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onBack}
                    className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Back
                </button>
                <button
                    type="button"
                    disabled={needsReviewCount > 0 || results.length === 0}
                    onClick={handleSave}
                    className="
    group relative px-6 py-3 sm:px-7 sm:py-2.5 lg:px-8 lg:py-3
    rounded-full text-white overflow-hidden
    text-xs sm:text-sm lg:text-base
    bg-linear-to-r from-[#7CC4FF] to-[#85BDF8]
    min-w-40
    before:absolute before:inset-0 before:rounded-full
    before:p-px
    before:bg-linear-to-r before:from-[#0F61B3] before:to-[#6AA2E5]/10
    before:content-['']
    transition-all duration-300
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
                >
                    {/* Inner Background */}
                    <span className="absolute inset-0.5 rounded-full border bg-linear-to-r from-[#2F5BA5]/70 to-[#4A7BC9]/30"></span>

                    {/* Button Text */}
                    <span className="relative z-10">
                        Save Approved Results ({verifiedCount})
                    </span>
                </button>
            </div>

            <p className="mt    -4 text-xs text-[#64748B]">
                You can edit values marked as &apos;Needs Review&apos; before saving.
            </p>

            {/* Delete confirmation modal */}
            <DeleteConfirmModal
                isOpen={deleteTargetId !== null}
                testName={deleteTarget?.testName ?? ""}
                onDelete={handleDeleteConfirm}
                onRescan={handleRescan}
                onCancel={() => setDeleteTargetId(null)}
            />
        </div>
    );
}

function Trash2Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
    );
}