/**
 * Wishlist Context
 * Manages user's favorite hotels
 */

import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Add hotel to wishlist
  const addToWishlist = (hotelId) => {
    setWishlist((prev) => {
      if (!prev.includes(hotelId)) {
        return [...prev, hotelId];
      }
      return prev;
    });
  };

  // Remove hotel from wishlist
  const removeFromWishlist = (hotelId) => {
    setWishlist((prev) => prev.filter((id) => id !== hotelId));
  };

  // Check if hotel is in wishlist
  const isInWishlist = (hotelId) => {
    return wishlist.includes(hotelId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
