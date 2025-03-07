import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import img1 from "/ws1.jpg";
import img2 from "/ws2.jpg";
import img3 from "/ws3.jpg";

const Wishlist = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const trips = [
    {
      id: 1,
      imageUrl: img1,
      title: "Las Vegas: Antelope Canyon & Horseshoe Bend with Lunch, WiFi",
      duration: "2 hours",
      rating: 4.8,
      reviewCount: 245,
      price: 45,
      currency: "€",
    },
    {
      id: 2,
      imageUrl: img2,
      title: "Vegas: Grand Canyon, Hoover Dam, Skywalk Option, & Two Meals",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
    },
    {
      id: 3,
      imageUrl: img3,
      title: "Las Vegas: Sightseeing Night Tour by Open-top Bus",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && e.target && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex md:flex-row place-content-between m-5 md:m-20">
        <h1 className="text-xl md:text-2xl font-bold">Guest wishlist</h1>
        <div className="relative" ref={menuRef}>
          <button
            aria-label="Show options"
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-gray-100 transition"
          >
            <i className="bx bx-dots-horizontal-rounded text-2xl text-gray-500"></i>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4"
              >
                <p className="text-sm text-[#FF5533] font-semibold cursor-pointer hover:text-red-600 w-16">
                  Delete list
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {trips.map((trip) => (
        <div
          key={trip.id}
          className="flex flex-col md:flex-row border border-[#E5E7EB] bg-white mb-4 mx-4 md:mx-20 w-auto"
        >
          <div className="relative">
            <FontAwesomeIcon
              icon={solidHeart}
              className="absolute top-2 right-2 text-2xl text-red-500 cursor-pointer"
            />
            <img
              src={trip.imageUrl}
              alt={trip.title}
              className="w-full md:w-60 h-40 md:h-auto object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <p className="text-sm font-semibold text-gray-500">DAY TRIP</p>
            <h3 className="text-lg font-bold">{trip.title}</h3>
            <p className="text-sm text-gray-600">{trip.duration}</p>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded w-max">
              Likely to sell out
            </span>
          </div>
          <div className="text-right flex flex-col items-end p-4 md:mt-5">
            <div className="text-sm flex flex-col md:flex-row items-center">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-gray-600">{trip.rating}</span>
              <p className="text-xs text-gray-500 ml-1">({trip.reviewCount} reviews)</p>
            </div>
            <p className="font-bold text-4xl md:text-5xl text-gray-900">
              {trip.currency} {trip.price}
            </p>
            <p className="text-xs text-gray-500">per person</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Wishlist;
