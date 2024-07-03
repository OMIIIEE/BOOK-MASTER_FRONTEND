

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import UserList from "../../components/UserList";
import AddBookForm from "../../components/AddBookForm";
import ShowBooks from "../../components/ShowBooks";
import BookDetails from "../../components/BookDetails";
import Booking from "../../components/Booking";
import Sidebar from "../../components/SidebarAdmin";
import Footer from "../../components/Footer";
import Carousel from "../../components/Carousel";
import ChartComponent from "../../components/ChartComponent";
import ChartComponentB from "../../components/ChartComponentB";
import ChartTopUsers from "../../components/ChartTopUsers";
import EnquiryList from "../EnquiryList";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const [enquiries, setEnquiries] = useState([]);
  const [showEnquiryDetails, setShowEnquiryDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [userRes, bookRes, purchaseRes,enquiryRes] = await Promise.all([
          axios.get("http://localhost:9003/api/auth/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:9003/api/auth/books/book", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:9003/api/purchases", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:9003/api/enquiry", {
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

  const toggleBookDetails = () => {
    setShowBookDetails(!showBookDetails);
  };
  const toggleBookingDetails = () => {
    setShowBookingDetails(!showBookingDetails);
  };
  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };
  const toggleEnquiryDetails = () => {
    setShowEnquiryDetails(!showEnquiryDetails);
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
          toggleBookDetails={toggleBookDetails}
          toggleBookingDetails={toggleBookingDetails}
          toggleUserDetails={toggleUserDetails}
          toggleEnquiryDetails={toggleEnquiryDetails}
        />
        
        
        <div className="container items-center flex flex-col gap-8 p-8">
        <div className="text-3xl">Welcome to Admin Dashboard</div>
       
        {/* <ChartComponent/>  */}
        <div className="w-1/2 flex items-center gap-16 left-0 justify-center h-[50vh]">
        <ChartComponentB />
        <ChartTopUsers users={users}/></div>
          {showUserDetails && <UserList users={users} />}
          {showBookDetails && <BookDetails books={books} setBooks={setBooks} />}
          {showModal && <AddBookForm isAdmin={true} closeModal={handleCloseModal} className="-mt-4" />}
          {showBookingDetails && <Booking bookings={getBookingDetails()} />}
          {showEnquiryDetails && <EnquiryList enquiries={enquiries} setEnquiries={setEnquiries}/>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

