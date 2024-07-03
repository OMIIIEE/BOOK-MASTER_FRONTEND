import React from 'react';

const Pagination = ({ totalPages, currentPage, paginate, prevPage, nextPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-4">
      <ul className="inline-flex items-center -space-x-px gap-2">
        {/* Previous Button */}
        <li className="page-item">
          <button
            onClick={() => prevPage()}
            className={`px-3 py-1 cursor-pointer rounded-full border ${
              currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-400 hover:duration-300 hover:ease-linear'
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 cursor-pointer rounded-full border ${
                number === currentPage 
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:duration-300 hover:ease-linear"
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li className="page-item">
          <button
            onClick={() => nextPage()}
            className={`px-3 py-1 cursor-pointer rounded-full border ${
              currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-400 hover:duration-300 hover:ease-linear'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
