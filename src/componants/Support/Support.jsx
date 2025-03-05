import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Support() {
  return (
    <>
        <div className="w-[80%] mx-auto my-20">
            <h2 className="text-center text-3xl font-bold mb-2.5">Welcome to the Help Center</h2>
            
            <h3 className="font-semibold mt-8 mb-2 text-lg text-blue-500">How to plan your trip</h3>
            
            <div className="w-[50%] mx-auto">
                <p className="mb-3">
                To help you plan and make the most of your next trip, we are pleased to provide you with some general destination tips and recommendations such as:
                </p>
                <li>Places to see</li>
                <li>Things to do</li>
                <li>Trip inspiration</li>
                <p className="my-3">
                    For selected cities, you can also find a curated 48-hour itinerary featuring the most iconic experiences. Please note that the availability of these itineraries may depend on the language in which you're viewing our website. You can access this information by searching for a city in the search bar on our website and clicking the 'Trip inspiration' drop-down at the top of the page.
                </p>
                <p>
                    You can bookmark activities of particular interest and save them in a wishlist. Just click the heart icon on an activity page or card. You can view your wishlists by clicking the heart icon at the top of our website.
                </p>      
                <strong className="mt-7 text-[18px] block">Still need help?</strong>
                <Link className="inline-block mt-3 border-2 border-blue-600 text-blue-600 font-bold py-2 px-5 rounded-3xl text-sm" to="mailto:abdulrahman.fawzy25@gmail.com">Contact us</Link>
            </div>
        </div>
        <Footer />
    </>
  )
}
