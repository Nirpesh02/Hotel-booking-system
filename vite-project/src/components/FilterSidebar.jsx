/**
 * Premium FilterSidebar Component
 */

import React, { useState } from "react";
import { Star, X, SlidersHorizontal, RefreshCcw } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { availableAmenities } from "../data/mockData";

export const FilterSidebar = ({ onClose, isMobile = false }) => {
  const { searchFilters, updateSearchFilters, resetFilters } = useBooking();

  const [localPriceRange, setLocalPriceRange] = useState(
    searchFilters.priceRange
  );

  // ⭐ Star Rating Toggle
  const handleStarRatingChange = (star) => {
    const newStarRating = searchFilters.starRating.includes(star)
      ? searchFilters.starRating.filter((s) => s !== star)
      : [...searchFilters.starRating, star];

    updateSearchFilters({ starRating: newStarRating });
  };

  // ⭐ Amenity Toggle
  const handleAmenityChange = (amenity) => {
    const newAmenities = searchFilters.amenities.includes(amenity)
      ? searchFilters.amenities.filter((a) => a !== amenity)
      : [...searchFilters.amenities, amenity];

    updateSearchFilters({ amenities: newAmenities });
  };

  // ⭐ Price Change
  const handlePriceChange = (value, index) => {
    const newRange = [...localPriceRange];
    newRange[index] = value;

    setLocalPriceRange(newRange);
    updateSearchFilters({ priceRange: newRange });
  };

  // ⭐ Reset
  const handleReset = () => {
    resetFilters();
    setLocalPriceRange([0, 20000]);
    if (onClose) onClose();
  };

  return (
    <div
      className={`${
        isMobile ? "h-full" : "rounded-3xl shadow-xl"
      } bg-white border border-gray-100 p-6`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">Filters</h3>
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3 text-gray-800">
          Price Range (NPR)
        </h4>

        <div className="bg-gray-50 p-4 rounded-2xl space-y-4">
          {/* Min */}
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Min: <span className="font-bold">{localPriceRange[0]}</span>
            </p>
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={localPriceRange[0]}
              onChange={(e) =>
                handlePriceChange(parseInt(e.target.value, 10), 0)
              }
              className="w-full accent-purple-500"
            />
          </div>

          {/* Max */}
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Max: <span className="font-bold">{localPriceRange[1]}</span>
            </p>
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={localPriceRange[1]}
              onChange={(e) =>
                handlePriceChange(parseInt(e.target.value, 10), 1)
              }
              className="w-full accent-pink-500"
            />
          </div>

          <p className="text-xs text-gray-500 text-center">
            Showing hotels between NPR {localPriceRange[0]} -{" "}
            {localPriceRange[1]}
          </p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3 text-gray-800">
          Star Rating
        </h4>

        <div className="space-y-3">
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => handleStarRatingChange(star)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition ${
                searchFilters.starRating.includes(star)
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                {Array.from({ length: star }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      searchFilters.starRating.includes(star)
                        ? "fill-white"
                        : "fill-yellow-400 text-yellow-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{star} Stars</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3 text-gray-800">
          Amenities
        </h4>

        <div className="max-h-56 overflow-y-auto pr-2 space-y-2">
          {availableAmenities.map((amenity) => (
            <label
              key={amenity}
              className={`flex items-center px-4 py-2 rounded-xl cursor-pointer transition ${
                searchFilters.amenities.includes(amenity)
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                checked={searchFilters.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="w-4 h-4 accent-primary"
              />
              <span className="ml-3 text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        {/* Apply */}
        {isMobile && (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition"
          >
            Apply Filters ✅
          </button>
        )}

        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition"
        >
          <RefreshCcw className="h-4 w-4" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};
