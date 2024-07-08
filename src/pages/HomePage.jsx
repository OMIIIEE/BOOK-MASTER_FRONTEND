
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import EnquiryForm from "./EnquiryForm";
import BooksSection from "./BooksSection";
import FeedbackCarousel from "./FeedbackCarousel";
import AuthorsCarousel from "../components/AuthorsCarousel";
import PopularBooks from "./PopularBooks";
import { MoveRight } from "lucide-react";
import logotaskmaster from "../assets/IMAGE2.png";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);
  const [showPopularBooks, setShowPopularBooks] = useState(true);
  const enquiryFormRef = useRef(null);
  const navRef = useRef(null);

  const popularBooks = [
    {
      id: 1,
      title: "Three Men In A Boat",
      image:
        "https://1.bp.blogspot.com/-KxpQoi_yiJ0/XV0QxUHutBI/AAAAAAAA-6E/2ydtJ9a0cZQ0dT1T1WjUi67cOIwrME04wCLcBGAs/s1600/19537D2F-9429-4000-A26B-644EC9EB4E0C.jpeg",
    },

    {
      id: 3,
      title: "Berserk",
      image: "https://cdn.myanimelist.net/images/manga/1/157897l.jpg",
    },
    {
      id: 4,
      title: "Naruto",
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1435524806l/204042.jpg",
    },
    {
      id: 5,
      title: "Attack On Titan",
      image: "https://cdn.myanimelist.net/images/manga/1/95517l.jpg",
    },
    {
      id: 6,
      title: "Bleach",
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388508611l/2880.jpg",
    },
    {
      id: 7,
      title: "Dragon Ball",
      image: "https://m.media-amazon.com/images/I/515-EdWvVaL._SL500_.jpg",
    },
    {
      id: 8,
      title: "Demon Slayer",
      image: "https://cdn.myanimelist.net/images/manga/3/252239l.jpg",
    },
    {
      id: 9,
      title: "The Catcher in the Rye",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg",
    },
  ];
  useEffect(() => {
    AOS.init({ duration: 1700 });
  }, []);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axios.get(
          "https://book-master-backend-new-1.onrender.com/api/auth/books/book"
        );
        const booksData = res.data.books;
        const uniqueCategories = [
          ...new Set(booksData.map((book) => book.category)),
        ];
        setCategories(["All", ...uniqueCategories]); // Include 'All' option
        setBooks(booksData);
        setFilteredBooks(booksData); // Set initial filtered books
      } catch (error) {
        console.error("Error fetching books data:", error);
        setError(error.message);
      }
    };
    fetchBookData();
  }, []);

  const toggleWishlist = (bookId) => {
    const newWishlist = wishlist.includes(bookId)
      ? wishlist.filter((id) => id !== bookId)
      : [...wishlist, bookId];
    setWishlist(newWishlist);
  };

  const filterBooksByCategory = (category) => {
    if (category === "All") {
      setFilteredBooks(books); // Show all books if 'All' is selected
    } else {
      const filtered = books.filter((book) => book.category === category);
      setFilteredBooks(filtered);
    }
  };

  const scrollToEnquiry = () => {
    const offset = -200; 
    const elementPosition = enquiryFormRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  const scrollToNav = () => {
    navRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className="bg-#0D0B26 bg-opacity-900"
      style={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundImage: `url('https://sbmweb.com/wp-content/uploads/2019/07/sbm-dark-background.jpg')`,
        backgroundSize: "repeat-y",
        backgroundPosition: "center",
        backgroundColor: "black",
      }}
    >
      {/* Header Section */}
      <div data-aos="fade-up"
        className="sticky top-0 flex justify-between items-center  py-4 px-24 z-50"
        style={{
          // backgroundImage: `url(${backgroundImage})`,
          backgroundImage: `url('https://img.freepik.com/premium-vector/abstract-polygonal-space-background-with-connecting-dots-lines-concept-illustration_114588-1380.jpg')`,
          backgroundSize: "fit",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-4">
          <Link to="/" className="font-abril text-2xl">
            <img
              src={logotaskmaster}
              className="w-36 shadow-lg text-white "
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-8 hover:scale-110%">
          <Link
            to="/"
            className="text-white flex items-center hover:text-pink-500 hover:scale-110 transition-transform duration-300"
            onClick={scrollToNav}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            HOME
          </Link>
          <button
            onClick={scrollToEnquiry}
            className="text-white flex items-center hover:text-pink-500 hover:scale-110 transition-transform duration-300"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            ENQUIRY
          </button>
        
          <Link
            to="/login"
            className="text-white flex items-center hover:text-pink-500 hover:scale-110 transition-transform duration-300"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            LOGIN
          </Link>
          <Link
            to="/register"
            className="text-white flex items-center hover:text-pink-500 hover:scale-110 transition-transform duration-300"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            SIGNUP
          </Link>
        </div>
      </div>

      <div className="my-2" ref={navRef} data-aos="fade-right">
        <Carousel />
      </div>
      <div className="flex items-center justify-center my-16  flex-col">
        <div className="flex items-center justify-center " data-aos="fade-up">
          {showPopularBooks ? (
            <PopularBooks popularBooks={popularBooks} />
          ) : (
            <div className="w-full">
              <div className="mx-24 mt-12 w-1/3">
                <span className="font-lg mr-2 uppercase text-xl text-white">
                  Filter by Category :
                </span>
                <select
                  onChange={(e) => filterBooksByCategory(e.target.value)}
                  className="font-pacifico w-1/3 text-sm border rounded-lg px-4"
                >
                  {categories.map((category, index) => (
                    <option
                      key={index}
                      value={category}
                      className="font-pacifico"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <BooksSection
                books={books}
                filteredBooks={filteredBooks}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                error={error}
                data-aos="fade-up"
              />
            </div>
          )}
        </div>
        <button
          className="flex justify-center text-white items-center gap-2  rounded uppercase hover:text-pink-500 hover:scale-110 transition-transform duration-300"
          onClick={() => setShowPopularBooks(!showPopularBooks)}
        >
          <span className="border border-pink-500 rounded-full p-2">
            <MoveRight />
          </span>

          {showPopularBooks ? "View more Books" : "Back to Popular Books"}
        </button>
      </div>

      <div className="text-center"></div>

      {/* Author carousel */}
      <div data-aos="fade-up">
        <AuthorsCarousel />
      </div>

      {/* Enquiry Form */}
      <div data-aos="fade-up" ref={enquiryFormRef} className="mt-16">
        <EnquiryForm />
      </div>
     

      {/* Customer Feedback Carousel */}
      <div className="mt-16" data-aos="zoom-in">
        <FeedbackCarousel />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
