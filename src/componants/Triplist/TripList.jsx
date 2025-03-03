import React from 'react';
import TripCard from '../../UI/TripCard';
import img1 from '/68.webp'
import img2 from '/86.jpeg'

const TripsList = () => {
  const trips = [
    {
      id: 1,
      imageUrl: img1,
      title: 'Eiffel Tower Guided Tour',
      duration: '2 hours',
      rating: 4.8,
      reviewCount: 245,
      price: 45,
      currency: '€'
    },
    {
      id: 2,
      imageUrl: img2,
      title: 'Colosseum Underground Experience',
      duration: '3 hours',
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: '€'
    },

  ];

  return (
    <div className="container max-w-4/5 mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8">Popular Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trips.map(trip => (
          <TripCard
            key={trip.id}
            imageUrl={trip.imageUrl}
            title={trip.title}
            duration={trip.duration}
            rating={trip.rating}
            reviewCount={trip.reviewCount}
            price={trip.price}
            currency={trip.currency}
          />
        ))}
      </div>
    </div>
  );
};

export default TripsList;