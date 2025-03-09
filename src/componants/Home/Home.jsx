import Categories from "../Categories/Categories";
import HeroSection from "../HeroSection/HeroSection";
import Offers from "../Offers/Offers";
import TripsList from "../Triplist/TripList";

export default function Home(){
    return (
        <div>
            <HeroSection />
            <Categories />
            <TripsList/>
            <Offers />         
        </div>
    )
}