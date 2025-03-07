import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const fetchTrip = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/api/v1/trips/${id}`);
  return data.trip;
};

const TripDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["trip", id],
    queryFn: () => fetchTrip(id),
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="mx-auto px-4 py-6 max-w-7xl">
      <div className="w-full flex flex-col items-center">
        <div className="w-full  mb-8">
          <h2 className="text-3xl font-bold text-gray-900 my-4">
            From {data.startPoint.join(" & ")}: {data.destination} Tour
          </h2>

          <div className="flex items-center justify-between space-x-4 text-gray-600">
            <div>
              <span className=" items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 w-4 h-4"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 w-4 h-4 ml-1"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 w-4 h-4 ml-1"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 w-4 h-4 ml-1"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 w-4 h-4 ml-1"
                />
                <span className="ml-2 text-sm">4.8 (257 reviews)</span>
              </span>

              <span className="ml-4 items-center">
                🕒{" "}
                <span className="ml-2">
                  {Math.ceil(
                    (new Date(data.returnDate) - new Date(data.departureDate)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </span>
              </span>
            </div>
            <div>
              <span className=" items-center cursor-pointer hover:text-gray-900">
                <i className="fa-regular fa-heart text-[19px]"></i>{" "}
                <span className="ml-2">Add to Wishlist</span>
              </span>
              <span className=" items-center cursor-pointer hover:text-gray-900 ml-4">
                <i class="fa-solid fa-arrow-up-right-from-square text-[16px]"></i>{" "}
                <span className="ml-2">Share</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-centerr">
        <div className=" w-full">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-6">
                  <img
                    src={data.images[0]}
                    alt="Main tour"
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
                {data.images.slice(1, 4).map((image, index) => (
                  <div className="col-span-2" key={index}>
                    <img
                      src={image}
                      alt={`Tour ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-3xl font-bold text-gray-900 my-4">
                  {data.title}
                </h2>
                <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Departure From:</strong>{" "}
                    {data.startPoint.join(", ")}
                  </p>
                  <p>
                    <strong>Destination:</strong> {data.destination}
                  </p>
                  <p>
                    <strong>Departure Date:</strong>{" "}
                    {new Date(data.departureDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Return Date:</strong>{" "}
                    {new Date(data.returnDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Full Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ${data.price}
                  </span>
                  <span className="text-gray-500"> per person</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md"
                      min={
                        new Date(data.departureDate).toISOString().split("T")[0]
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Participants
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                    </select>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <p className="flex items-center mb-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Free cancellation up to 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
