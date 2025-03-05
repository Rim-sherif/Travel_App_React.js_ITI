import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./componants/Navbar/Navbar";
import Wishlist from "./componants/Wishlist/Wishlist";
import Profile from "./componants/Profile/Profile";
import Search from "./componants/Search/Search";
import Notfound from "./componants/Notfound/Notfound";
import Home from "./componants/Home/Home";
import Support from "./componants/Support/Support";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
