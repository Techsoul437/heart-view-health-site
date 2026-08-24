"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getPublicReportInfoByToken, fetchReportBlob, PublicReportData } from "@/redux/Api";
import { FileText, Loader2, AlertCircle, Download, Printer } from "lucide-react";

interface Props {
  token: string;
}

export default function ReportPreviewClient({ token }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<PublicReportData | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [blobType, setBlobType] = useState<string>("application/pdf");

  useEffect(() => {
    if (!token) return;

    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch metadata
        const res = await dispatch(getPublicReportInfoByToken(token)).unwrap();
        
        if (res.success && res.data) {
          setReportData(res.data);
          
          // Fetch PDF blob securely via backend
          try {
            const blob = await fetchReportBlob(token);
            const objectUrl = URL.createObjectURL(blob);
            setPdfUrl(objectUrl);
            setBlobType(blob.type);
          } catch (blobErr) {
            console.error("Failed to load PDF blob:", blobErr);
            setError("Unable to open report pdf. Please try again later.");
          }
        } else {
          setError("Report not found");
        }
      } catch (err) {
        console.error("Failed to fetch public report:", err);
        setError(err instanceof Error ? err.message : (typeof err === "string" ? err : "Unable to load report. Please try again later."));
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
    
    // Cleanup URL object
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-[#2f5ba5]" />
        <p className="mt-4 text-sm text-gray-500 font-medium">Loading your medical report...</p>
      </div>
    );
  }

  if (error || !reportData || !pdfUrl) {
    let errorTitle = "Unable to Open Report";
    let errorMessage = "Please try again later.";
    
    if (error === "Report link has expired") {
      errorTitle = "Report Link Expired";
      errorMessage = "This medical report link has expired.";
    } else if (error === "Report not found" || error?.includes("not found")) {
      errorTitle = "Report Not Found";
      errorMessage = "This report link is invalid or no longer available.";
    } else if (error) {
      errorMessage = error;
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{errorTitle}</h2>
          <p className="text-gray-500 mb-6">{errorMessage}</p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (!pdfUrl) return;
    const extension = blobType.startsWith("image/") ? (blobType === "image/png" ? "png" : "jpg") : "pdf";
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `medical-report-${reportData.patientName.replace(/\s+/g, '-')}.${extension}`;
    a.click();
  };
  
  const handlePrint = () => {
    if (!pdfUrl) return;
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-[#2f5ba5] rounded-lg flex items-center justify-center text-white font-bold">
              H
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-lg text-gray-900 tracking-tight">HeartView Health</span>
              <span className="text-xs text-gray-500 font-medium">Secure Report Viewer</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-[#2f5ba5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Medical Report</h1>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">Patient Name</span>
              <span className="font-semibold text-gray-900">{reportData.patientName}</span>
            </div>
            <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">Report Date</span>
              <span className="font-semibold text-gray-900">
                {reportData.createdAt ? new Date(reportData.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative flex items-center justify-center" style={{ height: "calc(100vh - 280px)", minHeight: "600px" }}>
          {blobType.startsWith("image/") ? (
            <img
              src={pdfUrl}
              className="max-w-full max-h-full object-contain"
              alt="Medical Report"
            />
          ) : (
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              className="w-full h-full border-0 absolute inset-0"
              title="Medical Report PDF"
            />
          )}
        </div>
      </main>
    </div>
  );
}
