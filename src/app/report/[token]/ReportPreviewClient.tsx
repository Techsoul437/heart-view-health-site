"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getPublicReportInfoByToken, fetchReportBlob, PublicReportData } from "@/redux/Api";
import { Loader2, AlertCircle } from "lucide-react";
import Navbar from "@/Ui/navbar/Navbar";
import Footer from "@/Ui/footer/Footer";

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

  useEffect(() => {
    if (reportData?.patientName) {
      document.title = `${reportData.patientName} - Medical Report`;
    }
  }, [reportData]);

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


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 w-full mt-20  py-10 px-2 md:px-8 flex justify-center">
        {blobType.startsWith("image/") ? (
          <img
            src={pdfUrl}
            className="w-full max-w-7xl h-auto object-contain rounded-md shadow-2xl"
            alt={`${reportData?.patientName || "Patient"} - Medical Report`}
          />
        ) : (
          <iframe
            src={`${pdfUrl}#view=FitH`}
            className="w-full max-w-5xl h-[85vh] md:h-250 border-0 rounded-md shadow-2xl bg-white"
            title={`${reportData?.patientName || "Patient"} - Medical Report`}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
