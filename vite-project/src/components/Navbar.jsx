import React, { useState } from "react";
import { Menu, X, User, LogOut, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navbar = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavigation = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const getUserInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-pink-200 via-pink-100 to-white/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation("home")}
          >
            <MapPin className="h-8 w-8 text-pink-600 group-hover:scale-110 transition" />
            <span className="ml-2 text-xl font-extrabold text-pink-700">
              Nepal Hotels
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Links */}
            {["home", "hotels"].map((page) => (
              <button
                key={page}
                onClick={() => handleNavigation(page)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-pink-500 text-white shadow-md"
                    : "text-gray-700 hover:text-pink-600 hover:bg-pink-100"
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}

            {/* User Logged In */}
            {user ? (
              <>
                {/* Profile */}
                <button
                  onClick={() => handleNavigation("profile")}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-pink-100 transition"
                >
                  <div className="h-8 w-8 flex items-center justify-center bg-pink-500 text-white rounded-full text-xs font-bold shadow">
                    {getUserInitials(user.name)}
                  </div>
                  <span className="font-medium text-gray-800">
                    {user.name}
                  </span>
                </button>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <button
                  onClick={() => handleNavigation("login")}
                  className="px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition"
                >
                  Login
                </button>

                {/* Sign Up */}
                <button
                  onClick={() => handleNavigation("register")}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-pink-600 transition"
          >
            {mobileMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-pink-50 border-t border-pink-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">

            {["home", "hotels"].map((page) => (
              <button
                key={page}
                onClick={() => handleNavigation(page)}
                className={`block w-full text-left px-4 py-2 rounded-xl font-semibold transition ${
                  currentPage === page
                    ? "bg-pink-500 text-white"
                    : "text-gray-700 hover:bg-pink-100 hover:text-pink-600"
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}

            {/* Mobile User */}
            {user ? (
              <>
                <button
                  onClick={() => handleNavigation("profile")}
                  className="flex items-center space-x-2 w-full px-4 py-2 rounded-xl hover:bg-pink-100 transition"
                >
                  <div className="h-8 w-8 flex items-center justify-center bg-pink-500 text-white rounded-full text-xs font-bold">
                    {getUserInitials(user.name)}
                  </div>
                  <span>{user.name}</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 rounded-xl hover:bg-red-100 hover:text-red-600 transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("login")}
                  className="block w-full text-left px-4 py-2 rounded-xl hover:bg-pink-100 hover:text-pink-600 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavigation("register")}
                  className="block w-full text-left px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md"
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
