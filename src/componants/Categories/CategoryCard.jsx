import React from 'react'
import TripCard from '../../UI/TripCard'
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function CategoryCard({category}) {
    const {filteredTrips} = useSelector(store=>store.categoryTrips);

    const { data: trips, isLoading, error } = useQuery({
      queryKey: ['trips'],
      queryFn: async () => {
        const response = await fetch('http://localhost:5000/api/v1/trips');
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

    console.log(trips);    

  return (
    <div className="container md:max-w-5/6 mx-auto md:p-8 p-2">
      <h2 className="text-3xl font-bold mb-8">Unforgettable {category} Experiences</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trips.filter((trip) => ( trip.categoryId.name.toLowerCase() == category.toLowerCase())).slice(0,4).map((trip)=> <Link to={`/trips/${trip._id}`} key={trip._id}>
          <TripCard
            imageUrl={trip.images[0]}
            title={trip.title}
            duration={trip.duration}
            rating={trip.rating}
            reviewCount={trip.reviewCount}
            price={trip.price}
            currency={trip.currency}
          /></Link>)
        }
      </div>
    </div>
  )
}
