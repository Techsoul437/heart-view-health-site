"use client";

import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Loader2 } from "lucide-react";

// Initialize worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  file: string | File | null;
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState<number>(800);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setContainerWidth(Math.min(window.innerWidth - 32, 1024));
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="w-full max-w-5xl bg-gray-50 flex flex-col items-center gap-4 py-4 rounded-md shadow-inner overflow-hidden">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex flex-col items-center p-10 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#2f5ba5]" />
            <p className="text-sm text-gray-500">Loading document...</p>
          </div>
        }
        error={
          <div className="p-10 text-red-500 text-center">
            Failed to load PDF document. Please try downloading it using the button above.
          </div>
        }
      >
        {Array.from(new Array(numPages || 0), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            className="mb-4 shadow-md bg-white border border-gray-200"
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={containerWidth}
          />
        ))}
      </Document>
    </div>
  );
}
