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
  FiFileText,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";

interface ReportItem {
  id: number;
  patientId: number;
  patientName: string;
  reportType: string;
  testDate: string;
  notes: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileData: string;
  createdAt: string;
  mobile?: string;
}

interface SentLink {
  id: string;
  reportId: number;
  patientName: string;
  patientInitials: string;
  report: string;
  date: string;
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

function generateLink(reportId: number): string {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `https://heartview.app/report/${code}${reportId}`;
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

const validationSchema = Yup.object({
  patientName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Patient name is required"),
  mobile: Yup.string()
    .matches(/^[+]?[\d\s\-()]{10,15}$/, "Enter a valid mobile number")
    .required("Mobile number is required"),
  reportType: Yup.string().required("Report type is required"),
  testDate: Yup.string().required("Test date is required"),
  expiryDays: Yup.number()
    .min(1, "Minimum 1 day")
    .max(30, "Maximum 30 days")
    .required("Expiry is required"),
  message: Yup.string().max(200, "Message too long (max 200 characters)"),
});

export default function SendLinkPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = Number(params.id);

  const [report, setReport] = useState<ReportItem | null>(null);
  const [sentStatus, setSentStatus] = useState<"idle" | "sending" | "sent" | "resend">("idle");
  const [existingLink, setExistingLink] = useState<SentLink | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState("");

  useEffect(() => {
    // Load report from localStorage
    const stored = localStorage.getItem("staff-reports");
    if (stored) {
      const reports: ReportItem[] = JSON.parse(stored);
      const found = reports.find((r) => r.id === reportId);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (found) setReport(found);
    }

    // Check if link was already sent for this report
    const sentLinks: SentLink[] = JSON.parse(
      localStorage.getItem("staff-sent-links") || "[]"
    );
    const existing = sentLinks.find((l) => l.reportId === reportId);
    if (existing) {
      setExistingLink(existing);
      setGeneratedUrl(existing.linkUrl);
      setSentStatus("resend");
    } else {
      const url = generateLink(reportId);
      setGeneratedUrl(url);
    }
  }, [reportId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      patientName: report?.patientName || "",
      mobile: report?.mobile || "",
      reportType: report?.reportType || "",
      testDate: report?.testDate || "",
      expiryDays: 10,
      message: "Your medical report is ready. Please use the secure link below to view or download it.",
    },
    validationSchema,
    onSubmit: (values) => {
      setSentStatus("sending");

      setTimeout(() => {
        const now = new Date();
        const sentOn = now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const sentTime = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const { date: expireOn, time: expireTime } = addDays(values.expiryDays);

        const newLink: SentLink = {
          id: existingLink?.id || `link_${Date.now()}`,
          reportId,
          patientName: values.patientName,
          patientInitials: getInitials(values.patientName),
          report: values.reportType,
          date: values.testDate,
          mobile: values.mobile,
          maskedMobile: maskMobile(values.mobile),
          status: "Sent",
          sentOn,
          sentTime,
          expireOn,
          expireTime,
          linkUrl: generatedUrl,
          viewed: false,
          downloaded: false,
        };

        // Save / update in localStorage
        const existing: SentLink[] = JSON.parse(
          localStorage.getItem("staff-sent-links") || "[]"
        );
        const filtered = existing.filter((l) => l.reportId !== reportId);
        localStorage.setItem(
          "staff-sent-links",
          JSON.stringify([newLink, ...filtered])
        );

        setExistingLink(newLink);
        setSentStatus("sent");
        toast.success("Report link sent successfully");
      }, 1200);
    },
  });

  const isFieldError = (field: keyof typeof formik.values) =>
    formik.touched[field] && Boolean(formik.errors[field]);

  const inputClass = (field: keyof typeof formik.values) =>
    `w-full rounded-2xl border px-4 py-3  outline-none transition ${isFieldError(field)
      ? "border-red-400 bg-red-50 focus:border-red-500"
      : "border-black/10 bg-white focus:border-[#2f5ba5]/50"
    }`;

  if (!report && typeof window !== "undefined") {
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

  const newLocal = sentStatus === "sending";
  return (
    <div className="min-h-screen p-5 md:p-12">
      {/* Header */}

      <div className="mb-8 flex items-start gap-4">
        <button
          onClick={() => router.back()}
          className="mt-2 text-xl"
        >
          <FiArrowLeft />
        </button>

        <div>
                             <h1 className="text-2xl md:text-3xl lg:text-4xl  font-normal tracking-tight text-black">

            Send Report Link
          </h1>

          <p className="mt-1 text-[#64748B] text-base sm:text-lg  leading-relaxed  font-light">
            Share secure report access with patient
          </p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Patient Details */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 lg:col-span-2">
                              <h2 className="text-2xl font-medium">

              Patient Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
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
                    {formik.errors.patientName}
                  </p>
                )}
              </div>

              {/* Mobile */}
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
                    {formik.errors.mobile}
                  </p>
                )}
              </div>

              {/* Report Type */}
              <div>
                <label className=" text-black mb-1.5 block">
                  Report Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiFileText className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="text"
                    name="reportType"
                    value={formik.values.reportType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g. Lipid Profile"
                    className={`${inputClass("reportType")} pl-10`}
                  />
                </div>
                {isFieldError("reportType") && (
                  <p className="mt-1  text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {formik.errors.reportType}
                  </p>
                )}
              </div>

              {/* Test Date */}
              <div>
                <label className=" text-black mb-1.5 block">
                  Test Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="text"
                    name="testDate"
                    value={formik.values.testDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g. 12 May 2025"
                    className={`${inputClass("testDate")} pl-10`}
                  />
                </div>
                {isFieldError("testDate") && (
                  <p className="mt-1  text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {formik.errors.testDate}
                  </p>
                )}
              </div>
            </div>

            {/* Report File (read-only) */}
            <div className="mt-5">
              <label className=" text-black block mb-1.5">
                Report File
              </label>
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
                {generatedUrl}
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
              <div className="mt-5 flex flex-col gap-5">
                <div
                  className={`flex items-center gap-3 ${generatedUrl ? "text-green-600" : "text-[#64748B]"
                    }`}
                >
                  <FiCheckCircle />
                  <span className="">Link Generated</span>
                </div>

                <div
                  className={`flex items-center gap-3 ${sentStatus === "sent" || sentStatus === "resend"
                      ? "text-green-600"
                      : "text-[#64748B]"
                    }`}
                >
                  <FiCheckCircle />
                  <span className="">Message Sent</span>
                </div>

                <div
                  className={`flex items-center gap-3 ${existingLink?.viewed ? "text-green-600" : "text-[#64748B]"
                    }`}
                >
                  <FiCheckCircle />
                  <span className="">Viewed By Patient</span>
                </div>

                <div
                  className={`flex items-center gap-3 ${existingLink?.downloaded
                      ? "text-green-600"
                      : "text-[#64748B]"
                    }`}
                >
                  <FiCheckCircle />
                  <span className="">Downloaded Report</span>
                </div>
              </div>
            </div>

            {/* Sent info */}
            {existingLink && (
              <div className="mt-8 rounded-2xl bg-green-50 p-4  text-green-700">
                <p className="font-medium">Last Sent</p>
                <p className="mt-1 text-green-600">
                  {existingLink.sentOn} at {existingLink.sentTime}
                </p>
                <p className="mt-1 text-green-600">
                  Expires: {existingLink.expireOn}
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}