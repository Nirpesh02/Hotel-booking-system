/**
 * Premium Footer Component
 */

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Send,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <MapPin className="h-7 w-7 text-yellow-300" />
              <span className="ml-2 text-2xl font-bold">
                Nepal Hotels
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Discover the best hotels across Nepal.  
              From the Himalayas to the jungles, book your perfect stay with comfort & trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {["About Us", "Contact", "Terms & Conditions", "Privacy Policy"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Popular Destinations
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {["Kathmandu", "Pokhara", "Everest Region", "Chitwan"].map(
                (place) => (
                  <li key={place}>
                    <a
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      {place}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Stay Connected
            </h3>

            <div className="space-y-3 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-yellow-300" />
                +977 1-4444444
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-yellow-300" />
                info@nepalhotels.com
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-sm font-medium mb-2">
                Subscribe for Offers ✨
              </p>
              <div className="flex items-center bg-white rounded-xl overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="flex-1 px-3 py-2 text-gray-700 outline-none"
                />
                <button className="bg-pink-500 px-4 py-2 hover:bg-pink-600 transition">
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-full bg-white/20 hover:bg-yellow-300 hover:text-black transition transform hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/70">
          <p>
            © {new Date().getFullYear()} Nepal Hotels — All rights reserved.
          </p>
          <p className="mt-1 text-xs text-white/50">
            Built with ❤️ for travelers in Nepal
          </p>
        </div>
      </div>
    </footer>
  );
};
