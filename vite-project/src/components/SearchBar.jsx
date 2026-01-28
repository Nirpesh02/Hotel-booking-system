import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { getMinCheckInDate, getMinCheckOutDate } from '../utils/helpers';

export const SearchBar = ({ onSearch, compact = false }) => {
  const { searchFilters, updateSearchFilters } = useBooking();
  const [localFilters, setLocalFilters] = useState(searchFilters);

  const handleSearch = () => {
    // Prevent search if location is empty
    if (!localFilters.location.trim()) {
      alert('Please enter a location to search hotels.');
      return;
    }

    // Update global filters
    updateSearchFilters(localFilters);

    // Trigger search callback with filters
    if (onSearch) onSearch(localFilters);
  };

  const handleChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Compact mode
  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Where to?"
              value={localFilters.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    );
  }

  // Full mode
  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="City or destination"
              value={localFilters.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Check-in */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={localFilters.checkIn}
              min={getMinCheckInDate()}
              onChange={(e) => handleChange('checkIn', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Check-out */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={localFilters.checkOut}
              min={getMinCheckOutDate(localFilters.checkIn)}
              onChange={(e) => handleChange('checkOut', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="10"
              value={localFilters.guests}
              onChange={(e) =>
                handleChange('guests', parseInt(e.target.value, 10) || 1)
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6">
        <button
          onClick={handleSearch}
          className="w-full bg-primary text-pink-500 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Search Hotels</span>
        </button>
      </div>
    </div>
  );
};
