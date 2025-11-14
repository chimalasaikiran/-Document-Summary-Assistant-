import React from 'react';

const StarIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.215-.662 1.536 0l1.681 3.468a1 1 0 00.95.69h3.642c.713 0 1.002.904.485 1.374l-2.938 2.138a1 1 0 00-.364 1.118l1.11 3.468c.214.662-.583 1.233-1.146.845l-2.938-2.138a1 1 0 00-1.175 0l-2.938 2.138c-.563.388-1.36-.183-1.146-.845l1.11-3.468a1 1 0 00-.364-1.118L2.07 8.416c-.517-.47-.228-1.374.485-1.374h3.642a1 1 0 00.95-.69l1.681-3.468z" clipRule="evenodd" />
  </svg>
);

export default StarIcon;