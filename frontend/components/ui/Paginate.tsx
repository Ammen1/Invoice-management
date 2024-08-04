"use client";


import React from 'react';

interface PaginateProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({ pageCount, onPageChange }) => {
  return (
    <div className="pagination flex justify-center items-center space-x-2 py-4">
      {Array.from({ length: pageCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className="pagination-button bg-blue-500 text-white rounded px-3 py-1 text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginate;
