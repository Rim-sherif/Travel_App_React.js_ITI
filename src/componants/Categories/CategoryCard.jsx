import React from 'react'
import TripCard from '../../UI/TripCard'
import { useDispatch, useSelector } from 'react-redux';

export default function CategoryCard({category}) {
    const {filteredTrips} = useSelector(store=>store.categoryTrips);

  return (
    <div className="container md:max-w-5/6 mx-auto md:p-8 p-2">
      <h2 className="text-3xl font-bold mb-8">Unforgettable {category} Experiences</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTrips.map(trip => (
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
  )
}
