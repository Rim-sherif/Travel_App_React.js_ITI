import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import AddTripModal from "./AddTripModal";
import toast from "react-hot-toast"

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const { userToken } = useContext(UserContext);


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

  useEffect(() => {
    fetchTrips();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setIsModalOpen(true);
  };

  const handleDelete = async (tripId) => {
      try {
        await axios.delete(`http://localhost:3000/api/v1/trips/${tripId}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        toast.success("Trip deleted successfully!");
        fetchTrips();
      } catch (error) {
        toast.error("Failed to delete the trip.");
        console.log("Delete Error:", error);
      }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Trips</h1>
        <button
          onClick={() => {
            setEditingTrip(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Trip
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow mt-6">
          <table className="min-w-full divide-y divide-gray-300 bg-white border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">#</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Title</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Destination</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Start</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Return</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Price</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Seats</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trips.map((trip, index) => (
                <tr 
                  key={trip._id} 
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{trip.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{trip.destination}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(trip.departureDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(trip.returnDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">${trip.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {trip.availableSeats || "N/A"}
                  </td>
                  <td className="px-6 py-4 space-x-2 flex items-center">
                    <button
                      onClick={() => handleEdit(trip)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      {isModalOpen && (
        <AddTripModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onTripAdded={fetchTrips} 
            editingTrip={editingTrip}
            userToken={userToken}
/>
      )}
    </div>
  );
}
