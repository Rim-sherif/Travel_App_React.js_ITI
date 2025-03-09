import Categories from "../Categories/Categories";
import HeroSection from "../HeroSection/HeroSection";
import Offers from "../Offers/Offers";
import TripsList from "../Triplist/TripList";
import Video from "../Video/Video";

export default function Home(){
    return (
        <div>
            <HeroSection />
            <Categories />
            <TripsList/>
            <Offers />
            <Video/>
         
        </div>
    )
}