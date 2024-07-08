

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "../assets/IMAGE2.png";
import backgroundImage from "../assets/backg.jpg";
import {
  faHome,
  faEnvelope,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FaBookMedical } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";
import { FaBookOpenReader, FaOpencart } from "react-icons/fa6";

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
    <div
      className="navbar sticky top-0 text-white p-4 px-20 flex justify-between items-center w-full bg-gradient-to-r from-amber-500 to-pink-500 z-40"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        // backgroundImage: `url('https://sbmweb.com/wp-content/uploads/2019/07/sbm-dark-background.jpg')`,
        backgroundSize: "repeat-y",
        backgroundPosition: "center",
        // backgroundColor: "black",
      }}
    >
      <div className="navbar-brand">
        <Link to="/admin-dashboard" className="font-abril text-2xl">
          <img src={logo} className="w-[9rem]" alt="Logo" />
        </Link>
      </div>
      <div className="flex items-center flex-row gap-6">
        <button
          onClick={() => toggleSection("home")}
          className={`${getLinkClass(
            "home"
          )} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider`}
        >
          {/* Home */}
          <FontAwesomeIcon icon={faHome} className="mr-1" />
          HOME
        </button>
        <button
          onClick={onAddBookClick}
          className={`${getLinkClass(
            "add-book"
          )} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider flex flex-row gap-1 items-center`}
        >
          {/* Add Book */}
          <FaBookMedical className="" />
          ADD BOOK
        </button>
        <button
          onClick={() => toggleSection("userDetails")}
          className={`${getLinkClass(
            "userDetails"
          )} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider flex flex-row gap-1 items-center`}
        >
          <PiUserListFill size={24} />
          USER LIST
        </button>
        <button
          onClick={() => toggleSection("bookDetails")}
          className={`${getLinkClass(
            "bookDetails"
          )} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider flex flex-row gap-1 items-center`}
        >
          <FaBookOpenReader size={20} />
          BOOK DETAILS
        </button>
        <button
          onClick={() => toggleSection("bookingDetails")}
          className={`${getLinkClass(
            "bookingDetails"
          )} hover:text-yellow-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 tracking-wider flex flex-row gap-1 items-center`}
        >
          {/* Purchase Details */}
          <FaOpencart size={24} />
          PURCHASE DETAILS
        </button>
        <button
          onClick={() => toggleSection("enquiryDetails")}
          className={`${getLinkClass(
            "enquiryDetails"
          )} hover:text-yellow-300 transition duration-300 ease-in-out  transform hover:-translate-y-1 hover:scale-105 tracking-wider`}
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
          ENQUIRIES
        </button>

        <div
          className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:duration-300 hover:ease-linear focus:bg-white hover:bg-white"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className=" h-6 w-6" />

          <span className="absolute top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
