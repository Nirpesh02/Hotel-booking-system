import React, { useState } from 'react';

const ImageWithFallback = ({
  src,
  alt,
  className = '',
  fallback = null,
  rounded = 'rounded-lg'
}) => {
  const [imageError, setImageError] = useState(false);

  if (imageError || !src) {
    return fallback ? (
      fallback
    ) : (
      <div className={`${className} bg-gray-200 flex items-center justify-center ${rounded}`}>
        <div className="text-center text-gray-400 text-sm">
          Image not available
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${rounded} object-cover`}
      onError={() => setImageError(true)}
    />
  );
};

export { ImageWithFallback };
