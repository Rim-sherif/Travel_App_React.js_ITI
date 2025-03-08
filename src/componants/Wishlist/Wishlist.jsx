import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchWishlist = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated. No token found.");
  }

  const response = await fetch("http://localhost:3000/api/v1/trips/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch wishlist");
  }

  const data = await response.json();
  return data.wishlist;
};

const removeFromWishlist = async (tripId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/v1/trips/wishlist/remove/${tripId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to remove from wishlist");
  }

  return tripId;
};

const Wishlist = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const queryClient = useQueryClient();

  const {
    data: trips = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  });

  const mutation = useMutation({
    mutationFn: removeFromWishlist,
    onMutate: async (tripId) => {
      await queryClient.cancelQueries(["wishlist"]);

      const previousTrips = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (oldTrips = []) =>
        oldTrips.filter((trip) => trip._id !== tripId)
      );

      return { previousTrips };
    },
    onError: (err, tripId, context) => {
      queryClient.setQueryData(["wishlist"], context.previousTrips);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading trips...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;
  }

  return (
    <>
      {trips.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          <p className="text-xl font-semibold">Your wishlist is empty</p>
          <p className="text-sm">Save activities to your wishlist by clicking on the heart icon.</p>
        </div>
      ) : (
        <>
          <div className="flex md:flex-row place-content-between m-5 md:m-20">
            <h1 className="text-xl md:text-2xl font-bold">Guest Wishlist</h1>
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
              key={trip._id}
              className="flex flex-col md:flex-row border border-[#E5E7EB] bg-white mb-4 mx-4 md:mx-20 w-auto"
            >
              <div className="relative">
                <FontAwesomeIcon
                  icon={solidHeart}
                  className="absolute top-2 right-2 text-2xl text-red-500 cursor-pointer"
                  onClick={() => mutation.mutate(trip._id)}
                />
                <img
                  src={trip.images?.[0] || "/placeholder.jpg"}
                  alt={trip.title}
                  className="w-full md:w-60 h-40 md:h-auto object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-sm font-semibold text-gray-500">DAY TRIP</p>
                <h3 className="text-lg font-bold">{trip.title}</h3>
                <p className="text-sm text-gray-600">{trip.duration || "Unknown Duration"}</p>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded w-max">
                  Likely to sell out
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Wishlist;