import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const TripCard = ({
  imageUrl,
  title,
  duration,
  rating,
  reviewCount,
  price,
  currency
}) => {

    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
      setIsLiked(!isLiked);
    };


  return (
    <div className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      <div 
        className="absolute top-2 right-2 cursor-pointer transition-colors duration-300 hover:text-red-600 z-10"
        onClick={toggleLike}
      >
        <FontAwesomeIcon 
          icon={isLiked ? solidHeart : regularHeart} 
          className={`text-2xl ${isLiked ? 'text-red-500' : 'text-white'} transition-colors duration-300`}
        />
      </div>
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
      />
      <div className="p-4 bg-white">
      
        <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{duration}</p>
        <div className="flex items-center mt-3">
          <span className="flex items-center">
            <svg 
              className="w-4 h-4 text-yellow-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="ml-1 text-gray-600">{rating}</span>
          </span>
          <span className="text-sm text-gray-500 ml-2">({reviewCount} reviews)</span>
        </div>

     
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <p className="text-xl font-bold text-gray-800">
              {currency}{price}
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            View Trip
          </button>
        </div>
      </div>
    
    </div>
  );
};

export default TripCard;