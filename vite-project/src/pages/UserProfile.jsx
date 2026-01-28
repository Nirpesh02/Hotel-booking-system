import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, CheckCircle, XCircle, Edit2, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useWishlist } from '../context/WishlistContext';
import { formatDate, formatPrice } from '../utils/helpers';
import { hotels } from '../data/mockData';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const UserProfile = ({ onNavigate }) => {
  const { user, updateProfile } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const { wishlist, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('bookings');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Please login to view your profile</h2>
          <button 
            onClick={() => onNavigate('login')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  const wishlistHotels = hotels.filter(hotel => wishlist.includes(hotel.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl text-white">{user.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="mb-1">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 px-6 py-4 text-center ${
                  activeTab === 'bookings' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`flex-1 px-6 py-4 text-center ${
                  activeTab === 'wishlist' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Wishlist ({wishlist.length})
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-center ${
                  activeTab === 'profile' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Profile Settings
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map(booking => (
                    <div 
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Hotel Image */}
                        <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0">
                          <ImageWithFallback
                            src={booking.hotelImage}
                            alt={booking.hotelName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Booking Info */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3>{booking.hotelName}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700' 
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {booking.status === 'confirmed' && <CheckCircle className="inline h-4 w-4 mr-1" />}
                              {booking.status === 'cancelled' && <XCircle className="inline h-4 w-4 mr-1" />}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>Check-in: {formatDate(booking.checkIn)}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>Check-out: {formatDate(booking.checkOut)}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              <span>{booking.guests} Guests</span>
                            </div>
                            <div className="flex items-center">
                              <span>Booked: {formatDate(booking.bookingDate)}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                            <div className="text-primary">
                              Total: {formatPrice(booking.totalPrice)}
                            </div>
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">Start exploring and book your dream hotel</p>
                    <button 
                      onClick={() => onNavigate('hotels')}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
                    >
                      Browse Hotels
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                {wishlistHotels.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistHotels.map(hotel => (
                      <div 
                        key={hotel.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-48">
                          <ImageWithFallback
                            src={hotel.images[0]}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeFromWishlist(hotel.id)}
                            className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <Heart className="h-5 w-5 fill-primary text-primary" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="mb-2">{hotel.name}</h3>
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{hotel.location}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-primary">{formatPrice(hotel.price)}</span>
                            <button
                              onClick={() => onNavigate('hotel-detail', hotel.id)}
                              className="text-sm text-primary hover:text-primary/80"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-4">Save your favorite hotels to book them later</p>
                    <button 
                      onClick={() => onNavigate('hotels')}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
                    >
                      Browse Hotels
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div className="max-w-md">
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={isEditing ? editForm.name : user.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={isEditing ? editForm.phone : (user.phone || 'Not provided')}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleUpdateProfile}
                          className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditForm({ name: user.name, phone: user.phone || '' });
                          }}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Edit2 className="h-5 w-5" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
