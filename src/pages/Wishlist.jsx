import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import axios from "axios";
import backgroundImage from "../assets/bg.png";

const Wishlist = ({
  wishlist,
  books,
  onRemoveFromWishlist,
  onToggleWishlist,
  closeModal,
  user,
}) => {
  const wishlistBooks = books.filter((book) => wishlist.includes(book._id));
  const [copiesBought, setCopiesBought] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showViewMoreModal, setShowViewMoreModal] = useState(false);

  useEffect(() => {
    const storedCopies = localStorage.getItem("copiesBought");
    if (storedCopies) {
      setCopiesBought(JSON.parse(storedCopies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("copiesBought", JSON.stringify(copiesBought));
  }, [copiesBought]);

  const toggleWishlist = (bookId) => {
    onToggleWishlist(bookId);
  };

  const removeFromWishlist = (bookId) => {
    onRemoveFromWishlist(bookId);
  };

  if (wishlistBooks.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }

  // const buyBook = (bookId) => {
  //   // Simulate the buying process
  //   alert(
  //     `Book "${
  //       books.find((book) => book._id === bookId).name
  //     }" has been purchased successfully!`
  //   );
  //   setCopiesBought({
  //     ...copiesBought,
  //     [bookId]: (copiesBought[bookId] || 0) + 1,
  //   });
  // };

  const handleConfirmBuy = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://book-master-backend-new-1.onrender.com/api/purchases",
        {
          userId: user._id,
          bookId: selectedBook._id,
          quantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`Book "${selectedBook.name}" has been purchased successfully!`);
      setCopiesBought({
        ...copiesBought,
        [selectedBook._id]: (copiesBought[selectedBook._id] || 0) + quantity,
      });
      setShowBuyModal(false); // Close Buy modal after successful purchase
      setQuantity(1); // Reset quantity after purchase
    } catch (error) {
      console.error("Error purchasing book:", error);
      // Handle error
    }
  };

  const openBookDetails = (book) => {
    setSelectedBook(book);
    setShowViewMoreModal(true); // Show View More modal when book details are opened
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
    setShowViewMoreModal(false);
  };

  console.log("Wishlist:", wishlist);

  const handleBuyClick = (bookId) => {
    setSelectedBook(books.find((book) => book._id === bookId));
    setShowBuyModal(true); // Show Buy modal when Buy button is clicked
  };

  const handleChangeQuantity = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm bg-[#5AB2FF] flex justify-center items-center h-screen w-screen z-50">
      <div
        className="bg-white rounded-lg p-4 w-full max-w-7xl overflow-y-auto max-h-[90vh] relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl md:text-5xl mb-4 text-[#EC4898] font-comforter text-center ">
          Wishlist
        </h1>
        <button
          className="absolute top-1 right-0 text-gray-500"
          onClick={closeModal}
        >
          <X size={30} />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {wishlistBooks.length === 0 && <div>Your wishlist is empty.</div>}
          {wishlistBooks.map((book) => (
            <Card
              key={book._id}
              className="border-none shadow-2xl h-auto w-auto flex flex-col items-center py-4 relative bg-white bg-opacity-30"
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 rounded-full bg-blue-400"
                onClick={() => removeFromWishlist(book._id)}
              >
                <X size={20} />
              </button>
              <div className="relative">
                <img
                  src={book.imageLink || "https://via.placeholder.com/150"}
                  alt={book.name}
                  className="h-[36vh] object-cover rounded-t-md"
                />
              </div>
              <CardBody className="px-2 pt-2">
                <div className="flex items-center flex-col gap-1 justify-between">
                  <div className="flex items-center flex-col gap-2">
                    <h3 className="text-2xl text-center h-16 font-abril text-[#00224D] hover:text-[#029D9D] no-underline">
                      {book.name}
                    </h3>
                    <span className="flex items-center gap-1 font-medium text-[#00224D] text-sm">
                      <span>
                        {book.authorName && <p>by {book.authorName}</p>}
                      </span>
                    </span>
                    <span className="flex items-center text-[#00224D] font-medium text-sm">
                      {book.publisherName && (
                        <p>
                          <strong>Publisher:</strong> {book.publisherName}
                        </p>
                      )}
                    </span>
                    <span className="flex items-center text-[#00224D] text-sm">
                      <pre className="font-semibold">Copies : </pre>{" "}
                      {book.copies - (copiesBought[book._id] || 0)}
                    </span>
                    <span className="flex items-center text-[#00224D] text-sm">
                      <pre className="font-semibold">Price : </pre> Rs{" "}
                      {book.price}
                    </span>
                    <div className="flex items-center justify-between text-gray-600">
                      <h5 className="text-md font-semibold">
                        Published Date :{" "}
                        {new Date(book.publishDate).toDateString()}
                      </h5>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 gap-2 bottom-0">
                    <button
                      className="text-sm bg-[#FF9F66] text-white px-4 py-1 rounded-lg hover:bg-[#FF6500]"
                      //  onClick={() => buyBook(book._id)}
                      onClick={() => handleBuyClick(book._id)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-sm bg-[#FF90BB] text-white px-4 py-1 rounded-lg hover:bg-[#FF2171]"
                      onClick={() => openBookDetails(book)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
          {selectedBook && showViewMoreModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-3/5">
                <div className="mb-4">
                  <h2 className="text-3xl  mb-2 font-abril">
                    {selectedBook.name}
                  </h2>
                  <p className="text-gray-700 text-sm">
                    Author: {selectedBook.authorName}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Publisher: {selectedBook.publisherName}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Copies Available:{" "}
                    {selectedBook.copies -
                      (copiesBought[selectedBook._id] || 0)}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Price: Rs {selectedBook.price}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700">{selectedBook.summary}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={closeBookDetails}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedBook && showBuyModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded-lg max-w-md w-1/3">
                <h2 className="text-2xl font-semibold mb-2">
                  {selectedBook.name}
                </h2>
                <p>Price: Rs {selectedBook.price}</p>
                <label className="block mt-4">
                  Quantity:
                  <input
                    type="number"
                    className="border px-2 py-1 rounded-lg w-full"
                    value={quantity}
                    onChange={handleChangeQuantity}
                    min="1"
                  />
                </label>
                {/* Calculate total price */}
                <p className="mt-2">
                  Total Price: Rs {selectedBook.price * quantity}
                </p>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                    onClick={handleConfirmBuy}
                  >
                    Buy
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-1 rounded-lg hover:bg-gray-400"
                    onClick={() => setShowBuyModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
