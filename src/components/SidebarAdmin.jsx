import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faSignOutAlt, faShoppingCart, faBookOpen, faEnvelope, faPhone, faAdjust } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Link,useLocation, useNavigate } from "react-router-dom";
import add from '../assets/add.png'
// import { useTheme } from './ThemeContext' // Import the theme context

const Sidebar = ({user,role,onAddBookClick,toggleBookDetails }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [showModal,setShowModal] = useState(false)
  
    const handleLogout = async({user}) => {
      const token = localStorage.getItem("token");
      // if (!token) {
      //   alert("No token found, please log in again.");
      //   navigate("/login");
      //   return;
      // }
  
      try {
        const res = await axios.post(
          "http://localhost:9003/api/auth/logout",
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
     
  
  

  return (
    <aside className="h-full w-14 flex flex-col space-y-10 items-center justify-center fixed top-0 left-0 bg-gradient-to-b from-amber-500 to-pink-500 text-white">
      {/* Profile */}
      <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
        <FontAwesomeIcon icon={faUser} className="h-6 w-6"  />
        <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
          Profile
        </span>
      </div>
      {/* Wishlist */}
      <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={onAddBookClick}>
        {/* <FontAwesomeIcon icon={faHeart} className="h-6 w-6" /> */}
       <img src={add}/>
        <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
          Add Book
        </span>
      </div>
      {/* Orders */}
      <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={toggleBookDetails}>
        {/* <Link to="/orders" className="text-white"> */}
          <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6" />
        {/* </Link> */}
        <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
          Book Details
        </span>
      </div>
      <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={toggleBookDetails}>
        {/* <Link to="/orders" className="text-white"> */}
          <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6" />
        {/* </Link> */}
        <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
          Book Details
        </span>
      </div>
      <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={toggleBookDetails}>
        {/* <Link to="/orders" className="text-white"> */}
          <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6" />
        {/* </Link> */}
        <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
          Book Details
        </span>
      </div>
      {/* Theme Switcher */}
      {/* <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={toggleTheme}>
        <FontAwesomeIcon icon={faAdjust} className="h-6 w-6" />
        <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
          Switch Theme
        </span>
      </div> */}
      {/* Logout */}
      <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="h-6 w-6" />
        <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
          Logout
        </span>
      </div>

      {/* {showProfileDropdown && (
        <div className="absolute top-12 left-16 bg-white text-black p-4 rounded-lg shadow-lg z-50">
          <div className="flex flex-col gap-2">
            <div>
              <strong>User Name :</strong> {user.username}
            </div>
            <div>
              <strong>Full Name :</strong> {user.name}
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} className="cursor-pointer mr-2" />{" "}
              {user.email}
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} className="cursor-pointer mr-2" />{" "}
              {user.phone}
            </div>
            <button
              onClick={handleLogout}
              className="mt-2 bg-red-500 text-white py-1 px-2 rounded flex flex-row items-center gap-6"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </button>
          </div>
        </div>
      )} */}
    </aside>
  );
};

export default Sidebar;



// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faHeart, faSignOutAlt, faShoppingCart, faBookOpen, faEnvelope, faPhone, faAdjust } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import {Link,useLocation, useNavigate } from "react-router-dom";
// import add from '../assets/add.png'
// // import { useTheme } from './ThemeContext' // Import the theme context

// const Sidebar = ({user,role,onAddBookClick,toggleBookDetails }) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     // const [showModal,setShowModal] = useState(false)
  
//     const handleLogout = async({user}) => {
//       const token = localStorage.getItem("token");
//       // if (!token) {
//       //   alert("No token found, please log in again.");
//       //   navigate("/login");
//       //   return;
//       // }
  
//       try {
//         const res = await axios.post(
//           "http://localhost:9003/api/auth/logout",
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (res.data.success) {
//           localStorage.removeItem("token");
//           alert("Logged out successfully");
        
//           navigate("/", { replace: true });
//         } else {
//           alert("Logout failed: " + res.data.message);
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Logout failed due to a network or server error.");
//       }
//     };
     
  
  

//   return (
//     <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center fixed top-0 left-0 bg-gradient-to-b from-amber-500 to-pink-500 text-white">
//       {/* Profile */}
//       <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
//         <FontAwesomeIcon icon={faUser} className="h-6 w-6"  />
//         <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
//           Profile
//         </span>
//       </div>
//       {/* Wishlist */}
//       <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={onAddBookClick}>
//         {/* <FontAwesomeIcon icon={faHeart} className="h-6 w-6" /> */}
//        <img src={add}/>
//         <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
//           Add Book
//         </span>
//       </div>
//       {/* Orders */}
//       <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={toggleBookDetails}>
//         {/* <Link to="/orders" className="text-white"> */}
//           <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6" />
//         {/* </Link> */}
//         <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
//           Book Details
//         </span>
//       </div>
//       {/* Theme Switcher */}
//       {/* <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={toggleTheme}>
//         <FontAwesomeIcon icon={faAdjust} className="h-6 w-6" />
//         <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
//           Switch Theme
//         </span>
//       </div> */}
//       {/* Logout */}
//       <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={handleLogout}>
//         <FontAwesomeIcon icon={faSignOutAlt} className="h-6 w-6" />
//         <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
//           Logout
//         </span>
//       </div>

//       {/* {showProfileDropdown && (
//         <div className="absolute top-12 left-16 bg-white text-black p-4 rounded-lg shadow-lg z-50">
//           <div className="flex flex-col gap-2">
//             <div>
//               <strong>User Name :</strong> {user.username}
//             </div>
//             <div>
//               <strong>Full Name :</strong> {user.name}
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faEnvelope} className="cursor-pointer mr-2" />{" "}
//               {user.email}
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faPhone} className="cursor-pointer mr-2" />{" "}
//               {user.phone}
//             </div>
//             <button
//               onClick={handleLogout}
//               className="mt-2 bg-red-500 text-white py-1 px-2 rounded flex flex-row items-center gap-6"
//             >
//               <FontAwesomeIcon icon={faSignOutAlt} />
//               Logout
//             </button>
//           </div>
//         </div>
//       )} */}
//     </aside>
//   );
// };

// export default Sidebar;
