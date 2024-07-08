import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const BooksSection = ({ books, filteredBooks, wishlist, toggleWishlist, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8); 


  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredBooks.length / booksPerPage)));
  const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  useEffect(() => {
    setCurrentPage(1); 
  }, [filteredBooks]);

  return (
    <div className="container mx-auto px-2 py-2">
      <div className="text-3xl md:text-5xl mb-4 text-[#FDC702] font-comforter text-center">Books Available</div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {currentBooks.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
          <Pagination
            totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
            currentPage={currentPage}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
      ) : (
        <div className="text-center mt-4">No books found in this category.</div>
      )}
    </div>
  );
};

export default BooksSection;
