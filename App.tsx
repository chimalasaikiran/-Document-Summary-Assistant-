import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import LengthSelector from './components/LengthSelector';
import SummaryDisplay from './components/SummaryDisplay';
import LoadingIndicator from './components/LoadingIndicator';
import StarIcon from './components/icons/StarIcon';
import { SummaryLength } from './types';
import { generateSummary } from './services/geminiService';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('medium');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    if (!file) {
      setError('Please upload a file first.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setSummary('');

    try {
      const result = await generateSummary(file, summaryLength);
      setSummary(result);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unexpected error occurred.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    // Clear previous results when a new file is selected or cleared
    if (!selectedFile) {
        setSummary('');
        setError(null);
        setIsLoading(false); // Also reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10 w-full max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center bg-blue-100 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <StarIcon className="w-4 h-4 mr-2" />
           Document Intelligence
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
          Document Summary Assistant
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Transform your PDFs and documents into smart, actionable summaries in seconds.
        </p>
      </header>

      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Controls */}
        <div className="flex flex-col space-y-6">
          <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200/80">
             <h2 className="text-lg font-bold text-slate-800 mb-4">1. Upload Document</h2>
             <FileUpload onFileSelect={handleFileSelect} />
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200/80">
            <h2 className="text-lg font-bold text-slate-800 mb-4">2. Select Summary Length</h2>
            <LengthSelector selectedLength={summaryLength} onLengthChange={setSummaryLength} />
          </div>

          {error && <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-md">{error}</div>}

          <button
            onClick={handleGenerateSummary}
            disabled={!file || isLoading}
            className="w-full py-3 px-6 text-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md hover:opacity-90 transition-all duration-300 disabled:from-slate-200 disabled:to-slate-200 disabled:shadow-none disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? 'Generating...' : 'Generate Summary'}
          </button>
        </div>

        {/* Right Column: Summary */}
        <div className="relative min-h-[400px] lg:min-h-0">
          {isLoading ? (
            <LoadingIndicator />
          ) : summary ? (
            <SummaryDisplay summary={summary} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl shadow-md border-2 border-dashed border-slate-300">
               <svg className="w-16 h-16 text-slate-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m9.75 9.75h4.875c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-4.875m0 0a1.125 1.125 0 01-1.125-1.125v-2.25c0-.621.504-1.125 1.125-1.125h4.875m-6.75 0h.008v.008h-.008v-.008zm-3.375 0h.008v.008h-.008v-.008z" />
               </svg>
              <h3 className="text-lg font-semibold text-slate-700">Your summary will appear here</h3>
              <p className="text-slate-500 mt-1">Upload a document and click "Generate Summary" to begin.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;