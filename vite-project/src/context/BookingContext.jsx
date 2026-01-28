/**
 * Booking Context
 * Manages hotel bookings and search filters
 */

import React, { createContext, useContext, useState } from 'react';

const defaultFilters = {
  location: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  priceRange: [0, 20000],
  starRating: [],
  amenities: [],
};

const BookingContext = createContext(undefined);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [searchFilters, setSearchFilters] = useState(defaultFilters);

  // Add a new booking
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  // Cancel a booking
  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );
  };

  // Update search filters
  const updateSearchFilters = (filters) => {
    setSearchFilters((prev) => ({ ...prev, ...filters }));
  };

  // Reset filters to default
  const resetFilters = () => {
    setSearchFilters(defaultFilters);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        searchFilters,
        addBooking,
        cancelBooking,
        updateSearchFilters,
        resetFilters,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use booking context
// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
