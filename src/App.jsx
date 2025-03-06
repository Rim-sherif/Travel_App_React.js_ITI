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
import Account from "./componants/Profile/Account";
import ChangePassword from "./componants/Profile/ChangePassword";
import { Toaster } from "react-hot-toast";
import Register from "./componants/Register/Register";
import Login from "./componants/Login/Login";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/profile" element={<Profile/>}>
            <Route index path="account" element={<Account />} />
            <Route path="changePassword" element={<ChangePassword />} />
          </Route>
          <Route path="/support" element={<Support/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Notfound/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </Provider>
  );
}

export default App;
