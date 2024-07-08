import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AddBookForm from "./components/AddBookForm";
import Wishlist from "./pages/Wishlist";
import axios from "axios";
import BookDetails from "./components/BookDetails";
import Orders from "./components/Orders";
import HomePage from "./pages/HomePage";
import OtpVerification from "./pages/OtpVerification"

function App() {
  return (
    <>
     
      <Router>
        <Routes>
         
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/add-book" element={<AddBookForm />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify-otp" element={<OtpVerification/>} />
          
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
