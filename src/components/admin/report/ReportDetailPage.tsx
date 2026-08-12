"use client";

import { useEffect } from "react";
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
const fileUrl = report.fileUrl;

const extension = fileUrl?.split(".").pop()?.toLowerCase();

const isPdf = extension === "pdf";

const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
  extension || ""
);
    

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
                    <h1 className="ttext-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">

                        Report Details
                    </h1>

                    <p className="text-gray-500">
                        Report Preview
                    </p>
                </div>
            </div>

            {/* Patient Information */}

            {/* <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <p className="text-base sm:text-lg  leading-relaxed  font-light  text-[#64748B]">

                            Patient Name
                        </p>

                        <h2 className="mt-1  font-medium text-black">
                            {report.}
                        </h2>
                    </div>

                    <div>
                        <p className="text-base sm:text-lg  leading-relaxed  font-light  text-[#64748B]">

                            Report Type
                        </p>

                        <h2 className="mt-1  font-medium text-black">
                            {report.reportType}
                        </h2>
                    </div>
                </div>
            </div> */}

            {/* PDF Preview */}

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

               {isPdf && (
  <iframe
    src={fileUrl}
    title="PDF Preview"
    className="h-[85vh] w-full rounded-xl border"
  />
)}

                {isImage && (
                    <Image
                        src={report.fileData}
                        alt={report.fileName}
                        className="max-h-[85vh] w-full rounded-xl object-contain"
                    />
                )}

                {!isPdf && !isImage && (
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