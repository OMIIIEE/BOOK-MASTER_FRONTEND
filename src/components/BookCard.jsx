// components/BookCard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const BookCard = ({ book, wishlist, toggleWishlist }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate('/login');
  };

  const openBookDetails = () => {
    navigate('/login');
  };
const handleWishlistClick =()=>{
  navigate('/login');
}
  return (
    <div className="border border-white shadow-lg h-auto flex flex-col items-center py-4 rounded-lg bg-white hover:scale-110 transition-transform duration-300 ">
      <div className="relative">
        <img
          src={book.imageLink || "https://via.placeholder.com/150"}
          alt={book.name}
          className="h-[38vh] object-cover rounded-t-md "
        />
        <button
          className="absolute top-[-10px] right-[-10px] z-10"
          // onClick={() => toggleWishlist(book._id)}
          onClick={handleWishlistClick}
        >
          <FaHeart
            className={`text-2xl  ${
              wishlist.includes(book._id) ? "text-red-500" : "text-blue-200"
            }`}
          />
        </button>
      </div>

      <div className="pt-2 ">
        <div className="flex items-center flex-col gap-1 justify-between">
          <div className="flex items-center flex-col gap-2">
            <h3 className="text-2xl text-center h-16 font-abril">
              <Link
                to={`#`}
                className="text-[#00224D] hover:text-[#029D9D] no-underline uppercase text-lg"
                //  className="text-white hover:text-[#029D9D] no-underline"
              >
                {book.name}
              </Link>
            </h3>
            <span className="flex items-center gap-1 font-medium text-[#00224D] text-sm">
              {book.authorName && (
                <p>
                  By <strong>{book.authorName}</strong>
                </p>
              )}
            </span>
            <span className="flex items-center text-[#00224D] font-medium text-sm">
              {book.publisherName && (
                <p>
                  Publisher: <strong>{book.publisherName}</strong>
                </p>
              )}
            </span>
            {/* <span className="flex items-center text-[#00224D] text-sm">
              <p>
                Copies:
                <strong className="font-semibold"> {book.copies}</strong>
              </p>
            </span> */}
            <span className="flex items-center text-[#00224D] text-sm">
              <p>
                Price: <strong className="font-semibold">Rs {book.price}</strong>
              </p>
            </span>
{/* 
            <div className="flex items-center justify-between text-gray-600">
              <h5 className="text-md font-semibold">
                Published Date: {new Date(book.publishDate).toDateString()}
              </h5>
            </div> */}
          </div>

          <div className="flex items-center justify-between mt-2 gap-20 bottom-0">
            <button
              className="bg-[#94FFD8] text-white px-4 py-1 rounded-lg hover:bg-[#029D9D]   "
              onClick={handleBuyClick}
            >
              Buy
            </button>
            <button
              className="bg-[#FF90BB] text-white px-4 py-1 rounded-lg hover:bg-[#FF2171]"
              onClick={openBookDetails}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
