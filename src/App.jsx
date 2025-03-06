import "./App.css";
import Footer from "./componants/Footer/Footer";
import TripsList from "./componants/Triplist/TripList";
import Video from "./componants/Video/Video";
import Wishlist from "./componants/Wishlist/Wishlist";
import 'boxicons/css/boxicons.min.css';


function App() {
  return (
    <div className="">
    <TripsList/>
    <Video/>
    <Footer/>
  </div>

  );
}

export default App;
