/**
 * Mock data for the Hotel Booking System
 * This file contains sample hotels, destinations, and reviews for Nepal
 */

// Popular destinations in Nepal
export const destinations = [
  {
    id: 'dest-1',
    name: 'Kathmandu',
    description: 'The vibrant capital city with rich cultural heritage',
    image: 'https://images.unsplash.com/photo-1604307350921-feebc3ddbd37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLYXRobWFuZHUlMjBOZXBhbCUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3Njk0OTM1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    hotelCount: 42
  },
  {
    id: 'dest-2',
    name: 'Pokhara',
    description: 'Gateway to the Annapurna circuit with stunning lake views',
    image: 'https://images.unsplash.com/photo-1609947016891-f86e68963800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb2toYXJhJTIwTmVwYWwlMjBsYWtlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2OTUyMDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    hotelCount: 28
  },
  {
    id: 'dest-3',
    name: 'Everest Region',
    description: "Home to the world's highest peak and trekking paradise",
    image: 'https://images.unsplash.com/photo-1662958891242-707d445dc34a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb3VudCUyMEV2ZXJlc3QlMjBOZXBhbHxlbnwxfHx8fDE3Njk1MjAzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    hotelCount: 15
  },
  {
    id: 'dest-4',
    name: 'Chitwan',
    description: 'National park famous for wildlife safaris',
    image: 'https://images.unsplash.com/photo-1748343217307-0955e2250dc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDaGl0d2FuJTIwTmVwYWwlMjB3aWxkbGlmZXxlbnwxfHx8fDE3Njk1MjAzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    hotelCount: 12
  },
  {
    id: 'dest-5',
    name: 'Lumbini',
    description: 'Birthplace of Lord Buddha, a UNESCO World Heritage Site',
    image: 'https://images.unsplash.com/photo-1609168494389-230528e6a9c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMdW1iaW5pJTIwTmVwYWwlMjB0ZW1wbGV8ZW58MXx8fHwxNzY5NTIwMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    hotelCount: 8
  }
];

// Available amenities
export const availableAmenities = [
  'Free WiFi',
  'Swimming Pool',
  'Spa',
  'Restaurant',
  'Room Service',
  'Gym',
  'Parking',
  'Airport Shuttle',
  'Mountain View',
  'Lake View',
  'Garden',
  'Conference Room'
];

