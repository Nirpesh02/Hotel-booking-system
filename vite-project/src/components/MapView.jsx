/**
 * MapView Component
 * Displays hotel location on an embedded map
 * Uses OpenStreetMap iframe by default, can be upgraded to Google Maps
 */

import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export const MapView = ({ latitude, longitude, hotelName }) => {
  // OpenStreetMap embed URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    longitude - 0.01
  },${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          <span className="font-medium">Location: {hotelName}</span>
        </div>
        <a
          href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white hover:text-white/80 text-sm"
        >
          Open in OSM <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </div>

      {/* Map */}
      <div className="relative w-full h-64 md:h-96">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          title={`Map location of ${hotelName}`}
          className="border-0"
        />
      </div>

      {/* Coordinates Info */}
      <div className="px-4 py-3 bg-gray-50 text-sm text-gray-700 space-y-1">
        <p>
          <strong>Coordinates:</strong> {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
        </p>
        <p className="text-xs text-gray-500">
          This map is powered by OpenStreetMap. In production, you can upgrade to Google Maps for enhanced navigation and interactive features.
        </p>
      </div>
    </div>
  );
};
