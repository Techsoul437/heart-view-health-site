const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'report', '[token]', 'ReportPreviewClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace standard react-pdf imports with dynamic import
const oldImports = `import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = \`//unpkg.com/pdfjs-dist@\${pdfjs.version}/build/pdf.worker.min.mjs\`;`;

const newImports = `import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('./PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-5xl bg-gray-50 flex justify-center p-10 py-20 rounded-md">
      <Loader2 className="h-8 w-8 animate-spin text-[#2f5ba5]" />
    </div>
  )
});`;

content = content.replace(oldImports, newImports);

// Remove unused state
content = content.replace('  const [numPages, setNumPages] = useState<number>();\n', '');
content = content.replace('  const [containerWidth, setContainerWidth] = useState<number>(800);\n', '');

const oldFunctions = `  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
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
  }, []);\n`;

content = content.replace(oldFunctions, '');
content = content.replace(oldFunctions.replace('\n', '\r\n'), ''); // Windows line endings fallback

// Replace Document rendering with PdfViewer component
const oldDocument = /<div className="w-full max-w-5xl bg-gray-50 flex flex-col items-center gap-4 py-4 rounded-md shadow-inner overflow-hidden">[\s\S]*?<\/div>/;

const newDocument = `<PdfViewer pdfUrl={pdfUrl} />`;

content = content.replace(oldDocument, newDocument);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched ReportPreviewClient");
