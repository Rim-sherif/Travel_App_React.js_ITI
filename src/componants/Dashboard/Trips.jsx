import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import AddTripModal from "./AddTripModal"; 

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/trips", {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setTrips(data.allTrips);
    } catch (error) {
      console.log("Failed to load trips.", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Trips</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Trip
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Seats</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trips.map(trip => (
              <tr key={trip._id}>
                <td className="px-6 py-4 whitespace-nowrap">{trip.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trip.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(trip.departureDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${trip.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trip.availableSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTripAdded={fetchTrips}
      />
    </div>
  );
}
