// src/components/EnquiryList.js
import React from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const EnquiryList = ({ enquiries, setEnquiries }) => {
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:9003/api/enquiry/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(enquiries.filter((enquiry) => enquiry._id !== id));
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  return (
    <div className="overflow-x-auto w-[1200px]">
      <h2 className="text-2xl font-abril mb-4 text-center">USER ENQUIRIES</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
          <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Subject</th>
            <th className="py-2 px-4 border-b">Message</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry,index) => (
            <tr key={enquiry._id}>
                <td className="py-2 px-4 border-b">{index+1}</td>
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
    </div>
  );
};

export default EnquiryList;
