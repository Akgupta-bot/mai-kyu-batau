import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import './StoryPage.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const StoryPage = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pdfPath = "/coach_supply.pdf"; 

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToPrevPage() {
    setPageNumber(prevPage => Math.max(prevPage - 1, 1));
  }

  function goToNextPage() {
    setPageNumber(prevPage => Math.min(prevPage + 1, numPages));
  }

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center p-4">
      <div className="w-full max-w-5xl mx-auto flex-grow flex flex-col">
       
        <div className="flex-shrink-0 flex justify-between items-center bg-slate-900/50 p-4 rounded-t-lg border-b border-slate-700">
          <Link to="/path" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <FiArrowLeft />
            Back to Path
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="p-2 rounded-md hover:bg-slate-700 disabled:opacity-50">
              <FiArrowLeft />
            </button>
            <p className="text-slate-200">
              Page {pageNumber} of {numPages || '--'}
            </p>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="p-2 rounded-md hover:bg-slate-700 disabled:opacity-50">
              <FiArrowRight />
            </button>
          </div>
        </div>

        
        <div className="flex-grow flex items-center justify-center bg-slate-900 rounded-b-lg overflow-hidden">
          <Document
            file={pdfPath}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-white">Loading story...</p>}
            error={<p className="text-red-400">Failed to load the story PDF. Please ensure it's in the /public folder.</p>}
          >
            <Page pageNumber={pageNumber} renderTextLayer={false} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;