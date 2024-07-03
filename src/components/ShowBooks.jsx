import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import Pagination from "./Pagination";

const ShowBooks = ({ books, wishlist, onToggleWishlist, user, categorisedBooks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Total pages for pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Handle search input change
  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter books based on search query and selected category
  useEffect(() => {
    let filteredData = books;
    if (searchQuery.trim() !== "") {
      const lowercasedQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        (book) =>
          book.name.toLowerCase().includes(lowercasedQuery) ||
          (book.authorName &&
            book.authorName.toLowerCase().includes(lowercasedQuery)) ||
          (book.publisherName &&
            book.publisherName.toLowerCase().includes(lowercasedQuery))
      );
    }

    if (selectedCategory !== "All Categories") {
      filteredData = filteredData.filter(
        (book) => book.category && book.category === selectedCategory
      );
    }

    setFilteredBooks(filteredData);
    setCurrentPage(1); // Reset to first page after filtering
  }, [books, searchQuery, selectedCategory]);

  // Get current books for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Handle pagination change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get unique categories
  const uniqueCategories = ["All Categories", ...new Set(books.map((book) => book.category).filter(Boolean))];

  return (
    <div className="items-center text-center mt-8 flex flex-col">
      <div className="text-3xl md:text-5xl mb-4 text-[#FDC702] font-comforter">Books Available</div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search books, authors & publishers"
        value={searchQuery}
        onChange={(e) => handleSearchInputChange(e.target.value)}
        className="px-4 py-2 w-1/2 border rounded-lg mb-4 focus:outline-none focus:border-blue-800 bg-gradient-to-b from-amber-500 to-pink-500 text-white placeholder-white"
      />

      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="absolute px-4 py-2 w-1/6 border rounded-lg mb-4 focus:outline-none focus:border-blue-800 bg-transparent text-white right-10"
      >
        {uniqueCategories.map((category) => (
          <option key={category} value={category} className="text-black hover:text-pink-300 ">
            {category}
          </option>
        ))}
      </select>

      {/* Display filtered books */}
      <BookList
        user={user}
        books={currentBooks}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        categorisedBooks={categorisedBooks}
      />

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default ShowBooks;
