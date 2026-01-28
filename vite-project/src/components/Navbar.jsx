import React, { useState } from 'react';
import { Menu, X, User, LogOut, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavigation = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const getUserInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <MapPin className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">
              Nepal Hotels
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {['home', 'hotels'].map((page) => (
              <button
                key={page}
                onClick={() => handleNavigation(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-accent text-white'
                    : 'text-gray-700 hover:text-primary hover:bg-accent/20'
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}

            {user ? (
              <>
                <button
                  onClick={() => handleNavigation('profile')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-accent/20 hover:text-primary transition-colors"
                >
                  <div className="h-6 w-6 flex items-center justify-center bg-primary text-white rounded-full text-xs font-semibold">
                    {getUserInitials(user.name)}
                  </div>
                  <span>{user.name}</span>
                </button>

                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('login')}
                  className="px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-accent/20 transition-colors"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavigation('register')}
                  className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {['home', 'hotels'].map((page) => (
              <button
                key={page}
                onClick={() => handleNavigation(page)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? 'bg-accent text-white'
                    : 'text-gray-700 hover:bg-accent/20 hover:text-primary'
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}

            {user ? (
              <>
                <button
                  onClick={() => handleNavigation('profile')}
                  className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-accent/20 hover:text-primary transition-colors"
                >
                  <div className="h-6 w-6 flex items-center justify-center bg-primary text-white rounded-full text-xs font-semibold">
                    {getUserInitials(user.name)}
                  </div>
                  <span>{user.name}</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('login')}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-accent/20 hover:text-primary"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavigation('register')}
                  className="block w-full text-left px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
