import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToDisplay = [];
  for (let p = currentPage; p <= Math.min(totalPages, currentPage + 2); p++) {
    pagesToDisplay.push(p);
  }

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      {/* Previous Button */}
      {currentPage > 1 && (
        <button
          className="btn btn-outline btn-icon bg-white"
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </button>
      )}
      {/* Page Buttons */}
      {pagesToDisplay.map((page) => (
        <button
          key={page}
          className={`btn ${page === currentPage ? "btn btn-neutral text-white" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {/* Next Button */}
      {currentPage < totalPages && (
        <button
          className="btn btn-outline btn-icon bg-white"
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;