// Mock hotels data
export const hotels = [
  {
    id: 'hotel-1',
    name: 'The Himalayan Grand',
    description: 'Experience luxury in the heart of Kathmandu with stunning mountain views. Our hotel combines traditional Nepali architecture with modern amenities, offering guests an unforgettable stay.',
    location: 'Thamel, Kathmandu',
    city: 'Kathmandu',
    price: 8500,
    rating: 4.8,
    stars: 5,
    images: [
      'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb218ZW58MXx8fHwxNzY5NTA4OTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1637730827702-f847ebb70dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc2OTUwNTA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Room Service', 'Gym', 'Parking', 'Mountain View'],
    latitude: 27.7172,
    longitude: 85.3240,
    totalRooms: 80,
    availableRooms: 12,
    reviews: [
      {
        id: 'rev-1',
        userId: 'user-1',
        userName: 'Sarah Johnson',
        rating: 5,
        comment: 'Absolutely stunning hotel! The mountain views from the room were breathtaking. Staff was incredibly helpful and friendly.',
        date: '2026-01-15'
      },
      {
        id: 'rev-2',
        userId: 'user-2',
        userName: 'Raj Kumar',
        rating: 4.5,
        comment: 'Great location in Thamel. Easy access to all the tourist spots. The spa was amazing!',
        date: '2026-01-10'
      }
    ]
  },
  {
    id: 'hotel-2',
    name: 'Lakeside Paradise Resort',
    description: 'Wake up to serene lake views and magnificent Annapurna mountain range. Perfect for adventure seekers and those looking for tranquility.',
    location: 'Lakeside, Pokhara',
    city: 'Pokhara',
    price: 6500,
    rating: 4.6,
    stars: 4,
    images: [
      'https://images.unsplash.com/photo-1667125095636-dce94dcbdd96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwcm9vbXxlbnwxfHx8fDE3Njk1MDY5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1609947016891-f86e68963800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb2toYXJhJTIwTmVwYWwlMjBsYWtlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2OTUyMDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    amenities: ['Free WiFi', 'Restaurant', 'Lake View', 'Garden', 'Parking', 'Room Service'],
    latitude: 28.2096,
    longitude: 83.9856,
    totalRooms: 45,
    availableRooms: 8,
    reviews: [
      {
        id: 'rev-3',
        userId: 'user-3',
        userName: 'Emma Wilson',
        rating: 5,
        comment: 'Perfect location by the lake! Morning walks along the lakeside were magical. Highly recommend!',
        date: '2026-01-20'
      }
    ]
  },
    {
        id: 'hotel-3',
    name: 'Everest View Lodge',
    description: 'Get the closest view of Mount Everest from comfort. Ideal for trekkers starting their Everest Base Camp journey.',
    location: 'Namche Bazaar',
    city: 'Everest Region',
    price: 4500,
    rating: 4.4,
    stars: 3,
    images: [
      'https://images.unsplash.com/photo-1662958891242-707d445dc34a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb3VudCUyMEV2ZXJlc3QlMjBOZXBhbHxlbnwxfHx8fDE3Njk1MjAzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    amenities: ['Free WiFi', 'Restaurant', 'Mountain View', 'Parking'],
    latitude: 27.8067,
    longitude: 86.7135,
    totalRooms: 20,
    availableRooms: 5,
    reviews: [
      {
        id: 'rev-4',
        userId: 'user-4',
        userName: 'Mike Chen',
        rating: 4,
        comment: 'Incredible views! Basic amenities but perfect for trekkers. The staff was very knowledgeable about the trails.',
        date: '2026-01-18'
      }
    ]
  },
  {
    id: 'hotel-4',
    name: 'Chitwan Jungle Resort',
    description: 'Immerse yourself in nature with our jungle resort. Enjoy elephant safaris, bird watching, and authentic Nepali cuisine.',
    location: 'Sauraha, Chitwan',
    city: 'Chitwan',
    price: 5500,
    rating: 4.5,
    stars: 4,
    images: [
      'https://images.unsplash.com/photo-1748343217307-0955e2250dc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDaGl0d2FuJTIwTmVwYWwlMjB3aWxkbGlmZXxlbnwxfHx8fDE3Njk1MjAzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    amenities: ['Free WiFi', 'Restaurant', 'Garden', 'Airport Shuttle', 'Swimming Pool'],
    latitude: 27.5799,
    longitude: 84.4955,
    totalRooms: 35,
    availableRooms: 15,
    reviews: [
      {
        id: 'rev-5',
        userId: 'user-5',
        userName: 'Priya Sharma',
        rating: 5,
        comment: 'Amazing wildlife experience! We saw rhinos, elephants, and so many bird species. The resort was comfortable and the food was delicious.',
        date: '2026-01-22'
      }
    ]
  },
  {
    id: 'hotel-5',
    name: 'Buddha Heritage Hotel',
    description: 'Stay near the sacred birthplace of Buddha. Our peaceful hotel offers spiritual retreats and meditation sessions.',
    location: 'Lumbini Garden',
    city: 'Lumbini',
    price: 4000,
    rating: 4.3,
    stars: 3,
    images: [
      'https://images.unsplash.com/photo-1609168494389-230528e6a9c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMdW1iaW5pJTIwTmVwYWwlMjB0ZW1wbGV8ZW58MXx8fHwxNzY5NTIwMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    amenities: ['Free WiFi', 'Restaurant', 'Garden', 'Parking', 'Conference Room'],
    latitude: 27.4833,
    longitude: 83.2667,
    totalRooms: 30,
    availableRooms: 10,
    reviews: [
      {
        id: 'rev-6',
        userId: 'user-6',
        userName: 'David Lee',
        rating: 4,
        comment: 'Very peaceful and spiritual atmosphere. Perfect for meditation and reflection. The gardens are beautiful.',
        date: '2026-01-12'
      }
    ]
  },
  {
    id: 'hotel-6',
    name: 'Durbar Square Palace Hotel',
    description: 'Located in the historic Durbar Square area, experience the ancient architecture and culture of Nepal.',
    location: 'Durbar Square, Kathmandu',
    city: 'Kathmandu',
    price: 7000,
    rating: 4.7,
    stars: 4,
    images: [
      'https://images.unsplash.com/photo-1604307350921-feebc3ddbd37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLYXRobWFuZHUlMjBOZXBhbCUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3Njk0OTM1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'Spa', 'Mountain View', 'Conference Room'],
    latitude: 27.7045,
    longitude: 85.3077,
    totalRooms: 50,
    availableRooms: 7,
    reviews: [
      {
        id: 'rev-7',
        userId: 'user-7',
        userName: 'Lisa Martinez',
        rating: 5,
        comment: 'Beautiful historic location! You can walk to all the temples and palaces. The rooftop restaurant has amazing views.',
        date: '2026-01-25'
      }
    ]
  },
  {
    id: 'hotel-7',
    name: 'Annapurna Mountain Lodge',
    description: 'Perfect base for Annapurna trekking. Enjoy panoramic mountain views and hearty meals after a day of hiking.',
    location: 'Ghandruk, Pokhara',
    city: 'Pokhara',
    price: 3500,
    rating: 4.2,
    stars: 3,
    images: [
      'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb218ZW58MXx8fHwxNzY5NTA4OTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    amenities: ['Free WiFi', 'Restaurant', 'Mountain View', 'Garden'],
    latitude: 28.3893,
    longitude: 83.8135,
    totalRooms: 25,
    availableRooms: 18,
    reviews: []
  },
  {
    id: 'hotel-8',
    name: 'Kathmandu Boutique Hotel',
    description: 'Modern boutique hotel with traditional Nepali touches. Located in the heart of the city with easy access to shopping and dining.',
    location: 'Lazimpat, Kathmandu',
    city: 'Kathmandu',
    price: 6000,
    rating: 4.6,
    stars: 4,
    images: [
      'https://images.unsplash.com/photo-1637730827702-f847ebb70dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc2OTUwNTA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    amenities: ['Free WiFi', 'Restaurant', 'Gym', 'Parking', 'Room Service', 'Airport Shuttle'],
    latitude: 27.7344,
    longitude: 85.3245,
    totalRooms: 40,
    availableRooms: 6,
    reviews: [
      {
        id: 'rev-8',
        userId: 'user-8',
        userName: 'James Anderson',
        rating: 4.5,
        comment: 'Clean, modern, and centrally located. The staff went above and beyond to make our stay comfortable.',
        date: '2026-01-24'
      }
    ]
  }
];


