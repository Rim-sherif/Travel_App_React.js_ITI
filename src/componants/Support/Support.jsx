import { Link } from "react-router-dom";

export default function Support() {
  return (
    <div className="max-w-4xl mx-auto my-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">
        Welcome to the Help Center
      </h2>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-3">
          How to Plan Your Trip
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          To help you plan and make the most of your next trip, here are some tips and recommendations:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Places to see</strong></li>
          <li><strong>Things to do</strong></li>
          <li><strong>Trip inspiration</strong></li>
        </ul>

        <p className="text-gray-700 mt-4 leading-relaxed">
          For selected cities, you can find a curated 48-hour itinerary featuring the most iconic experiences. Please note that availability depends on the language settings of our website. 
        </p>
        <p className="text-gray-700 mt-2 leading-relaxed">
          You can bookmark activities and save them in a wishlist by clicking the heart icon on an activity page. View your wishlists by clicking the heart icon at the top of our website.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="mt-8 text-center">
        <strong className="text-lg text-gray-800">Still need help?</strong>
        <div className="mt-4">
          <Link
            to="mailto:abdulrahman.fawzy25@gmail.com"
            className="inline-block bg-blue-600 text-white font-medium py-2.5 px-6 rounded-full text-sm shadow-md transition-all duration-300 hover:bg-blue-700"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
