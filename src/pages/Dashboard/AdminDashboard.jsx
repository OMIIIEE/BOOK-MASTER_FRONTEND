

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import UserList from "../../components/UserList";
import AddBookForm from "../../components/AddBookForm";
import ShowBooks from "../../components/ShowBooks";
import BookDetails from "../../components/BookDetails";
import Booking from "../../components/Booking";
import Footer from "../../components/Footer";
import Carousel from "../../components/Carousel";
import ChartComponent from "../../components/ChartComponent";
import ChartComponentB from "../../components/ChartComponentB";
import ChartTopUsers from "../../components/ChartTopUsers";
import EnquiryList from "../EnquiryList";
import ChartTopBooks from "../../components/ChartTopBooks";
import "../../Utils/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [section, setSection] = useState("home");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [userRes, bookRes, purchaseRes,enquiryRes] = await Promise.all([
          axios.get("https://book-master-backend-new-1.onrender.com/api/auth/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://book-master-backend-new-1.onrender.com/api/auth/books/book", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://book-master-backend-new-1.onrender.com/api/purchases", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://book-master-backend-new-1.onrender.com/api/enquiry", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(userRes.data.users);
        setBooks(bookRes.data.books);
        setPurchases(purchaseRes.data);
        setEnquiries(enquiryRes.data.enquiries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddBookClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleSection = (selectedSection) => {
    setSection(selectedSection);
    setShowModal(false);
  };


  const getBookingDetails = () => {
    return purchases.map((purchase) => {
      if (!purchase.userId || !purchase.userId.username || !purchase.userId.email) {
        return null; 
      }

      const userName = purchase.userId.username;
      const email = purchase.userId.email;
      const totalPrice = purchase.totalPrice || purchase.quantity * purchase.bookId.price;

      return {
        userName,
        email,
        bookName: purchase.bookName,
        author: purchase.bookId.authorName,
        price: purchase.bookPrice,
        quantity: purchase.quantity,
        totalPrice,
        date: new Date(purchase.purchaseDate).toLocaleString(),
      };
    }).filter((booking) => booking !== null); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex flex-col items-center flex-grow">
        <Navbar
          role="admin"
          onAddBookClick={handleAddBookClick}
          toggleSection={toggleSection}
          section={section}
        />
        
        <div className="container items-center flex flex-col gap-8  py-2">
          {section === "home" && (
            <>
              <div className="text-3xl uppercase tracking-wider">Welcome to Admin Dashboard</div>
              <div></div>
              <div className="w-1/2 flex items-center gap-16 left-0 justify-center " data-aos="fade-up">
                <ChartComponentB />
                <ChartTopUsers users={users} />
              </div>
              <div className=" w-full flex items-center gap-16 left-0 justify-center " data-aos="fade-up">
                <ChartTopBooks purchases={purchases}/>
              </div>
            </>
          )}
          {section === "userDetails" && (
            <div className=" -mt-12" data-aos="fade-up">
              <UserList users={users} />
            </div>
          )}
          {section === "bookDetails" && (
            <div className=" -mt-8" data-aos="fade-up">
              <BookDetails books={books} setBooks={setBooks} />
            </div>
          )}
          {section === "bookingDetails" && (
            <div className=" -my-4 slide-up" >
              <Booking bookings={getBookingDetails()} />
            </div>
          )}
          {section === "enquiryDetails" && (
            <div className=" mt-6" data-aos="fade-up">
              <EnquiryList enquiries={enquiries} setEnquiries={setEnquiries} />
            </div>
          )}
          {showModal && (
           
            <AddBookForm
              isAdmin={true}
              closeModal={handleCloseModal}
              className=""
            />
           
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
