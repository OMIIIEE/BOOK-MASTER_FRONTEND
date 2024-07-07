import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarUser from "../../components/NavbarUser";
import ShowBooks from "../../components/ShowBooks";
import Wishlist from "../Wishlist";
import Footer from "../../components/Footer";
import Carousel from "../../components/Carousel";
import AuthorsCarousel from "../../components/AuthorsCarousel";
import AOS from "aos";
import "aos/dist/aos.css";



const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorisedBooks, setCategorisedBooks] = useState([]);
  

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://book-master-backend-new-1.onrender.com/api/auth/books/book",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        const booksData = res.data.books;
        const uniqueCategories = [
          ...new Set(booksData.map((book) => book.category)),
        ];
        setCategories(["All", ...uniqueCategories]); 
        setBooks(booksData);
        setCategorisedBooks(booksData);
      } catch (error) {
        console.error("Error fetching books data:", error);
        setError(error.message);
      }
    };
    fetchBookData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1600 });
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://book-master-backend-new-1.onrender.com/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        console.log(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://book-master-backend-new-1.onrender.com/api/wishlist/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
       
        setWishlist(res.data.wishlist.map((book) => book._id)); 
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };
    if (user) {
      fetchWishlist();
    }
  }, [user]);

 
  const updateWishlist = async (newWishlist) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://book-master-backend-new-1.onrender.com/api/wishlist",
        { userId: user._id, books: newWishlist },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlist(newWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

 
  const handleToggleWishlist = (bookId) => {
    const newWishlist = wishlist.includes(bookId)
      ? wishlist.filter((id) => id !== bookId)
      : [...wishlist, bookId];
    updateWishlist(newWishlist);
  };


  const removeFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter((id) => id !== bookId);
    updateWishlist(updatedWishlist);
  };

  const handleAddBookClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filterBooksByCategory = (category) => {
    if (category === "All") {
      setCategorisedBooks(books); 
    } else {
      const filtered = books.filter((book) => book.category === category);
      setCategorisedBooks(filtered);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-#0D0B26 bg-opacity-900"
      style={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundImage: `url('https://sbmweb.com/wp-content/uploads/2019/07/sbm-dark-background.jpg')`,
        backgroundSize: "repeat-y",
        backgroundPosition: "center",
        backgroundColor: "black",
      }}
    >
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow" data-aos="fade-down">
          <NavbarUser
            wishlistCount={wishlist.length}
            onAddBookClick={handleAddBookClick}
            user={user}
          />
          <div className="flex flex-col    ">
            <div >
              <Carousel className="w-[1400px]" />
            </div>
            <div className="container mx-auto px-4 py-1 flex-grow mt-8 w-full" >
              <ShowBooks
                user={user}
                books={books}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                categorisedBooks={categorisedBooks}
              />
              {showModal && (
                <Wishlist
                  books={books}
                  wishlist={wishlist}
                  onRemoveFromWishlist={removeFromWishlist}
                  closeModal={handleCloseModal}
                  user={user}
                />
              )}
            </div>
            <div className="w-[1450px] " data-aos="zoom-in">
              <AuthorsCarousel />
            </div>
       
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
