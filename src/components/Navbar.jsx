// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import axios from 'axios';
// import logo from '../assets/IMAGE2.png';
// import backgroundImage from "../assets/backg.jpg"

// const Navbar = ({ user, role, onAddBookClick, toggleBookDetails, toggleBookingDetails, toggleUserDetails ,toggleEnquiryDetails}) => {
  
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.post(
//         "https://book-master-backend-new-1.onrender.com/api/auth/logout",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.success) {
//         localStorage.removeItem("token");
//         alert("Logged out successfully");
//         navigate("/", { replace: true });
//       } else {
//         alert("Logout failed: " + res.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Logout failed due to a network or server error.");
//     }
//   };

//   const getLinkClass = (path) => {
//     return location.pathname === path ? "text-black" : "text-white";
//   };

//   return (
//     <div className="navbar sticky top-0 text-white p-4 px-20 flex justify-between items-center w-full bg-gradient-to-r from-amber-500 to-pink-500 z-40"style={{
//       // backgroundImage: `url(${backgroundImage})`,
//       backgroundImage: `url('https://sbmweb.com/wp-content/uploads/2019/07/sbm-dark-background.jpg')`,
//       backgroundSize: "repeat-y",
//       backgroundPosition: "center",
//       backgroundColor: "black",
//     }}>
//       <div className="navbar-brand">
//         <Link to="/admin-dashboard" className="font-abril text-2xl">
//           <img src={logo} className="w-[9rem]" alt="Logo" />
//         </Link>
//       </div>
//       <div className="flex items-center flex-row gap-8">
//         <button onClick={onAddBookClick} className={getLinkClass("/add-book")}>
//           Add Book
//         </button>
//         <button onClick={toggleUserDetails} className={getLinkClass("/user-list")}>
//           User List
//         </button>
//         <button onClick={toggleBookDetails} className={getLinkClass("/book-details")}>
//           Book Details
//         </button>
//         <button onClick={toggleBookingDetails} className={getLinkClass("/purchase-details")}>
//           Purchase Details
//         </button>
//         <button onClick={toggleEnquiryDetails} className={getLinkClass("/purchase-details")}>
//           Enquiries 
//         </button>
//         {/* <FontAwesomeIcon icon={faUser} className="text-white" /> */}
//         <button onClick={handleLogout} className="bg-transparent border-0 text-white">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import logo from '../assets/IMAGE2.png';
import backgroundImage from "../assets/backg.jpg"

const Navbar = ({ user, role, onAddBookClick, toggleSection, section }) => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://book-master-backend-new-1.onrender.com/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        localStorage.removeItem("token");
        alert("Logged out successfully");
        navigate("/", { replace: true });
      } else {
        alert("Logout failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Logout failed due to a network or server error.");
    }
  };

  const getLinkClass = (path) => {
    return section === path ? "text-yellow-500 font-bold" : "text-white";
  };

  return (
    <div className="navbar sticky top-0 text-white p-4 px-20 flex justify-between items-center w-full bg-gradient-to-r from-amber-500 to-pink-500 z-40"style={{
      backgroundImage: `url(${backgroundImage})`,
      // backgroundImage: `url('https://sbmweb.com/wp-content/uploads/2019/07/sbm-dark-background.jpg')`,
      backgroundSize: "repeat-y",
      backgroundPosition: "center",
      backgroundColor: "black",
    }}>
      <div className="navbar-brand">
        <Link to="/admin-dashboard" className="font-abril text-2xl">
          <img src={logo} className="w-[9rem]" alt="Logo" />
        </Link>
      </div>
      <div className="flex items-center flex-row gap-6">
      <button onClick={() => toggleSection("home")} className={`${getLinkClass("home")} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider`}>
          {/* Home */}
          HOME
        </button>
        <button onClick={onAddBookClick} className={`${getLinkClass("add-book")} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider`}>
          {/* Add Book */}
          ADD BOOK
        </button>
        <button onClick={() => toggleSection("userDetails")} className={`${getLinkClass("userDetails")} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider`}>
          USER LIST
        </button>
        <button onClick={() => toggleSection("bookDetails")} className={`${getLinkClass("bookDetails")} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider`}>
          BOOK DETAILS
        </button>
        <button onClick={() => toggleSection("bookingDetails")} className={`${getLinkClass("bookingDetails")} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider`}>
          {/* Purchase Details */}
          PURCHASE DETAILS
        </button>
        <button onClick={() => toggleSection("enquiryDetails")} className={`${getLinkClass("enquiryDetails")} hover:text-yellow-300 transition duration-300 ease-in-out  transform hover:-translate-y-1 hover:scale-105 tracking-wider`}>
          ENQUIRIES
        </button>
        <button onClick={handleLogout} className="bg-transparent border-0 text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider">
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Navbar;

