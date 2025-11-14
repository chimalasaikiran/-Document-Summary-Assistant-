import React from 'react';

const LoadingIndicator: React.FC<{ text?: string, subtext?: string }> = ({ text = "Analyzing Document...", subtext = "Please wait a moment while we process your file." }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl shadow-md border-2 border-dashed border-slate-300" aria-live="polite" aria-busy="true">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mt-6">{text}</h3>
      <p className="text-slate-500 mt-1">{subtext}</p>
    </div>
  );
};

export default LoadingIndicator;