import React from 'react';

const Spinner = ({ className = '' }) => {
  return (
    <div className={`relative w-5 h-5 ${className}`}>
      <div className="absolute inset-0 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
