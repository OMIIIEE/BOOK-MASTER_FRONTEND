

import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarUser from "./NavbarUser";
import SidebarUser from "./SidebarUser";
import Footer from "./Footer";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [booksMap, setBooksMap] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Number of orders per page, adjust as needed
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://book-master-backend-new-1.onrender.com/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        console.log(res.data.user)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return;
        const token = localStorage.getItem("token");

        // Fetch purchases for the current user
        const ordersRes = await axios.get(`https://book-master-backend-new-1.onrender.com/api/purchases/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Fetched orders data:", ordersRes.data);
        const purchases = ordersRes.data || [];

        // Create a mapping of bookId to book details for faster lookup
        const booksMap = {};
        purchases.forEach((purchase) => {
          booksMap[purchase.bookId._id] = {
            name: purchase.bookName,
            authorName: purchase.authorName,
            price: purchase.bookPrice,
            imageLink: purchase.imageLink,
          };
        });

        setOrders([...purchases.reverse()]);
        setBooksMap(booksMap);
      } catch (error) {
        console.error("Error fetching orders data:", error);
        setError(error.message);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  // Pagination logic
  const indexOfLastOrder = currentPage * pageSize;
  const indexOfFirstOrder = indexOfLastOrder - pageSize;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
    
      {/* <SidebarUser user={user}/> */}
      <NavbarUser user={user} />
      <div className="w-full flex flex-col items-center justify-center mb-8">
        
        <div className="absolute pt-4 pl-4 mt-20 left-0 top-0">
        <Link to={"/user-dashboard"}>
          <button className="flex justify-center text-black items-center gap-2  rounded uppercase hover:text-pink-500 hover:scale-110 transition-transform duration-300 text-xl ">
            <span className="border border-pink-500 rounded-full p-1">
              <MoveLeft />
            </span>
            BACK
          </button>
        </Link>
      </div>
        <h2 className="mb-4 mt-24 text-3xl md:text-5xl text-[#FDC702] font-comforter text-center">Your Orders</h2>
        {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
        <div className="flex flex-col w-3/4">
          {currentOrders.length > 0 ? (
            currentOrders.map((order, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-lg bg-white flex flex-row items-center"
              >
                <div className="w-1/3">
                  <img
                    src={
                      booksMap[order.bookId._id]?.imageLink ||
                      "https://via.placeholder.com/150"
                    }
                    alt={booksMap[order.bookId._id]?.name || "Book Image"}
                    className="h-[40vh] object-fit mb-4 w-[18rem] rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl text-center h-12 font-abril text-[#00224D] hover:text-[#029D9D] no-underline">
                    {booksMap[order.bookId._id]?.name || "Unknown Book"}
                  </h3>
                  <p className="mb-1">
                    <strong>Author:</strong>{" "}
                    {booksMap[order.bookId._id]?.authorName || "Unknown Author"}
                  </p>
                  <h3 className="mb-1">
                    <strong>Book Price:</strong> {booksMap[order.bookId._id]?.price || "N/A"}
                  </h3>
                  <p className="mb-1">
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p className="mb-1">
                    <strong>Total Price:</strong> Rs {order.totalPrice}
                  </p>
                  <p className="mb-1">
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.purchaseDate).toDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
        {/* Pagination controls */}
        {orders.length > pageSize && (
          <ul className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.ceil(orders.length / pageSize) }).map(
              (item, index) => (
                <li
                  key={index}
                  className={`px-3 py-1 cursor-pointer rounded-full border ${
                    currentPage === index + 1
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              )
            )}
          </ul>
        )}
         
      </div>
  
  
       <Footer/>
       </div>
  );
};

export default Orders;
