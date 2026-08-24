import React from "react";
import ReportPreviewClient from "./ReportPreviewClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  title: "Report Preview | HeartViewHealth",
  description: "Secure medical report preview for HeartViewHealth.",
};

export default async function PublicReportPage({ params }: Props) {
  // In Next.js App Router (v15), params is a Promise
  const resolvedParams = await params;
  
  return <ReportPreviewClient token={resolvedParams.token} />;
}
