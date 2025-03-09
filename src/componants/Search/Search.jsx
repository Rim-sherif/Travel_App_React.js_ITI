import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { notify } from '../Toast/Toast';
import { Link, useSearchParams } from 'react-router-dom';
import TripCard from '../../UI/TripCard';

const BaseUrl = `http://localhost:3000/api/v1/search`;

export default function Search() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [trips , setTrips] = useState([]);
  const [loading , setLoading] = useState(false);
  const getSearchedTrips = async()=>{
    try{
      setLoading(true);
      const {data} = await axios.get(`${BaseUrl}?search=${search}`);
      console.log(data);
      setTrips(data.data);
      setLoading(false);
    }
    catch(err){
      setLoading(false);
      console.log(err);
      if(err?.response?.data?.data){
        notify(err?.response?.data?.data , "error");
      }else{
        notify(err.message , "error");
      }
      
    }
  }

  useEffect(()=>{
    getSearchedTrips();
  }, [search])

  if(loading){
    return <h2>Loading...</h2>
  }
  
  return (
    <div className='my-10 w-[90%] mx-auto'>
      <h2 className='text-2xl font-bold mb-5'>
        Search Result <span className='text-green-500'>({trips ? trips.length:""})</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trips ? trips.map(trip => {
          const startDate = new Date(trip.departureDate);
          const endDate = new Date(trip.returnDate);
          const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

          return (
            <Link key={trip._id} to={`/trips/${trip._id}`}>
            <TripCard
              imageUrl={trip.images[0]}
              title={trip.title}
              duration={`${durationDays} days`}
              rating={4.5}
              reviewCount={trip.reviews.length}
              price={trip.price}
              tripId={trip._id}
              currency="€"
            /></Link>
          );
        }) : "Nothing found"}
      </div>
    </div> 
  )
}
