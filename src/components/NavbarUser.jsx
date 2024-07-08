import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faSignOutAlt, faShoppingCart, faEnvelope, faPhone, faAdjust, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import logo from '../assets/IMAGE2.png';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';
import avatar4 from '../assets/avatar4.jpg';
import avatar5 from '../assets/avatar5.jpg';
import avatar6 from '../assets/avatar6.jpg';
import FeedbackForm from './FeedbackForm'; 
import AOS from "aos";
import "aos/dist/aos.css";


const availableAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

const NavbarUser = ({ user, wishlistCount, onAddBookClick }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || null);
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);


  useEffect(() => {
    if (user) {
      setSelectedAvatar(user.avatar);
    }
  }, [user]);

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'https://book-master-backend-new-1.onrender.com/api/auth/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        navigate('/', { replace: true });
      } else {
        alert('Logout failed: ' + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Logout failed due to a network or server error.');
    }
  };

  const handleAvatarClick = async (avatar) => {
    setSelectedAvatar(avatar);

    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        'https://book-master-backend-new-1.onrender.com/api/auth/user/avatar',
        { avatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert('Avatar updated successfully');
      } else {
        alert('Failed to update avatar. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update avatar. Please try again.');
    }
    setShowProfileDropdown(false);
  };

  return (
    <div className="navbar bg-gradient-to-r to-amber-500 from-pink-500 text-white py-2 px-24 flex justify-between items-center sticky top-0 left-0 right-0 z-50 shadow-2xl bg-#0D0B26 bg-opacity-900"
    style={{
      // backgroundImage: `url(${backgroundImage})`,
      backgroundImage: `url('https://sbmweb.com/wp-content/uploads/2019/07/sbm-dark-background.jpg')`,
      // backgroundSize: "repeat-y",
      backgroundPosition: 'center',
      backgroundColor: "black",
    }} >
      <div className="navbar-brand">
        <Link to="/user-dashboard" className="font-abril text-2xl">
          <img src={logo} className="w-[10rem] " alt="Logo" />
        </Link>
      </div>
      <div className="flex items-center flex-row gap-8 relative">
        <div className="text-xl">Welcome, {user ? user.username : 'Guest'}</div>
        <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={onAddBookClick}>
          <FontAwesomeIcon icon={faHeart} className="h-6 w-6" />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-xs ">
              {wishlistCount}
            </span>
          )}
          <span className="absolute top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
            Wishlist
          </span>
        </div>
        <Link to="/orders" className="text-white">
        <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:duration-300 hover:ease-linear focus:bg-white hover:bg-white">
         
            <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6" />
        
          <span className="absolute top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
            Orders
          </span>
        </div>
        </Link>
        <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-black hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white" onClick={() => setShowFeedbackForm(true)}>
          <FontAwesomeIcon icon={faComment} className="h-6 w-6" />
         
          <span className="absolute top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
            Feedback
          </span>
        </div>
       
        {selectedAvatar ? (
          <img
            src={selectedAvatar}
            alt="Avatar"
            className="cursor-pointer w-14 rounded-full"
            onClick={handleProfileClick}
          />
        ) : (
          // <FontAwesomeIcon
          //   icon={faUserCircle}
          //   className="cursor-pointer h-10 w-7 "
          //   onClick={handleProfileClick}
          //   size='64'
          // />
          <div className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group hover:text-gray-800 hover:duration-300 hover:ease-linear focus:bg-white hover:bg-white"  onClick={handleProfileClick}>
         
          <FontAwesomeIcon icon={faUserCircle} className="h-7 w-7" />
      
        <span className="absolute top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-sm rounded-md px-2 py-1">
          Profile
        </span>
      </div>
          
        )}
        
        {showProfileDropdown && (
          <div className="absolute top-16 -right-12 bg-white text-black p-4 rounded-lg shadow-lg z-50 w-[250px]" data-aos="fade-left">
            <div className="flex flex-col gap-2">
              <div>
                <strong>User Name :</strong> {user.username}
              </div>
              <div>
                <strong>Full Name :</strong> {user.name}
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} className="cursor-pointer mr-2" />
                {user.email}
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="cursor-pointer mr-2"
                />
                {user.phone}
              </div>
              <div className="mt-2">
                <strong>Select Your Avatar:</strong>
                <div className="flex gap-2 mt-2 flex flex-wrap">
                  {availableAvatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="cursor-pointer w-14 rounded-full hover:scale-110 transition-transform duration-300"
                      onClick={() => handleAvatarClick(avatar)}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-500 text-white py-1 px-2 rounded flex flex-row items-center gap-6"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      {showFeedbackForm && <FeedbackForm onClose={() => setShowFeedbackForm(false)} />} 
    </div>
  );
};

export default NavbarUser;


