import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./componants/Footer/Footer";
import Navbar from "./componants/Navbar/Navbar";
import TripsList from "./componants/Triplist/TripList";
import Video from "./componants/Video/Video";
import Wishlist from "./componants/Wishlist/Wishlist";
import Profile from "./componants/Profile/Profile";
import Search from "./componants/Search/Search";
import Notfound from "./componants/Notfound/Notfound";
import Home from "./componants/Home/Home";
import Support from "./componants/Support/Support";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/support" element={<Support/>}/>
          <Route path="*" element={<Notfound/>}/>
        </Routes>
        {/* <TripsList/>
        <Video/>
        <Footer/> */}
      </BrowserRouter>
    </>
  );
}

export default App;
