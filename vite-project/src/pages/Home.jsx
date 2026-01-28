import React from "react";
import { SearchBar } from "../components/SearchBar";
import { HotelCard } from "../components/HotelCard";
import { hotels, destinations } from "../data/mockData";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";

export const Home = ({ onNavigate }) => {
  const featuredHotels = hotels.slice(0, 4);

  const handleSearch = () => {
    onNavigate("hotels");
  };

  const handleHotelSelect = (hotelId) => {
    onNavigate("hotel-detail", hotelId);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-[520px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?auto=format&fit=crop&w=1400&q=80)",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-black/50 to-pink-700/40" />

        <div className="relative max-w-7xl mx-auto px-6 text-center w-full">
          <h1 className="text-white text-5xl font-bold drop-shadow-lg mb-4">
            Discover Nepal's Finest Hotels
          </h1>
          <p className="text-white/90 text-xl mb-6">
            From the majestic Himalayas to serene valleys 🌿
          </p>

          <SearchBar onSearch={handleSearch} />

          {/* CTA Button */}
          <button
            onClick={() => onNavigate("hotels")}
            className="mt-6 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition"
          >
            Explore Hotels ✨
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl shadow-md bg-gradient-to-r from-blue-100 to-blue-50">
            <h2 className="text-3xl font-bold text-blue-700">500+</h2>
            <p className="text-gray-600">Hotels Listed</p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-gradient-to-r from-pink-100 to-pink-50">
            <h2 className="text-3xl font-bold text-pink-600">10K+</h2>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-gradient-to-r from-green-100 to-green-50">
            <h2 className="text-3xl font-bold text-green-700">100%</h2>
            <p className="text-gray-600">Verified Reviews</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Popular Destinations 🌍</h2>
              <p className="text-gray-600">
                Explore the beauty of Nepal’s top places
              </p>
            </div>

            <button
              onClick={() => onNavigate("hotels")}
              className="text-pink-600 hover:text-pink-500 flex items-center space-x-2 font-semibold"
            >
              <span>View All</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                onClick={() => onNavigate("hotels")}
                className="group cursor-pointer"
              >
                <div className="relative h-52 rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm opacity-90">
                      {destination.hotelCount} hotels
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Hotels ⭐</h2>
              <p className="text-gray-600">
                Handpicked stays for your perfect trip
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredHotels.map((hotel) => (
              <div className="hover:scale-105 transition duration-300">
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onSelect={handleHotelSelect}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            What Travelers Say ❤️
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-xl">
              <p>
                “Best booking experience! होटलहरू धेरै राम्रो छन्.”
              </p>
              <h4 className="mt-3 font-bold">- Suman, Kathmandu</h4>
            </div>

            <div className="bg-white/10 p-6 rounded-xl">
              <p>
                “Pokhara trip was amazing thanks to these hotel suggestions!”
              </p>
              <h4 className="mt-3 font-bold">- Priya, India</h4>
            </div>

            <div className="bg-white/10 p-6 rounded-xl">
              <p>
                “Affordable + luxury hotels in Nepal. Highly recommended!”
              </p>
              <h4 className="mt-3 font-bold">- John, USA</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl font-bold mb-3">
            Get Exclusive Deals 📩
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe for special discounts & travel updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg border w-full sm:w-2/3"
            />
            <button className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
