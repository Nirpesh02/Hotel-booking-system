import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { HotelListing } from './pages/HotelListing';
import { HotelDetail } from './pages/HotelDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserProfile } from './pages/UserProfile';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { WishlistProvider } from './context/WishlistContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedHotelId, setSelectedHotelId] = useState('');

  // Navigation handler
  const handleNavigate = (page, hotelId) => {
    setCurrentPage(page);
    if (hotelId) {
      setSelectedHotelId(hotelId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'hotels':
        return <HotelListing onNavigate={handleNavigate} />;
      case 'hotel-detail':
        return <HotelDetail hotelId={selectedHotelId} onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'profile':
        return <UserProfile onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <BookingProvider>
        <WishlistProvider>
          <div className="flex flex-col min-h-screen">
            {/* Navigation Bar */}
            <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
            
            {/* Main Content */}
            <main className="flex-1">
              {renderPage()}
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
        </WishlistProvider>
      </BookingProvider>
    </AuthProvider>
  );
}
