import React, { useState } from "react";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";

const MyBooking = () => {
  // Dummy booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      packageName: "Everest Base Camp Trek",
      date: "March 15, 2025",
      price: "₹80,000",
      status: "Confirmed",
      image: "https://via.placeholder.com/150", // Replace with actual image
    },
    {
      id: 2,
      packageName: "Pokhara & Phewa Lake",
      date: "April 10, 2025",
      price: "₹20,000",
      status: "Pending",
      image: "https://via.placeholder.com/150", // Replace with actual image
    },
    {
      id: 3,
      packageName: "Chitwan Jungle Safari",
      date: "May 5, 2025",
      price: "₹25,000",
      status: "Cancelled",
      image: "https://via.placeholder.com/150", // Replace with actual image
    },
  ]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-25">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">My Bookings</h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Track your upcoming trips and booking status.
        </p>

        {/* Booking List */}
        <div className="flex flex-col items-center space-y-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl flex items-center">
                <img src={booking.image} alt={booking.packageName} className="w-24 h-24 object-cover rounded-lg mr-6" />
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-800">{booking.packageName}</h2>
                  <p className="text-gray-700">Booking ID: {booking.id}</p>
                  <p className="text-gray-700">Date: {new Date(booking.date).toLocaleDateString()}</p>
                  <p className="text-gray-700">Amount: ₹{booking.price}</p>
                  <p className="text-gray-700">Tickets: {booking.tickets}</p>
                  <p className={`text-lg font-bold ${booking.status === "Confirmed" ? "text-red-800" : booking.status === "Pending" ? "text-yellow-800" : "text-red-800"}`}>
                    Status: {booking.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-800 text-center">You have no bookings yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBooking;
