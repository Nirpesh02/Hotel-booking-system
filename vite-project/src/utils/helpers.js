/**
 * Utility helper functions for the application
 */

// Format price in Nepali Rupees (NPR)
export const formatPrice = (price) => {
  return `NPR ${price.toLocaleString('en-NP')}`;
};

// Calculate number of nights between two dates
export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Generate array of star icons based on rating
export const getStarRating = (stars) => {
  return Array.from({ length: stars }, (_, i) => i);
};

// Calculate total price for booking
export const calculateTotalPrice = (pricePerNight, nights) => {
  return pricePerNight * nights;
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (basic Nepal format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+977)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Get minimum date for check-in (today)
export const getMinCheckInDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Get minimum date for check-out (tomorrow)
export const getMinCheckOutDate = (checkIn) => {
  if (!checkIn) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
  const checkInDate = new Date(checkIn);
  checkInDate.setDate(checkInDate.getDate() + 1);
  return checkInDate.toISOString().split('T')[0];
};

// Generate unique ID
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Truncate text to specified length
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};
