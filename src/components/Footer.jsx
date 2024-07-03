import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGoogle, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import appLogo from '../assets/IMAGE2.png';

const Footer = () => {
  const location = useLocation();

  return (
    <div className="footer bg-cover bg-center bg-[#17233F] h-auto" style={{ backgroundImage: `url(${"https://codewithsadee.github.io/tourest/assets/images/footer-bg.png"})` }}>
      <div className="container mx-auto px-4 py-8 text-white">
        {location.pathname !== "/admin-dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src={appLogo} alt="Tourist" className="w-28" />
              <p className="newsletter-text">For the latest deals and tips, travel no further than your inbox</p>
            </div>
            <div className="footer-list md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <p className="footer-list-title text-2xl mb-4">Best Sellers</p>
                  <ul>
                    <li><a href="#" className="footer-link">Ikigai</a></li>
                    <li><a href="#" className="footer-link">Bharat Matters</a></li>
                    <li><a href="#" className="footer-link">Make Epic Money</a></li>
                    <li><a href="#" className="footer-link">Acts of God</a></li>
                    <li><a href="#" className="footer-link">It Ends with Us</a></li>
                  </ul>
                </div>
                <div>
                  <p className="footer-list-title text-2xl mb-4">Discover</p>
                  <ul>
                    <li><a href="#" className="footer-link">Home</a></li>
                    <li><a href="#" className="footer-link">About</a></li>
                    <li><a href="#" className="footer-link">Blog</a></li>
                  </ul>
                </div>
                <div>
                  <p className="footer-list-title text-2xl mb-4">Quick links</p>
                  <ul>
                    <li><a href="#" className="footer-link">Gallery</a></li>
                    <li><a href="#" className="footer-link">Contact</a></li>
                    <li><a href="/login" className="footer-link">Login</a></li>
                    <li><a href="/register" className="footer-link">Register</a></li>
                  </ul>
                </div>
                <div>
                  <p className="footer-list-title text-2xl mb-4">Contact</p>
                  <ul>
                    <li className="flex flex-row gap-2 items-center"><FaMapMarkerAlt /><p>Address</p>: <p>Pune, India</p></li>
                    <li className="flex flex-row gap-2 items-center"><FaEnvelope /><p>Email</p>: <p>om@gmail.com</p></li>
                    <li className="flex flex-row gap-2 items-center"><FaPhone /> <p>Phone</p>: <p>+91 9798715***</p></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="footer-bottom flex justify-between items-center mt-8">
          <a href="#" className="logo font-pacifico text-2xl">The Book Master</a>
          <p className="copyright">&copy; 2024 <a href="#" className="copyright-link"></a>. All Rights Reserved</p>
          <ul className="social-list flex gap-4 text-2xl">
            <li className="hover:scale-125 transition-transform duration-300"><a href="#" className="social-link"><FaFacebook /></a></li>
            <li className="hover:scale-125 transition-transform duration-300"><a href="#" className="social-link"><FaTwitter /></a></li>
            <li className="hover:scale-125 transition-transform duration-300"><a href="#" className="social-link"><FaInstagram /></a></li>
            <li className="hover:scale-125 transition-transform duration-300"><a href="#" className="social-link"><FaLinkedin /></a></li>
            <li className="hover:scale-125 transition-transform duration-300"><a href="#" className="social-link"><FaGoogle /></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
