/**
 * Premium HotelCard Component
 * Modern Booking.com style UI
 */

import React from "react";
import { Star, MapPin, Heart, Sparkles } from "lucide-react";
import { formatPrice } from "../utils/helpers";
import { useWishlist } from "../context/WishlistContext";
import { ImageWithFallback } from "./ImageWithFallback";

export const HotelCard = ({ hotel, onSelect }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(hotel.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (inWishlist) removeFromWishlist(hotel.id);
    else addToWishlist(hotel.id);
  };

  return (
    <div
      onClick={() => onSelect(hotel.id)}
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2"
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">

        {/* Hotel Image */}
        <ImageWithFallback
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            className={`h-5 w-5 ${
              inWishlist
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </button>

        {/* Featured Badge */}
        {hotel.rating >= 4.8 && (
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold shadow">
            <Sparkles className="h-4 w-4" />
            Featured
          </div>
        )}

        {/* Rooms Badge */}
        {hotel.availableRooms > 0 && hotel.availableRooms <= 5 && (
          <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
            Only {hotel.availableRooms} rooms left!
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">

        {/* Name + Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition">
            {hotel.name}
          </h3>

          <div className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-lg text-sm font-medium shadow">
            <Star className="h-4 w-4 fill-white" />
            {hotel.rating}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          {hotel.location}
        </div>

        {/* Stars */}
        <div className="flex items-center mb-3">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
            >
              {amenity}
            </span>
          ))}

          {hotel.amenities.length > 3 && (
            <span className="text-xs text-gray-400">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center border-t pt-4">

          {/* Price */}
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-primary">
              {formatPrice(hotel.price)}
            </p>
            <p className="text-xs text-gray-400">per night</p>
          </div>

          {/* Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(hotel.id);
            }}
            className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold shadow hover:bg-primary/90 hover:scale-105 transition"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};
