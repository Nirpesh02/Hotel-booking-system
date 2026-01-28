/**
 * Authentication Context
 * Manages user authentication state across the application
 */

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulated login function
  const login = async (email) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful login
    setUser({
      id: 'user-123',
      name: 'Guest User',
      email: email,
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    });

    return true;
  };

  // Simulated social login
  const loginWithSocial = async (provider) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser({
      id: 'user-social-123',
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    });

    return true;
  };

  // Simulated registration
  const register = async (name, email, password, phone) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser({
      id: 'user-new-' + Date.now(),
      name,
      email,
      phone,
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    });

    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Update user profile
  const updateProfile = (updates) => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, ...updates } : prevUser
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithSocial,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
