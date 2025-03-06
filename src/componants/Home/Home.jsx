import Categories from "../Categories/Categories";
import Footer from "../Footer/Footer";
import HeroSection from "../HeroSection/HeroSection";
import TripsList from "../Triplist/TripList";
import Video from "../Video/Video";

export default function Home(){
    return (
        <div>
            <HeroSection />
            <Categories />
            <TripsList/>
            <Video/>
            <Footer/> 
        </div>
    )
}