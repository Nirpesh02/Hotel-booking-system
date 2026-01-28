import React, { useState, useMemo } from "react";
import { Filter, SlidersHorizontal, Sparkles } from "lucide-react";
import { HotelCard } from "../components/HotelCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { SearchBar } from "../components/SearchBar";
import { hotels } from "../data/mockData";
import { useBooking } from "../context/BookingContext";

export const HotelListing = ({ onNavigate }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("popular");

  const { searchFilters, resetFilters } = useBooking();

  // Filter + Sort hotels
  const filteredHotels = useMemo(() => {
    let results = hotels.filter((hotel) => {
      if (
        searchFilters.location &&
        !hotel.city.toLowerCase().includes(searchFilters.location.toLowerCase()) &&
        !hotel.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      ) {
        return false;
      }

      if (
        hotel.price < searchFilters.priceRange[0] ||
        hotel.price > searchFilters.priceRange[1]
      ) {
        return false;
      }

      if (
        searchFilters.starRating.length > 0 &&
        !searchFilters.starRating.includes(hotel.stars)
      ) {
        return false;
      }

      if (searchFilters.amenities.length > 0) {
        const hasAllAmenities = searchFilters.amenities.every((amenity) =>
          hotel.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    // Sorting
    if (sortOption === "price-low") {
      results.sort((a, b) => a.price - b.price);
    }
    if (sortOption === "price-high") {
      results.sort((a, b) => b.price - a.price);
    }
    if (sortOption === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [searchFilters, sortOption]);

  const handleHotelSelect = (hotelId) => {
    onNavigate("hotel-detail", hotelId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-2">
            Find Your Perfect Stay 🏨
          </h1>
          <p className="text-white/90">
            Explore luxury hotels, resorts & budget stays across Nepal
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-lg -mt-6 rounded-2xl max-w-5xl mx-auto px-6 py-6">
        <SearchBar compact />
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:block w-72 shrink-0 sticky top-6 h-fit">
          <div className="bg-white shadow-lg rounded-2xl p-5">
            <FilterSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            {/* Result Info */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 px-5 py-3 rounded-xl shadow-sm">
              <h2 className="font-bold text-lg">
                {filteredHotels.length} Hotels Found ✨
              </h2>
              {searchFilters.location && (
                <p className="text-gray-600 text-sm">
                  in {searchFilters.location}
                </p>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-3 rounded-xl border shadow-sm focus:ring-2 focus:ring-pink-400"
            >
              <option value="popular">Sort: Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center space-x-2 px-5 py-3 rounded-xl bg-pink-500 text-white shadow-md hover:bg-pink-600 transition"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Hotel Grid */}
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredHotels.map((hotel, index) => (
                <div
                  key={hotel.id}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  {/* Featured Badge */}
                  {index === 0 && (
                    <div className="absolute z-10 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Sparkles className="h-4 w-4" />
                      Featured
                    </div>
                  )}

                  <HotelCard
                    hotel={hotel}
                    onSelect={handleHotelSelect}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <Filter className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">
                No hotels found 😢
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting filters or searching another location.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:opacity-90 transition"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredHotels.length > 6 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 rounded-full bg-indigo-500 text-white font-semibold shadow-lg hover:bg-indigo-600 transition">
                Load More Hotels
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white overflow-y-auto rounded-l-2xl shadow-xl">
            <FilterSidebar onClose={() => setShowFilters(false)} isMobile />
          </div>
        </div>
      )}
    </div>
  );
};
