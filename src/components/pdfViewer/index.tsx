import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setNumPages, nextPage, prevPage, setPage } from "@/store/pageSlice";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "./index.css";

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

const PdfViewer: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  const numPages = useSelector((state: RootState) => state.page.numPages);
  const dispatch: AppDispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      dispatch(setPage(1)); // 파일 변경시 1페이지로 초기화.
    }
  };

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    dispatch(setNumPages(pdf.numPages));
  };

  const onRenderSuccess = (page: PDFPageProxy) => {
    // 페이지 렌더링 로직 (기존 코드)
  };

  return (
    <div className="pdf-viewer">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {pdfFile && (
        <div>
          <Document file={URL.createObjectURL(pdfFile)} onLoadSuccess={onDocumentLoadSuccess}>
            <Page key={`page_${currentPage}`} pageNumber={currentPage} renderTextLayer={false} renderAnnotationLayer={false} onRenderSuccess={onRenderSuccess} />
          </Document>
          <div className="pdf-controls">
            <button onClick={() => dispatch(prevPage())} disabled={currentPage <= 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {numPages}
            </span>
            <button onClick={() => dispatch(nextPage())} disabled={currentPage >= numPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
