import React from 'react';
import { Star, User, CheckCircle } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export const ReviewCard = ({ review }) => {
  // Generate initials if no avatar
  const initials = review.userName
    ? review.userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow">
      {/* User Info */}
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 rounded-full flex-shrink-0 mr-4 overflow-hidden border-2 border-primary">
          {review.userAvatar ? (
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-primary font-semibold text-lg">
              {initials}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">{review.userName}</h4>
              <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
            </div>
            <div className="flex items-center space-x-1 bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-sm font-medium">
              <Star className="h-4 w-4 fill-white" />
              <span>{review.rating}</span>
            </div>
          </div>
          {review.verified && (
            <div className="flex items-center text-xs text-green-600 mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified Guest
            </div>
          )}
        </div>
      </div>

      {/* Review Comment */}
      <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
        {review.comment}
      </div>
    </div>
  );
};
