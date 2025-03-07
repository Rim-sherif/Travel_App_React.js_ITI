import React from 'react';
import { useQuery } from '@tanstack/react-query';
import TripCard from '../../UI/TripCard';
import { Link } from 'react-router-dom';

const TripsList = () => {
  const { data: trips, isLoading, error } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/v1/trips');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.allTrips;
    },
  });

  if (isLoading) {
    return <div className="text-center p-8">Loading trips...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container md:max-w-5/6 mx-auto md:p-8 p-2">
      <h2 className="text-3xl font-bold mb-8">Popular Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trips.map(trip => {
          const startDate = new Date(trip.departureDate);
          const endDate = new Date(trip.returnDate);
          const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

          return (
            <Link to={`/trips/${trip._id}`}>
            <TripCard
              key={trip._id}
              imageUrl={trip.images[0]}
              title={trip.title}
              duration={`${durationDays} days`}
              rating={4.5}
              reviewCount={trip.reviews.length}
              price={trip.price}
              currency="€"
            /></Link>
          );
        })}
      </div>
    </div>
  );
};

export default TripsList;