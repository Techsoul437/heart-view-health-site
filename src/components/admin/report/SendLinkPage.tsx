"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FiArrowLeft,
  FiSend,
  FiRefreshCw,
  FiUser,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { sendReportLink, getReportDetails } from "@/redux/Api";
import { resetSendReportLink } from "@/redux/Slice/SendReportLinkSlice";
import PermissionGuard from "@/components/PermissionGuard";

interface ReportItem {
  id: string; // was: number — IDs are ObjectId-style strings
  patientId: string; // was: number
  patientName: string;
  notes: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileData: string;
  fileUrl?: string;
  createdAt: string;
  role: string;
  mobile?: string;
  email?: string;
}

interface SentLink {
  id: string;
  reportId: string; // was: number
  patientName: string;
  patientInitials: string;
  mobile: string;
  maskedMobile: string;
  status: "Sent" | "Viewed" | "Downloaded" | "Failed";
  sentOn: string;
  sentTime: string;
  expireOn: string;
  expireTime: string;
  linkUrl: string;
  viewed: boolean;
  downloaded: boolean;
}

function generateLink(reportId: string): string {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `https://heartviewhealth.com/report/${code}${reportId}`;
}

function maskMobile(mobile: string): string {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length < 6) return mobile;
  return digits.slice(0, 4) + "****" + digits.slice(-3);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function addDays(days: number): { date: string; time: string } {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time };
}

