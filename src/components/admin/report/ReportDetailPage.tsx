"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Download } from "lucide-react";
import Image from "next/image";
import { getReportById, fetchReportBlob } from "@/redux/Api";
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
    const [blobType, setBlobType] = useState<string>("");

    useEffect(() => {
        if (!report) return;

        const loadReportUrl = async () => {
            // Prioritize raw file data if it exists so we get the native PDF viewer
            if (report.fileData && report.fileData.startsWith("JVBER")) {
                setSourceUrl(`data:application/pdf;base64,${report.fileData}`);
                return;
            } else if (report.fileData && report.fileData.startsWith("data:application/pdf")) {
                setSourceUrl(report.fileData);
                return;
            } else if (report.fileData && report.fileData.startsWith("data:image/")) {
                setSourceUrl(report.fileData);
                return;
            }

            const url = report.fileUrl || "";
            if (url.includes("/report/")) {
                // It's a public link, try to fetch the raw blob so we avoid iframing the HTML page wrapper
                const parts = url.split("/report/");
                const token = parts[parts.length - 1]?.split("?")[0];
                if (token) {
                    try {
                        const blob = await fetchReportBlob(token);
                        let realType = blob.type;
                        
                        try {
                          const arr = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
                          if (arr[0] === 0x25 && arr[1] === 0x50 && arr[2] === 0x44 && arr[3] === 0x46) {
                              realType = "application/pdf";
                          } else if (arr[0] === 0xFF && arr[1] === 0xD8 && arr[2] === 0xFF) {
                              realType = "image/jpeg";
                          } else if (arr[0] === 0x89 && arr[1] === 0x50 && arr[2] === 0x4E && arr[3] === 0x47) {
                              realType = "image/png";
                          } else if (arr[0] === 0x52 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x46) {
                              realType = "image/webp";
                          }
                        } catch(e) {
                          console.warn("Could not check magic bytes", e);
                        }

                        // Only use the blob if it's actually a PDF or image
                        if (realType.includes("pdf") || realType.includes("image")) {
                            const objectUrl = URL.createObjectURL(blob);
                            setSourceUrl(objectUrl);
                            setBlobType(realType);
                            return;
                        } else {
                            console.warn("Invalid blob type received:", realType);
                        }
                    } catch (error) {
                        console.error("Failed to fetch report blob:", error);
                    }
                }
            }
            
            setSourceUrl(url);
        };

        loadReportUrl();
        
        // Cleanup object URL if created
        return () => {
            if (sourceUrl && sourceUrl.startsWith("blob:")) {
                URL.revokeObjectURL(sourceUrl);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (blobType) {
        isPdf = blobType === "application/pdf";
        isImage = blobType.startsWith("image/");
    } else if (sourceUrl.startsWith("http") || sourceUrl.startsWith("blob:")) {
        const urlWithoutQuery = sourceUrl.split("?")[0] || "";
        const extension =
            urlWithoutQuery.split(".").pop()?.toLowerCase() ||
            report.fileName?.split(".").pop()?.toLowerCase() ||
            report.filename?.split(".").pop()?.toLowerCase() ||
            report.fileType?.toLowerCase() ||
            "";
        isPdf = extension === "pdf" || extension === "application/pdf";
        isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(extension) || extension.startsWith("image/");
    } else if (sourceUrl.startsWith("data:application/pdf")) {
        isPdf = true;
    } else if (sourceUrl.startsWith("data:image/")) {
        isImage = true;
    }
    
    // We only render Image/Iframe if there is an actual source URL
    const hasValidSource = Boolean(sourceUrl);

    const handleDownloadImage = () => {
        if (!sourceUrl) return;
        const link = document.createElement("a");
        link.href = sourceUrl;
        link.download = altText || "report-image";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen  p-6 md:p-12 bg-gray-50/50">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <Link
                    href={`/${currentRole}/reports`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>

                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium tracking-tight text-gray-900">
                        Report Details
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Report Preview
                    </p>
                </div>
            </div>

            {/* Preview Section */}
            <div className="mt-4 flex-1 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <div className="flex items-center gap-2">
                        <FileText className="text-blue-500" size={24} />
                        <h2 className="text-lg font-semibold text-gray-900">Report Preview</h2>
                    </div>
                    {hasValidSource && isImage && (
                        <button
                            onClick={handleDownloadImage}
                            className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                        >
                            <Download size={16} />
                            Download Image
                        </button>
                    )}
                </div>
                
                <div className="w-full bg-[#323639] flex items-center justify-center relative">
                    {hasValidSource && isPdf && (
                        <iframe
                            src={sourceUrl}
                            title="PDF Preview"
                            className="h-[85vh] w-full border-0"
                        />
                    )}

                    {hasValidSource && isImage && (
                        <div className="flex h-[85vh] w-full flex-col items-center justify-center overflow-auto p-4">
                            <img
                                src={sourceUrl}
                                alt={altText}
                                className="max-h-full max-w-full object-contain shadow-lg bg-white"
                            />
                        </div>
                    )}

                    {(!hasValidSource || (!isPdf && !isImage)) && (
                        <div className="flex h-[85vh] w-full items-center justify-center bg-white">
                            <p className="text-gray-500">
                                Preview not available
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}