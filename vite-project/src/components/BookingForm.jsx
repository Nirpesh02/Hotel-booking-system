/**
 * Premium BookingForm Component
 */

import React, { useState } from "react";
import { Calendar, Users, CreditCard, ShieldCheck } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import {
  calculateNights,
  formatPrice,
  getMinCheckInDate,
  getMinCheckOutDate,
} from "../utils/helpers";

export const BookingForm = ({ hotel, onBookingComplete, onLoginRequired }) => {
  const { user } = useAuth();
  const { addBooking, searchFilters } = useBooking();

  const [checkIn, setCheckIn] = useState(searchFilters.checkIn || "");
  const [checkOut, setCheckOut] = useState(searchFilters.checkOut || "");
  const [guests, setGuests] = useState(searchFilters.guests || 1);

  const nights = calculateNights(checkIn, checkOut);

  const totalPrice = nights > 0 ? hotel.price * nights : 0;

  // Extra charges example
  const serviceFee = totalPrice * 0.05;
  const finalTotal = totalPrice + serviceFee;

  const handleBooking = () => {
    if (!user) {
      onLoginRequired();
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    if (nights <= 0) {
      alert("Check-out date must be after check-in date");
      return;
    }

    if (guests > hotel.availableRooms * 2) {
      alert("Not enough rooms available for guests");
      return;
    }

    addBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.images[0],
      checkIn,
      checkOut,
      guests,
      totalPrice: finalTotal,
    });

    onBookingComplete();
  };

  return (
    <div className="sticky top-24">
      {/* Premium Card */}
      <div className="rounded-3xl shadow-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-[2px]">
        <div className="bg-white rounded-3xl p-6">

          {/* Price Header */}
          <div className="mb-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Booking Summary
            </h3>

            <p className="text-4xl font-extrabold text-primary mt-2">
              {formatPrice(hotel.price)}
            </p>
            <p className="text-sm text-gray-500">per night</p>
          </div>

          {/* Form Inputs */}
          <div className="space-y-5">

            {/* Check-in */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                min={getMinCheckInDate()}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                min={getMinCheckOutDate(checkIn)}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            {/* Guests Selector */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Guests
              </label>

              <div className="flex items-center justify-between mt-2 bg-gray-100 rounded-xl px-4 py-3">
                <button
                  onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-full bg-white shadow hover:scale-110 transition"
                >
                  -
                </button>

                <span className="font-bold text-lg">{guests}</span>

                <button
                  onClick={() =>
                    setGuests((prev) =>
                      Math.min(hotel.availableRooms * 2, prev + 1)
                    )
                  }
                  className="w-8 h-8 rounded-full bg-white shadow hover:scale-110 transition"
                >
                  +
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-1 text-center">
                Max {hotel.availableRooms * 2} guests allowed
              </p>
            </div>

            {/* Price Summary */}
            {nights > 0 && (
              <div className="border-t pt-4 space-y-2 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {formatPrice(hotel.price)} × {nights} nights
                  </span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee (5%)</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            )}

            {/* Reserve Button */}
            <button
              onClick={handleBooking}
              disabled={hotel.availableRooms === 0}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-indigo-600 hover:opacity-90 shadow-lg transition flex justify-center items-center gap-2"
            >
              <CreditCard className="h-5 w-5" />
              {hotel.availableRooms === 0 ? "Sold Out" : "Reserve Now 🚀"}
            </button>

            {/* Login Note */}
            {!user && (
              <p className="text-xs text-center text-red-500 font-medium">
                ⚠️ Please login to confirm your booking
              </p>
            )}

            {/* Secure Booking */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-3">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              Secure Booking • No hidden charges
            </div>

            {/* Rooms */}
            <p className="text-center text-sm text-gray-600 mt-2">
              🏨 {hotel.availableRooms} rooms available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
