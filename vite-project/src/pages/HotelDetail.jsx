import React, { useState } from "react";
import {
  Star,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react";

import { hotels } from "../data/mockData";
import { BookingForm } from "../components/BookingForm";
import { ReviewCard } from "../components/ReviewCard";
import { MapView } from "../components/MapView";
import { PaymentModal } from "../components/PaymentModal";
import { calculateNights } from "../utils/helpers";
import { useBooking } from "../context/BookingContext";
import { ImageWithFallback } from "../components/ImageWithFallback";

export const HotelDetail = ({ hotelId, onNavigate }) => {
  const hotel = hotels.find((h) => h.id === hotelId);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const { searchFilters } = useBooking();

  if (!hotel) return <h2>Hotel not found</h2>;

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);

  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + hotel.images.length) % hotel.images.length
    );

  const handleBookingComplete = () => {
    const nights = calculateNights(
      searchFilters.checkIn,
      searchFilters.checkOut
    );

    const totalPrice = nights > 0 ? hotel.price * nights : hotel.price;

    setBookingDetails({
      totalPrice,
      hotelName: hotel.name,
    });

    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <div className="relative h-[450px]">
        <ImageWithFallback
          src={hotel.images[currentImageIndex]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Offer Badge */}
        <div className="absolute top-6 left-6 bg-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          🔥 Special Offer -20%
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <button className="bg-white/90 p-3 rounded-full hover:scale-110 transition">
            <Heart className="h-5 w-5 text-pink-500" />
          </button>
          <button className="bg-white/90 p-3 rounded-full hover:scale-110 transition">
            <Share2 className="h-5 w-5 text-blue-500" />
          </button>
        </div>

        {/* Slider Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full"
        >
          <ChevronRight />
        </button>

        {/* Hotel Info */}
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold">{hotel.name}</h1>
          <p className="flex items-center mt-2 text-white/90">
            <MapPin className="h-5 w-5 mr-2" />
            {hotel.location}
          </p>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="max-w-6xl mx-auto flex space-x-3 overflow-x-auto py-5 px-6">
        {hotel.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="thumb"
            onClick={() => setCurrentImageIndex(index)}
            className={`h-20 w-28 rounded-xl cursor-pointer object-cover border-2 ${
              index === currentImageIndex
                ? "border-pink-500"
                : "border-transparent"
            }`}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Rooms Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Available Rooms 🛏️
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 border rounded-xl hover:shadow-lg transition">
                <h3 className="font-bold text-lg">Deluxe Room</h3>
                <p className="text-gray-600 text-sm">
                  Mountain view + Free Breakfast
                </p>
                <p className="mt-3 font-bold text-pink-600">
                  ${hotel.price}/night
                </p>
              </div>

              <div className="p-5 border rounded-xl hover:shadow-lg transition">
                <h3 className="font-bold text-lg">Luxury Suite</h3>
                <p className="text-gray-600 text-sm">
                  Jacuzzi + Premium Services
                </p>
                <p className="mt-3 font-bold text-purple-600">
                  ${hotel.price + 50}/night
                </p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Amenities ✨
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.amenities.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-pink-50 transition"
                >
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Guest Reviews ⭐
            </h2>
            {hotel.reviews.slice(0, 2).map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              FAQs ❓
            </h2>
            <p className="mb-2 font-semibold">
              ✔ Check-in time?
            </p>
            <p className="text-gray-600 mb-4">
              Check-in starts from 12:00 PM.
            </p>

            <p className="mb-2 font-semibold">
              ✔ Free cancellation?
            </p>
            <p className="text-gray-600">
              Yes, free cancellation within 24 hours.
            </p>
          </div>

          {/* Map */}
          <MapView
            latitude={hotel.latitude}
            longitude={hotel.longitude}
            hotelName={hotel.name}
          />
        </div>

        {/* RIGHT BOOKING */}
        <div className="sticky top-6 h-fit">
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-pink-200">
            <h2 className="text-xl font-bold text-center mb-4">
              Book Now 🚀
            </h2>

            <BookingForm
              hotel={hotel}
              onBookingComplete={handleBookingComplete}
            />
          </div>

          {/* Similar Hotels */}
          <div className="mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-3">Similar Hotels 🔥</h3>
            {hotels.slice(0, 3).map((h) => (
              <p
                key={h.id}
                className="cursor-pointer hover:underline"
                onClick={() => onNavigate("hotel-detail", h.id)}
              >
                {h.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && bookingDetails && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={bookingDetails.totalPrice}
          hotelName={bookingDetails.hotelName}
        />
      )}
    </div>
  );
};
