// types.js
// This file defines the shape of objects in plain JavaScript

// Hotel object example shape
export const Hotel = {
  id: '',
  name: '',
  description: '',
  location: '',
  city: '',
  price: 0,
  rating: 0,
  stars: 0,
  images: [],
  amenities: [],
  latitude: 0,
  longitude: 0,
  totalRooms: 0,
  availableRooms: 0,
  reviews: [] // array of Review objects
};

// Review object example shape
export const Review = {
  id: '',
  userId: '',
  userName: '',
  userAvatar: '', // optional
  rating: 0,
  comment: '',
  date: ''
};

// Booking object example shape
export const Booking = {
  id: '',
  hotelId: '',
  hotelName: '',
  hotelImage: '',
  checkIn: '',
  checkOut: '',
  guests: 0,
  totalPrice: 0,
  status: 'pending', // 'confirmed' | 'pending' | 'cancelled'
  bookingDate: ''
};

// User object example shape
export const User = {
  id: '',
  name: '',
  email: '',
  phone: '', // optional
  avatar: '' // optional
};

// SearchFilters object example shape
export const SearchFilters = {
  location: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  priceRange: [0, 0],
  starRating: [],
  amenities: []
};

// Destination object example shape
export const Destination = {
  id: '',
  name: '',
  description: '',
  image: '',
  hotelCount: 0
};
