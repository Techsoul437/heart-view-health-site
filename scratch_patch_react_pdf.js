const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'report', '[token]', 'ReportPreviewClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Imports
content = content.replace(
  'import { Loader2, AlertCircle, Download, ExternalLink } from "lucide-react";',
  `import { Loader2, AlertCircle, Download, ExternalLink } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = \`//unpkg.com/pdfjs-dist@\${pdfjs.version}/build/pdf.worker.min.mjs\`;`
);

// State variables
content = content.replace(
  'const [blobType, setBlobType] = useState<string>("application/pdf");',
  `const [blobType, setBlobType] = useState<string>("application/pdf");
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
  }, []);`
);

// Iframe replacement
const iframeRegex = /<div className="w-full max-w-5xl h-\[85vh\] md:h-250 relative border-0 rounded-md shadow-2xl bg-white overflow-hidden">[\s\S]*?<\/div>/;

const newPdfViewer = `<div className="w-full max-w-5xl bg-gray-50 flex flex-col items-center gap-4 py-4 rounded-md shadow-inner overflow-hidden">
            <Document
              file={pdfUrl}
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
                  key={\`page_\${index + 1}\`}
                  pageNumber={index + 1}
                  className="mb-4 shadow-md bg-white border border-gray-200"
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={containerWidth}
                />
              ))}
            </Document>
          </div>`;

content = content.replace(iframeRegex, newPdfViewer);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched successfully");
