
import React, { useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import Pagination from "../components/Pagination";


const EnquiryList = ({ enquiries, setEnquiries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const enquiriesPerPage = 5; 
  const totalPages = Math.ceil(enquiries.length / enquiriesPerPage);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://book-master-backend-new-1.onrender.com/api/enquiry/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(enquiries.filter((enquiry) => enquiry._id !== id));
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = enquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center tracking-wider">USER ENQUIRIES</h2>
      <table className="min-w-full bg-white border border-gray-200 w-[1300px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Subject</th>
            <th className="py-2 px-4 border-b">Message</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEnquiries.map((enquiry, index) => (
            <tr key={enquiry._id}>
              <td className="py-2 px-4 border-b">{indexOfFirstEnquiry + index + 1}</td>
              <td className="py-2 px-4 border-b">{enquiry.name}</td>
              <td className="py-2 px-4 border-b">{enquiry.email}</td>
              <td className="py-2 px-4 border-b">{enquiry.subject}</td>
              <td className="py-2 px-4 border-b">{enquiry.message}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(enquiry._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default EnquiryList;
