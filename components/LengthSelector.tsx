import React from 'react';
import { SummaryLength } from '../types';

interface LengthSelectorProps {
  selectedLength: SummaryLength;
  onLengthChange: (length: SummaryLength) => void;
}

const lengths: SummaryLength[] = ['short', 'medium', 'long'];

const LengthSelector: React.FC<LengthSelectorProps> = ({ selectedLength, onLengthChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-600 mb-2">
        Summary Length
      </label>
      <div className="flex w-full bg-slate-200/70 rounded-lg p-1">
        {lengths.map((length) => (
          <button
            key={length}
            onClick={() => onLengthChange(length)}
            className={`w-1/3 py-2 text-sm font-semibold capitalize rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-100
              ${selectedLength === length ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-white/60'}`}
          >
            {length}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LengthSelector;