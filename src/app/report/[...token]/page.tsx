import React from "react";
import ReportPreviewClient from "./ReportPreviewClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ token: string | string[] }>;
};

export const metadata: Metadata = {
  title: "Report Preview | HeartViewHealth",
  description: "Secure medical report preview for HeartViewHealth.",
};

export default async function PublicReportPage({ params }: Props) {
  // In Next.js App Router (v15), params is a Promise
  const resolvedParams = await params;
  
  // If token is an array (due to [...token] catch-all), join it back with slashes
  const tokenString = Array.isArray(resolvedParams.token) 
    ? resolvedParams.token.join('/') 
    : resolvedParams.token;
  
  return <ReportPreviewClient token={tokenString} />;
}
