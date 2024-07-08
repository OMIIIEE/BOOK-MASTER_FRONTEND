import React, { useState } from 'react';
import Pagination from './Pagination';

const Booking = ({ bookings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 8;

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container p-8 w-full flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 uppercase tracking-wider">purchase Information</h2>
      <table className="min-w-full w-[1400px] bg-white border border-gray-200">
        <thead className='bg-gray-100'>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">User Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Book Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Total Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking, index) => (
            <tr key={index} className='text-center'>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.userName}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.email}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.bookName}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.author}</td>
              <td className="py-2 px-4 border-b border border-gray-300">Rs {booking.price}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.quantity}</td>
              <td className="py-2 px-4 border-b border border-gray-300">Rs {booking.totalPrice}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={Math.ceil(bookings.length / bookingsPerPage)}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Booking;
