import React from 'react';

interface PaginateProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
        Previous
      </button>
      <span>Page {currentPage + 1} of {totalPages}</span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  );
};

export default Paginate;
