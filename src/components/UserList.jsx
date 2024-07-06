// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrash } from "react-icons/fa";

// const UserList = ({ users }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 3;
//   const totalPages = Math.ceil(users.length / usersPerPage);


//   const convertToIST = (utcDateString) => {
//     const date = new Date(utcDateString);
//     const istOffset = (6.5 - 12) * 60 * 60 * 1000; // IST offset in milliseconds
//     const istTime = new Date(date.getTime() + istOffset);
//     return istTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
//   };

//   const renderLogs = (logs) => {
//     if (!logs || !Array.isArray(logs) || logs.length === 0) return "No logs recorded";


//     return logs.map((log, index) => {
//       const loginTime = convertToIST(log.loginTime);
//       const logoutTime = log.logoutTime
//         ? convertToIST(log.logoutTime)
//         : "Currently Logged In";
//       return (
//         <tr key={index} className="log-entry">
//           <td className="border px-4 py-2">{loginTime}</td>
//           <td className="border px-4 py-2">{logoutTime}</td>
//         </tr>
//       );
//     });
//   };

//   const handleDelete = async (userId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (confirmDelete) {
//       try {
//         // Assuming you have stored the token in localStorage
//         const token = localStorage.getItem("token");

//         if (!token) {
//           alert("Authorization token is missing. Please login again.");
//           return;
//         }

//         const response = await axios.delete(
//           `https://book-master-backend-new-1.onrender.com/api/auth/user/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           alert("User deleted successfully");
//           window.location.reload(); // Refreshes the page to update the list
//         } else {
//           alert("Failed to delete user");
//         }
//       } catch (error) {
//         console.error("Error response:", error.response);
//         console.error("There was an error deleting the user!", error);
//         alert(
//           `An error occurred while deleting the user: ${
//             error.response ? error.response.data.message : error.message
//           }`
//         );
//       }
//     }
//   };

//   // Calculate the users to display for the current page
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));


//   return (
//     <div className="container p-8 w-full flex flex-col items-center mt-8">
//      {/* <button
//   onClick={toggleDropdown}
//   className="inline-block px-6 py-1 bg-white text-[#5AB2FF] font-medium border-2 rounded hover:text-white !hover:bg-custom-blue transition-colors duration-300"
// >
//   Show User List
// </button> */}


// <h2 className="text-2xl font-abril mb-4">User List</h2>
//         {/* <div className="absolute z-1 top-full bg-white shadow-lg rounded mt-1 overflow-y-auto max-h-90 w-[82rem]"> */}
//           <table className="min-w-full divide-y divide-gray-200 w-[1300px]">
//             <thead className="bg-gray-100">
//               <tr className="">
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Username</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Phone</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Login Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Logout Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.map((user) => (
//                 <tr key={user._id} className="text-center">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300"><div className="font-bold">{user.name}</div></td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300"><div className="font-bold">{user.username}</div></td>
//                   <td className="border px-4 py-2">{user.email}</td>
//                   <td className="border px-4 py-2">{user.phone}</td>
//                   <td
//                     className="px-6 py-4 whitespace-nowrap border"
//                     colSpan="2"
//                   >
//                     <div className="log-container overflow-y-auto max-h-20">
//                       <table className="min-w-full divide-y divide-gray-200">
//                         <tbody>{renderLogs(user.logs)}</tbody>
//                       </table>
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2">
//                     <button
//                       onClick={() => handleDelete(user._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
   
//     // </div>
//   );
// };

// export default UserList;

import React, { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Pagination from "./Pagination"; // Adjust the path as necessary

const UserList = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const convertToIST = (utcDateString) => {
    const date = new Date(utcDateString);
    const istOffset = (6.5 - 12) * 60 * 60 * 1000; // IST offset in milliseconds
    const istTime = new Date(date.getTime() + istOffset);
    return istTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const renderLogs = (logs) => {
    if (!logs || !Array.isArray(logs) || logs.length === 0) return "No logs recorded";

    return logs.map((log, index) => {
      const loginTime = convertToIST(log.loginTime);
      const logoutTime = log.logoutTime ? convertToIST(log.logoutTime) : "Currently Logged In";
      return (
        <tr key={index} className="log-entry">
          <td className="border px-4 py-2">{loginTime}</td>
          <td className="border px-4 py-2">{logoutTime}</td>
        </tr>
      );
    });
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Authorization token is missing. Please login again.");
          return;
        }

        const response = await axios.delete(`https://book-master-backend-new-1.onrender.com/api/auth/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          alert("User deleted successfully");
          window.location.reload(); // Refreshes the page to update the list
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.error("Error response:", error.response);
        console.error("There was an error deleting the user!", error);
        alert(
          `An error occurred while deleting the user: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
    }
  };

  // Calculate the users to display for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="container p-8 w-full flex flex-col items-center mt-8">
      <h2 className="text-2xl font-semibold mb-4 uppercase tracking-wider">User List</h2>
      <table className="min-w-full divide-y divide-gray-200 w-[1390px]">
        <thead className="bg-gray-100">
          <tr className="">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Username</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Email</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Login Time</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Logout Time</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300"><div className="font-bold">{user.name}</div></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300"><div className="font-bold">{user.username}</div></td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap border" colSpan="2">
                <div className="log-container overflow-y-auto max-h-24">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody>{renderLogs(user.logs)}</tbody>
                  </table>
                </div>
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800">
                  <FaTrash />
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

export default UserList;
