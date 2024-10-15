import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      
      {[...Array(totalPages).keys()].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            className={`px-3 py-1 rounded ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            } hover:bg-blue-300`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
