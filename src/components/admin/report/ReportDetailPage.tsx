"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Image from "next/image";
import { getReportById } from "@/redux/Api";
import type { AppDispatch, RootState } from "@/redux/store"
import { useDispatch,useSelector  } from "react-redux";


export default function ReportDetailPage() {
    const params = useParams();
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();

    const { report, loading } = useSelector(
        (state: RootState) => state.getReportById
    );
    const currentRole = pathname.startsWith("/lab-admin")
        ? "lab-admin"
        : "lab-staff";

    useEffect(() => {
        if (!params.id) return;

        dispatch(getReportById(params.id as string));
    }, [dispatch, params.id]);
    const [sourceUrl, setSourceUrl] = useState<string>("");

    useEffect(() => {
        if (!report) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSourceUrl(report.fileUrl || "");
    }, [report]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!report) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Report Not Found
            </div>
        );
    }
    const altText = report.fileName || report.filename || "Report Preview";

    // If it's our frontend report link, we want to just iframe it.
    // It's technically an HTML page now, not just a PDF, but iframe handles it perfectly.
    let isPdf = false;
    let isImage = false;

    if (sourceUrl.startsWith("http")) {
        // If it's the heartviewhealth.com/report/ link, treat it as a document to be iframed
        if (sourceUrl.includes("/report/")) {
            isPdf = true; 
        } else {
            const urlWithoutQuery = sourceUrl.split("?")[0] || "";
            const extension =
                urlWithoutQuery.split(".").pop()?.toLowerCase() ||
                report.fileName?.split(".").pop()?.toLowerCase() ||
                report.filename?.split(".").pop()?.toLowerCase() ||
                report.fileType?.toLowerCase() ||
                "";
            isPdf = extension === "pdf" || extension === "application/pdf";
            isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(extension) || extension.startsWith("image/");
        }
    } else if (sourceUrl.startsWith("data:application/pdf")) {
        isPdf = true;
    } else if (sourceUrl.startsWith("data:image/")) {
        isImage = true;
    }
    
    // We only render Image/Iframe if there is an actual source URL
    const hasValidSource = Boolean(sourceUrl);

    return (
        <div className="min-h-screen  p-6 md:p-12">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <Link
                    href={`/${currentRole}/reports`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100"
                >
                    <ArrowLeft size={20} />
                </Link>

                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        Report Details
                    </h1>
                    <p className="text-gray-500">
                        Report Preview
                    </p>
                </div>
            </div>

            {/* Preview Section */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                    <FileText
                        size={20}
                        className="text-blue-600"
                    />
                    <h2 className="text-xl font-semibold text-black">
                        Report Preview
                    </h2>
                </div>

                {hasValidSource && isPdf && (
                    <iframe
                        src={sourceUrl}
                        title="PDF Preview"
                        className="h-[85vh] w-full rounded-xl border"
                    />
                )}

                {hasValidSource && isImage && (
                    <img
                        src={sourceUrl}
                        alt={altText}
                        className="max-h-[85vh] w-full rounded-xl object-contain"
                    />
                )}

                {(!hasValidSource || (!isPdf && !isImage)) && (
                    <div className="flex h-125 items-center justify-center rounded-xl border">
                        <p className="text-gray-500">
                            Preview not available
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}