"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

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
}

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [report, setReport] = useState<ReportItem | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("staff-reports");

    if (!stored) return;

    const reports: ReportItem[] = JSON.parse(stored);

    const found = reports.find(
      (r) => String(r.id) === String(params.id)
    );

    if (!found) {
      router.push("/lab-staff/reports");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReport(found);
  }, [params.id, router]);

  if (!report) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const isImage =
    report.fileType?.startsWith("image/");

  const isPdf =
    report.fileType === "application/pdf";

  return (
    <div className="min-h-screen  p-6 md:p-12">
      {/* Header */}

      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/lab-staff/reports"
          className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-3xl font-semibold text-black">
            Report Details
          </h1>

          <p className="text-gray-500">
            Report Preview
          </p>
        </div>
      </div>

      {/* Patient Information */}

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <p className="text-base sm:text-lg  leading-relaxed  font-light  text-[#64748B]">

              Patient Name
            </p>

            <h2 className="mt-1  font-medium text-black">
              {report.patientName}
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
      </div>

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
            src={report.fileData}
            title="PDF Preview"
            className="h-[85vh] w-full rounded-xl border"
          />
        )}

        {isImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
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