function formatFileSize(bytes: number): string {
  if (!bytes) return "";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// NEW: estimate file size (in bytes) from a base64 string
function getBase64Size(base64: string): number {
  if (!base64) return 0;
  // strip data URL prefix if present, e.g. "data:application/pdf;base64,...."
  const cleaned = base64.includes(",") ? base64.split(",")[1] : base64;
  const padding = (cleaned.match(/=+$/) || [""])[0].length;
  return (cleaned.length * 3) / 4 - padding;
}

const validationSchema = Yup.object({
  patientName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Patient name is required"),
  deliveryMethod: Yup.string().oneOf(["mobile", "email"]).required(),
  mobile: Yup.string().when("deliveryMethod", {
    is: "mobile",
    then: (schema) =>
      schema
        .matches(/^[+]?[\d\s\-()]{10,15}$/, "Enter a valid mobile number")
        .required("Mobile number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  email: Yup.string().when("deliveryMethod", {
    is: "email",
    then: (schema) =>
      schema.email("Enter a valid email address").required("Email is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  expiryDays: Yup.number()
    .min(1, "Minimum 1 day")
    .max(30, "Maximum 30 days")
    .required("Expiry is required"),
  message: Yup.string().max(200, "Message too long (max 200 characters)"),
});

export default function SendLinkPage() {
  const params = useParams();
  const router = useRouter();
  // FIX: id is a string (ObjectId-style), not a number — Number(params.id) was NaN
  const reportId = params.id as string;

  const [report, setReport] = useState<ReportItem | null>(null);
  const [sentStatus, setSentStatus] = useState<"idle" | "sending" | "sent" | "resend">("idle");
  const [existingLink, setExistingLink] = useState<SentLink | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [notFound, setNotFound] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { loading, success, error, data } = useSelector(
    (state: RootState) => state.sendReportLink
  );

  const {
    loading: reportLoading,
    success: reportSuccess,
    data: reportData,
  } = useSelector((state: RootState) => state.getReportDetails);

  useEffect(() => {
    if (reportId) {
      dispatch(getReportDetails(reportId));
      dispatch(resetSendReportLink());
    }
  }, [dispatch, reportId]);

  useEffect(() => {
    if (!reportSuccess || !reportData) return;

    const rawReport = reportData.report || {};
    const rawUser = reportData.user || {};

    // Prefer size from API if it exists (common keys: fileSize, size, fileSizeInBytes)
    const apiFileSize =
      rawReport.fileSize ?? rawReport.size ?? rawReport.fileSizeInBytes ?? 0;

    // If API doesn't give a size, estimate it from the base64 fileData
    const computedFileSize =
      apiFileSize && apiFileSize > 0
        ? apiFileSize
        : getBase64Size(rawReport.fileData || "");

    // Fallback file name: patientName.pdf if API doesn't send one
    const fallbackName = rawUser.name
      ? `${rawUser.name}.${(rawReport.fileType || "pdf").replace(".", "")}`
      : "report.pdf";

    const report: ReportItem = {
      id: rawReport._id,
      patientId: rawUser._id || "",
      patientName: rawUser.name || "",
      mobile: rawUser.phone || "",
      email: rawUser.email || "",
      notes: "",
      fileName: rawReport.filename || "",
      fileType: rawReport.fileType || "",
      fileSize: computedFileSize,
      fileData: rawReport.fileData || "",
      fileUrl: rawReport.fileUrl || "",
      createdAt: rawReport.createdAt || "",
      role: rawReport.Role || "",
    };

    setReport(report);

    const sentLinks: SentLink[] = JSON.parse(
      localStorage.getItem("staff-sent-links") || "[]"
    );

    const existing = sentLinks.find((l) => l.reportId === reportId);

    if (existing) {
      setExistingLink(existing);
      setGeneratedUrl(existing.linkUrl);
      setSentStatus("resend");
    } else {
      setGeneratedUrl(generateLink(reportId));
    }
  }, [reportSuccess, reportData, reportId]);

  // Side-effect only: toast + WhatsApp/Email sending logic is handled by backend.
  useEffect(() => {
    if (success && sentStatus !== "sent") {
      toast.success("Report link sent successfully.");
      setSentStatus("sent");
    }

    if (error && sentStatus !== "idle") {
      toast.error(error);
      setSentStatus("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error, data, sentStatus]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      deliveryMethod: "mobile",
      patientName: report?.patientName || "",
      mobile: report?.mobile || "",
      email: report?.email || "",
      expiryDays: 30,
      message:
        "Your medical report is ready. Please use the secure link below to view or download it.",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!report) return;

      setSentStatus("sending");

      dispatch(
        sendReportLink({
          reportId: report.id,
          patientId: report.patientId,
          mobile: values.deliveryMethod === "mobile" ? values.mobile : undefined,
          email: values.deliveryMethod === "email" ? values.email : undefined,
          expiryDays: values.expiryDays,
        })
      );
    },
  });

  // Derived value instead of syncing Redux data into local state via effect
  const displayUrl = data?.linkUrl || existingLink?.linkUrl || generatedUrl;

  const isFieldError = (field: keyof typeof formik.values) =>
    formik.touched[field] && Boolean(formik.errors[field]);

  const inputClass = (field: keyof typeof formik.values) =>
    `w-full rounded-2xl border px-4 py-3  outline-none transition ${
      isFieldError(field)
        ? "border-red-400 bg-red-50 focus:border-red-500"
        : "border-black/10 bg-white focus:border-[#2f5ba5]/50"
    }`;

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 md:p-12">
        <div className="text-center">
          <FiAlertCircle className="mx-auto text-5xl text-[#64748B] mb-4" />
          <h2 className="text-xl font-medium text-black">Report Not Found</h2>
          <p className="text-[#64748B] mt-2">
            The report you are looking for does not exist.
          </p>
          <Link
            href="/lab-staff/reports"
            className="mt-4 inline-flex items-center gap-2 text-[#2f5ba5] hover:underline"
          >
            <FiArrowLeft /> Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  if (!report) {
    // Still loading from localStorage — avoid flashing "Not Found" before check completes
    return null;
  }

  const newLocal = sentStatus === "sending";
  return (
    <PermissionGuard moduleName="report_links" permissionName="create_send_link">
    <div className="min-h-screen p-5 md:p-12">
      {/* Header */}

      <div className="mb-8 flex items-start gap-4">
        <button onClick={() => router.back()} className="mt-2 text-xl">
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
            Send Report Link
          </h1>

          <p className="mt-1 text-[#64748B] leading-relaxed font-light">
            Share secure report access with patient
          </p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Patient Details */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 lg:col-span-2">
            <h2 className="text-md md:text-lg xl:text-xl font-medium">
              Patient Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Delivery Method */}
              <div className="md:col-span-2">
                <label className="text-black mb-1.5 block">
                  Delivery Method <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="mobile"
                      checked={formik.values.deliveryMethod === "mobile"}
                      onChange={formik.handleChange}
                      className="w-4 h-4 text-[#2f5ba5]"
                    />
                    <span>Mobile (WhatsApp/SMS)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="email"
                      checked={formik.values.deliveryMethod === "email"}
                      onChange={formik.handleChange}
                      className="w-4 h-4 text-[#2f5ba5]"
                    />
                    <span>Email</span>
                  </label>
                </div>
              </div>

              {/* Patient Name */}
              <div>
                <label className=" text-black mb-1.5 block">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="text"
                    name="patientName"
                    value={formik.values.patientName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Patient name"
                    className={`${inputClass("patientName")} pl-10`}
                  />
                </div>
                {isFieldError("patientName") && (
                  <p className="mt-1  text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {formik.errors.patientName as string}
                  </p>
                )}
              </div>

              {/* Mobile or Email */}
              {formik.values.deliveryMethod === "mobile" ? (
                <div>
                  <label className=" text-black mb-1.5 block">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                      type="text"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="+91 XXXXX XXXXX"
                      className={`${inputClass("mobile")} pl-10`}
                    />
                  </div>
                  {isFieldError("mobile") && (
                    <p className="mt-1  text-red-500 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formik.errors.mobile as string}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className=" text-black mb-1.5 block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="patient@example.com"
                      className={`${inputClass("email")} pl-10`}
                    />
                  </div>
                  {isFieldError("email") && (
                    <p className="mt-1  text-red-500 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formik.errors.email as string}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Report File (read-only) */}
            <div className="mt-5">
              <label className=" text-black block mb-1.5">Report File</label>
              <div className="rounded-2xl border border-black/10 bg-slate-50 p-4  text-slate-700">
                {report?.fileName || "—"}
                {report?.fileSize
                  ? ` • ${formatFileSize(report.fileSize)}`
                  : ""}
              </div>
            </div>

            {/* Expiry Days */}
            <div className="mt-5">
              <label className=" text-black block mb-1.5">
                Link Expiry (days) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="expiryDays"
                value={formik.values.expiryDays}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min={1}
                max={30}
                className={inputClass("expiryDays")}
              />
              {isFieldError("expiryDays") && (
                <p className="mt-1  text-red-500 flex items-center gap-1">
                  <FiAlertCircle size={12} />
                  {formik.errors.expiryDays}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mt-5">
              <label className=" text-black block mb-1.5">
                Message to Patient
              </label>
              <textarea
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
                className={`${inputClass("message")} resize-none`}
              />
              {isFieldError("message") && (
                <p className="mt-1  text-red-500 flex items-center gap-1">
                  <FiAlertCircle size={12} />
                  {formik.errors.message}
                </p>
              )}
            </div>

            {/* Secure Link */}
            <div className="mt-5">
              <label className=" text-black block mb-1.5">
                Secure Report Link
              </label>
              <div className="rounded-2xl border border-black/10 bg-slate-50 p-4  break-all text-slate-600 select-all">
                {displayUrl}
              </div>
            </div>
          </div>

          {/* Actions + Timeline */}
          <div className="rounded-3xl border border-black/5 bg-white p-6">
            <h2 className="text-lg font-medium text-black">Actions</h2>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="submit"
                disabled={sentStatus === "sending"}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#2f5ba5] py-3 text-white transition hover:opacity-90 disabled:opacity-60"
              >
                <FiSend />
                {sentStatus === "sending"
                  ? "Sending..."
                  : sentStatus === "sent"
                  ? "Link Sent ✓"
                  : "Send Link"}
              </button>

              {(sentStatus === "resend" || sentStatus === "sent") && (
                <button
                  type="submit"
                  disabled={newLocal}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-black/10 py-3 text-black hover:bg-slate-50 disabled:opacity-60"
                >
                  <FiRefreshCw />
                  Resend Link
                </button>
              )}

              <button
                type="button"
                onClick={() => router.push("/lab-staff/report_link")}
                className="flex items-center justify-center gap-2 rounded-2xl border border-black/10 py-3 text-slate-600 hover:bg-slate-50 "
              >
                View All Sent Links
              </button>
            </div>

            {/* Timeline */}
            <div className="mt-8">
              <h3 className="font-medium text-black">Delivery Timeline</h3>
              <div className="mt-5 flex flex-col gap-3">
                <div
                  className={`flex items-center gap-3 ${
                    displayUrl ? "text-green-600" : "text-[#64748B]"
                  }`}
                >
                  <FiCheckCircle />
                  <span className="text-sm">Link Generated</span>
                </div>

                <div
                  className={`flex items-center gap-3 ${
                    sentStatus === "sent" || sentStatus === "resend"
                      ? "text-green-600"
                      : "text-[#64748B]"
                  }`}
                >
                  <FiCheckCircle />
                  <span className="text-sm">Message Sent</span>
                </div>

                <div
                  className={`flex items-center gap-3 ${
                    existingLink?.viewed ? "text-green-600" : "text-[#64748B]"
                  }`}
                >
                  <FiCheckCircle />
                  <span className="text-sm">Viewed By Patient</span>
                </div>

                <div
                  className={`flex items-center gap-3 ${
                    existingLink?.downloaded
                      ? "text-green-600"
                      : "text-[#64748B]"
                  }`}
                >
                  <FiCheckCircle />
                  <span className="text-sm">Downloaded Report</span>
                </div>
              </div>
            </div>

            {/* Sent info */}
            {existingLink && (
              <div className="mt-8 rounded-2xl bg-green-50 p-4  text-green-700">
                <p className="font-medium text-sm">Last Sent</p>
                <p className="mt-1 text-sm text-green-600">
                  {existingLink.sentOn} at {existingLink.sentTime}
                </p>
                <p className="mt-1 text-sm text-green-600">
                  Expires: {existingLink.expireOn}
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
    </PermissionGuard>
  );
}